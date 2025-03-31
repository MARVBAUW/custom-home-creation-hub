
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertCircle, Download } from 'lucide-react';
import { toast } from "sonner";

const HygrometryCalculator = () => {
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(60);
  const [surfaceTemperature, setSurfaceTemperature] = useState(16);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Calculate dew point temperature (simplified Magnus formula)
  const calculateDewPoint = () => {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return Math.round(dewPoint * 100) / 100;
  };

  // Calculate condensation risk
  const isCondensationRisk = () => {
    const dewPoint = calculateDewPoint();
    return surfaceTemperature < dewPoint;
  };

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${name} téléchargé avec succès`);
      setDownloadingId(null);
    }, 1500);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur de point de rosée</CardTitle>
        <CardDescription>
          Déterminez le point de rosée et le risque de condensation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="temperature">Température ambiante (°C)</Label>
            <Input
              id="temperature"
              type="number"
              min={0}
              max={40}
              step={0.1}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="humidity">Humidité relative (%)</Label>
            <div className="flex items-center gap-4">
              <Slider 
                id="humidity"
                min={0} 
                max={100} 
                step={1}
                value={[humidity]} 
                onValueChange={(value) => setHumidity(value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right font-medium">{humidity} %</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="surface-temp">Température de surface (°C)</Label>
            <Input
              id="surface-temp"
              type="number"
              min={0}
              max={40}
              step={0.1}
              value={surfaceTemperature}
              onChange={(e) => setSurfaceTemperature(parseFloat(e.target.value))}
            />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Point de rosée :</span>
              <span className="font-bold">{calculateDewPoint()} °C</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium">Risque de condensation :</span>
              <span className={isCondensationRisk() ? "font-bold text-red-500" : "font-bold text-green-500"}>
                {isCondensationRisk() ? "OUI" : "NON"}
              </span>
            </div>
            
            {isCondensationRisk() && (
              <div className="flex items-start gap-2 mt-3 p-2 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>La température de surface est inférieure au point de rosée, ce qui entraîne un risque de condensation.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          variant="secondary"
          onClick={() => handleDownload('hygro-guide', 'Guide hygrométrie')}
          disabled={downloadingId === 'hygro-guide'}
        >
          {downloadingId === 'hygro-guide' ? (
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

export default HygrometryCalculator;
