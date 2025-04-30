
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { corsHeaders } from "../_shared/cors.ts";

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Topics for automated generation
const TOPIC_POOL = [
  "Optimisation de l'espace dans une rénovation d'appartement",
  "Les étapes clés d'une construction neuve en PACA",
  "Comment choisir un maître d'œuvre pour son projet immobilier",
  "Techniques de construction durable en région méditerranéenne",
  "Respecter les normes énergétiques dans une rénovation",
  "Les avantages d'une extension de maison en région PACA",
  "Rénovation écologique : matériaux et méthodes adaptés au climat méditerranéen",
  "La maîtrise d'œuvre dans les projets de petit collectif",
  "Les tendances architecturales contemporaines en Provence",
  "Comment optimiser le budget d'une construction neuve"
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    console.log("Starting automated article generation...");
    
    // Select a random topic from our pool
    const randomTopic = TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];
    
    // Determine a suitable category based on the topic
    let category = "Construction";
    if (randomTopic.toLowerCase().includes("rénovation")) {
      category = "Rénovation";
    } else if (randomTopic.toLowerCase().includes("extension")) {
      category = "Extension";
    } else if (randomTopic.toLowerCase().includes("écologique") || randomTopic.toLowerCase().includes("durable")) {
      category = "Construction Écologique";
    }
    
    console.log(`Selected topic: "${randomTopic}" in category: ${category}`);
    
    // Call the generate-article function with the random topic
    const generateResponse = await fetch(
      `${supabaseUrl}/functions/v1/generate-article`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: randomTopic,
          category: category,
          isManual: false // Indicate this is an automated generation
        })
      }
    );
    
    if (!generateResponse.ok) {
      const error = await generateResponse.text();
      throw new Error(`Generate article function failed: ${error}`);
    }
    
    const { success, article, error } = await generateResponse.json();
    
    if (!success || error) {
      throw new Error(`Article generation failed: ${error || "Unknown error"}`);
    }
    
    // Insert the article into the database
    const { data: existingArticle } = await supabaseClient
      .from('articles')
      .select('id')
      .eq('slug', article.slug)
      .maybeSingle();
      
    // If article with this slug already exists, modify the slug
    const finalSlug = existingArticle 
      ? `${article.slug}-${Date.now().toString().slice(-6)}`
      : article.slug;
    
    const { data, error: insertError } = await supabaseClient
      .from('articles')
      .insert([{
        title: article.title,
        slug: finalSlug,
        content: article.content,
        meta_description: article.meta_description,
        keywords: article.keywords,
        description: article.description,
        category: article.category,
        image: article.image || null,
        is_ai_generated: true
      }]);
      
    if (insertError) {
      throw new Error(`Database insert error: ${insertError.message}`);
    }
    
    console.log(`Successfully generated and saved article: "${article.title}"`);
    
    // Log the generation
    await supabaseClient
      .from('article_generation_logs')
      .insert([{
        status: 'success',
        topic: randomTopic,
        category: category,
        article_title: article.title,
        article_slug: finalSlug
      }]);
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Article successfully generated and saved: ${article.title}`,
        article: {
          title: article.title,
          slug: finalSlug,
          category: article.category
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
    
  } catch (error) {
    console.error("Error in auto-generate-article function:", error);
    
    // Log the error
    try {
      await supabaseClient
        .from('article_generation_logs')
        .insert([{
          status: 'error',
          error_message: error.message
        }]);
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
