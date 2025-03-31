
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SquareFoot, 
  Calculator, 
  Ruler, 
  PiggyBank, 
  Thermometer, 
  Volume2, 
  Droplets,
  Flame,
  Accessibility,
  Building,
  Scale
} from 'lucide-react';

// Import calculateurs
import RegulatoryCalculators from './RegulatoryCalculators';
import EurocodeCalculators from './eurocode/EurocodeCalculators';
import FireCalculator from './fire/FireCalculator';
import HygrometryCalculator from './hygrometry/HygrometryCalculator';
import ThermalResistanceCalculator from './thermal/ThermalResistanceCalculator';
import AcousticInsulationCalculator from './acoustic/AcousticInsulationCalculator';
import AccessibilityRampCalculator from './accessibility/AccessibilityRampCalculator';

const WorkspaceCalculators = () => {
  const [activeTab, setActiveTab] = useState("reglementaire");

  return (
    <div className="space-y-6">
      <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-200 mb-6">
        <h3 className="text-zinc-800 font-medium flex items-center gap-2 mb-2">
          <Calculator className="h-5 w-5" />
          Calculateurs Techniques et Réglementaires
        </h3>
        <p className="text-zinc-700 text-sm">
          Accédez à nos outils de calcul spécialisés pour la conception et la vérification de conformité aux réglementations.
          Ces calculateurs vous aideront à dimensionner correctement vos projets.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-zinc-100 p-1 flex flex-wrap">
          <TabsTrigger value="reglementaire" className="data-[state=active]:bg-white flex items-center gap-2">
            <Scale className="h-4 w-4" />
            <span>Réglementaire</span>
          </TabsTrigger>
          <TabsTrigger value="technique" className="data-[state=active]:bg-white flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            <span>Technique</span>
          </TabsTrigger>
          <TabsTrigger value="thermique" className="data-[state=active]:bg-white flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            <span>Thermique</span>
          </TabsTrigger>
          <TabsTrigger value="acoustique" className="data-[state=active]:bg-white flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            <span>Acoustique</span>
          </TabsTrigger>
          <TabsTrigger value="hygrometrie" className="data-[state=active]:bg-white flex items-center gap-2">
            <Droplets className="h-4 w-4" />
            <span>Hygrométrie</span>
          </TabsTrigger>
          <TabsTrigger value="incendie" className="data-[state=active]:bg-white flex items-center gap-2">
            <Flame className="h-4 w-4" />
            <span>Incendie</span>
          </TabsTrigger>
          <TabsTrigger value="accessibilite" className="data-[state=active]:bg-white flex items-center gap-2">
            <Accessibility className="h-4 w-4" />
            <span>Accessibilité</span>
          </TabsTrigger>
        </TabsList>

        {/* Onglet Réglementaire */}
        <TabsContent value="reglementaire">
          <RegulatoryCalculators />
        </TabsContent>

        {/* Onglet Technique */}
        <TabsContent value="technique">
          <EurocodeCalculators />
        </TabsContent>

        {/* Onglet Thermique */}
        <TabsContent value="thermique">
          <ThermalResistanceCalculator />
        </TabsContent>

        {/* Onglet Acoustique */}
        <TabsContent value="acoustique">
          <AcousticInsulationCalculator />
        </TabsContent>

        {/* Onglet Hygrométrie */}
        <TabsContent value="hygrometrie">
          <HygrometryCalculator />
        </TabsContent>

        {/* Onglet Incendie */}
        <TabsContent value="incendie">
          <FireCalculator />
        </TabsContent>

        {/* Onglet Accessibilité */}
        <TabsContent value="accessibilite">
          <AccessibilityRampCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceCalculators;
