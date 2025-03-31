
import { FormData } from './types';
import { ensureNumber } from './utils/typeConversions';

// Fonction pour calculer l'estimation en toute sécurité
export const getSafeEstimation = (formData: FormData): number => {
  try {
    return calculateEstimation(formData);
  } catch (error) {
    console.error("Erreur lors du calcul d'estimation:", error);
    // Valeur par défaut en cas d'erreur
    return 50000;
  }
};

// Fonction principale de calcul
export const calculateEstimation = (formData: FormData): number => {
  console.log("Calcul d'estimation avec les données:", formData);
  
  // Coût de base
  let totalCost = 25000;
  
  // Ajustement en fonction de la surface
  const surface = ensureNumber(formData.surface);
  if (surface > 0) {
    totalCost += surface * 1200; // 1200€ par m²
  }
  
  // Ajustement en fonction du type de projet
  if (formData.projectType === 'renovation') {
    totalCost *= 0.8; // La rénovation coûte moins cher que la construction
  } else if (formData.projectType === 'extension') {
    totalCost *= 0.9; // L'extension coûte un peu moins cher que la construction
  }
  
  // Ajustement en fonction du niveau de finition
  const finishLevel = formData.finishLevel || '';
  if (finishLevel.includes('Premium') || finishLevel.includes('premium')) {
    totalCost *= 1.3; // Premium: +30%
  } else if (finishLevel.includes('Basique') || finishLevel.includes('basique')) {
    totalCost *= 0.9; // Basique: -10%
  }
  
  // Ajustement pour les caractéristiques spéciales
  if (formData.domotic) totalCost += 8000;
  if (formData.alarm) totalCost += 3000;
  if (formData.centralVacuum) totalCost += 5000;
  if (formData.smartHome) totalCost += 12000;
  if (formData.solarPanels) totalCost += 15000;
  
  // Ajustements pour les types de pièces
  if (formData.rooms) {
    const bedrooms = ensureNumber(formData.rooms.bedrooms);
    const bathrooms = ensureNumber(formData.rooms.bathrooms);
    const kitchen = ensureNumber(formData.rooms.kitchen);
    const livingRoom = ensureNumber(formData.rooms.livingRoom);
    
    totalCost += bedrooms * 15000;
    totalCost += bathrooms * 12000;
    totalCost += kitchen * 20000;
    totalCost += livingRoom * 18000;
  }
  
  // Ajustements pour les caractéristiques électriques
  if (formData.electricalType === 'complet') totalCost += 15000;
  else if (formData.electricalType === 'partiel') totalCost += 8000;
  
  // Ajustements pour la plomberie
  if (formData.plumbingType === 'complet') totalCost += 12000;
  else if (formData.plumbingType === 'partiel') totalCost += 6000;
  
  // Ajustements pour le chauffage
  if (formData.heatingType === 'pompe_chaleur') totalCost += 15000;
  else if (formData.heatingType === 'gaz') totalCost += 8000;
  else if (formData.heatingType === 'electrique') totalCost += 5000;
  
  if (formData.hasAirConditioning) totalCost += 10000;
  
  // Ajout du prix du terrain si nécessaire
  if (formData.landIncluded === 'yes' && formData.landPrice) {
    const landPrice = ensureNumber(formData.landPrice);
    totalCost += landPrice;
  }
  
  // S'assurer que le résultat est un nombre positif
  return Math.max(totalCost, 25000);
};

// Fonction pour générer un rapport PDF à partir des données d'estimation
export const generateEstimationReport = (formData: FormData, estimationResult: number) => {
  // Cette fonction sera utilisée pour générer le rapport PDF
  console.log("Génération du rapport d'estimation pour:", formData, "Résultat:", estimationResult);
  
  // Retourne un objet avec les données formatées pour le PDF
  return {
    title: `Estimation de projet ${formData.projectType || "construction"}`,
    clientInfo: {
      clientType: formData.clientType || "individuel",
      name: formData.contactName || "Client",
      email: formData.contactEmail || "",
      phone: formData.contactPhone || "",
    },
    projectInfo: {
      type: formData.projectType || "construction",
      surface: formData.surface || 0,
      location: formData.location || "",
      description: formData.description || "",
    },
    estimationDetails: {
      totalHT: estimationResult,
      totalTTC: estimationResult * 1.2,
      vat: estimationResult * 0.2,
    },
    categories: [
      { name: "Gros œuvre", percentage: 30, amount: estimationResult * 0.3 },
      { name: "Second œuvre", percentage: 25, amount: estimationResult * 0.25 },
      { name: "Finitions", percentage: 20, amount: estimationResult * 0.2 },
      { name: "Électricité / Plomberie", percentage: 15, amount: estimationResult * 0.15 },
      { name: "Autres", percentage: 10, amount: estimationResult * 0.1 },
    ],
    date: new Date().toISOString(),
  };
};

// Fonction pour sauvegarder l'estimation dans la base de données
export const saveEstimationToUser = async (userId: string, formData: FormData, estimationResult: number) => {
  // Cette fonction sera implémentée pour sauvegarder l'estimation dans la base de données
  console.log("Sauvegarde de l'estimation pour l'utilisateur:", userId);
  
  try {
    // Ici, nous ajouterions le code pour sauvegarder dans Supabase
    // Pour l'instant, nous simulons un succès
    return {
      success: true,
      estimationId: `est-${Date.now()}`,
      message: "Estimation sauvegardée avec succès",
    };
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'estimation:", error);
    return {
      success: false,
      message: "Erreur lors de la sauvegarde de l'estimation",
    };
  }
};
