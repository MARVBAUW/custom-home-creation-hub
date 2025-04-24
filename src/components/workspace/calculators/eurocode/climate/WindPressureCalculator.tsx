
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const WindPressureCalculator = () => {
  const [buildingHeight, setBuildingHeight] = useState<number>(10);
  const [windRegion, setWindRegion] = useState("2");
  const [roughness, setRoughness] = useState("II");
  const [windPressure, setWindPressure] = useState<number | null>(null);

  const calculateWindPressure = () => {
    const vbMap: {[key: string]: number} = {
      "1": 22,
      "2": 24,
      "3": 26,
      "4": 28
    };
    const vb = vbMap[windRegion];
    
    const rho = 1.225;
    const qb = 0.5 * rho * Math.pow(vb, 2) / 1000;
    const co = 1.0;
    
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
    
    const vm = cr * co * vb;
    const Iv = 1 / (co * Math.log(Math.max(buildingHeight, 1) / z0));
    const qp = (1 + 7 * Iv) * 0.5 * rho * Math.pow(vm, 2) / 1000;
    
    setWindPressure(qp);
  };

  return (
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
  );
};

export default WindPressureCalculator;
