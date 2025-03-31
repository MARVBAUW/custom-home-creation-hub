
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface ReferralFormData {
  yourName: string;
  yourEmail: string;
  yourPhone?: string;
  friendName: string;
  friendEmail: string;
  friendPhone?: string;
  projectType?: string;
  message?: string;
}

serve(async (req) => {
  // Cette fonction est pour la simulation puisque nous n'avons pas d'API d'email configurée
  // Dans une implémentation réelle, on utiliserait Resend, SendGrid, etc.
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Handle actual request
  if (req.method === 'POST') {
    try {
      const { yourName, yourEmail, yourPhone, friendName, friendEmail, friendPhone, projectType, message } = await req.json() as ReferralFormData;
      
      console.log("Referral form submission received:", { yourName, yourEmail, friendName, friendEmail, projectType });
      
      // Simulate sending email to admin
      console.log("Simulating email to admin (progineer.moe@gmail.com)");
      console.log(`Subject: Nouveau parrainage de ${yourName}`);
      console.log(`Content: 
        Parrain:
        Nom: ${yourName}
        Email: ${yourEmail}
        Téléphone: ${yourPhone || 'Non fourni'}
        
        Ami parrainé:
        Nom: ${friendName}
        Email: ${friendEmail}
        Téléphone: ${friendPhone || 'Non fourni'}
        Type de projet: ${projectType || 'Non spécifié'}
        
        Message: ${message || 'Aucun message'}
      `);
      
      // Simulate sending confirmation email to referrer
      console.log("Simulating confirmation email to referrer:", yourEmail);
      console.log(`Subject: Confirmation de votre parrainage - Progineer`);
      console.log(`Content: 
        Bonjour ${yourName},
        
        Nous avons bien reçu votre parrainage et nous vous en remercions.
        Nous allons contacter ${friendName} dans les plus brefs délais.
        
        Cordialement,
        L'équipe Progineer
      `);
      
      // Simulate sending email to friend
      console.log("Simulating email to referred friend:", friendEmail);
      console.log(`Subject: ${yourName} vous recommande Progineer`);
      console.log(`Content: 
        Bonjour ${friendName},
        
        Votre ami(e) ${yourName} vous a recommandé nos services de maîtrise d'œuvre pour votre projet ${projectType || 'de construction ou rénovation'}.
        
        Progineer est une entreprise de maîtrise d'œuvre spécialisée dans la construction et la rénovation en région PACA.
        
        Nous serions ravis de discuter de votre projet. N'hésitez pas à nous contacter ou à consulter notre site web.
        
        Cordialement,
        L'équipe Progineer
      `);
      
      // In a real implementation, we would send actual emails here
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Referral sent successfully"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    } catch (error) {
      console.error("Error processing referral form:", error);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400
        }
      );
    }
  }
  
  // Handle other HTTP methods
  return new Response(
    JSON.stringify({
      success: false,
      error: "Method not allowed"
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 405
    }
  );
});
