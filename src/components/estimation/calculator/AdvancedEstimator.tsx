
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Calculator, Download } from 'lucide-react';

const AdvancedEstimator: React.FC = () => {
  const [projectType, setProjectType] = useState<string>('construction');
  const [surface, setSurface] = useState<number>(120);
  const [quality, setQuality] = useState<number>(2); // 1-économique, 2-standard, 3-premium
  const [location, setLocation] = useState<string>('13');
  const [complexity, setComplexity] = useState<number>(50);
  const [hasBasement, setHasBasement] = useState<boolean>(false);
  const [hasPool, setHasPool] = useState<boolean>(false);
  const [hasTerrain, setHasTerrain] = useState<boolean>(true);
  const [terrainSurface, setTerrainSurface] = useState<number>(500);
  const [terrainPrice, setTerrainPrice] = useState<number>(200);
  const [result, setResult] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<any>(null);

  const calculateEstimation = () => {
    // Base de calcul selon le type de projet
    let basePrice = projectType === 'construction' ? 2000 : 1500;
    
    // Facteur de qualité
    const qualityFactor = quality === 1 ? 0.8 : quality === 3 ? 1.3 : 1;
    
    // Facteur de localisation
    const locationMap: {[key: string]: number} = {
      '13': 1.2, // Bouches-du-Rhône
      '83': 1.1, // Var
      '84': 1.0, // Vaucluse
      '06': 1.3, // Alpes-Maritimes
      '04': 0.9, // Alpes-de-Haute-Provence
      '05': 0.9  // Hautes-Alpes
    };
    const locationFactor = locationMap[location] || 1;
    
    // Facteur de complexité (de 0 à 100%)
    const complexityFactor = 1 + (complexity / 100) * 0.5;
    
    // Options supplémentaires
    const basementCost = hasBasement ? surface * 800 : 0;
    const poolCost = hasPool ? 25000 : 0;
    
    // Calcul du coût de construction
    const constructionCost = basePrice * surface * qualityFactor * locationFactor * complexityFactor;
    
    // Coût du terrain
    const terrainCost = hasTerrain ? terrainSurface * terrainPrice : 0;
    
    // Coût total
    const totalCost = constructionCost + basementCost + poolCost + terrainCost;
    
    setResult(Math.round(totalCost));
    setBreakdown({
      construction: Math.round(constructionCost),
      basement: Math.round(basementCost),
      pool: Math.round(poolCost),
      terrain: Math.round(terrainCost)
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Colonne gauche - Paramètres */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Paramètres avancés</h2>
              
              <div className="space-y-2">
                <Label htmlFor="project-type">Type de projet</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Type de projet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction neuve</SelectItem>
                    <SelectItem value="renovation">Rénovation</SelectItem>
                    <SelectItem value="extension">Extension</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="surface">Surface habitable (m²)</Label>
                <Input 
                  id="surface" 
                  type="number" 
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Niveau de qualité</Label>
                <Select value={quality.toString()} onValueChange={(val) => setQuality(Number(val))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Niveau de qualité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Économique</SelectItem>
                    <SelectItem value="2">Standard</SelectItem>
                    <SelectItem value="3">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Département</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Département" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="13">Bouches-du-Rhône (13)</SelectItem>
                    <SelectItem value="83">Var (83)</SelectItem>
                    <SelectItem value="84">Vaucluse (84)</SelectItem>
                    <SelectItem value="06">Alpes-Maritimes (06)</SelectItem>
                    <SelectItem value="04">Alpes-de-Haute-Provence (04)</SelectItem>
                    <SelectItem value="05">Hautes-Alpes (05)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="complexity">Complexité architecturale</Label>
                  <span className="text-sm text-gray-500">{complexity}%</span>
                </div>
                <Slider 
                  min={0} 
                  max={100} 
                  step={5} 
                  value={[complexity]} 
                  onValueChange={(val) => setComplexity(val[0])}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="font-medium">Options supplémentaires</h3>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="basement">Sous-sol complet</Label>
                <Switch 
                  id="basement" 
                  checked={hasBasement} 
                  onCheckedChange={setHasBasement}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="pool">Piscine</Label>
                <Switch 
                  id="pool" 
                  checked={hasPool} 
                  onCheckedChange={setHasPool}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="terrain">Inclure le terrain</Label>
                <Switch 
                  id="terrain" 
                  checked={hasTerrain} 
                  onCheckedChange={setHasTerrain}
                />
              </div>
              
              {hasTerrain && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="terrain-surface">Surface du terrain (m²)</Label>
                    <Input 
                      id="terrain-surface" 
                      type="number" 
                      value={terrainSurface}
                      onChange={(e) => setTerrainSurface(Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="terrain-price">Prix au m² (€)</Label>
                    <Input 
                      id="terrain-price" 
                      type="number" 
                      value={terrainPrice}
                      onChange={(e) => setTerrainPrice(Number(e.target.value))}
                    />
                  </div>
                </>
              )}
            </div>
            
            <Button 
              onClick={calculateEstimation} 
              className="w-full"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Calculer l'estimation avancée
            </Button>
          </div>
          
          {/* Colonne droite - Résultats */}
          <div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 h-full">
              <h3 className="text-xl font-semibold mb-4">Résultat de l'estimation</h3>
              
              {result === null ? (
                <div className="text-center py-12 text-gray-500">
                  <p>Complétez les paramètres et cliquez sur "Calculer" pour obtenir une estimation personnalisée.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center py-6 bg-white rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Coût total estimé</p>
                    <h4 className="text-4xl font-bold text-khaki-700">{result.toLocaleString()} €</h4>
                    <p className="text-sm text-gray-500 mt-2">Soit environ {Math.round(result / surface).toLocaleString()} € / m²</p>
                  </div>
                  
                  {breakdown && (
                    <div className="space-y-4">
                      <h4 className="font-medium">Répartition des coûts</h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Construction</span>
                          <span className="font-medium">{breakdown.construction.toLocaleString()} €</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-khaki-500 h-2 rounded-full" 
                            style={{ width: `${(breakdown.construction / result) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {breakdown.basement > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Sous-sol</span>
                            <span className="font-medium">{breakdown.basement.toLocaleString()} €</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(breakdown.basement / result) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {breakdown.pool > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Piscine</span>
                            <span className="font-medium">{breakdown.pool.toLocaleString()} €</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-cyan-500 h-2 rounded-full" 
                              style={{ width: `${(breakdown.pool / result) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      {breakdown.terrain > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Terrain</span>
                            <span className="font-medium">{breakdown.terrain.toLocaleString()} €</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(breakdown.terrain / result) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Télécharger le détail
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedEstimator;
