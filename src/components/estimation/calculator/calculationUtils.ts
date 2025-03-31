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
