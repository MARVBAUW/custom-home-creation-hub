
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Volume, Download, Info, Calculator } from 'lucide-react';
import PDFExporter from '@/components/common/PDFExporter';
import { generateStandardPDF } from '@/utils/pdfUtils';

interface AcousticResult {
  reverbTime: number;
  recommendedTime: number;
  qualification: string;
  absorptionArea: number;
  sabineFormula: string;
  requiredAbsorption: number;
}

interface Material {
  id: string;
  label: string;
  absorptionCoefficient: number;
}

// Reference data for calculations
const materials: Material[] = [
  { id: 'concrete', label: 'Béton brut', absorptionCoefficient: 0.02 },
  { id: 'plaster', label: 'Plâtre', absorptionCoefficient: 0.03 },
  { id: 'wood', label: 'Bois', absorptionCoefficient: 0.1 },
  { id: 'carpet', label: 'Moquette', absorptionCoefficient: 0.3 },
  { id: 'curtain', label: 'Rideaux légers', absorptionCoefficient: 0.15 },
  { id: 'heavy_curtain', label: 'Rideaux lourds', absorptionCoefficient: 0.35 },
  { id: 'acoustic_panel', label: 'Panneaux acoustiques', absorptionCoefficient: 0.8 },
  { id: 'acoustic_ceiling', label: 'Plafond acoustique', absorptionCoefficient: 0.7 },
  { id: 'window', label: 'Fenêtre', absorptionCoefficient: 0.05 },
  { id: 'door', label: 'Porte', absorptionCoefficient: 0.08 }
];

interface RoomUsage {
  id: string;
  label: string;
  recommendedTime: number;
}

// Room usage types and their recommended reverberation times
const roomUsages: RoomUsage[] = [
  { id: 'classroom', label: 'Salle de classe', recommendedTime: 0.7 },
  { id: 'office', label: 'Bureau', recommendedTime: 0.8 },
  { id: 'conference', label: 'Salle de conférence', recommendedTime: 0.8 },
  { id: 'living_room', label: 'Séjour résidentiel', recommendedTime: 1.0 },
  { id: 'bedroom', label: 'Chambre', recommendedTime: 0.8 },
  { id: 'restaurant', label: 'Restaurant', recommendedTime: 1.2 },
  { id: 'auditorium', label: 'Auditorium', recommendedTime: 1.5 },
  { id: 'music_room', label: 'Salle de musique', recommendedTime: 1.8 }
];

interface Surface {
  id: string;
  material: string;
  area: number;
}

const AcousticCalculator: React.FC = () => {
  const [roomLength, setRoomLength] = useState<number>(5);
  const [roomWidth, setRoomWidth] = useState<number>(4);
  const [roomHeight, setRoomHeight] = useState<number>(2.5);
  const [roomUsage, setRoomUsage] = useState<string>('office');
  const [surfaces, setSurfaces] = useState<Surface[]>([
    { id: '1', material: 'plaster', area: 56 }, // Walls
    { id: '2', material: 'concrete', area: 20 }, // Floor
    { id: '3', material: 'plaster', area: 20 }, // Ceiling
    { id: '4', material: 'window', area: 3 }, // Windows
    { id: '5', material: 'door', area: 1.8 } // Door
  ]);

  // Add a new surface
  const addSurface = () => {
    setSurfaces([
      ...surfaces,
      { 
        id: `${Date.now()}`, 
        material: 'plaster', 
        area: 1 
      }
    ]);
  };

  // Remove a surface
  const removeSurface = (id: string) => {
    setSurfaces(surfaces.filter(surface => surface.id !== id));
  };

  // Update surface properties
  const updateSurface = (id: string, property: keyof Surface, value: string | number) => {
    setSurfaces(surfaces.map(surface => 
      surface.id === id ? { ...surface, [property]: value } : surface
    ));
  };

  // Calculate acoustic results
  const acousticResult = useMemo<AcousticResult>(() => {
    // Calculate room volume
    const volume = roomLength * roomWidth * roomHeight;
    
    // Calculate total absorption area
    let totalAbsorption = 0;
    surfaces.forEach(surface => {
      const material = materials.find(m => m.id === surface.material);
      if (material) {
        totalAbsorption += surface.area * material.absorptionCoefficient;
      }
    });
    
    // Calculate reverberation time using Sabine's formula
    // T = 0.161 * V / A where V is volume in m³ and A is absorption area in m²
    const reverbTime = 0.161 * volume / totalAbsorption;
    
    // Get recommended reverberation time based on room usage
    const usage = roomUsages.find(u => u.id === roomUsage);
    const recommendedTime = usage ? usage.recommendedTime : 0.8;
    
    // Determine quality of acoustics
    let qualification = '';
    const ratio = reverbTime / recommendedTime;
    
    if (ratio < 0.8) {
      qualification = 'Absorption excessive';
    } else if (ratio >= 0.8 && ratio <= 1.2) {
      qualification = 'Conforme aux recommandations';
    } else {
      qualification = 'Réverbération excessive';
    }
    
    // Calculate required absorption to meet recommended time
    const requiredAbsorption = 0.161 * volume / recommendedTime;
    
    return {
      reverbTime: Math.round(reverbTime * 100) / 100,
      recommendedTime,
      qualification,
      absorptionArea: Math.round(totalAbsorption * 100) / 100,
      sabineFormula: `T = 0.161 × ${volume.toFixed(1)} / ${totalAbsorption.toFixed(1)} = ${reverbTime.toFixed(2)} s`,
      requiredAbsorption: Math.round((requiredAbsorption - totalAbsorption) * 100) / 100
    };
  }, [roomLength, roomWidth, roomHeight, roomUsage, surfaces]);

  // Get color based on acoustic quality
  const getQualificationColor = () => {
    const ratio = acousticResult.reverbTime / acousticResult.recommendedTime;
    if (ratio < 0.8) return 'bg-blue-100 border-blue-300';
    if (ratio >= 0.8 && ratio <= 1.2) return 'bg-green-100 border-green-300';
    return 'bg-amber-100 border-amber-300';
  };

  // Generate PDF
  const handleGeneratePDF = (options: any) => {
    // Calculate room volume
    const volume = roomLength * roomWidth * roomHeight;
    
    // Get room usage label
    const usageLabel = roomUsages.find(u => u.id === roomUsage)?.label || '';
    
    // Format surfaces for PDF
    const surfacesData = surfaces.map(surface => {
      const material = materials.find(m => m.id === surface.material);
      return {
        material: material?.label || '',
        area: surface.area,
        absorption: Math.round(surface.area * (material?.absorptionCoefficient || 0) * 100) / 100
      };
    });
    
    return generateStandardPDF(
      'Calcul de Temps de Réverbération', 
      {
        dimensions: `${roomLength} × ${roomWidth} × ${roomHeight} m`,
        volume: `${volume} m³`,
        usage: usageLabel,
        surfaces: surfacesData
      },
      {
        reverbTime: `${acousticResult.reverbTime} s`,
        recommendedTime: `${acousticResult.recommendedTime} s`,
        qualification: acousticResult.qualification,
        absorptionArea: `${acousticResult.absorptionArea} m²`,
        absorptionNeeded: acousticResult.requiredAbsorption > 0 ? 
          `Ajoutez ${acousticResult.requiredAbsorption} m² d'absorption` : 
          'Aucune absorption supplémentaire nécessaire',
        formula: acousticResult.sabineFormula
      },
      options
    );
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume className="h-5 w-5 text-primary" />
          Calculateur Acoustique
        </CardTitle>
        <CardDescription>
          Calcul du temps de réverbération selon la formule de Sabine
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="parameters">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="parameters">Paramètres</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parameters" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="roomLength">Longueur (m)</Label>
                <Input
                  id="roomLength"
                  type="number"
                  step="0.1"
                  value={roomLength}
                  onChange={(e) => setRoomLength(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roomWidth">Largeur (m)</Label>
                <Input
                  id="roomWidth"
                  type="number"
                  step="0.1"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="roomHeight">Hauteur (m)</Label>
                <Input
                  id="roomHeight"
                  type="number"
                  step="0.1"
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomUsage">Usage de la pièce</Label>
              <Select value={roomUsage} onValueChange={setRoomUsage}>
                <SelectTrigger id="roomUsage">
                  <SelectValue placeholder="Sélectionnez un usage" />
                </SelectTrigger>
                <SelectContent>
                  {roomUsages.map((usage) => (
                    <SelectItem key={usage.id} value={usage.id}>
                      {usage.label} (TR recommandé: {usage.recommendedTime} s)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Surfaces et matériaux</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={addSurface}
                  className="text-xs"
                >
                  Ajouter une surface
                </Button>
              </div>
              
              <div className="space-y-4">
                {surfaces.map((surface, index) => (
                  <div key={surface.id} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-6">
                      <Label htmlFor={`material-${surface.id}`} className="text-xs">Matériau</Label>
                      <Select 
                        value={surface.material} 
                        onValueChange={(value) => updateSurface(surface.id, 'material', value)}
                      >
                        <SelectTrigger id={`material-${surface.id}`}>
                          <SelectValue placeholder="Matériau" />
                        </SelectTrigger>
                        <SelectContent>
                          {materials.map((material) => (
                            <SelectItem key={material.id} value={material.id}>
                              {material.label} (α: {material.absorptionCoefficient})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-4">
                      <Label htmlFor={`area-${surface.id}`} className="text-xs">Surface (m²)</Label>
                      <Input
                        id={`area-${surface.id}`}
                        type="number"
                        step="0.1"
                        value={surface.area}
                        onChange={(e) => updateSurface(surface.id, 'area', Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="col-span-2">
                      {surfaces.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs w-full"
                          onClick={() => removeSurface(surface.id)}
                        >
                          Supprimer
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground">Temps de réverbération calculé</p>
                  <p className="text-5xl font-bold">{acousticResult.reverbTime} s</p>
                  <p className="text-sm mt-2">(Recommandé: {acousticResult.recommendedTime} s)</p>
                </div>
                
                <Alert className={getQualificationColor()}>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{acousticResult.qualification}</strong>
                    {acousticResult.reverbTime > acousticResult.recommendedTime ? 
                      `: Ajoutez des matériaux absorbants pour réduire la réverbération.` : 
                      acousticResult.reverbTime < acousticResult.recommendedTime ? 
                      `: La pièce est trop absorbante, ajoutez des surfaces réfléchissantes.` :
                      `: Le temps de réverbération est idéal pour cet usage.`}
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="text-sm font-medium">Formule de Sabine</h4>
                  <p className="mt-2 font-mono">{acousticResult.sabineFormula}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="text-sm font-medium">Aire d'absorption</h4>
                    <p className="mt-1">{acousticResult.absorptionArea} m²</p>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="text-sm font-medium">Volume de la pièce</h4>
                    <p className="mt-1">{(roomLength * roomWidth * roomHeight).toFixed(1)} m³</p>
                  </div>
                </div>
                
                {acousticResult.requiredAbsorption > 0 && (
                  <Alert variant="default" className="bg-amber-50 border-amber-200">
                    <Calculator className="h-4 w-4" />
                    <AlertDescription>
                      Ajoutez <strong>{acousticResult.requiredAbsorption} m²</strong> d'absorption pour atteindre le temps de réverbération recommandé.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </div>
            
            <PDFExporter 
              data={{
                roomLength,
                roomWidth,
                roomHeight,
                roomUsage: roomUsages.find(u => u.id === roomUsage)?.label,
                surfaces
              }}
              title="Calcul du Temps de Réverbération"
              generatePDF={handleGeneratePDF}
              defaultFileName="acoustique-reverberation"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AcousticCalculator;
