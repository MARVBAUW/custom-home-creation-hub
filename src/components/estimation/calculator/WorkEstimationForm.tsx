import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useEstimationCalculator } from './hooks/useEstimationCalculator';
import { FormProvider } from 'react-hook-form';
import { useEstimationForm } from './hooks/useEstimationForm';
import ConversationalEstimator from './ConversationalEstimator';
import ResultsSummary from './components/ResultsSummary';
import FormNavigation from './components/FormNavigation';

const WorkEstimationForm: React.FC = () => {
  const formWrapper = useRef<HTMLDivElement>(null);
  const [showSummary, setShowSummary] = useState(false);
  
  // Utiliser le hook pour gérer les différentes étapes
  const {
    step,
    totalSteps,
    formData,
    estimationResult,
    animationDirection,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    setStep
  } = useEstimationCalculator();
  
  const { methods } = useEstimationForm();

  // Prevent page jumping during step transitions
  useEffect(() => {
    if (formWrapper.current) {
      const scrollPosition = window.scrollY;
      
      // Keep same scroll position after step update
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto'
        });
      }, 10);
    }
  }, [step]);

  const handleFormChange = (newStep: number) => {
    // Save current scroll position
    if (formWrapper.current) {
      const scrollPosition = window.scrollY;
      
      // Stay at the same position after step update
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto'
        });
      }, 10);
    }
  };

  // Function to handle client type submission from conversational estimator
  const onClientTypeSubmit = (data: {clientType: string}) => {
    updateFormData({ clientType: data.clientType });
  };

  // Process user input from conversational estimator
  const processUserInput = (input: string) => {
    console.log('Input processed:', input);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full" ref={formWrapper}>
        <Card className="border-0 shadow-none">
          <div className="overflow-hidden">
            <ConversationalEstimator 
              onUserInput={processUserInput}
              formData={formData}
              updateFormData={updateFormData}
              onClientTypeSubmit={onClientTypeSubmit}
              goToStep={setStep}
            />
          </div>
        </Card>

        {/* Affichage du résultat estimatif ou boutons de navigation */}
        <ResultsSummary 
          showSummary={showSummary} 
          estimationResult={estimationResult} 
          formData={formData} 
          onBackClick={() => setShowSummary(false)} 
        />
        
        <FormNavigation 
          step={step}
          estimationResult={estimationResult}
          showSummary={showSummary}
          onPreviousClick={goToPreviousStep}
          onNextClick={goToNextStep}
          onShowSummaryClick={() => setShowSummary(true)}
        />
      </div>
    </FormProvider>
  );
};

export default WorkEstimationForm;
