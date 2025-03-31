
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, HomeIcon, Building2, Scale, PiggyBank, Ruler, Volume2, Thermometer, Droplets, Hammer, Briefcase } from 'lucide-react';
import { FraisNotaireCalculator } from './calculators/FraisNotaireCalculator';
import { RentabiliteLocativeCalculator } from './calculators/RentabiliteLocativeCalculator';
import { CapaciteEmpruntCalculator } from './calculators/CapaciteEmpruntCalculator';
import { SurfaceHabitableCalculator } from './calculators/SurfaceHabitableCalculator';
import { AcoustiqueCalculator } from './calculators/AcoustiqueCalculator';
import { DpeCalculator } from './calculators/DpeCalculator';
import { EurocodesCalculator } from './calculators/EurocodesCalculator';
import SimulationManager from './calculateurs/simulation/SimulationManager';
import { useToast } from '@/hooks/use-toast';

const WorkspaceCalculateurs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("immobilier");

  return (
    <div className="space-y-6">
      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 mb-6">
        <h3 className="text-zinc-800 font-medium flex items-center gap-2 mb-2">
          <Calculator className="h-5 w-5" />
          Calculateurs et Simulations
        </h3>
        <p className="text-zinc-700 text-sm">
          Accédez à nos outils de calcul spécialisés pour différents aspects de vos projets.
          Ces calculateurs vous aideront à estimer les coûts, dimensionner vos espaces et vérifier la conformité réglementaire.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-zinc-100 p-1 flex flex-wrap">
          <TabsTrigger value="immobilier" className="data-[state=active]:bg-white flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            <span>Immobilier</span>
          </TabsTrigger>
          <TabsTrigger value="projet" className="data-[state=active]:bg-white flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span>Projet</span>
          </TabsTrigger>
          <TabsTrigger value="financier" className="data-[state=active]:bg-white flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            <span>Financier</span>
          </TabsTrigger>
          <TabsTrigger value="reglementaire" className="data-[state=active]:bg-white flex items-center gap-2">
            <Scale className="h-4 w-4" />
            <span>Réglementaire</span>
          </TabsTrigger>
          <TabsTrigger value="technique" className="data-[state=active]:bg-white flex items-center gap-2">
            <Hammer className="h-4 w-4" />
            <span>Technique</span>
          </TabsTrigger>
          <TabsTrigger value="simulations" className="data-[state=active]:bg-white flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            <span>Mes simulations</span>
          </TabsTrigger>
        </TabsList>

        {/* Onglet Immobilier */}
        <TabsContent value="immobilier">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Surface habitable</CardTitle>
              </CardHeader>
              <CardContent>
                <SurfaceHabitableCalculator />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Frais de notaire</CardTitle>
              </CardHeader>
              <CardContent>
                <FraisNotaireCalculator />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Projet */}
        <TabsContent value="projet">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">DPE prévisionnel</CardTitle>
              </CardHeader>
              <CardContent>
                <DpeCalculator />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eurocodes</CardTitle>
              </CardHeader>
              <CardContent>
                <EurocodesCalculator />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Acoustique</CardTitle>
              </CardHeader>
              <CardContent>
                <AcoustiqueCalculator />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Financier */}
        <TabsContent value="financier">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Capacité d'emprunt</CardTitle>
              </CardHeader>
              <CardContent>
                <CapaciteEmpruntCalculator />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rentabilité locative</CardTitle>
              </CardHeader>
              <CardContent>
                <RentabiliteLocativeCalculator />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Réglementaire */}
        <TabsContent value="reglementaire">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Vérification accessibilité</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-800">Ce calculateur sera disponible prochainement.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tableau de classification ERP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-800">Ce calculateur sera disponible prochainement.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Technique */}
        <TabsContent value="technique">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dimensionnement rampe</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-800">Ce calculateur sera disponible prochainement.</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Calcul descente de charge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-sm text-blue-800">Ce calculateur sera disponible prochainement.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Onglet Mes simulations */}
        <TabsContent value="simulations">
          <SimulationManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceCalculateurs;
