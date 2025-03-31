
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConversationalEstimator from './ConversationalEstimator';
import StructuredEstimator from './StructuredEstimator';
import { useEstimationCalculator } from './useEstimationCalculator';
import { useToast } from '@/hooks/use-toast';
import { createTypeAdaptingUpdater } from './utils/dataAdapter';

const ConversationalForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('conversational');
  const { toast } = useToast();
  
  // Use the updated hook that includes all required properties
  const {
    step,
    setStep,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    finalizeEstimation,
    calculateEstimationResult
  } = useEstimationCalculator();

  // Create a type-adapting updater function to handle type conversions between FormData and EstimationFormData
  const adaptedUpdateFormData = createTypeAdaptingUpdater(updateFormData);

  // Afficher un toast au chargement du composant
  React.useEffect(() => {
    // Message informant l'utilisateur du formulaire d'estimation conversationnel
    setTimeout(() => {
      toast({
        title: "Estimation personnalisée disponible",
        description: "Vous pouvez obtenir une estimation détaillée de votre projet en discutant avec notre assistant virtuel ou en utilisant notre formulaire structuré.",
        duration: 5000,
      });
    }, 1000);
  }, [toast]);

  // Gestion de la soumission du type de client
  const onClientTypeSubmit = (data: {clientType: string}) => {
    if (data && data.clientType) {
      adaptedUpdateFormData({ clientType: data.clientType });
      // Basculer vers le formulaire structuré si l'utilisateur a choisi un type de client
      if (activeTab === 'conversational') {
        setTimeout(() => {
          setActiveTab('structured');
        }, 1000);
      }
    }
  };

  // Traitement de l'entrée utilisateur depuis le bot conversationnel
  const processUserInput = (input: string) => {
    console.log('Input traité par le bot conversationnel:', input);
    
    // Analyser l'entrée pour extraire les données du formulaire
    if (input.toLowerCase().includes('maison') || input.toLowerCase().includes('construction')) {
      adaptedUpdateFormData({ projectType: 'construction' });
    } else if (input.toLowerCase().includes('rénovation') || input.toLowerCase().includes('renovation')) {
      adaptedUpdateFormData({ projectType: 'renovation' });
    } else if (input.toLowerCase().includes('extension')) {
      adaptedUpdateFormData({ projectType: 'extension' });
    }
    
    // Extraire les informations de surface si mentionnées
    const surfaceMatch = input.match(/(\d+)\s*m²/);
    if (surfaceMatch && surfaceMatch[1]) {
      adaptedUpdateFormData({ surface: parseInt(surfaceMatch[1]) });
    }
    
    // Extraire d'autres informations comme le lieu, le budget, etc.
    // ...
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="conversational" className="rounded-md">Assisté par IA</TabsTrigger>
        <TabsTrigger value="structured" className="rounded-md">Formulaire détaillé</TabsTrigger>
      </TabsList>
      
      <TabsContent value="conversational" className="pt-4">
        <ConversationalEstimator 
          onUserInput={processUserInput} 
          formData={formData} 
          updateFormData={adaptedUpdateFormData}
          onClientTypeSubmit={onClientTypeSubmit}
          goToStep={setStep}
        />
      </TabsContent>
      
      <TabsContent value="structured" className="pt-4">
        <StructuredEstimator />
      </TabsContent>
    </Tabs>
  );
};

export default ConversationalForm;
