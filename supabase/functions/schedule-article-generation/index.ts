
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";
import { corsHeaders } from "../_shared/cors.ts";

// Create a Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Security check - this is a protected admin function
  // Check for auth token or secret key
  // This check depends on how you're securing your Edge Functions
  const authorization = req.headers.get('Authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Set up the cron job for weekly article generation using pg_cron
    // This will invoke the auto-generate-article function every week on Sunday at 3am
    const { data, error } = await supabaseClient.rpc('setup_article_generation_cron');

    if (error) {
      throw new Error(`Failed to set up cron job: ${error.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Article generation scheduled successfully",
        data
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error("Error setting up article generation schedule:", error);
    
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
