
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.5";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend for email
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EstimationEmailRequest {
  email: string;
  formData: any;
  estimationResult: any;
  includeFullReport?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, formData, estimationResult, includeFullReport = false }: EstimationEmailRequest = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    if (!formData || !estimationResult) {
      throw new Error("Estimation data is required");
    }

    // Save estimation to database
    try {
      const { data, error } = await supabase
        .from('user_simulations')
        .insert({
          user_id: formData.userId || '00000000-0000-0000-0000-000000000000', // Anonymous user if not logged in
          title: `Estimation ${formData.projectType} - ${formData.surface}m² - ${formData.city || 'Non spécifiée'}`,
          type: 'calculator',
          is_temporary: true,
          content: {
            formData,
            estimationResult,
            createdAt: new Date().toISOString()
          }
        });
        
      if (error) {
        console.error("Database error:", error);
      } else {
        console.log("Estimation saved:", data);
      }
    } catch (dbError) {
      console.error("Error saving to database:", dbError);
      // Continue with email sending even if database save fails
    }

    // Format the currency
    const formatCurrency = (num: number) => {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(num);
    };

    // Construct email content
    const totalAmount = formatCurrency(estimationResult.totalAmount);
    const pricePerSquareMeter = estimationResult.projectDetails.surface 
      ? formatCurrency(estimationResult.estimatedCost.perSquareMeter) 
      : 'N/A';

    const projectType = formData.projectType || 'construction';
    const projectLocation = formData.city || formData.location || 'Non spécifiée';
    const projectSurface = formData.surface || 'Non spécifiée';

    // Create a list of construction costs
    const constructionCostsList = Object.entries(estimationResult.constructionCosts)
      .filter(([key, _]) => key !== 'total')
      .map(([key, value]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
        
        return `<li><strong>${formattedKey}:</strong> ${formatCurrency(value as number)}</li>`;
      })
      .join('');

    // Compose full email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #787346; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .estimation-box { background-color: #e8f4ea; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0; }
          .total-cost { font-size: 24px; font-weight: bold; color: #155724; }
          .footer { font-size: 12px; text-align: center; margin-top: 30px; color: #6c757d; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f2f2f2; }
          .cta-button { display: inline-block; background-color: #787346; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Estimation de votre projet</h1>
          </div>
          <div class="content">
            <p>Bonjour,</p>
            <p>Nous vous remercions d'avoir utilisé notre outil d'estimation pour votre projet Progineer. Voici le récapitulatif de votre estimation :</p>
            
            <div class="estimation-box">
              <h3>Coût total estimé</h3>
              <p class="total-cost">${totalAmount}</p>
              <p>Prix au m² : ${pricePerSquareMeter}</p>
            </div>
            
            <h3>Détails du projet</h3>
            <table>
              <tr>
                <th>Type de projet</th>
                <td>${projectType}</td>
              </tr>
              <tr>
                <th>Localisation</th>
                <td>${projectLocation}</td>
              </tr>
              <tr>
                <th>Surface</th>
                <td>${projectSurface} m²</td>
              </tr>
              ${formData.constructionType ? `<tr><th>Type de construction</th><td>${formData.constructionType}</td></tr>` : ''}
            </table>
            
            ${includeFullReport ? `
            <h3>Répartition des coûts</h3>
            <ul>
              ${constructionCostsList}
            </ul>
            
            <h3>Calendrier prévisionnel</h3>
            <table>
              <tr>
                <th>Phase de conception</th>
                <td>${estimationResult.timeline.design} mois</td>
              </tr>
              <tr>
                <th>Phase d'autorisations</th>
                <td>${estimationResult.timeline.permits} mois</td>
              </tr>
              <tr>
                <th>Phase de construction</th>
                <td>${estimationResult.timeline.construction} mois</td>
              </tr>
              <tr>
                <th>Durée totale</th>
                <td>${estimationResult.timeline.totalMonths} mois</td>
              </tr>
            </table>
            ` : ''}
            
            <p>Cette estimation est fournie à titre indicatif et peut varier en fonction des détails spécifiques de votre projet.</p>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="https://progineer.fr/contact" class="cta-button">Prendre rendez-vous avec un expert</a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Progineer - 123 Avenue de Provence, 13100 Aix-en-Provence</p>
            <p>Cette estimation a été générée le ${new Date().toLocaleDateString('fr-FR')}.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    const emailResponse = await resend.emails.send({
      from: "Progineer <estimation@progineer.fr>",
      to: [email],
      subject: `Votre estimation de projet ${projectType} - Progineer`,
      html: emailHtml,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-estimation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
