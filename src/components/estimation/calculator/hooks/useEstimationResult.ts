
import { useState, useCallback } from 'react';
import { FormData } from '../types';

export const useEstimationResult = (formData: FormData) => {
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  
  // Fonction pour calculer l'estimation finale
  const calculateEstimation = useCallback(() => {
    // Prix de base au m²
    let basePricePerSqm = 0;
    
    // Déterminer le prix de base selon le type de projet
    if (formData.projectType?.toLowerCase().includes('construction')) {
      basePricePerSqm = 1800; // Construction neuve
    } else if (formData.projectType?.toLowerCase().includes('extension')) {
      basePricePerSqm = 2000; // Extension
    } else if (formData.projectType?.toLowerCase().includes('rénovation lourde')) {
      basePricePerSqm = 1500; // Rénovation lourde
    } else if (formData.projectType?.toLowerCase().includes('rénovation légère')) {
      basePricePerSqm = 800; // Rénovation légère
    } else if (formData.projectType?.toLowerCase().includes('réaménagement')) {
      basePricePerSqm = 600; // Réaménagement
    } else {
      basePricePerSqm = 1800; // Valeur par défaut
    }
    
    // Ajustement selon la surface
    const surface = formData.surface || 100;
    let surfaceMultiplier = 1;
    
    if (surface < 50) {
      surfaceMultiplier = 1.2; // Petites surfaces plus chères au m²
    } else if (surface > 200) {
      surfaceMultiplier = 0.9; // Grandes surfaces moins chères au m²
    }
    
    // Ajustement selon le niveau de finition
    let finishMultiplier = 1;
    
    if (formData.finishLevel === 'Basique') {
      finishMultiplier = 0.85;
    } else if (formData.finishLevel === 'Standard') {
      finishMultiplier = 1;
    } else if (formData.finishLevel === 'Premium') {
      finishMultiplier = 1.2;
    } else if (formData.finishLevel === 'Luxe') {
      finishMultiplier = 1.5;
    }
    
    // Ajustement selon les contraintes du terrain
    let terrainMultiplier = 1;
    
    if (formData.terrainType === 'pentu') {
      terrainMultiplier *= 1.1;
    } else if (formData.terrainType === 'tres-pentu') {
      terrainMultiplier *= 1.2;
    }
    
    if (formData.difficultAccess || formData.terrainAccess === 'difficile') {
      terrainMultiplier *= 1.05;
    } else if (formData.terrainAccess === 'tres-difficile') {
      terrainMultiplier *= 1.1;
    }
    
    // Ajustements spécifiques
    let specificMultiplier = 1;
    
    // Sous-sol
    if (formData.hasBasement) {
      specificMultiplier *= 1.15;
    }
    
    // Nombre de niveaux
    if (formData.levels && formData.levels > 1) {
      specificMultiplier *= (1 + ((formData.levels - 1) * 0.05));
    }
    
    // Types de matériaux
    if (formData.wallType === 'pierre' || formData.wallType === 'brique') {
      specificMultiplier *= 1.1;
    } else if (formData.wallType === 'beton-cellulaire') {
      specificMultiplier *= 0.95;
    }
    
    // Contraintes géotechniques
    if (formData.claySoil || formData.wetlandZone) {
      specificMultiplier *= 1.1;
    }
    
    if (formData.rockySoil) {
      specificMultiplier *= 1.15;
    }
    
    // Calcul du prix total
    const totalEstimation = Math.round(basePricePerSqm * surface * surfaceMultiplier * finishMultiplier * terrainMultiplier * specificMultiplier);
    
    return totalEstimation;
  }, [formData]);
  
  // Fonction pour finaliser l'estimation
  const finalizeEstimation = useCallback(() => {
    const result = calculateEstimation();
    setEstimationResult(result);
    setShowResultDialog(true);
  }, [calculateEstimation]);
  
  return {
    estimationResult,
    showResultDialog,
    setShowResultDialog,
    finalizeEstimation
  };
};
