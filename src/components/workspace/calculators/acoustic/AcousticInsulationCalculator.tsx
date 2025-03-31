
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Info, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AcousticInsulationCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('airborne');
  
  // État pour l'isolation aux bruits aériens
  const [wallMaterial, setWallMaterial] = useState('brick_hollow');
  const [wallThickness, setWallThickness] = useState('200');
  const [hasInsulation, setHasInsulation] = useState(true);
  const [insulationType, setInsulationType] = useState('mineral_wool');
  const [insulationThickness, setInsulationThickness] = useState('45');
  
  // État pour le temps de réverbération
  const [roomLength, setRoomLength] = useState('5');
  const [roomWidth, setRoomWidth] = useState('4');
  const [roomHeight, setRoomHeight] = useState('2.5');
  const [surfaces, setSurfaces] = useState([
    { id: '1', material: 'plaster', area: '30', absorption: '0.02' },
    { id: '2', material: 'carpet', area: '20', absorption: '0.2' },
    { id: '3', material: 'glass', area: '4', absorption: '0.04' }
  ]);
  
  // Base de données des valeurs RW
  const wallRwDatabase: Record<string, Record<string, number>> = {
    'brick_hollow': {
      '100': 39,
      '150': 42,
      '200': 45,
      '250': 48
    },
    'concrete': {
      '100': 43,
      '150': 47,
      '200': 50,
      '250': 53
    },
    'aac_block': {
      '100': 36,
      '150': 39,
      '200': 42,
      '250': 44
    },
    'plasterboard': {
      '12.5': 28,
      '25': 32,
      '50': 38,
      '75': 40
    }
  };
  
  // Base de données des améliorations acoustiques
  const insulationImprovementDb: Record<string, Record<string, number>> = {
    'mineral_wool': {
      '30': 4,
      '45': 6,
      '60': 8,
      '100': 10
    },
    'glass_wool': {
      '30': 3,
      '45': 5,
      '60': 7,
      '100': 9
    },
    'acoustic_panel': {
      '30': 7,
      '45': 9,
      '60': 11,
      '100': 13
    }
  };
  
  // Base de données des coefficients d'absorption acoustique
  const absorptionCoefficients: Record<string, number> = {
    'plaster': 0.02,
    'brick': 0.03,
    'concrete': 0.02,
    'wood': 0.10,
    'glass': 0.04,
    'carpet': 0.20,
    'acoustic_panel': 0.70,
    'heavy_curtain': 0.35,
    'vinyl_floor': 0.03,
    'wooden_floor': 0.08,
    'audience': 0.45,
    'mineral_wool': 0.90
  };
  
  // Calcul de l'indice d'affaiblissement acoustique Rw
  const calculateRw = () => {
    // Récupération de la valeur Rw de base pour le matériau et l'épaisseur
    const baseRw = wallRwDatabase[wallMaterial]?.[wallThickness] || 40;
    
    // Ajout de l'amélioration si l'isolation est présente
    let totalRw = baseRw;
    if (hasInsulation) {
      const improvement = insulationImprovementDb[insulationType]?.[insulationThickness] || 5;
      totalRw += improvement;
    }
    
    return totalRw;
  };
  
  // Conversion de Rw en DnT,A (isolation acoustique standardisée)
  const calculateDnTA = () => {
    const rw = calculateRw();
    
    // La valeur DnT,A est généralement inférieure à Rw d'environ 2 à 5 dB
    // en fonction des transmissions latérales
    return rw - 3;
  };
  
  // Calcul du temps de réverbération
  const calculateReverberation = () => {
    // Volume de la pièce
    const volume = parseFloat(roomLength) * parseFloat(roomWidth) * parseFloat(roomHeight);
    
    // Absorption totale
    let totalAbsorption = 0;
    surfaces.forEach(surface => {
      const area = parseFloat(surface.area);
      const absorption = parseFloat(surface.absorption);
      if (!isNaN(area) && !isNaN(absorption)) {
        totalAbsorption += area * absorption;
      }
    });
    
    // Formule de Sabine: T = 0.16 * V / A
    const reverbTime = 0.16 * volume / totalAbsorption;
    return reverbTime;
  };
  
  // Obtenir la classification acoustique
  const getAcousticRating = (dntaValue: number) => {
    if (dntaValue >= 58) return "Très performant (Classe A)";
    if (dntaValue >= 53) return "Performant (Classe B)";
    if (dntaValue >= 50) return "Réglementaire + (Classe C)";
    if (dntaValue >= 43) return "Réglementaire (Classe D)";
    return "Non conforme";
  };
  
  // Obtenir l'évaluation du temps de réverbération
  const getReverbRating = (rt: number) => {
    if (rt < 0.4) return "Très absorbant (pièce sourde)";
    if (rt < 0.8) return "Bonne acoustique pour un bureau, chambre";
    if (rt < 1.2) return "Correct pour salon, salle à manger";
    if (rt < 1.8) return "Adapté pour salles de classe";
    return "Trop réverbérant (inconfortable)";
  };
  
  // Gestion des surfaces pour le calcul de réverbération
  const addSurface = () => {
    const newId = String(surfaces.length + 1);
    setSurfaces([...surfaces, { 
      id: newId, 
      material: 'plaster', 
      area: '10', 
      absorption: absorptionCoefficients.plaster.toString() 
    }]);
  };
  
  const removeSurface = (id: string) => {
    if (surfaces.length > 1) {
      setSurfaces(surfaces.filter(surface => surface.id !== id));
    } else {
      toast({
        title: "Erreur",
        description: "Vous devez conserver au moins une surface."
      });
    }
  };
  
  const updateSurface = (id: string, field: string, value: string) => {
    setSurfaces(surfaces.map(surface => {
      if (surface.id === id) {
        const updatedSurface = { ...surface, [field]: value };
        
        // Update absorption coefficient automatically when material changes
        if (field === 'material') {
          updatedSurface.absorption = absorptionCoefficients[value]?.toString() || '0.02';
        }
        
        return updatedSurface;
      }
      return surface;
    }));
  };
  
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport est en cours de téléchargement."
    });
  };
  
  // Résultats des calculs
  const rwValue = calculateRw();
  const dntaValue = calculateDnTA();
  const reverbTime = calculateReverberation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur Acoustique</CardTitle>
        <CardDescription>
          Calculs d'isolation acoustique, temps de réverbération et performance acoustique
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="airborne">Isolation acoustique</TabsTrigger>
            <TabsTrigger value="reverberation">Réverbération</TabsTrigger>
          </TabsList>
          
          <TabsContent value="airborne" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="wallMaterial">Matériau du mur</Label>
                  <Select 
                    value={wallMaterial} 
                    onValueChange={setWallMaterial}
                  >
                    <SelectTrigger id="wallMaterial">
                      <SelectValue placeholder="Sélectionner un matériau" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brick_hollow">Brique creuse</SelectItem>
                      <SelectItem value="concrete">Béton</SelectItem>
                      <SelectItem value="aac_block">Béton cellulaire</SelectItem>
                      <SelectItem value="plasterboard">Plaque de plâtre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="wallThickness">Épaisseur du mur (mm)</Label>
                  <Select 
                    value={wallThickness} 
                    onValueChange={setWallThickness}
                  >
                    <SelectTrigger id="wallThickness">
                      <SelectValue placeholder="Sélectionner une épaisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {wallMaterial === 'plasterboard' ? (
                        <>
                          <SelectItem value="12.5">12,5 mm</SelectItem>
                          <SelectItem value="25">25 mm (double plaque)</SelectItem>
                          <SelectItem value="50">50 mm (double plaque + montants)</SelectItem>
                          <SelectItem value="75">75 mm (cloison complète)</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="100">100 mm</SelectItem>
                          <SelectItem value="150">150 mm</SelectItem>
                          <SelectItem value="200">200 mm</SelectItem>
                          <SelectItem value="250">250 mm</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={hasInsulation}
                    onChange={(e) => setHasInsulation(e.target.checked)}
                    id="hasInsulation"
                    className="h-4 w-4 rounded"
                  />
                  <Label htmlFor="hasInsulation">Isolation acoustique complémentaire</Label>
                </div>
                
                {hasInsulation && (
                  <>
                    <div>
                      <Label htmlFor="insulationType">Type d'isolation</Label>
                      <Select 
                        value={insulationType} 
                        onValueChange={setInsulationType}
                      >
                        <SelectTrigger id="insulationType">
                          <SelectValue placeholder="Sélectionner un isolant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mineral_wool">Laine de roche</SelectItem>
                          <SelectItem value="glass_wool">Laine de verre</SelectItem>
                          <SelectItem value="acoustic_panel">Panneau acoustique</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="insulationThickness">Épaisseur de l'isolant (mm)</Label>
                      <Select 
                        value={insulationThickness} 
                        onValueChange={setInsulationThickness}
                      >
                        <SelectTrigger id="insulationThickness">
                          <SelectValue placeholder="Sélectionner une épaisseur" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 mm</SelectItem>
                          <SelectItem value="45">45 mm</SelectItem>
                          <SelectItem value="60">60 mm</SelectItem>
                          <SelectItem value="100">100 mm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="rounded-md border p-4 mt-4 bg-slate-50">
              <h3 className="text-lg font-medium mb-3">Résultats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Indice d'affaiblissement acoustique Rw</p>
                  <p className="text-2xl font-semibold">{rwValue} dB</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Isolation acoustique standardisée DnT,A</p>
                  <p className="text-2xl font-semibold">{dntaValue} dB</p>
                  <p className="text-sm font-medium mt-1">
                    <span className={
                      dntaValue >= 53 ? "text-green-600" : 
                      dntaValue >= 43 ? "text-yellow-600" : 
                      "text-red-600"
                    }>
                      {getAcousticRating(dntaValue)}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 mt-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  La réglementation française exige un DnT,A ≥ 53 dB entre logements et ≥ 43 dB entre pièces d'un même logement.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Télécharger le rapport
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="reverberation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="roomLength">Longueur (m)</Label>
                <Input 
                  id="roomLength"
                  type="number" 
                  step="0.1"
                  value={roomLength} 
                  onChange={(e) => setRoomLength(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="roomWidth">Largeur (m)</Label>
                <Input 
                  id="roomWidth"
                  type="number" 
                  step="0.1"
                  value={roomWidth} 
                  onChange={(e) => setRoomWidth(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="roomHeight">Hauteur (m)</Label>
                <Input 
                  id="roomHeight"
                  type="number" 
                  step="0.1"
                  value={roomHeight} 
                  onChange={(e) => setRoomHeight(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Surfaces et matériaux</h3>
                <Button 
                  onClick={addSurface} 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une surface
                </Button>
              </div>
              
              <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium">
                <div className="col-span-5">Matériau</div>
                <div className="col-span-3">Surface (m²)</div>
                <div className="col-span-3">Coef. d'absorption</div>
                <div className="col-span-1"></div>
              </div>
              
              <div className="space-y-3">
                {surfaces.map((surface) => (
                  <div key={surface.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <Select 
                        value={surface.material} 
                        onValueChange={(value) => updateSurface(surface.id, 'material', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un matériau" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="plaster">Plâtre</SelectItem>
                          <SelectItem value="brick">Brique</SelectItem>
                          <SelectItem value="concrete">Béton</SelectItem>
                          <SelectItem value="wood">Bois</SelectItem>
                          <SelectItem value="glass">Verre</SelectItem>
                          <SelectItem value="carpet">Moquette</SelectItem>
                          <SelectItem value="acoustic_panel">Panneau acoustique</SelectItem>
                          <SelectItem value="heavy_curtain">Rideau lourd</SelectItem>
                          <SelectItem value="vinyl_floor">Sol vinyle</SelectItem>
                          <SelectItem value="wooden_floor">Parquet</SelectItem>
                          <SelectItem value="audience">Audience (personnes)</SelectItem>
                          <SelectItem value="mineral_wool">Laine minérale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="col-span-3">
                      <Input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={surface.area}
                        onChange={(e) => updateSurface(surface.id, 'area', e.target.value)}
                        placeholder="Surface (m²)"
                      />
                    </div>
                    
                    <div className="col-span-3">
                      <Input
                        type="number"
                        step="0.01"
                        min="0.01"
                        max="1"
                        value={surface.absorption}
                        onChange={(e) => updateSurface(surface.id, 'absorption', e.target.value)}
                        placeholder="Coefficient"
                      />
                    </div>
                    
                    <div className="col-span-1 flex justify-center">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeSurface(surface.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-md border p-4 mt-4 bg-slate-50">
              <h3 className="text-lg font-medium mb-3">Résultats</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Temps de réverbération (Sabine)</p>
                  <p className="text-2xl font-semibold">{reverbTime.toFixed(2)} s</p>
                  <p className="text-sm font-medium mt-1">
                    <span className={
                      reverbTime < 0.8 ? "text-green-600" : 
                      reverbTime < 1.8 ? "text-yellow-600" : 
                      "text-red-600"
                    }>
                      {getReverbRating(reverbTime)}
                    </span>
                  </p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Volume de la pièce</p>
                  <p className="text-lg font-medium">
                    {(parseFloat(roomLength) * parseFloat(roomWidth) * parseFloat(roomHeight)).toFixed(1)} m³
                  </p>
                </div>
                
                <div className="flex items-start gap-2 mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                  <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <p>
                    Valeurs recommandées: Chambre/bureau: 0,5-0,8s, Salon: 0,6-1,0s, Salle de classe: 0,6-1,0s, Restaurant: 0,8-1,5s, Salle de conférence: 0,6-1,1s
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Télécharger le rapport
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Ce calculateur est basé sur les normes NF EN ISO 16283, NF EN ISO 717-1 et NF S 31-080.
      </CardFooter>
    </Card>
  );
};

export default AcousticInsulationCalculator;
