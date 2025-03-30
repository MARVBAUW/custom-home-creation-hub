
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, Download, RefreshCw } from 'lucide-react';
import { toast } from "sonner";

const BeamCalculator = () => {
  // État pour les inputs
  const [beamType, setBeamType] = useState('rectangle');
  const [beamWidth, setBeamWidth] = useState(30); // en cm
  const [beamHeight, setBeamHeight] = useState(60); // en cm
  const [beamLength, setBeamLength] = useState(5); // en m
  const [concreteClass, setConcreteClass] = useState('C25/30');
  const [steelClass, setSteelClass] = useState('S500');
  const [designMoment, setDesignMoment] = useState(150); // en kN.m
  
  // États pour les résultats
  const [results, setResults] = useState({
    d: 0, // hauteur utile (cm)
    mu: 0, // moment réduit
    z: 0, // bras de levier (cm)
    As: 0, // section d'acier nécessaire (cm²)
    asMin: 0, // section d'acier minimale (cm²)
    rebarConfig: '', // configuration des armatures
    utilizationRate: 0, // taux d'utilisation
  });
  
  // Caractéristiques des matériaux
  const concreteProperties = {
    'C20/25': { fck: 20, fcd: 13.33 }, // MPa
    'C25/30': { fck: 25, fcd: 16.67 },
    'C30/37': { fck: 30, fcd: 20.00 },
    'C35/45': { fck: 35, fcd: 23.33 },
    'C40/50': { fck: 40, fcd: 26.67 },
    'C45/55': { fck: 45, fcd: 30.00 },
    'C50/60': { fck: 50, fcd: 33.33 },
  };
  
  const steelProperties = {
    'S400': { fyk: 400, fyd: 348 }, // MPa
    'S500': { fyk: 500, fyd: 435 },
    'S600': { fyk: 600, fyd: 522 },
  };
  
  // Configurations standard des armatures
  const rebarDiameters = [6, 8, 10, 12, 14, 16, 20, 25, 32]; // mm
  
  // Méthode de calcul des armatures
  const calculateReinforcement = () => {
    try {
      // Récupération des propriétés des matériaux
      const concrete = concreteProperties[concreteClass as keyof typeof concreteProperties];
      const steel = steelProperties[steelClass as keyof typeof steelProperties];
      
      if (!concrete || !steel) {
        toast.error("Classe de matériau non reconnue");
        return;
      }
      
      // Conversion des unités
      const b = beamWidth / 100; // cm -> m
      const h = beamHeight / 100; // cm -> m
      const d = h - 0.04; // Hauteur utile (couverture 4 cm)
      const Med = designMoment; // kN.m
      
      // Calcul du moment réduit μ
      const mu = Med / (b * d * d * concrete.fcd * 1000);
      
      // Vérification si μ <= μR (0.372 pour béton armé)
      if (mu > 0.372) {
        toast.error("Moment trop important pour la section. Augmentez les dimensions ou ajoutez une compression.");
        return;
      }
      
      // Calcul du bras de levier z
      const z = d * (0.5 + Math.sqrt(0.25 - 0.33 * mu));
      
      // Calcul de la section d'acier nécessaire
      const As = (Med * 1000000) / (steel.fyd * z);
      
      // Section minimale selon EC2
      const asMin = Math.max(0.26 * (concrete.fck ** 0.5) / steel.fyk * b * d * 10000, 0.0013 * b * d * 10000);
      
      // Section d'acier finale (prendre le max entre calculé et minimum)
      const asFinal = Math.max(As, asMin);
      
      // Détermination de la configuration des armatures
      let rebarConfig = determineRebarConfiguration(asFinal);
      
      // Calcul du taux d'utilisation
      const utilizationRate = Math.min(mu / 0.372, 1);
      
      // Mise à jour des résultats
      setResults({
        d: d * 100, // Conversion en cm
        mu: mu,
        z: z * 100, // Conversion en cm
        As: asFinal,
        asMin: asMin,
        rebarConfig,
        utilizationRate,
      });
      
      toast.success("Calcul effectué avec succès");
    } catch (error) {
      toast.error("Erreur lors du calcul");
      console.error(error);
    }
  };
  
  // Fonction pour déterminer la configuration des armatures
  const determineRebarConfiguration = (asRequired: number) => {
    // Simplification : on va chercher la meilleure combinaison pour minimiser le nombre de barres
    let bestConfig = '';
    let bestCount = Infinity;
    
    // On essaie d'abord avec des barres de grand diamètre
    for (let i = rebarDiameters.length - 1; i >= 0; i--) {
      const diameter = rebarDiameters[i];
      const areaPerRebar = Math.PI * (diameter / 2) ** 2 / 100; // en cm²
      
      // Nombre de barres nécessaires
      const numRebars = Math.ceil(asRequired / areaPerRebar);
      
      // Vérification de l'espacement
      const availableWidth = beamWidth - 2 * 3; // Enlever 3 cm de chaque côté pour l'enrobage
      const minSpacing = Math.max(20, diameter); // Espacement minimum (mm)
      
      // Calcul de l'espacement entre les barres
      const spacing = (availableWidth - numRebars * diameter) / (numRebars - 1);
      
      if (spacing >= minSpacing / 10 || numRebars === 1) { // conversion mm -> cm
        if (numRebars < bestCount) {
          bestCount = numRebars;
          bestConfig = `${numRebars} HA${diameter}`;
        }
        
        // Si on a trouvé une config avec peu de barres, on s'arrête
        if (numRebars <= 3) break;
      }
    }
    
    return bestConfig || "Configuration non trouvée";
  };
  
  // Exporter les résultats en PDF
  const exportToPDF = () => {
    // Simulation d'export
    toast.success("Export PDF en cours de développement");
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-600" />
          Dimensionnement de poutre en béton armé EC2
        </CardTitle>
        <CardDescription>
          Calculez les armatures nécessaires pour une poutre en béton armé selon l'Eurocode 2
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
                  <Label htmlFor="beam-type">Type de poutre</Label>
                  <Select value={beamType} onValueChange={setBeamType}>
                    <SelectTrigger id="beam-type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rectangle">Rectangulaire</SelectItem>
                      <SelectItem value="t-beam" disabled>En T (bientôt disponible)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="beam-width">Largeur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="beam-width"
                      type="number"
                      value={beamWidth}
                      onChange={(e) => setBeamWidth(parseFloat(e.target.value))}
                      min="10"
                      max="100"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="beam-height">Hauteur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="beam-height"
                      type="number"
                      value={beamHeight}
                      onChange={(e) => setBeamHeight(parseFloat(e.target.value))}
                      min="20"
                      max="200"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="beam-length">Longueur (m)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="beam-length"
                      type="number"
                      value={beamLength}
                      onChange={(e) => setBeamLength(parseFloat(e.target.value))}
                      min="1"
                      max="20"
                    />
                    <div className="w-[60px] text-sm text-gray-500">m</div>
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
                  <Label htmlFor="design-moment">Moment de calcul ELU (kN.m)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="design-moment"
                      type="number"
                      value={designMoment}
                      onChange={(e) => setDesignMoment(parseFloat(e.target.value))}
                      min="0"
                    />
                    <div className="w-[60px] text-sm text-gray-500">kN.m</div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button onClick={calculateReinforcement} className="w-full">
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer les armatures
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
                    <CardTitle className="text-base">Propriétés de la section</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Section:</span>
                        <span className="font-medium">{beamWidth} × {beamHeight} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hauteur utile d:</span>
                        <span className="font-medium">{results.d.toFixed(1)} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Bras de levier z:</span>
                        <span className="font-medium">{results.z.toFixed(1)} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Moment réduit μ:</span>
                        <span className="font-medium">{results.mu.toFixed(3)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taux d'utilisation:</span>
                        <span className="font-medium">{(results.utilizationRate * 100).toFixed(1)}%</span>
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
                        <span className="text-gray-600">Section d'acier nécessaire:</span>
                        <span className="font-medium">{results.As.toFixed(2)} cm²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Section d'acier minimale:</span>
                        <span className="font-medium">{results.asMin.toFixed(2)} cm²</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Configuration proposée:</span>
                        <span className="font-medium">{results.rebarConfig}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-4">
                <div className="bg-gray-50 p-4 rounded-md border">
                  <h4 className="font-medium text-sm mb-2">Notes de calcul</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Calcul réalisé selon l'Eurocode 2</li>
                    <li>• Coefficient de sécurité γc = 1.5 pour le béton</li>
                    <li>• Coefficient de sécurité γs = 1.15 pour l'acier</li>
                    <li>• Enrobage considéré = 4 cm</li>
                    <li>• Calcul en flexion simple uniquement</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="help">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Aide au dimensionnement des poutres</h3>
              
              <div className="space-y-2">
                <h4 className="font-medium">Comment utiliser ce calculateur</h4>
                <p className="text-gray-600 text-sm">
                  Ce calculateur permet de dimensionner les armatures longitudinales en flexion simple d'une poutre en béton armé 
                  selon les principes de l'Eurocode 2. Suivez les étapes ci-dessous:
                </p>
                
                <ol className="text-sm space-y-1 text-gray-600 list-decimal pl-4">
                  <li>Saisissez les dimensions de votre poutre (largeur et hauteur)</li>
                  <li>Sélectionnez les classes de matériaux (béton et acier)</li>
                  <li>Entrez le moment de calcul à l'ELU (issu du calcul de structure)</li>
                  <li>Cliquez sur "Calculer les armatures"</li>
                  <li>Consultez les résultats dans l'onglet correspondant</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Hypothèses de calcul</h4>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                  <li>Le calcul est effectué en flexion simple uniquement</li>
                  <li>La section est supposée sous-armée (pas de compression)</li>
                  <li>L'enrobage considéré est de 4 cm</li>
                  <li>Les coefficients partiels de sécurité sont γc = 1.5 et γs = 1.15</li>
                  <li>La configuration d'armatures proposée tient compte des règles d'espacement</li>
                  <li>Le calcul à l'ELS (flèche, fissuration) n'est pas inclus dans cette version</li>
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

export default BeamCalculator;
