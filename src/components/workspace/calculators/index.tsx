
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calculator, 
  Ruler, 
  PiggyBank, 
  Scale,
  Building,
  Thermometer,
  Volume
} from 'lucide-react';

// Import calculator components
import RegulatoryCalculators from './RegulatoryCalculators';
import EurocodeCalculators from './eurocode/EurocodeCalculators';
import RentabilityCalculator from './rentability/RentabilityCalculator';
import FraisNotaireCalculator from './immobilier/FraisNotaireCalculator';
import SurfaceHabitableCalculator from './immobilier/SurfaceHabitableCalculator';
import SimulationManager from '../calculateurs/simulation/SimulationManager';
import CapaciteEmpruntCalculator from './financier/CapaciteEmpruntCalculator';
import DpeCalculator from './thermal/DpeCalculator';
import AcousticCalculator from './acoustic/AcousticCalculator';

// Create a central registry of all calculators
const CalculatorsRegistry = {
  immobilier: [
    {
      title: "Surface habitable",
      component: SurfaceHabitableCalculator,
      description: "Calculateur de surface habitable et SHON/SHOB",
      type: "surface"
    },
    {
      title: "Frais de notaire",
      component: FraisNotaireCalculator,
      description: "Estimation des frais de notaire pour une acquisition immobilière",
      type: "frais-notaire"
    }
  ],
  financier: [
    {
      title: "Capacité d'emprunt",
      component: CapaciteEmpruntCalculator,
      description: "Calculez votre capacité d'emprunt selon vos revenus",
      type: "capacite-emprunt"
    },
    {
      title: "Rentabilité locative",
      component: RentabilityCalculator,
      description: "Calculez la rentabilité d'un investissement immobilier locatif",
      type: "rentability"
    }
  ],
  technique: [
    {
      title: "Acoustique",
      component: AcousticCalculator,
      description: "Calcul du temps de réverbération d'une pièce",
      type: "acoustic"
    },
    {
      title: "Performance énergétique",
      component: DpeCalculator,
      description: "Estimation du DPE et de l'étiquette énergétique",
      type: "dpe"
    }
  ]
};

const WorkspaceCalculators = () => {
  const [activeTab, setActiveTab] = useState("immobilier");

  return (
    <div className="space-y-6">
      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 mb-6">
        <h3 className="text-zinc-800 font-medium flex items-center gap-2 mb-2">
          <Calculator className="h-5 w-5" />
          Tous les Calculateurs
        </h3>
        <p className="text-zinc-700 text-sm">
          Accédez à l'ensemble de nos outils de calcul spécialisés pour vos projets de construction et d'investissement.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-zinc-100 p-1 flex flex-wrap">
          <TabsTrigger value="immobilier" className="data-[state=active]:bg-white flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>Immobilier</span>
          </TabsTrigger>
          <TabsTrigger value="financier" className="data-[state=active]:bg-white flex items-center gap-2">
            <PiggyBank className="h-4 w-4" />
            <span>Financier</span>
          </TabsTrigger>
          <TabsTrigger value="technique" className="data-[state=active]:bg-white flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <span>Technique</span>
          </TabsTrigger>
          <TabsTrigger value="reglementaire" className="data-[state=active]:bg-white flex items-center gap-2">
            <Scale className="h-4 w-4" />
            <span>Réglementaire</span>
          </TabsTrigger>
          <TabsTrigger value="simulations" className="data-[state=active]:bg-white flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Mes simulations</span>
          </TabsTrigger>
        </TabsList>

        {/* Immobilier Tab */}
        <TabsContent value="immobilier">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CalculatorsRegistry.immobilier.map((calc) => (
              <div key={calc.title} className="min-h-[400px]">
                <calc.component />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Financier Tab */}
        <TabsContent value="financier">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {CalculatorsRegistry.financier.map((calc) => (
              <div key={calc.title} className="min-h-[400px]">
                <calc.component />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Technique Tab */}
        <TabsContent value="technique">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {CalculatorsRegistry.technique.map((calc) => (
              <div key={calc.title} className="min-h-[400px]">
                <calc.component />
              </div>
            ))}
          </div>
          <EurocodeCalculators />
        </TabsContent>

        {/* Réglementaire Tab */}
        <TabsContent value="reglementaire">
          <RegulatoryCalculators />
        </TabsContent>

        {/* Mes simulations Tab */}
        <TabsContent value="simulations">
          <SimulationManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceCalculators;
