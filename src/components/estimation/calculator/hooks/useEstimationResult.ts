
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { calculateEstimation } from '../calculationUtils';
import { FormData } from '../types';

export const useEstimationResult = (formData: FormData) => {
  const { toast } = useToast();
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);

  // Finalisation de l'estimation
  const finalizeEstimation = () => {
    // Calculer l'estimation en fonction des données du formulaire
    const finalPrice = calculateEstimation(formData);
    
    // Définir le résultat et afficher la boîte de dialogue
    setEstimationResult(finalPrice);
    
    // Animation pour afficher le résultat
    setTimeout(() => {
      setShowResultDialog(true);
      
      // Jouer un son de succès
      const audio = new Audio('/sounds/success.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log('Audio play error:', e));
      
      // Afficher un effet de confetti
      import('canvas-confetti').then(confetti => {
        confetti.default({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      });
    }, 800);
    
    // Afficher un toast de succès
    toast({
      title: "Estimation terminée",
      description: "Votre estimation a été calculée avec succès.",
      duration: 5000,
    });
  };

  return {
    estimationResult,
    showResultDialog,
    setShowResultDialog,
    finalizeEstimation
  };
};
