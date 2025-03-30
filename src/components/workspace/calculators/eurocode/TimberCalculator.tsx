
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Download, RefreshCw, AlertTriangle, Info } from 'lucide-react';
import { toast } from "sonner";

const TimberCalculator = () => {
  // States for inputs
  const [timberClass, setTimberClass] = useState('C24');
  const [serviceClass, setServiceClass] = useState('1');
  const [loadDuration, setLoadDuration] = useState('medium');
  const [sectionType, setSectionType] = useState('rectangular');
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(200);
  const [length, setLength] = useState(4);
  const [calculationType, setCalculationType] = useState('bending');
  const [load, setLoad] = useState(10);
  
  // States for results
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  
  // Timber strength classes
  const timberStrengthClasses: {[key: string]: {
    fm: number, ft0: number, fc0: number, fv: number, E0: number, density: number
  }} = {
    'C16': { fm: 16, ft0: 10, fc0: 17, fv: 3.2, E0: 8000, density: 310 },
    'C18': { fm: 18, ft0: 11, fc0: 18, fv: 3.4, E0: 9000, density: 320 },
    'C24': { fm: 24, ft0: 14, fc0: 21, fv: 4.0, E0: 11000, density: 350 },
    'C30': { fm: 30, ft0: 18, fc0: 23, fv: 4.0, E0: 12000, density: 380 },
    'D30': { fm: 30, ft0: 18, fc0: 23, fv: 3.0, E0: 10000, density: 530 },
    'D40': { fm: 40, ft0: 24, fc0: 26, fv: 3.8, E0: 11000, density: 590 },
    'GL24h': { fm: 24, ft0: 16.5, fc0: 24, fv: 3.5, E0: 11500, density: 420 },
    'GL28h': { fm: 28, ft0: 19.5, fc0: 26.5, fv: 3.5, E0: 12500, density: 460 },
    'GL32h': { fm: 32, ft0: 22.5, fc0: 29, fv: 3.5, E0: 13500, density: 480 }
  };
  
  // Modification factors for service class and load duration
  const kmodValues: {[key: string]: {[key: string]: number}} = {
    '1': {
      'permanent': 0.6,
      'long': 0.7,
      'medium': 0.8,
      'short': 0.9,
      'instantaneous': 1.1
    },
    '2': {
      'permanent': 0.6,
      'long': 0.7,
      'medium': 0.8,
      'short': 0.9,
      'instantaneous': 1.1
    },
    '3': {
      'permanent': 0.5,
      'long': 0.55,
      'medium': 0.65,
      'short': 0.7,
      'instantaneous': 0.9
    }
  };
  
  // Calculate section properties
  const calculateSectionProperties = () => {
    const b = width / 1000; // convert to meters
    const h = height / 1000; // convert to meters
    
    // Area
    const A = b * h;
    
    // Moment of inertia (second moment of area)
    const I = (b * h**3) / 12;
    
    // Section modulus
    const W = (b * h**2) / 6;
    
    // Radius of gyration
    const i = Math.sqrt(I / A);
    
    return { A, I, W, i };
  };
  
  // Calculate results
  const calculateResults = () => {
    try {
      const timber = timberStrengthClasses[timberClass];
      const kmod = kmodValues[serviceClass][loadDuration];
      const gammaM = 1.3; // Material safety factor for solid timber
      
      if (!timber || !kmod) {
        toast.error("Données insuffisantes pour le calcul");
        return;
      }
      
      const { A, I, W, i } = calculateSectionProperties();
      const L = length; // in meters
      
      let designStrength = 0;
      let appliedStress = 0;
      let utilizationRatio = 0;
      let result = {
        timber: timberClass,
        serviceClass: serviceClass,
        loadDuration: loadDuration,
        dimensions: `${width}×${height} mm`,
        length: length,
        kmod: kmod,
        resistanceType: '',
        designStrength: 0,
        appliedStress: 0,
        utilizationRatio: 0,
        status: ''
      };
      
      switch (calculationType) {
        case 'bending':
          // Design bending strength
          designStrength = (kmod * timber.fm) / gammaM;
          
          // Applied bending moment (simplified, assuming uniformly distributed load)
          const momentValue = (load * L**2) / 8; // kNm
          
          // Bending stress
          appliedStress = (momentValue * 1000000) / (W * 1000000000); // MPa
          
          utilizationRatio = appliedStress / designStrength;
          
          result = {
            ...result,
            resistanceType: 'Résistance en flexion',
            designStrength: designStrength,
            appliedStress: appliedStress,
            utilizationRatio: utilizationRatio,
            status: utilizationRatio <= 1.0 ? 'VÉRIFIÉ' : 'NON VÉRIFIÉ'
          };
          break;
          
        case 'compression':
          // Design compression strength
          designStrength = (kmod * timber.fc0) / gammaM;
          
          // Applied compression force
          appliedStress = load / (A * 1000000); // MPa
          
          // Simplified slenderness check
          const slenderness = L / i;
          let kc = 1.0;
          
          // Very simplified buckling factor for demonstration
          if (slenderness > 0.3) {
            kc = 1.0 / (1.0 + 0.05 * slenderness);
          }
          
          const effectiveDesignStrength = kc * designStrength;
          utilizationRatio = appliedStress / effectiveDesignStrength;
          
          result = {
            ...result,
            resistanceType: 'Résistance en compression',
            designStrength: effectiveDesignStrength,
            appliedStress: appliedStress,
            utilizationRatio: utilizationRatio,
            status: utilizationRatio <= 1.0 ? 'VÉRIFIÉ' : 'NON VÉRIFIÉ'
          };
          break;
          
        case 'tension':
          // Design tension strength
          designStrength = (kmod * timber.ft0) / gammaM;
          
          // Applied tension force
          appliedStress = load / (A * 1000000); // MPa
          
          utilizationRatio = appliedStress / designStrength;
          
          result = {
            ...result,
            resistanceType: 'Résistance en traction',
            designStrength: designStrength,
            appliedStress: appliedStress,
            utilizationRatio: utilizationRatio,
            status: utilizationRatio <= 1.0 ? 'VÉRIFIÉ' : 'NON VÉRIFIÉ'
          };
          break;
          
        case 'shear':
          // Design shear strength
          designStrength = (kmod * timber.fv) / gammaM;
          
          // Applied shear (simplified, assuming uniformly distributed load)
          const shearForce = (load * L) / 2; // kN
          
          // Shear stress (assuming rectangular section)
          appliedStress = 1.5 * shearForce / (A * 1000); // MPa
          
          utilizationRatio = appliedStress / designStrength;
          
          result = {
            ...result,
            resistanceType: 'Résistance au cisaillement',
            designStrength: designStrength,
            appliedStress: appliedStress,
            utilizationRatio: utilizationRatio,
            status: utilizationRatio <= 1.0 ? 'VÉRIFIÉ' : 'NON VÉRIFIÉ'
          };
          break;
      }
      
      setResults(result);
      setShowResults(true);
      toast.success("Calcul effectué avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du calcul");
    }
  };
  
  // Calculate deflection (simplified)
  const calculateDeflection = () => {
    if (!results) return null;
    
    const timber = timberStrengthClasses[timberClass];
    const { I } = calculateSectionProperties();
    const L = length * 1000; // mm
    
    // Simplified deflection for uniformly distributed load
    const deflection = (5 * load * L**4) / (384 * timber.E0 * I * 1000000);
    const limitL300 = L / 300;
    
    return {
      deflection: deflection,
      limit: limitL300,
      ratio: deflection / limitL300,
      status: deflection <= limitL300 ? 'VÉRIFIÉ' : 'NON VÉRIFIÉ'
    };
  };
  
  // Export results to PDF (simulated)
  const exportToPDF = () => {
    toast.success("Export PDF en cours de développement");
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-amber-600" />
          Calcul des structures en bois (EC5)
        </CardTitle>
        <CardDescription>
          Dimensionnez et vérifiez les éléments structurels en bois selon l'Eurocode 5
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="section" className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="section">Vérification d'élément</TabsTrigger>
            <TabsTrigger value="connection">Assemblages (à venir)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="section" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timber-class">Classe de résistance</Label>
                <Select value={timberClass} onValueChange={setTimberClass}>
                  <SelectTrigger id="timber-class">
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C16">C16 - Résineux</SelectItem>
                    <SelectItem value="C18">C18 - Résineux</SelectItem>
                    <SelectItem value="C24">C24 - Résineux</SelectItem>
                    <SelectItem value="C30">C30 - Résineux</SelectItem>
                    <SelectItem value="D30">D30 - Feuillus</SelectItem>
                    <SelectItem value="D40">D40 - Feuillus</SelectItem>
                    <SelectItem value="GL24h">GL24h - Lamellé-collé</SelectItem>
                    <SelectItem value="GL28h">GL28h - Lamellé-collé</SelectItem>
                    <SelectItem value="GL32h">GL32h - Lamellé-collé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="service-class">Classe de service</Label>
                <Select value={serviceClass} onValueChange={setServiceClass}>
                  <SelectTrigger id="service-class">
                    <SelectValue placeholder="Sélectionner une classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Classe 1 - Intérieur chauffé</SelectItem>
                    <SelectItem value="2">Classe 2 - Abrité humide</SelectItem>
                    <SelectItem value="3">Classe 3 - Extérieur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="load-duration">Durée de charge</Label>
                <Select value={loadDuration} onValueChange={setLoadDuration}>
                  <SelectTrigger id="load-duration">
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">Permanente (>10 ans)</SelectItem>
                    <SelectItem value="long">Longue durée (6 mois-10 ans)</SelectItem>
                    <SelectItem value="medium">Moyenne durée (1 semaine-6 mois)</SelectItem>
                    <SelectItem value="short">Courte durée (&lt;1 semaine)</SelectItem>
                    <SelectItem value="instantaneous">Instantanée</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="section-type">Type de section</Label>
                <Select value={sectionType} onValueChange={setSectionType}>
                  <SelectTrigger id="section-type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rectangular">Rectangulaire</SelectItem>
                    <SelectItem value="circular">Circulaire (à venir)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="width">Largeur b (mm)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                  min="20"
                  step="5"
                />
              </div>
              
              <div>
                <Label htmlFor="height">Hauteur h (mm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  min="40"
                  step="5"
                />
              </div>
              
              <div>
                <Label htmlFor="length">Longueur (m)</Label>
                <Input
                  id="length"
                  type="number"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                  min="0.1"
                  step="0.1"
                />
              </div>
              
              <div>
                <Label htmlFor="calculation-type">Type de calcul</Label>
                <Select value={calculationType} onValueChange={setCalculationType}>
                  <SelectTrigger id="calculation-type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bending">Flexion</SelectItem>
                    <SelectItem value="compression">Compression</SelectItem>
                    <SelectItem value="tension">Traction</SelectItem>
                    <SelectItem value="shear">Cisaillement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="load-value">
                  {calculationType === 'bending' || calculationType === 'shear' 
                    ? 'Charge répartie (kN/m)' 
                    : 'Effort axial (kN)'}
                </Label>
                <Input
                  id="load-value"
                  type="number"
                  value={load}
                  onChange={(e) => setLoad(parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={exportToPDF} disabled={!showResults}>
                <Download className="h-4 w-4 mr-2" />
                Exporter PDF
              </Button>
              <Button onClick={calculateResults}>
                <Calculator className="h-4 w-4 mr-2" />
                Vérifier
              </Button>
            </div>
            
            {showResults && results && (
              <div className="mt-6 space-y-4">
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Données d'entrée</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Bois:</span>
                          <span className="text-sm">{timberClass}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Classe de service:</span>
                          <span className="text-sm">{serviceClass}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Durée de charge:</span>
                          <span className="text-sm">{loadDuration}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Dimensions:</span>
                          <span className="text-sm">{width} × {height} mm</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Longueur:</span>
                          <span className="text-sm">{length} m</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Facteur kmod:</span>
                          <span className="text-sm">{results.kmod.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Résultats de résistance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Type de vérification:</span>
                          <span className="text-sm">{results.resistanceType}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Contrainte adm.:</span>
                          <span className="text-sm">{results.designStrength.toFixed(2)} MPa</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Contrainte appliquée:</span>
                          <span className="text-sm">{results.appliedStress.toFixed(2)} MPa</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Taux d'utilisation:</span>
                          <span className="text-sm">{(results.utilizationRatio * 100).toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Statut:</span>
                          <span className={`text-sm font-semibold ${results.status === 'VÉRIFIÉ' ? 'text-green-600' : 'text-red-600'}`}>
                            {results.status}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {(calculationType === 'bending' || calculationType === 'shear') && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Vérification de flèche</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const deflectionResult = calculateDeflection();
                        if (!deflectionResult) return null;
                        
                        return (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="flex justify-between py-1">
                                  <span className="text-sm font-medium">Flèche calculée:</span>
                                  <span className="text-sm">{deflectionResult.deflection.toFixed(1)} mm</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-sm font-medium">Flèche admissible (L/300):</span>
                                  <span className="text-sm">{deflectionResult.limit.toFixed(1)} mm</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-sm font-medium">Ratio:</span>
                                  <span className="text-sm">{(deflectionResult.ratio * 100).toFixed(1)}%</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-sm font-medium">Statut:</span>
                                  <span className={`text-sm font-semibold ${deflectionResult.status === 'VÉRIFIÉ' ? 'text-green-600' : 'text-red-600'}`}>
                                    {deflectionResult.status}
                                  </span>
                                </div>
                              </div>
                              <div className="bg-amber-50 p-3 rounded border border-amber-200 flex items-start">
                                <Info className="h-4 w-4 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                                <div className="text-sm text-amber-700">
                                  <p>
                                    La vérification des flèches est simplifiée. Pour les calculs précis, 
                                    considérer les conditions d'appui réelles et le fluage du bois.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </CardContent>
                  </Card>
                )}
                
                <div className={`p-3 rounded ${results.status === 'VÉRIFIÉ' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`text-sm ${results.status === 'VÉRIFIÉ' ? 'text-green-700' : 'text-red-700'} flex items-center`}>
                    {results.status === 'VÉRIFIÉ' ? (
                      <span>La section vérifiée résiste aux charges appliquées selon l'EC5.</span>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span>La section ne résiste pas aux charges appliquées. Veuillez augmenter les dimensions ou réduire les charges.</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="connection">
            <div className="p-8 text-center">
              <p className="text-gray-500">
                Le calculateur d'assemblages bois sera disponible prochainement.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="justify-between border-t pt-4 text-xs text-gray-500">
        <div>
          Conforme à l'EN 1995 (Eurocode 5)
        </div>
        <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Réinitialiser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TimberCalculator;
