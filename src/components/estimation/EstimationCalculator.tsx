
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from 'lucide-react';
import AIEnhancedEstimator from './calculator/AIEnhancedEstimator';

const EstimationCalculator: React.FC = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Message informant l'utilisateur du nouvel assistant d'estimation amélioré
    setTimeout(() => {
      toast({
        title: "Assistant d'estimation intelligent",
        description: "Notre nouvel assistant intelligent vous guide pour obtenir une estimation précise en conversant naturellement.",
        duration: 5000,
      });
    }, 1000);
  }, [toast]);

  return (
    <Card className="shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center">
          <InfoIcon className="h-5 w-5 mr-2 text-blue-500" />
          Estimation intelligente de votre projet
        </CardTitle>
        <CardDescription>
          Discutez simplement de votre projet avec notre assistant IA pour obtenir une estimation précise et personnalisée.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Nouvel estimateur amélioré avec IA conversationnelle */}
          <AIEnhancedEstimator />
          
          <div className="text-xs text-gray-500 mt-4 text-center">
            * Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculator;
