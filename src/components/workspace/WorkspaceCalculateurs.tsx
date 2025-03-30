
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Home, ChartBar, Wallet, ArrowRightLeft, Building, DollarSign, PercentIcon, Volume2, Wind, Ruler } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import SurfaceCalculator from './calculators/SurfaceCalculator';
import RentabilityCalculator from './calculators/RentabilityCalculator';
import LoanCalculator from './calculators/LoanCalculator';
import LoanComparisonCalculator from './calculators/LoanComparisonCalculator';
import TaxCalculator from './calculators/TaxCalculator';
import YieldCalculator from './calculators/YieldCalculator';
import AcousticCalculator from './calculators/AcousticCalculator';
import EurocodeCalculators from './calculators/eurocode/EurocodeCalculators';

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
        <TabsList className="bg-khaki-50 p-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 mb-6">
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
          <TabsTrigger value="tax" className="data-[state=active]:bg-white">
            <DollarSign className="h-4 w-4 mr-2" />
            Frais de notaire
          </TabsTrigger>
          <TabsTrigger value="yield" className="data-[state=active]:bg-white">
            <PercentIcon className="h-4 w-4 mr-2" />
            Rendement brut/net
          </TabsTrigger>
          <TabsTrigger value="acoustic" className="data-[state=active]:bg-white">
            <Volume2 className="h-4 w-4 mr-2" />
            Acoustique
          </TabsTrigger>
          <TabsTrigger value="eurocode" className="data-[state=active]:bg-white">
            <Ruler className="h-4 w-4 mr-2" />
            Eurocodes
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="surface">
          <SurfaceCalculator />
        </TabsContent>
        
        <TabsContent value="rent">
          <RentabilityCalculator />
        </TabsContent>
        
        <TabsContent value="loan">
          <LoanCalculator />
        </TabsContent>
        
        <TabsContent value="compare">
          <LoanComparisonCalculator />
        </TabsContent>
        
        <TabsContent value="tax">
          <TaxCalculator />
        </TabsContent>
        
        <TabsContent value="yield">
          <YieldCalculator />
        </TabsContent>
        
        <TabsContent value="acoustic">
          <AcousticCalculator />
        </TabsContent>
        
        <TabsContent value="eurocode">
          <EurocodeCalculators />
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
      
      <div className="bg-white p-6 rounded-xl border border-gray-200 mt-8">
        <h3 className="text-lg font-medium mb-2">Fonctionnalités disponibles</h3>
        <div className="overflow-x-auto">
          <table className="w-full mt-4 text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-2 px-4 text-left">Calculateur</th>
                <th className="py-2 px-4 text-left">Sauvegarde</th>
                <th className="py-2 px-4 text-left">Export PDF</th>
                <th className="py-2 px-4 text-left">Graphiques</th>
                <th className="py-2 px-4 text-left">Comparaison</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Surface habitable</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Rentabilité locative</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Capacité d'emprunt</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Comparateur de prêts</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Frais de notaire</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Rendement brut/net</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-4">Eurocodes (EC1-EC7)</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
                <td className="py-2 px-4 text-green-600">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCalculateurs;
