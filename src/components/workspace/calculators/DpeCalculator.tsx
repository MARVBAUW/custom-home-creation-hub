
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Thermometer, Upload } from "lucide-react";

const DpeCalculator: React.FC = () => {
  const [surfaceHabitable, setSurfaceHabitable] = useState<number>(100);
  const [consommationEnergie, setConsommationEnergie] = useState<number>(200);
  const [emissionGES, setEmissionGES] = useState<number>(30);
  const [classeEnergetique, setClasseEnergetique] = useState<string>("");
  const [classeGES, setClasseGES] = useState<string>("");
  const [numeroDpe, setNumeroDpe] = useState<string>("");
  const [resultatRecherche, setResultatRecherche] = useState<boolean>(false);

  // Calculer la classe énergétique
  const calculerClasseEnergetique = (consommation: number) => {
    if (consommation <= 70) return "A";
    if (consommation <= 110) return "B";
    if (consommation <= 180) return "C";
    if (consommation <= 250) return "D";
    if (consommation <= 330) return "E";
    if (consommation <= 420) return "F";
    return "G";
  };

  // Calculer la classe des émissions de gaz à effet de serre
  const calculerClasseGES = (emission: number) => {
    if (emission <= 6) return "A";
    if (emission <= 11) return "B";
    if (emission <= 30) return "C";
    if (emission <= 50) return "D";
    if (emission <= 70) return "E";
    if (emission <= 100) return "F";
    return "G";
  };

  const handleCalculer = () => {
    setClasseEnergetique(calculerClasseEnergetique(consommationEnergie));
    setClasseGES(calculerClasseGES(emissionGES));
  };

  const handleRechercherDPE = () => {
    // Simuler une recherche
    setResultatRecherche(true);
    const valeurAléatoireEnergie = Math.floor(Math.random() * 400) + 50;
    const valeurAléatoireGES = Math.floor(Math.random() * 80) + 5;
    
    setConsommationEnergie(valeurAléatoireEnergie);
    setEmissionGES(valeurAléatoireGES);
    setClasseEnergetique(calculerClasseEnergetique(valeurAléatoireEnergie));
    setClasseGES(calculerClasseGES(valeurAléatoireGES));
  };

  const getClasseColor = (classe: string) => {
    const colors: Record<string, string> = {
      A: "bg-green-500",
      B: "bg-green-400",
      C: "bg-green-300",
      D: "bg-yellow-400",
      E: "bg-orange-400",
      F: "bg-red-400",
      G: "bg-red-600"
    };
    return colors[classe] || "bg-gray-300";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-primary" />
          Simulateur DPE
        </CardTitle>
        <CardDescription>
          Diagnostic de Performance Énergétique et calcul des émissions de GES
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manuel">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manuel">Simulation Manuelle</TabsTrigger>
            <TabsTrigger value="recherche">Recherche DPE</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manuel" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="surfaceHabitable">Surface habitable (m²)</Label>
                <Input
                  id="surfaceHabitable"
                  type="number"
                  value={surfaceHabitable}
                  onChange={(e) => setSurfaceHabitable(Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="consommationEnergie">Consommation d'énergie (kWh/m²/an)</Label>
                <Input
                  id="consommationEnergie"
                  type="number"
                  value={consommationEnergie}
                  onChange={(e) => setConsommationEnergie(Number(e.target.value))}
                />
              </div>
              
              <div>
                <Label htmlFor="emissionGES">Émissions GES (kg CO₂/m²/an)</Label>
                <Input
                  id="emissionGES"
                  type="number"
                  value={emissionGES}
                  onChange={(e) => setEmissionGES(Number(e.target.value))}
                />
              </div>
            </div>
            
            <Button onClick={handleCalculer} className="w-full">Calculer DPE</Button>
            
            {classeEnergetique && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Classe Énergétique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold text-white p-3 rounded-lg text-center ${getClasseColor(classeEnergetique)}`}>
                      {classeEnergetique}
                    </div>
                    <p className="mt-2 text-sm text-center">
                      {consommationEnergie} kWh/m²/an
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Classe GES</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-4xl font-bold text-white p-3 rounded-lg text-center ${getClasseColor(classeGES)}`}>
                      {classeGES}
                    </div>
                    <p className="mt-2 text-sm text-center">
                      {emissionGES} kg CO₂/m²/an
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recherche" className="space-y-4 pt-4">
            <div>
              <Label htmlFor="numeroDpe">Numéro de DPE</Label>
              <div className="flex gap-2">
                <Input
                  id="numeroDpe"
                  placeholder="Ex: 2275E0123456"
                  value={numeroDpe}
                  onChange={(e) => setNumeroDpe(e.target.value)}
                />
                <Button type="button" onClick={handleRechercherDPE}>
                  Rechercher
                </Button>
              </div>
            </div>
            
            <div className="text-center p-4 border border-dashed rounded-md">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">
                Ou déposez un fichier DPE ici
              </p>
            </div>
            
            {resultatRecherche && (
              <div className="p-4 bg-muted rounded-md mt-4">
                <h3 className="text-lg font-medium mb-4">Résultats pour DPE #{numeroDpe}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Classe Énergétique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-4xl font-bold text-white p-3 rounded-lg text-center ${getClasseColor(classeEnergetique)}`}>
                        {classeEnergetique}
                      </div>
                      <p className="mt-2 text-sm text-center">
                        {consommationEnergie} kWh/m²/an
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Classe GES</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`text-4xl font-bold text-white p-3 rounded-lg text-center ${getClasseColor(classeGES)}`}>
                        {classeGES}
                      </div>
                      <p className="mt-2 text-sm text-center">
                        {emissionGES} kg CO₂/m²/an
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Recommandations de rénovation</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="p-2 bg-white rounded">Isolation des combles: économie potentielle de 15%</li>
                    <li className="p-2 bg-white rounded">Remplacement des fenêtres: économie potentielle de 10%</li>
                    <li className="p-2 bg-white rounded">Installation d'une pompe à chaleur: économie potentielle de 25%</li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DpeCalculator;
