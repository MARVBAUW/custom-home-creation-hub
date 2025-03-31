
import { FormData } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

/**
 * Sauvegarde une estimation dans le compte utilisateur
 */
export const saveEstimationToUserAccount = async (
  formData: FormData,
  estimationAmount: number
): Promise<{ success: boolean; message: string; id?: string }> => {
  try {
    // Vérifier si l'utilisateur est connecté
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return {
        success: false,
        message: 'Vous devez être connecté pour sauvegarder une estimation.'
      };
    }
    
    const userId = session.user.id;
    
    // Préparer les données à sauvegarder
    const estimationData = {
      user_id: userId,
      title: `Estimation ${formData.projectType} - ${new Date().toLocaleDateString('fr-FR')}`,
      type: 'estimation',
      is_temporary: false,
      content: {
        formData,
        estimationAmount,
        createdAt: new Date().toISOString(),
        projectType: formData.projectType,
        surface: formData.surface,
        location: formData.city,
      }
    };
    
    // Sauvegarder dans la table user_simulations
    const { data, error } = await supabase
      .from('user_simulations')
      .insert(estimationData)
      .select('id')
      .single();
    
    if (error) {
      console.error('Erreur lors de la sauvegarde de l\'estimation:', error);
      throw error;
    }
    
    return {
      success: true,
      message: 'Estimation sauvegardée avec succès',
      id: data.id
    };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'estimation:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};

/**
 * Récupère les estimations enregistrées d'un utilisateur
 */
export const getUserEstimations = async () => {
  try {
    // Vérifier si l'utilisateur est connecté
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return {
        success: false,
        message: 'Vous devez être connecté pour accéder à vos estimations.',
        data: []
      };
    }
    
    const userId = session.user.id;
    
    // Récupérer les estimations
    const { data, error } = await supabase
      .from('user_simulations')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'estimation')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erreur lors de la récupération des estimations:', error);
      throw error;
    }
    
    return {
      success: true,
      message: 'Estimations récupérées avec succès',
      data: data || []
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des estimations:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      data: []
    };
  }
};

/**
 * Supprime une estimation
 */
export const deleteEstimation = async (estimationId: string) => {
  try {
    // Vérifier si l'utilisateur est connecté
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return {
        success: false,
        message: 'Vous devez être connecté pour supprimer une estimation.'
      };
    }
    
    // Supprimer l'estimation
    const { error } = await supabase
      .from('user_simulations')
      .delete()
      .eq('id', estimationId)
      .eq('user_id', session.user.id); // Sécurité supplémentaire
    
    if (error) {
      console.error('Erreur lors de la suppression de l\'estimation:', error);
      throw error;
    }
    
    return {
      success: true,
      message: 'Estimation supprimée avec succès'
    };
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'estimation:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Erreur inconnue'
    };
  }
};

/**
 * Hook personnalisé pour la gestion des estimations utilisateur
 */
export const useEstimationStorage = () => {
  const { toast } = useToast();
  
  const saveEstimation = async (formData: FormData, estimationAmount: number) => {
    const result = await saveEstimationToUserAccount(formData, estimationAmount);
    
    if (result.success) {
      toast({
        title: "Sauvegarde réussie",
        description: "Votre estimation a été sauvegardée dans votre compte.",
      });
      return result.id;
    } else {
      toast({
        title: "Erreur",
        description: result.message,
        variant: "destructive"
      });
      return null;
    }
  };
  
  return {
    saveEstimation,
    getUserEstimations,
    deleteEstimation
  };
};
