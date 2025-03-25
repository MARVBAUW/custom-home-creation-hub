
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Home, ChartBar, Wallet, ArrowRightLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import SurfaceCalculator from './calculators/SurfaceCalculator';
import RentabilityCalculator from './calculators/RentabilityCalculator';

// Add jsPDF for PDF generation
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const WorkspaceCalculateurs = () => {
  const { toast } = useToast();
  const [activeCalculator, setActiveCalculator] = useState('surface');
  
  const handleTabChange = (value: string) => {
    setActiveCalculator(value);
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Calculateurs et outils en ligne</h2>
        <p className="text-gray-600">Des outils professionnels pour faciliter l'estimation et la gestion de vos projets.</p>
      </div>

      <Tabs defaultValue="surface" value={activeCalculator} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="bg-khaki-50 p-1 grid grid-cols-2 lg:grid-cols-4 mb-6">
          <TabsTrigger value="surface" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            Surface habitable
          </TabsTrigger>
          <TabsTrigger value="rent" className="data-[state=active]:bg-white">
            <ChartBar className="h-4 w-4 mr-2" />
            Rentabilité locative
          </TabsTrigger>
          <TabsTrigger value="loan" className="data-[state=active]:bg-white">
            <Wallet className="h-4 w-4 mr-2" />
            Capacité d'emprunt
          </TabsTrigger>
          <TabsTrigger value="compare" className="data-[state=active]:bg-white">
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Comparateur prêts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="surface">
          <SurfaceCalculator />
        </TabsContent>
        
        <TabsContent value="rent">
          <RentabilityCalculator />
        </TabsContent>
        
        <TabsContent value="loan">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-khaki-600" />
                Calculateur de capacité d'emprunt
              </CardTitle>
              <CardDescription>
                Estimez votre capacité d'emprunt en fonction de vos revenus et charges
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center py-16">
              <div className="text-center">
                <Calculator className="h-16 w-16 text-khaki-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Outil en développement</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Notre calculateur de capacité d'emprunt sera bientôt disponible.
                  Vous pourrez estimer précisément votre capacité d'emprunt en tenant compte
                  de tous vos revenus et charges.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="compare">
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
                <h3 className="text-xl font-medium mb-2">Outil en développement</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Notre comparateur de prêts immobiliers sera bientôt disponible.
                  Vous pourrez comparer jusqu'à 5 offres de prêt simultanément pour
                  identifier la solution la plus avantageuse pour votre projet.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="bg-khaki-50 p-6 rounded-xl border border-khaki-100 mt-8">
        <h3 className="text-lg font-medium mb-2">Pourquoi utiliser nos calculateurs?</h3>
        <p className="text-gray-600 mb-4">
          Nos outils en ligne vous permettent de réaliser vos calculs directement dans votre navigateur, 
          sans téléchargement, et d'exporter facilement vos résultats au format PDF.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-medium text-khaki-700 mb-1">Précision</h4>
            <p className="text-sm text-gray-600">
              Algorithmes de calcul conformes aux normes et pratiques professionnelles du secteur.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-medium text-khaki-700 mb-1">Fiabilité</h4>
            <p className="text-sm text-gray-600">
              Outils développés et validés par des experts en immobilier et en finance.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-medium text-khaki-700 mb-1">Exportation</h4>
            <p className="text-sm text-gray-600">
              Génération de rapports PDF détaillés pour partager ou archiver vos simulations.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h4 className="font-medium text-khaki-700 mb-1">Accessibilité</h4>
            <p className="text-sm text-gray-600">
              Utilisation en ligne sur tous vos appareils, sans installation de logiciel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCalculateurs;
