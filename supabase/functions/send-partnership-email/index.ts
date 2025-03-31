
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

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
  // Cette fonction est pour la simulation puisque nous n'avons pas d'API d'email configurée
  // Dans une implémentation réelle, on utiliserait Resend, SendGrid, etc.
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Handle actual request
  if (req.method === 'POST') {
    try {
      const { name, email, phone, company, partnerType, experience, message } = await req.json() as PartnershipFormData;
      
      console.log("Partnership form submission received:", { name, email, phone, company, partnerType, experience, message });
      
      // Simulate sending email to admin
      console.log("Simulating email to admin (progineer.moe@gmail.com)");
      console.log(`Subject: Nouvelle demande de partenariat de ${name} - ${company}`);
      console.log(`Content: 
        Nom: ${name}
        Email: ${email}
        Téléphone: ${phone || 'Non fourni'}
        Entreprise: ${company}
        Type de partenariat: ${partnerType}
        Expérience: ${experience}
        Message: ${message}
      `);
      
      // Simulate sending confirmation email to user
      console.log("Simulating confirmation email to user:", email);
      console.log(`Subject: Confirmation de votre demande de partenariat - Progineer`);
      console.log(`Content: 
        Bonjour ${name},
        
        Nous avons bien reçu votre demande de partenariat et nous vous en remercions.
        Un membre de notre équipe examinera votre demande et vous contactera dans les plus brefs délais.
        
        Cordialement,
        L'équipe Progineer
      `);
      
      // In a real implementation, we would send actual emails here
      
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
