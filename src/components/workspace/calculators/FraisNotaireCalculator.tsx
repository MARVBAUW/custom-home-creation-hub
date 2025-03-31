
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const FraisNotaireCalculator: React.FC = () => {
  const [prixAchat, setPrixAchat] = useState<number>(200000);
  const [fraisNotaire, setFraisNotaire] = useState<number>(0);

  // Calcul simplifié des frais de notaire
  const calculerFraisNotaire = () => {
    const taux = prixAchat > 100000 ? 0.08 : 0.1;
    return Math.round(prixAchat * taux);
  };

  const handleCalculer = () => {
    setFraisNotaire(calculerFraisNotaire());
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Calculateur de Frais de Notaire
        </CardTitle>
        <CardDescription>
          Estimez les frais de notaire pour votre acquisition immobilière
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="prixAchat">Prix d'achat du bien (€)</Label>
          <Input
            id="prixAchat"
            type="number"
            value={prixAchat}
            onChange={(e) => setPrixAchat(Number(e.target.value))}
          />
        </div>
        
        <Button onClick={handleCalculer} className="w-full">Calculer les frais</Button>
        
        {fraisNotaire > 0 && (
          <div className="p-4 bg-muted rounded-md mt-4">
            <h3 className="text-lg font-medium mb-2">Résultat</h3>
            <p>
              Pour un bien à <span className="font-bold">{prixAchat.toLocaleString('fr-FR')} €</span>,
              les frais de notaire sont estimés à <span className="font-bold">{fraisNotaire.toLocaleString('fr-FR')} €</span>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Soit environ {((fraisNotaire / prixAchat) * 100).toFixed(1)}% du prix d'achat
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FraisNotaireCalculator;
