
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Download, Info } from 'lucide-react';

const CapaciteEmpruntCalculatorPlaceholder: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Calculateur de Capacité d'Emprunt
        </CardTitle>
        <CardDescription>
          Estimez votre capacité d'emprunt et votre mensualité maximale
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Calculateur en cours de développement</AlertTitle>
          <AlertDescription>
            Ce calculateur sera disponible prochainement. Il vous permettra d'estimer votre capacité d'emprunt en fonction de vos revenus, charges et du taux d'intérêt.
          </AlertDescription>
        </Alert>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h3 className="font-medium mb-2">Ce calculateur vous permettra:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>D'estimer votre capacité d'emprunt</li>
              <li>De calculer votre mensualité maximale</li>
              <li>D'évaluer l'impact du taux d'intérêt</li>
              <li>D'ajuster selon votre apport personnel</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Fonctionnalités à venir:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Simulation de différents scénarios</li>
              <li>Export PDF des résultats</li>
              <li>Sauvegarde des simulations</li>
              <li>Comparaison de différentes offres</li>
            </ul>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" disabled>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CapaciteEmpruntCalculatorPlaceholder;
