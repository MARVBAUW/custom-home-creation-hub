
import { useState, useEffect } from 'react';

export const useVisualizerState = (step: number, totalSteps: number) => {
  const [buildingProgress, setBuildingProgress] = useState(0);
  const [showWorkers, setShowWorkers] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

  // Mettre à jour la progression du bâtiment en fonction de l'étape
  useEffect(() => {
    const progress = Math.min(100, (step / totalSteps) * 100);
    setBuildingProgress(progress);

    // Afficher les travailleurs à partir de l'étape 5
    if (step >= 5 && !showWorkers) {
      setShowWorkers(true);
    }

    // Afficher les matériaux à partir de l'étape 8
    if (step >= 8 && !showMaterials) {
      setShowMaterials(true);
    }
  }, [step, totalSteps, showWorkers, showMaterials]);

  return {
    buildingProgress,
    showWorkers,
    showMaterials
  };
};
