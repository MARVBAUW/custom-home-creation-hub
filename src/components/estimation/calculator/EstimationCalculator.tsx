
import React from 'react';
import { useEstimationCalculator } from './useEstimationCalculator';
import StepRenderer from './components/StepRenderer';
import CalculatorLayout from './components/CalculatorLayout';

const EstimationCalculator: React.FC = () => {
  const {
    step,
    totalSteps,
    estimationResult,
    showResultDialog,
    setShowResultDialog,
    animationDirection,
    formData,
    visibleSteps,
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
    onContactSubmit,
  } = useEstimationCalculator();

  return (
    <CalculatorLayout
      step={step}
      totalSteps={totalSteps}
      formData={formData}
      estimationResult={estimationResult}
      showResultDialog={showResultDialog}
      setShowResultDialog={setShowResultDialog}
    >
      <StepRenderer
        step={step}
        totalSteps={totalSteps}
        animationDirection={animationDirection}
        formData={formData}
        visibleSteps={visibleSteps}
        goToNextStep={goToNextStep}
        goToPreviousStep={goToPreviousStep}
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
        onContactSubmit={onContactSubmit}
      />
    </CalculatorLayout>
  );
};

export default EstimationCalculator;
