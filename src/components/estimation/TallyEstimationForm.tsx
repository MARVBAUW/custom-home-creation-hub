
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from 'lucide-react';

const TallyEstimationForm = () => {
  return (
    <Card className="shadow-md bg-white/95">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl flex items-center">
          <Construction className="h-5 w-5 mr-2 text-blue-500" />
          Estimation détaillée de votre projet
        </CardTitle>
        <CardDescription>
          Estimez le coût de votre projet de construction ou rénovation en quelques étapes simples.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <iframe 
            data-tally-src="https://tally.so/embed/nGB6KO?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height={631}
            frameBorder={0}
            title="ESTIMER VOTRE PROJET"
          ></iframe>
          
          <div className="text-xs text-gray-500 mt-4 text-center">
            * Cette estimation détaillée est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts Progineer.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TallyEstimationForm;
