
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, ArrowRight, Building, Locate, BrickWall, Scale } from 'lucide-react';

import FireEscapeCalculator from './FireEscapeCalculator';
import FireClassificationCalculator from './FireClassificationCalculator';
import FireSystemsCalculator from './FireSystemsCalculator';
import FireDesenfumageCalculator from './FireDesenfumageCalculator';

const FireCalculator = () => {
  const [activeTab, setActiveTab] = useState('escape');

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-xl font-medium">Calculateurs Sécurité Incendie</h3>
        <p className="text-gray-600 text-sm">Outils pour vérifier la conformité aux réglementations de sécurité incendie</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-slate-50 grid grid-cols-2 md:grid-cols-4 border">
          <TabsTrigger value="escape">
            <ArrowRight className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Évacuation</span>
            <span className="sm:hidden">Évac</span>
          </TabsTrigger>
          <TabsTrigger value="classification">
            <Scale className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Classification</span>
            <span className="sm:hidden">Class</span>
          </TabsTrigger>
          <TabsTrigger value="systems">
            <Flame className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Équipements</span>
            <span className="sm:hidden">Équip</span>
          </TabsTrigger>
          <TabsTrigger value="desenfumage">
            <Building className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Désenfumage</span>
            <span className="sm:hidden">Désenf</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="escape">
          <FireEscapeCalculator />
        </TabsContent>
        
        <TabsContent value="classification">
          <Card>
            <CardHeader>
              <CardTitle>Classification au feu</CardTitle>
              <CardDescription>
                Vérification des classements au feu des matériaux et structures selon la réglementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">Calculateur en cours de chargement...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="systems">
          <Card>
            <CardHeader>
              <CardTitle>Équipements de sécurité incendie</CardTitle>
              <CardDescription>
                Calcul des besoins en équipements selon la réglementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">Calculateur en cours de chargement...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="desenfumage">
          <Card>
            <CardHeader>
              <CardTitle>Désenfumage</CardTitle>
              <CardDescription>
                Calcul des surfaces de désenfumage et exutoires selon la réglementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-gray-500">Calculateur en cours de chargement...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FireCalculator;
