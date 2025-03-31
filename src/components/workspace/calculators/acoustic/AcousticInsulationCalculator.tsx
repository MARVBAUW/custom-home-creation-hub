
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Volume } from 'lucide-react';
import { toast } from "sonner";

const AcousticInsulationCalculator = () => {
  const [wallType, setWallType] = useState("brick");
  const [wallThickness, setWallThickness] = useState(200);
  const [hasInsulation, setHasInsulation] = useState(false);
  const [insulationType, setInsulationType] = useState("mineral_wool");
  const [insulationThickness, setInsulationThickness] = useState(45);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${name} téléchargé avec succès`);
      setDownloadingId(null);
    }, 1500);
  };

  // Calculate acoustic insulation in dB
  const calculateAcousticInsulation = () => {
    // Simplified calculation
    let baseInsulation = 0;
    
    // Base insulation based on wall type and thickness
    if (wallType === "brick") {
      baseInsulation = 37 + (wallThickness / 100);
    } else if (wallType === "concrete") {
      baseInsulation = 40 + (wallThickness / 80);
    } else if (wallType === "drywall") {
      baseInsulation = 33 + (wallThickness / 120);
    } else if (wallType === "wood") {
      baseInsulation = 30 + (wallThickness / 150);
    }
    
    // Additional insulation if present
    if (hasInsulation) {
      let insulationBonus = 0;
      
      if (insulationType === "mineral_wool") {
        insulationBonus = 5 + (insulationThickness / 20);
      } else if (insulationType === "glass_wool") {
        insulationBonus = 4 + (insulationThickness / 25);
      } else if (insulationType === "acoustic_panel") {
        insulationBonus = 7 + (insulationThickness / 15);
      }
      
      baseInsulation += insulationBonus;
    }
    
    return Math.min(Math.round(baseInsulation), 72); // Cap at realistic maximum
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur d'isolation acoustique</CardTitle>
        <CardDescription>
          Estimez l'indice d'affaiblissement acoustique d'une paroi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wall-type">Type de paroi</Label>
            <Select value={wallType} onValueChange={setWallType}>
              <SelectTrigger id="wall-type">
                <SelectValue placeholder="Sélectionner un type de paroi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brick">Brique</SelectItem>
                <SelectItem value="concrete">Béton</SelectItem>
                <SelectItem value="drywall">Plaque de plâtre</SelectItem>
                <SelectItem value="wood">Bois</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wall-thickness">Épaisseur de la paroi (mm)</Label>
            <Input
              id="wall-thickness"
              type="number"
              min={10}
              max={500}
              value={wallThickness}
              onChange={(e) => setWallThickness(parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="has-insulation"
                checked={hasInsulation}
                onChange={(e) => setHasInsulation(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="has-insulation">Avec isolation acoustique</Label>
            </div>
          </div>

          {hasInsulation && (
            <>
              <div className="space-y-2">
                <Label htmlFor="insulation-type">Type d'isolation</Label>
                <Select value={insulationType} onValueChange={setInsulationType}>
                  <SelectTrigger id="insulation-type">
                    <SelectValue placeholder="Sélectionner un type d'isolation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mineral_wool">Laine de roche</SelectItem>
                    <SelectItem value="glass_wool">Laine de verre</SelectItem>
                    <SelectItem value="acoustic_panel">Panneau acoustique</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insulation-thickness">Épaisseur de l'isolation (mm)</Label>
                <Input
                  id="insulation-thickness"
                  type="number"
                  min={10}
                  max={200}
                  value={insulationThickness}
                  onChange={(e) => setInsulationThickness(parseInt(e.target.value))}
                />
              </div>
            </>
          )}

          <div className="pt-4 border-t">
            <div className="flex flex-col items-center">
              <Label className="text-sm text-gray-500 mb-2">Indice d'affaiblissement acoustique estimé</Label>
              <div className="flex items-center">
                <Volume className="h-6 w-6 mr-2 text-primary" />
                <span className="text-2xl font-bold">{calculateAcousticInsulation()} dB</span>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                Cette estimation est donnée à titre indicatif et peut varier selon la mise en œuvre.
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="secondary"
          onClick={() => handleDownload('acoustic-guide', 'Guide acoustique')}
          disabled={downloadingId === 'acoustic-guide'}
        >
          {downloadingId === 'acoustic-guide' ? (
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

export default AcousticInsulationCalculator;
