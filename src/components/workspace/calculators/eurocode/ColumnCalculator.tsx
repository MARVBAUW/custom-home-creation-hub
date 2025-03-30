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

const ColumnCalculator = () => {
  // État pour les inputs
  const [columnType, setColumnType] = useState('rectangle');
  const [columnWidth, setColumnWidth] = useState(30); // en cm
  const [columnLength, setColumnLength] = useState(30); // en cm
  const [columnHeight, setColumnHeight] = useState(300); // en cm
  const [concreteClass, setConcreteClass] = useState('C25/30');
  const [steelClass, setSteelClass] = useState('S500');
  const [designForce, setDesignForce] = useState(500); // en kN
  const [designMomentX, setDesignMomentX] = useState(20); // en kN.m
  const [designMomentY, setDesignMomentY] = useState(20); // en kN.m
  const [bucklingCoefficientX, setBucklingCoefficientX] = useState(1);
  const [bucklingCoefficientY, setBucklingCoefficientY] = useState(1);
  
  // États pour les résultats
  const [results, setResults] = useState({
    minReinforcement: 0, // section minimale (cm²)
    maxReinforcement: 0, // section maximale (cm²)
    requiredReinforcement: 0, // section calculée (cm²)
    reinforcementRatio: 0, // pourcentage d'armatures
    rebarConfiguration: '', // configuration des armatures
    slendernessRatio: 0, // élancement
    bucklingEffects: false, // effets du flambement
    utilizationRate: 0 // taux d'utilisation
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
  
  // Méthode simplifiée pour calcul des poteaux
  const calculateColumn = () => {
    try {
      // Récupération des propriétés des matériaux
      const concrete = concreteProperties[concreteClass as keyof typeof concreteProperties];
      const steel = steelProperties[steelClass as keyof typeof steelProperties];
      
      if (!concrete || !steel) {
        toast.error("Classe de matériau non reconnue");
        return;
      }
      
      // Conversion des unités
      const b = columnWidth / 100; // cm -> m
      const h = columnLength / 100; // cm -> m
      const L = columnHeight / 100; // cm -> m
      
      // Aire de la section
      const Ac = b * h;
      
      // Vérification de l'élancement
      const i_min = Math.min(b, h) / Math.sqrt(12);
      const slendernessRatio = L / i_min;
      const bucklingEffects = slendernessRatio > 25;
      
      // Section minimale et maximale selon EC2
      const minReinforcement = Math.max(0.10 * designForce / steel.fyd, 0.002 * Ac * 10000);
      const maxReinforcement = 0.04 * Ac * 10000; // 4% de la section de béton
      
      let requiredReinforcement = 0;
      
      // Méthode simplifiée pour la compression avec flexion
      if (designMomentX > 0 || designMomentY > 0) {
        // Calcul des excentricités
        const ex = designMomentX / designForce;
        const ey = designMomentY / designForce;
        
        // Prise en compte des effets du second ordre (simplifié)
        const e2x = bucklingEffects ? bucklingCoefficientX * L * L / 1000 : 0;
        const e2y = bucklingEffects ? bucklingCoefficientY * L * L / 1000 : 0;
        
        // Excentricités totales
        const etotx = Math.max(ex + e2x, b/10);
        const etoty = Math.max(ey + e2y, h/10);
        
        // Moment total incluant les effets du second ordre
        const MtotX = designForce * etotx;
        const MtotY = designForce * etoty;
        
        // Calcul simplifié de l'armature nécessaire (méthode approchée)
        const d = Math.min(b, h) - 0.05; // Profondeur utile approx.
        
        // Coefficient pour la compression avec flexion biaxiale (simplifié)
        const k = 1.5; // Valeur approchée
        
        // Estimation de l'armature nécessaire (très simplifié)
        requiredReinforcement = (MtotX / (0.9 * d * steel.fyd * 0.001) + 
                                MtotY / (0.9 * d * steel.fyd * 0.001) +
                                k * designForce / steel.fyd) * 10000;
      } else {
        // Compression simple - méthode simplifiée
        requiredReinforcement = 0.10 * designForce / steel.fyd * 10000;
      }
      
      // Limites min et max
      requiredReinforcement = Math.max(requiredReinforcement, minReinforcement);
      requiredReinforcement = Math.min(requiredReinforcement, maxReinforcement);
      
      // Calcul du pourcentage d'armatures
      const reinforcementRatio = requiredReinforcement / (Ac * 10000) * 100;
      
      // Détermination d'une configuration d'armatures
      const rebarConfiguration = determineRebarConfiguration(requiredReinforcement);
      
      // Calcul du taux d'utilisation (approx.)
      const capacityN = Ac * concrete.fcd * 1000 + requiredReinforcement * steel.fyd / 100;
      const utilizationRate = Math.min(designForce / capacityN, 1);
      
      // Mise à jour des résultats
      setResults({
        minReinforcement,
        maxReinforcement,
        requiredReinforcement,
        reinforcementRatio,
        rebarConfiguration,
        slendernessRatio,
        bucklingEffects,
        utilizationRate
      });
      
      toast.success("Calcul effectué avec succès");
    } catch (error) {
      toast.error("Erreur lors du calcul");
      console.error(error);
    }
  };
  
  // Fonction pour déterminer la configuration des armatures
  const determineRebarConfiguration = (asRequired: number) => {
    // Simplification
    const perimeterRebars = Math.max(4, Math.ceil(2 * (columnWidth + columnLength) / 20));
    
    let diameter = 12; // mm (valeur par défaut)
    if (asRequired > 15) diameter = 16;
    if (asRequired > 30) diameter = 20;
    if (asRequired > 50) diameter = 25;
    
    const areaPerRebar = Math.PI * (diameter / 2) ** 2 / 100; // en cm²
    const numRebars = Math.ceil(asRequired / areaPerRebar);
    
    return `${numRebars} HA${diameter} (${Math.max(perimeterRebars, numRebars)} répartis sur le périmètre)`;
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
          Dimensionnement de poteaux en béton armé EC2
        </CardTitle>
        <CardDescription>
          Calculez les armatures nécessaires pour un poteau en béton armé selon l'Eurocode 2
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
                  <Label htmlFor="column-type">Type de poteau</Label>
                  <Select value={columnType} onValueChange={setColumnType}>
                    <SelectTrigger id="column-type">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rectangle">Rectangulaire</SelectItem>
                      <SelectItem value="circle" disabled>Circulaire (bientôt disponible)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="column-width">Largeur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="column-width"
                      type="number"
                      value={columnWidth}
                      onChange={(e) => setColumnWidth(parseFloat(e.target.value))}
                      min="15"
                      max="100"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="column-length">Longueur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="column-length"
                      type="number"
                      value={columnLength}
                      onChange={(e) => setColumnLength(parseFloat(e.target.value))}
                      min="15"
                      max="100"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="column-height">Hauteur (cm)</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="column-height"
                      type="number"
                      value={columnHeight}
                      onChange={(e) => setColumnHeight(parseFloat(e.target.value))}
                      min="50"
                      max="1000"
                    />
                    <div className="w-[60px] text-sm text-gray-500">cm</div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="buckling-x">Coefficient de flambement X</Label>
                  <Select 
                    value={bucklingCoefficientX.toString()} 
                    onValueChange={(v) => setBucklingCoefficientX(parseFloat(v))}
                  >
                    <SelectTrigger id="buckling-x">
                      <SelectValue placeholder="Coefficient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.7">0.7 - Encastré/Articulé</SelectItem>
                      <SelectItem value="1">1.0 - Articulé/Articulé</SelectItem>
                      <SelectItem value="2">2.0 - Encastré/Libre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="buckling-y">Coefficient de flambement Y</Label>
                  <Select 
                    value={bucklingCoefficientY.toString()} 
                    onValueChange={(v) => setBucklingCoefficientY(parseFloat(v))}
                  >
                    <SelectTrigger id="buckling-y">
                      <SelectValue placeholder="Coefficient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.7">0.7 - Encastré/Articulé</SelectItem>
                      <SelectItem value="1">1.0 - Articulé/Articulé</SelectItem>
                      <SelectItem value="2">2.0 - Encastré/Libre</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Button onClick={calculateColumn} className="w-full">
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
                    <CardTitle className="text-base">Propriétés du poteau</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Section:</span>
                        <span className="font-medium">{columnWidth} × {columnLength} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hauteur:</span>
                        <span className="font-medium">{columnHeight} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Élancement:</span>
                        <span className="font-medium">{results.slendernessRatio.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Effets du flambement:</span>
                        <span className={`font-medium ${results.bucklingEffects ? "text-amber-600" : "text-green-600"}`}>
                          {results.bucklingEffects ? "À considérer" : "Négligeables"}
                        </span>
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
                        <span className="font-medium">{results.requiredReinforcement.toFixed(2)} cm²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Taux d'armatures:</span>
                        <span className="font-medium">{results.reinforcementRatio.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Section minimale:</span>
                        <span className="font-medium">{results.minReinforcement.toFixed(2)} cm²</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Section maximale:</span>
                        <span className="font-medium">{results.maxReinforcement.toFixed(2)} cm²</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Configuration proposée:</span>
                        <span className="font-medium">{results.rebarConfiguration}</span>
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
                    <li>• Méthode simplifiée pour la compression avec flexion</li>
                    <li>• Coefficient de sécurité γc = 1.5 pour le béton</li>
                    <li>• Coefficient de sécurité γs = 1.15 pour l'acier</li>
                    <li>• Enrobage considéré = 5 cm</li>
                    <li>• Les armatures transversales doivent être déterminées selon l'EC2</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="help">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Aide au dimensionnement des poteaux</h3>
              
              <div className="space-y-2">
                <h4 className="font-medium">Comment utiliser ce calculateur</h4>
                <p className="text-gray-600 text-sm">
                  Ce calculateur permet d'estimer les armatures longitudinales nécessaires pour un poteau en béton armé 
                  soumis à de la compression avec ou sans flexion, selon les principes de l'Eurocode 2. Suivez les étapes ci-dessous:
                </p>
                
                <ol className="text-sm space-y-1 text-gray-600 list-decimal pl-4">
                  <li>Saisissez les dimensions de votre poteau (largeur, longueur et hauteur)</li>
                  <li>Sélectionnez les coefficients de flambement selon les conditions d'appui</li>
                  <li>Sélectionnez les classes de matériaux (béton et acier)</li>
                  <li>Entrez l'effort normal et les moments de flexion à l'ELU</li>
                  <li>Cliquez sur "Calculer les armatures"</li>
                  <li>Consultez les résultats dans l'onglet correspondant</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Limitations du calculateur</h4>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                  <li>Ce calculateur utilise une méthode simplifiée pour l'estimation des armatures</li>
                  <li>Le calcul de flexion biaxiale est approximatif</li>
                  <li>Pour les poteaux très élancés (λ {'>'} 100), consultez un ingénieur structure</li>
                  <li>Les armatures transversales doivent être dimensionnées séparément</li>
                  <li>La vérification complète à l'ELS n'est pas incluse</li>
                </ul>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                <h4 className="font-medium text-amber-800">Attention</h4>
                <p className="text-sm text-amber-700">
                  Ce calculateur est fourni à titre indicatif et ne remplace pas l'analyse d'un ingénieur structure.
                  Les résultats doivent être vérifiés par un professionnel qualifié avant toute mise en œuvre.
                  Le dimensionnement des poteaux est particulièrement critique pour la stabilité structurelle.
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

export default ColumnCalculator;
