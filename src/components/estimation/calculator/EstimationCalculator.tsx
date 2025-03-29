
import React from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon, MessageSquareText, Calculator } from 'lucide-react';
import ConversationalForm from './ConversationalForm';

const EstimationCalculator: React.FC = () => {
  const { toast } = useToast();

  React.useEffect(() => {
    // Message informant l'utilisateur du formulaire d'estimation conversationnel
    setTimeout(() => {
      toast({
        title: "Estimation détaillée conversationnelle",
        description: "Obtenez une estimation précise de votre projet par corps d'état en discutant avec notre assistant virtuel.",
        duration: 5000,
      });
    }, 1000);
  }, [toast]);

  return (
    <Card className="shadow-md bg-white/95">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-blue-500" />
          Estimation détaillée de votre projet
        </CardTitle>
        <CardDescription>
          Discutez avec notre assistant virtuel pour obtenir une estimation complète par corps d'état, incluant les frais de maîtrise d'œuvre, taxes et études techniques.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Formulaire conversationnel */}
          <ConversationalForm />
          
          <div className="text-xs text-gray-500 mt-4 text-center">
            * Cette estimation détaillée est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts Progineer.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculator;
