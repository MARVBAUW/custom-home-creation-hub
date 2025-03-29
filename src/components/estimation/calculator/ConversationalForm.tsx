
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConversationalEstimator from './ConversationalEstimator';
import StructuredEstimator from './StructuredEstimator';
import { FormData } from './types';
import { useEstimationCalculator } from './hooks/useEstimationCalculator';

const ConversationalForm: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('conversational');
  
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
    finalizeEstimation
  } = useEstimationCalculator();

  // Gestion de la soumission du type de client
  const onClientTypeSubmit = (data: {clientType: string}) => {
    updateFormData({ clientType: data.clientType });
    // Basculer vers le formulaire structuré si l'utilisateur a choisi un type de client
    if (activeTab === 'conversational') {
      setTimeout(() => {
        setActiveTab('structured');
      }, 1000);
    }
  };

  // Traitement de l'entrée utilisateur depuis le bot conversationnel
  const processUserInput = (input: string) => {
    console.log('Input traité par le bot conversationnel:', input);
    // La logique de traitement est maintenant dans useConversationalEstimator
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
          updateFormData={updateFormData}
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
