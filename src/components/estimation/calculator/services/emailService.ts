
import { FormData } from '../types';
import { generateEstimationReport } from '../calculationUtils';
import { formatCurrency } from '@/utils/formatters';

interface EmailResponse {
  success: boolean;
  message: string;
}

/**
 * Envoie un email avec l'estimation du projet au client et en copie à l'administrateur
 */
export const sendEstimationEmail = async (
  to: string,
  formData: FormData,
  estimationAmount: number
): Promise<EmailResponse> => {
  try {
    const adminEmail = 'progineer.moe@gmail.com';
    const report = generateEstimationReport(formData, estimationAmount);
    
    // Générer le contenu HTML de l'email
    const html = generateEstimationEmailHTML(formData, estimationAmount, report);
    
    // Configurer la requête pour l'Edge Function Supabase
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-estimation-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({
        to,
        subject: `Votre estimation de projet Progineer - ${formatCurrency(estimationAmount)}`,
        html,
        cc: adminEmail,
        formData,
        estimationAmount
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erreur lors de l\'envoi de l\'email');
    }
    
    const result = await response.json();
    return {
      success: true,
      message: 'Email envoyé avec succès'
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};

/**
 * Génère le contenu HTML pour l'email d'estimation
 */
const generateEstimationEmailHTML = (
  formData: FormData,
  estimationAmount: number,
  report: any
): string => {
  // Date formatée
  const date = new Date().toLocaleDateString('fr-FR');
  
  // Informations client
  const clientType = formData.clientType === 'professional' ? 'Professionnel' : 'Particulier';
  const clientName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Client';
  
  // Détails du projet
  const projectType = getProjectTypeLabel(formData.projectType || '');
  const surface = formData.surface ? `${formData.surface} m²` : 'Non spécifiée';
  const location = formData.city || 'Non spécifiée';
  
  // Valeurs financières
  const totalHT = formatCurrency(report.estimationDetails.totalHT);
  const vat = formatCurrency(report.estimationDetails.vat);
  const totalTTC = formatCurrency(report.estimationDetails.totalTTC);
  
  // Générer les lignes du tableau pour les catégories
  const categoriesRows = report.categories.map((category: any) => 
    `<tr>
      <td style="padding: 8px; border: 1px solid #ddd;">${category.name}</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${category.percentage}%</td>
      <td style="padding: 8px; border: 1px solid #ddd;">${formatCurrency(category.amount)}</td>
    </tr>`
  ).join('');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { max-width: 200px; }
        h1 { color: #A28554; }
        h2 { color: #666; font-size: 18px; margin-top: 20px; }
        .section { margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th { background-color: #A28554; color: white; padding: 10px; text-align: left; }
        td { padding: 8px; border: 1px solid #ddd; }
        .total { font-weight: bold; background-color: #f2f2f2; }
        .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Estimation de Projet Progineer</h1>
          <p>Date: ${date}</p>
        </div>
        
        <div class="section">
          <h2>Informations Client</h2>
          <p><strong>Type de client:</strong> ${clientType}</p>
          <p><strong>Nom:</strong> ${clientName}</p>
          <p><strong>Email:</strong> ${formData.email || formData.contactEmail || 'Non spécifié'}</p>
          <p><strong>Téléphone:</strong> ${formData.phone || 'Non spécifié'}</p>
        </div>
        
        <div class="section">
          <h2>Informations Projet</h2>
          <p><strong>Type de projet:</strong> ${projectType}</p>
          <p><strong>Surface:</strong> ${surface}</p>
          <p><strong>Localisation:</strong> ${location}</p>
        </div>
        
        <div class="section">
          <h2>Estimation Financière</h2>
          <p><strong>Montant HT:</strong> ${totalHT}</p>
          <p><strong>TVA (20%):</strong> ${vat}</p>
          <p><strong>Montant TTC:</strong> ${totalTTC}</p>
        </div>
        
        <div class="section">
          <h2>Détails par Catégorie</h2>
          <table>
            <thead>
              <tr>
                <th>Catégorie</th>
                <th>Pourcentage</th>
                <th>Montant HT</th>
              </tr>
            </thead>
            <tbody>
              ${categoriesRows}
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h2>Prochaines Étapes</h2>
          <p>Un de nos experts vous contactera dans les plus brefs délais pour discuter des détails de votre projet et affiner cette estimation.</p>
          <p>N'hésitez pas à nous contacter pour toute question à <a href="mailto:progineer.moe@gmail.com">progineer.moe@gmail.com</a> ou au 01.23.45.67.89.</p>
        </div>
        
        <div class="footer">
          <p>Progineer - Solutions d'ingénierie et construction - www.progineer.fr</p>
          <p>Cette estimation est fournie à titre indicatif et pourra être ajustée après étude approfondie du projet.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

/**
 * Retourne un libellé lisible pour le type de projet
 */
const getProjectTypeLabel = (projectType: string): string => {
  const projectTypes: Record<string, string> = {
    'construction': 'Construction neuve',
    'renovation': 'Rénovation',
    'extension': 'Extension',
    'division': 'Division de propriété',
    'design': 'Design d\'intérieur',
  };
  
  return projectTypes[projectType] || projectType;
};
