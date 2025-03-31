
import { FormData } from '../types';

interface CategoryAmount {
  category: string;
  amount: number;
  details?: string;
}

// Fonction pour générer le contenu HTML de l'email
export const generateEmailContent = (
  formData: FormData, 
  estimationResult: number, 
  categoriesAmounts?: CategoryAmount[]
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
          
          <h3>Détails de l'estimation</h3>
          <div class="estimation-details">
            <p><span class="info-label">Montant HT:</span> ${formatPrice(estimationResult)}</p>
            <p><span class="info-label">TVA (20%):</span> ${formatPrice(estimationResult * 0.2)}</p>
            <p><span class="info-label">Montant TTC:</span> ${formatPrice(estimationResult * 1.2)}</p>
          </div>
  `;

  // Ajouter les catégories si disponibles
  if (categoriesAmounts && categoriesAmounts.length > 0) {
    emailContent += `
      <h3>Détail par corps d'état</h3>
      <div class="categories">
    `;

    categoriesAmounts.forEach(category => {
      if (category.amount > 0) {
        emailContent += `
          <div class="category">
            <div class="category-header">
              <span class="category-name">${category.category}</span>
              <span class="category-amount">${formatPrice(category.amount)}</span>
            </div>
            ${category.details ? `<div class="category-details">${category.details}</div>` : ''}
          </div>
        `;
      }
    });

    emailContent += `
      </div>
    `;
  }

  // Ajouter le footer
  emailContent += `
          <div class="footer">
            <p>Ceci est une estimation automatique basée sur les informations que vous avez fournies. Pour une étude plus précise, notre équipe est à votre disposition.</p>
            <p>© ${new Date().getFullYear()} Progineer - Tous droits réservés</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return emailContent;
};

// Fonction pour envoyer l'email à l'utilisateur
export const sendEstimationEmail = async (
  toOrFormData: string | FormData,
  formDataOrEstimation: FormData | number,
  estimationResultOrCategories?: number | CategoryAmount[],
  categoriesAmounts?: CategoryAmount[]
): Promise<{ success: boolean; message: string }> => {
  try {
    let email: string;
    let formData: FormData;
    let estimationResult: number;
    let categories: CategoryAmount[] | undefined;

    // Handle different parameter patterns
    if (typeof toOrFormData === 'string') {
      // Case: (email, formData, estimationResult, categories?)
      email = toOrFormData;
      formData = formDataOrEstimation as FormData;
      estimationResult = estimationResultOrCategories as number;
      categories = categoriesAmounts;
    } else {
      // Case: (formData, estimationResult, categories?)
      formData = toOrFormData;
      estimationResult = formDataOrEstimation as number;
      categories = estimationResultOrCategories as CategoryAmount[] | undefined;
      // Get email from formData
      email = formData.email || formData.contactEmail || '';
      
      if (!email) {
        return { 
          success: false, 
          message: 'Aucune adresse email fournie dans les données du formulaire' 
        };
      }
    }

    // Generate email content
    const emailContent = generateEmailContent(formData, estimationResult, categories);
    
    // In a production environment, you would call your API or third-party service here
    // For example with Supabase Edge Functions
    const response = await fetch('/api/send-estimation-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Votre estimation de projet Progineer',
        html: emailContent,
        cc: 'progineer.moe@gmail.com', // Admin copy
        formData,
        estimationAmount: estimationResult
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }

    // Simulate email sending in development mode
    console.log('Email envoyé à:', email);
    console.log('Copie envoyée à: progineer.moe@gmail.com');
    
    return { success: true, message: 'Email envoyé avec succès' };
  } catch (error) {
    console.error('Erreur d\'envoi d\'email:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Une erreur est survenue' };
  }
};
