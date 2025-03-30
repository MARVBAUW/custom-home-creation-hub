
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Calculator, Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";

const SteelCalculator = () => {
  // State for user inputs
  const [steelGrade, setSteelGrade] = useState('S235');
  const [profileType, setProfileType] = useState('IPE');
  const [profileSize, setProfileSize] = useState('IPE 200');
  const [length, setLength] = useState(5);
  const [loadCase, setLoadCase] = useState('bending');
  const [force, setForce] = useState(20);
  const [calculationTab, setCalculationTab] = useState('section');
  
  // States for results
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  
  // Profile data (simplified)
  const profileData: {[key: string]: {[key: string]: {A: number, Iy: number, Wel: number, Wpl: number, i: number}}} = {
    'IPE': {
      'IPE 100': { A: 10.3, Iy: 171, Wel: 34.2, Wpl: 39.4, i: 4.07 },
      'IPE 120': { A: 13.2, Iy: 318, Wel: 53.0, Wpl: 60.7, i: 4.90 },
      'IPE 140': { A: 16.4, Iy: 541, Wel: 77.3, Wpl: 88.3, i: 5.74 },
      'IPE 160': { A: 20.1, Iy: 869, Wel: 109, Wpl: 124, i: 6.58 },
      'IPE 180': { A: 23.9, Iy: 1317, Wel: 146, Wpl: 166, i: 7.42 },
      'IPE 200': { A: 28.5, Iy: 1943, Wel: 194, Wpl: 221, i: 8.26 },
      'IPE 220': { A: 33.4, Iy: 2772, Wel: 252, Wpl: 286, i: 9.11 },
      'IPE 240': { A: 39.1, Iy: 3892, Wel: 324, Wpl: 367, i: 9.97 },
      'IPE 270': { A: 45.9, Iy: 5790, Wel: 429, Wpl: 484, i: 11.2 },
      'IPE 300': { A: 53.8, Iy: 8356, Wel: 557, Wpl: 628, i: 12.5 },
    },
    'HEA': {
      'HEA 100': { A: 21.2, Iy: 349, Wel: 72.8, Wpl: 83.0, i: 4.06 },
      'HEA 120': { A: 25.3, Iy: 606, Wel: 106, Wpl: 119, i: 4.89 },
      'HEA 140': { A: 31.4, Iy: 1033, Wel: 155, Wpl: 174, i: 5.73 },
      'HEA 160': { A: 38.8, Iy: 1673, Wel: 220, Wpl: 245, i: 6.57 },
      'HEA 180': { A: 45.3, Iy: 2510, Wel: 294, Wpl: 325, i: 7.44 },
      'HEA 200': { A: 53.8, Iy: 3692, Wel: 389, Wpl: 429, i: 8.28 },
      'HEA 220': { A: 64.3, Iy: 5410, Wel: 515, Wpl: 568, i: 9.17 },
      'HEA 240': { A: 76.8, Iy: 7763, Wel: 675, Wpl: 744, i: 10.1 },
      'HEA 260': { A: 86.8, Iy: 10455, Wel: 836, Wpl: 920, i: 11.0 },
      'HEA 280': { A: 97.3, Iy: 13673, Wel: 1013, Wpl: 1112, i: 11.9 },
    },
    'HEB': {
      'HEB 100': { A: 26.0, Iy: 450, Wel: 90.0, Wpl: 104, i: 4.16 },
      'HEB 120': { A: 34.0, Iy: 864, Wel: 144, Wpl: 165, i: 5.04 },
      'HEB 140': { A: 43.0, Iy: 1509, Wel: 216, Wpl: 245, i: 5.93 },
      'HEB 160': { A: 54.3, Iy: 2492, Wel: 311, Wpl: 354, i: 6.78 },
      'HEB 180': { A: 65.3, Iy: 3831, Wel: 426, Wpl: 482, i: 7.66 },
      'HEB 200': { A: 78.1, Iy: 5696, Wel: 570, Wpl: 643, i: 8.54 },
      'HEB 220': { A: 91.0, Iy: 8091, Wel: 736, Wpl: 827, i: 9.43 },
      'HEB 240': { A: 106, Iy: 11260, Wel: 938, Wpl: 1053, i: 10.3 },
      'HEB 260': { A: 118, Iy: 14920, Wel: 1150, Wpl: 1283, i: 11.2 },
      'HEB 280': { A: 131, Iy: 19270, Wel: 1376, Wpl: 1534, i: 12.1 },
    },
    'UPE': {
      'UPE 100': { A: 12.5, Iy: 207, Wel: 41.4, Wpl: 48.8, i: 4.07 },
      'UPE 120': { A: 15.4, Iy: 364, Wel: 60.7, Wpl: 70.7, i: 4.86 },
      'UPE 140': { A: 18.7, Iy: 602, Wel: 86.0, Wpl: 99.5, i: 5.67 },
      'UPE 160': { A: 22.0, Iy: 911, Wel: 114, Wpl: 130, i: 6.43 },
      'UPE 180': { A: 25.2, Iy: 1350, Wel: 150, Wpl: 170, i: 7.32 },
      'UPE 200': { A: 29.0, Iy: 1910, Wel: 191, Wpl: 220, i: 8.11 },
      'UPE 220': { A: 32.9, Iy: 2682, Wel: 244, Wpl: 276, i: 9.03 },
      'UPE 240': { A: 37.3, Iy: 3602, Wel: 300, Wpl: 340, i: 9.82 },
      'UPE 270': { A: 42.5, Iy: 5080, Wel: 376, Wpl: 430, i: 10.9 },
      'UPE 300': { A: 48.4, Iy: 6993, Wel: 466, Wpl: 534, i: 12.0 },
    }
  };
  
  // Steel grade properties
  const steelProperties: {[key: string]: {fy: number, fu: number}} = {
    'S235': { fy: 235, fu: 360 },
    'S275': { fy: 275, fu: 430 },
    'S355': { fy: 355, fu: 510 },
    'S420': { fy: 420, fu: 520 },
    'S460': { fy: 460, fu: 540 }
  };
  
  // Load case options
  const loadCaseOptions = [
    { value: 'bending', label: 'Flexion simple' },
    { value: 'compression', label: 'Compression' },
    { value: 'tension', label: 'Traction' },
    { value: 'combined', label: 'Flexion + compression' }
  ];
  
  // Update profile options based on selected type
  const getProfileOptions = () => {
    if (!profileType || !profileData[profileType]) return [];
    return Object.keys(profileData[profileType]).map(profile => ({
      value: profile,
      label: profile
    }));
  };
  
  // Perform calculations
  const calculateResults = () => {
    try {
      const profile = profileData[profileType][profileSize];
      const steel = steelProperties[steelGrade];
      
      if (!profile || !steel) {
        toast.error("Données insuffisantes pour le calcul");
        return;
      }
      
      // Material safety factor
      const gammaM0 = 1.0;
      
      // Calculate resistances based on load case
      let utilizationRatio = 0;
      let resistanceValue = 0;
      let designValue = 0;
      let result = {
        profile: profileSize,
        steel: steelGrade,
        length: length,
        slenderness: 0,
        resistanceType: '',
        resistanceFormula: '',
        resistanceValue: 0,
        appliedForce: force,
        utilizationRatio: 0,
        status: ''
      };
      
      switch (loadCase) {
        case 'bending':
          // Bending resistance
          resistanceValue = (profile.Wpl * steel.fy) / gammaM0;
          designValue = force;
          utilizationRatio = designValue / resistanceValue;
          
          result = {
            ...result,
            resistanceType: 'Résistance en flexion',
            resistanceFormula: 'Mc,Rd = Wpl × fy / γM0',
            resistanceValue: resistanceValue,
            utilizationRatio: utilizationRatio,
            status: utilizationRatio <= 1.0 ? 'VÉRIFIÉ' : 'NON VÉRIFIÉ'
          };
          break;
          
        case 'compression':
          // Compression resistance
          const NcRd = (profile.A * steel.fy) / gammaM0;
          
          // Slenderness calculation
          const slenderness = (length * 100) / profile.i; // Length in m to cm
          
          resistanceValue = NcRd;
          designValue = force;
          utilizationRatio = designValue / resistanceValue;
          
          result = {
            ...result,
            slenderness: slenderness,
            resistanceType: 'Résistance en compression',
            resistanceFormula: 'Nc,Rd = A × fy / γM0',
            resistanceValue: resistanceValue,
            utilizationRatio: utilizationRatio,
            status: utilizationRatio <= 1.0 ? 'VÉRIFIÉ' : 'NON VÉRIFIÉ'
          };
          break;
          
        case 'tension':
          // Tension resistance
          resistanceValue = (profile.A * steel.fy) / gammaM0;
          designValue = force;
          utilizationRatio = designValue / resistanceValue;
          
          result = {
            ...result,
            resistanceType: 'Résistance en traction',
            resistanceFormula: 'Nt,Rd = A × fy / γM0',
            resistanceValue: resistanceValue,
            utilizationRatio: utilizationRatio,
            status: utilizationRatio <= 1.0 ? 'VÉRIFIÉ' : 'NON VÉRIFIÉ'
          };
          break;
          
        case 'combined':
          // Simplified interaction for combined bending and compression
          const NRd = (profile.A * steel.fy) / gammaM0;
          const MRd = (profile.Wpl * steel.fy) / gammaM0;
          
          // Assume force is axial and 30% of force is bending moment
          const axialForce = force;
          const bendingMoment = force * 0.3;
          
          // Interaction formula
          utilizationRatio = (axialForce / NRd) + (bendingMoment / MRd);
          
          result = {
            ...result,
            resistanceType: 'Interaction flexion-compression',
            resistanceFormula: 'N/NRd + M/MRd ≤ 1.0',
            resistanceValue: 1.0, // Reference value
            appliedForce: `N=${axialForce} kN, M=${bendingMoment.toFixed(1)} kNm`,
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
  
  // Export results to PDF (simulated)
  const exportToPDF = () => {
    toast.success("Export PDF en cours de développement");
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          Vérification des structures en acier (EC3)
        </CardTitle>
        <CardDescription>
          Vérifiez les éléments structurels en acier selon l'Eurocode 3
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs value={calculationTab} onValueChange={setCalculationTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="section">Vérification de section</TabsTrigger>
            <TabsTrigger value="connection">Assemblages (à venir)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="section" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="steel-grade">Nuance d'acier</Label>
                <Select value={steelGrade} onValueChange={setSteelGrade}>
                  <SelectTrigger id="steel-grade">
                    <SelectValue placeholder="Sélectionner une nuance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S235">S235</SelectItem>
                    <SelectItem value="S275">S275</SelectItem>
                    <SelectItem value="S355">S355</SelectItem>
                    <SelectItem value="S420">S420</SelectItem>
                    <SelectItem value="S460">S460</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="profile-type">Type de profilé</Label>
                <Select value={profileType} onValueChange={setProfileType}>
                  <SelectTrigger id="profile-type">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IPE">IPE</SelectItem>
                    <SelectItem value="HEA">HEA</SelectItem>
                    <SelectItem value="HEB">HEB</SelectItem>
                    <SelectItem value="UPE">UPE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="profile-size">Profilé</Label>
                <Select value={profileSize} onValueChange={setProfileSize}>
                  <SelectTrigger id="profile-size">
                    <SelectValue placeholder="Sélectionner un profilé" />
                  </SelectTrigger>
                  <SelectContent>
                    {getProfileOptions().map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="element-length">Longueur (m)</Label>
                <Input
                  id="element-length"
                  type="number"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                  min="0.1"
                  step="0.1"
                />
              </div>
              
              <div>
                <Label htmlFor="load-case">Cas de charge</Label>
                <Select value={loadCase} onValueChange={setLoadCase}>
                  <SelectTrigger id="load-case">
                    <SelectValue placeholder="Sélectionner un cas" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadCaseOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="force-value">
                  {loadCase === 'bending' ? 'Moment (kNm)' : 'Effort (kN)'}
                </Label>
                <Input
                  id="force-value"
                  type="number"
                  value={force}
                  onChange={(e) => setForce(parseFloat(e.target.value) || 0)}
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
                          <span className="text-sm font-medium">Profilé:</span>
                          <span className="text-sm">{profileType} {profileSize}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Acier:</span>
                          <span className="text-sm">{steelGrade} (fy = {steelProperties[steelGrade].fy} MPa)</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Longueur:</span>
                          <span className="text-sm">{length} m</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Cas de charge:</span>
                          <span className="text-sm">{loadCaseOptions.find(o => o.value === loadCase)?.label}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Effort appliqué:</span>
                          <span className="text-sm">
                            {typeof results.appliedForce === 'string' 
                              ? results.appliedForce 
                              : `${results.appliedForce} ${loadCase === 'bending' ? 'kNm' : 'kN'}`}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Résultats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Type de résistance:</span>
                          <span className="text-sm">{results.resistanceType}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Formule:</span>
                          <span className="text-sm">{results.resistanceFormula}</span>
                        </div>
                        {loadCase === 'compression' && (
                          <div className="flex justify-between py-1">
                            <span className="text-sm font-medium">Élancement:</span>
                            <span className="text-sm">{results.slenderness.toFixed(1)}</span>
                          </div>
                        )}
                        <div className="flex justify-between py-1">
                          <span className="text-sm font-medium">Résistance calculée:</span>
                          <span className="text-sm">
                            {results.resistanceValue.toFixed(1)} {loadCase === 'bending' ? 'kNm' : 'kN'}
                          </span>
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
                
                <div className={`p-3 rounded ${results.status === 'VÉRIFIÉ' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`text-sm ${results.status === 'VÉRIFIÉ' ? 'text-green-700' : 'text-red-700'} flex items-center`}>
                    {results.status === 'VÉRIFIÉ' ? (
                      <span>La section vérifiée résiste aux charges appliquées.</span>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        <span>La section ne résiste pas aux charges appliquées. Veuillez choisir une section plus résistante ou réduire les charges.</span>
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
                Le calculateur d'assemblages acier sera disponible prochainement.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="justify-between border-t pt-4 text-xs text-gray-500">
        <div>
          Conforme à l'EN 1993 (Eurocode 3)
        </div>
        <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Réinitialiser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SteelCalculator;
