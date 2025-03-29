
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Volume2, BarChart3, Download, Calculator, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const AcousticCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('wallIsolation');
  
  // États pour le calculateur d'isolation de paroi
  const [wallMaterial, setWallMaterial] = useState('concrete');
  const [wallThickness, setWallThickness] = useState(200); // en mm
  const [insulationType, setInsulationType] = useState('none');
  const [insulationThickness, setInsulationThickness] = useState(0); // en mm
  const [finishType, setFinishType] = useState('plaster');
  const [wallResult, setWallResult] = useState<number | null>(null);
  
  // États pour le calculateur de réverbération
  const [roomLength, setRoomLength] = useState(5); // en m
  const [roomWidth, setRoomWidth] = useState(4); // en m
  const [roomHeight, setRoomHeight] = useState(2.5); // en m
  const [ceilingMaterial, setCeilingMaterial] = useState('plaster');
  const [floorMaterial, setFloorMaterial] = useState('tiles');
  const [wallsMaterial, setWallsMaterial] = useState('paint');
  const [reverberationResult, setReverberationResult] = useState<number | null>(null);
  
  // Calculer l'isolation acoustique de la paroi
  const calculateWallIsolation = () => {
    // Valeurs de base pour différents matériaux (R en dB)
    const materialBaseValues: Record<string, number> = {
      concrete: 45,
      brick: 40,
      aac: 35,
      wood: 25,
      gypsum: 30
    };
    
    // Facteur d'augmentation par mm d'épaisseur
    const thicknessFactors: Record<string, number> = {
      concrete: 0.05,
      brick: 0.04,
      aac: 0.03,
      wood: 0.02,
      gypsum: 0.03
    };
    
    // Apport des isolants (en dB)
    const insulationValues: Record<string, number> = {
      none: 0,
      mineral_wool: 10,
      glass_wool: 9,
      polystyrene: 5,
      polyurethane: 7
    };
    
    // Facteur d'augmentation par mm d'isolant
    const insulationFactors: Record<string, number> = {
      none: 0,
      mineral_wool: 0.05,
      glass_wool: 0.04,
      polystyrene: 0.02,
      polyurethane: 0.03
    };
    
    // Apport des finitions (en dB)
    const finishValues: Record<string, number> = {
      none: 0,
      plaster: 2,
      plasterboard: 3,
      wood_panel: 1,
      ceramic: 0.5
    };
    
    // Calcul de l'indice d'affaiblissement acoustique
    const baseR = materialBaseValues[wallMaterial] || 0;
    const thicknessBonus = (wallThickness - 100) * (thicknessFactors[wallMaterial] || 0);
    const insulationBonus = (insulationType !== 'none') 
      ? insulationValues[insulationType] + (insulationThickness * (insulationFactors[insulationType] || 0))
      : 0;
    const finishBonus = finishValues[finishType] || 0;
    
    // Résultat final
    const rw = Math.round(baseR + thicknessBonus + insulationBonus + finishBonus);
    
    setWallResult(rw);
    
    toast({
      title: "Calcul effectué",
      description: `L'indice d'affaiblissement acoustique (Rw) de votre paroi est de ${rw} dB.`,
    });
  };
  
  // Calculer le temps de réverbération
  const calculateReverberation = () => {
    // Coefficients d'absorption par matériau (valeurs moyennes octaves 500-1000Hz)
    const absorptionCoefficients: Record<string, number> = {
      // Plafonds
      plaster: 0.02,
      acoustic_tile: 0.7,
      wood_ceiling: 0.1,
      // Sols
      tiles: 0.02,
      carpet: 0.3,
      parquet: 0.08,
      // Murs
      paint: 0.02,
      wallpaper: 0.03,
      fabric: 0.15,
      wood_panel: 0.1
    };
    
    // Calcul du volume de la pièce
    const volume = roomLength * roomWidth * roomHeight;
    
    // Calcul des surfaces
    const ceilingArea = roomLength * roomWidth;
    const floorArea = roomLength * roomWidth;
    const wallsArea = 2 * (roomLength * roomHeight + roomWidth * roomHeight);
    
    // Calcul de l'aire d'absorption équivalente
    const ceilingAbsorption = ceilingArea * (absorptionCoefficients[ceilingMaterial] || 0.02);
    const floorAbsorption = floorArea * (absorptionCoefficients[floorMaterial] || 0.02);
    const wallsAbsorption = wallsArea * (absorptionCoefficients[wallsMaterial] || 0.02);
    
    const totalAbsorption = ceilingAbsorption + floorAbsorption + wallsAbsorption;
    
    // Formule de Sabine: TR = 0.161 * V / A
    const reverbTime = 0.161 * volume / totalAbsorption;
    
    setReverberationResult(parseFloat(reverbTime.toFixed(2)));
    
    toast({
      title: "Calcul effectué",
      description: `Le temps de réverbération estimé de votre pièce est de ${reverbTime.toFixed(2)} secondes.`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-khaki-600" />
              Calculateur Acoustique
            </CardTitle>
            <CardDescription>
              Estimez les performances acoustiques de vos constructions
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="wallIsolation" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="wallIsolation">Isolation de paroi</TabsTrigger>
            <TabsTrigger value="reverberation">Temps de réverbération</TabsTrigger>
          </TabsList>
          
          <TabsContent value="wallIsolation" className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Matériau principal</Label>
                  <Select value={wallMaterial} onValueChange={setWallMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="concrete">Béton</SelectItem>
                      <SelectItem value="brick">Brique</SelectItem>
                      <SelectItem value="aac">Béton cellulaire</SelectItem>
                      <SelectItem value="wood">Bois</SelectItem>
                      <SelectItem value="gypsum">Plaques de plâtre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Épaisseur (mm): {wallThickness} mm</Label>
                  <Slider 
                    value={[wallThickness]} 
                    min={50} 
                    max={500} 
                    step={10} 
                    onValueChange={(value) => setWallThickness(value[0])}
                    className="my-4"
                  />
                </div>
                
                <div>
                  <Label>Isolation acoustique</Label>
                  <Select value={insulationType} onValueChange={setInsulationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type d'isolation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune</SelectItem>
                      <SelectItem value="mineral_wool">Laine de roche</SelectItem>
                      <SelectItem value="glass_wool">Laine de verre</SelectItem>
                      <SelectItem value="polystyrene">Polystyrène</SelectItem>
                      <SelectItem value="polyurethane">Polyuréthane</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {insulationType !== 'none' && (
                  <div>
                    <Label>Épaisseur isolation (mm): {insulationThickness} mm</Label>
                    <Slider 
                      value={[insulationThickness]} 
                      min={0} 
                      max={200} 
                      step={10} 
                      onValueChange={(value) => setInsulationThickness(value[0])}
                      className="my-4"
                    />
                  </div>
                )}
                
                <div>
                  <Label>Finition</Label>
                  <Select value={finishType} onValueChange={setFinishType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une finition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune</SelectItem>
                      <SelectItem value="plaster">Enduit plâtre</SelectItem>
                      <SelectItem value="plasterboard">Plaque de plâtre</SelectItem>
                      <SelectItem value="wood_panel">Panneau bois</SelectItem>
                      <SelectItem value="ceramic">Carrelage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={calculateWallIsolation} className="w-full mt-6">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculer l'isolation acoustique
                </Button>
                
                {wallResult !== null && (
                  <div className="mt-6 p-4 bg-khaki-50 rounded-lg border border-khaki-100">
                    <h3 className="font-medium">Résultat du calcul</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Indice d'affaiblissement acoustique (Rw)</p>
                        <p className="text-3xl font-semibold text-khaki-700">{wallResult} dB</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Classe de performance</p>
                        <p className="text-xl font-medium">
                          {wallResult >= 50 ? 'Très performant' : 
                           wallResult >= 40 ? 'Performant' : 
                           wallResult >= 35 ? 'Standard' : 'Faible'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reverberation" className="space-y-6">
            <div className="grid gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Longueur (m)</Label>
                    <Input 
                      type="number" 
                      value={roomLength} 
                      onChange={(e) => setRoomLength(parseFloat(e.target.value) || 0)} 
                      min={1} 
                      max={30}
                    />
                  </div>
                  <div>
                    <Label>Largeur (m)</Label>
                    <Input 
                      type="number" 
                      value={roomWidth} 
                      onChange={(e) => setRoomWidth(parseFloat(e.target.value) || 0)} 
                      min={1} 
                      max={30}
                    />
                  </div>
                  <div>
                    <Label>Hauteur (m)</Label>
                    <Input 
                      type="number" 
                      value={roomHeight} 
                      onChange={(e) => setRoomHeight(parseFloat(e.target.value) || 0)} 
                      min={1} 
                      max={10}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Matériau du plafond</Label>
                  <Select value={ceilingMaterial} onValueChange={setCeilingMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plaster">Plâtre / Béton</SelectItem>
                      <SelectItem value="acoustic_tile">Dalles acoustiques</SelectItem>
                      <SelectItem value="wood_ceiling">Lambris bois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Matériau du sol</Label>
                  <Select value={floorMaterial} onValueChange={setFloorMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiles">Carrelage / Béton</SelectItem>
                      <SelectItem value="carpet">Moquette</SelectItem>
                      <SelectItem value="parquet">Parquet / Stratifié</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Matériau des murs</Label>
                  <Select value={wallsMaterial} onValueChange={setWallsMaterial}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paint">Peinture sur plâtre/béton</SelectItem>
                      <SelectItem value="wallpaper">Papier peint</SelectItem>
                      <SelectItem value="fabric">Revêtement tissu</SelectItem>
                      <SelectItem value="wood_panel">Panneaux bois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={calculateReverberation} className="w-full mt-6">
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculer le temps de réverbération
                </Button>
                
                {reverberationResult !== null && (
                  <div className="mt-6 p-4 bg-khaki-50 rounded-lg border border-khaki-100">
                    <h3 className="font-medium">Résultat du calcul</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Temps de réverbération (Tr)</p>
                        <p className="text-3xl font-semibold text-khaki-700">{reverberationResult} s</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Usage recommandé</p>
                        <p className="text-md font-medium">
                          {reverberationResult <= 0.5 ? 'Studio d\'enregistrement' : 
                           reverberationResult <= 0.8 ? 'Salle de classe, bureau' : 
                           reverberationResult <= 1.2 ? 'Salle de conférence' : 
                           reverberationResult <= 2.0 ? 'Salle polyvalente' : 'Salle de concert'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-600">
                        Volume de la pièce: {(roomLength * roomWidth * roomHeight).toFixed(1)} m³
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => {
          setWallResult(null);
          setReverberationResult(null);
          toast({
            title: "Calculs réinitialisés",
            description: "Toutes les valeurs ont été remises à zéro.",
          });
        }}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Réinitialiser
        </Button>
        
        <Button variant="outline" onClick={() => {
          toast({
            title: "Rapport PDF",
            description: "Fonctionnalité de génération de PDF en cours de développement.",
          });
        }}>
          <Download className="mr-2 h-4 w-4" />
          Exporter en PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AcousticCalculator;
