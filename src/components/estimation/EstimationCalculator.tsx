
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';
import EstimationCalculator from './calculator/EstimationCalculator';

const EstimationCalculatorWrapper: React.FC = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Message informant l'utilisateur du nouvel assistant d'estimation amélioré
    setTimeout(() => {
      toast({
        title: "Estimation détaillée par corps d'état",
        description: "Notre estimateur vous guide étape par étape pour obtenir une estimation précise de votre projet.",
        duration: 5000,
      });
    }, 1000);
  }, [toast]);

  return (
    <Card className="shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center">
          <InfoIcon className="h-5 w-5 mr-2 text-blue-500" />
          Estimation détaillée de votre projet
        </CardTitle>
        <CardDescription>
          Répondez aux questions pour chaque corps d'état pour obtenir une estimation précise et personnalisée.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Nouvel estimateur structuré par corps d'état */}
          <EstimationCalculator />
          
          <div className="text-xs text-gray-500 mt-4 text-center">
            * Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculatorWrapper;
