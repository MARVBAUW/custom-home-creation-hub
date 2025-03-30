
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Trees } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const TimberCalculator = () => {
  // State for the primary inputs
  const [section, setSection] = useState('rectangular');
  const [material, setMaterial] = useState('c24');
  const [height, setHeight] = useState<number>(200);
  const [width, setWidth] = useState<number>(100);
  const [length, setLength] = useState<number>(3000);
  const [moment, setMoment] = useState<number>(15);
  const [shear, setShear] = useState<number>(10);
  const [axialForce, setAxialForce] = useState<number>(20);

  // State for results
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  // Material properties for different timber classes
  const timberProperties = {
    c14: { 
      fm_k: 14, // Bending strength (MPa)
      ft_0_k: 8, // Tension parallel to grain (MPa)
      ft_90_k: 0.4, // Tension perpendicular to grain (MPa)
      fc_0_k: 16, // Compression parallel to grain (MPa)
      fc_90_k: 2.0, // Compression perpendicular to grain (MPa)
      fv_k: 3.0, // Shear strength (MPa)
      E_0_mean: 7000, // Mean modulus of elasticity parallel to grain (MPa)
      G_mean: 440, // Mean shear modulus (MPa)
      density: 290, // Density (kg/m³)
    },
    c18: {
      fm_k: 18,
      ft_0_k: 11,
      ft_90_k: 0.4,
      fc_0_k: 18,
      fc_90_k: 2.2,
      fv_k: 3.4,
      E_0_mean: 9000,
      G_mean: 560,
      density: 320,
    },
    c24: {
      fm_k: 24,
      ft_0_k: 14,
      ft_90_k: 0.4,
      fc_0_k: 21,
      fc_90_k: 2.5,
      fv_k: 4.0,
      E_0_mean: 11000,
      G_mean: 690,
      density: 350,
    },
    c30: {
      fm_k: 30,
      ft_0_k: 18,
      ft_90_k: 0.4,
      fc_0_k: 23,
      fc_90_k: 2.7,
      fv_k: 4.0,
      E_0_mean: 12000,
      G_mean: 750,
      density: 380,
    },
    gl24h: {
      fm_k: 24,
      ft_0_k: 19.2,
      ft_90_k: 0.5,
      fc_0_k: 24,
      fc_90_k: 2.5,
      fv_k: 3.5,
      E_0_mean: 11600,
      G_mean: 720,
      density: 385,
    },
    gl28h: {
      fm_k: 28,
      ft_0_k: 22.4,
      ft_90_k: 0.5,
      fc_0_k: 28,
      fc_90_k: 2.5,
      fv_k: 3.5,
      E_0_mean: 12600,
      G_mean: 780,
      density: 425,
    },
  };

  const calculateTimberSection = () => {
    try {
      // Get material properties
      const props = timberProperties[material as keyof typeof timberProperties];
      
      // Convert input values to appropriate units
      const h = height / 1000; // convert mm to m
      const b = width / 1000; // convert mm to m
      const L = length / 1000; // convert mm to m
      const M_Ed = moment; // kN·m
      const V_Ed = shear; // kN
      const N_Ed = axialForce; // kN (compression positive)
      
      // Section properties
      const A = b * h; // Cross-sectional area (m²)
      const I = (b * h**3) / 12; // Moment of inertia (m⁴)
      const W = (b * h**2) / 6; // Section modulus (m³)
      
      // Design strengths (using service class 1 and medium-term loads)
      const kmod = 0.8; // Modification factor
      const gamma_M = 1.3; // Partial safety factor
      
      const fm_d = (kmod * props.fm_k) / gamma_M; // Design bending strength (MPa)
      const fc_0_d = (kmod * props.fc_0_k) / gamma_M; // Design compression strength (MPa)
      const fv_d = (kmod * props.fv_k) / gamma_M; // Design shear strength (MPa)
      
      // Stress calculations
      const sigma_m_d = (M_Ed * 1000) / W; // Bending stress (kN/m² to MPa)
      const sigma_c_d = (N_Ed * 1000) / A; // Compression stress (kN/m² to MPa)
      const tau_d = (1.5 * V_Ed * 1000) / A; // Shear stress (kN/m² to MPa)
      
      // Buckling check
      const Lef = L; // Effective length (m)
      const i = Math.sqrt(I / A); // Radius of gyration (m)
      const lambda = Lef / i; // Slenderness ratio
      const lambda_rel = lambda / (Math.PI * Math.sqrt(props.E_0_mean / props.fc_0_k));
      
      let kc = 1.0; // Buckling factor
      if (lambda_rel > 0.3) {
        const beta_c = 0.2; // For solid timber
        const k = 0.5 * (1 + beta_c * (lambda_rel - 0.3) + lambda_rel**2);
        kc = 1 / (k + Math.sqrt(k**2 - lambda_rel**2));
      }
      
      // Utilization ratios
      const bending_ratio = sigma_m_d / fm_d;
      const compression_ratio = sigma_c_d / (kc * fc_0_d);
      const shear_ratio = tau_d / fv_d;
      
      // Combined bending and axial compression
      const combined_ratio = bending_ratio + compression_ratio;
      
      // Deflection calculation (simplified)
      const E = props.E_0_mean * 1000000; // Convert to N/m²
      const I_mm4 = (b * 1000) * ((h * 1000)**3) / 12; // Convert to mm⁴
      const deflection = (5 * (M_Ed * 1000) * (L**3)) / (48 * E * I); // in m
      
      // Prepare results
      const results = {
        section: {
          area: A * 1000000, // in mm²
          moment_of_inertia: I * 1000000000000, // in mm⁴
          section_modulus: W * 1000000000, // in mm³
        },
        stresses: {
          bending: sigma_m_d.toFixed(2), // MPa
          compression: sigma_c_d.toFixed(2), // MPa
          shear: tau_d.toFixed(2), // MPa
        },
        strength: {
          bending: fm_d.toFixed(2), // MPa
          compression: fc_0_d.toFixed(2), // MPa
          shear: fv_d.toFixed(2), // MPa
        },
        buckling: {
          slenderness: lambda.toFixed(2),
          relative_slenderness: lambda_rel.toFixed(2),
          buckling_factor: kc.toFixed(2),
        },
        utilization: {
          bending: (bending_ratio * 100).toFixed(1), // %
          compression: (compression_ratio * 100).toFixed(1), // %
          shear: (shear_ratio * 100).toFixed(1), // %
          combined: (combined_ratio * 100).toFixed(1), // %
        },
        deflection: {
          value: (deflection * 1000).toFixed(2), // mm
          limit: (L * 1000 / 300).toFixed(2), // L/300 in mm
          ratio: ((deflection * 1000) / (L * 1000 / 300) * 100).toFixed(1), // %
        },
        status: {
          bending: bending_ratio <= 1,
          compression: compression_ratio <= 1,
          shear: shear_ratio <= 1,
          combined: combined_ratio <= 1,
          deflection: deflection <= (L / 300),
          overall: (bending_ratio <= 1 && compression_ratio <= 1 && shear_ratio <= 1 && combined_ratio <= 1 && deflection <= (L / 300)),
        }
      };
      
      setResults(results);
      setShowResults(true);
    } catch (error) {
      console.error("Calculation error:", error);
      setResults(null);
      setShowResults(false);
    }
  };

  return (
    <Card className="border-t-4 border-t-amber-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-amber-800">
          <Trees className="h-6 w-6" />
          Calcul de structure bois (EC5)
        </CardTitle>
        <CardDescription>
          Vérification de la résistance des éléments en bois selon l'Eurocode 5
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inputs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="inputs">Données d'entrée</TabsTrigger>
            <TabsTrigger value="results" disabled={!showResults}>Résultats</TabsTrigger>
            <TabsTrigger value="info">Informations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="inputs" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="material">Classe de bois</Label>
                  <Select value={material} onValueChange={setMaterial}>
                    <SelectTrigger id="material">
                      <SelectValue placeholder="Sélectionner un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c14">C14 - Bois massif</SelectItem>
                      <SelectItem value="c18">C18 - Bois massif</SelectItem>
                      <SelectItem value="c24">C24 - Bois massif</SelectItem>
                      <SelectItem value="c30">C30 - Bois massif</SelectItem>
                      <SelectItem value="gl24h">GL24h - Bois lamellé-collé</SelectItem>
                      <SelectItem value="gl28h">GL28h - Bois lamellé-collé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="section">Type de section</Label>
                  <Select value={section} onValueChange={setSection}>
                    <SelectTrigger id="section">
                      <SelectValue placeholder="Sélectionner une section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rectangular">Rectangulaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Hauteur (mm)</Label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={height} 
                      onChange={(e) => setHeight(Number(e.target.value))} 
                      min={10} 
                    />
                  </div>
                  <div>
                    <Label htmlFor="width">Largeur (mm)</Label>
                    <Input 
                      id="width" 
                      type="number" 
                      value={width} 
                      onChange={(e) => setWidth(Number(e.target.value))} 
                      min={10} 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="length">Longueur (mm)</Label>
                  <Input 
                    id="length" 
                    type="number" 
                    value={length} 
                    onChange={(e) => setLength(Number(e.target.value))} 
                    min={100} 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Alert className="bg-amber-50">
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Sollicitations</AlertTitle>
                  <AlertDescription>
                    Saisissez les efforts auxquels l'élément est soumis.
                  </AlertDescription>
                </Alert>
                
                <div>
                  <Label htmlFor="moment">Moment fléchissant M_Ed (kN·m)</Label>
                  <Input 
                    id="moment" 
                    type="number" 
                    value={moment} 
                    onChange={(e) => setMoment(Number(e.target.value))} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="shear">Effort tranchant V_Ed (kN)</Label>
                  <Input 
                    id="shear" 
                    type="number" 
                    value={shear} 
                    onChange={(e) => setShear(Number(e.target.value))} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="axial">Effort normal N_Ed (kN, + compression)</Label>
                  <Input 
                    id="axial" 
                    type="number" 
                    value={axialForce} 
                    onChange={(e) => setAxialForce(Number(e.target.value))} 
                  />
                </div>
                
                <Button onClick={calculateTimberSection} className="w-full mt-4 bg-amber-600 hover:bg-amber-700">
                  Calculer
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {results && (
              <div className="space-y-6">
                <Alert className={results.status.overall ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                  <AlertTitle>{results.status.overall ? "La section est adéquate" : "La section n'est pas adéquate"}</AlertTitle>
                  <AlertDescription>
                    Taux d'utilisation combiné: {results.utilization.combined}%
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Propriétés géométriques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Section:</span>
                          <span>{width} × {height} mm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Aire:</span>
                          <span>{results.section.area.toFixed(0)} mm²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Inertie:</span>
                          <span>{results.section.moment_of_inertia.toExponential(2)} mm⁴</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Module de flexion:</span>
                          <span>{results.section.section_modulus.toExponential(2)} mm³</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Contraintes et résistances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Flexion:</span>
                          <span>{results.stresses.bending} / {results.strength.bending} MPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compression:</span>
                          <span>{results.stresses.compression} / {results.strength.compression} MPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cisaillement:</span>
                          <span>{results.stresses.shear} / {results.strength.shear} MPa</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Flambement</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Élancement:</span>
                          <span>{results.buckling.slenderness}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Élancement relatif:</span>
                          <span>{results.buckling.relative_slenderness}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Facteur kc:</span>
                          <span>{results.buckling.buckling_factor}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Taux d'utilisation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Flexion: {results.utilization.bending}%</span>
                            <span className="text-sm">{results.status.bending ? "OK" : "NON"}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${results.status.bending ? 'bg-green-600' : 'bg-red-600'} h-2 rounded-full`} 
                              style={{ width: `${Math.min(Number(results.utilization.bending), 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Compression: {results.utilization.compression}%</span>
                            <span className="text-sm">{results.status.compression ? "OK" : "NON"}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${results.status.compression ? 'bg-green-600' : 'bg-red-600'} h-2 rounded-full`} 
                              style={{ width: `${Math.min(Number(results.utilization.compression), 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Cisaillement: {results.utilization.shear}%</span>
                            <span className="text-sm">{results.status.shear ? "OK" : "NON"}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${results.status.shear ? 'bg-green-600' : 'bg-red-600'} h-2 rounded-full`} 
                              style={{ width: `${Math.min(Number(results.utilization.shear), 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Combiné: {results.utilization.combined}%</span>
                            <span className="text-sm">{results.status.combined ? "OK" : "NON"}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${results.status.combined ? 'bg-green-600' : 'bg-red-600'} h-2 rounded-full`} 
                              style={{ width: `${Math.min(Number(results.utilization.combined), 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Flèche</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Valeur: {results.deflection.value} mm</span>
                            <span className="text-sm">Limite: {results.deflection.limit} mm (L/300)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${results.status.deflection ? 'bg-green-600' : 'bg-red-600'} h-2 rounded-full`} 
                              style={{ width: `${Math.min(Number(results.deflection.ratio), 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="pt-2">
                          <span className="text-sm">Taux d'utilisation: {results.deflection.ratio}%</span>
                          <span className="text-sm ml-2 px-2 py-0.5 rounded-full bg-gray-100">
                            {results.status.deflection ? "OK" : "NON"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="info" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Eurocode 5 - Conception des structures en bois</h3>
              <p className="text-sm text-gray-600 mt-1">
                Ce calculateur vérifie la résistance d'une poutre ou d'un poteau en bois conformément à l'Eurocode 5. 
                Les calculs prennent en compte la flexion, la compression, le cisaillement et la déformation.
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Classe de service</h4>
              <p className="text-sm text-gray-600">
                Les calculs sont basés sur la classe de service 1 (humidité {"<"} 12%, environnement intérieur).
              </p>
              
              <h4 className="font-medium mt-2">Facteurs appliqués</h4>
              <p className="text-sm text-gray-600">
                kmod = 0.8 (charge de durée moyenne)<br />
                kdef = 0.6 (fluage en classe 1)<br />
                γM = 1.3 (coefficient partiel de sécurité)
              </p>
              
              <h4 className="font-medium mt-2">Limites de flèche</h4>
              <p className="text-sm text-gray-600">
                La flèche maximale est limitée à L/300.
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium">Remarques importantes</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mt-2">
                <li>Ce calculateur est fourni à titre d'information et ne remplace pas l'étude d'un ingénieur structure.</li>
                <li>Les effets de l'instabilité latérale (déversement) ne sont pas pris en compte.</li>
                <li>Les calculs sont basés sur la théorie des poutres d'Euler-Bernoulli.</li>
                <li>Consultez un ingénieur qualifié pour la validation finale de vos calculs.</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TimberCalculator;
