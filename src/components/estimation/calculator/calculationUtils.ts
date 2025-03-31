
import { FormData } from "./types";
import { ensureNumber } from "./utils/typeConversions";
import { calculateEstimation } from './calculations/simpleEstimation';

// Type for saved estimations
export interface SavedEstimation {
  id: string;
  userId: string;
  projectName: string;
  formData: FormData;
  estimationAmount: number;
  createdAt: string;
}

// Re-export the calculateEstimation function 
export { calculateEstimation };

// Fonction pour sauvegarder une estimation pour un utilisateur
export const saveEstimationToUser = async (
  userId: string,
  formData: FormData,
  estimationAmount: number
): Promise<{ success: boolean; message: string; id?: string }> => {
  try {
    // En production, vous utiliseriez Supabase ou une autre base de données
    // Ici, nous simulerons la sauvegarde dans localStorage
    const estimationId = `est_${Date.now()}`;
    const savedEstimation: SavedEstimation = {
      id: estimationId,
      userId,
      projectName: formData.projectName || "Mon projet",
      formData,
      estimationAmount,
      createdAt: new Date().toISOString(),
    };

    // Récupérer les estimations existantes
    const existingEstimationsStr = localStorage.getItem(`estimations_${userId}`);
    const existingEstimations: SavedEstimation[] = existingEstimationsStr
      ? JSON.parse(existingEstimationsStr)
      : [];

    // Ajouter la nouvelle estimation
    existingEstimations.push(savedEstimation);

    // Sauvegarder dans localStorage
    localStorage.setItem(
      `estimations_${userId}`,
      JSON.stringify(existingEstimations)
    );

    console.log("Estimation sauvegardée:", savedEstimation);

    return {
      success: true,
      message: "Estimation sauvegardée avec succès",
      id: estimationId,
    };
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de l'estimation:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la sauvegarde",
    };
  }
};

// Fonction pour récupérer toutes les estimations d'un utilisateur
export const getUserEstimations = async (
  userId: string
): Promise<SavedEstimation[]> => {
  try {
    // En production, vous utiliseriez Supabase ou une autre base de données
    // Ici, nous récupérons depuis localStorage
    const estimationsStr = localStorage.getItem(`estimations_${userId}`);
    const estimations: SavedEstimation[] = estimationsStr
      ? JSON.parse(estimationsStr)
      : [];

    // Trier par date de création (plus récent en premier)
    return estimations.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des estimations:", error);
    return [];
  }
};

// Fonction pour récupérer une estimation spécifique
export const getEstimationById = async (
  userId: string,
  estimationId: string
): Promise<SavedEstimation | null> => {
  try {
    const estimations = await getUserEstimations(userId);
    return estimations.find((est) => est.id === estimationId) || null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'estimation:", error);
    return null;
  }
};

// Fonction pour supprimer une estimation
export const deleteEstimation = async (
  userId: string,
  estimationId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    // Récupérer les estimations existantes
    const estimations = await getUserEstimations(userId);
    
    // Filtrer pour supprimer l'estimation spécifiée
    const updatedEstimations = estimations.filter(
      (est) => est.id !== estimationId
    );
    
    // Sauvegarder la liste mise à jour
    localStorage.setItem(
      `estimations_${userId}`,
      JSON.stringify(updatedEstimations)
    );
    
    return {
      success: true,
      message: "Estimation supprimée avec succès",
    };
  } catch (error) {
    console.error("Erreur lors de la suppression de l'estimation:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de la suppression",
    };
  }
};

// Fonction pour éviter les erreurs dans le calcul de l'estimation
export const getSafeEstimation = (formData: FormData): number => {
  try {
    const result = calculateEstimation(formData);
    if (typeof result !== 'number' || isNaN(result)) {
      console.error('Calcul invalide, utilisation d\'une valeur par défaut');
      return 150000; // Valeur par défaut en cas d'erreur
    }
    return result;
  } catch (error) {
    console.error('Erreur lors du calcul:', error);
    return 150000; // Valeur par défaut en cas d'erreur
  }
};

// Add generateEstimationReport function
export const generateEstimationReport = (
  formData: FormData,
  estimationResult: number
): {
  clientInfo: {
    clientType: string;
    name: string;
    email: string;
    phone: string;
  };
  projectInfo: {
    type: string;
    surface: string | number;
    location: string;
  };
  estimationDetails: {
    totalHT: number;
    vat: number;
    totalTTC: number;
  };
  categories: Array<{
    name: string;
    percentage: number;
    amount: number;
  }>;
} => {
  // Calculate VAT and TTC
  const vat = estimationResult * 0.2;
  const totalTTC = estimationResult + vat;

  // Get name from form data
  const name = [formData.firstName, formData.lastName]
    .filter(Boolean)
    .join(" ") || "Client";

  // Create categories with default percentages
  const categories = [
    { name: "Gros œuvre", percentage: 30, amount: estimationResult * 0.3 },
    { name: "Charpente / Couverture", percentage: 15, amount: estimationResult * 0.15 },
    { name: "Menuiseries extérieures", percentage: 10, amount: estimationResult * 0.1 },
    { name: "Cloisons / Isolation", percentage: 8, amount: estimationResult * 0.08 },
    { name: "Électricité", percentage: 7, amount: estimationResult * 0.07 },
    { name: "Plomberie", percentage: 7, amount: estimationResult * 0.07 },
    { name: "Chauffage", percentage: 6, amount: estimationResult * 0.06 },
    { name: "Revêtements", percentage: 10, amount: estimationResult * 0.1 },
    { name: "Aménagements extérieurs", percentage: 5, amount: estimationResult * 0.05 },
    { name: "Études et honoraires", percentage: 2, amount: estimationResult * 0.02 },
  ];

  return {
    clientInfo: {
      clientType: formData.clientType || "individual",
      name: name,
      email: formData.email || formData.contactEmail || "",
      phone: formData.phone || "",
    },
    projectInfo: {
      type: formData.projectType || "construction",
      surface: formData.surface || "N/A",
      location: formData.location || formData.city || "N/A",
    },
    estimationDetails: {
      totalHT: estimationResult,
      vat: vat,
      totalTTC: totalTTC,
    },
    categories: categories,
  };
};
