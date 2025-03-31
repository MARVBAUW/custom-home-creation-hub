
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Download, AlertCircle } from 'lucide-react';
import { toast } from "sonner";

const FireEscapeCalculator = () => {
  const [buildingType, setBuildingType] = useState("habitation");
  const [buildingHeight, setBuildingHeight] = useState(15);
  const [floorArea, setFloorArea] = useState(500);
  const [occupantCount, setOccupantCount] = useState(50);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${name} téléchargé avec succès`);
      setDownloadingId(null);
    }, 1500);
  };

  // Calculate maximum evacuation distance
  const calculateMaxEvacuationDistance = () => {
    let baseDistance = 0;
    
    // Base distance based on building type
    if (buildingType === "habitation") {
      baseDistance = 30;
    } else if (buildingType === "bureau") {
      baseDistance = 40;
    } else if (buildingType === "erp") {
      baseDistance = 25;
    } else if (buildingType === "industriel") {
      baseDistance = 35;
    }
    
    // Adjust based on building height
    if (buildingHeight > 28) {
      baseDistance *= 0.8; // Reduce for high buildings
    }
    
    // Adjust based on occupant count
    if (occupantCount > 100) {
      baseDistance *= 0.9; // Reduce for high occupancy
    }
    
    return Math.round(baseDistance);
  };

  // Calculate number of required exits
  const calculateRequiredExits = () => {
    if (occupantCount <= 20) return 1;
    if (occupantCount <= 100) return 2;
    if (occupantCount <= 500) return 2 + Math.floor((occupantCount - 100) / 100);
    return 2 + Math.floor((occupantCount - 100) / 200);
  };

  // Calculate minimum exit width (in units)
  const calculateMinExitWidth = () => {
    let baseWidth = 0;
    
    if (buildingType === "habitation") {
      baseWidth = Math.ceil(occupantCount / 100);
    } else if (buildingType === "bureau") {
      baseWidth = Math.ceil(occupantCount / 100);
    } else if (buildingType === "erp") {
      baseWidth = Math.ceil(occupantCount / 50);
    } else if (buildingType === "industriel") {
      baseWidth = Math.ceil(occupantCount / 80);
    }
    
    return Math.max(baseWidth, 2); // Minimum 2 units
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur d'évacuation incendie</CardTitle>
        <CardDescription>
          Estimez les distances d'évacuation et le nombre de sorties nécessaires
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="building-type">Type de bâtiment</Label>
            <Select value={buildingType} onValueChange={setBuildingType}>
              <SelectTrigger id="building-type">
                <SelectValue placeholder="Sélectionner un type de bâtiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="habitation">Habitation</SelectItem>
                <SelectItem value="bureau">Bureau</SelectItem>
                <SelectItem value="erp">ERP (Établissement Recevant du Public)</SelectItem>
                <SelectItem value="industriel">Bâtiment industriel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="building-height">Hauteur du bâtiment (m)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="building-height"
                min={3} 
                max={50} 
                step={1}
                value={[buildingHeight]} 
                onValueChange={(value) => setBuildingHeight(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right font-medium">{buildingHeight} m</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="floor-area">Surface de plancher (m²)</Label>
            <Input
              id="floor-area"
              type="number"
              min={10}
              max={10000}
              value={floorArea}
              onChange={(e) => setFloorArea(parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupant-count">Nombre d'occupants</Label>
            <Input
              id="occupant-count"
              type="number"
              min={1}
              max={5000}
              value={occupantCount}
              onChange={(e) => setOccupantCount(parseInt(e.target.value))}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Distance maximale d'évacuation :</span>
                <span className="font-bold">{calculateMaxEvacuationDistance()} m</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Nombre de sorties requises :</span>
                <span className="font-bold">{calculateRequiredExits()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Largeur minimale des sorties :</span>
                <span className="font-bold">{calculateMinExitWidth()} UP ({calculateMinExitWidth() * 0.6} m)</span>
              </div>
              
              <div className="flex items-start gap-2 mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-700">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>Ces calculs sont fournis à titre indicatif. La réglementation incendie doit être vérifiée précisément selon le type d'établissement et son classement.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="secondary"
          onClick={() => handleDownload('fire-guide', 'Guide incendie')}
          disabled={downloadingId === 'fire-guide'}
        >
          {downloadingId === 'fire-guide' ? (
            <span className="flex items-center">Téléchargement...</span>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Télécharger le guide
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FireEscapeCalculator;
