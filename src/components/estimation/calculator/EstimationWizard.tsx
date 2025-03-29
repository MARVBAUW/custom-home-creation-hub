
import React, { useState, useEffect } from 'react';
import { useEstimationForm } from './hooks/useEstimationForm';
import { useEstimationSteps } from './hooks/useEstimationSteps';
import { FormData } from './types';
import { Card } from '@/components/ui/card';
import { calculateEstimation, getSafeEstimation } from './calculationUtils';
import { useToast } from "@/components/ui/use-toast";

// Import des composants d'étape
import ClientTypeStep from './steps/ClientTypeStep';
import ProjectTypeStep from './steps/ProjectTypeStep';
import TerrainDetailsStep from './steps/TerrainDetailsStep';
import ConstructionDetailsStep from './steps/ConstructionDetailsStep';
import RoomsDetailsStep from './steps/RoomsDetailsStep';
import FinishDetailsStep from './steps/FinishDetailsStep';
import SpecialFeaturesStep from './steps/SpecialFeaturesStep';
import ExteriorFeaturesStep from './steps/ExteriorFeaturesStep';
import ContactDetailsStep from './steps/ContactDetailsStep';
import EstimationResults from './steps/EstimationResults';
import RenovationDemolitionStep from './steps/RenovationDemolitionStep';
import ElectricalStep from './steps/ElectricalStep';
import PlumbingStep from './steps/PlumbingStep';
import HeatingStep from './steps/HeatingStep';
import WindowsDoorsStep from './steps/WindowsDoorsStep';
import RoofingStep from './steps/RoofingStep';
import InsulationStep from './steps/InsulationStep';

const EstimationWizard = () => {
  const { toast } = useToast();
  const { formData, updateFormData } = useEstimationForm();
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Utiliser notre hook de navigation personnalisé
  const { 
    step, 
    totalSteps, 
    goToNextStep, 
    goToPreviousStep, 
    animationDirection,
    setStep 
  } = useEstimationSteps(formData);

  // Calculer l'estimation lorsque l'étape des résultats est atteinte
  useEffect(() => {
    if (step === totalSteps - 1) {
      calculateEstimationResult();
    }
  }, [step, totalSteps]);

  const calculateEstimationResult = () => {
    setIsCalculating(true);
    console.log("Starting estimation calculation...");
    console.log("Form data for calculation:", formData);
    
    // Simuler un temps de calcul pour l'expérience utilisateur
    setTimeout(() => {
      try {
        // Utiliser la fonction getSafeEstimation pour une meilleure gestion des erreurs
        const result = getSafeEstimation(formData);
        console.log("Résultat du calcul d'estimation:", result);
        setEstimationResult(result);
        setIsCalculating(false);
      } catch (error) {
        console.error("Erreur lors du calcul de l'estimation:", error);
        setEstimationResult(50000); // Valeur par défaut en cas d'erreur
        setIsCalculating(false);
        toast({
          title: "Erreur de calcul",
          description: "Une erreur est survenue lors du calcul de l'estimation. Une valeur approximative a été utilisée.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  // Gérer les soumissions de formulaire avec la logique de navigation appropriée
  const handleClientTypeSubmit = (data: { clientType: string }) => {
    console.log("Client type submitted:", data);
    updateFormData(data);
    if (data.clientType === "professional") {
      setStep(1);
    } else {
      setStep(2);
    }
  };

  const handleProjectTypeSubmit = (data: { projectType: string, landIncluded?: string }) => {
    console.log("Project type submitted:", data);
    updateFormData(data);
    
    // Si c'est un projet de design d'espace, aller directement au formulaire de contact
    if (data.projectType === "design") {
      setStep(9); // Aller directement à l'étape de contact
    } else {
      goToNextStep();
    }
  };

  const handleEstimationTypeSubmit = (data: { 
    estimationType: string;
    termsAccepted: boolean;
  }) => {
    console.log("Estimation type submitted:", data);
    updateFormData(data);
    
    // Pour l'estimation rapide, aller directement aux prestations
    if (data.estimationType && data.estimationType.includes('Rapide')) {
      setStep(4); // Page des prestations concernées
    } else {
      // Suivre la logique normale pour l'estimation précise
      const projectType = formData.projectType || '';
      if ((projectType === 'construction' || projectType === 'extension') && 
          data.estimationType.includes('Précise')) {
        setStep(3); // Détails de construction
      } else if ((projectType === 'renovation' || projectType === 'division') && 
                data.estimationType.includes('Précise')) {
        setStep(3); // Également vers détails de construction
      } else {
        goToNextStep(); // Comportement par défaut
      }
    }
  };

  const handleTerrainDetailsSubmit = (data: any) => {
    console.log("Terrain details submitted:", data);
    updateFormData(data);
    
    // Différents chemins selon le type de projet
    if (formData.projectType === 'renovation' || formData.projectType === 'division') {
      // Pour rénovation/division, aller à l'étape de démolition
      setStep(5); // Étape de démolition
    } else {
      goToNextStep(); // Pour construction/extension, continuer normalement
    }
  };

  const handleRenovationDemolitionSubmit = (data: any) => {
    console.log("Renovation demolition submitted:", data);
    updateFormData(data);
    goToNextStep();
  };

  const handleConstructionDetailsSubmit = (data: any) => {
    console.log("Construction details submitted:", data);
    updateFormData(data);
    goToNextStep();
  };

  const handleRoomsDetailsSubmit = (data: any) => {
    console.log("Rooms details submitted:", data);
    updateFormData(data);
    goToNextStep();
  };

  const handleFinishDetailsSubmit = (data: any) => {
    console.log("Finish details submitted:", data);
    updateFormData(data);
    goToNextStep();
  };

  const handleSpecialFeaturesSubmit = (data: any) => {
    console.log("Special features submitted:", data);
    updateFormData(data);
    goToNextStep();
  };

  const handleExteriorFeaturesSubmit = (data: any) => {
    console.log("Exterior features submitted:", data);
    updateFormData(data);
    goToNextStep();
  };

  const handleContactDetailsSubmit = (data: any) => {
    console.log("Contact details submitted:", data);
    updateFormData(data);
    goToNextStep();
  };
  
  const handleElectricalSubmit = (data: { electricalType: string }) => {
    console.log("Electrical data submitted:", data);
    updateFormData(data);
    goToNextStep();
  };
  
  const handlePlumbingSubmit = (data: { plumbingType: string }) => {
    console.log("Plumbing data submitted:", data);
    updateFormData(data);
    goToNextStep();
  };
  
  const handleHeatingSubmit = (data: { heatingType: string, hasAirConditioning?: boolean }) => {
    console.log("Heating data submitted:", data);
    updateFormData(data);
    goToNextStep();
  };
  
  const handleWindowsDoorsSubmit = (data: any) => {
    console.log("Windows/Doors data submitted:", data);
    updateFormData(data);
    goToNextStep();
  };

  // Rendre le composant approprié en fonction de l'étape actuelle
  const renderStep = () => {
    console.log("Rendering step:", step, "Project type:", formData.projectType);
    
    switch (step) {
      case 0:
        return (
          <ClientTypeStep 
            formData={formData}
            updateFormData={handleClientTypeSubmit}
            goToNextStep={goToNextStep}
          />
        );
      case 1:
        return (
          <ProjectTypeStep 
            formData={formData}
            updateFormData={handleProjectTypeSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 2:
        return (
          <ProjectTypeStep 
            formData={formData}
            updateFormData={handleProjectTypeSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            isIndividual={true}
          />
        );
      case 3:
        return (
          <ConstructionDetailsStep 
            formData={formData}
            updateFormData={handleConstructionDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            estimationType={formData.estimationType}
          />
        );
      case 4:
        // Pour construction/extension : terrain normal, pour rénovation : pas de terrain
        return formData.projectType === 'renovation' || formData.projectType === 'division' ? (
          <RenovationDemolitionStep
            formData={formData}
            updateFormData={handleRenovationDemolitionSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        ) : (
          <TerrainDetailsStep 
            formData={formData}
            updateFormData={handleTerrainDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 5:
        return (
          <RoomsDetailsStep 
            formData={formData}
            updateFormData={handleRoomsDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 6:
        return (
          <WindowsDoorsStep
            formData={formData}
            updateFormData={handleWindowsDoorsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 7:
        return (
          <ElectricalStep
            formData={formData}
            updateFormData={handleElectricalSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 8:
        return (
          <PlumbingStep
            formData={formData}
            updateFormData={handlePlumbingSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 9:
        return (
          <ContactDetailsStep 
            formData={formData}
            updateFormData={handleContactDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 10:
        return (
          <EstimationResults 
            estimation={estimationResult}
            formData={formData}
            goToPreviousStep={goToPreviousStep}
            isLoading={isCalculating}
          />
        );
      default:
        // Par défaut, afficher une étape générique
        return (
          <FinishDetailsStep 
            formData={formData}
            updateFormData={handleFinishDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
    }
  };

  // Calculer la progression en pourcentage
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <Card className="p-6 shadow-xl overflow-hidden">
      {/* Barre de progression */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
        <div 
          className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Indicateur d'étape */}
      <div className="text-sm text-gray-500 mb-4">
        Étape {step + 1} sur {totalSteps}
      </div>
      
      {/* Contenu de l'étape actuelle avec animation */}
      <div className={`transform transition-all duration-300 ${
        animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
      }`}>
        {renderStep()}
      </div>
    </Card>
  );
};

export default EstimationWizard;
