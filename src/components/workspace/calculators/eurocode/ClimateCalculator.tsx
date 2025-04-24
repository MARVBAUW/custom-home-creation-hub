
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const ClimateCalculator = () => {
  const [activeTab, setActiveTab] = useState("snow");
  const [region, setRegion] = useState("A1");
  const [altitude, setAltitude] = useState<number>(300);
  const [terrain, setTerrain] = useState("0");
  const [roofType, setRoofType] = useState("flat");
  const [snowLoad, setSnowLoad] = useState<number | null>(null);
  const [buildingHeight, setBuildingHeight] = useState<number>(10);
  const [windRegion, setWindRegion] = useState("2");
  const [roughness, setRoughness] = useState("II");
  const [windPressure, setWindPressure] = useState<number | null>(null);
  
  const calculateSnowLoad = () => {
    // Charge caractéristique de neige au sol selon région et altitude
    const regions: {[key: string]: {a: number, b: number}} = {
      "A1": { a: 0.45, b: 0.0002 },
      "A2": { a: 0.45, b: 0.0003 },
      "B1": { a: 0.55, b: 0.0004 },
      "B2": { a: 0.55, b: 0.0005 },
      "C1": { a: 0.65, b: 0.0006 },
      "C2": { a: 0.65, b: 0.0007 },
      "D": { a: 0.9, b: 0.0008 },
      "E": { a: 1.4, b: 0.001 }
    };
    
    // Calcul de la charge de neige au sol
    const sk = regions[region].a + regions[region].b * Math.pow(altitude, 2);
    
    // Coefficient d'exposition Ce
    const Ce = terrain === "0" ? 0.8 : 1.0;
    
    // Coefficient thermique Ct
    const Ct = 1.0;
    
    // Coefficient de forme μ
    let mu = 0.8;
    if (roofType === "single_pitch_15") mu = 0.8;
    if (roofType === "single_pitch_30") mu = 0.8 + (30-15)/30 * 0.4;
    if (roofType === "single_pitch_45") mu = 0.8 + (45-15)/30 * 0.4;
    if (roofType === "single_pitch_60") mu = 0.8;
    if (roofType === "double_pitch") mu = 0.8;
    
    // Calcul final de la charge de neige
    const s = sk * mu * Ce * Ct;
    
    setSnowLoad(s);
  };
  
  const calculateWindPressure = () => {
    // Valeur de base de la vitesse du vent selon la région
    const vbMap: {[key: string]: number} = {
      "1": 22,
      "2": 24,
      "3": 26,
      "4": 28
    };
    const vb = vbMap[windRegion];
    
    // Masse volumique de l'air
    const rho = 1.225; // kg/m³
    
    // Pression dynamique de base
    const qb = 0.5 * rho * Math.pow(vb, 2) / 1000; // kN/m²
    
    // Coefficient d'orographie
    const co = 1.0;
    
    // Coefficient de rugosité
    const z0Map: {[key: string]: number} = {
      "0": 0.003,
      "I": 0.01,
      "II": 0.05,
      "III": 0.3,
      "IV": 1.0
    };
    const z0 = z0Map[roughness];
    const kr = 0.19 * Math.pow(z0/0.05, 0.07);
    const cr = kr * Math.log(Math.max(buildingHeight, 1) / z0);
    
    // Vitesse moyenne du vent
    const vm = cr * co * vb;
    
    // Intensité de turbulence
    const Iv = 1 / (co * Math.log(Math.max(buildingHeight, 1) / z0));
    
    // Pression dynamique de pointe
    const qp = [1 + 7 * Iv] * 0.5 * rho * Math.pow(vm, 2) / 1000;
    
    setWindPressure(qp);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h3 className="text-gray-800 font-medium mb-2">Calculateurs climatiques (Eurocode 1)</h3>
        <p className="text-gray-600 text-sm">
          Calculez les actions climatiques (neige et vent) selon les Eurocodes EN 1991-1-3 (neige) et EN 1991-1-4 (vent).
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="snow">Charge de neige (EN 1991-1-3)</TabsTrigger>
          <TabsTrigger value="wind">Charge de vent (EN 1991-1-4)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="snow" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="snow-region">Région de neige</Label>
                    <Select value={region} onValueChange={setRegion}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A1">Région A1</SelectItem>
                        <SelectItem value="A2">Région A2</SelectItem>
                        <SelectItem value="B1">Région B1</SelectItem>
                        <SelectItem value="B2">Région B2</SelectItem>
                        <SelectItem value="C1">Région C1</SelectItem>
                        <SelectItem value="C2">Région C2</SelectItem>
                        <SelectItem value="D">Région D</SelectItem>
                        <SelectItem value="E">Région E</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Selon la carte de l'Annexe Nationale française</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="altitude">Altitude du site (m)</Label>
                    <Input 
                      id="altitude"
                      type="number"
                      value={altitude}
                      onChange={(e) => setAltitude(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="terrain">Type de topographie</Label>
                    <Select value={terrain} onValueChange={setTerrain}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Exposé au vent</SelectItem>
                        <SelectItem value="1">Normal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="roof-type">Type de toiture</Label>
                    <Select value={roofType} onValueChange={setRoofType}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flat">Toiture plate (α ≤ 15°)</SelectItem>
                        <SelectItem value="single_pitch_15">Toiture à un versant (α = 15°)</SelectItem>
                        <SelectItem value="single_pitch_30">Toiture à un versant (α = 30°)</SelectItem>
                        <SelectItem value="single_pitch_45">Toiture à un versant (α = 45°)</SelectItem>
                        <SelectItem value="single_pitch_60">Toiture à un versant (α = 60°)</SelectItem>
                        <SelectItem value="double_pitch">Toiture à deux versants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={calculateSnowLoad} 
                    className="w-full mt-4"
                  >
                    Calculer la charge de neige
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4">Résultat</h3>
                
                {snowLoad === null ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>Renseignez les paramètres et cliquez sur "Calculer" pour obtenir la charge de neige.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                      <h4 className="text-lg text-blue-800 mb-2">Charge de neige sur la toiture</h4>
                      <div className="text-4xl font-bold text-blue-700">{snowLoad.toFixed(2)} kN/m²</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Région de neige</span>
                        <span className="font-medium">{region}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Altitude</span>
                        <span className="font-medium">{altitude} m</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Coefficient d'exposition Ce</span>
                        <span className="font-medium">{terrain === "0" ? "0.8" : "1.0"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Coefficient thermique Ct</span>
                        <span className="font-medium">1.0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Coefficient de forme μ</span>
                        <span className="font-medium">0.8</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <p>Calculs réalisés selon l'EN 1991-1-3 et l'Annexe Nationale française.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="wind" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="wind-region">Région de vent</Label>
                    <Select value={windRegion} onValueChange={setWindRegion}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Région 1</SelectItem>
                        <SelectItem value="2">Région 2</SelectItem>
                        <SelectItem value="3">Région 3</SelectItem>
                        <SelectItem value="4">Région 4</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Selon la carte de l'Annexe Nationale française</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="roughness">Catégorie de terrain</Label>
                    <Select value={roughness} onValueChange={setRoughness}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0 - Mer ou zone côtière exposée</SelectItem>
                        <SelectItem value="I">I - Lacs ou terrain plat sans obstacle</SelectItem>
                        <SelectItem value="II">II - Zone à végétation basse, obstacles isolés</SelectItem>
                        <SelectItem value="III">III - Zone rurale avec obstacles</SelectItem>
                        <SelectItem value="IV">IV - Zone urbaine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="building-height">Hauteur du bâtiment (m)</Label>
                    <Input 
                      id="building-height"
                      type="number"
                      value={buildingHeight}
                      onChange={(e) => setBuildingHeight(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateWindPressure} 
                    className="w-full mt-4"
                  >
                    Calculer la pression dynamique
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-medium mb-4">Résultat</h3>
                
                {windPressure === null ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>Renseignez les paramètres et cliquez sur "Calculer" pour obtenir la pression dynamique de pointe.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                      <h4 className="text-lg text-blue-800 mb-2">Pression dynamique de pointe</h4>
                      <div className="text-4xl font-bold text-blue-700">{windPressure.toFixed(3)} kN/m²</div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Région de vent</span>
                        <span className="font-medium">{windRegion}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Catégorie de terrain</span>
                        <span className="font-medium">{roughness}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Hauteur de référence</span>
                        <span className="font-medium">{buildingHeight} m</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium mb-2">Coefficients de pression recommandés</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Murs verticaux (face au vent)</span>
                          <span className="font-medium">+0.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Murs verticaux (face sous le vent)</span>
                          <span className="font-medium">-0.5</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Toiture plate (zone courante)</span>
                          <span className="font-medium">-0.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Toiture plate (zone de rive)</span>
                          <span className="font-medium">-1.2</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <p>Calculs réalisés selon l'EN 1991-1-4 et l'Annexe Nationale française.</p>
                      <p>La pression finale sur une surface est obtenue en multipliant la pression dynamique de pointe par le coefficient de pression adapté à la zone considérée.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClimateCalculator;
