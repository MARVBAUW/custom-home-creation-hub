
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Download, AlertCircle, Info } from 'lucide-react';
import { toast } from "sonner";

const AccessibilityRampCalculator = () => {
  const [heightDifference, setHeightDifference] = useState(40);
  const [isPublicBuilding, setIsPublicBuilding] = useState(true);
  const [hasAssistance, setHasAssistance] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  // Calculated values
  const [slope, setSlope] = useState(0);
  const [requiredLength, setRequiredLength] = useState(0);
  const [needsPlatform, setNeedsPlatform] = useState(false);
  const [platformCount, setPlatformCount] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${name} téléchargé avec succès`);
      setDownloadingId(null);
    }, 1500);
  };

  // Calculate ramp specifications based on inputs
  useEffect(() => {
    let maxSlope = 0;
    
    // Determine maximum allowed slope based on building type and assistance
    if (isPublicBuilding) {
      // Public building (ERP)
      if (heightDifference <= 20) {
        maxSlope = 10; // 10%
      } else {
        maxSlope = 5; // 5%
      }
    } else {
      // Residential building
      if (hasAssistance) {
        maxSlope = 10; // 10% with assistance
      } else {
        maxSlope = 6; // 6% without assistance
      }
    }
    
    // Calculate required length based on height difference and max slope
    const calculatedLength = (heightDifference / maxSlope) * 100;
    
    // Determine if platforms are needed (every 10m for public buildings)
    const needsPlat = isPublicBuilding && calculatedLength > 1000;
    const platformNum = needsPlat ? Math.floor(calculatedLength / 1000) : 0;
    
    // Calculate total length including platforms (each platform is 140cm long)
    const totalLen = calculatedLength + (platformNum * 140);
    
    setSlope(maxSlope);
    setRequiredLength(Math.ceil(calculatedLength));
    setNeedsPlatform(needsPlat);
    setPlatformCount(platformNum);
    setTotalLength(Math.ceil(totalLen));
  }, [heightDifference, isPublicBuilding, hasAssistance]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur de rampe PMR</CardTitle>
        <CardDescription>
          Déterminez les dimensions d'une rampe d'accès pour personnes à mobilité réduite
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height-difference">Différence de hauteur (cm)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="height-difference"
                min={1} 
                max={200} 
                step={1}
                value={[heightDifference]} 
                onValueChange={(value) => setHeightDifference(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right font-medium">{heightDifference} cm</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="is-public-building">Établissement recevant du public (ERP)</Label>
              <Switch 
                id="is-public-building" 
                checked={isPublicBuilding}
                onCheckedChange={setIsPublicBuilding}
              />
            </div>
          </div>

          {!isPublicBuilding && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="has-assistance">Assistance disponible</Label>
                <Switch 
                  id="has-assistance" 
                  checked={hasAssistance}
                  onCheckedChange={setHasAssistance}
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Pente maximale autorisée :</span>
                <span className="font-bold">{slope}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Longueur de rampe minimale :</span>
                <span className="font-bold">{requiredLength} cm</span>
              </div>
              
              {needsPlatform && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Paliers de repos nécessaires :</span>
                  <span className="font-bold">{platformCount}</span>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Longueur totale (avec paliers) :</span>
                <span className="font-bold">{totalLength} cm</span>
              </div>
              
              <div className="flex items-start gap-2 mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Rappel des normes</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Largeur minimale de la rampe : 120 cm</li>
                    <li>Chasse-roues obligatoire (hauteur ≥ 5 cm)</li>
                    <li>Main courante recommandée (hauteur 90 cm)</li>
                    {needsPlatform && <li>Palier de repos tous les 10 m (dimensions min. 140 × 120 cm)</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="secondary"
          onClick={() => handleDownload('pmr-guide', 'Guide accessibilité PMR')}
          disabled={downloadingId === 'pmr-guide'}
        >
          {downloadingId === 'pmr-guide' ? (
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

export default AccessibilityRampCalculator;
