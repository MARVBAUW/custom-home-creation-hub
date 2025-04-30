
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const DEESEEK_API_KEY = Deno.env.get("DEESEEK_API_KEY");
const DEESEEK_API_URL = "https://api.deeseek.ai/v1/text-generation";

interface ArticleParams {
  topic?: string;
  keywords?: string[];
  category?: string;
}

interface ArticleData {
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  keywords: string[];
  description: string;
  category: string;
  image?: string;
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Helper function to generate a prompt for DeeSeek
function generatePrompt(params: ArticleParams): string {
  const topic = params.topic || "construction et maîtrise d'œuvre en PACA";
  const keywords = params.keywords?.join(", ") || "maîtrise d'œuvre, construction, rénovation, PACA";
  const category = params.category || "Construction";

  return `Crée un article SEO complet sur ${topic} pour le site web d'une entreprise de maîtrise d'œuvre nommée Progineer.
  
L'article doit:
- Avoir plus de 600 mots
- Inclure un titre H1 principal accrocheur
- Contenir une structure avec des sous-titres H2 et H3 bien organisés
- Intégrer naturellement ces mots-clés: ${keywords}
- Être informatif et utile pour les personnes intéressées par ${category}
- Avoir un ton professionnel mais accessible
- Inclure au moins un lien interne vers d'autres contenus du site (utiliser #lien-interne# pour marquer les endroits où insérer ces liens)
- Se terminer par une conclusion qui encourage l'action
- Fournir une meta-description optimisée pour le référencement

Format de réponse JSON:
{
  "title": "Titre H1 de l'article",
  "meta_description": "La meta description optimisée pour SEO, environ 150 caractères",
  "keywords": ["mot-clé1", "mot-clé2", "mot-clé3", "mot-clé4", "mot-clé5"],
  "description": "Un résumé court de l'article en 2-3 phrases",
  "category": "${category}",
  "content": "Le contenu complet de l'article au format HTML structuré avec balises h2, h3, p, ul, li, etc."
}

N'utilise pas de balises h1 dans le contenu car le titre sera déjà formatté en H1. Structure l'article avec uniquement des balises HTML valides: h2, h3, p, ul, li, ol, blockquote, strong, em, a.`;
}

// Main handler for the edge function
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Check if DeeSeek API key is configured
  if (!DEESEEK_API_KEY) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "DeeSeek API key is not configured" 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    // Parse request body
    const { topic, keywords, category, isManual = true } = await req.json() as ArticleParams & { isManual?: boolean };
    
    console.log(`Generating article about: ${topic || 'default topic'}, isManual: ${isManual}`);
    
    // Generate prompt for DeeSeek API
    const prompt = generatePrompt({ topic, keywords, category });
    
    // Call DeeSeek API
    const deeseekResponse = await fetch(DEESEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEESEEK_API_KEY}`
      },
      body: JSON.stringify({
        prompt: prompt,
        model: "magna",
        max_tokens: 4000
      })
    });
    
    // Check for successful response
    if (!deeseekResponse.ok) {
      const error = await deeseekResponse.text();
      console.error("DeeSeek API error:", error);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `DeeSeek API returned error: ${deeseekResponse.status}` 
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Parse DeeSeek response
    const deeseekData = await deeseekResponse.json();
    let articleData: ArticleData;
    
    try {
      // Extract the JSON from the DeeSeek response text
      const responseText = deeseekData.generations?.[0]?.text || "";
      console.log("DeeSeek raw response:", responseText);
      
      // Try to parse the JSON from the response text
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not extract JSON from DeeSeek response");
      }
      
      articleData = JSON.parse(jsonMatch[0]);
      
      // Ensure we have the essential fields
      if (!articleData.title || !articleData.content) {
        throw new Error("Essential article data missing from DeeSeek response");
      }
      
      // Generate slug if not provided
      articleData.slug = articleData.slug || generateSlug(articleData.title);
      
      console.log("Successfully parsed article data:", {
        title: articleData.title,
        slug: articleData.slug,
        metaLength: articleData.meta_description?.length || 0,
        contentPreview: articleData.content.substring(0, 100) + '...',
        keywords: articleData.keywords
      });
      
    } catch (parseError) {
      console.error("Failed to parse DeeSeek response:", parseError);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Failed to parse DeeSeek response: ${parseError.message}`,
          rawResponse: deeseekData
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // If we're in auto mode, directly save to database
    if (!isManual) {
      try {
        const { data: existingArticle, error: slugCheckError } = await supabaseClient
          .from('articles')
          .select('id')
          .eq('slug', articleData.slug)
          .single();
          
        // If article with this slug already exists, modify the slug
        if (existingArticle) {
          articleData.slug = `${articleData.slug}-${Date.now().toString().slice(-6)}`;
        }
        
        // Insert article into database
        const { data, error } = await supabaseClient
          .from('articles')
          .insert([{
            title: articleData.title,
            slug: articleData.slug,
            content: articleData.content,
            meta_description: articleData.meta_description,
            keywords: articleData.keywords,
            description: articleData.description,
            category: articleData.category,
            image: articleData.image || null,
            is_ai_generated: true
          }]);
          
        if (error) {
          throw new Error(`Database insert error: ${error.message}`);
        }
        
        console.log("Article automatically saved to database");
        
      } catch (dbError) {
        console.error("Database error:", dbError);
        // In auto mode, we still return success so the cron job doesn't fail
        // but we log the error for monitoring
      }
    }
    
    // Return article data
    return new Response(
      JSON.stringify({
        success: true,
        article: articleData
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error("Error in generate-article function:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
