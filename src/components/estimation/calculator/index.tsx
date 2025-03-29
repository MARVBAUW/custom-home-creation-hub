import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import WorkEstimationForm from './WorkEstimationForm';

const EstimationCalculator: React.FC = () => {
  return (
    <Card className="shadow-sm border-0">
      <CardContent className="p-0 sm:p-2">
        <div className="relative">
          {/* Formulaire d'estimation complet */}
          <WorkEstimationForm />
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculator;
