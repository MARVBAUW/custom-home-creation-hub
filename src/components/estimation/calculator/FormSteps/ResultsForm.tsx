
import React, { useEffect, useState } from 'react';
import { ResultsFormProps } from '../types/formTypes';
import EstimationResults from '../steps/EstimationResults';
import { Loader2 } from 'lucide-react';
import { calculateEstimation } from '../calculationUtils';
import { Button } from '@/components/ui/button';
import { CheckCircle2, FileText, Send } from 'lucide-react';
import { EstimationResponseData } from '../types';

const ResultsForm: React.FC<ResultsFormProps> = ({
  estimationResult,
  formData,
  goToPreviousStep,
  updateFormData,
  goToNextStep,
  animationDirection
}) => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [calculation, setCalculation] = useState<EstimationResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Calculate the estimation when the component mounts
  useEffect(() => {
    const performCalculation = async () => {
      try {
        // Add a small delay to improve user experience
        setTimeout(() => {
          try {
            const result = calculateEstimation(formData);
            console.log("Résultat du calcul:", result);
            
            setCalculation(result);
            setIsCalculating(false);
          } catch (calculationError) {
            console.error("Erreur pendant le calcul:", calculationError);
            setError("Une erreur est survenue lors du calcul");
            // Fallback value - full calculation
            setCalculation(calculateEstimation(formData));
            setIsCalculating(false);
          }
        }, 1500);
      } catch (error) {
        console.error("Erreur lors du calcul de l'estimation:", error);
        setError("Une erreur est survenue lors du calcul");
        // Use fallback value if calculation fails
        setCalculation(calculateEstimation(formData));
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

  // If there was an error during calculation
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 mb-4">
          <FileText className="h-12 w-12 mx-auto" />
        </div>
        <p className="text-lg font-medium text-red-600">{error}</p>
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Veuillez réessayer ou contacter notre équipe pour obtenir une estimation personnalisée.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={goToPreviousStep}>
            Retour
          </Button>
          <Button onClick={() => setIsCalculating(true)}>
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  // If calculation succeeded
  return (
    <div className="animate-in fade-in-50 duration-300">
      <div className="flex flex-col items-center justify-center py-8">
        <div className="text-green-500 mb-4">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold text-center">Votre estimation est prête !</h2>
        <p className="text-muted-foreground text-center mt-2 mb-6">
          Basée sur les informations que vous avez fournies pour votre projet.
        </p>
      </div>
      
      {calculation && (
        <EstimationResults 
          estimation={calculation} 
          formData={formData} 
          goToPreviousStep={goToPreviousStep}
          updateFormData={updateFormData}
          goToNextStep={goToNextStep}
          isLoading={false}
        />
      )}
      
      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
        <Button variant="outline" onClick={goToPreviousStep}>
          Modifier mon projet
        </Button>
        <Button className="bg-green-600 hover:bg-green-700" onClick={goToNextStep}>
          <Send className="mr-2 h-4 w-4" />
          Recevoir par email
        </Button>
      </div>
    </div>
  );
};

export default ResultsForm;
