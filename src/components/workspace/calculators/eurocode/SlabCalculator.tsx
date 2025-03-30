
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Calculator, Download, RefreshCw } from 'lucide-react';
import { toast } from "sonner";

const SlabCalculator = () => {
  // État pour les inputs
  const [slabType, setSlabType] = useState('one-way');
  const [slabWidth, setSlabWidth] = useState(500); // en cm
  const [slabLength, setSlabLength] = useState(500); // en cm
  const [slabThickness, setSlabThickness] = useState(20); // en cm
  const [concreteClass, setConcreteClass] = useState('C25/30');
  const [steelClass, setSteelClass] = useState('S500');
  const [loadDead, setLoadDead] = useState(1.5); // en kN/m²
  const [loadLive, setLoadLive] = useState(2.5); // en kN/m²
  
  // États pour les résultats
  const [results, setResults] = useState({
    totalLoad: 0, // charge totale (kN/m²)
    designLoad: 0, // charge de calcul (kN/m²)
    momentX: 0, // moment en X (kN.m/m)
    momentY: 0, // moment en Y (kN.m/m)
    reinforcementX: 0, // armatures en X (cm²/m)
    reinforcementY: 0, // armatures en Y (cm²/m)
    primaryBarDiameter: 0, // diamètre des barres principales (mm)
    primaryBarSpacing: 0, // espacement des barres principales (cm)
    secondaryBarDiameter: 0, // diamètre des barres secondaires (mm)
    secondaryBarSpacing: 0, // espacement des barres secondaires (cm)
    deflection: 0, // flèche estimée (mm)
    deflectionRatio: 0, // ratio de flèche
    utilizationRate: 0 // taux d'utilisation
  });
  
  // Caractéristiques des matériaux
  const concreteProperties = {
    'C20/25': { fck: 20, fcd: 13.33, Ecm: 30000 }, // MPa
    'C25/30': { fck: 25, fcd: 16.67, Ecm: 31000 },
    'C30/37': { fck: 30, fcd: 20.00, Ecm: 33000 },
    'C35/45': { fck: 35, fcd: 23.33, Ecm: 34000 },
    'C40/50': { fck: 40, fcd: 26.67, Ecm: 35000 },
  };
  
  const steelProperties = {
    'S400': { fyk: 400, fyd: 348 }, // MPa
    'S500': { fyk: 500, fyd: 435 },
    'S600': { fyk: 600, fyd: 522 },
  };
  
  // Calcul de la dalle
  const calculateSlab = () => {
    try {
      // Récupération des propriétés des matériaux
      const concrete = concreteProperties[concreteClass as keyof typeof concreteProperties];
      const steel = steelProperties[steelClass as keyof typeof steelProperties];
      
      if (!concrete || !steel) {
        toast.error("Classe de matériau non reconnue");
        return;
      }
      
      // Conversion des unités
      const Lx = slabWidth / 100; // cm -> m
      const Ly = slabLength / 100; // cm -> m
      const h = slabThickness / 100; // cm -> m
      
      // Charge totale et charge de calcul (ELU)
      const gk = loadDead + 0.025 * slabThickness; // Poids propre (25 kN/m³)
      const qk = loadLive;
      const totalLoad = gk + qk; // kN/m²
      const designLoad = 1.35 * gk + 1.5 * qk; // kN/m²
      
      // Calcul des moments selon le type de dalle
      let momentX = 0;
      let momentY = 0;
      
      if (slabType === 'one-way') {
        // Dalles à charge unidirectionnelle - simplement appuyée
        const span = Math.min(Lx, Ly);
        momentX = designLoad * span * span / 8; // kN.m/m
        momentY = momentX / 5; // Approximation pour armatures de répartition
      } else if (slabType === 'two-way') {
        // Dalle bidirectionnelle simplement appuyée sur les 4 bords
        const ratio = Math.min(Lx, Ly) / Math.max(Lx, Ly);
        
        // Coefficients simplifiés pour dalles bidirectionnelles
        let coeffX = 0;
        let coeffY = 0;
        
        if (ratio >= 0.9) { // Dalle presque carrée
          coeffX = coeffY = 0.045;
        } else if (ratio >= 0.8) {
          coeffX = 0.05;
          coeffY = 0.04;
        } else if (ratio >= 0.7) {
          coeffX = 0.06;
          coeffY = 0.035;
        } else if (ratio >= 0.6) {
          coeffX = 0.07;
          coeffY = 0.03;
        } else {
          coeffX = 0.08;
          coeffY = 0.025;
        }
        
        if (Lx <= Ly) {
          momentX = coeffX * designLoad * Lx * Lx;
          momentY = coeffY * designLoad * Lx * Lx;
        } else {
          momentX = coeffY * designLoad * Ly * Ly;
          momentY = coeffX * designLoad * Ly * Ly;
        }
      }
      
      // Calcul des armatures
      const d = h - 0.03; // Hauteur utile (3 cm d'enrobage)
      const reinforcementX = momentX * 1000000 / (0.9 * d * steel.fyd); // mm²/m
      const reinforcementY = momentY * 1000000 / (0.9 * d * steel.fyd); // mm²/m
      
      // Détermination du diamètre et de l'espacement des barres
      let primaryBarDiameter = 8; // mm
      if (reinforcementX > 300) primaryBarDiameter = 10;
      if (reinforcementX > 500) primaryBarDiameter = 12;
      if (reinforcementX > 800) primaryBarDiameter = 16;
      
      let secondaryBarDiameter = 8; // mm
      if (reinforcementY > 300) secondaryBarDiameter = 10;
      if (reinforcementY > 500) secondaryBarDiameter = 12;
      
      // Calcul de l'espacement
      const areaPrimaryBar = Math.PI * primaryBarDiameter * primaryBarDiameter / 4; // mm²
      const areaSecondaryBar = Math.PI * secondaryBarDiameter * secondaryBarDiameter / 4; // mm²
      
      let primaryBarSpacing = Math.floor(areaPrimaryBar * 100 / reinforcementX); // cm
      let secondaryBarSpacing = Math.floor(areaSecondaryBar * 100 / reinforcementY); // cm
      
      // Limites d'espacement
      primaryBarSpacing = Math.min(Math.max(primaryBarSpacing, 10), 25); // 10 à 25 cm
      secondaryBarSpacing = Math.min(Math.max(secondaryBarSpacing, 10), 25); // 10 à 25 cm
      
      // Estimation de la flèche (très simplifiée)
      const span = slabType === 'one-way' ? Math.min(Lx, Ly) : Math.max(Lx, Ly);
      const I = 1/12 * 1 * Math.pow(h, 3); // Inertie (m⁴/m)
      const E = concrete.Ecm * 1000; // kN/m²
      
      // Flèche élastique approximative
      const serviceLoad = gk + qk; // Charge de service
      const deflectionFactor = slabType === 'one-way' ? 5/384 : 1/100; // Facteur dépendant des conditions d'appui
      const deflection = deflectionFactor * serviceLoad * Math.pow(span, 4) / (E * I) * 1000; // mm
      
      const deflectionRatio = span * 1000 / deflection;
      
      // Taux d'utilisation (approx.)
      const minThickness = span / 25; // Épaisseur minimale recommandée (m)
      const utilizationRate = Math.max(
        h < minThickness ? minThickness / h : 0.5,
        reinforcementX / 1500,
        deflection / (span * 1000 / 250)
      );
      
      // Mise à jour des résultats
      setResults({
        totalLoad,
        designLoad,
        momentX,
        momentY,
        reinforcementX: reinforcementX / 100, // mm²/m -> cm²/m
        reinforcementY: reinforcementY / 100, // mm²/m -> cm²/m
        primaryBarDiameter,
        primaryBarSpacing,
        secondaryBarDiameter,
        secondaryBarSpacing,
        deflection,
        deflectionRatio,
        utilizationRate: Math.min(utilizationRate, 1.5)
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
          Dimensionnement de dalles en béton armé EC2
        </CardTitle>
        <CardDescription>
          Calculez l'épaisseur et les armatures nécessaires pour une dalle en béton armé selon l'Eurocode 2
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
                  <Label htmlFor="slab-type">Type de dalle</Label>
                  <Select value={slabType} onValueChange={setSlabType}>
                    <SelectTrigger id="slab-type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-way">Dalle unidirectionnelle</SelectItem>
                      <SelectItem value="two-way">Dalle bidirectionnelle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="slab-width">Largeur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="slab-width"
                      type="number"
                      value={slabWidth}
                      onChange={(e) => setSlabWidth(parseFloat(e.target.value))}
                      min="100"
                      max="1000"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="slab-length">Longueur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="slab-length"
                      type="number"
                      value={slabLength}
                      onChange={(e) => setSlabLength(parseFloat(e.target.value))}
                      min="100"
                      max="1000"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="slab-thickness">Épaisseur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="slab-thickness"
                      type="number"
                      value={slabThickness}
                      onChange={(e) => setSlabThickness(parseFloat(e.target.value))}
                      min="10"
                      max="50"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="concrete-class">Classe de béton</Label>
                  <Select value={concreteClass} onValueChange={setConcreteClass}>
                    <SelectTrigger id="concrete-class">
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(concreteProperties).map((className) => (
                        <SelectItem key={className} value={className}>{className}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="steel-class">Classe d'acier</Label>
                  <Select value={steelClass} onValueChange={setSteelClass}>
                    <SelectTrigger id="steel-class">
                      <SelectValue placeholder="Sélectionner une classe" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(steelProperties).map((className) => (
                        <SelectItem key={className} value={className}>{className}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="load-dead">Charges permanentes (kN/m²)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="load-dead"
                      type="number"
                      value={loadDead}
                      onChange={(e) => setLoadDead(parseFloat(e.target.value))}
                      min="0"
                      step="0.1"
                    />
                    <div className="w-[60px] text-sm text-gray-500">kN/m²</div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Hors poids propre de la dalle
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="load-live">Charges d'exploitation (kN/m²)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="load-live"
                      type="number"
                      value={loadLive}
                      onChange={(e) => setLoadLive(parseFloat(e.target.value))}
                      min="0"
                      step="0.1"
                    />
                    <div className="w-[60px] text-sm text-gray-500">kN/m²</div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={calculateSlab} className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer la dalle
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
                    <CardTitle className="text-base">Analyse structurelle</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type de dalle:</span>
                        <span className="font-medium">
                          {slabType === 'one-way' ? 'Unidirectionnelle' : 'Bidirectionnelle'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Charge totale (ELS):</span>
                        <span className="font-medium">{results.totalLoad.toFixed(2)} kN/m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Charge de calcul (ELU):</span>
                        <span className="font-medium">{results.designLoad.toFixed(2)} kN/m²</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Moment en X:</span>
                        <span className="font-medium">{results.momentX.toFixed(2)} kN.m/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Moment en Y:</span>
                        <span className="font-medium">{results.momentY.toFixed(2)} kN.m/m</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Flèche estimée:</span>
                        <span className="font-medium">{results.deflection.toFixed(1)} mm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ratio flèche/portée:</span>
                        <span className={`font-medium ${results.deflectionRatio < 250 ? "text-amber-600" : "text-green-600"}`}>
                          1/{Math.round(results.deflectionRatio)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Armatures calculées</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Armatures en X:</span>
                        <span className="font-medium">{results.reinforcementX.toFixed(2)} cm²/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Armatures en Y:</span>
                        <span className="font-medium">{results.reinforcementY.toFixed(2)} cm²/m</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Barres principales:</span>
                        <span className="font-medium">
                          HA{results.primaryBarDiameter} @ {results.primaryBarSpacing} cm
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Barres secondaires:</span>
                        <span className="font-medium">
                          HA{results.secondaryBarDiameter} @ {results.secondaryBarSpacing} cm
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Taux d'utilisation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Progress value={results.utilizationRate * 100} max={100} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>{(results.utilizationRate * 100).toFixed(1)}%</span>
                      <span className={
                        results.utilizationRate < 0.7 
                          ? "text-green-600" 
                          : results.utilizationRate < 0.9 
                            ? "text-amber-600" 
                            : "text-red-600"
                      }>
                        {
                          results.utilizationRate < 0.7 
                            ? "Surdimensionné" 
                            : results.utilizationRate < 0.9 
                              ? "Optimisé" 
                              : "Proche des limites"
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4">
                <div className="bg-gray-50 p-4 rounded-md border">
                  <h4 className="font-medium text-sm mb-2">Notes de calcul</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Calcul réalisé selon l'Eurocode 2</li>
                    <li>• Hypothèse de dalle simplement appuyée sur tous les bords</li>
                    <li>• Coefficient de sécurité γc = 1.5 pour le béton</li>
                    <li>• Coefficient de sécurité γs = 1.15 pour l'acier</li>
                    <li>• Enrobage considéré = 3 cm</li>
                    <li>• Estimation simplifiée de la flèche</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="help">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Aide au dimensionnement des dalles</h3>
              
              <div className="space-y-2">
                <h4 className="font-medium">Comment utiliser ce calculateur</h4>
                <p className="text-gray-600 text-sm">
                  Ce calculateur permet de dimensionner les armatures d'une dalle en béton armé
                  soumise à des charges uniformément réparties, selon les principes de l'Eurocode 2.
                  Suivez les étapes ci-dessous:
                </p>
                
                <ol className="text-sm space-y-1 text-gray-600 list-decimal pl-4">
                  <li>Sélectionnez le type de dalle (unidirectionnelle ou bidirectionnelle)</li>
                  <li>Saisissez les dimensions de la dalle (largeur, longueur et épaisseur)</li>
                  <li>Sélectionnez les classes de matériaux (béton et acier)</li>
                  <li>Entrez les charges permanentes (hors poids propre) et d'exploitation</li>
                  <li>Cliquez sur "Calculer la dalle"</li>
                  <li>Consultez les résultats dans l'onglet correspondant</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Recommandations pour l'épaisseur des dalles</h4>
                <p className="text-gray-600 text-sm">
                  Pour éviter une vérification détaillée de la flèche, les épaisseurs minimales recommandées sont:
                </p>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                  <li>Dalles unidirectionnelles: L/25</li>
                  <li>Dalles bidirectionnelles: L/30</li>
                  <li>Où L est la portée la plus courte pour les dalles bidirectionnelles</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Limitations du calculateur</h4>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                  <li>Modèle simplifié pour dalles rectangulaires simplement appuyées</li>
                  <li>Ne prend pas en compte les conditions d'appui spécifiques (continuité, encastrement)</li>
                  <li>Ne traite pas les charges concentrées ou linéaires</li>
                  <li>L'estimation de la flèche est approximative</li>
                  <li>Ne traite pas les dalles sur poteaux (dalles champignons)</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                <h4 className="font-medium text-amber-800">Attention</h4>
                <p className="text-sm text-amber-700">
                  Ce calculateur est fourni à titre indicatif et ne remplace pas l'analyse d'un ingénieur structure.
                  Les résultats doivent être vérifiés par un professionnel qualifié avant toute mise en œuvre.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="justify-between border-t pt-4 text-xs text-gray-500">
        <div>
          Calculateur basé sur l'EC2 (EN 1992-1-1)
        </div>
        <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Réinitialiser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SlabCalculator;
