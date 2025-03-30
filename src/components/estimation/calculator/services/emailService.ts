
import { FormData } from '../types';
import { supabase } from '@/integrations/supabase/client';

interface CategoryAmount {
  category: string;
  amount: number;
  details?: string;
}

// Fonction pour générer le contenu HTML de l'email
export const generateEmailContent = (
  formData: FormData, 
  estimationResult: number, 
  categoriesAmounts: CategoryAmount[]
): string => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  // Générer le contenu HTML de l'email
  let emailContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f5f5f5; padding: 20px; border-bottom: 3px solid #d4af37; }
          .title { color: #d4af37; margin: 0; }
          .subtitle { color: #666; margin-top: 5px; }
          .total { font-size: 24px; font-weight: bold; color: #d4af37; margin: 20px 0; }
          .category { background-color: #f9f9f9; padding: 10px; margin-bottom: 10px; border-radius: 4px; }
          .category-header { display: flex; justify-content: space-between; }
          .category-name { font-weight: bold; }
          .category-amount { font-weight: bold; }
          .category-details { font-size: 13px; color: #666; margin-top: 5px; }
          .footer { background-color: #f5f5f5; padding: 20px; margin-top: 20px; font-size: 12px; color: #666; }
          .client-info { margin: 20px 0; }
          .info-label { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">Progineer - Estimation de projet</h1>
            <p class="subtitle">Récapitulatif de votre estimation</p>
          </div>
          
          <div class="client-info">
            <p><span class="info-label">Nom:</span> ${formData.lastName || '-'}</p>
            <p><span class="info-label">Prénom:</span> ${formData.firstName || '-'}</p>
            <p><span class="info-label">Email:</span> ${formData.email || '-'}</p>
            <p><span class="info-label">Téléphone:</span> ${formData.phone || '-'}</p>
            <p><span class="info-label">Type de projet:</span> ${formData.projectType || '-'}</p>
            <p><span class="info-label">Surface:</span> ${formData.surface || '-'} m²</p>
          </div>
          
          <h2>Estimation de votre projet</h2>
          <p class="total">${formatPrice(estimationResult)}</p>
          
          <h3>Détails par corps d'état</h3>
  `;

  // Ajouter chaque corps d'état
  categoriesAmounts.forEach(category => {
    const percentage = Math.round((category.amount / estimationResult) * 100);
    
    emailContent += `
      <div class="category">
        <div class="category-header">
          <span class="category-name">${category.category}</span>
          <span class="category-amount">${formatPrice(category.amount)} (${percentage}%)</span>
        </div>
        ${category.details ? `<p class="category-details">${category.details}</p>` : ''}
      </div>
    `;
  });

  // Ajouter le pied de page
  emailContent += `
          <div class="footer">
            <p>
              * Prix approximatif TTC hors terrain, frais de notaire, étude géotechnique, 
              honoraires de maîtrise d'œuvre, taxe d'aménagement, taxe archéologique, 
              assurance dommage ouvrage.
            </p>
            <p>
              Pour toute question concernant cette estimation, n'hésitez pas à nous contacter:
              <br>Email: contact@progineer.fr
              <br>Téléphone: 04 XX XX XX XX
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  return emailContent;
};

// Fonction pour envoyer l'email via la fonction Edge Supabase
export const sendEstimationEmail = async (
  formData: FormData, 
  estimationResult: number, 
  categoriesAmounts: CategoryAmount[]
): Promise<boolean> => {
  try {
    console.log("Envoi de l'email en cours...");
    
    const emailContent = generateEmailContent(formData, estimationResult, categoriesAmounts);
    console.log("Contenu de l'email généré");
    
    // Préparer les données pour l'envoi
    const emailData = {
      to: [formData.email, "progineer.moe@gmail.com"],
      subject: "Estimation de votre projet - Progineer",
      html: emailContent,
      from: "Progineer <noreply@progineer.fr>"
    };
    
    // Appeler la fonction Edge via Supabase
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: emailData
    });
    
    if (error) {
      console.error("Erreur lors de l'appel à la fonction send-email:", error);
      return false;
    }
    
    console.log("Email envoyé avec succès:", data);
    return true;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return false;
  }
};
