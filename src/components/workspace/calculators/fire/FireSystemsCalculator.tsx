
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const FireSystemsCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('sprinkler');
  const [surface, setSurface] = useState('1000');
  const [buildingType, setBuildingType] = useState('commercial');
  const [riskLevel, setRiskLevel] = useState('OH1');
  const [ceilingHeight, setCeilingHeight] = useState('3');
  const [hasStorage, setHasStorage] = useState(false);
  const [storageHeight, setStorageHeight] = useState('0');
  
  // Calcul du nombre de têtes de sprinkler
  const calculateSprinklerHeads = () => {
    const area = parseFloat(surface);
    let coveragePerHead = 0;
    
    // Surface couverte par tête selon le niveau de risque
    if (riskLevel === 'LH') {
      coveragePerHead = 21; // 21 m² par tête pour risque léger
    } else if (riskLevel === 'OH1' || riskLevel === 'OH2') {
      coveragePerHead = 12; // 12 m² par tête pour risque ordinaire groupe 1 et 2
    } else if (riskLevel === 'OH3' || riskLevel === 'OH4') {
      coveragePerHead = 9; // 9 m² par tête pour risque ordinaire groupe 3 et 4
    } else {
      coveragePerHead = 7.5; // 7.5 m² par tête pour risque élevé
    }
    
    return Math.ceil(area / coveragePerHead);
  };
  
  // Calcul du débit requis
  const calculateRequiredFlow = () => {
    const area = parseFloat(surface);
    let densityLpm = 0; // Densité en L/min/m²
    
    // Densité selon le niveau de risque
    if (riskLevel === 'LH') {
      densityLpm = 2.25;
    } else if (riskLevel === 'OH1') {
      densityLpm = 5;
    } else if (riskLevel === 'OH2') {
      densityLpm = 5;
    } else if (riskLevel === 'OH3') {
      densityLpm = 5;
    } else if (riskLevel === 'OH4') {
      densityLpm = 5;
    } else if (riskLevel === 'HHP1') {
      densityLpm = 7.5;
    } else if (riskLevel === 'HHP2') {
      densityLpm = 10;
    } else {
      densityLpm = 12.5;
    }
    
    // Surface impliquée (m²) selon le niveau de risque
    let involvedArea = 0;
    if (riskLevel === 'LH') {
      involvedArea = 84;
    } else if (riskLevel.startsWith('OH')) {
      involvedArea = 72;
    } else {
      involvedArea = 260;
    }
    
    // Limiter la surface impliquée à la surface totale
    involvedArea = Math.min(involvedArea, area);
    
    // Débit total = densité × surface impliquée
    return Math.ceil(densityLpm * involvedArea);
  };
  
  // Calcul de la réserve d'eau requise
  const calculateWaterReserve = () => {
    const flowRate = calculateRequiredFlow();
    let duration = 0; // minutes
    
    // Durée selon le niveau de risque
    if (riskLevel === 'LH') {
      duration = 30;
    } else if (riskLevel.startsWith('OH')) {
      duration = 60;
    } else {
      duration = 90;
    }
    
    // Volume = débit × durée
    return Math.ceil(flowRate * duration / 1000); // en m³
  };
  
  const handleReset = () => {
    setSurface('1000');
    setBuildingType('commercial');
    setRiskLevel('OH1');
    setCeilingHeight('3');
    setHasStorage(false);
    setStorageHeight('0');
  };
  
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport de dimensionnement est en cours de téléchargement."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur de Systèmes Incendie</CardTitle>
        <CardDescription>
          Dimensionnement des systèmes d'extinction automatique et détection selon NFPA et référentiels européens
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="sprinkler">Sprinklers</TabsTrigger>
            <TabsTrigger value="detection">Détection</TabsTrigger>
            <TabsTrigger value="rie">RIA/RIE</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sprinkler" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="surface">Surface du local (m²)</Label>
                  <Input 
                    id="surface"
                    type="number" 
                    value={surface} 
                    onChange={(e) => setSurface(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="buildingType">Type de bâtiment</Label>
                  <Select value={buildingType} onValueChange={setBuildingType}>
                    <SelectTrigger id="buildingType">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industrial">Industriel</SelectItem>
                      <SelectItem value="commercial">Commercial / ERP</SelectItem>
                      <SelectItem value="storage">Stockage</SelectItem>
                      <SelectItem value="residential">Résidentiel collectif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="ceilingHeight">Hauteur sous plafond (m)</Label>
                  <Input 
                    id="ceilingHeight"
                    type="number" 
                    step="0.1"
                    value={ceilingHeight} 
                    onChange={(e) => setCeilingHeight(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="riskLevel">Niveau de risque</Label>
                  <Select value={riskLevel} onValueChange={setRiskLevel}>
                    <SelectTrigger id="riskLevel">
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="LH">Léger (LH)</SelectItem>
                      <SelectItem value="OH1">Ordinaire Gr 1 (OH1)</SelectItem>
                      <SelectItem value="OH2">Ordinaire Gr 2 (OH2)</SelectItem>
                      <SelectItem value="OH3">Ordinaire Gr 3 (OH3)</SelectItem>
                      <SelectItem value="OH4">Ordinaire Gr 4 (OH4)</SelectItem>
                      <SelectItem value="HHP1">Élevé Process Gr 1 (HHP1)</SelectItem>
                      <SelectItem value="HHP2">Élevé Process Gr 2 (HHP2)</SelectItem>
                      <SelectItem value="HHS">Élevé Stockage (HHS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="hasStorage" checked={hasStorage} onCheckedChange={setHasStorage} />
                  <Label htmlFor="hasStorage">Présence de stockage</Label>
                </div>
                
                {hasStorage && (
                  <div>
                    <Label htmlFor="storageHeight">Hauteur de stockage (m)</Label>
                    <Input 
                      id="storageHeight"
                      type="number" 
                      step="0.1"
                      value={storageHeight} 
                      onChange={(e) => setStorageHeight(e.target.value)}
                    />
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={handleReset}>
                    Réinitialiser
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4 mt-4">
              <h3 className="text-lg font-medium mb-3">Résultats</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Nombre de têtes</p>
                  <p className="text-lg font-medium">{calculateSprinklerHeads()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Débit requis</p>
                  <p className="text-lg font-medium">{calculateRequiredFlow()} L/min</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Réserve d'eau</p>
                  <p className="text-lg font-medium">{calculateWaterReserve()} m³</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="detection">
            <div className="flex items-center justify-center h-48 border rounded-md">
              <div className="text-center space-y-2">
                <Info className="mx-auto h-8 w-8 text-blue-500" />
                <p>Le module de calcul des systèmes de détection incendie sera disponible prochainement.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rie">
            <div className="flex items-center justify-center h-48 border rounded-md">
              <div className="text-center space-y-2">
                <Info className="mx-auto h-8 w-8 text-blue-500" />
                <p>Le module de calcul des RIA/RIE sera disponible prochainement.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Les résultats de ce calculateur sont fournis à titre indicatif conformément aux référentiels APSAD, EN 12845 et NFPA 13. Consultez un bureau d'études spécialisé pour une étude complète.
      </CardFooter>
    </Card>
  );
};

export default FireSystemsCalculator;
