
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, AreaChart, Home, Percent } from 'lucide-react';

// Import des calculateurs
import RentabiliteLocativeCalculator from './calculators/RentabiliteLocativeCalculator';
import CapaciteEmpruntCalculator from './calculators/CapaciteEmpruntCalculator';
import FraisNotaireCalculator from './calculators/FraisNotaireCalculator';
import RendementCalculator from './calculators/RendementCalculator';
import AcoustiqueCalculator from './calculators/AcoustiqueCalculator';
import DpeCalculator from './calculators/DpeCalculator';
import LoanComparatorCalculator from './calculators/LoanComparatorCalculator';

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
    </div>
  );
};

export default WorkspaceCalculateurs;
