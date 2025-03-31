
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { BaseFormProps } from '../types/formTypes';
import EstimationBreakdown from '../EstimationBreakdown';
import { calculateEstimation } from '../calculationUtils';

const ResultsForm: React.FC<BaseFormProps> = ({
  formData,
  goToPreviousStep,
  isLoading = false,
  animationDirection
}) => {
  const [estimation, setEstimation] = React.useState(() => calculateEstimation(formData));

  // Recalculate estimation when form data changes
  React.useEffect(() => {
    setEstimation(calculateEstimation(formData));
  }, [formData]);

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center mb-4">
          Estimation détaillée de votre projet
        </h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
            <p className="text-gray-500">Calcul de l'estimation en cours...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <EstimationBreakdown estimation={estimation} />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={goToPreviousStep}
                className="w-full sm:w-auto"
              >
                Modifier mon estimation
              </Button>
              
              <Button 
                type="button"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                onClick={() => window.print()}
              >
                Imprimer l'estimation
              </Button>
              
              <Button 
                type="button"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
              >
                Demander un devis détaillé
              </Button>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t">
              <p>Cette estimation est donnée à titre indicatif et peut varier en fonction des spécificités de votre projet.</p>
              <p>Contactez-nous pour un devis personnalisé et une étude détaillée de votre projet.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsForm;
