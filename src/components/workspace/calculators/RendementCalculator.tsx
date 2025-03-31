
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Percent } from "lucide-react";

const RendementCalculator: React.FC = () => {
  const [investissement, setInvestissement] = useState<number>(100000);
  const [revenuAnnuel, setRevenuAnnuel] = useState<number>(10000);
  const [charges, setCharges] = useState<number>(2000);
  const [impots, setImpots] = useState<number>(1000);

  const rendementBrut = (revenuAnnuel / investissement) * 100;
  const rendementNet = ((revenuAnnuel - charges - impots) / investissement) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Percent className="h-5 w-5 text-primary" />
          Calculateur de Rendement
        </CardTitle>
        <CardDescription>
          Calculez le rendement brut et net de votre investissement
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="investissement">Montant de l'investissement (€)</Label>
          <Input
            id="investissement"
            type="number"
            value={investissement}
            onChange={(e) => setInvestissement(Number(e.target.value))}
          />
        </div>
        
        <div>
          <Label htmlFor="revenuAnnuel">Revenu annuel (€)</Label>
          <Input
            id="revenuAnnuel"
            type="number"
            value={revenuAnnuel}
            onChange={(e) => setRevenuAnnuel(Number(e.target.value))}
          />
        </div>
        
        <div>
          <Label htmlFor="charges">Charges annuelles (€)</Label>
          <Input
            id="charges"
            type="number"
            value={charges}
            onChange={(e) => setCharges(Number(e.target.value))}
          />
        </div>
        
        <div>
          <Label htmlFor="impots">Impôts annuels (€)</Label>
          <Input
            id="impots"
            type="number"
            value={impots}
            onChange={(e) => setImpots(Number(e.target.value))}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">Rendement Brut</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold text-primary">{rendementBrut.toFixed(2)}%</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">Rendement Net</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold text-primary">{rendementNet.toFixed(2)}%</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default RendementCalculator;
