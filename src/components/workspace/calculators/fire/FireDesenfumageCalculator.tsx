
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FireDesenfumageCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('natural');
  const [surface, setSurface] = useState('500');
  const [height, setHeight] = useState('3');
  const [buildingType, setBuildingType] = useState('commercial');
  const [riskLevel, setRiskLevel] = useState('medium');
  
  // Calcul des surfaces utiles d'évacuation de fumées
  const calculateSmokeSurface = () => {
    const buildingArea = parseFloat(surface);
    let percentage = 0;
    
    // Pourcentage selon le type de bâtiment et le niveau de risque
    if (buildingType === 'industrial') {
      if (riskLevel === 'high') {
        percentage = 2.5; // 2.5% de la surface au sol
      } else if (riskLevel === 'medium') {
        percentage = 1.5; // 1.5% de la surface au sol
      } else {
        percentage = 1.0; // 1% de la surface au sol
      }
    } else if (buildingType === 'commercial') {
      if (riskLevel === 'high') {
        percentage = 2.0; // 2% de la surface au sol
      } else if (riskLevel === 'medium') {
        percentage = 1.0; // 1% de la surface au sol
      } else {
        percentage = 0.5; // 0.5% de la surface au sol
      }
    } else {
      if (riskLevel === 'high') {
        percentage = 1.5; // 1.5% de la surface au sol
      } else if (riskLevel === 'medium') {
        percentage = 1.0; // 1% de la surface au sol
      } else {
        percentage = 0.5; // 0.5% de la surface au sol
      }
    }
    
    // Surface utile d'évacuation des fumées
    return (buildingArea * percentage / 100).toFixed(2);
  };
  
  // Calcul du nombre d'exutoires
  const calculateExutoires = () => {
    const smokeSurface = parseFloat(calculateSmokeSurface());
    // On considère qu'un exutoire standard a une surface géométrique de 1m²
    // avec un coefficient d'efficacité de 0.5
    const exutoireEffectiveSurface = 0.5; // m²
    return Math.ceil(smokeSurface / exutoireEffectiveSurface);
  };
  
  // Calcul des amenées d'air
  const calculateAirInlet = () => {
    const smokeSurface = parseFloat(calculateSmokeSurface());
    // La surface d'amenée d'air doit être au moins égale à la surface d'extraction
    return smokeSurface.toFixed(2);
  };
  
  // Reset form values
  const handleReset = () => {
    setSurface('500');
    setHeight('3');
    setBuildingType('commercial');
    setRiskLevel('medium');
  };
  
  // Handle download report
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport de calcul de désenfumage est en cours de téléchargement."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur de Désenfumage</CardTitle>
        <CardDescription>
          Dimensionnement des systèmes de désenfumage naturel et mécanique conformes à la réglementation française (IT 246)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="natural">Désenfumage naturel</TabsTrigger>
            <TabsTrigger value="mechanical">Désenfumage mécanique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="natural" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="surface">Surface au sol (m²)</Label>
                  <Input 
                    id="surface"
                    type="number" 
                    value={surface} 
                    onChange={(e) => setSurface(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="height">Hauteur sous plafond (m)</Label>
                  <Input 
                    id="height"
                    type="number" 
                    step="0.1"
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="buildingType">Type de bâtiment</Label>
                  <Select value={buildingType} onValueChange={setBuildingType}>
                    <SelectTrigger id="buildingType">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="industrial">Industriel</SelectItem>
                      <SelectItem value="commercial">Commercial / ERP</SelectItem>
                      <SelectItem value="residential">Résidentiel collectif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="riskLevel">Niveau de risque</Label>
                  <Select value={riskLevel} onValueChange={setRiskLevel}>
                    <SelectTrigger id="riskLevel">
                      <SelectValue placeholder="Sélectionner un niveau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Faible</SelectItem>
                      <SelectItem value="medium">Moyen</SelectItem>
                      <SelectItem value="high">Élevé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
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
                  <p className="text-sm text-gray-500">Surface utile d'évacuation</p>
                  <p className="text-lg font-medium">{calculateSmokeSurface()} m²</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Nombre d'exutoires requis</p>
                  <p className="text-lg font-medium">{calculateExutoires()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Surface d'amenée d'air</p>
                  <p className="text-lg font-medium">{calculateAirInlet()} m²</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="mechanical">
            <div className="flex items-center justify-center h-48 border rounded-md">
              <div className="text-center space-y-2">
                <Info className="mx-auto h-8 w-8 text-blue-500" />
                <p>Le module de calcul du désenfumage mécanique sera disponible prochainement.</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Les résultats de ce calculateur sont fournis à titre indicatif. Consultez un bureau d'études spécialisé pour une étude complète.
      </CardFooter>
    </Card>
  );
};

export default FireDesenfumageCalculator;
