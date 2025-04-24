
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import StructuredEstimator from './StructuredEstimator';
import AdvancedEstimator from './AdvancedEstimator';
import EstimationHistory from './EstimationHistory';
import { Calculator, Settings, History } from 'lucide-react';

const EstimationCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("standard");

  return (
    <Card className="shadow-sm border-0">
      <CardContent className="p-0 sm:p-2">
        <div className="relative">
          <h1 className="sr-only">Calculateur d'estimation pour votre projet immobilier</h1>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="standard" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Estimation standard</span>
                <span className="sm:hidden">Standard</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Estimation avancée</span>
                <span className="sm:hidden">Avancée</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">Historique</span>
                <span className="sm:hidden">Historique</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard" className="pt-2">
              <StructuredEstimator />
            </TabsContent>
            
            <TabsContent value="advanced" className="pt-2">
              <AdvancedEstimator />
            </TabsContent>
            
            <TabsContent value="history" className="pt-2">
              <EstimationHistory />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculator;
