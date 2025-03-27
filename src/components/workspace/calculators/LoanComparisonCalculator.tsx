
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, ArrowRightLeft } from 'lucide-react';

const LoanComparisonCalculator = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-khaki-600" />
          Comparateur de prêts immobiliers
        </CardTitle>
        <CardDescription>
          Comparez différentes offres de prêt pour trouver la plus avantageuse
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center py-16">
        <div className="text-center">
          <Calculator className="h-16 w-16 text-khaki-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">Outil en cours de développement</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Notre comparateur de prêts immobiliers sera bientôt disponible.
            Vous pourrez comparer jusqu'à 5 offres de prêt simultanément pour
            identifier la solution la plus avantageuse pour votre projet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoanComparisonCalculator;
