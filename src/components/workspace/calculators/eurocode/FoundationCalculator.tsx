
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Calculator, Download, RefreshCw } from 'lucide-react';
import { toast } from "sonner";

const FoundationCalculator = () => {
  // État pour les inputs
  const [foundationType, setFoundationType] = useState('isolated');
  const [soilType, setSoilType] = useState('clay');
  const [foundationWidth, setFoundationWidth] = useState(100); // en cm
  const [foundationLength, setFoundationLength] = useState(100); // en cm
  const [foundationDepth, setFoundationDepth] = useState(80); // en cm
  const [loadVertical, setLoadVertical] = useState(200); // en kN
  const [loadHorizontal, setLoadHorizontal] = useState(10); // en kN
  const [momentLoad, setMomentLoad] = useState(15); // en kN.m
  
  // États pour les résultats
  const [results, setResults] = useState({
    bearingCapacity: 0, // capacité portante (kPa)
    ultimateLoad: 0, // charge limite (kN)
    safetyFactor: 0, // facteur de sécurité
    settlement: 0, // tassement (mm)
    eccentricity: 0, // excentricité (cm)
    effectiveArea: 0, // surface effective (m²)
    soilPressure: 0, // contrainte au sol (kPa)
    baseThickness: 0, // épaisseur de la fondation (cm)
    reinforcement: 0, // surface d'armatures (cm²/m)
    utilizationRate: 0 // taux d'utilisation
  });
  
  // Propriétés des sols
  const soilProperties = {
    'sand-loose': { name: 'Sable lâche', bearingCapacity: 100, elasticModulus: 10 },
    'sand-medium': { name: 'Sable moyennement dense', bearingCapacity: 200, elasticModulus: 20 },
    'sand-dense': { name: 'Sable dense', bearingCapacity: 300, elasticModulus: 50 },
    'gravel': { name: 'Gravier', bearingCapacity: 400, elasticModulus: 100 },
    'clay-soft': { name: 'Argile molle', bearingCapacity: 75, elasticModulus: 5 },
    'clay': { name: 'Argile moyenne', bearingCapacity: 150, elasticModulus: 15 },
    'clay-stiff': { name: 'Argile raide', bearingCapacity: 300, elasticModulus: 30 },
    'rock': { name: 'Roche', bearingCapacity: 1000, elasticModulus: 500 },
  };
  
  // Calcul de la fondation
  const calculateFoundation = () => {
    try {
      // Récupération des propriétés du sol
      const soil = soilProperties[soilType as keyof typeof soilProperties];
      
      if (!soil) {
        toast.error("Type de sol non reconnu");
        return;
      }
      
      // Conversion des unités
      const B = foundationWidth / 100; // cm -> m
      const L = foundationLength / 100; // cm -> m
      const D = foundationDepth / 100; // cm -> m
      
      // Calcul de la capacité portante (simplifié selon EC7)
      const bearingCapacity = soil.bearingCapacity * (1 + 0.2 * D / B); // kPa
      
      // Calcul de l'excentricité due au moment
      const e = momentLoad / loadVertical * 100; // excentricité en cm
      
      // Calcul de la surface effective
      const B_eff = Math.max(foundationWidth - 2 * e, 0.5 * foundationWidth); // cm
      const effectiveArea = (B_eff / 100) * (foundationLength / 100); // m²
      
      // Charge limite
      const ultimateLoad = bearingCapacity * effectiveArea; // kN
      
      // Facteur de sécurité
      const safetyFactor = ultimateLoad / loadVertical;
      
      // Calcul du tassement (méthode élastique simplifiée)
      const settlement = loadVertical / (soil.elasticModulus * Math.sqrt(effectiveArea)) * 1000; // mm
      
      // Calcul de la contrainte au sol
      const soilPressure = loadVertical / effectiveArea; // kPa
      
      // Dimensionnement de la fondation elle-même (simplifié)
      const baseThickness = Math.max(20, 0.15 * Math.max(foundationWidth, foundationLength)); // cm
      
      // Estimation des armatures (méthode simplifiée)
      const reinforcement = 0.15 * baseThickness; // cm²/m
      
      // Calcul du taux d'utilisation
      const utilizationRate = soilPressure / bearingCapacity;
      
      // Mise à jour des résultats
      setResults({
        bearingCapacity,
        ultimateLoad,
        safetyFactor,
        settlement,
        eccentricity: e,
        effectiveArea,
        soilPressure,
        baseThickness,
        reinforcement,
        utilizationRate
      });
      
      toast.success("Calcul effectué avec succès");
    } catch (error) {
      toast.error("Erreur lors du calcul");
      console.error(error);
    }
  };
  
  // Export PDF (simulé)
  const exportToPDF = () => {
    toast.success("Export PDF en cours de développement");
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-600" />
          Dimensionnement de fondations EC7
        </CardTitle>
        <CardDescription>
          Calculez les dimensions et vérifiez la stabilité des fondations selon l'Eurocode 7
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="input">
          <TabsList className="mb-4">
            <TabsTrigger value="input">Données d'entrée</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="foundation-type">Type de fondation</Label>
                  <Select value={foundationType} onValueChange={setFoundationType}>
                    <SelectTrigger id="foundation-type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="isolated">Semelle isolée</SelectItem>
                      <SelectItem value="continuous" disabled>Semelle filante (bientôt)</SelectItem>
                      <SelectItem value="raft" disabled>Radier (bientôt)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="soil-type">Type de sol</Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger id="soil-type">
                      <SelectValue placeholder="Sélectionner un sol" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(soilProperties).map(([key, prop]) => (
                        <SelectItem key={key} value={key}>{prop.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="foundation-width">Largeur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="foundation-width"
                      type="number"
                      value={foundationWidth}
                      onChange={(e) => setFoundationWidth(parseFloat(e.target.value))}
                      min="30"
                      max="500"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="foundation-length">Longueur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="foundation-length"
                      type="number"
                      value={foundationLength}
                      onChange={(e) => setFoundationLength(parseFloat(e.target.value))}
                      min="30"
                      max="500"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="foundation-depth">Profondeur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="foundation-depth"
                      type="number"
                      value={foundationDepth}
                      onChange={(e) => setFoundationDepth(parseFloat(e.target.value))}
                      min="30"
                      max="300"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="load-vertical">Charge verticale (kN)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="load-vertical"
                      type="number"
                      value={loadVertical}
                      onChange={(e) => setLoadVertical(parseFloat(e.target.value))}
                      min="0"
                    />
                    <div className="w-[60px] text-sm text-gray-500">kN</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="load-horizontal">Charge horizontale (kN)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="load-horizontal"
                      type="number"
                      value={loadHorizontal}
                      onChange={(e) => setLoadHorizontal(parseFloat(e.target.value))}
                      min="0"
                    />
                    <div className="w-[60px] text-sm text-gray-500">kN</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="moment-load">Moment (kN.m)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="moment-load"
                      type="number"
                      value={momentLoad}
                      onChange={(e) => setMomentLoad(parseFloat(e.target.value))}
                      min="0"
                    />
                    <div className="w-[60px] text-sm text-gray-500">kN.m</div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={calculateFoundation} className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer la fondation
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={exportToPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  Exporter PDF
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Capacité portante et stabilité</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacité portante du sol:</span>
                        <span className="font-medium">{results.bearingCapacity.toFixed(1)} kPa</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Charge limite:</span>
                        <span className="font-medium">{results.ultimateLoad.toFixed(1)} kN</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Facteur de sécurité:</span>
                        <span className={`font-medium ${results.safetyFactor < 1.5 ? "text-red-600" : "text-green-600"}`}>
                          {results.safetyFactor.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tassement estimé:</span>
                        <span className="font-medium">{results.settlement.toFixed(1)} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taux d'utilisation:</span>
                        <span className={`font-medium ${results.utilizationRate > 0.9 ? "text-red-600" : "text-green-600"}`}>
                          {(results.utilizationRate * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Dimensionnement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Excentricité:</span>
                        <span className="font-medium">{results.eccentricity.toFixed(1)} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Surface effective:</span>
                        <span className="font-medium">{results.effectiveArea.toFixed(2)} m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contrainte au sol:</span>
                        <span className="font-medium">{results.soilPressure.toFixed(1)} kPa</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Épaisseur recommandée:</span>
                        <span className="font-medium">{results.baseThickness.toFixed(0)} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Armatures principales:</span>
                        <span className="font-medium">{results.reinforcement.toFixed(1)} cm²/m</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4">
                <div className="bg-gray-50 p-4 rounded-md border">
                  <h4 className="font-medium text-sm mb-2">Notes de calcul</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Calcul réalisé selon l'Eurocode 7</li>
                    <li>• Approche de calcul simplifiée pour pré-dimensionnement</li>
                    <li>• Les résultats doivent être vérifiés par un ingénieur géotechnique</li>
                    <li>• Rapport géotechnique nécessaire pour dimensionnement final</li>
                    <li>• Le taux d'utilisation doit être inférieur à 100%</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="help">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Aide au dimensionnement des fondations</h3>
              
              <div className="space-y-2">
                <h4 className="font-medium">Comment utiliser ce calculateur</h4>
                <p className="text-gray-600 text-sm">
                  Ce calculateur permet d'effectuer un pré-dimensionnement rapide des fondations superficielles
                  selon les principes de l'Eurocode 7. Suivez les étapes ci-dessous:
                </p>
                
                <ol className="text-sm space-y-1 text-gray-600 list-decimal pl-4">
                  <li>Sélectionnez le type de fondation souhaité</li>
                  <li>Choisissez le type de sol à partir des options prédéfinies</li>
                  <li>Entrez les dimensions de la fondation (largeur, longueur, profondeur)</li>
                  <li>Spécifiez les charges appliquées (verticale, horizontale, moment)</li>
                  <li>Cliquez sur "Calculer la fondation"</li>
                  <li>Consultez les résultats dans l'onglet correspondant</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Interprétation des résultats</h4>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                  <li><span className="font-medium">Facteur de sécurité:</span> Doit être supérieur à 1.5 pour les charges de service</li>
                  <li><span className="font-medium">Tassement:</span> Généralement limité à 25mm pour les structures courantes</li>
                  <li><span className="font-medium">Excentricité:</span> Une valeur élevée peut nécessiter des dimensions plus grandes</li>
                  <li><span className="font-medium">Taux d'utilisation:</span> Doit rester inférieur à 100% (idéalement 90% max)</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                <h4 className="font-medium text-amber-800">Attention</h4>
                <p className="text-sm text-amber-700">
                  Ce calculateur est fourni à titre indicatif pour un pré-dimensionnement rapide. Les résultats
                  doivent être vérifiés par un ingénieur géotechnique qualifié sur la base d'un rapport de sol.
                  Les propriétés des sols sont génériques et ne remplacent pas des données géotechniques réelles.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="justify-between border-t pt-4 text-xs text-gray-500">
        <div>
          Calculateur basé sur l'EC7 (EN 1997)
        </div>
        <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Réinitialiser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoundationCalculator;
