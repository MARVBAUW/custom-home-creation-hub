
import React, { useState, useEffect } from 'react';
import { useEstimationCalculator } from './useEstimationCalculator';
import ConversationalForm from './ConversationalForm';
import { EstimationFormData } from './types';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ResultsForm from './FormSteps/ResultsForm';

const EstimationWizard: React.FC = () => {
  const [mode, setMode] = useState<string>('simple');
  const { toast } = useToast();
  
  const {
    step,
    setStep,
    totalSteps,
    formData,
    updateFormData,
    estimationResult,
    isLoading,
    animationDirection,
    goToNextStep,
    goToPreviousStep
  } = useEstimationCalculator();
  
  useEffect(() => {
    // Afficher un toast pour guider l'utilisateur
    setTimeout(() => {
      toast({
        title: "Bienvenue dans l'outil d'estimation",
        description: "Vous pouvez choisir entre une estimation rapide ou détaillée pour votre projet.",
        duration: 5000,
      })
    }, 500);
  }, [toast]);
  
  const handleStartEstimation = () => {
    // Initialiser avec quelques valeurs par défaut selon le mode
    updateFormData({
      clientType: 'individual',
      estimationType: mode,
      levels: mode === 'simple' ? '1 niveau (plain-pied)' : undefined
    });
    
    // Aller à la première étape du formulaire
    setStep(1);
  };
  
  const renderStartScreen = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg p-8 shadow-md max-w-3xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Estimation personnalisée de votre projet
      </h2>
      
      <p className="text-gray-600 mb-6 text-center">
        Choisissez le type d'estimation qui vous convient:
      </p>
      
      <Tabs defaultValue="simple" value={mode} onValueChange={setMode} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="simple">Estimation rapide</TabsTrigger>
          <TabsTrigger value="detailed">Estimation détaillée</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simple" className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Estimation rapide</h3>
          <p className="text-sm text-gray-600 mb-2">
            Obtenez une estimation approximative en quelques questions seulement.
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
            <li>Temps estimé: 2-3 minutes</li>
            <li>Précision modérée</li>
            <li>Basée sur des moyennes régionales</li>
          </ul>
        </TabsContent>
        
        <TabsContent value="detailed" className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Estimation détaillée</h3>
          <p className="text-sm text-gray-600 mb-2">
            Formulaire complet avec une estimation détaillée par corps d'état.
          </p>
          <ul className="text-sm text-gray-600 list-disc pl-5 mb-4 space-y-1">
            <li>Temps estimé: 7-10 minutes</li>
            <li>Haute précision</li>
            <li>Détaillée par corps d'état</li>
            <li>Prise en compte des spécificités</li>
          </ul>
        </TabsContent>
      </Tabs>
      
      <div className="text-center">
        <Button 
          onClick={handleStartEstimation}
          className="bg-progineer-gold hover:bg-progineer-gold/90 text-white px-6 py-2 rounded-md inline-flex items-center"
        >
          Commencer l'estimation
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
  
  // Si nous sommes sur la dernière étape et avons un résultat d'estimation
  if (step === totalSteps && estimationResult) {
    return (
      <ResultsForm 
        formData={formData}
        goToPreviousStep={goToPreviousStep}
        updateFormData={updateFormData}
        goToNextStep={goToNextStep}
        animationDirection={animationDirection}
        isLoading={isLoading}
        estimationResult={estimationResult}
      />
    );
  }

  // Si nous sommes sur la première étape (0), afficher l'écran de démarrage
  if (step === 0) {
    return renderStartScreen();
  }
  
  // Sinon, afficher le formulaire conversationnel
  return <ConversationalForm />;
};

export default EstimationWizard;
