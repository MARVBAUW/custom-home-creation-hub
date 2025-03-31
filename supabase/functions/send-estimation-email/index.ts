
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

// Configuration du client SMTP
const smtpClient = new SmtpClient({
  connection: {
    hostname: Deno.env.get("SMTP_HOSTNAME") || "smtp.gmail.com",
    port: parseInt(Deno.env.get("SMTP_PORT") || "587"),
    tls: true,
    auth: {
      username: Deno.env.get("SMTP_USERNAME") || "progineer.moe@gmail.com",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    },
  },
});

interface EstimationEmailRequest {
  to: string
  subject: string
  html: string
  cc?: string
  formData: any
  estimationAmount: number
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    })
  }

  try {
    const { to, subject, html, cc, formData, estimationAmount } = await req.json() as EstimationEmailRequest

    // Validate required fields
    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: to, subject, or html",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      )
    }

    // Log the request details
    console.log(`Sending estimation email to: ${to}`)
    console.log(`CC: ${cc || 'None'}`)
    console.log(`Estimation amount: ${estimationAmount}`)
    
    // Préparer les destinataires du mail
    const recipients = [to];
    if (cc) recipients.push(cc);
    
    try {
      // Envoyer l'email via SMTP
      await smtpClient.send({
        from: Deno.env.get("SMTP_FROM") || "Progineer <progineer.moe@gmail.com>",
        to: recipients.join(","),
        subject: subject,
        html: html,
      });
      
      console.log("Email sent successfully");
      
      // Enregistrer l'envoi dans une base de données ou un fichier de log si nécessaire
      // await logEmailSending(to, subject, estimationAmount);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: "Email sent successfully",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      throw new Error(`Email sending failed: ${emailError.message}`);
    }
  } catch (error) {
    console.error("Error processing request:", error)
    
    return new Response(
      JSON.stringify({
        error: error.message || "An error occurred while processing the request",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
  } finally {
    // Ensure SMTP connection is closed
    try {
      await smtpClient.close();
    } catch (err) {
      console.error("Error closing SMTP connection:", err);
    }
  }
})
