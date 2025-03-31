
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Volume2 } from "lucide-react";

const AcoustiqueCalculator: React.FC = () => {
  const [surfacePiece, setSurfacePiece] = useState<number>(20);
  const [hauteurPiece, setHauteurPiece] = useState<number>(2.5);
  const [typeMur, setTypeMur] = useState<string>("brique");
  const [typeRevetement, setTypeRevetement] = useState<string>("peinture");
  const [tempReverberation, setTempReverberation] = useState<number | null>(null);

  const handleCalculer = () => {
    // Coefficients d'absorption acoustique simplifiés
    const coefficients = {
      brique: { peinture: 0.02, papierPeint: 0.03, boiserie: 0.15 },
      beton: { peinture: 0.01, papierPeint: 0.02, boiserie: 0.12 },
      placoplatre: { peinture: 0.05, papierPeint: 0.06, boiserie: 0.17 },
    };
    
    // Calcul de la surface totale des murs
    const perimetre = Math.sqrt(surfacePiece) * 4;
    const surfaceMurs = perimetre * hauteurPiece;
    const surfaceSol = surfacePiece;
    const surfacePlafond = surfacePiece;
    const volumePiece = surfacePiece * hauteurPiece;
    
    // Coefficient moyen d'absorption
    const coefficient = coefficients[typeMur as keyof typeof coefficients][typeRevetement as keyof typeof coefficients.brique];
    
    // Formule de Sabine: TR = 0.161 * V / (A * α)
    // où TR = temps de réverbération, V = volume, A = surface totale, α = coefficient d'absorption
    const tempsReverberation = 0.161 * volumePiece / (
      (surfaceMurs + surfaceSol + surfacePlafond) * coefficient
    );
    
    setTempReverberation(Math.round(tempsReverberation * 100) / 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="h-5 w-5 text-primary" />
          Calculateur Acoustique
        </CardTitle>
        <CardDescription>
          Estimation du temps de réverbération dans une pièce
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="surfacePiece">Surface de la pièce (m²)</Label>
            <Input
              id="surfacePiece"
              type="number"
              value={surfacePiece}
              onChange={(e) => setSurfacePiece(Number(e.target.value))}
            />
          </div>
          
          <div>
            <Label htmlFor="hauteurPiece">Hauteur sous plafond (m)</Label>
            <Input
              id="hauteurPiece"
              type="number"
              step="0.1"
              value={hauteurPiece}
              onChange={(e) => setHauteurPiece(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="typeMur">Type de mur</Label>
            <Select value={typeMur} onValueChange={setTypeMur}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type de mur" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brique">Brique</SelectItem>
                <SelectItem value="beton">Béton</SelectItem>
                <SelectItem value="placoplatre">Placo / Plâtre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="typeRevetement">Revêtement mural</Label>
            <Select value={typeRevetement} onValueChange={setTypeRevetement}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le revêtement" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="peinture">Peinture</SelectItem>
                <SelectItem value="papierPeint">Papier peint</SelectItem>
                <SelectItem value="boiserie">Boiserie</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button onClick={handleCalculer} className="w-full">Calculer</Button>
        
        {tempReverberation !== null && (
          <div className="p-4 bg-muted rounded-md mt-4">
            <h3 className="text-lg font-medium mb-2">Résultat</h3>
            <p>
              Le temps de réverbération estimé est de <span className="font-bold">{tempReverberation} secondes</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {tempReverberation > 1 
                ? "Cette valeur est élevée, ce qui peut rendre l'acoustique de la pièce trop réverbérante."
                : "Cette valeur est dans la norme pour une bonne acoustique."}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AcoustiqueCalculator;
