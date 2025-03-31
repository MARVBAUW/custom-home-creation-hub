
import { FormData } from './types';

// Calculer l'estimation en fonction des données du formulaire
export const calculateEstimation = (formData: FormData): number => {
  try {
    // Base de calcul : prix au m²
    let basePrice = 1500;
    
    // Convertir la surface en nombre
    const surface = typeof formData.surface === 'string' 
      ? parseFloat(formData.surface) 
      : (formData.surface || 100);
    
    // Ajustements en fonction du type de projet
    if (formData.projectType === 'construction') {
      basePrice = 1800;
    } else if (formData.projectType === 'renovation') {
      basePrice = 1200;
    } else if (formData.projectType === 'extension') {
      basePrice = 1600;
    }
    
    // Ajustements en fonction du type de client
    if (formData.clientType === 'professional') {
      basePrice *= 0.9; // 10% de réduction pour les professionnels
    }
    
    // Ajustements en fonction du niveau de finition
    if (formData.finishLevel === 'high') {
      basePrice *= 1.2; // +20% pour finitions haut de gamme
    } else if (formData.finishLevel === 'luxury') {
      basePrice *= 1.5; // +50% pour finitions luxueuses
    }
    
    // Calcul final
    return Math.round(basePrice * surface);
  } catch (error) {
    console.error("Erreur lors du calcul de l'estimation:", error);
    return 50000; // Valeur par défaut en cas d'erreur
  }
};

// Obtenir une estimation sécurisée (avec gestion d'erreurs)
export const getSafeEstimation = (formData: FormData): number => {
  try {
    return calculateEstimation(formData);
  } catch (error) {
    console.error("Erreur lors du calcul de l'estimation:", error);
    return 50000; // Valeur par défaut en cas d'erreur
  }
};

// Générer un rapport complet d'estimation pour PDF et email
export const generateEstimationReport = (formData: FormData, estimationAmount: number) => {
  // Calculer TVA et montant TTC
  const tvaRate = 0.2; // 20%
  const totalHT = estimationAmount;
  const vat = totalHT * tvaRate;
  const totalTTC = totalHT + vat;
  
  // Préparer les informations client
  const clientInfo = {
    clientType: formData.clientType || 'individual',
    name: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Client',
    email: formData.email || formData.contactEmail || 'Non spécifié',
    phone: formData.phone || 'Non spécifié',
    company: formData.company || '',
  };
  
  // Préparer les informations du projet
  const projectInfo = {
    type: getProjectTypeLabel(formData.projectType || ''),
    surface: formData.surface || 'Non spécifiée',
    location: formData.city || 'Non spécifiée',
    constructionType: formData.constructionType || 'standard',
    constructionStyle: formData.constructionStyle || '',
  };
  
  // Préparer les détails financiers
  const estimationDetails = {
    totalHT,
    vat,
    totalTTC,
    paymentSchedule: generatePaymentSchedule(totalTTC),
  };
  
  // Calculer la répartition des coûts par catégorie
  const categories = calculateCostBreakdown(totalHT, formData);
  
  // Retourner le rapport complet
  return {
    clientInfo,
    projectInfo,
    estimationDetails,
    categories,
    date: new Date().toISOString(),
  };
};

// Générer un échéancier de paiement
const generatePaymentSchedule = (totalAmount: number) => {
  return [
    { phase: 'Signature du contrat', percentage: 5, amount: totalAmount * 0.05 },
    { phase: 'Validation des plans', percentage: 15, amount: totalAmount * 0.15 },
    { phase: 'Début des travaux', percentage: 30, amount: totalAmount * 0.3 },
    { phase: 'Gros œuvre terminé', percentage: 25, amount: totalAmount * 0.25 },
    { phase: 'Second œuvre terminé', percentage: 20, amount: totalAmount * 0.2 },
    { phase: 'Réception des travaux', percentage: 5, amount: totalAmount * 0.05 },
  ];
};

// Calculer la répartition des coûts par catégorie
const calculateCostBreakdown = (totalEstimation: number, formData: FormData) => {
  // Répartition par défaut
  const defaultBreakdown = [
    { name: 'Terrassement & Fondations', percentage: 15 },
    { name: 'Gros Œuvre', percentage: 25 },
    { name: 'Charpente & Couverture', percentage: 15 },
    { name: 'Menuiseries', percentage: 10 },
    { name: 'Plomberie & Électricité', percentage: 15 },
    { name: 'Isolation & Plâtrerie', percentage: 10 },
    { name: 'Finitions & Revêtements', percentage: 8 },
    { name: 'Divers & Imprévus', percentage: 2 },
  ];
  
  // Ajuster la répartition en fonction du type de projet
  let breakdown = [...defaultBreakdown];
  
  if (formData.projectType === 'renovation') {
    breakdown = [
      { name: 'Démolition & Préparation', percentage: 10 },
      { name: 'Gros Œuvre', percentage: 20 },
      { name: 'Menuiseries', percentage: 15 },
      { name: 'Plomberie & Électricité', percentage: 20 },
      { name: 'Isolation & Plâtrerie', percentage: 15 },
      { name: 'Finitions & Revêtements', percentage: 15 },
      { name: 'Divers & Imprévus', percentage: 5 },
    ];
  } else if (formData.projectType === 'extension') {
    breakdown = [
      { name: 'Terrassement & Fondations', percentage: 12 },
      { name: 'Gros Œuvre', percentage: 25 },
      { name: 'Charpente & Couverture', percentage: 15 },
      { name: 'Raccords au bâtiment existant', percentage: 8 },
      { name: 'Menuiseries', percentage: 10 },
      { name: 'Plomberie & Électricité', percentage: 13 },
      { name: 'Isolation & Plâtrerie', percentage: 10 },
      { name: 'Finitions & Revêtements', percentage: 7 },
    ];
  }
  
  // Calculer les montants pour chaque catégorie
  return breakdown.map(category => ({
    ...category,
    amount: (totalEstimation * category.percentage) / 100
  }));
};

// Fonction utilitaire pour obtenir un libellé lisible pour le type de projet
export const getProjectTypeLabel = (projectType: string): string => {
  const projectTypes: Record<string, string> = {
    'construction': 'Construction neuve',
    'renovation': 'Rénovation',
    'extension': 'Extension',
    'division': 'Division de propriété',
    'design': 'Design d\'intérieur',
  };
  
  return projectTypes[projectType] || projectType;
};
