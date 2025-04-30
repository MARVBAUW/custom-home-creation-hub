
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Handle actual request
  if (req.method === 'POST') {
    try {
      const { yourName, yourEmail, yourPhone, friendName, friendEmail, friendPhone, projectType, message } = await req.json() as ReferralFormData;
      
      console.log("Referral form submission received:", { yourName, yourEmail, friendName, friendEmail, projectType });
      
      // Send email to admin
      const adminEmailResponse = await resend.emails.send({
        from: "Progineer Parrainage <noreply@progineer.fr>",
        to: ["progineer.moe@gmail.com"],
        subject: `Nouveau parrainage de ${yourName}`,
        html: `
          <h2>Nouveau parrainage</h2>
          <h3>Parrain:</h3>
          <p><strong>Nom:</strong> ${yourName}</p>
          <p><strong>Email:</strong> ${yourEmail}</p>
          <p><strong>Téléphone:</strong> ${yourPhone || 'Non fourni'}</p>
          <h3>Ami parrainé:</h3>
          <p><strong>Nom:</strong> ${friendName}</p>
          <p><strong>Email:</strong> ${friendEmail}</p>
          <p><strong>Téléphone:</strong> ${friendPhone || 'Non fourni'}</p>
          <p><strong>Type de projet:</strong> ${projectType || 'Non spécifié'}</p>
          <h3>Message:</h3>
          <p>${message ? message.replace(/\n/g, '<br>') : 'Aucun message'}</p>
        `
      });
      
      console.log("Admin email sent:", adminEmailResponse);
      
      // Send confirmation email to referrer
      const referrerEmailResponse = await resend.emails.send({
        from: "Progineer <noreply@progineer.fr>",
        to: [yourEmail],
        subject: "Confirmation de votre parrainage - Progineer",
        html: `
          <h2>Bonjour ${yourName},</h2>
          <p>Nous avons bien reçu votre parrainage et nous vous en remercions.</p>
          <p>Nous allons contacter ${friendName} dans les plus brefs délais.</p>
          <p>Cordialement,<br>L'équipe Progineer</p>
        `
      });
      
      console.log("Referrer confirmation email sent:", referrerEmailResponse);
      
      // Send email to referred friend
      const friendEmailResponse = await resend.emails.send({
        from: "Progineer <noreply@progineer.fr>",
        to: [friendEmail],
        subject: `${yourName} vous recommande Progineer`,
        html: `
          <h2>Bonjour ${friendName},</h2>
          <p>Votre ami(e) ${yourName} vous a recommandé nos services de maîtrise d'œuvre pour votre projet ${projectType || 'de construction ou rénovation'}.</p>
          <p>Progineer est une entreprise de maîtrise d'œuvre spécialisée dans la construction et la rénovation en région PACA.</p>
          <p>Nous serions ravis de discuter de votre projet. N'hésitez pas à nous contacter au 07 83 76 21 56 ou à consulter notre site web <a href="https://progineer.fr">progineer.fr</a>.</p>
          <p>Cordialement,<br>L'équipe Progineer</p>
        `
      });
      
      console.log("Friend email sent:", friendEmailResponse);
      
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
