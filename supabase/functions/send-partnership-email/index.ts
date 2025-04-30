
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface PartnershipFormData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  partnerType: string;
  experience: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Handle actual request
  if (req.method === 'POST') {
    try {
      const { name, email, phone, company, partnerType, experience, message } = await req.json() as PartnershipFormData;
      
      console.log("Partnership form submission received:", { name, email, phone, company, partnerType, experience, message });
      
      // Send email to admin
      const adminEmailResponse = await resend.emails.send({
        from: "Progineer Partenariat <noreply@progineer.fr>",
        to: ["progineer.moe@gmail.com"],
        subject: `Nouvelle demande de partenariat de ${name} - ${company}`,
        html: `
          <h2>Nouvelle demande de partenariat</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
          <p><strong>Entreprise:</strong> ${company}</p>
          <p><strong>Type de partenariat:</strong> ${partnerType}</p>
          <p><strong>Expérience:</strong> ${experience}</p>
          <h3>Message:</h3>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      });
      
      console.log("Admin email sent:", adminEmailResponse);
      
      // Send confirmation email to user
      const userEmailResponse = await resend.emails.send({
        from: "Progineer <noreply@progineer.fr>",
        to: [email],
        subject: "Confirmation de votre demande de partenariat - Progineer",
        html: `
          <h2>Bonjour ${name},</h2>
          <p>Nous avons bien reçu votre demande de partenariat et nous vous en remercions.</p>
          <p>Un membre de notre équipe examinera votre demande et vous contactera dans les plus brefs délais.</p>
          <p>Cordialement,<br>L'équipe Progineer</p>
        `
      });
      
      console.log("User confirmation email sent:", userEmailResponse);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Partnership request sent successfully"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    } catch (error) {
      console.error("Error processing partnership form:", error);
      
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
