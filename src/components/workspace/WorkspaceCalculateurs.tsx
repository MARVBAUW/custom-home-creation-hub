
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Home, Percent, CreditCard, FileText, TrendingUp, Volume2 } from 'lucide-react';
import LoanComparatorCalculator from './calculators/LoanComparatorCalculator';
import SurfaceHabitableCalculator from './calculators/SurfaceHabitableCalculator';
import RentabiliteLocativeCalculator from './calculators/RentabiliteLocativeCalculator';
import CapaciteEmpruntCalculator from './calculators/CapaciteEmpruntCalculator';
import FraisNotaireCalculator from './calculators/FraisNotaireCalculator';
import RendementCalculator from './calculators/RendementCalculator';
import AcoustiqueCalculator from './calculators/AcoustiqueCalculator';
import DpeCalculator from './calculators/DpeCalculator';

const WorkspaceCalculateurs = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Outils de calcul et simulateurs</h2>
        <p className="text-gray-600">
          Utilisez ces calculateurs pour réaliser rapidement des estimations et simulations pour vos projets.
        </p>
      </div>
      
      <Tabs defaultValue="surface" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-6">
          <TabsTrigger value="surface" className="flex items-center gap-2">
            <Home className="h-4 w-4" /> Surface
          </TabsTrigger>
          <TabsTrigger value="rentabilite" className="flex items-center gap-2">
            <Percent className="h-4 w-4" /> Rentabilité
          </TabsTrigger>
          <TabsTrigger value="emprunt" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Emprunt
          </TabsTrigger>
          <TabsTrigger value="prets" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" /> Prêts
          </TabsTrigger>
          <TabsTrigger value="notaire" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Frais notaire
          </TabsTrigger>
          <TabsTrigger value="rendement" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" /> Rendement
          </TabsTrigger>
          <TabsTrigger value="acoustique" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" /> Acoustique
          </TabsTrigger>
          <TabsTrigger value="dpe" className="flex items-center gap-2">
            <Home className="h-4 w-4" /> DPE
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="surface">
          <SurfaceHabitableCalculator />
        </TabsContent>
        
        <TabsContent value="rentabilite">
          <RentabiliteLocativeCalculator />
        </TabsContent>
        
        <TabsContent value="emprunt">
          <CapaciteEmpruntCalculator />
        </TabsContent>
        
        <TabsContent value="prets">
          <LoanComparatorCalculator />
        </TabsContent>
        
        <TabsContent value="notaire">
          <FraisNotaireCalculator />
        </TabsContent>
        
        <TabsContent value="rendement">
          <RendementCalculator />
        </TabsContent>
        
        <TabsContent value="acoustique">
          <AcoustiqueCalculator />
        </TabsContent>
        
        <TabsContent value="dpe">
          <DpeCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceCalculateurs;
