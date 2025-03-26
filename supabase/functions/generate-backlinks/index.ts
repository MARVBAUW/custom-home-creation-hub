
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.25.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  console.log('Running backlinks generation function');
  
  try {
    // Create a Supabase client for the function
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing environment variables SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
    
    // Log the start of the process
    console.log("Démarrage de la génération de backlinks");
    
    // 1. Récupérer les articles existants
    const { data: articles, error: articlesError } = await supabaseAdmin
      .from('articles')
      .select('id, title, content, slug, created_at, keywords')
      .order('created_at', { ascending: false });
    
    if (articlesError) {
      throw new Error(`Erreur lors de la récupération des articles: ${articlesError.message}`);
    }
    
    console.log(`Récupéré ${articles?.length || 0} articles pour l'analyse de backlinks`);
    
    // Vérifier si nous avons des articles
    if (!articles || articles.length === 0) {
      // Log the result in the backlinks_logs table
      await supabaseAdmin
        .from('backlinks_logs')
        .insert({
          created_at: new Date().toISOString(),
          status: 'warning',
          message: 'Aucun article trouvé pour générer des backlinks',
          backlinks_generated: 0
        });
      
      return new Response(JSON.stringify({
        success: true,
        message: 'Aucun article trouvé pour générer des backlinks',
        backlinksGenerated: { total: 0, new: 0, updated: 0 }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      });
    }
    
    // 2. Analyser et générer des backlinks entre les articles
    const backlinksGenerated = {
      total: 0,
      new: 0,
      updated: 0
    };
    
    for (const article of articles) {
      // Pour chaque article, chercher des articles connexes basé sur le contenu
      const relatedArticles = findRelatedArticles(article, articles);
      
      // Log for debugging
      console.log(`Article "${article.title}" a ${relatedArticles.length} articles connexes`);
      
      // On génère des backlinks pour chaque article connexe
      for (const relatedArticle of relatedArticles) {
        // Vérifier si le backlink existe déjà
        const { data: existingBacklink } = await supabaseAdmin
          .from('backlinks')
          .select('id, relevance_score')
          .eq('source_article_id', article.id)
          .eq('target_article_id', relatedArticle.id)
          .single();
        
        if (existingBacklink) {
          // Mettre à jour le backlink existant uniquement si le score a changé
          if (existingBacklink.relevance_score !== relatedArticle.relevanceScore) {
            await supabaseAdmin
              .from('backlinks')
              .update({
                relevance_score: relatedArticle.relevanceScore,
                updated_at: new Date().toISOString()
              })
              .eq('id', existingBacklink.id);
            
            backlinksGenerated.updated++;
            backlinksGenerated.total++;
          }
        } else {
          // Insérer un nouveau backlink
          const { error: backlinkError } = await supabaseAdmin
            .from('backlinks')
            .insert({
              source_article_id: article.id,
              target_article_id: relatedArticle.id,
              relevance_score: relatedArticle.relevanceScore,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
          
          if (backlinkError) {
            console.error(`Erreur lors de la création du backlink: ${backlinkError.message}`);
          } else {
            backlinksGenerated.new++;
            backlinksGenerated.total++;
          }
        }
      }
    }
    
    // Log the results
    console.log(`Génération terminée: ${backlinksGenerated.total} backlinks (${backlinksGenerated.new} nouveaux, ${backlinksGenerated.updated} mis à jour)`);
    
    // Log the result in the backlinks_logs table
    await supabaseAdmin
      .from('backlinks_logs')
      .insert({
        created_at: new Date().toISOString(),
        status: 'success',
        message: `${backlinksGenerated.total} backlinks générés (${backlinksGenerated.new} nouveaux, ${backlinksGenerated.updated} mis à jour)`,
        backlinks_generated: backlinksGenerated.total,
        new_backlinks: backlinksGenerated.new,
        updated_backlinks: backlinksGenerated.updated
      });
    
    return new Response(JSON.stringify({
      success: true,
      message: `${backlinksGenerated.total} backlinks générés avec succès`,
      backlinksGenerated: backlinksGenerated,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (error) {
    console.error(`Erreur dans la fonction de génération de backlinks: ${error.message}`);
    
    // Create a Supabase client for the function - for logging the error
    const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
    
    try {
      if (supabaseUrl && supabaseKey) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
        
        // Log the error in the backlinks_logs table
        await supabaseAdmin
          .from('backlinks_logs')
          .insert({
            created_at: new Date().toISOString(),
            status: 'error',
            message: `Erreur: ${error.message}`,
            backlinks_generated: 0
          });
      }
    } catch (logError) {
      console.error(`Erreur lors de la journalisation de l'erreur: ${logError.message}`);
    }
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500
    });
  }
});

// Fonction pour trouver des articles connexes basés sur le contenu
function findRelatedArticles(currentArticle, allArticles) {
  // Filtrer pour ne pas inclure l'article courant
  const otherArticles = allArticles.filter(article => article.id !== currentArticle.id);
  
  // Tableau pour stocker les articles connexes avec leur score de pertinence
  const relatedArticles = [];
  
  // Keywords de l'article courant (si disponibles)
  const currentKeywords = currentArticle.keywords ? 
    (typeof currentArticle.keywords === 'string' ? currentArticle.keywords.split(',') : currentArticle.keywords) : 
    [];
  
  // Extraire des termes clés du titre et du contenu si pas de keywords définis
  const currentTitle = currentArticle.title?.toLowerCase() || '';
  const currentContent = currentArticle.content?.toLowerCase() || '';
  
  // Pour chaque autre article, calculer un score de pertinence
  for (const otherArticle of otherArticles) {
    let relevanceScore = 0;
    
    // Keywords de l'autre article
    const otherKeywords = otherArticle.keywords ? 
      (typeof otherArticle.keywords === 'string' ? otherArticle.keywords.split(',') : otherArticle.keywords) : 
      [];
    
    // Titre et contenu de l'autre article
    const otherTitle = otherArticle.title?.toLowerCase() || '';
    const otherContent = otherArticle.content?.toLowerCase() || '';
    
    // 1. Vérifier les correspondances de mots-clés
    if (currentKeywords.length > 0 && otherKeywords.length > 0) {
      const commonKeywords = currentKeywords.filter(keyword => 
        otherKeywords.includes(keyword.trim())
      );
      relevanceScore += (commonKeywords.length / Math.max(currentKeywords.length, otherKeywords.length)) * 0.5;
    }
    
    // 2. Vérifier si le titre de l'autre article apparaît dans le contenu de l'article courant
    if (currentContent && otherTitle && currentContent.includes(otherTitle)) {
      relevanceScore += 0.3;
    }
    
    // 3. Vérifier si le titre de l'article courant apparaît dans le contenu de l'autre article
    if (otherContent && currentTitle && otherContent.includes(currentTitle)) {
      relevanceScore += 0.3;
    }
    
    // 4. Vérifier la proximité temporelle (les articles récents sont prioritaires)
    const timeDiff = Math.abs(new Date(currentArticle.created_at).getTime() - new Date(otherArticle.created_at).getTime());
    const daysDiff = timeDiff / (1000 * 3600 * 24); // Différence en jours
    if (daysDiff < 30) { // Si moins d'un mois d'écart
      relevanceScore += 0.1 * (1 - (daysDiff / 30));
    }
    
    // Seuil minimum de pertinence (0.2)
    if (relevanceScore > 0.2) {
      relatedArticles.push({
        id: otherArticle.id,
        relevanceScore: Math.min(relevanceScore, 1) // Plafonner à 1
      });
    }
  }
  
  // Si aucun article connexe n'a été trouvé avec l'algorithme,
  // on prend au moins les articles les plus récents pour assurer des backlinks
  if (relatedArticles.length === 0 && otherArticles.length > 0) {
    // Trier par date décroissante
    const sortedByDate = [...otherArticles].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    // Prendre jusqu'à 3 articles récents
    for (let i = 0; i < Math.min(3, sortedByDate.length); i++) {
      relatedArticles.push({
        id: sortedByDate[i].id,
        relevanceScore: 0.3 // Score par défaut
      });
    }
  }
  
  // Retourner les articles les plus pertinents (maximum 5)
  return relatedArticles
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5);
}
