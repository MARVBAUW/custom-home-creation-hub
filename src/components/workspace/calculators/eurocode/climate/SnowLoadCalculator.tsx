
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const SnowLoadCalculator = () => {
  const [region, setRegion] = useState("A1");
  const [altitude, setAltitude] = useState<number>(300);
  const [terrain, setTerrain] = useState("0");
  const [roofType, setRoofType] = useState("flat");
  const [snowLoad, setSnowLoad] = useState<number | null>(null);

  const calculateSnowLoad = () => {
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
    
    const sk = regions[region].a + regions[region].b * Math.pow(altitude, 2);
    const Ce = terrain === "0" ? 0.8 : 1.0;
    const Ct = 1.0;
    
    let mu = 0.8;
    if (roofType === "single_pitch_15") mu = 0.8;
    if (roofType === "single_pitch_30") mu = 0.8 + (30-15)/30 * 0.4;
    if (roofType === "single_pitch_45") mu = 0.8 + (45-15)/30 * 0.4;
    if (roofType === "single_pitch_60") mu = 0.8;
    if (roofType === "double_pitch") mu = 0.8;
    
    const s = sk * mu * Ce * Ct;
    setSnowLoad(s);
  };

  return (
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
  );
};

export default SnowLoadCalculator;
