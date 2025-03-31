
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
    
    // Pour simulation, génération de backlinks fictifs
    console.log("Generating simulated backlinks");
    
    // Sites à surveiller
    const sitesToScan = [
      "https://www.architectes-france.com",
      "https://www.batiactu.com",
      "https://www.construction21.org",
      "https://www.batiment.fr",
      "https://www.batiweb.com",
      "https://www.lemoniteur.fr",
      "https://www.batirama.com",
      "https://www.maison-travaux.fr",
      "https://www.paca.developpement-durable.gouv.fr",
      "https://www.ffbatiment.fr",
      "https://www.qualibat.com",
      "https://www.architectes.org",
      "https://www.ordre-architectes.org",
      "https://www.architectes-paca.org",
      "https://www.urbapaca.com"
    ];
    
    // Mots-clés à rechercher
    const keywords = [
      "architecte marseille",
      "maître d'œuvre paca",
      "construction maison sur mesure",
      "rénovation maison marseille",
      "extension maison bouches du rhône",
      "progineer",
      "architecte paca"
    ];
    
    // Générer des backlinks aléatoires
    const newBacklinksCount = Math.floor(Math.random() * 10) + 5; // Entre 5 et 15 nouveaux backlinks
    const updatedBacklinksCount = Math.floor(Math.random() * 5) + 1; // Entre 1 et 5 backlinks mis à jour
    const totalBacklinksCount = newBacklinksCount + updatedBacklinksCount;
    
    // Générer des backlinks aléatoires fictifs
    const backlinks = [];
    for (let i = 0; i < newBacklinksCount; i++) {
      const site = sitesToScan[Math.floor(Math.random() * sitesToScan.length)];
      const keyword = keywords[Math.floor(Math.random() * keywords.length)];
      const randomPath = Math.random().toString(36).substring(2, 15);
      
      backlinks.push({
        source_url: `${site}/${randomPath}`,
        anchor_text: keyword,
        found_date: new Date().toISOString(),
        status: "new"
      });
    }
    
    console.log(`Generated ${newBacklinksCount} new simulated backlinks`);
    
    // Log the result in the backlinks_logs table
    await supabaseAdmin
      .from('backlinks_logs')
      .insert({
        created_at: new Date().toISOString(),
        status: 'success',
        message: `${totalBacklinksCount} backlinks générés (${newBacklinksCount} nouveaux, ${updatedBacklinksCount} mis à jour)`,
        backlinks_generated: totalBacklinksCount,
        new_backlinks: newBacklinksCount,
        updated_backlinks: updatedBacklinksCount
      });
    
    return new Response(JSON.stringify({
      success: true,
      message: `${totalBacklinksCount} backlinks générés avec succès`,
      backlinksGenerated: {
        total: totalBacklinksCount,
        new: newBacklinksCount,
        updated: updatedBacklinksCount
      },
      backlinks: backlinks, // Retourner les backlinks fictifs pour visualisation
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
