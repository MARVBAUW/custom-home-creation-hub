
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
    
    // 1. Récupérer les articles existants
    const { data: articles, error: articlesError } = await supabaseAdmin
      .from('articles')
      .select('id, title, content, slug')
      .order('created_at', { ascending: false });
    
    if (articlesError) {
      throw new Error(`Erreur lors de la récupération des articles: ${articlesError.message}`);
    }
    
    console.log(`Récupéré ${articles.length} articles pour l'analyse de backlinks`);
    
    // 2. Analyser et générer des backlinks entre les articles
    const backlinksGenerated = [];
    
    for (const article of articles) {
      // Pour chaque article, on cherche des articles connexes basé sur le contenu
      const relatedArticles = findRelatedArticles(article, articles);
      
      // On génère des backlinks pour chaque article connexe
      for (const relatedArticle of relatedArticles) {
        // Insérer le backlink dans la table des backlinks
        const { data: backlink, error: backlinkError } = await supabaseAdmin
          .from('backlinks')
          .upsert({
            source_article_id: article.id,
            target_article_id: relatedArticle.id,
            relevance_score: relatedArticle.relevanceScore,
            created_at: new Date().toISOString()
          }, { onConflict: 'source_article_id,target_article_id' })
          .select();
        
        if (backlinkError) {
          console.error(`Erreur lors de la création du backlink: ${backlinkError.message}`);
        } else {
          backlinksGenerated.push(backlink);
        }
      }
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: `${backlinksGenerated.length} backlinks générés avec succès`,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (error) {
    console.error(`Erreur dans la fonction de génération de backlinks: ${error.message}`);
    
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

// Fonction helper pour créer un client Supabase
function createClient(supabaseUrl: string, supabaseKey: string) {
  return {
    from: (table: string) => ({
      select: (columns: string) => ({
        order: (column: string, { ascending }: { ascending: boolean }) => {
          return { data: [], error: null }; // Mock pour l'exemple
        }
      }),
      upsert: (data: any, options: any) => ({
        select: () => {
          return { data: {}, error: null }; // Mock pour l'exemple
        }
      })
    })
  };
}

// Fonction pour trouver des articles connexes basés sur le contenu
function findRelatedArticles(currentArticle, allArticles) {
  // Simuler une logique d'IA pour trouver des articles connexes
  // Dans une implémentation réelle, vous utiliseriez un modèle d'IA ou un algorithme
  
  const relatedArticles = [];
  
  // Filtrer pour ne pas inclure l'article courant
  const otherArticles = allArticles.filter(article => article.id !== currentArticle.id);
  
  // Logique simple: on prend les 3 premiers autres articles et on leur assigne un score aléatoire
  // Dans une application réelle, ce serait basé sur l'analyse du contenu par IA
  for (let i = 0; i < Math.min(3, otherArticles.length); i++) {
    relatedArticles.push({
      id: otherArticles[i].id,
      relevanceScore: Math.random() * 0.5 + 0.5, // Score entre 0.5 et 1.0
    });
  }
  
  return relatedArticles;
}
