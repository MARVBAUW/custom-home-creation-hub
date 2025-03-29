
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from 'lucide-react';
import ConversationalForm from './calculator/ConversationalForm';

const EstimationCalculator: React.FC = () => {
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
