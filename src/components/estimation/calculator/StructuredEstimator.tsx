import React, { useState, useEffect } from 'react';
import { useEstimationCalculator } from './useEstimationCalculator';
import { EstimationResponseData } from './types/estimationTypes';
import { AnimatePresence, motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  AlertTriangle
} from 'lucide-react';
import StepIndicator from './components/StepIndicator';
import { createTypeAdaptingUpdater } from './utils/dataAdapter';
import { safeRenderValue } from './utils/typeConversions';

const StructuredEstimator: React.FC = () => {
  const {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    showResultDialog,
    setShowResultDialog,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    finalizeEstimation
  } = useEstimationCalculator();

  // Adapted updater function that handles type conversions
  const adaptedUpdateFormData = createTypeAdaptingUpdater(updateFormData);
  
  // Additional state
  const [errors, setErrors] = useState<string[]>([]);
  const [warningShown, setWarningShown] = useState(false);
  
  // Animation variants
  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -300 : 300,
      opacity: 0
    })
  };
  
  // Validate current step
  const validateCurrentStep = (): boolean => {
    const newErrors: string[] = [];
    
    // Basic validation based on step
    if (step === 0 && !formData.projectType) {
      newErrors.push("Veuillez sélectionner un type de projet");
    }
    
    if (step === 1 && !formData.surface) {
      newErrors.push("Veuillez spécifier une surface");
    }
    
    // Update errors state
    setErrors(newErrors);
    return newErrors.length === 0;
  };
  
  // Handle next button click
  const handleNext = () => {
    if (validateCurrentStep()) {
      goToNextStep();
      setWarningShown(false);
    }
  };
  
  // Handle form completion
  const handleComplete = () => {
    if (validateCurrentStep()) {
      const result = finalizeEstimation();
      console.log("Estimation result:", result);
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  // Rest of your component...

  // Determine if we should show results or the form
  if (showResultDialog && estimationResult) {
    return (
      <div className="space-y-4">
        <Card className="bg-green-50 border-green-200 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center mb-4 text-green-600">
              <Check className="h-6 w-6 mr-2" />
              <h3 className="text-lg font-medium">Estimation terminée</h3>
            </div>
            
            <div className="space-y-3">
              <p>
                Votre projet de {formData.projectType || 'construction'} à{' '}
                {formData.city || 'votre emplacement'} ({formData.surface || 0} m²)
              </p>
              
              <div className="bg-white p-4 rounded-md border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Estimation totale</div>
                <div className="text-2xl font-bold">{formatCurrency(estimationResult.totalAmount)}</div>
                <div className="text-sm text-gray-500">Soit environ {formatCurrency(estimationResult.totalAmount / Number(formData.surface || 1))} / m²</div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Construction</div>
                  <div className="font-semibold">{formatCurrency(estimationResult.constructionCosts.total)}</div>
                </div>
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Honoraires</div>
                  <div className="font-semibold">{formatCurrency(estimationResult.fees.total)}</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={() => setShowResultDialog(false)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Modifier les détails
              </Button>
              <Button 
                onClick={() => {
                  console.log("Save or export estimation", estimationResult);
                  // Here you'd implement save or export functionality
                }}
              >
                Télécharger le détail
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main estimation form
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <StepIndicator 
          currentStep={step} 
          totalSteps={totalSteps} 
          goToStep={(index) => {
            if (index < step) {
              setStep(index);
            }
          }} 
        />
      </div>
      
      {errors.length > 0 && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md border border-red-200 mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Veuillez corriger les problèmes suivants:</p>
            <ul className="list-disc pl-5 text-sm">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {step > 5 && !warningShown && (
        <div className="bg-amber-50 text-amber-700 p-3 rounded-md border border-amber-200 mb-4 flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Conseil pour une meilleure estimation</p>
            <p className="text-sm">
              Plus vous fournissez de détails, plus l'estimation sera précise. 
              Vous pouvez toujours revenir en arrière pour modifier vos réponses.
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-amber-700 mt-1 p-0 h-auto"
              onClick={() => setWarningShown(true)}
            >
              Ne plus afficher
            </Button>
          </div>
        </div>
      )}
      
      <AnimatePresence mode="wait" initial={false} custom={animationDirection}>
        <motion.div
          key={step}
          custom={animationDirection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: "tween", duration: 0.3 }}
          className="bg-white rounded-lg shadow-sm border p-6"
        >
          {/* Here you would render different form steps based on current step */}
          <div className="min-h-[300px]">
            {/* This is a placeholder, you would replace with your actual form components */}
            <h3 className="text-lg font-medium mb-4">
              Étape {step + 1}: {getStepTitle(step)}
            </h3>
            
            <div className="mb-4">
              <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-[150px]">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </div>
            
            <p className="text-gray-600">
              Ceci est un formulaire de démonstration. Implémentez les composants de formulaire réels ici.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-between mt-4">
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
          disabled={step === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>
        
        {step < totalSteps - 1 ? (
          <Button onClick={handleNext}>
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleComplete}>
            Finaliser l'estimation
            <Check className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

// Helper function to get step title
function getStepTitle(step: number): string {
  const titles = [
    "Type de projet",
    "Informations générales",
    "Emplacement",
    "Surface et dimensions",
    "Construction",
    "Finitions",
    "Extérieur",
    "Équipements techniques",
    "Budget",
    "Informations de contact",
    "Résumé"
  ];
  
  return titles[step] || "Détails du projet";
}

export default StructuredEstimator;
