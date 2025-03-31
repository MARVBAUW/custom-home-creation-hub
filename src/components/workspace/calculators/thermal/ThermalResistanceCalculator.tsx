
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X, Download, Info } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

const MaterialRow = ({ 
  material, 
  thickness, 
  lambda, 
  onMaterialChange, 
  onThicknessChange, 
  onLambdaChange, 
  onRemove,
  materialsDatabase
}: {
  material: string;
  thickness: string;
  lambda: string;
  onMaterialChange: (value: string) => void;
  onThicknessChange: (value: string) => void;
  onLambdaChange: (value: string) => void;
  onRemove: () => void;
  materialsDatabase: Record<string, number>;
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 items-center">
      <div className="col-span-5">
        <Select 
          value={material} 
          onValueChange={(value) => {
            onMaterialChange(value);
            // Update lambda automatically when material is selected
            if (materialsDatabase[value]) {
              onLambdaChange(materialsDatabase[value].toString());
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un matériau" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(materialsDatabase).map((mat) => (
              <SelectItem key={mat} value={mat}>
                {mat}
              </SelectItem>
            ))}
            <SelectItem value="custom">Personnalisé</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="col-span-3">
        <Input
          type="number"
          step="0.001"
          min="0.001"
          value={thickness}
          onChange={(e) => onThicknessChange(e.target.value)}
          placeholder="Épaisseur (m)"
        />
      </div>
      
      <div className="col-span-3">
        <Input
          type="number"
          step="0.001"
          min="0.001"
          value={lambda}
          onChange={(e) => onLambdaChange(e.target.value)}
          placeholder="λ (W/m.K)"
          disabled={material !== "custom"}
        />
      </div>
      
      <div className="col-span-1 flex justify-center">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const ThermalResistanceCalculator = () => {
  const { toast } = useToast();
  
  // Base de données des matériaux avec leur conductivité thermique (λ)
  const materialsDatabase: Record<string, number> = {
    "Béton lourd": 1.65,
    "Béton cellulaire": 0.11,
    "Brique pleine": 0.8,
    "Brique creuse": 0.4,
    "Laine de verre": 0.04,
    "Laine de roche": 0.038,
    "Polystyrène expansé": 0.036,
    "Polystyrène extrudé": 0.033,
    "Polyuréthane": 0.025,
    "Bois (sapin, épicéa)": 0.13,
    "Plaque de plâtre": 0.25,
    "Enduit ciment": 1.15,
    "Enduit plâtre": 0.35,
    "Fibre de bois": 0.05,
    "Liège": 0.04,
    "Paille": 0.055,
    "Verre": 1.0,
    "Terre cuite": 0.7,
    "Parpaing": 0.9
  };
  
  type Layer = {
    id: string;
    material: string;
    thickness: string;
    lambda: string;
  };
  
  const [layers, setLayers] = useState<Layer[]>([
    { id: "1", material: "Béton lourd", thickness: "0.2", lambda: "1.65" },
    { id: "2", material: "Polystyrène expansé", thickness: "0.1", lambda: "0.036" },
    { id: "3", material: "Plaque de plâtre", thickness: "0.013", lambda: "0.25" }
  ]);
  
  const [rsi, setRsi] = useState("0.13");
  const [rse, setRse] = useState("0.04");
  
  const addLayer = () => {
    const newId = String(layers.length + 1);
    setLayers([...layers, { 
      id: newId, 
      material: "custom", 
      thickness: "0.05", 
      lambda: "0.05" 
    }]);
  };
  
  const removeLayer = (id: string) => {
    if (layers.length > 1) {
      setLayers(layers.filter(layer => layer.id !== id));
    } else {
      toast({
        title: "Erreur",
        description: "Vous devez conserver au moins une couche de matériau.",
        variant: "destructive"
      });
    }
  };
  
  const updateLayer = (id: string, field: keyof Layer, value: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, [field]: value } : layer
    ));
  };
  
  // Calcul de la résistance thermique
  const calculateThermalResistance = (): number => {
    let totalR = Number(rsi) + Number(rse);
    
    layers.forEach(layer => {
      const thickness = parseFloat(layer.thickness);
      const lambda = parseFloat(layer.lambda);
      
      if (!isNaN(thickness) && !isNaN(lambda) && lambda !== 0) {
        totalR += thickness / lambda;
      }
    });
    
    return totalR;
  };
  
  // Calcul du coefficient U
  const calculateUValue = (): number => {
    const r = calculateThermalResistance();
    return r > 0 ? 1 / r : 0;
  };
  
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport est en cours de téléchargement."
    });
  };
  
  const getThermalPerformanceRating = (uValue: number): string => {
    if (uValue <= 0.15) return "Excellent (standard passif)";
    if (uValue <= 0.25) return "Très bon (RT 2020)";
    if (uValue <= 0.36) return "Bon (RT 2012)";
    if (uValue <= 0.5) return "Moyen";
    return "Faible";
  };
  
  const thermalResistance = calculateThermalResistance();
  const uValue = calculateUValue();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Résistance Thermique & Coefficient U</CardTitle>
        <CardDescription>
          Calculez la résistance thermique et le coefficient de transmission thermique d'une paroi multi-couches
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Composition de la paroi</h3>
            <Button 
              onClick={addLayer} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Ajouter une couche
            </Button>
          </div>
          
          <div className="grid grid-cols-12 gap-2 mb-2 text-sm font-medium">
            <div className="col-span-5">Matériau</div>
            <div className="col-span-3">Épaisseur (m)</div>
            <div className="col-span-3">λ (W/m.K)</div>
            <div className="col-span-1"></div>
          </div>
          
          <div className="space-y-3">
            {layers.map((layer) => (
              <MaterialRow
                key={layer.id}
                material={layer.material}
                thickness={layer.thickness}
                lambda={layer.lambda}
                onMaterialChange={(value) => updateLayer(layer.id, 'material', value)}
                onThicknessChange={(value) => updateLayer(layer.id, 'thickness', value)}
                onLambdaChange={(value) => updateLayer(layer.id, 'lambda', value)}
                onRemove={() => removeLayer(layer.id)}
                materialsDatabase={materialsDatabase}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rsi">Résistance thermique superficielle intérieure Rsi (m².K/W)</Label>
            <Input 
              id="rsi" 
              type="number" 
              step="0.01" 
              min="0"
              value={rsi} 
              onChange={(e) => setRsi(e.target.value)} 
            />
          </div>
          
          <div>
            <Label htmlFor="rse">Résistance thermique superficielle extérieure Rse (m².K/W)</Label>
            <Input 
              id="rse" 
              type="number" 
              step="0.01" 
              min="0"
              value={rse} 
              onChange={(e) => setRse(e.target.value)} 
            />
          </div>
        </div>
        
        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
          <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p>
            <strong>Valeurs courantes de Rsi et Rse :</strong><br/>
            - Paroi verticale : Rsi = 0,13 m².K/W, Rse = 0,04 m².K/W<br/>
            - Paroi horizontale, flux ascendant : Rsi = 0,10 m².K/W, Rse = 0,04 m².K/W<br/>
            - Paroi horizontale, flux descendant : Rsi = 0,17 m².K/W, Rse = 0,04 m².K/W
          </p>
        </div>
        
        <div className="rounded-md border p-5 bg-slate-50">
          <h3 className="text-lg font-medium mb-4">Résultats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Résistance thermique totale</p>
              <p className="text-2xl font-semibold">{thermalResistance.toFixed(2)} m².K/W</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Coefficient de transmission U</p>
              <p className="text-2xl font-semibold">{uValue.toFixed(3)} W/(m².K)</p>
              <p className="text-sm font-medium mt-1">
                Performance: <span className={
                  uValue <= 0.25 ? "text-green-600" : 
                  uValue <= 0.36 ? "text-yellow-600" : 
                  "text-red-600"
                }>
                  {getThermalPerformanceRating(uValue)}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Télécharger le rapport
          </Button>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Ce calculateur est basé sur les méthodes de calcul définies par la norme EN ISO 6946.
      </CardFooter>
    </Card>
  );
};

export default ThermalResistanceCalculator;
