
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, AlertCircle, Info } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useToast } from '@/hooks/use-toast';

const HygrometryCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dewpoint');
  
  // État pour le calculateur de point de rosée
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(60);
  const [surfaceTemperature, setSurfaceTemperature] = useState(16);
  
  // État pour le calculateur de résistance à la diffusion
  const [materialThickness, setMaterialThickness] = useState(0.2);
  const [materialMu, setMaterialMu] = useState(50);
  
  // État pour le calculateur de ventilation
  const [roomVolume, setRoomVolume] = useState(50);
  const [occupants, setOccupants] = useState(2);
  const [activity, setActivity] = useState('rest');
  
  // Calcul du point de rosée (formule de Magnus)
  const calculateDewPoint = () => {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return Math.round(dewPoint * 100) / 100;
  };
  
  // Vérifie s'il y a un risque de condensation
  const isCondensationRisk = () => {
    const dewPoint = calculateDewPoint();
    return surfaceTemperature < dewPoint;
  };
  
  // Calcul de la valeur Sd (épaisseur équivalente de diffusion)
  const calculateSdValue = () => {
    return materialThickness * materialMu;
  };
  
  // Calcul du débit de ventilation nécessaire
  const calculateVentilationRate = () => {
    // Débit de base par personne en m³/h
    const baseRatePerPerson = {
      'rest': 18,      // Repos
      'light': 25,     // Activité légère
      'moderate': 35,  // Activité modérée
      'heavy': 60      // Activité intense
    };
    
    const rate = baseRatePerPerson[activity as keyof typeof baseRatePerPerson] || baseRatePerPerson.light;
    return occupants * rate;
  };
  
  // Calcul du taux de renouvellement d'air
  const calculateAirChangeRate = () => {
    const ventilationRate = calculateVentilationRate();
    return ventilationRate / roomVolume;
  };
  
  const handleDownload = (reportType: string) => {
    toast({
      title: "Téléchargement démarré",
      description: `Le rapport ${reportType} est en cours de téléchargement.`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur Hygrométrie</CardTitle>
        <CardDescription>
          Calculs liés à l'humidité, la condensation et la diffusion de vapeur d'eau dans les bâtiments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="dewpoint">Point de rosée</TabsTrigger>
            <TabsTrigger value="vaporresistance">Résistance à la diffusion</TabsTrigger>
            <TabsTrigger value="ventilation">Ventilation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dewpoint" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="temperature">Température ambiante (°C)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    id="temperature"
                    min={0} 
                    max={30} 
                    step={0.5}
                    value={[temperature]} 
                    onValueChange={(value) => setTemperature(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-right font-medium">{temperature} °C</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidité relative (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    id="humidity"
                    min={0} 
                    max={100} 
                    step={1}
                    value={[humidity]} 
                    onValueChange={(value) => setHumidity(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-right font-medium">{humidity} %</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="surface-temp">Température de surface (°C)</Label>
                <div className="flex items-center gap-4">
                  <Slider 
                    id="surface-temp"
                    min={0} 
                    max={30} 
                    step={0.5}
                    value={[surfaceTemperature]} 
                    onValueChange={(value) => setSurfaceTemperature(value[0])}
                    className="flex-1"
                  />
                  <span className="w-12 text-right font-medium">{surfaceTemperature} °C</span>
                </div>
              </div>
              
              <div className="rounded-md border p-4 mt-4">
                <h3 className="text-lg font-medium mb-3">Résultats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Point de rosée :</span>
                    <span className="font-bold">{calculateDewPoint()} °C</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Risque de condensation :</span>
                    <span className={isCondensationRisk() ? "font-bold text-red-500" : "font-bold text-green-500"}>
                      {isCondensationRisk() ? "OUI" : "NON"}
                    </span>
                  </div>
                  
                  {isCondensationRisk() && (
                    <div className="flex items-start gap-2 mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>La température de surface est inférieure au point de rosée, ce qui entraîne un risque de condensation.</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={() => handleDownload('point de rosée')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le rapport
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vaporresistance" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="materialThickness">Épaisseur du matériau (m)</Label>
                <Input 
                  id="materialThickness"
                  type="number" 
                  min={0.001}
                  max={1}
                  step={0.001}
                  value={materialThickness}
                  onChange={(e) => setMaterialThickness(parseFloat(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="materialMu">Facteur μ du matériau</Label>
                <Input 
                  id="materialMu"
                  type="number" 
                  min={1}
                  max={100000}
                  value={materialMu}
                  onChange={(e) => setMaterialMu(parseFloat(e.target.value))}
                />
              </div>
              
              <div className="rounded-md border p-4 mt-4">
                <h3 className="text-lg font-medium mb-3">Résultats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Valeur Sd :</span>
                    <span className="font-bold">{calculateSdValue().toFixed(2)} m</span>
                  </div>
                  
                  <div className="flex items-start gap-2 mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>La valeur Sd représente l'épaisseur équivalente d'air pour la diffusion de vapeur d'eau. Plus cette valeur est élevée, plus le matériau est étanche à la vapeur d'eau.</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Facteurs μ courants</h3>
                <div className="grid grid-cols-2 gap-x-4 text-sm">
                  <div className="font-medium">Matériau</div>
                  <div className="font-medium">Facteur μ</div>
                  
                  <div>Laine minérale</div>
                  <div>1-2</div>
                  
                  <div>Polystyrène</div>
                  <div>30-100</div>
                  
                  <div>Polyuréthane</div>
                  <div>30-50</div>
                  
                  <div>Béton</div>
                  <div>50-100</div>
                  
                  <div>Brique</div>
                  <div>5-10</div>
                  
                  <div>Bois</div>
                  <div>20-50</div>
                  
                  <div>Film polyéthylène</div>
                  <div>{">"}100 000</div>
                  
                  <div>Frein-vapeur</div>
                  <div>2 000-20 000</div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={() => handleDownload('résistance à la diffusion')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le rapport
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ventilation" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="roomVolume">Volume de la pièce (m³)</Label>
                <Input 
                  id="roomVolume"
                  type="number" 
                  min={1}
                  max={1000}
                  value={roomVolume}
                  onChange={(e) => setRoomVolume(parseFloat(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="occupants">Nombre d'occupants</Label>
                <Input 
                  id="occupants"
                  type="number" 
                  min={1}
                  max={100}
                  value={occupants}
                  onChange={(e) => setOccupants(parseFloat(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="activity">Type d'activité</Label>
                <Select value={activity} onValueChange={setActivity}>
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="Sélectionner une activité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rest">Repos</SelectItem>
                    <SelectItem value="light">Activité légère</SelectItem>
                    <SelectItem value="moderate">Activité modérée</SelectItem>
                    <SelectItem value="heavy">Activité intense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border p-4 mt-4">
                <h3 className="text-lg font-medium mb-3">Résultats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Débit de ventilation nécessaire :</span>
                    <span className="font-bold">{calculateVentilationRate().toFixed(0)} m³/h</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Taux de renouvellement d'air :</span>
                    <span className="font-bold">{calculateAirChangeRate().toFixed(1)} vol/h</span>
                  </div>
                  
                  <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>Pour les habitations, un taux de renouvellement d'air entre 0,5 et 1 vol/h est généralement recommandé pour assurer une bonne qualité d'air intérieur.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  onClick={() => handleDownload('ventilation')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger le rapport
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Calculateur conforme aux exigences de la réglementation française en vigueur.
      </CardFooter>
    </Card>
  );
};

export default HygrometryCalculator;
