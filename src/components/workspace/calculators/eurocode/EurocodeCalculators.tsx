
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LoadCombinationsCalculator,
  ClimateCalculator,
  BeamCalculator,
  ColumnCalculator,
  SlabCalculator,
  FoundationCalculator,
  SteelCalculator,
  TimberCalculator
} from './index';
import { Building, Ruler, Wind, Calculator, CircleOff, Warehouse } from 'lucide-react';

const EurocodeCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('climate');

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-xl font-medium">Calculateurs Eurocode (EC1-EC7)</h3>
        <p className="text-gray-600 text-sm">Suite d'outils de calcul conformes aux Eurocodes pour les ingénieurs et professionnels de la construction.</p>
      </div>
      
      <Tabs value={activeCalculator} onValueChange={setActiveCalculator} className="space-y-4">
        <TabsList className="bg-slate-50 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 border">
          <TabsTrigger value="climate">
            <Wind className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Climat</span>
            <span className="sm:hidden">EC1</span>
          </TabsTrigger>
          <TabsTrigger value="beam">
            <Ruler className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Poutres</span>
            <span className="sm:hidden">EC2</span>
          </TabsTrigger>
          <TabsTrigger value="column">
            <Building className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Poteaux</span>
            <span className="sm:hidden">EC2</span>
          </TabsTrigger>
          <TabsTrigger value="slab">
            <Ruler className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Dalles</span>
            <span className="sm:hidden">EC2</span>
          </TabsTrigger>
          <TabsTrigger value="steel">
            <CircleOff className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Acier</span>
            <span className="sm:hidden">EC3</span>
          </TabsTrigger>
          <TabsTrigger value="timber">
            <Warehouse className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Bois</span>
            <span className="sm:hidden">EC5</span>
          </TabsTrigger>
          <TabsTrigger value="foundation">
            <Building className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Fondations</span>
            <span className="sm:hidden">EC7</span>
          </TabsTrigger>
          <TabsTrigger value="combinations">
            <Calculator className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Combinaisons</span>
            <span className="sm:hidden">EC0</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="climate">
          <ClimateCalculator />
        </TabsContent>
        
        <TabsContent value="beam">
          <BeamCalculator />
        </TabsContent>
        
        <TabsContent value="column">
          <ColumnCalculator />
        </TabsContent>
        
        <TabsContent value="slab">
          <SlabCalculator />
        </TabsContent>
        
        <TabsContent value="steel">
          <SteelCalculator />
        </TabsContent>
        
        <TabsContent value="timber">
          <TimberCalculator />
        </TabsContent>
        
        <TabsContent value="foundation">
          <FoundationCalculator />
        </TabsContent>
        
        <TabsContent value="combinations">
          <LoadCombinationsCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EurocodeCalculators;
