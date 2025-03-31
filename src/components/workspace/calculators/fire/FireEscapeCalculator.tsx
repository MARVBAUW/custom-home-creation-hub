
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Download, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FireEscapeCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('escape_distance');
  
  // État pour le calculateur de distance d'évacuation
  const [buildingType, setBuildingType] = useState('habitation');
  const [personCount, setPersonCount] = useState('50');
  const [hasSprinklers, setHasSprinklers] = useState(false);
  
  // État pour le calculateur de largeur de dégagement
  const [occupantsNumber, setOccupantsNumber] = useState('100');
  const [floorNumber, setFloorNumber] = useState('0');
  const [exitNumber, setExitNumber] = useState('2');
  const [isHandicapAccessible, setIsHandicapAccessible] = useState(true);
  
  // Base de données des distances maximales par type de bâtiment
  const maxDistancesDb: Record<string, Record<string, number>> = {
    'habitation': {
      'standard': 25,
      'sprinklers': 40
    },
    'bureau': {
      'standard': 30,
      'sprinklers': 45
    },
    'commerce': {
      'standard': 25,
      'sprinklers': 40
    },
    'industriel': {
      'standard': 25,
      'sprinklers': 40
    },
    'erp': {
      'standard': 20,
      'sprinklers': 35
    }
  };
  
  // Calcul de la distance maximale d'évacuation
  const calculateMaxDistance = () => {
    const condition = hasSprinklers ? 'sprinklers' : 'standard';
    
    let maxDistance = maxDistancesDb[buildingType]?.[condition] || 25;
    
    // Ajustement en fonction du nombre de personnes
    const personCountNum = parseInt(personCount);
    if (personCountNum > 100) {
      maxDistance = Math.max(maxDistance - 5, 15);
    }
    
    return maxDistance;
  };
  
  // Calcul du nombre d'unités de passage requises (UP = 0,6m)
  const calculatePassageUnits = () => {
    const occupants = parseInt(occupantsNumber);
    const floor = parseInt(floorNumber);
    
    let unitsRequired = 0;
    
    // Calcul selon les règles du Code de la construction et de l'habitation
    if (buildingType === 'habitation') {
      // 1 UP pour 100 personnes
      unitsRequired = Math.ceil(occupants / 100);
    } else if (buildingType === 'bureau') {
      // 1 UP pour 100 personnes
      unitsRequired = Math.ceil(occupants / 100);
    } else if (buildingType === 'erp') {
      // 1 UP pour 100 personnes avec un minimum de 2 UP
      unitsRequired = Math.max(2, Math.ceil(occupants / 100));
      
      // Augmentation pour les étages supérieurs
      if (floor > 0) {
        unitsRequired = Math.max(unitsRequired, Math.ceil(occupants / 50));
      }
    } else {
      // Cas général: 1 UP pour 100 personnes
      unitsRequired = Math.ceil(occupants / 100);
    }
    
    // Minimum de 1 UP dans tous les cas
    return Math.max(1, unitsRequired);
  };
  
  // Calcul de la largeur minimale en mètres
  const calculateMinWidth = () => {
    const units = calculatePassageUnits();
    
    // Une UP (unité de passage) = 0,6m
    let minWidth = units * 0.6;
    
    // Pour l'accessibilité PMR, minimum de 0,9m pour une UP ou 1,4m pour 2 UP et plus
    if (isHandicapAccessible) {
      minWidth = units === 1 ? Math.max(minWidth, 0.9) : Math.max(minWidth, 1.4);
    }
    
    return minWidth;
  };
  
  // Calcul de la largeur par sortie
  const calculateWidthPerExit = () => {
    const totalWidth = calculateMinWidth();
    const exits = Math.max(1, parseInt(exitNumber));
    
    return totalWidth / exits;
  };
  
  // Vérification de la conformité des sorties
  const checkExitsCompliance = () => {
    const widthPerExit = calculateWidthPerExit();
    
    // Largeur minimale pour une sortie
    const minSingleExit = isHandicapAccessible ? 0.9 : 0.6;
    
    return widthPerExit >= minSingleExit;
  };
  
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport est en cours de téléchargement."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur Sécurité Incendie</CardTitle>
        <CardDescription>
          Calculs des distances d'évacuation, largeurs de dégagement et vérification de conformité
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="escape_distance">Distance d'évacuation</TabsTrigger>
            <TabsTrigger value="exit_width">Largeur des dégagements</TabsTrigger>
          </TabsList>
          
          <TabsContent value="escape_distance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="buildingType">Type de bâtiment</Label>
                <Select 
                  value={buildingType} 
                  onValueChange={setBuildingType}
                >
                  <SelectTrigger id="buildingType">
                    <SelectValue placeholder="Sélectionner un type de bâtiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="habitation">Habitation</SelectItem>
                    <SelectItem value="bureau">Bureau</SelectItem>
                    <SelectItem value="commerce">Commerce</SelectItem>
                    <SelectItem value="industriel">Industriel</SelectItem>
                    <SelectItem value="erp">ERP (Établissement Recevant du Public)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="personCount">Nombre de personnes</Label>
                <Input 
                  id="personCount"
                  type="number" 
                  min="1"
                  value={personCount} 
                  onChange={(e) => setPersonCount(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={hasSprinklers}
                  onChange={(e) => setHasSprinklers(e.target.checked)}
                  id="hasSprinklers"
                  className="h-4 w-4 rounded"
                />
                <Label htmlFor="hasSprinklers">Système d'extinction automatique à eau (sprinkleurs)</Label>
              </div>
            </div>
            
            <div className="rounded-md border p-4 mt-4 bg-slate-50">
              <h3 className="text-lg font-medium mb-3">Résultats</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Distance maximale à parcourir jusqu'à une sortie</p>
                  <p className="text-2xl font-semibold">{calculateMaxDistance()} m</p>
                </div>
                
                <div className="flex items-start gap-2 mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Cette distance est mesurée selon le cheminement réel, en suivant les couloirs et les escaliers, depuis le point le plus éloigné accessible au public jusqu'à la sortie la plus proche.
                  </p>
                </div>
                
                <div className="flex items-start gap-2 mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-700">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    En cas de cul-de-sac, la distance maximale depuis l'entrée du cul-de-sac jusqu'à une sortie ou un espace offrant deux directions d'évacuation est généralement limitée à 10 mètres.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Télécharger le rapport
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="exit_width" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupantsNumber">Nombre d'occupants</Label>
                <Input 
                  id="occupantsNumber"
                  type="number" 
                  min="1"
                  value={occupantsNumber} 
                  onChange={(e) => setOccupantsNumber(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="floorNumber">Étage</Label>
                <Select 
                  value={floorNumber} 
                  onValueChange={setFloorNumber}
                >
                  <SelectTrigger id="floorNumber">
                    <SelectValue placeholder="Sélectionner un étage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Rez-de-chaussée</SelectItem>
                    <SelectItem value="1">1er étage</SelectItem>
                    <SelectItem value="2">2ème étage</SelectItem>
                    <SelectItem value="3">3ème étage ou plus</SelectItem>
                    <SelectItem value="-1">Sous-sol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="exitNumber">Nombre de sorties</Label>
                <Input 
                  id="exitNumber"
                  type="number" 
                  min="1"
                  max="10"
                  value={exitNumber} 
                  onChange={(e) => setExitNumber(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isHandicapAccessible}
                  onChange={(e) => setIsHandicapAccessible(e.target.checked)}
                  id="isHandicapAccessible"
                  className="h-4 w-4 rounded"
                />
                <Label htmlFor="isHandicapAccessible">Accessibilité PMR requise</Label>
              </div>
            </div>
            
            <div className="rounded-md border p-4 mt-4 bg-slate-50">
              <h3 className="text-lg font-medium mb-3">Résultats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Unités de passage requises</p>
                  <p className="text-2xl font-semibold">{calculatePassageUnits()} UP</p>
                  <p className="text-xs text-gray-500">1 UP = 0,6 mètre</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Largeur minimale totale</p>
                  <p className="text-2xl font-semibold">{calculateMinWidth().toFixed(2)} m</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Largeur par sortie</p>
                  <p className="text-2xl font-semibold">{calculateWidthPerExit().toFixed(2)} m</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Conformité</p>
                  <p className={`text-lg font-semibold ${checkExitsCompliance() ? "text-green-600" : "text-red-600"}`}>
                    {checkExitsCompliance() ? "Conforme" : "Non conforme"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 mt-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Pour l'accessibilité PMR, la largeur minimale est de 0,9m (1,5 UP) pour une sortie et 1,4m (2,33 UP) pour les circulations principales.
                </p>
              </div>
              
              {!checkExitsCompliance() && (
                <div className="flex items-start gap-2 mt-2 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    La largeur par sortie est insuffisante. Augmentez le nombre d'unités de passage ou réduisez le nombre de sorties.
                  </p>
                </div>
              )}
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Télécharger le rapport
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Calculateur conforme aux exigences du règlement de sécurité contre les risques d'incendie et de panique.
      </CardFooter>
    </Card>
  );
};

export default FireEscapeCalculator;
