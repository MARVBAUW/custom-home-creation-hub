
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Calculator, DoorOpen, Building, Fan } from 'lucide-react';
import FireDesenfumageCalculator from './FireDesenfumageCalculator';
import FireEvacuationCalculator from './FireEvacuationCalculator';
import FireClassificationCalculator from './FireClassificationCalculator';
import FireSystemsCalculator from './FireSystemsCalculator';

const FireCalculator = () => {
  const [activeTab, setActiveTab] = useState('classification');

  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
        <h3 className="text-red-800 font-medium flex items-center gap-2 mb-2">
          <Flame className="h-5 w-5" />
          Calculateurs Sécurité Incendie
        </h3>
        <p className="text-red-700 text-sm">
          Outils de dimensionnement et de vérification pour la sécurité incendie conformes aux normes françaises
          (arrêtés ERP, habitation et code du travail).
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs 
            defaultValue={activeTab} 
            onValueChange={setActiveTab} 
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="classification" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-900 flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Classification</span>
              </TabsTrigger>
              <TabsTrigger value="desenfumage" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-900 flex items-center gap-2">
                <Fan className="h-4 w-4" />
                <span>Désenfumage</span>
              </TabsTrigger>
              <TabsTrigger value="evacuation" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-900 flex items-center gap-2">
                <DoorOpen className="h-4 w-4" />
                <span>Évacuation</span>
              </TabsTrigger>
              <TabsTrigger value="systems" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-900 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span>Systèmes SSI</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="classification">
              <FireClassificationCalculator />
            </TabsContent>

            <TabsContent value="desenfumage">
              <FireDesenfumageCalculator />
            </TabsContent>

            <TabsContent value="evacuation">
              <FireEvacuationCalculator />
            </TabsContent>

            <TabsContent value="systems">
              <FireSystemsCalculator />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FireCalculator;
