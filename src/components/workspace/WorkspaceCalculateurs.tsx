
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileSpreadsheet, Calculator, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SimulationManager from './calculateurs/SimulationManager';

const WorkspaceCalculateurs = () => {
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

      <Tabs defaultValue="simulations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="simulations" className="flex items-center">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Mes simulations
          </TabsTrigger>
          <TabsTrigger value="calculators" className="flex items-center">
            <Calculator className="h-4 w-4 mr-2" />
            Calculateurs
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
            {/* Calculateur de surface */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Calculateur de surfaces</h3>
              <p className="text-sm text-gray-600 mb-4">
                Calculez la surface habitable, SHON, SHOB et autres métriques de votre projet.
              </p>
              <div className="text-khaki-600 text-sm font-medium">
                Bientôt disponible
              </div>
            </div>

            {/* Calculateur de budget */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Estimation budgétaire</h3>
              <p className="text-sm text-gray-600 mb-4">
                Estimez le budget de votre projet en fonction de sa surface et de ses caractéristiques.
              </p>
              <div className="text-khaki-600 text-sm font-medium">
                Bientôt disponible
              </div>
            </div>

            {/* Calculateur de rentabilité */}
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Calcul de rentabilité</h3>
              <p className="text-sm text-gray-600 mb-4">
                Évaluez la rentabilité d'un investissement immobilier avec nos outils personnalisés.
              </p>
              <div className="text-khaki-600 text-sm font-medium">
                Bientôt disponible
              </div>
            </div>
          </div>
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
                <h4 className="font-medium text-khaki-700">Confidentialité</h4>
                <p className="text-gray-600 mt-1">
                  Vos données sont stockées de manière sécurisée et ne sont accessibles que par vous.
                  Les simulations temporaires sont stockées uniquement sur votre navigateur.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-khaki-700">Besoin d'aide ?</h4>
                <p className="text-gray-600 mt-1">
                  Si vous avez des questions sur l'utilisation des calculateurs, n'hésitez pas à 
                  nous contacter via la page de contact.
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
