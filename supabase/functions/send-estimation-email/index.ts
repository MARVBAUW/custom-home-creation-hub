
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

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
    
    // In a production environment, you would use a service like Resend, SendGrid, or similar
    // This is a simplified example that logs the email sending request
    
    // Email sending simulation
    console.log("Email content:", html.substring(0, 100) + "...")
    
    // Simulate successful email sending
    // In production, replace with actual email sending logic
    
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    )
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
  }
})
