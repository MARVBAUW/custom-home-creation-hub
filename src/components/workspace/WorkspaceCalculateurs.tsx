
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, Calculator, BookOpen, Ruler, TrendingUp, DollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SimulationManager from './calculateurs/SimulationManager';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import TaxCalculator from './calculators/TaxCalculator';
import RentabilityCalculator from './calculators/rentability/RentabilityCalculator';
import SurfaceCalculator from './calculators/surface/SurfaceCalculator';

const WorkspaceCalculateurs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('simulations');
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);
  
  const showCalculator = (calculatorType: string) => {
    setActiveCalculator(calculatorType);
    setActiveTab('calculator');
  };
  
  const backToCalculatorsList = () => {
    setActiveCalculator(null);
    setActiveTab('calculators');
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center">
          Calculateurs et outils
          <Badge variant="outline" className="ml-3 bg-green-50 text-green-700 border-green-200">
            Interactive
          </Badge>
        </h2>
        <p className="text-gray-600">
          Utilisez nos calculateurs et outils pour planifier vos projets de construction et rénovation. 
          Vous pouvez enregistrer vos calculs pour y revenir plus tard.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="simulations" className="flex items-center">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Mes simulations
          </TabsTrigger>
          <TabsTrigger value="calculators" className="flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            Calculateurs
          </TabsTrigger>
          <TabsTrigger value="calculator" className="flex items-center" disabled={!activeCalculator}>
            <Calculator className="h-4 w-4 mr-2" />
            {activeCalculator === 'tax' ? 'Frais de notaire' : 
             activeCalculator === 'rentability' ? 'Rentabilité' :
             activeCalculator === 'surface' ? 'Surfaces' : 'Calculateur'}
          </TabsTrigger>
          <TabsTrigger value="guide" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Guide d'utilisation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="simulations" className="space-y-6">
          <SimulationManager />
        </TabsContent>

        <TabsContent value="calculators" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Calculateur de frais de notaire */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-khaki-600" />
                  Frais de notaire
                </CardTitle>
                <CardDescription className="text-sm">
                  Estimez les frais de notaire pour votre acquisition immobilière
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Calculez précisément les frais de notaire selon le type de bien (neuf ou ancien) et le département.
                </p>
                <Button 
                  className="w-full bg-khaki-500 hover:bg-khaki-600 text-white"
                  onClick={() => showCalculator('tax')}
                >
                  Accéder au calculateur
                </Button>
              </CardContent>
            </Card>

            {/* Calculateur de surface */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-khaki-600" />
                  Calculateur de surfaces
                </CardTitle>
                <CardDescription className="text-sm">
                  Calculez la surface habitable, SHON et autres métriques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Estimez précisément les différentes surfaces de votre projet selon les normes en vigueur.
                </p>
                <Button 
                  className="w-full bg-khaki-500 hover:bg-khaki-600 text-white"
                  onClick={() => showCalculator('surface')}
                >
                  Accéder au calculateur
                </Button>
              </CardContent>
            </Card>

            {/* Calculateur de rentabilité */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-khaki-600" />
                  Calcul de rentabilité
                </CardTitle>
                <CardDescription className="text-sm">
                  Évaluez la rentabilité d'un investissement immobilier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Analysez tous les aspects financiers de votre investissement locatif pour prendre la bonne décision.
                </p>
                <Button 
                  className="w-full bg-khaki-500 hover:bg-khaki-600 text-white"
                  onClick={() => showCalculator('rentability')}
                >
                  Accéder au calculateur
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="calculator" className="space-y-6">
          {activeCalculator && (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={backToCalculatorsList}
                className="mb-4"
              >
                ← Retour aux calculateurs
              </Button>
              
              {activeCalculator === 'tax' && <TaxCalculator />}
              {activeCalculator === 'rentability' && <RentabilityCalculator />}
              {activeCalculator === 'surface' && <SurfaceCalculator />}
            </div>
          )}
        </TabsContent>

        <TabsContent value="guide" className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-lg">Guide d'utilisation des calculateurs</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-khaki-700">Enregistrement des simulations</h4>
                <p className="text-gray-600 mt-1">
                  Vos simulations sont automatiquement enregistrées localement (temporairement).
                  Si vous créez un compte, vous pourrez les sauvegarder de manière permanente.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-khaki-700">Export des données</h4>
                <p className="text-gray-600 mt-1">
                  Utilisez la fonction d'export PDF pour sauvegarder vos calculs et les partager.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-khaki-700">Simulateurs disponibles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="border rounded p-3">
                    <h5 className="font-medium text-khaki-600 mb-1">Frais de notaire</h5>
                    <p className="text-sm text-gray-600">Calculez précisément les frais de notaire pour un achat immobilier neuf ou ancien.</p>
                  </div>
                  <div className="border rounded p-3">
                    <h5 className="font-medium text-khaki-600 mb-1">Surfaces</h5>
                    <p className="text-sm text-gray-600">Déterminez la surface habitable, SHON, SHOB et autres métriques pour votre bien.</p>
                  </div>
                  <div className="border rounded p-3">
                    <h5 className="font-medium text-khaki-600 mb-1">Rentabilité</h5>
                    <p className="text-sm text-gray-600">Évaluez le retour sur investissement et la rentabilité d'un achat locatif.</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-khaki-700">Confidentialité</h4>
                <p className="text-gray-600 mt-1">
                  Vos données sont stockées de manière sécurisée et ne sont accessibles que par vous. Nous ne partageons aucune information avec des tiers.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceCalculateurs;
