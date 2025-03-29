
import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useEstimationCalculator } from './useEstimationCalculator';
import { FormProvider } from 'react-hook-form';
import { useEstimationForm } from './hooks/useEstimationForm';
import ConversationalEstimator from './ConversationalEstimator';
import ResultsSummary from './components/ResultsSummary';
import FormNavigation from './components/FormNavigation';

interface WorkEstimationFormProps {
  formData?: any;
}

const WorkEstimationForm: React.FC<WorkEstimationFormProps> = ({ formData }) => {
  const formWrapper = useRef<HTMLDivElement>(null);
  const [showSummary, setShowSummary] = useState(false);
  
  // Utiliser le hook pour gérer les différentes étapes
  const {
    step,
    totalSteps,
    formData: estimationFormData,
    estimationResult,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep
  } = useEstimationCalculator();
  
  const { methods } = useEstimationForm();
  
  // Mise à jour des valeurs du formulaire avec les données externes si disponibles
  useEffect(() => {
    if (formData) {
      // Incorporer les données externes dans notre formulaire
      updateFormData({
        // Ajouter ici les valeurs par défaut à partir de formData si nécessaire
      });
    }
  }, [formData, updateFormData]);
  
  // Appliquer un défilement doux vers le haut du formulaire après chaque changement d'étape
  useEffect(() => {
    if (formWrapper.current) {
      formWrapper.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);
  
  // Fonction pour calculer la progression de l'étape actuelle
  const calculateProgress = () => {
    return Math.round((step / (totalSteps - 1)) * 100);
  };
  
  return (
    <div ref={formWrapper} className="relative">
      <FormProvider {...methods}>
        <div className="w-full">
          {/* Barre de progression */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div 
              className="h-2 bg-progineer-gold rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          
          {/* Information sur l'étape actuelle */}
          <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
            <span>Étape {step + 1} sur {totalSteps}</span>
            <span>{calculateProgress()}% complété</span>
          </div>
          
          {/* Formulaire d'estimation - version conversationnelle */}
          <Card className="overflow-hidden border border-gray-200">
            <div className="p-6">
              {showSummary ? (
                <ResultsSummary 
                  formData={estimationFormData}
                  estimationResult={estimationResult}
                  onBack={() => setShowSummary(false)}
                />
              ) : (
                <ConversationalEstimator
                  step={step}
                  formData={estimationFormData}
                  animationDirection={animationDirection}
                  updateFormData={updateFormData}
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep}
                  onComplete={() => setShowSummary(true)}
                  estimationData={formData || {}}
                />
              )}
            </div>
          </Card>
          
          {/* Navigation du formulaire (uniquement pour les étapes intermédiaires) */}
          {!showSummary && step > 0 && step < totalSteps - 1 && (
            <FormNavigation 
              step={step}
              totalSteps={totalSteps}
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
            />
          )}
          
          <div className="text-xs text-center text-gray-500 mt-4">
            * Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default WorkEstimationForm;
