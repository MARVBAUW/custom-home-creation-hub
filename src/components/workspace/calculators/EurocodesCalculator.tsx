
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, Droplets, Search, ArrowRight, Save, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const EurocodesCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('thermal');
  
  // Thermal calculation state
  const [wallMaterial, setWallMaterial] = useState<string>('brick');
  const [wallThickness, setWallThickness] = useState<number>(200);
  const [insulationMaterial, setInsulationMaterial] = useState<string>('glasswool');
  const [insulationThickness, setInsulationThickness] = useState<number>(100);
  const [thermalResults, setThermalResults] = useState<any>(null);
  
  // Hygrothermal calculation state
  const [interiorTemp, setInteriorTemp] = useState<number>(20);
  const [exteriorTemp, setExteriorTemp] = useState<number>(-5);
  const [interiorHumidity, setInteriorHumidity] = useState<number>(50);
  const [exteriorHumidity, setExteriorHumidity] = useState<number>(80);
  const [hygrometryResults, setHygrometryResults] = useState<any>(null);
  
  // DPE calculation state
  const [dpeReference, setDpeReference] = useState<string>('');
  const [dpeResults, setDpeResults] = useState<any>(null);
  
  // Material properties (simplified)
  const materials = {
    brick: { lambda: 0.8, thickness: wallThickness },
    concrete: { lambda: 1.7, thickness: wallThickness },
    aac: { lambda: 0.16, thickness: wallThickness }, // Cellular concrete
    glasswool: { lambda: 0.035, thickness: insulationThickness },
    rockwool: { lambda: 0.04, thickness: insulationThickness },
    eps: { lambda: 0.04, thickness: insulationThickness }, // Expanded polystyrene
    xps: { lambda: 0.035, thickness: insulationThickness }, // Extruded polystyrene
    polyurethane: { lambda: 0.025, thickness: insulationThickness }
  };
  
  const calculateThermalPerformance = () => {
    // Simplified U-value calculation: U = 1 / (Rsi + Rwall + Rinsulation + Rse)
    // Where R = thickness / lambda
    
    // @ts-ignore - materials indexing
    const wallR = (wallThickness / 1000) / materials[wallMaterial].lambda;
    // @ts-ignore - materials indexing
    const insulationR = (insulationThickness / 1000) / materials[insulationMaterial].lambda;
    
    // Standard resistance values for interior and exterior surfaces
    const Rsi = 0.13; // Interior surface resistance (m²K/W)
    const Rse = 0.04; // Exterior surface resistance (m²K/W)
    
    // Calculate total thermal resistance
    const totalR = Rsi + wallR + insulationR + Rse;
    
    // Calculate U-value
    const uValue = 1 / totalR;
    
    // Determine energy class based on U-value
    let energyClass;
    if (uValue < 0.15) {
      energyClass = 'A';
    } else if (uValue < 0.25) {
      energyClass = 'B';
    } else if (uValue < 0.35) {
      energyClass = 'C';
    } else if (uValue < 0.45) {
      energyClass = 'D';
    } else if (uValue < 0.65) {
      energyClass = 'E';
    } else if (uValue < 0.80) {
      energyClass = 'F';
    } else {
      energyClass = 'G';
    }
    
    // Generate improvement suggestions
    const suggestions = [];
    
    if (uValue > 0.25) {
      if (insulationThickness < 100) {
        suggestions.push('Augmentez l\'épaisseur d\'isolation à au moins 100mm.');
      } else if (insulationThickness < 160) {
        suggestions.push('Considérez une isolation plus épaisse (160-200mm).');
      }
      
      if (insulationMaterial !== 'polyurethane') {
        suggestions.push('Envisagez d\'utiliser du polyuréthane pour une meilleure performance thermique.');
      }
    }
    
    if (suggestions.length === 0) {
      suggestions.push('Les performances thermiques sont satisfaisantes.');
    }
    
    setThermalResults({
      wallR,
      insulationR,
      totalR,
      uValue,
      energyClass,
      suggestions
    });
    
    toast({
      title: "Calcul effectué",
      description: "Les performances thermiques ont été calculées avec succès."
    });
  };
  
  const calculateHygrometry = () => {
    // Simplified dew point calculation
    // Magnus formula: Td = b * ln(RH/100 * exp((a*T)/(b+T))) / (a - ln(RH/100 * exp((a*T)/(b+T))))
    // Where a = 17.27, b = 237.7, T = temperature in °C, RH = relative humidity
    
    const a = 17.27;
    const b = 237.7;
    
    // Calculate saturation vapor pressure at both temperatures
    const calcDewPoint = (temp: number, rh: number) => {
      const term = Math.log(rh / 100) + (a * temp) / (b + temp);
      return (b * term) / (a - term);
    };
    
    const interiorDewPoint = calcDewPoint(interiorTemp, interiorHumidity);
    const exteriorDewPoint = calcDewPoint(exteriorTemp, exteriorHumidity);
    
    // Simplified temperature gradient through wall (linear approximation)
    // @ts-ignore - materials indexing
    const wallR = (wallThickness / 1000) / materials[wallMaterial].lambda;
    // @ts-ignore - materials indexing
    const insulationR = (insulationThickness / 1000) / materials[insulationMaterial].lambda;
    const Rsi = 0.13;
    const Rse = 0.04;
    const totalR = Rsi + wallR + insulationR + Rse;
    
    // Temperature at wall-insulation interface
    const wallInsulationInterfaceTemp = interiorTemp - ((interiorTemp - exteriorTemp) * (Rsi + wallR) / totalR);
    
    // Check if condensation risk exists
    const condensationRisk = wallInsulationInterfaceTemp < interiorDewPoint;
    
    // Generate recommendations
    const recommendations = [];
    
    if (condensationRisk) {
      recommendations.push('Risque de condensation à l\'interface mur-isolation.');
      recommendations.push('Installez un pare-vapeur du côté chaud de l\'isolation.');
      
      if (interiorHumidity > 50) {
        recommendations.push('Réduisez l\'humidité intérieure avec une ventilation adéquate.');
      }
      
      if (insulationThickness < 100) {
        recommendations.push('Augmentez l\'épaisseur d\'isolation pour améliorer la résistance thermique.');
      }
    } else {
      recommendations.push('Pas de risque de condensation dans les conditions spécifiées.');
    }
    
    setHygrometryResults({
      interiorDewPoint,
      exteriorDewPoint,
      wallInsulationInterfaceTemp,
      condensationRisk,
      recommendations
    });
    
    toast({
      title: "Calcul effectué",
      description: "L'analyse hygrométrique a été réalisée avec succès."
    });
  };
  
  const lookupDPE = () => {
    // In a real implementation, this would make an API call to fetch DPE data
    // For this demo, we'll use mock data
    
    if (!dpeReference || dpeReference.length < 4) {
      toast({
        title: "Référence invalide",
        description: "Veuillez entrer une référence DPE valide",
        variant: "destructive"
      });
      return;
    }
    
    // Mock DPE data
    const mockDPE = {
      reference: dpeReference,
      address: "123 Rue de l'Exemple, 75000 Paris",
      buildingType: "Appartement",
      constructionYear: 1985,
      surfaceArea: 75,
      energyClass: "D",
      ges: "E",
      energyConsumption: 230, // kWh/m²/year
      ghgEmissions: 35, // kg CO2e/m²/year
      validUntil: "31/12/2030",
      renovationOptions: [
        {
          title: "Option 1: Rénovation standard",
          actions: [
            "Isolation des murs extérieurs (R=4)",
            "Remplacement des fenêtres (Uw=1.3)",
            "Installation VMC simple flux"
          ],
          cost: 15000,
          savings: 30, // % energy savings
          newClass: "C"
        },
        {
          title: "Option 2: Rénovation performante",
          actions: [
            "Isolation des murs extérieurs (R=5)",
            "Isolation des combles (R=7)",
            "Remplacement des fenêtres (Uw=1.1)",
            "Installation VMC double flux"
          ],
          cost: 25000,
          savings: 50, // % energy savings
          newClass: "B"
        },
        {
          title: "Option 3: Rénovation globale BBC",
          actions: [
            "Isolation des murs extérieurs (R=5)",
            "Isolation des combles (R=10)",
            "Isolation plancher bas (R=3)",
            "Remplacement des fenêtres (Uw=0.8)",
            "Installation VMC double flux",
            "Remplacement du système de chauffage"
          ],
          cost: 40000,
          savings: 70, // % energy savings
          newClass: "A"
        }
      ],
      subsidies: [
        {
          name: "MaPrimeRénov'",
          amount: 7000,
          conditions: "Selon revenus et travaux réalisés"
        },
        {
          name: "Éco-prêt à taux zéro",
          amount: 15000,
          conditions: "Pour bouquet de travaux"
        },
        {
          name: "CEE (Certificats d'économie d'énergie)",
          amount: 3000,
          conditions: "Variable selon travaux"
        }
      ]
    };
    
    setDpeResults(mockDPE);
    
    toast({
      title: "DPE récupéré",
      description: "Les données du DPE ont été récupérées avec succès."
    });
  };
  
  const saveResults = () => {
    toast({
      title: "Résultats sauvegardés",
      description: "Votre analyse a été enregistrée dans votre espace personnel."
    });
  };
  
  const exportResults = () => {
    toast({
      title: "Export en cours",
      description: "Votre analyse est en cours d'export en PDF."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Thermometer className="h-5 w-5 mr-2 text-khaki-600" />
          Calculateur Eurocodes Thermique
        </CardTitle>
        <CardDescription>
          Analysez les performances thermiques, hygrométriques et DPE d'un bâtiment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="thermal">
              <Thermometer className="h-4 w-4 mr-2" />
              Thermique
            </TabsTrigger>
            <TabsTrigger value="hygrometry">
              <Droplets className="h-4 w-4 mr-2" />
              Hygrométrie
            </TabsTrigger>
            <TabsTrigger value="dpe">
              <Search className="h-4 w-4 mr-2" />
              Requête DPE
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="thermal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium">Paroi</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="wallMaterial">Matériau de la paroi</Label>
                  <Select value={wallMaterial} onValueChange={setWallMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brick">Brique</SelectItem>
                      <SelectItem value="concrete">Béton</SelectItem>
                      <SelectItem value="aac">Béton cellulaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="wallThickness">Épaisseur (mm)</Label>
                  <Input 
                    id="wallThickness" 
                    type="number" 
                    value={wallThickness}
                    onChange={(e) => setWallThickness(Number(e.target.value))}
                    min={1}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Isolation</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="insulationMaterial">Matériau isolant</Label>
                  <Select value={insulationMaterial} onValueChange={setInsulationMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un isolant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="glasswool">Laine de verre</SelectItem>
                      <SelectItem value="rockwool">Laine de roche</SelectItem>
                      <SelectItem value="eps">Polystyrène expansé (PSE)</SelectItem>
                      <SelectItem value="xps">Polystyrène extrudé (XPS)</SelectItem>
                      <SelectItem value="polyurethane">Polyuréthane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="insulationThickness">Épaisseur (mm)</Label>
                  <Input 
                    id="insulationThickness" 
                    type="number" 
                    value={insulationThickness}
                    onChange={(e) => setInsulationThickness(Number(e.target.value))}
                    min={1}
                  />
                </div>
              </div>
            </div>
            
            <Button 
              onClick={calculateThermalPerformance}
              className="w-full mt-4 bg-khaki-600 hover:bg-khaki-700"
            >
              Calculer la performance thermique
            </Button>
            
            {thermalResults && (
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-lg mb-3">Résultats de l'analyse thermique</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm text-gray-500">Coefficient U</div>
                    <div className="text-2xl font-bold text-khaki-700">{thermalResults.uValue.toFixed(2)} W/m²K</div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm text-gray-500">Résistance thermique</div>
                    <div className="text-2xl font-bold text-khaki-700">{thermalResults.totalR.toFixed(2)} m²K/W</div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm text-gray-500">Classe énergétique</div>
                    <div className="text-2xl font-bold text-khaki-700">{thermalResults.energyClass}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium">Recommandations :</h4>
                  <ul className="list-disc list-inside mt-1 text-sm">
                    {thermalResults.suggestions.map((suggestion: string, index: number) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={saveResults}>
                    <Save className="h-4 w-4 mr-1" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" size="sm" onClick={exportResults}>
                    <FileDown className="h-4 w-4 mr-1" />
                    Exporter
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="hygrometry" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium">Conditions intérieures</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="interiorTemp">Température (°C)</Label>
                  <Input 
                    id="interiorTemp" 
                    type="number" 
                    value={interiorTemp}
                    onChange={(e) => setInteriorTemp(Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interiorHumidity">Humidité relative (%)</Label>
                  <Input 
                    id="interiorHumidity" 
                    type="number" 
                    value={interiorHumidity}
                    onChange={(e) => setInteriorHumidity(Number(e.target.value))}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Conditions extérieures</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="exteriorTemp">Température (°C)</Label>
                  <Input 
                    id="exteriorTemp" 
                    type="number" 
                    value={exteriorTemp}
                    onChange={(e) => setExteriorTemp(Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="exteriorHumidity">Humidité relative (%)</Label>
                  <Input 
                    id="exteriorHumidity" 
                    type="number" 
                    value={exteriorHumidity}
                    onChange={(e) => setExteriorHumidity(Number(e.target.value))}
                    min={0}
                    max={100}
                  />
                </div>
              </div>
            </div>
            
            <Button 
              onClick={calculateHygrometry}
              className="w-full mt-4 bg-khaki-600 hover:bg-khaki-700"
            >
              Calculer le point de rosée
            </Button>
            
            {hygrometryResults && (
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="font-medium text-lg mb-3">Résultats de l'analyse hygrométrique</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm text-gray-500">Point de rosée intérieur</div>
                    <div className="text-2xl font-bold text-khaki-700">{hygrometryResults.interiorDewPoint.toFixed(1)} °C</div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm text-gray-500">Température à l'interface</div>
                    <div className="text-2xl font-bold text-khaki-700">{hygrometryResults.wallInsulationInterfaceTemp.toFixed(1)} °C</div>
                  </div>
                  
                  <div className="p-3 bg-white rounded-md border">
                    <div className="text-sm text-gray-500">Risque de condensation</div>
                    <div className={`text-2xl font-bold ${hygrometryResults.condensationRisk ? 'text-red-600' : 'text-green-600'}`}>
                      {hygrometryResults.condensationRisk ? 'Oui' : 'Non'}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium">Recommandations :</h4>
                  <ul className="list-disc list-inside mt-1 text-sm">
                    {hygrometryResults.recommendations.map((recommendation: string, index: number) => (
                      <li key={index}>{recommendation}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={saveResults}>
                    <Save className="h-4 w-4 mr-1" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" size="sm" onClick={exportResults}>
                    <FileDown className="h-4 w-4 mr-1" />
                    Exporter
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="dpe" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-grow">
                  <Label htmlFor="dpeReference">Référence du DPE</Label>
                  <Input 
                    id="dpeReference" 
                    placeholder="ex: 2022A123456" 
                    value={dpeReference}
                    onChange={(e) => setDpeReference(e.target.value)}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button onClick={lookupDPE} className="mb-0">
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </Button>
                </div>
              </div>
              
              {dpeResults && (
                <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                  <h3 className="font-medium text-lg mb-3">Données du DPE</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Référence</div>
                      <div className="font-medium">{dpeResults.reference}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Adresse</div>
                      <div className="font-medium">{dpeResults.address}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Type de bâtiment</div>
                      <div className="font-medium">{dpeResults.buildingType}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Année de construction</div>
                      <div className="font-medium">{dpeResults.constructionYear}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Surface</div>
                      <div className="font-medium">{dpeResults.surfaceArea} m²</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Validité</div>
                      <div className="font-medium">Jusqu'au {dpeResults.validUntil}</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mb-6">
                    <div className={`flex-1 p-3 rounded-md border text-center bg-white`}>
                      <div className="text-sm text-gray-500 mb-1">Classe énergie</div>
                      <div className="text-2xl font-bold" style={{color: 
                        dpeResults.energyClass === 'A' ? '#319834' :
                        dpeResults.energyClass === 'B' ? '#33cc31' :
                        dpeResults.energyClass === 'C' ? '#cbda2a' :
                        dpeResults.energyClass === 'D' ? '#ffda2a' :
                        dpeResults.energyClass === 'E' ? '#ffad1d' :
                        dpeResults.energyClass === 'F' ? '#ff6a0c' : '#ff0000'
                      }}>
                        {dpeResults.energyClass}
                      </div>
                      <div className="text-xs text-gray-500">{dpeResults.energyConsumption} kWh/m²/an</div>
                    </div>
                    
                    <div className={`flex-1 p-3 rounded-md border text-center bg-white`}>
                      <div className="text-sm text-gray-500 mb-1">Émissions GES</div>
                      <div className="text-2xl font-bold" style={{color: 
                        dpeResults.ges === 'A' ? '#319834' :
                        dpeResults.ges === 'B' ? '#33cc31' :
                        dpeResults.ges === 'C' ? '#cbda2a' :
                        dpeResults.ges === 'D' ? '#ffda2a' :
                        dpeResults.ges === 'E' ? '#ffad1d' :
                        dpeResults.ges === 'F' ? '#ff6a0c' : '#ff0000'
                      }}>
                        {dpeResults.ges}
                      </div>
                      <div className="text-xs text-gray-500">{dpeResults.ghgEmissions} kg CO₂e/m²/an</div>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-lg mb-3">Plans d'action de rénovation</h4>
                  
                  <div className="space-y-4 mb-6">
                    {dpeResults.renovationOptions.map((option: any, index: number) => (
                      <div key={index} className="bg-white p-3 rounded-md border">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{option.title}</h5>
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-gray-500">Nouvelle classe :</span>
                            <span className="font-bold" style={{color: 
                              option.newClass === 'A' ? '#319834' :
                              option.newClass === 'B' ? '#33cc31' :
                              option.newClass === 'C' ? '#cbda2a' : '#ffda2a'
                            }}>
                              {option.newClass}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-2 text-sm">
                          <div className="font-medium">Actions recommandées :</div>
                          <ul className="list-disc list-inside mt-1">
                            {option.actions.map((action: string, actionIndex: number) => (
                              <li key={actionIndex}>{action}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex justify-between mt-3 text-sm">
                          <div>
                            <span className="text-gray-500">Coût estimé :</span>
                            <span className="font-medium ml-1">{option.cost} €</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Économies :</span>
                            <span className="font-medium ml-1 text-green-600">{option.savings}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="font-medium text-lg mb-3">Aides financières disponibles</h4>
                  
                  <div className="space-y-3 mb-4">
                    {dpeResults.subsidies.map((subsidy: any, index: number) => (
                      <div key={index} className="bg-white p-3 rounded-md border">
                        <div className="flex justify-between items-center">
                          <h5 className="font-medium">{subsidy.name}</h5>
                          <div className="text-green-600 font-medium">
                            {typeof subsidy.amount === 'number' ? `${subsidy.amount} €` : subsidy.amount}
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {subsidy.conditions}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" onClick={saveResults}>
                      <Save className="h-4 w-4 mr-1" />
                      Sauvegarder
                    </Button>
                    <Button variant="outline" size="sm" onClick={exportResults}>
                      <FileDown className="h-4 w-4 mr-1" />
                      Exporter
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EurocodesCalculator;
