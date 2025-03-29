
import React, { useMemo } from 'react';
import { useFormWizard } from './hooks/useFormWizard';
import { calculateDetailedEstimation } from './calculations/detailedEstimation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calculator, CheckCircle } from 'lucide-react';

// Import form steps
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

// Type pour les données du formulaire
import { FormData } from './types';

const formSteps = [
  {
    id: 'client-type',
    title: 'Type de client',
    description: 'Êtes-vous un particulier ou un professionnel?',
  },
  {
    id: 'project-type',
    title: 'Type de projet',
    description: 'Quel type de projet souhaitez-vous réaliser?',
  },
  {
    id: 'terrain-details',
    title: 'Détails du terrain',
    description: 'Informations sur votre terrain',
    condition: (formData: FormData) => formData.landIncluded === 'yes'
  },
  {
    id: 'construction-details',
    title: 'Détails de construction',
    description: 'Structure et caractéristiques principales',
  },
  {
    id: 'rooms-details',
    title: 'Pièces et niveaux',
    description: 'Configuration des espaces',
  },
  {
    id: 'finish-details',
    title: 'Finitions',
    description: 'Niveau de qualité et matériaux',
  },
  {
    id: 'special-features',
    title: 'Équipements spéciaux',
    description: 'Technologies et équipements',
    isOptional: true,
  },
  {
    id: 'exterior-features',
    title: 'Extérieurs',
    description: 'Aménagements extérieurs',
    isOptional: true,
  },
  {
    id: 'contact-details',
    title: 'Vos coordonnées',
    description: 'Pour recevoir votre estimation détaillée',
  },
];

const EstimationWizard = () => {
  const {
    formData,
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep
  } = useFormWizard(formSteps, {
    clientType: 'individual',
    projectType: 'construction',
    landIncluded: 'yes',
  });

  const estimationResult = useMemo(() => {
    if (currentStepIndex === totalSteps - 1) {
      return calculateDetailedEstimation(formData);
    }
    return null;
  }, [currentStepIndex, formData, totalSteps]);

  const renderStep = () => {
    const commonProps = {
      formData,
      updateFormData,
      goToNextStep,
    };

    switch (currentStep.id) {
      case 'client-type':
        return <ClientTypeStep {...commonProps} />;
      case 'project-type':
        return <ProjectTypeStep {...commonProps} />;
      case 'terrain-details':
        return <TerrainDetailsStep {...commonProps} />;
      case 'construction-details':
        return <ConstructionDetailsStep {...commonProps} />;
      case 'rooms-details':
        return <RoomsDetailsStep {...commonProps} />;
      case 'finish-details':
        return <FinishDetailsStep {...commonProps} />;
      case 'special-features':
        return <SpecialFeaturesStep {...commonProps} />;
      case 'exterior-features':
        return <ExteriorFeaturesStep {...commonProps} />;
      case 'contact-details':
        return <ContactDetailsStep {...commonProps} />;
      default:
        return <div>Étape non définie</div>;
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            {currentStep.title}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Étape {currentStepIndex + 1} sur {totalSteps}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        {currentStep.description && (
          <p className="text-sm text-muted-foreground mt-2">{currentStep.description}</p>
        )}
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ 
              x: animationDirection === 'forward' ? 15 : -15, 
              opacity: 0 
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ 
              x: animationDirection === 'forward' ? -15 : 15, 
              opacity: 0 
            }}
            transition={{ duration: 0.3 }}
          >
            {currentStepIndex === totalSteps ? (
              <EstimationResults 
                estimation={estimationResult} 
                formData={formData} 
              />
            ) : (
              renderStep()
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={goToPreviousStep}
          disabled={currentStepIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Précédent
        </Button>

        {currentStepIndex < totalSteps - 1 ? (
          <Button onClick={goToNextStep}>
            {currentStep.isOptional ? 'Passer' : 'Suivant'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={goToNextStep} className="bg-green-600 hover:bg-green-700">
            <Calculator className="mr-2 h-4 w-4" />
            Calculer l'estimation
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EstimationWizard;
