
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calculator, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";

const FoundationCalculator = () => {
  // État pour les inputs
  const [foundationType, setFoundationType] = useState('isolated');
  const [foundationLength, setFoundationLength] = useState(200); // en cm
  const [foundationWidth, setFoundationWidth] = useState(200); // en cm
  const [foundationHeight, setFoundationHeight] = useState(50); // en cm
  const [columnWidth, setColumnWidth] = useState(30); // en cm
  const [columnLength, setColumnLength] = useState(30); // en cm
  const [concreteClass, setConcreteClass] = useState('C25/30');
  const [steelClass, setSteelClass] = useState('S500');
  const [soilType, setSoilType] = useState('gravel');
  const [designForce, setDesignForce] = useState(500); // en kN
  const [designMomentX, setDesignMomentX] = useState(30); // en kN.m
  const [designMomentY, setDesignMomentY] = useState(30); // en kN.m
  
  // États pour les résultats
  const [results, setResults] = useState({
    loadBearingCapacity: 0, // capacité portante (kPa)
    foundationArea: 0, // surface de la fondation (m²)
    averagePressure: 0, // pression moyenne (kPa)
    maximumPressure: 0, // pression maximale (kPa)
    eccentricityX: 0, // excentricité en X (m)
    eccentricityY: 0, // excentricité en Y (m)
    isStable: true, // stabilité de la fondation
    cantileverX: 0, // porte-à-faux en X (cm)
    cantileverY: 0, // porte-à-faux en Y (cm)
    reinforcementX: 0, // armatures dans la direction X (cm²/m)
    reinforcementY: 0, // armatures dans la direction Y (cm²/m)
    rebarDiameter: 0, // diamètre des barres (mm)
    rebarSpacing: 0, // espacement des barres (cm)
    punching: false, // vérification au poinçonnement
    utilizationRate: 0 // taux d'utilisation
  });
  
  // Caractéristiques des matériaux
  const concreteProperties = {
    'C20/25': { fck: 20, fcd: 13.33 }, // MPa
    'C25/30': { fck: 25, fcd: 16.67 },
    'C30/37': { fck: 30, fcd: 20.00 },
    'C35/45': { fck: 35, fcd: 23.33 },
    'C40/50': { fck: 40, fcd: 26.67 },
  };
  
  const steelProperties = {
    'S400': { fyk: 400, fyd: 348 }, // MPa
    'S500': { fyk: 500, fyd: 435 },
    'S600': { fyk: 600, fyd: 522 },
  };
  
  // Caractéristiques des sols
  const soilProperties = {
    'soft-clay': { name: 'Argile molle', capacity: 100 }, // kPa
    'stiff-clay': { name: 'Argile ferme', capacity: 200 },
    'sand': { name: 'Sable', capacity: 250 },
    'gravel': { name: 'Gravier compact', capacity: 400 },
    'rock': { name: 'Roche', capacity: 800 },
  };
  
  // Méthode pour calculer la fondation
  const calculateFoundation = () => {
    try {
      // Récupération des propriétés des matériaux
      const concrete = concreteProperties[concreteClass as keyof typeof concreteProperties];
      const steel = steelProperties[steelClass as keyof typeof steelProperties];
      const soil = soilProperties[soilType as keyof typeof soilProperties];
      
      if (!concrete || !steel || !soil) {
        toast.error("Propriétés des matériaux non reconnues");
        return;
      }
      
      // Conversion des unités
      const B = foundationWidth / 100; // cm -> m
      const L = foundationLength / 100; // cm -> m
      const h = foundationHeight / 100; // cm -> m
      const b = columnWidth / 100; // cm -> m
      const l = columnLength / 100; // cm -> m
      
      // Surface de la fondation
      const A = B * L; // m²
      
      // Calcul des excentricités
      const ex = designMomentX / designForce; // m
      const ey = designMomentY / designForce; // m
      
      // Vérification des excentricités (règle du tiers central)
      const isStable = ex < B/6 && ey < L/6;
      
      // Pression moyenne
      const averagePressure = designForce / A; // kN/m²
      
      // Pression maximale (formule simplifiée)
      const maximumPressure = designForce / A * (1 + 6 * ex / B + 6 * ey / L); // kN/m²
      
      // Porte-à-faux
      const cantileverX = (foundationWidth - columnWidth) / 2; // cm
      const cantileverY = (foundationLength - columnLength) / 2; // cm
      
      // Calcul des armatures (méthode simplifiée)
      // Moment fléchissant dans chaque direction
      const Mx = maximumPressure * cantileverX * cantileverX / 20000; // kN.m/m
      const My = maximumPressure * cantileverY * cantileverY / 20000; // kN.m/m
      
      // Hauteur utile
      const d = h - 0.05; // m (5 cm d'enrobage)
      
      // Calcul des armatures selon le modèle poutre
      const reinforcementX = Mx * 1000000 / (0.9 * d * steel.fyd); // mm²/m
      const reinforcementY = My * 1000000 / (0.9 * d * steel.fyd); // mm²/m
      
      // Choix du diamètre des barres et espacement
      let rebarDiameter = 10; // mm
      if (Math.max(reinforcementX, reinforcementY) > 400) rebarDiameter = 12;
      if (Math.max(reinforcementX, reinforcementY) > 600) rebarDiameter = 16;
      
      // Calcul de l'espacement (simplifié)
      const areaPerBar = Math.PI * rebarDiameter * rebarDiameter / 4; // mm²
      const spacingX = Math.min(Math.floor(areaPerBar * 100 / reinforcementX), 25); // cm
      const spacingY = Math.min(Math.floor(areaPerBar * 100 / reinforcementY), 25); // cm
      const rebarSpacing = Math.min(spacingX, spacingY);
      
      // Vérification au poinçonnement (très simplifiée)
      const punchingPerimeter = 2 * (b + l) + 2 * Math.PI * d; // m
      const punchingResistance = 0.6 * d * punchingPerimeter * concrete.fcd * 1000; // kN
      const punching = designForce > punchingResistance;
      
      // Calcul du taux d'utilisation
      const utilizationRate = Math.max(
        maximumPressure / soil.capacity,
        reinforcementX / (0.15 * foundationHeight * 10),
        reinforcementY / (0.15 * foundationHeight * 10)
      );
      
      // Mise à jour des résultats
      setResults({
        loadBearingCapacity: soil.capacity,
        foundationArea: A,
        averagePressure,
        maximumPressure,
        eccentricityX: ex,
        eccentricityY: ey,
        isStable,
        cantileverX,
        cantileverY,
        reinforcementX: reinforcementX / 100, // mm²/m -> cm²/m
        reinforcementY: reinforcementY / 100, // mm²/m -> cm²/m
        rebarDiameter,
        rebarSpacing,
        punching,
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
          Dimensionnement de fondations superficielles EC7
        </CardTitle>
        <CardDescription>
          Calculez les dimensions et armatures nécessaires pour une fondation superficielle selon l'Eurocode 7
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
                      <SelectItem value="strip" disabled>Semelle filante (bientôt disponible)</SelectItem>
                      <SelectItem value="raft" disabled>Radier (bientôt disponible)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="soil-type">Type de sol</Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger id="soil-type">
                      <SelectValue placeholder="Sélectionner un type de sol" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(soilProperties).map(([key, soil]) => (
                        <SelectItem key={key} value={key}>{soil.name} ({soil.capacity} kPa)</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="foundation-length">Longueur de la fondation (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="foundation-length"
                      type="number"
                      value={foundationLength}
                      onChange={(e) => setFoundationLength(parseFloat(e.target.value))}
                      min="50"
                      max="500"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="foundation-width">Largeur de la fondation (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="foundation-width"
                      type="number"
                      value={foundationWidth}
                      onChange={(e) => setFoundationWidth(parseFloat(e.target.value))}
                      min="50"
                      max="500"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="foundation-height">Hauteur de la fondation (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="foundation-height"
                      type="number"
                      value={foundationHeight}
                      onChange={(e) => setFoundationHeight(parseFloat(e.target.value))}
                      min="30"
                      max="150"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="column-length">Longueur du poteau (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="column-length"
                      type="number"
                      value={columnLength}
                      onChange={(e) => setColumnLength(parseFloat(e.target.value))}
                      min="20"
                      max="100"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="column-width">Largeur du poteau (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="column-width"
                      type="number"
                      value={columnWidth}
                      onChange={(e) => setColumnWidth(parseFloat(e.target.value))}
                      min="20"
                      max="100"
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
                  <Label htmlFor="design-force">Effort normal ELU (kN)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="design-force"
                      type="number"
                      value={designForce}
                      onChange={(e) => setDesignForce(parseFloat(e.target.value))}
                      min="0"
                    />
                    <div className="w-[60px] text-sm text-gray-500">kN</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="design-moment-x">Moment X ELU (kN.m)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="design-moment-x"
                      type="number"
                      value={designMomentX}
                      onChange={(e) => setDesignMomentX(parseFloat(e.target.value))}
                      min="0"
                    />
                    <div className="w-[60px] text-sm text-gray-500">kN.m</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="design-moment-y">Moment Y ELU (kN.m)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="design-moment-y"
                      type="number"
                      value={designMomentY}
                      onChange={(e) => setDesignMomentY(parseFloat(e.target.value))}
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
              <div className="flex justify-between items-center">
                <div>
                  {results.utilizationRate > 0.9 && (
                    <Alert variant="warning" className="bg-amber-50 text-amber-800 border-amber-200">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Attention</AlertTitle>
                      <AlertDescription>
                        Taux d'utilisation élevé ({(results.utilizationRate * 100).toFixed(1)}%). Vérifiez les dimensions.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <Button variant="outline" size="sm" onClick={exportToPDF}>
                  <Download className="mr-2 h-4 w-4" />
                  Exporter PDF
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Vérification géotechnique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Capacité portante du sol:</span>
                        <span className="font-medium">{results.loadBearingCapacity} kPa</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Surface de la fondation:</span>
                        <span className="font-medium">{results.foundationArea.toFixed(2)} m²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pression moyenne:</span>
                        <span className="font-medium">{results.averagePressure.toFixed(2)} kPa</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pression maximale:</span>
                        <span className={`font-medium ${results.maximumPressure > results.loadBearingCapacity ? "text-red-600" : "text-green-600"}`}>
                          {results.maximumPressure.toFixed(2)} kPa
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Excentricité en X:</span>
                        <span className="font-medium">{results.eccentricityX.toFixed(3)} m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Excentricité en Y:</span>
                        <span className="font-medium">{results.eccentricityY.toFixed(3)} m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stabilité:</span>
                        <span className={`font-medium ${results.isStable ? "text-green-600" : "text-red-600"}`}>
                          {results.isStable ? "Vérifiée" : "Non vérifiée"}
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
                        <span className="text-gray-600">Porte-à-faux en X:</span>
                        <span className="font-medium">{results.cantileverX.toFixed(1)} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Porte-à-faux en Y:</span>
                        <span className="font-medium">{results.cantileverY.toFixed(1)} cm</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Armatures en X:</span>
                        <span className="font-medium">{results.reinforcementX.toFixed(2)} cm²/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Armatures en Y:</span>
                        <span className="font-medium">{results.reinforcementY.toFixed(2)} cm²/m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Configuration recommandée:</span>
                        <span className="font-medium">
                          HA{results.rebarDiameter} @ {results.rebarSpacing} cm
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Poinçonnement:</span>
                        <span className={`font-medium ${results.punching ? "text-red-600" : "text-green-600"}`}>
                          {results.punching ? "Vérification nécessaire" : "OK"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4">
                <div className="bg-gray-50 p-4 rounded-md border">
                  <h4 className="font-medium text-sm mb-2">Notes de calcul</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Calcul réalisé selon l'Eurocode 7 (approche simplifiée)</li>
                    <li>• Armatures calculées selon l'Eurocode 2</li>
                    <li>• Méthode de la console pour le dimensionnement en flexion</li>
                    <li>• Enrobage considéré = 5 cm</li>
                    <li>• Vérification au poinçonnement simplifiée</li>
                    <li>• Les tassements ne sont pas calculés dans cette version</li>
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
                  Ce calculateur permet de dimensionner et vérifier une fondation superficielle (semelle isolée)
                  selon les principes des Eurocodes 2 et 7. Suivez les étapes ci-dessous:
                </p>
                
                <ol className="text-sm space-y-1 text-gray-600 list-decimal pl-4">
                  <li>Sélectionnez le type de sol correspondant à votre projet</li>
                  <li>Saisissez les dimensions de la fondation et du poteau</li>
                  <li>Sélectionnez les classes de matériaux (béton et acier)</li>
                  <li>Entrez les charges de calcul (effort normal et moments)</li>
                  <li>Cliquez sur "Calculer la fondation"</li>
                  <li>Consultez les résultats dans l'onglet correspondant</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Hypothèses et limitations</h4>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                  <li>Ce calculateur utilise une méthode simplifiée pour l'estimation des contraintes</li>
                  <li>Les valeurs de capacité portante sont génériques et doivent être ajustées selon le rapport géotechnique</li>
                  <li>Le calcul du ferraillage utilise la méthode de la console</li>
                  <li>La vérification au poinçonnement est simplifiée</li>
                  <li>Les tassements ne sont pas pris en compte</li>
                  <li>La semelle est supposée rigide</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                <h4 className="font-medium text-amber-800">Important</h4>
                <p className="text-sm text-amber-700">
                  Ce calculateur est fourni à titre indicatif et ne remplace pas l'analyse d'un ingénieur géotechnique.
                  Les résultats doivent être vérifiés par un professionnel qualifié avant toute mise en œuvre.
                  Le dimensionnement des fondations nécessite une étude de sol spécifique au site.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="justify-between border-t pt-4 text-xs text-gray-500">
        <div>
          Calculateur basé sur l'EC7 (EN 1997) et l'EC2 (EN 1992)
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
