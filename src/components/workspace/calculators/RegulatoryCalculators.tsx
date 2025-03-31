
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Flame, 
  Accessibility, 
  Thermometer, 
  Volume, 
  Droplets, 
  Calculator as CalculatorIcon, 
  AlertCircle, 
  Info, 
  Download 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

// Import hygrometry calculators
import HygrometryCalculator from './hygrometry/HygrometryCalculator';

// Import thermal calculators
import ThermalResistanceCalculator from './thermal/ThermalResistanceCalculator';

// Import acoustics calculators
import AcousticInsulationCalculator from './acoustic/AcousticInsulationCalculator';

// Import fire safety calculators
import FireEscapeCalculator from './fire/FireEscapeCalculator';

// Import accessibility calculators
import AccessibilityRampCalculator from './accessibility/AccessibilityRampCalculator';

const RegulatoryCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('hygrometry');

  // Simple calculator states
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(60);
  const [surfaceTemperature, setSurfaceTemperature] = useState(16);
  const [materialThickness, setMaterialThickness] = useState(0.2);
  const [materialLambda, setMaterialLambda] = useState(0.04);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Calculate dew point temperature (simplified Magnus formula)
  const calculateDewPoint = () => {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return Math.round(dewPoint * 100) / 100;
  };

  // Calculate condensation risk
  const isCondensationRisk = () => {
    const dewPoint = calculateDewPoint();
    return surfaceTemperature < dewPoint;
  };

  // Calculate thermal resistance
  const calculateThermalResistance = () => {
    return materialThickness / materialLambda;
  };

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${name} téléchargé avec succès`);
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h3 className="text-xl font-medium">Calculateurs Réglementaires</h3>
        <p className="text-gray-600 text-sm">Outils de calcul pour vérifier la conformité aux réglementations du bâtiment</p>
      </div>
      
      <Tabs value={activeCalculator} onValueChange={setActiveCalculator} className="space-y-4">
        <TabsList className="bg-slate-50 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border">
          <TabsTrigger value="hygrometry">
            <Droplets className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Hygrométrie</span>
            <span className="sm:hidden">Hygro</span>
          </TabsTrigger>
          <TabsTrigger value="thermal">
            <Thermometer className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Thermique</span>
            <span className="sm:hidden">Therm</span>
          </TabsTrigger>
          <TabsTrigger value="acoustic">
            <Volume className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Acoustique</span>
            <span className="sm:hidden">Acous</span>
          </TabsTrigger>
          <TabsTrigger value="fire">
            <Flame className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Incendie</span>
            <span className="sm:hidden">Incend</span>
          </TabsTrigger>
          <TabsTrigger value="accessibility">
            <Accessibility className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Accessibilité</span>
            <span className="sm:hidden">Access</span>
          </TabsTrigger>
        </TabsList>

        {/* Hygrometry Calculators */}
        <TabsContent value="hygrometry">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dew Point Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Point de rosée</CardTitle>
                <CardDescription>
                  Calculez le point de rosée et les risques de condensation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Température (°C)</Label>
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
                    <Label htmlFor="surface-temp">Température surface (°C)</Label>
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
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
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
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full flex-1"
                  onClick={() => {
                    // Here you could integrate a more advanced calculator
                    window.open('/workspace?activeTab=calculators&calculator=hygrometryAdvanced', '_blank');
                  }}
                >
                  <CalculatorIcon className="mr-2 h-4 w-4" />
                  Version avancée
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full flex-1"
                  onClick={() => handleDownload('hygro-guide', 'Guide hygrométrie')}
                  disabled={downloadingId === 'hygro-guide'}
                >
                  {downloadingId === 'hygro-guide' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le guide
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Vapor Resistance Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Résistance à la diffusion</CardTitle>
                <CardDescription>
                  Calculez la résistance à la diffusion de vapeur d'eau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="material-thickness">Épaisseur (m)</Label>
                    <Input 
                      id="material-thickness"
                      type="number"
                      min={0.001}
                      max={1}
                      step={0.001}
                      value={materialThickness}
                      onChange={(e) => setMaterialThickness(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="material-lambda">Lambda λ (W/m.K)</Label>
                    <Input 
                      id="material-lambda"
                      type="number"
                      min={0.01}
                      max={2}
                      step={0.01}
                      value={materialLambda}
                      onChange={(e) => setMaterialLambda(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Résistance thermique :</span>
                      <span className="font-bold">{calculateThermalResistance().toFixed(2)} m².K/W</span>
                    </div>
                    
                    <div className="flex items-start gap-2 mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <p>Pour calculer la résistance à la diffusion de vapeur (Sd), multipliez l'épaisseur par le facteur μ du matériau.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  variant="secondary"
                  onClick={() => handleDownload('vapeur-guide', 'Guide diffusion vapeur')}
                  disabled={downloadingId === 'vapeur-guide'}
                >
                  {downloadingId === 'vapeur-guide' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le guide
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            {/* Material Comparison Card */}
            <Card>
              <CardHeader>
                <CardTitle>Facteurs μ des matériaux</CardTitle>
                <CardDescription>
                  Facteurs de résistance à la diffusion de vapeur d'eau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-x-4">
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
                  
                  <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                    <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>Plus le facteur μ est élevé, plus le matériau est résistant à la diffusion de vapeur d'eau.</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  variant="secondary"
                  onClick={() => handleDownload('materiaux-guide', 'Tableau des matériaux')}
                  disabled={downloadingId === 'materiaux-guide'}
                >
                  {downloadingId === 'materiaux-guide' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le tableau
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Thermal Calculators */}
        <TabsContent value="thermal">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Résistance thermique</CardTitle>
                <CardDescription>
                  Calculez la résistance thermique d'une paroi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=thermique&calculator=resistance', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ponts thermiques</CardTitle>
                <CardDescription>
                  Estimation des déperditions par pont thermique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=thermique&calculator=ponts', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Coefficient U</CardTitle>
                <CardDescription>
                  Calculez le coefficient de transmission thermique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=thermique&calculator=coefficient-u', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Acoustic Calculators */}
        <TabsContent value="acoustic">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Indice d'affaiblissement</CardTitle>
                <CardDescription>
                  Calculez l'affaiblissement acoustique d'une paroi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=calculateurs&calculator=acoustique', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Temps de réverbération</CardTitle>
                <CardDescription>
                  Calculez le temps de réverbération d'un local
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=calculateurs&calculator=acoustique', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Niveaux sonores</CardTitle>
                <CardDescription>
                  Calculez les niveaux sonores et leur propagation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=calculateurs&calculator=acoustique', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Fire Safety Calculators */}
        <TabsContent value="fire">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distances d'évacuation</CardTitle>
                <CardDescription>
                  Calculez les distances d'évacuation maximales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=incendie', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Classement au feu</CardTitle>
                <CardDescription>
                  Consultez les classements au feu des matériaux
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Base de données en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=incendie', '_blank');
                  }}
                >
                  Ouvrir la base de données
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Charge calorifique</CardTitle>
                <CardDescription>
                  Calculez la charge calorifique d'un local
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=incendie', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Accessibility Calculators */}
        <TabsContent value="accessibility">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Rampes d'accès</CardTitle>
                <CardDescription>
                  Calculez les dimensions d'une rampe d'accès PMR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=accessibilite', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Aires de rotation</CardTitle>
                <CardDescription>
                  Vérifiez les aires de rotation pour les fauteuils
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=accessibilite', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ascenseurs PMR</CardTitle>
                <CardDescription>
                  Vérifiez la conformité d'un ascenseur PMR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-40">
                  <p className="text-gray-500">Calculateur en cours de chargement...</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={() => {
                    window.open('/workspace?tab=reglementation&section=accessibilite', '_blank');
                  }}
                >
                  Ouvrir le calculateur complet
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RegulatoryCalculators;
