
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Calculator, Download, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { toast } from "sonner";

const LoadCombinationsCalculator = () => {
  // États pour les inputs
  const [projectType, setProjectType] = useState('building');
  const [loads, setLoads] = useState([
    { id: 1, type: 'G', name: 'Poids propre', value: 25.0, unit: 'kN/m²' },
    { id: 2, type: 'Q', name: 'Charge d\'exploitation', value: 2.5, unit: 'kN/m²' },
  ]);
  const [nextId, setNextId] = useState(3);
  
  // États pour les résultats
  const [combinations, setCombinations] = useState<any[]>([]);
  
  // Types de charges
  const loadTypes = [
    { value: 'G', label: 'G - Permanente' },
    { value: 'Q', label: 'Q - Variable' },
    { value: 'S', label: 'S - Neige' },
    { value: 'W', label: 'W - Vent' },
    { value: 'A', label: 'A - Accidentelle' },
    { value: 'E', label: 'E - Sismique' },
  ];
  
  // Gamma factors selon EC0
  const gammaFactors = {
    G: { favorable: 1.0, unfavorable: 1.35 },
    Q: { favorable: 0.0, unfavorable: 1.5 },
    S: { favorable: 0.0, unfavorable: 1.5 },
    W: { favorable: 0.0, unfavorable: 1.5 },
    A: { favorable: 1.0, unfavorable: 1.0 },
    E: { favorable: 1.0, unfavorable: 1.0 },
  };
  
  // Psi factors selon EC0
  const psiFactors = {
    Q: { psi0: 0.7, psi1: 0.5, psi2: 0.3 },
    S: { psi0: 0.6, psi1: 0.2, psi2: 0.0 },
    W: { psi0: 0.6, psi1: 0.2, psi2: 0.0 },
    A: { psi0: 1.0, psi1: 1.0, psi2: 1.0 },
    E: { psi0: 0.0, psi1: 0.0, psi2: 0.0 },
  };
  
  // Ajouter une nouvelle charge
  const addLoad = () => {
    setLoads([...loads, { id: nextId, type: 'G', name: 'Nouvelle charge', value: 0, unit: 'kN/m²' }]);
    setNextId(nextId + 1);
  };
  
  // Supprimer une charge
  const removeLoad = (id: number) => {
    setLoads(loads.filter(load => load.id !== id));
  };
  
  // Mettre à jour une charge
  const updateLoad = (id: number, field: string, value: any) => {
    setLoads(loads.map(load => 
      load.id === id ? { ...load, [field]: value } : load
    ));
  };
  
  // Générer les combinaisons de charges
  const generateCombinations = () => {
    try {
      const permanentLoads = loads.filter(load => load.type === 'G');
      const variableLoads = loads.filter(load => ['Q', 'S', 'W'].includes(load.type));
      const accidentalLoads = loads.filter(load => load.type === 'A');
      const seismicLoads = loads.filter(load => load.type === 'E');
      
      const newCombinations = [];
      
      // ELU - Combinaison fondamentale (6.10)
      if (permanentLoads.length > 0) {
        const eluCombination = {
          name: 'ELU - Fondamentale (6.10)',
          formula: '1.35G + 1.5Q + 1.5×0.7S + 1.5×0.6W',
          loads: [] as any[],
          total: 0
        };
        
        // Charges permanentes
        let totalG = 0;
        permanentLoads.forEach(load => {
          const factorG = gammaFactors.G.unfavorable;
          totalG += load.value * factorG;
          eluCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: factorG,
            result: load.value * factorG,
            unit: load.unit
          });
        });
        
        // Charge variable principale (la première)
        if (variableLoads.length > 0) {
          const mainVariable = variableLoads[0];
          const factorQ = gammaFactors.Q.unfavorable;
          eluCombination.loads.push({
            id: mainVariable.id,
            name: mainVariable.name,
            type: mainVariable.type,
            value: mainVariable.value,
            factor: factorQ,
            result: mainVariable.value * factorQ,
            unit: mainVariable.unit
          });
          totalG += mainVariable.value * factorQ;
          
          // Charges variables d'accompagnement
          for (let i = 1; i < variableLoads.length; i++) {
            const load = variableLoads[i];
            const psi0 = psiFactors[load.type as keyof typeof psiFactors].psi0;
            const factor = gammaFactors[load.type as keyof typeof gammaFactors].unfavorable * psi0;
            eluCombination.loads.push({
              id: load.id,
              name: load.name,
              type: load.type,
              value: load.value,
              factor: factor,
              result: load.value * factor,
              unit: load.unit
            });
            totalG += load.value * factor;
          }
        }
        
        eluCombination.total = totalG;
        newCombinations.push(eluCombination);
      }
      
      // ELS - Combinaison caractéristique
      if (permanentLoads.length > 0) {
        const elsCarCombination = {
          name: 'ELS - Caractéristique',
          formula: 'G + Q + 0.7S + 0.6W',
          loads: [] as any[],
          total: 0
        };
        
        // Charges permanentes
        let totalG = 0;
        permanentLoads.forEach(load => {
          const factorG = 1.0; // Facteur 1.0 pour ELS
          totalG += load.value * factorG;
          elsCarCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: factorG,
            result: load.value * factorG,
            unit: load.unit
          });
        });
        
        // Charge variable principale (la première)
        if (variableLoads.length > 0) {
          const mainVariable = variableLoads[0];
          const factorQ = 1.0; // Facteur 1.0 pour la charge principale en ELS
          elsCarCombination.loads.push({
            id: mainVariable.id,
            name: mainVariable.name,
            type: mainVariable.type,
            value: mainVariable.value,
            factor: factorQ,
            result: mainVariable.value * factorQ,
            unit: mainVariable.unit
          });
          totalG += mainVariable.value * factorQ;
          
          // Charges variables d'accompagnement
          for (let i = 1; i < variableLoads.length; i++) {
            const load = variableLoads[i];
            const psi0 = psiFactors[load.type as keyof typeof psiFactors].psi0;
            elsCarCombination.loads.push({
              id: load.id,
              name: load.name,
              type: load.type,
              value: load.value,
              factor: psi0,
              result: load.value * psi0,
              unit: load.unit
            });
            totalG += load.value * psi0;
          }
        }
        
        elsCarCombination.total = totalG;
        newCombinations.push(elsCarCombination);
      }
      
      // ELS - Combinaison fréquente
      if (permanentLoads.length > 0) {
        const elsFreqCombination = {
          name: 'ELS - Fréquente',
          formula: 'G + 0.5Q + 0.2S + 0.2W',
          loads: [] as any[],
          total: 0
        };
        
        // Charges permanentes
        let totalG = 0;
        permanentLoads.forEach(load => {
          const factorG = 1.0; // Facteur 1.0 pour ELS
          totalG += load.value * factorG;
          elsFreqCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: factorG,
            result: load.value * factorG,
            unit: load.unit
          });
        });
        
        // Charges variables avec psi1
        variableLoads.forEach(load => {
          const psi1 = psiFactors[load.type as keyof typeof psiFactors].psi1;
          elsFreqCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: psi1,
            result: load.value * psi1,
            unit: load.unit
          });
          totalG += load.value * psi1;
        });
        
        elsFreqCombination.total = totalG;
        newCombinations.push(elsFreqCombination);
      }
      
      // ELS - Combinaison quasi-permanente
      if (permanentLoads.length > 0) {
        const elsQpCombination = {
          name: 'ELS - Quasi-permanente',
          formula: 'G + 0.3Q + 0.0S + 0.0W',
          loads: [] as any[],
          total: 0
        };
        
        // Charges permanentes
        let totalG = 0;
        permanentLoads.forEach(load => {
          const factorG = 1.0; // Facteur 1.0 pour ELS
          totalG += load.value * factorG;
          elsQpCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: factorG,
            result: load.value * factorG,
            unit: load.unit
          });
        });
        
        // Charges variables avec psi2
        variableLoads.forEach(load => {
          const psi2 = psiFactors[load.type as keyof typeof psiFactors].psi2;
          elsQpCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: psi2,
            result: load.value * psi2,
            unit: load.unit
          });
          totalG += load.value * psi2;
        });
        
        elsQpCombination.total = totalG;
        newCombinations.push(elsQpCombination);
      }
      
      // Combinaison accidentelle (si applicable)
      if (accidentalLoads.length > 0) {
        const accCombination = {
          name: 'Combinaison accidentelle',
          formula: 'G + A + 0.5Q + 0.2S + 0.2W',
          loads: [] as any[],
          total: 0
        };
        
        // Charges permanentes
        let totalG = 0;
        permanentLoads.forEach(load => {
          const factorG = 1.0;
          totalG += load.value * factorG;
          accCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: factorG,
            result: load.value * factorG,
            unit: load.unit
          });
        });
        
        // Charges accidentelles
        accidentalLoads.forEach(load => {
          const factorA = 1.0;
          accCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: factorA,
            result: load.value * factorA,
            unit: load.unit
          });
          totalG += load.value * factorA;
        });
        
        // Charges variables avec psi1
        variableLoads.forEach(load => {
          const psi1 = psiFactors[load.type as keyof typeof psiFactors].psi1;
          accCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: psi1,
            result: load.value * psi1,
            unit: load.unit
          });
          totalG += load.value * psi1;
        });
        
        accCombination.total = totalG;
        newCombinations.push(accCombination);
      }
      
      // Combinaison sismique (si applicable)
      if (seismicLoads.length > 0) {
        const seisCombination = {
          name: 'Combinaison sismique',
          formula: 'G + E + 0.3Q',
          loads: [] as any[],
          total: 0
        };
        
        // Charges permanentes
        let totalG = 0;
        permanentLoads.forEach(load => {
          const factorG = 1.0;
          totalG += load.value * factorG;
          seisCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: factorG,
            result: load.value * factorG,
            unit: load.unit
          });
        });
        
        // Charges sismiques
        seismicLoads.forEach(load => {
          const factorE = 1.0;
          seisCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: factorE,
            result: load.value * factorE,
            unit: load.unit
          });
          totalG += load.value * factorE;
        });
        
        // Charges variables avec psi2
        variableLoads.forEach(load => {
          const psi2 = psiFactors[load.type as keyof typeof psiFactors].psi2;
          seisCombination.loads.push({
            id: load.id,
            name: load.name,
            type: load.type,
            value: load.value,
            factor: psi2,
            result: load.value * psi2,
            unit: load.unit
          });
          totalG += load.value * psi2;
        });
        
        seisCombination.total = totalG;
        newCombinations.push(seisCombination);
      }
      
      setCombinations(newCombinations);
      toast.success("Combinaisons générées avec succès");
    } catch (error) {
      toast.error("Erreur lors de la génération des combinaisons");
      console.error(error);
    }
  };
  
  // Export PDF (simulé)
  const exportToPDF = () => {
    toast.success("Export PDF en cours de développement");
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-600" />
          Combinaisons de charges EC0
        </CardTitle>
        <CardDescription>
          Générez automatiquement les combinaisons de charges selon l'Eurocode 0
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="project-type">Type de projet</Label>
            <Select value={projectType} onValueChange={setProjectType}>
              <SelectTrigger id="project-type">
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="building">Bâtiment</SelectItem>
                <SelectItem value="bridge">Pont</SelectItem>
                <SelectItem value="geotechnical">Géotechnique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Charges</Label>
              <Button variant="outline" size="sm" onClick={addLoad}>
                <Plus className="h-4 w-4 mr-1" />
                Ajouter
              </Button>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Type</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead className="w-[160px]">Valeur</TableHead>
                    <TableHead className="w-[80px]">Unité</TableHead>
                    <TableHead className="w-[60px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loads.map(load => (
                    <TableRow key={load.id}>
                      <TableCell>
                        <Select 
                          value={load.type} 
                          onValueChange={(value) => updateLoad(load.id, 'type', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {loadTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          className="h-8"
                          value={load.name}
                          onChange={(e) => updateLoad(load.id, 'name', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          className="h-8"
                          type="number"
                          value={load.value}
                          onChange={(e) => updateLoad(load.id, 'value', parseFloat(e.target.value) || 0)}
                          step="0.1"
                        />
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={load.unit} 
                          onValueChange={(value) => updateLoad(load.id, 'unit', value)}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="kN">kN</SelectItem>
                            <SelectItem value="kN/m">kN/m</SelectItem>
                            <SelectItem value="kN/m²">kN/m²</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeLoad(load.id)}
                          disabled={loads.length <= 1}
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <div className="text-sm text-gray-500">
              {loads.length} charge(s) définie(s)
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={exportToPDF} disabled={combinations.length === 0}>
                <Download className="h-4 w-4 mr-2" />
                Exporter PDF
              </Button>
              <Button onClick={generateCombinations}>
                <Calculator className="h-4 w-4 mr-2" />
                Générer les combinaisons
              </Button>
            </div>
          </div>
        </div>
        
        {combinations.length > 0 && (
          <div className="space-y-4">
            <Separator />
            
            <h3 className="font-medium text-lg">Combinaisons de charges</h3>
            
            {combinations.map((combination, index) => (
              <Card key={index} className="border-l-4 border-l-blue-500">
                <CardHeader className="py-3">
                  <CardTitle className="text-base">{combination.name}</CardTitle>
                  <CardDescription>{combination.formula}</CardDescription>
                </CardHeader>
                <CardContent className="py-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Charge</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Valeur</TableHead>
                        <TableHead>Coefficient</TableHead>
                        <TableHead>Résultat</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {combination.loads.map((load: any) => (
                        <TableRow key={load.id}>
                          <TableCell>{load.name}</TableCell>
                          <TableCell>{load.type}</TableCell>
                          <TableCell>{load.value} {load.unit}</TableCell>
                          <TableCell>{load.factor.toFixed(2)}</TableCell>
                          <TableCell>{load.result.toFixed(2)} {load.unit}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-slate-50 font-medium">
                        <TableCell colSpan={4}>Total</TableCell>
                        <TableCell>{combination.total.toFixed(2)} {combination.loads[0]?.unit}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="justify-between border-t pt-4 text-xs text-gray-500">
        <div>
          Conforme à l'EN 1990 (Eurocode 0)
        </div>
        <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Réinitialiser
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoadCombinationsCalculator;
