
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { getVisibleSteps } from './steps';
import { calculateEstimation } from './calculationUtils';
import { FormData } from './types';

export const useEstimationCalculator = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(23);
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');
  
  // Données du formulaire
  const [formData, setFormData] = useState<FormData>({
    clientType: "",
    activity: "",
    projectType: "",
    startDate: "",
    endDate: "",
    estimationType: "",
    termsAccepted: false,
    surface: "",
    levels: "",
    units: "",
    terrainType: [],
    wallType: "",
    roofType: "",
    atticType: "",
    roofingType: "",
    insulationType: "",
    stonePercentage: "0",
    plasterPercentage: "0",
    brickPercentage: "0",
    metalCladdingPercentage: "0",
    woodCladdingPercentage: "0",
    stoneCladdingPercentage: "0",
    windowType: "",
    electricalType: "",
    plumbingType: "",
    heatingType: "",
    hasAirConditioning: "",
    plasteringType: "",
    doorType: "",
    interiorFittings: [],
    floorTileType: "",
    wallTileType: "",
    floorTilePercentage: "0",
    parquetType: "",
    parquetPercentage: "0",
    softFloorType: "",
    softFloorPercentage: "0",
    basicPaintPercentage: "0",
    decorativePaintPercentage: "0",
    wallpaperPercentage: "0",
    woodCladPercentage: "0",
    stoneCladPercentage: "0",
    energyType: "",
    solutionType: "",
    landscapeLevel: "",
    fencingLength: "0",
    gateLength: "0",
    terraceArea: "0",
    landscapeArea: "0",
    carport: "none",
    pool: "none",
    poolArea: "0",
    poolHeating: "no",
    jacuzzi: "none",
    jacuzziArea: "0",
    kitchenType: "",
    bathroomType: "",
    bathroomCount: "0",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // Calculer les étapes visibles en fonction des données du formulaire
  const visibleSteps = getVisibleSteps(formData);
  
  // Mettre à jour le nombre total d'étapes lorsque les données du formulaire changent
  useEffect(() => {
    setTotalSteps(visibleSteps.length);
  }, [formData.clientType, formData.projectType, formData.estimationType]);

  // Naviguer à l'étape suivante
  const goToNextStep = () => {
    setAnimationDirection('forward');
    setStep(prevStep => Math.min(prevStep + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Naviguer à l'étape précédente
  const goToPreviousStep = () => {
    setAnimationDirection('backward');
    setStep(prevStep => Math.max(prevStep - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Mise à jour des données du formulaire
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  // Soumission du formulaire de type de client
  const onClientTypeSubmit = (data: { clientType: string }) => {
    updateFormData({ clientType: data.clientType });
    
    // Déterminer l'étape suivante en fonction du type de client
    if (data.clientType === "professional") {
      setStep(2); // Infos projet pro
    } else {
      setStep(3); // Infos projet particulier
    }
  };

  // Soumission du formulaire de projet professionnel
  const onProfessionalProjectSubmit = (data: { 
    activity: string;
    projectType: string;
    startDate: string;
    endDate: string;
  }) => {
    updateFormData({
      activity: data.activity,
      projectType: data.projectType,
      startDate: data.startDate,
      endDate: data.endDate,
    });
    setStep(4); // Type d'estimation
  };

  // Soumission du formulaire de projet particulier
  const onIndividualProjectSubmit = (data: { projectType: string }) => {
    updateFormData({ projectType: data.projectType });
    
    // Sauter certaines étapes pour les projets d'optimisation ou de design
    if (data.projectType === "optimization" || data.projectType === "design") {
      setStep(1); // Revenir à la sélection du profil
      toast({
        title: "Type de projet non disponible",
        description: "L'estimation pour ce type de projet nécessite un contact direct avec nos équipes.",
        duration: 5000,
      });
    } else {
      setStep(4); // Type d'estimation
    }
  };

  // Soumission du formulaire de type d'estimation
  const onEstimationTypeSubmit = (data: { 
    estimationType: string;
    termsAccepted: boolean;
  }) => {
    updateFormData({
      estimationType: data.estimationType,
      termsAccepted: data.termsAccepted,
    });
    setStep(5); // Détails de construction
  };

  // Soumission du formulaire de coordonnées et calcul de l'estimation
  const onContactSubmit = (data: { 
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) => {
    updateFormData({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
    });
    
    // Calculer l'estimation
    finalizeEstimation();
  };

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
    step,
    setStep,
    totalSteps,
    estimationResult,
    showResultDialog,
    setShowResultDialog,
    animationDirection,
    formData,
    visibleSteps,
    goToNextStep,
    goToPreviousStep,
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onContactSubmit,
    updateFormData,
  };
};
