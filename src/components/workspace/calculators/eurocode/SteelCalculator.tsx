
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, CircleOff } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const SteelCalculator = () => {
  // State for the primary inputs
  const [profileType, setProfileType] = useState('ipe');
  const [profileSize, setProfileSize] = useState('200');
  const [steelGrade, setSteelGrade] = useState('s235');
  const [length, setLength] = useState<number>(3000);
  const [moment, setMoment] = useState<number>(50);
  const [shear, setShear] = useState<number>(30);
  const [axialForce, setAxialForce] = useState<number>(50);

  // State for results
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  // Profile properties (simplified dataset)
  const profiles = {
    ipe: {
      // h, b, tw, tf, A, Iy, Wely, Wply, Avz
      '80': [80, 46, 3.8, 5.2, 764, 80.1e4, 20.0e3, 23.2e3, 349],
      '100': [100, 55, 4.1, 5.7, 1032, 171e4, 34.2e3, 39.4e3, 472],
      '120': [120, 64, 4.4, 6.3, 1321, 318e4, 53.0e3, 60.7e3, 596],
      '140': [140, 73, 4.7, 6.9, 1643, 541e4, 77.3e3, 88.3e3, 734],
      '160': [160, 82, 5.0, 7.4, 2009, 869e4, 109e3, 124e3, 889],
      '180': [180, 91, 5.3, 8.0, 2395, 1317e4, 146e3, 166e3, 1052],
      '200': [200, 100, 5.6, 8.5, 2848, 1943e4, 194e3, 221e3, 1236],
      '220': [220, 110, 5.9, 9.2, 3337, 2772e4, 252e3, 286e3, 1440],
      '240': [240, 120, 6.2, 9.8, 3912, 3892e4, 324e3, 367e3, 1661],
      '270': [270, 135, 6.6, 10.2, 4595, 5790e4, 429e3, 484e3, 1972],
      '300': [300, 150, 7.1, 10.7, 5381, 8356e4, 557e3, 628e3, 2307],
      '330': [330, 160, 7.5, 11.5, 6261, 11770e4, 713e3, 804e3, 2626],
      '360': [360, 170, 8.0, 12.7, 7273, 16270e4, 904e3, 1019e3, 3011],
      '400': [400, 180, 8.6, 13.5, 8446, 23130e4, 1156e3, 1307e3, 3512],
      '450': [450, 190, 9.4, 14.6, 9882, 33740e4, 1500e3, 1702e3, 4138],
      '500': [500, 200, 10.2, 16.0, 11550, 48200e4, 1928e3, 2194e3, 4836],
      '550': [550, 210, 11.1, 17.2, 13440, 67120e4, 2441e3, 2787e3, 5600],
      '600': [600, 220, 12.0, 19.0, 15600, 92080e4, 3069e3, 3512e3, 6424],
    },
    hea: {
      '100': [96, 100, 5.0, 8.0, 2124, 349e4, 72.8e3, 83.0e3, 769],
      '120': [114, 120, 5.0, 8.0, 2534, 606e4, 106e3, 119e3, 925],
      '140': [133, 140, 5.5, 8.5, 3142, 1033e4, 155e3, 174e3, 1139],
      '160': [152, 160, 6.0, 9.0, 3877, 1673e4, 220e3, 245e3, 1401],
      '180': [171, 180, 6.0, 9.5, 4525, 2510e4, 294e3, 325e3, 1642],
      '200': [190, 200, 6.5, 10.0, 5383, 3692e4, 389e3, 429e3, 1948],
      '220': [210, 220, 7.0, 11.0, 6434, 5410e4, 515e3, 568e3, 2325],
      '240': [230, 240, 7.5, 12.0, 7684, 7763e4, 675e3, 744e3, 2769],
      '260': [250, 260, 7.5, 12.5, 8682, 10450e4, 836e3, 920e3, 3138],
      '280': [270, 280, 8.0, 13.0, 9726, 13670e4, 1013e3, 1112e3, 3512],
      '300': [290, 300, 8.5, 14.0, 11250, 18260e4, 1260e3, 1383e3, 4048],
      '320': [310, 300, 9.0, 15.5, 12440, 22930e4, 1479e3, 1628e3, 4440],
      '340': [330, 300, 9.5, 16.5, 13350, 27690e4, 1678e3, 1850e3, 4737],
      '360': [350, 300, 10.0, 17.5, 14280, 33090e4, 1891e3, 2088e3, 5041],
      '400': [390, 300, 11.0, 19.0, 15900, 45070e4, 2311e3, 2562e3, 5570],
      '450': [440, 300, 11.5, 21.0, 17800, 63720e4, 2896e3, 3216e3, 6221],
      '500': [490, 300, 12.0, 23.0, 19800, 86970e4, 3550e3, 3949e3, 6889],
      '550': [540, 300, 12.5, 24.0, 21900, 111900e4, 4146e3, 4622e3, 7593],
      '600': [590, 300, 13.0, 25.0, 22600, 141200e4, 4787e3, 5350e3, 8197],
      '650': [640, 300, 13.5, 26.0, 24300, 175200e4, 5474e3, 6136e3, 8609],
      '700': [690, 300, 14.5, 27.0, 26000, 215300e4, 6241e3, 7032e3, 9163],
      '800': [790, 300, 15.0, 28.0, 28600, 303400e4, 7682e3, 8699e3, 10230],
      '900': [890, 300, 16.0, 30.0, 32000, 422100e4, 9484e3, 10810e3, 11340],
      '1000': [990, 300, 16.5, 31.0, 34700, 553800e4, 11190e3, 12820e3, 12420],
    },
    upn: {
      '80': [80, 45, 6.0, 8.0, 1110, 106e4, 26.5e3, 32.1e3, 416],
      '100': [100, 50, 6.0, 8.5, 1350, 206e4, 41.2e3, 48.3e3, 509],
      '120': [120, 55, 7.0, 9.0, 1700, 364e4, 60.7e3, 70.9e3, 644],
      '140': [140, 60, 7.0, 10.0, 2040, 605e4, 86.4e3, 100e3, 775],
      '160': [160, 65, 7.5, 10.5, 2400, 925e4, 116e3, 134e3, 920],
      '180': [180, 70, 8.0, 11.0, 2800, 1350e4, 150e3, 173e3, 1070],
      '200': [200, 75, 8.5, 11.5, 3230, 1910e4, 191e3, 220e3, 1240],
      '220': [220, 80, 9.0, 12.5, 3750, 2690e4, 245e3, 282e3, 1420],
      '240': [240, 85, 9.5, 13.0, 4250, 3600e4, 300e3, 345e3, 1610],
      '260': [260, 90, 10.0, 14.0, 4800, 4820e4, 371e3, 426e3, 1820],
      '280': [280, 95, 10.0, 15.0, 5350, 6280e4, 448e3, 515e3, 2020],
      '300': [300, 100, 10.0, 16.0, 5880, 8030e4, 535e3, 613e3, 2210],
      '320': [320, 100, 14.0, 17.5, 7490, 10870e4, 679e3, 818e3, 2660],
      '350': [350, 100, 14.0, 16.0, 7730, 12840e4, 734e3, 863e3, 2870],
      '380': [380, 102, 13.5, 16.0, 8030, 15760e4, 829e3, 977e3, 3050],
      '400': [400, 110, 14.0, 18.0, 9100, 20350e4, 1020e3, 1200e3, 3400],
      '450': [450, 125, 15.0, 18.0, 10900, 29710e4, 1320e3, 1520e3, 4000],
      '500': [500, 150, 16.0, 20.0, 13800, 45850e4, 1830e3, 2130e3, 4800],
    }
  };
  
  // Steel grade properties
  const steelGrades = {
    's235': { fy: 235, fu: 360 },
    's275': { fy: 275, fu: 430 },
    's355': { fy: 355, fu: 510 },
    's460': { fy: 460, fu: 550 }
  };

  const calculateSteelSection = () => {
    try {
      // Get profile properties [h, b, tw, tf, A, Iy, Wely, Wply, Avz]
      const profileProps = profiles[profileType as keyof typeof profiles][profileSize as keyof typeof profiles.ipe];
      const steelProps = steelGrades[steelGrade as keyof typeof steelGrades];
      
      // Extract profile properties
      const h = profileProps[0]; // mm
      const b = profileProps[1]; // mm
      const tw = profileProps[2]; // mm
      const tf = profileProps[3]; // mm
      const A = profileProps[4]; // mm²
      const Iy = profileProps[5]; // mm⁴
      const Wely = profileProps[6]; // mm³
      const Wply = profileProps[7]; // mm³
      const Avz = profileProps[8]; // mm²
      
      // Convert input values to appropriate units
      const L = length; // mm
      const M_Ed = moment; // kN·m
      const V_Ed = shear; // kN
      const N_Ed = axialForce; // kN (compression positive)
      
      // Calculate resistance according to EC3
      const gamma_M0 = 1.0;
      const gamma_M1 = 1.0;
      
      // Bending resistance
      const M_c_Rd = (Wply * steelProps.fy) / (gamma_M0 * 1000); // kNm
      
      // Shear resistance
      const V_c_Rd = (Avz * steelProps.fy) / (Math.sqrt(3) * gamma_M0 * 1000); // kN
      
      // Axial resistance
      const N_c_Rd = (A * steelProps.fy) / (gamma_M0 * 1000); // kN
      
      // Buckling check
      const Lcr = L; // mm, assume no restraint
      const i = Math.sqrt(Iy / A); // mm, radius of gyration
      const lambda = Lcr / i;
      const lambda_1 = 93.9 * Math.sqrt(235 / steelProps.fy);
      const lambda_bar = lambda / lambda_1;
      
      let chi = 1.0; // Buckling reduction factor
      if (lambda_bar > 0.2) {
        const alpha = 0.21; // For hot-rolled sections, buckling curve a
        const phi = 0.5 * (1 + alpha * (lambda_bar - 0.2) + lambda_bar * lambda_bar);
        chi = 1 / (phi + Math.sqrt(phi * phi - lambda_bar * lambda_bar));
      }
      
      const N_b_Rd = (chi * A * steelProps.fy) / (gamma_M1 * 1000); // kN
      
      // Calculate stresses and utilization ratios
      const sigma_m_Ed = (M_Ed * 1000000) / Wely; // MPa
      const sigma_n_Ed = (N_Ed * 1000) / A; // MPa
      const tau_Ed = (V_Ed * 1000) / Avz; // MPa
      
      const bending_ratio = M_Ed / M_c_Rd;
      const shear_ratio = V_Ed / V_c_Rd;
      const axial_ratio = N_Ed / N_b_Rd;
      
      // Combined check
      // Simplified for N + M (neglecting interaction with shear)
      const combined_ratio = (N_Ed / N_b_Rd) + (M_Ed / M_c_Rd);
      
      // Deflection calculation (simplified)
      const E = 210000; // MPa
      const deflection = (5 * M_Ed * 1000000 * Math.pow(L, 3)) / (48 * E * Iy); // mm
      
      // Prepare results
      const results = {
        section: {
          type: `${profileType.toUpperCase()} ${profileSize}`,
          h,
          b,
          tw,
          tf,
          area: A,
          inertia: Iy,
          modulus: Wely,
          plastic_modulus: Wply,
          shear_area: Avz,
        },
        material: {
          grade: steelGrade.toUpperCase(),
          fy: steelProps.fy,
          fu: steelProps.fu,
        },
        stresses: {
          bending: sigma_m_Ed.toFixed(2), // MPa
          axial: sigma_n_Ed.toFixed(2), // MPa
          shear: tau_Ed.toFixed(2), // MPa
        },
        resistance: {
          moment: M_c_Rd.toFixed(2), // kNm
          shear: V_c_Rd.toFixed(2), // kN
          axial: N_c_Rd.toFixed(2), // kN
          buckling: N_b_Rd.toFixed(2), // kN
        },
        buckling: {
          slenderness: lambda.toFixed(2),
          relative_slenderness: lambda_bar.toFixed(2),
          reduction_factor: chi.toFixed(2),
        },
        utilization: {
          bending: (bending_ratio * 100).toFixed(1), // %
          shear: (shear_ratio * 100).toFixed(1), // %
          axial: (axial_ratio * 100).toFixed(1), // %
          combined: (combined_ratio * 100).toFixed(1), // %
        },
        deflection: {
          value: deflection.toFixed(2), // mm
          limit: (L / 250).toFixed(2), // L/250 in mm
          ratio: ((deflection) / (L / 250) * 100).toFixed(1), // %
        },
        status: {
          bending: bending_ratio <= 1,
          shear: shear_ratio <= 1,
          axial: axial_ratio <= 1,
          combined: combined_ratio <= 1,
          deflection: deflection <= (L / 250),
          overall: (bending_ratio <= 1 && shear_ratio <= 1 && axial_ratio <= 1 && combined_ratio <= 1 && deflection <= (L / 250)),
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
    <Card className="border-t-4 border-t-blue-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <CircleOff className="h-6 w-6" />
          Calcul de structure acier (EC3)
        </CardTitle>
        <CardDescription>
          Vérification de la résistance des profilés acier selon l'Eurocode 3
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
                  <Label htmlFor="steelGrade">Nuance d'acier</Label>
                  <Select value={steelGrade} onValueChange={setSteelGrade}>
                    <SelectTrigger id="steelGrade">
                      <SelectValue placeholder="Sélectionner une nuance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s235">S235</SelectItem>
                      <SelectItem value="s275">S275</SelectItem>
                      <SelectItem value="s355">S355</SelectItem>
                      <SelectItem value="s460">S460</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="profileType">Type de profilé</Label>
                  <Select value={profileType} onValueChange={setProfileType}>
                    <SelectTrigger id="profileType">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ipe">IPE</SelectItem>
                      <SelectItem value="hea">HEA</SelectItem>
                      <SelectItem value="upn">UPN</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="profileSize">Dimension du profilé</Label>
                  <Select value={profileSize} onValueChange={setProfileSize}>
                    <SelectTrigger id="profileSize">
                      <SelectValue placeholder="Sélectionner une dimension" />
                    </SelectTrigger>
                    <SelectContent>
                      {profileType === 'ipe' && Object.keys(profiles.ipe).map(size => (
                        <SelectItem key={size} value={size}>{`IPE ${size}`}</SelectItem>
                      ))}
                      {profileType === 'hea' && Object.keys(profiles.hea).map(size => (
                        <SelectItem key={size} value={size}>{`HEA ${size}`}</SelectItem>
                      ))}
                      {profileType === 'upn' && Object.keys(profiles.upn).map(size => (
                        <SelectItem key={size} value={size}>{`UPN ${size}`}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <Alert className="bg-blue-50">
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
                
                <Button onClick={calculateSteelSection} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Calculer
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {results && (
              <div className="space-y-6">
                <Alert className={results.status.overall ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}>
                  <AlertTitle>{results.status.overall ? "Le profilé est adéquat" : "Le profilé n'est pas adéquat"}</AlertTitle>
                  <AlertDescription>
                    Taux d'utilisation combiné: {results.utilization.combined}%
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Propriétés du profilé</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Section:</span>
                          <span>{results.section.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Acier:</span>
                          <span>{results.material.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Aire:</span>
                          <span>{results.section.area} mm²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Module élastique:</span>
                          <span>{results.section.modulus} mm³</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Module plastique:</span>
                          <span>{results.section.plastic_modulus} mm³</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Contraintes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Flexion:</span>
                          <span>{results.stresses.bending} MPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compression:</span>
                          <span>{results.stresses.axial} MPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cisaillement:</span>
                          <span>{results.stresses.shear} MPa</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Limite élastique:</span>
                          <span>{results.material.fy} MPa</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Résistances</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Moment:</span>
                          <span>{results.resistance.moment} kNm</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Effort normal:</span>
                          <span>{results.resistance.axial} kN</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cisaillement:</span>
                          <span>{results.resistance.shear} kN</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Résistance flambement:</span>
                          <span>{results.resistance.buckling} kN</span>
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
                            <span className="text-sm">Compression: {results.utilization.axial}%</span>
                            <span className="text-sm">{results.status.axial ? "OK" : "NON"}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`${results.status.axial ? 'bg-green-600' : 'bg-red-600'} h-2 rounded-full`} 
                              style={{ width: `${Math.min(Number(results.utilization.axial), 100)}%` }}
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
                      <CardTitle className="text-sm">Déformation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Flèche: {results.deflection.value} mm</span>
                            <span className="text-sm">Limite: {results.deflection.limit} mm (L/250)</span>
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
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium">Flambement</h4>
                          <div className="grid grid-cols-3 gap-2 mt-1">
                            <div className="text-xs">
                              <div>Élancement</div>
                              <div className="font-medium">{results.buckling.slenderness}</div>
                            </div>
                            <div className="text-xs">
                              <div>Élancement réduit</div>
                              <div className="font-medium">{results.buckling.relative_slenderness}</div>
                            </div>
                            <div className="text-xs">
                              <div>Coefficient χ</div>
                              <div className="font-medium">{results.buckling.reduction_factor}</div>
                            </div>
                          </div>
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
              <h3 className="text-lg font-medium">Eurocode 3 - Conception des structures en acier</h3>
              <p className="text-sm text-gray-600 mt-1">
                Ce calculateur vérifie la résistance d'un profilé acier conformément à l'Eurocode 3. 
                Les calculs prennent en compte la flexion, la compression, le cisaillement et le flambement.
              </p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h4 className="font-medium">Hypothèses de calcul</h4>
              <p className="text-sm text-gray-600">
                Les calculs sont basés sur les hypothèses suivantes:
              </p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>La section est de classe 1 ou 2 (aucune réduction de résistance due au voilement local)</li>
                <li>L'élément est soumis à de la flexion autour de l'axe fort uniquement</li>
                <li>La longueur de flambement est égale à la longueur de l'élément (pas de maintien latéral)</li>
                <li>Les coefficients partiels γM0 = γM1 = 1.0 sont utilisés</li>
              </ul>
              
              <h4 className="font-medium mt-3">Limites de flèche</h4>
              <p className="text-sm text-gray-600">
                La flèche maximale est limitée à L/250 (recommandation de l'EC3 pour les poutres).
              </p>
            </div>
            
            <Separator />
            
            <div>
              <h4 className="font-medium">Remarques importantes</h4>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mt-2">
                <li>Ce calculateur est fourni à titre d'information et ne remplace pas l'étude d'un ingénieur structure.</li>
                <li>Les effets de l'instabilité latérale (déversement) ne sont pas pris en compte.</li>
                <li>Le flambement n'est vérifié que dans le plan de flexion principal.</li>
                <li>Le calculateur ne vérifie pas toutes les dispositions constructives de l'EC3.</li>
                <li>Consultez un ingénieur qualifié pour la validation finale de vos calculs.</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SteelCalculator;
