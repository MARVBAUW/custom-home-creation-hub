
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Save, Download, Info, Thermometer } from 'lucide-react';
import PDFExporter from '@/components/common/PDFExporter';
import { generateStandardPDF } from '@/utils/pdfUtils';

interface DpeResult {
  energyClass: string;
  energyValue: number;
  ghgClass: string;
  ghgValue: number;
  primaryEnergy: number;
  finalEnergy: number;
  estimatedBill: number;
}

interface HeatingSystem {
  id: string;
  label: string;
  efficiency: number;
  primaryEnergyFactor: number;
  carbonFactor: number;
}

interface InsulationLevel {
  id: string;
  label: string;
  uValue: number;
}

// Reference data for calculations
const heatingSystems: HeatingSystem[] = [
  { id: 'gas', label: 'Chaudière gaz', efficiency: 0.92, primaryEnergyFactor: 1, carbonFactor: 0.227 },
  { id: 'electric', label: 'Chauffage électrique', efficiency: 1, primaryEnergyFactor: 2.3, carbonFactor: 0.064 },
  { id: 'heat_pump', label: 'Pompe à chaleur', efficiency: 3.5, primaryEnergyFactor: 2.3, carbonFactor: 0.064 },
  { id: 'wood', label: 'Chaudière bois', efficiency: 0.85, primaryEnergyFactor: 0.6, carbonFactor: 0.024 },
  { id: 'oil', label: 'Fioul', efficiency: 0.85, primaryEnergyFactor: 1, carbonFactor: 0.324 }
];

const insulationLevels: InsulationLevel[] = [
  { id: 'very_poor', label: 'Très mauvaise', uValue: 2.5 },
  { id: 'poor', label: 'Mauvaise', uValue: 1.8 },
  { id: 'average', label: 'Moyenne', uValue: 1.2 },
  { id: 'good', label: 'Bonne', uValue: 0.8 },
  { id: 'excellent', label: 'Excellente', uValue: 0.5 }
];

// Energy classes
const energyClasses = [
  { class: 'A', maxValue: 50, color: '#319834' },
  { class: 'B', maxValue: 90, color: '#57ac31' },
  { class: 'C', maxValue: 150, color: '#c9d100' },
  { class: 'D', maxValue: 230, color: '#fad614' },
  { class: 'E', maxValue: 330, color: '#fa9a1b' },
  { class: 'F', maxValue: 450, color: '#ea580c' },
  { class: 'G', maxValue: Infinity, color: '#d94530' }
];

// GHG classes
const ghgClasses = [
  { class: 'A', maxValue: 5, color: '#319834' },
  { class: 'B', maxValue: 10, color: '#57ac31' },
  { class: 'C', maxValue: 20, color: '#c9d100' },
  { class: 'D', maxValue: 35, color: '#fad614' },
  { class: 'E', maxValue: 55, color: '#fa9a1b' },
  { class: 'F', maxValue: 80, color: '#ea580c' },
  { class: 'G', maxValue: Infinity, color: '#d94530' }
];

const DpeCalculator: React.FC = () => {
  const [surface, setSurface] = useState<number>(100);
  const [constructionYear, setConstructionYear] = useState<number>(2000);
  const [heatingSystem, setHeatingSystem] = useState<string>('gas');
  const [insulationLevel, setInsulationLevel] = useState<string>('average');
  const [ceilingHeight, setCeilingHeight] = useState<number>(2.5);
  const [glazingRatio, setGlazingRatio] = useState<number>(15);
  const [ventilationType, setVentilationType] = useState<string>('natural');
  const [occupants, setOccupants] = useState<number>(4);
  const [energyPrice, setEnergyPrice] = useState<number>(0.174);

  // Calculate DPE values
  const dpeResult = useMemo<DpeResult>(() => {
    // Find selected systems in reference data
    const selectedHeating = heatingSystems.find(sys => sys.id === heatingSystem) || heatingSystems[0];
    const selectedInsulation = insulationLevels.find(ins => ins.id === insulationLevel) || insulationLevels[2];
    
    // Base heat loss calculation (simplified)
    // This is a simplified model and would need to be more complex for accurate results
    let baseHeatLoss = selectedInsulation.uValue * surface * 25; // 25 is a simplification factor
    
    // Adjust for construction year
    const yearFactor = constructionYear < 1975 ? 1.3 : 
                      constructionYear < 2000 ? 1.1 : 
                      constructionYear < 2012 ? 0.9 : 0.7;
    
    // Adjust for ceiling height (more volume = more energy needed)
    const heightFactor = ceilingHeight / 2.5;
    
    // Adjust for window area (more windows = more heat loss)
    const windowFactor = 1 + ((glazingRatio - 15) / 100);
    
    // Ventilation adjustment
    const ventilationFactor = ventilationType === 'natural' ? 1.2 : 
                             ventilationType === 'mechanical' ? 1 : 0.8;
    
    // Calculate final energy consumption (kWh/m²/year)
    const finalEnergy = (baseHeatLoss * yearFactor * heightFactor * windowFactor * ventilationFactor) / 
                       (selectedHeating.efficiency * surface);
    
    // Primary energy consumption (kWh/m²/year)
    const primaryEnergy = finalEnergy * selectedHeating.primaryEnergyFactor;
    
    // GHG emissions (kgCO2eq/m²/year)
    const ghgValue = finalEnergy * selectedHeating.carbonFactor;
    
    // Estimated annual energy bill
    const estimatedBill = finalEnergy * surface * energyPrice;
    
    // Determine energy class
    const energyClass = energyClasses.find(c => primaryEnergy <= c.maxValue)?.class || 'G';
    
    // Determine GHG class
    const ghgClass = ghgClasses.find(c => ghgValue <= c.maxValue)?.class || 'G';
    
    return {
      energyClass,
      energyValue: Math.round(primaryEnergy),
      ghgClass,
      ghgValue: Math.round(ghgValue * 10) / 10,
      primaryEnergy: Math.round(primaryEnergy),
      finalEnergy: Math.round(finalEnergy),
      estimatedBill: Math.round(estimatedBill)
    };
  }, [
    surface,
    constructionYear,
    heatingSystem,
    insulationLevel,
    ceilingHeight,
    glazingRatio,
    ventilationType,
    occupants,
    energyPrice
  ]);

  // Get color for energy class
  const getEnergyClassColor = (energyClass: string) => {
    return energyClasses.find(c => c.class === energyClass)?.color || '#d94530';
  };

  // Get color for GHG class
  const getGhgClassColor = (ghgClass: string) => {
    return ghgClasses.find(c => c.class === ghgClass)?.color || '#d94530';
  };

  // Generate PDF
  const handleGeneratePDF = (options: any) => {
    return generateStandardPDF(
      'Diagnostic de Performance Énergétique', 
      {
        surface,
        constructionYear,
        heatingSystem: heatingSystems.find(sys => sys.id === heatingSystem)?.label,
        insulationLevel: insulationLevels.find(ins => ins.id === insulationLevel)?.label,
        ceilingHeight,
        glazingRatio,
        ventilationType: ventilationType === 'natural' ? 'Ventilation naturelle' : 
                        ventilationType === 'mechanical' ? 'VMC simple flux' : 'VMC double flux'
      },
      {
        energyClass: dpeResult.energyClass,
        energyConsumption: `${dpeResult.energyValue} kWhEP/m².an`,
        ghgClass: dpeResult.ghgClass,
        ghgEmissions: `${dpeResult.ghgValue} kgCO2eq/m².an`,
        estimatedBill: `${dpeResult.estimatedBill} €/an`,
        energyPerformance: dpeResult.energyClass <= 'C' ? 'Bonne' : 
                          dpeResult.energyClass <= 'E' ? 'Moyenne' : 'Mauvaise'
      },
      options
    );
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-primary" />
          Diagnostic de Performance Énergétique (DPE)
        </CardTitle>
        <CardDescription>
          Estimation du DPE et de l'étiquette énergétique d'un logement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="parameters">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="parameters">Paramètres</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parameters" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="surface">Surface habitable (m²)</Label>
                <Input
                  id="surface"
                  type="number"
                  value={surface}
                  onChange={(e) => setSurface(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="constructionYear">Année de construction</Label>
                <Input
                  id="constructionYear"
                  type="number"
                  value={constructionYear}
                  onChange={(e) => setConstructionYear(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="heatingSystem">Système de chauffage</Label>
                <Select value={heatingSystem} onValueChange={setHeatingSystem}>
                  <SelectTrigger id="heatingSystem">
                    <SelectValue placeholder="Sélectionnez un système" />
                  </SelectTrigger>
                  <SelectContent>
                    {heatingSystems.map((system) => (
                      <SelectItem key={system.id} value={system.id}>
                        {system.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insulationLevel">Niveau d'isolation</Label>
                <Select value={insulationLevel} onValueChange={setInsulationLevel}>
                  <SelectTrigger id="insulationLevel">
                    <SelectValue placeholder="Sélectionnez un niveau" />
                  </SelectTrigger>
                  <SelectContent>
                    {insulationLevels.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ceilingHeight">Hauteur sous plafond (m)</Label>
                <Input
                  id="ceilingHeight"
                  type="number"
                  step="0.1"
                  value={ceilingHeight}
                  onChange={(e) => setCeilingHeight(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="glazingRatio">Surface vitrée (% de la surface au sol)</Label>
                <Input
                  id="glazingRatio"
                  type="number"
                  value={glazingRatio}
                  onChange={(e) => setGlazingRatio(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ventilationType">Système de ventilation</Label>
                <Select value={ventilationType} onValueChange={setVentilationType}>
                  <SelectTrigger id="ventilationType">
                    <SelectValue placeholder="Sélectionnez un système" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Ventilation naturelle</SelectItem>
                    <SelectItem value="mechanical">VMC simple flux</SelectItem>
                    <SelectItem value="double_flow">VMC double flux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occupants">Nombre d'occupants</Label>
                <Input
                  id="occupants"
                  type="number"
                  value={occupants}
                  onChange={(e) => setOccupants(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="energyPrice">Prix moyen de l'énergie (€/kWh)</Label>
              <Input
                id="energyPrice"
                type="number"
                step="0.001"
                value={energyPrice}
                onChange={(e) => setEnergyPrice(Number(e.target.value))}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Consommation énergétique</p>
                  <div 
                    className="text-4xl font-bold rounded-full w-20 h-20 mx-auto flex items-center justify-center text-white"
                    style={{ backgroundColor: getEnergyClassColor(dpeResult.energyClass) }}
                  >
                    {dpeResult.energyClass}
                  </div>
                  <p className="mt-2 text-sm">{dpeResult.energyValue} kWhEP/m².an</p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">Énergie primaire</p>
                  <p>{dpeResult.primaryEnergy} kWhEP/m².an</p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">Énergie finale</p>
                  <p>{dpeResult.finalEnergy} kWhEF/m².an</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">Émissions de GES</p>
                  <div 
                    className="text-4xl font-bold rounded-full w-20 h-20 mx-auto flex items-center justify-center text-white"
                    style={{ backgroundColor: getGhgClassColor(dpeResult.ghgClass) }}
                  >
                    {dpeResult.ghgClass}
                  </div>
                  <p className="mt-2 text-sm">{dpeResult.ghgValue} kgCO2eq/m².an</p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">Émissions totales</p>
                  <p>{Math.round(dpeResult.ghgValue * surface)} kgCO2eq/an</p>
                </div>
                
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium">Facture énergétique estimée</p>
                  <p className="font-medium">{dpeResult.estimatedBill} €/an</p>
                </div>
              </div>
            </div>
            
            <Alert variant="default" className={`bg-opacity-20`} style={{ backgroundColor: `${getEnergyClassColor(dpeResult.energyClass)}40` }}>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Performance énergétique {dpeResult.energyClass}:</strong> {' '}
                {dpeResult.energyClass <= 'C' 
                  ? "Bonne performance énergétique. Ce logement est économe en énergie." 
                  : dpeResult.energyClass <= 'E'
                  ? "Performance énergétique moyenne. Des améliorations sont possibles."
                  : "Performance énergétique médiocre. Des rénovations importantes sont recommandées."}
              </AlertDescription>
            </Alert>
            
            <PDFExporter 
              data={{
                surface,
                constructionYear,
                heatingSystem: heatingSystems.find(sys => sys.id === heatingSystem)?.label,
                insulationLevel: insulationLevels.find(ins => ins.id === insulationLevel)?.label,
                ventilationType
              }}
              title="Diagnostic de Performance Énergétique"
              generatePDF={handleGeneratePDF}
              defaultFileName="dpe-estimation"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DpeCalculator;
