
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import StructuredEstimator from './StructuredEstimator';

const EstimationCalculator: React.FC = () => {
  return (
    <Card className="shadow-sm border-0">
      <CardContent className="p-0 sm:p-2">
        <div className="relative">
          <h1 className="sr-only">Calculateur d'estimation pour votre projet immobilier</h1>
          <StructuredEstimator />
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculator;
