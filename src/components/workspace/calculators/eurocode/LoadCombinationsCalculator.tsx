
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const LoadCombinationsCalculator = () => {
  const [permanentLoad, setPermanentLoad] = useState<number>(25);
  const [variableLoad, setVariableLoad] = useState<number>(15);
  const [snowLoad, setSnowLoad] = useState<number>(0);
  const [windLoad, setWindLoad] = useState<number>(0);
  const [accidentalLoad, setAccidentalLoad] = useState<number>(0);
  const [situation, setSituation] = useState<string>("elu");
  const [includeSnow, setIncludeSnow] = useState<boolean>(false);
  const [includeWind, setIncludeWind] = useState<boolean>(false);
  const [includeAccidental, setIncludeAccidental] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);

  const calculateCombinations = () => {
    // Facteurs de sécurité selon Eurocode 0
    const gammaG = situation === "elu" ? 1.35 : 1.0;
    const gammaQ = situation === "elu" ? 1.5 : 1.0;
    const psi0Snow = 0.7; // Coefficient pour la neige
    const psi0Wind = 0.6; // Coefficient pour le vent
    
    let combinations = [];
    
    // Combinaison fondamentale (ELU) ou caractéristique (ELS)
    const basicCombination = {
      name: situation === "elu" ? "Combinaison fondamentale" : "Combinaison caractéristique",
      formula: `${gammaG}·G + ${gammaQ}·Q`,
      value: gammaG * permanentLoad + gammaQ * variableLoad
    };
    combinations.push(basicCombination);
    
    // Si neige incluse
    if (includeSnow && snowLoad > 0) {
      // Charge variable principale = Neige
      const snowMainCombination = {
        name: "Combinaison avec neige dominante",
        formula: `${gammaG}·G + ${gammaQ}·S + ${gammaQ*psi0Wind}·W`,
        value: gammaG * permanentLoad + gammaQ * snowLoad + (includeWind ? gammaQ * psi0Wind * windLoad : 0)
      };
      combinations.push(snowMainCombination);
    }
    
    // Si vent inclus
    if (includeWind && windLoad > 0) {
      // Charge variable principale = Vent
      const windMainCombination = {
        name: "Combinaison avec vent dominant",
        formula: `${gammaG}·G + ${gammaQ}·W + ${gammaQ*psi0Snow}·S`,
        value: gammaG * permanentLoad + gammaQ * windLoad + (includeSnow ? gammaQ * psi0Snow * snowLoad : 0)
      };
      combinations.push(windMainCombination);
    }
    
    // Combinaison accidentelle
    if (includeAccidental && accidentalLoad > 0) {
      const accidentalCombination = {
        name: "Combinaison accidentelle",
        formula: `G + A + ${psi0Snow}·S + ${psi0Wind}·W`,
        value: permanentLoad + accidentalLoad + 
              (includeSnow ? psi0Snow * snowLoad : 0) + 
              (includeWind ? psi0Wind * windLoad : 0)
      };
      combinations.push(accidentalCombination);
    }
    
    // Trouver la combinaison dimensionnante
    const designCombination = combinations.reduce((prev, current) => 
      (prev.value > current.value) ? prev : current
    );
    
    setResults({
      combinations,
      designCombination
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
        <h3 className="text-gray-800 font-medium mb-2">Combinaisons de charges (Eurocode 0)</h3>
        <p className="text-gray-600 text-sm">
          Calculez les combinaisons de charges selon l'Eurocode 0 (EN 1990) pour les états limites ultimes (ELU) et les états limites de service (ELS).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="situation">Situation de calcul</Label>
                <Select value={situation} onValueChange={setSituation}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="elu">État limite ultime (ELU)</SelectItem>
                    <SelectItem value="els">État limite de service (ELS)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="permanent-load">Charge permanente G (kN/m²)</Label>
                <Input 
                  id="permanent-load"
                  type="number"
                  value={permanentLoad}
                  onChange={(e) => setPermanentLoad(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="variable-load">Charge d'exploitation Q (kN/m²)</Label>
                <Input 
                  id="variable-load"
                  type="number"
                  value={variableLoad}
                  onChange={(e) => setVariableLoad(Number(e.target.value))}
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-snow"
                  checked={includeSnow}
                  onCheckedChange={(checked) => setIncludeSnow(!!checked)}
                />
                <Label htmlFor="include-snow">Inclure charge de neige</Label>
              </div>
              
              {includeSnow && (
                <div>
                  <Label htmlFor="snow-load">Charge de neige S (kN/m²)</Label>
                  <Input 
                    id="snow-load"
                    type="number"
                    value={snowLoad}
                    onChange={(e) => setSnowLoad(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-wind"
                  checked={includeWind}
                  onCheckedChange={(checked) => setIncludeWind(!!checked)}
                />
                <Label htmlFor="include-wind">Inclure charge de vent</Label>
              </div>
              
              {includeWind && (
                <div>
                  <Label htmlFor="wind-load">Charge de vent W (kN/m²)</Label>
                  <Input 
                    id="wind-load"
                    type="number"
                    value={windLoad}
                    onChange={(e) => setWindLoad(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="include-accidental"
                  checked={includeAccidental}
                  onCheckedChange={(checked) => setIncludeAccidental(!!checked)}
                />
                <Label htmlFor="include-accidental">Inclure charge accidentelle</Label>
              </div>
              
              {includeAccidental && (
                <div>
                  <Label htmlFor="accidental-load">Charge accidentelle A (kN/m²)</Label>
                  <Input 
                    id="accidental-load"
                    type="number"
                    value={accidentalLoad}
                    onChange={(e) => setAccidentalLoad(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
              )}
              
              <Button onClick={calculateCombinations} className="w-full mt-4">
                Calculer les combinaisons
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-medium mb-4">Résultats</h3>
            
            {!results ? (
              <div className="text-center py-12 text-gray-500">
                <p>Renseignez les charges et cliquez sur "Calculer" pour obtenir les résultats.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Combinaisons de charges</h4>
                  <div className="space-y-4">
                    {results.combinations.map((combination: any, index: number) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border ${
                          combination.name === results.designCombination.name 
                            ? 'bg-amber-50 border-amber-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <h5 className="font-medium">{combination.name}</h5>
                          <span className={`font-bold ${
                            combination.name === results.designCombination.name 
                              ? 'text-amber-700' 
                              : ''
                          }`}>{combination.value.toFixed(2)} kN/m²</span>
                        </div>
                        <p className="text-sm text-gray-500">Formule: {combination.formula}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-800">Combinaison dimensionnante</h4>
                  <div className="space-y-1">
                    <p className="font-bold text-blue-700">{results.designCombination.name}</p>
                    <p className="text-blue-600">{results.designCombination.formula}</p>
                    <p className="text-blue-800 font-semibold">Valeur: {results.designCombination.value.toFixed(2)} kN/m²</p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Calculs réalisés selon l'Eurocode 0 - EN 1990.</p>
                  <p>Les coefficients Psi utilisés: Psi0 neige = 0.7, Psi0 vent = 0.6.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoadCombinationsCalculator;
