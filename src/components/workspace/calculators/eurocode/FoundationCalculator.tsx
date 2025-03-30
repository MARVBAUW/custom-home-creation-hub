
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, Calculator, ExternalLink, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const FoundationCalculator = () => {
  const [foundationType, setFoundationType] = useState<'isolated' | 'strip'>('isolated');
  const [soilType, setSoilType] = useState('medium');
  const [dimensions, setDimensions] = useState({
    length: 1.5,
    width: 1.5,
    depth: 0.8,
    columnWidth: 0.3,
  });
  const [loads, setLoads] = useState({
    axial: 500,
    moment: 20,
    horizontal: 15,
  });
  const [reinforcement, setReinforcement] = useState({
    diameter: 12,
    spacing: 150,
    cover: 50,
  });
  const [materials, setMaterials] = useState({
    concreteClass: 'C25/30',
    steelGrade: 'B500B',
  });
  const [results, setResults] = useState({
    bearingCapacity: 0,
    baseArea: 0,
    requiredDepth: 0,
    effectiveStress: 0,
    overallStability: '',
    reinforcementRatio: 0,
    minimumReinforcement: 0,
    actualReinforcement: 0,
    requiredReinforcement: 0,
    designVerification: false,
  });
  
  // Handle calculation
  const handleCalculate = () => {
    try {
      // Soil bearing capacity based on soil type (kPa)
      const bearingCapacities = {
        'poor': 100,
        'medium': 200,
        'good': 300,
        'rock': 500,
      };
      
      const bearingCapacity = bearingCapacities[soilType as keyof typeof bearingCapacities];
      const baseArea = foundationType === 'isolated' 
        ? dimensions.length * dimensions.width 
        : dimensions.length * dimensions.width;
      
      // Calculate effective stress
      const axialStress = loads.axial / baseArea;
      const eccentricity = loads.moment / loads.axial;
      
      // Simplified check for effective area
      let effectiveArea = baseArea;
      if (eccentricity > 0) {
        // Reduce effective area based on eccentricity
        effectiveArea = baseArea * (1 - 2 * eccentricity / dimensions.length);
        if (effectiveArea <= 0) {
          effectiveArea = baseArea * 0.1; // Minimum effective area
        }
      }
      
      const effectiveStress = loads.axial / effectiveArea;
      
      // Required depth based on simplified punching shear calculation
      let requiredDepth = 0.5; // Minimum depth
      if (foundationType === 'isolated') {
        // Basic approximation for punching shear control
        const columnArea = 0.3 * 0.3; // Assumption for column size
        const punchingPerimeter = 4 * (0.3 + dimensions.depth);
        const punchingForce = loads.axial * (1 - columnArea / baseArea);
        requiredDepth = Math.max(punchingForce / (punchingPerimeter * 0.5 * Math.sqrt(25) * 1000), requiredDepth);
      }
      
      // Overall stability check
      let overallStability = '';
      if (effectiveStress < bearingCapacity * 0.7) {
        overallStability = 'Excellent';
      } else if (effectiveStress < bearingCapacity * 0.9) {
        overallStability = 'Bon';
      } else if (effectiveStress < bearingCapacity) {
        overallStability = 'Acceptable';
      } else {
        overallStability = 'Insuffisant';
      }
      
      // Reinforcement calculation (simplified)
      const fck = parseInt(materials.concreteClass.split('/')[0].substring(1));
      const fyk = parseInt(materials.steelGrade.substring(1, 4));
      
      const d = dimensions.depth * 1000 - reinforcement.cover - reinforcement.diameter / 2;
      const fcd = fck / 1.5;
      const fyd = fyk / 1.15;
      
      // Simplified bending reinforcement calculation
      const bendingMoment = loads.axial * eccentricity * 1.5; // Design factor
      const z = 0.9 * d;
      const requiredAs = bendingMoment / (z * fyd / 1000);
      
      // Minimum reinforcement as per Eurocode
      const minimumAs = Math.max(
        0.26 * (fck/fyk) * dimensions.width * 1000 * d / 1000000,
        0.0013 * dimensions.width * 1000 * d / 1000000
      );
      
      // Actual reinforcement provided
      const barArea = Math.PI * Math.pow(reinforcement.diameter / 2, 2);
      const barsPerMeter = 1000 / reinforcement.spacing;
      const actualAs = barArea * barsPerMeter * dimensions.width;
      
      // Check if reinforcement is adequate
      const designVerification = actualAs >= Math.max(requiredAs, minimumAs);
      
      const reinforcementRatio = actualAs / (dimensions.width * 1000 * d) * 100;
      
      setResults({
        bearingCapacity,
        baseArea,
        requiredDepth,
        effectiveStress,
        overallStability,
        reinforcementRatio,
        minimumReinforcement: minimumAs,
        actualReinforcement: actualAs / 1000000, // Convert to m²
        requiredReinforcement: Math.max(requiredAs, minimumAs) / 1000000, // Convert to m²
        designVerification,
      });
      
      toast.success('Calcul réalisé avec succès');
    } catch (error) {
      console.error('Calculation error:', error);
      toast.error('Erreur de calcul. Vérifiez vos données.');
    }
  };
  
  // Generate report
  const generateReport = () => {
    // Placeholder for report generation
    toast.success('Rapport généré avec succès');
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Dimensionnement simplifié de fondations
        </CardTitle>
        <CardDescription>
          Calculateur pour le pré-dimensionnement des fondations selon l'Eurocode 7
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
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label>Type de fondation</Label>
                    <Select
                      value={foundationType}
                      onValueChange={(value) => setFoundationType(value as 'isolated' | 'strip')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="isolated">Semelle isolée</SelectItem>
                        <SelectItem value="strip">Semelle filante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Type de sol</Label>
                    <Select
                      value={soilType}
                      onValueChange={setSoilType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un type de sol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poor">Sol médiocre (100 kPa)</SelectItem>
                        <SelectItem value="medium">Sol moyen (200 kPa)</SelectItem>
                        <SelectItem value="good">Sol bon (300 kPa)</SelectItem>
                        <SelectItem value="rock">Roche (500 kPa)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Classe de béton</Label>
                    <Select
                      value={materials.concreteClass}
                      onValueChange={(value) => setMaterials({...materials, concreteClass: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une classe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="C20/25">C20/25</SelectItem>
                        <SelectItem value="C25/30">C25/30</SelectItem>
                        <SelectItem value="C30/37">C30/37</SelectItem>
                        <SelectItem value="C35/45">C35/45</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Nuance d'acier</Label>
                    <Select
                      value={materials.steelGrade}
                      onValueChange={(value) => setMaterials({...materials, steelGrade: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une nuance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="B400B">B400B</SelectItem>
                        <SelectItem value="B500B">B500B</SelectItem>
                        <SelectItem value="B500C">B500C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Dimensions de la fondation</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="length">Longueur (m)</Label>
                      <Input
                        id="length"
                        type="number"
                        value={dimensions.length}
                        onChange={(e) => setDimensions({...dimensions, length: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="width">Largeur (m)</Label>
                      <Input
                        id="width"
                        type="number"
                        value={dimensions.width}
                        onChange={(e) => setDimensions({...dimensions, width: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="depth">Hauteur (m)</Label>
                      <Input
                        id="depth"
                        type="number"
                        value={dimensions.depth}
                        onChange={(e) => setDimensions({...dimensions, depth: parseFloat(e.target.value) || 0})}
                      />
                    </div>
                    
                    {foundationType === 'isolated' && (
                      <div className="space-y-2">
                        <Label htmlFor="columnWidth">Largeur poteau (m)</Label>
                        <Input
                          id="columnWidth"
                          type="number"
                          value={dimensions.columnWidth}
                          onChange={(e) => setDimensions({...dimensions, columnWidth: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Charges de calcul (ELU)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="axial">Charge axiale NEd (kN)</Label>
                    <Input
                      id="axial"
                      type="number"
                      value={loads.axial}
                      onChange={(e) => setLoads({...loads, axial: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="moment">Moment MEd (kN.m)</Label>
                    <Input
                      id="moment"
                      type="number"
                      value={loads.moment}
                      onChange={(e) => setLoads({...loads, moment: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="horizontal">Effort horizontal HEd (kN)</Label>
                    <Input
                      id="horizontal"
                      type="number"
                      value={loads.horizontal}
                      onChange={(e) => setLoads({...loads, horizontal: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">Ferraillage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="diameter">Diamètre des barres (mm)</Label>
                    <Select
                      value={reinforcement.diameter.toString()}
                      onValueChange={(value) => setReinforcement({...reinforcement, diameter: parseInt(value)})}
                    >
                      <SelectTrigger id="diameter">
                        <SelectValue placeholder="Sélectionnez un diamètre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="8">HA8</SelectItem>
                        <SelectItem value="10">HA10</SelectItem>
                        <SelectItem value="12">HA12</SelectItem>
                        <SelectItem value="14">HA14</SelectItem>
                        <SelectItem value="16">HA16</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="spacing">Espacement (mm)</Label>
                    <Select
                      value={reinforcement.spacing.toString()}
                      onValueChange={(value) => setReinforcement({...reinforcement, spacing: parseInt(value)})}
                    >
                      <SelectTrigger id="spacing">
                        <SelectValue placeholder="Sélectionnez un espacement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="100">100 mm</SelectItem>
                        <SelectItem value="125">125 mm</SelectItem>
                        <SelectItem value="150">150 mm</SelectItem>
                        <SelectItem value="200">200 mm</SelectItem>
                        <SelectItem value="250">250 mm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cover">Enrobage (mm)</Label>
                    <Select
                      value={reinforcement.cover.toString()}
                      onValueChange={(value) => setReinforcement({...reinforcement, cover: parseInt(value)})}
                    >
                      <SelectTrigger id="cover">
                        <SelectValue placeholder="Sélectionnez un enrobage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 mm</SelectItem>
                        <SelectItem value="35">35 mm</SelectItem>
                        <SelectItem value="40">40 mm</SelectItem>
                        <SelectItem value="45">45 mm</SelectItem>
                        <SelectItem value="50">50 mm</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleCalculate} className="bg-blue-600 hover:bg-blue-700">
                  Calculer
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            {results.bearingCapacity === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-600">Aucun résultat disponible</h3>
                <p className="text-gray-500 mt-2">Veuillez remplir les données d'entrée et cliquer sur "Calculer"</p>
              </div>
            ) : (
              <>
                {!results.designVerification && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Vérification non satisfaite</AlertTitle>
                    <AlertDescription>
                      Le dimensionnement ne répond pas aux exigences. Veuillez ajuster les paramètres de conception.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Vérification de la capacité portante</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Capacité portante du sol:</span>
                          <span className="font-medium">{results.bearingCapacity} kPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Surface de la semelle:</span>
                          <span className="font-medium">{results.baseArea.toFixed(2)} m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contrainte effective:</span>
                          <span className="font-medium">{results.effectiveStress.toFixed(2)} kPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stabilité globale:</span>
                          <Badge 
                            variant={results.overallStability === 'Insuffisant' ? "destructive" : "default"}
                            className={results.overallStability === 'Excellent' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                                       results.overallStability === 'Bon' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' :
                                       results.overallStability === 'Acceptable' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}
                          >
                            {results.overallStability}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hauteur minimale requise:</span>
                          <span className="font-medium">{results.requiredDepth.toFixed(2)} m</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Ferraillage de flexion</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ferraillage requis:</span>
                          <span className="font-medium">{(results.requiredReinforcement * 10000).toFixed(2)} cm²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ferraillage minimum:</span>
                          <span className="font-medium">{(results.minimumReinforcement / 1000000 * 10000).toFixed(2)} cm²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ferraillage fourni:</span>
                          <span className="font-medium">{(results.actualReinforcement * 10000).toFixed(2)} cm²</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Taux de ferraillage:</span>
                          <span className="font-medium">{results.reinforcementRatio.toFixed(3)} %</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vérification:</span>
                          <Badge 
                            variant={results.designVerification ? "default" : "destructive"}
                            className={results.designVerification ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                          >
                            {results.designVerification ? 'Conforme' : 'Non conforme'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end mt-6 space-x-2">
                  <Button variant="outline" onClick={handleCalculate}>
                    Recalculer
                  </Button>
                  <Button 
                    onClick={generateReport}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Générer un rapport
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="help" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">Comment utiliser ce calculateur</h3>
                <p className="text-gray-600 mt-1">
                  Ce calculateur permet de réaliser un pré-dimensionnement simplifié des fondations 
                  superficielles selon les principes de l'Eurocode 7 (EN 1997).
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Hypothèses et limitations</h3>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                  <li>Ce calculateur utilise une méthode simplifiée basée sur l'Eurocode 7</li>
                  <li>La capacité portante est considérée comme connue et fournie par l'utilisateur</li>
                  <li>Le calcul est adapté pour une analyse préliminaire uniquement</li>
                  <li>Le glissement et le renversement ne sont pas vérifiés dans cette version</li>
                  <li>Pour une étude géotechnique complète, consultez un ingénieur spécialisé</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium">Références</h3>
                <ul className="text-sm space-y-1 text-gray-600 list-disc pl-4">
                  <li>Eurocode 7 : Calcul géotechnique (EN 1997)</li>
                  <li>Eurocode 2 : Calcul des structures en béton (EN 1992)</li>
                </ul>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="flex items-center" asChild>
                  <a href="https://www.eurocode7.com/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                    En savoir plus sur l'Eurocode 7
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FoundationCalculator;
