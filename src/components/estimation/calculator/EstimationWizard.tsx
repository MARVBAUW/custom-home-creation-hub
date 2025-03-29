
import React, { useState, useEffect } from 'react';
import { useEstimationForm } from './hooks/useEstimationForm';
import { useEstimationSteps } from './hooks/useEstimationSteps';
import { FormData } from './types';
import { Card } from '@/components/ui/card';
import { calculateEstimation } from './calculationUtils';
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

const EstimationWizard = () => {
  const { toast } = useToast();
  const { formData, updateFormData } = useEstimationForm();
  const [estimationResult, setEstimationResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const { 
    step, 
    totalSteps, 
    goToNextStep, 
    goToPreviousStep, 
    animationDirection,
    setStep 
  } = useEstimationSteps(formData);

  // Calculer l'estimation lorsque les données du formulaire changent
  useEffect(() => {
    if (step === totalSteps - 1) {
      calculateEstimationResult();
    }
  }, [step, totalSteps]);

  const calculateEstimationResult = () => {
    setIsCalculating(true);
    
    // Simuler un temps de calcul pour l'expérience utilisateur
    setTimeout(() => {
      try {
        // Utiliser la fonction de calcul pour obtenir une estimation
        const result = calculateEstimation(formData);
        setEstimationResult(result);
      } catch (error) {
        console.error("Erreur lors du calcul de l'estimation:", error);
        toast({
          title: "Erreur de calcul",
          description: "Une erreur est survenue lors du calcul de l'estimation. Veuillez réessayer.",
          variant: "destructive",
        });
      } finally {
        setIsCalculating(false);
      }
    }, 1500);
  };

  const handleClientTypeSubmit = (data: { clientType: string }) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleProjectTypeSubmit = (data: { projectType: string, landIncluded?: string }) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleTerrainDetailsSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleConstructionDetailsSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleRoomsDetailsSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleFinishDetailsSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleSpecialFeaturesSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleExteriorFeaturesSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleContactDetailsSubmit = (data: any) => {
    updateFormData(data);
    goToNextStep();
  };

  const renderStep = () => {
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
          <TerrainDetailsStep 
            formData={formData}
            updateFormData={handleTerrainDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 3:
        return (
          <ConstructionDetailsStep 
            formData={formData}
            updateFormData={handleConstructionDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 4:
        return (
          <RoomsDetailsStep 
            formData={formData}
            updateFormData={handleRoomsDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 5:
        return (
          <FinishDetailsStep 
            formData={formData}
            updateFormData={handleFinishDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 6:
        return (
          <SpecialFeaturesStep 
            formData={formData}
            updateFormData={handleSpecialFeaturesSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 7:
        return (
          <ExteriorFeaturesStep 
            formData={formData}
            updateFormData={handleExteriorFeaturesSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 8:
        return (
          <ContactDetailsStep 
            formData={formData}
            updateFormData={handleContactDetailsSubmit}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
          />
        );
      case 9:
        return (
          <EstimationResults 
            estimation={estimationResult}
            formData={formData}
            goToPreviousStep={goToPreviousStep}
          />
        );
      default:
        return null;
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
