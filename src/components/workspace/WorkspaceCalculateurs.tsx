
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, AreaChart, Home, Percent, FileCheck, Droplets, Flame, Accessibility, Thermometer, Volume } from 'lucide-react';

// Import calculators
import RentabiliteLocativeCalculator from './calculators/RentabiliteLocativeCalculator';
import CapaciteEmpruntCalculator from './calculators/CapaciteEmpruntCalculator';
import FraisNotaireCalculator from './calculators/FraisNotaireCalculator';
import RendementCalculator from './calculators/RendementCalculator';
import AcoustiqueCalculator from './calculators/AcoustiqueCalculator';
import DpeCalculator from './calculators/DpeCalculator';
import LoanComparatorCalculator from './calculators/LoanComparatorCalculator';
import RegulatoryCalculators from './calculators/RegulatoryCalculators';
import EurocodeCalculators from './calculators/eurocode/EurocodeCalculators';

// Import specific regulatory calculators
import HygrometryCalculator from './calculators/hygrometry/HygrometryCalculator';
import ThermalResistanceCalculator from './calculators/thermal/ThermalResistanceCalculator';
import AcousticInsulationCalculator from './calculators/acoustic/AcousticInsulationCalculator';
import FireEscapeCalculator from './calculators/fire/FireEscapeCalculator';
import AccessibilityRampCalculator from './calculators/accessibility/AccessibilityRampCalculator';

const WorkspaceCalculateurs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('rentabilite');

  return (
    <div className="w-full p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Calculator className="h-6 w-6" />
        Mes Calculateurs Immobiliers
      </h1>
      
      <Card>
        <CardContent className="p-0">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex w-full h-auto flex-wrap justify-start p-0 bg-transparent border-b">
              <TabsTrigger 
                value="rentabilite" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Rentabilité Locative
              </TabsTrigger>
              <TabsTrigger 
                value="capacite" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Capacité d'Emprunt
              </TabsTrigger>
              <TabsTrigger 
                value="comparateur" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Comparateur Prêts
              </TabsTrigger>
              <TabsTrigger 
                value="frais-notaire" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Frais de Notaire
              </TabsTrigger>
              <TabsTrigger 
                value="rendement" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Rendement
              </TabsTrigger>
              <TabsTrigger 
                value="regulatory" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <FileCheck className="h-4 w-4 mr-1" />
                Réglementation
              </TabsTrigger>
              <TabsTrigger 
                value="eurocode" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                <Calculator className="h-4 w-4 mr-1" />
                Eurocodes
              </TabsTrigger>
              <TabsTrigger 
                value="acoustique" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Acoustique
              </TabsTrigger>
              <TabsTrigger 
                value="dpe" 
                className="data-[state=active]:bg-background rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                DPE
              </TabsTrigger>
            </TabsList>

            <div className="p-4">
              <TabsContent value="rentabilite" className="mt-0">
                <RentabiliteLocativeCalculator />
              </TabsContent>
              
              <TabsContent value="capacite" className="mt-0">
                <CapaciteEmpruntCalculator />
              </TabsContent>
              
              <TabsContent value="comparateur" className="mt-0">
                <LoanComparatorCalculator />
              </TabsContent>
              
              <TabsContent value="frais-notaire" className="mt-0">
                <FraisNotaireCalculator />
              </TabsContent>
              
              <TabsContent value="rendement" className="mt-0">
                <RendementCalculator />
              </TabsContent>
              
              <TabsContent value="regulatory" className="mt-0">
                <RegulatoryCalculators />
              </TabsContent>
              
              <TabsContent value="eurocode" className="mt-0">
                <EurocodeCalculators />
              </TabsContent>
              
              <TabsContent value="acoustique" className="mt-0">
                <AcoustiqueCalculator />
              </TabsContent>
              
              <TabsContent value="dpe" className="mt-0">
                <DpeCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Individual Calculator Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            Hygrométrie
          </h2>
          <HygrometryCalculator />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-teal-500" />
            Thermique
          </h2>
          <ThermalResistanceCalculator />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Volume className="h-5 w-5 text-purple-500" />
            Acoustique
          </h2>
          <AcousticInsulationCalculator />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            Sécurité Incendie
          </h2>
          <FireEscapeCalculator />
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Accessibility className="h-5 w-5 text-indigo-500" />
            Accessibilité
          </h2>
          <AccessibilityRampCalculator />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCalculateurs;
