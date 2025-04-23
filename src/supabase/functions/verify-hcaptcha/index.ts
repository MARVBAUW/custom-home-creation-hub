
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Log pour le débogage
  console.log("Fonction verify-hcaptcha appelée");
  
  if (req.method === 'OPTIONS') {
    console.log("Requête OPTIONS reçue");
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const requestData = await req.json();
    console.log("Données reçues:", JSON.stringify(requestData));
    
    const { token } = requestData;
    const SECRET_KEY = Deno.env.get('HCAPTCHA_SECRET_KEY');

    if (!token) {
      console.error("Erreur: Token manquant");
      throw new Error('Token is required')
    }

    if (!SECRET_KEY) {
      console.error("Erreur: HCAPTCHA_SECRET_KEY non configuré");
      throw new Error('HCAPTCHA_SECRET_KEY is not configured')
    }

    console.log(`Vérification du token avec la clé: ${SECRET_KEY.substring(0, 5)}...`);
    const verifyUrl = 'https://api.hcaptcha.com/siteverify'
    const formData = new URLSearchParams()
    formData.append('secret', SECRET_KEY)
    formData.append('response', token)

    console.log("Envoi de la requête à hCaptcha...");
    const verification = await fetch(verifyUrl, {
      method: 'POST',
      body: formData,
    })

    const result = await verification.json()
    console.log("Résultat de la vérification:", JSON.stringify(result));

    return new Response(
      JSON.stringify({ success: result.success }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      },
    )
  } catch (error) {
    console.error("Erreur:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      },
    )
  }
})
