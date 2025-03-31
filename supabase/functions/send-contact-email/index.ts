
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
  projectType?: string;
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
      const { name, email, phone, message, subject, projectType } = await req.json() as ContactFormData;
      
      console.log("Contact form submission received:", { name, email, phone, message, subject, projectType });
      
      // Simulate sending email to admin
      console.log("Simulating email to admin (progineer.moe@gmail.com)");
      console.log(`Subject: Nouveau message de contact de ${name}`);
      console.log(`Content: 
        Nom: ${name}
        Email: ${email}
        Téléphone: ${phone || 'Non fourni'}
        Sujet: ${subject || 'Contact général'}
        Type de projet: ${projectType || 'Non spécifié'}
        Message: ${message}
      `);
      
      // Simulate sending confirmation email to user
      console.log("Simulating confirmation email to user:", email);
      console.log(`Subject: Confirmation de votre message - Progineer`);
      console.log(`Content: 
        Bonjour ${name},
        
        Nous avons bien reçu votre message et nous vous en remercions.
        Un membre de notre équipe vous contactera dans les plus brefs délais.
        
        Cordialement,
        L'équipe Progineer
      `);
      
      // In a real implementation, we would send actual emails here
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Message sent successfully"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    } catch (error) {
      console.error("Error processing contact form:", error);
      
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
