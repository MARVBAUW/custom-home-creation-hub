
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useEstimationState } from './hooks/useEstimationState';
import StepRenderer from './components/StepRenderer';
import NavigationControls from './components/NavigationControls';
import ProgressIndicator from './components/ProgressIndicator';
import ResultsSummary from './components/ResultsSummary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, MessageSquare } from 'lucide-react';
import ConversationalEstimator from './ConversationalEstimator';
import { FormData } from './types/formTypes';

const EstimationWizard: React.FC = () => {
  const {
    state,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    finalizeEstimation
  } = useEstimationState();
  
  const [activeTab, setActiveTab] = useState<string>("structured");
  const [showResults, setShowResults] = useState(false);
  
  // Handle form completion
  const handleComplete = () => {
    const result = finalizeEstimation();
    if (result) {
      setShowResults(true);
    }
  };
  
  // Process user input from conversational estimator
  const processUserInput = (input: string) => {
    // Extract data from conversational input 
    if (input.toLowerCase().includes('maison') || input.toLowerCase().includes('construction')) {
      updateFormData({ projectType: 'construction' });
    } else if (input.toLowerCase().includes('rénovation')) {
      updateFormData({ projectType: 'renovation' });
    }
    
    // Extract surface if mentioned
    const surfaceMatch = input.match(/(\d+)\s*m²/);
    if (surfaceMatch && surfaceMatch[1]) {
      updateFormData({ surface: parseInt(surfaceMatch[1]) });
    }
  };

  // Type safe client type update function
  const updateClientType = (type: 'individual' | 'professional') => {
    updateFormData({ clientType: type });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressIndicator currentStep={state.step} totalSteps={state.totalSteps} />
      
      <Card className="mt-6">
        <CardContent className="p-6">
          {!showResults ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="structured" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  <span>Formulaire structuré</span>
                </TabsTrigger>
                <TabsTrigger value="conversational" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Assistant virtuel</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="structured" className="pt-2">
                <StepRenderer
                  step={state.step}
                  formData={state.formData}
                  updateFormData={updateFormData}
                  animationDirection={state.animationDirection}
                  goToNextStep={goToNextStep}
                  goToPreviousStep={goToPreviousStep}
                  isSubmitting={state.isSubmitting}
                  onComplete={handleComplete}
                />
                
                <NavigationControls
                  onNext={goToNextStep}
                  onPrevious={goToPreviousStep}
                  canGoNext={true}
                  canGoBack={state.step > 0}
                  isLastStep={state.step === state.totalSteps - 1}
                  onComplete={handleComplete}
                  isSubmitting={state.isSubmitting}
                />
              </TabsContent>
              
              <TabsContent value="conversational" className="pt-2">
                <ConversationalEstimator
                  formData={state.formData}
                  updateFormData={updateFormData}
                  onUserInput={processUserInput}
                  onClientTypeSubmit={(data: Partial<FormData>) => {
                    if (data.clientType === 'individual' || data.clientType === 'professional') {
                      updateClientType(data.clientType);
                      setActiveTab("structured");
                      goToNextStep();
                    }
                  }}
                  goToStep={goToStep}
                />
              </TabsContent>
            </Tabs>
          ) : (
            <ResultsSummary 
              estimationResult={state.estimationResult} 
              formData={state.formData}
              onBackClick={() => setShowResults(false)}
              showSummary={showResults}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimationWizard;
