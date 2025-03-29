
import React, { useEffect, useState } from 'react';
import { ResultsFormProps } from '../types/formTypes';
import EstimationResults from '../steps/EstimationResults';
import { Loader2 } from 'lucide-react';
import { calculateEstimation } from '../calculationUtils';

const ResultsForm: React.FC<ResultsFormProps> = ({
  estimationResult,
  formData,
  goToPreviousStep,
  updateFormData,
  goToNextStep,
  animationDirection
}) => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [calculation, setCalculation] = useState<number | null>(estimationResult);

  // Calculate the estimation when the component mounts
  useEffect(() => {
    const performCalculation = async () => {
      try {
        // Add a small delay to improve user experience
        setTimeout(() => {
          const result = calculateEstimation(formData);
          console.log("Résultat du calcul:", result);
          setCalculation(result);
          setIsCalculating(false);
        }, 1500);
      } catch (error) {
        console.error("Erreur lors du calcul de l'estimation:", error);
        // Use fallback value if calculation fails
        setCalculation(150000);
        setIsCalculating(false);
      }
    };

    performCalculation();
  }, [formData]);

  // If still calculating, show loading spinner
  if (isCalculating) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium">Calcul de votre estimation en cours...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Nous analysons les détails de votre projet pour vous fournir une estimation précise.
        </p>
      </div>
    );
  }

  return (
    <EstimationResults 
      estimation={calculation} 
      formData={formData} 
      goToPreviousStep={goToPreviousStep}
      updateFormData={updateFormData}
      goToNextStep={goToNextStep}
      isLoading={false}
    />
  );
};

export default ResultsForm;
