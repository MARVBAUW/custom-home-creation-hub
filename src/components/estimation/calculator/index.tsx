
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';
import WorkEstimationForm from './WorkEstimationForm';

const EstimationCalculator: React.FC = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Message informant l'utilisateur du nouveau formulaire d'estimation
    setTimeout(() => {
      toast({
        title: "Formulaire d'estimation amélioré",
        description: "Notre formulaire d'estimation a été amélioré pour vous offrir des résultats plus précis.",
        duration: 5000,
      });
    }, 1000);
  }, [toast]);

  return (
    <Card className="shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center">
          <InfoIcon className="h-5 w-5 mr-2 text-blue-500" />
          Estimation de votre projet
        </CardTitle>
        <CardDescription>
          Complétez le formulaire ci-dessous pour obtenir une estimation détaillée de votre projet de construction ou rénovation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Nouveau formulaire d'estimation */}
          <WorkEstimationForm />
          
          <div className="text-xs text-gray-500 mt-4 text-center">
            * Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculator;
