import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { useEstimationCalculator } from './useEstimationCalculator';
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
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit
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

  return (
    <FormProvider {...methods}>
      <div className="w-full" ref={formWrapper}>
        <Card className="border-0 shadow-none">
          <div className="overflow-hidden">
            <ConversationalEstimator 
              onClientTypeSubmit={onClientTypeSubmit}
              onProfessionalProjectSubmit={onProfessionalProjectSubmit}
              onIndividualProjectSubmit={onIndividualProjectSubmit}
              onEstimationTypeSubmit={onEstimationTypeSubmit}
              onConstructionDetailsSubmit={onConstructionDetailsSubmit}
              onTerrainSubmit={onTerrainSubmit}
              onGrosOeuvreSubmit={onGrosOeuvreSubmit}
              onCharpenteSubmit={onCharpenteSubmit}
              onComblesSubmit={onComblesSubmit}
              onCouvertureSubmit={onCouvertureSubmit}
              onIsolationSubmit={onIsolationSubmit}
              onFacadeSubmit={onFacadeSubmit}
              onMenuiseriesExtSubmit={onMenuiseriesExtSubmit}
              onElectriciteSubmit={onElectriciteSubmit}
              onPlomberieSubmit={onPlomberieSubmit}
              onChauffageSubmit={onChauffageSubmit}
              onPlatrerieSubmit={onPlatrerieSubmit}
              onMenuiseriesIntSubmit={onMenuiseriesIntSubmit}
              onCarrelageSubmit={onCarrelageSubmit}
              onParquetSubmit={onParquetSubmit}
              onPeintureSubmit={onPeintureSubmit}
              onEnergiesRenouvelablesSubmit={onEnergiesRenouvelablesSubmit}
              onSolutionsEnvironSubmit={onSolutionsEnvironSubmit}
              onAmenagementPaysagerSubmit={onAmenagementPaysagerSubmit}
              onOptionsSubmit={onOptionsSubmit}
              onCuisineSubmit={onCuisineSubmit}
              onSalleDeBainSubmit={onSalleDeBainSubmit}
              onDemolitionSubmit={onDemolitionSubmit}
              onGrosOeuvreRenovSubmit={onGrosOeuvreRenovSubmit}
              onCharpenteRenovSubmit={onCharpenteRenovSubmit}
              onCouvertureRenovSubmit={onCouvertureRenovSubmit}
              onFacadeRenovSubmit={onFacadeRenovSubmit}
              onContactSubmit={onContactSubmit}
              formData={formData}
              step={step}
              onStepChange={handleFormChange}
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
