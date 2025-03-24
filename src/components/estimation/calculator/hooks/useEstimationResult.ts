
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { FormData } from '../types';
import { calculateEstimation } from '../calculationUtils';

export const useEstimationResult = (formData: FormData) => {
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const { toast } = useToast();

  const finalizeEstimation = async () => {
    try {
      // Calculer l'estimation sur la base des données du formulaire
      const estimation = calculateEstimation(formData);
      setEstimationResult(estimation);
      
      // Simuler un envoi de formulaire vers un backend
      console.log("Données de formulaire pour l'estimation:", formData);
      
      // Afficher le résultat
      setShowResultDialog(true);
      
      // Notifier l'utilisateur
      toast({
        title: "Estimation complétée",
        description: "Votre estimation a été calculée avec succès.",
        duration: 5000,
      });

      // TODO: Envoyer les données au backend réel
      // Cette partie devrait être implémentée avec un appel API réel
      
    } catch (error) {
      console.error("Erreur lors du calcul de l'estimation:", error);
      
      toast({
        title: "Erreur lors de l'estimation",
        description: "Un problème est survenu lors du calcul. Veuillez réessayer.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return {
    estimationResult,
    showResultDialog,
    setShowResultDialog,
    finalizeEstimation
  };
};
