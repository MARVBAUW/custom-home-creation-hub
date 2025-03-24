
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { FileSpreadsheet, Calculator, ChartBar, LineChart, Wallet, Home, ArrowRightLeft } from 'lucide-react';
import Button from '@/components/common/Button';

const WorkspaceCalculateurs = () => {
  const calculators = [
    {
      title: "Calculateur de surface habitable",
      description: "Estimez la surface habitable de votre bien selon les normes en vigueur.",
      icon: <Home className="h-8 w-8 text-khaki-600" />,
      version: "v2.3",
      lastUpdate: "15/04/2024"
    },
    {
      title: "Simulateur de rentabilité locative",
      description: "Analysez la rentabilité d'un investissement locatif en tenant compte de tous les paramètres.",
      icon: <ChartBar className="h-8 w-8 text-khaki-600" />,
      version: "v3.1",
      lastUpdate: "02/05/2024"
    },
    {
      title: "Budget travaux détaillé",
      description: "Estimez précisément le coût de vos travaux poste par poste avec comparatif des devis.",
      icon: <Calculator className="h-8 w-8 text-khaki-600" />,
      version: "v1.8",
      lastUpdate: "10/03/2024"
    },
    {
      title: "Suivi de chantier et paiements",
      description: "Suivez l'avancement de votre chantier et les paiements associés aux différentes étapes.",
      icon: <LineChart className="h-8 w-8 text-khaki-600" />,
      version: "v2.5",
      lastUpdate: "22/04/2024"
    },
    {
      title: "Capacité d'emprunt",
      description: "Calculez votre capacité d'emprunt en fonction de vos revenus et charges mensuelles.",
      icon: <Wallet className="h-8 w-8 text-khaki-600" />,
      version: "v2.0",
      lastUpdate: "05/04/2024"
    },
    {
      title: "Comparateur prêt immobilier",
      description: "Comparez les différentes offres de prêt immobilier et trouvez la plus avantageuse.",
      icon: <ArrowRightLeft className="h-8 w-8 text-khaki-600" />,
      version: "v1.4",
      lastUpdate: "19/03/2024"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Calculateurs et outils Excel</h2>
        <p className="text-gray-600">Des outils professionnels pour faciliter la gestion de vos projets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {calculators.map((calculator, index) => (
          <Card key={index} className="border border-gray-200 hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                {calculator.icon}
                <div>
                  <CardTitle className="text-lg font-medium">{calculator.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="mt-2">{calculator.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between pt-2 text-sm text-gray-600 border-t">
              <div>
                <span className="text-khaki-700 font-medium">{calculator.version}</span>
                <span className="ml-2 text-gray-500">Màj: {calculator.lastUpdate}</span>
              </div>
              <Button variant="outline" size="sm">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceCalculateurs;
