
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Download, FileText, Calculator, ExternalLink } from 'lucide-react';
import { toast } from "sonner";

interface Load {
  id: string;
  name: string;
  value: number;
  category: 'permanent' | 'variable';
  type: string;
  psi0?: number;
  psi1?: number;
  psi2?: number;
}

interface Combination {
  id: string;
  name: string;
  formula: string;
  result: number;
  type: 'ELU' | 'ELS';
  elsCategory?: 'characteristic' | 'frequent' | 'quasi-permanent';
}

// Eurocode factors
const gammaG = 1.35; // Permanent load safety factor
const gammaQ = 1.5;  // Variable load safety factor

// Default psi values for common load categories (Eurocode 0)
const defaultPsiValues = {
  'cat-A': { psi0: 0.7, psi1: 0.5, psi2: 0.3, description: 'Catégorie A - Habitation' },
  'cat-B': { psi0: 0.7, psi1: 0.5, psi2: 0.3, description: 'Catégorie B - Bureaux' },
  'cat-C': { psi0: 0.7, psi1: 0.7, psi2: 0.6, description: 'Catégorie C - Lieux de réunion' },
  'cat-D': { psi0: 0.7, psi1: 0.7, psi2: 0.6, description: 'Catégorie D - Commerces' },
  'cat-E': { psi0: 1.0, psi1: 0.9, psi2: 0.8, description: 'Catégorie E - Stockage' },
  'cat-F': { psi0: 0.7, psi1: 0.7, psi2: 0.6, description: 'Catégorie F - Trafic véhicules < 30kN' },
  'cat-G': { psi0: 0.7, psi1: 0.5, psi2: 0.3, description: 'Catégorie G - Trafic véhicules 30-160kN' },
  'cat-H': { psi0: 0.0, psi1: 0.0, psi2: 0.0, description: 'Catégorie H - Toitures' },
  'snow': { psi0: 0.5, psi1: 0.2, psi2: 0.0, description: 'Neige (altitude < 1000m)' },
  'snow-high': { psi0: 0.7, psi1: 0.5, psi2: 0.2, description: 'Neige (altitude > 1000m)' },
  'wind': { psi0: 0.6, psi1: 0.2, psi2: 0.0, description: 'Vent' },
  'temp': { psi0: 0.6, psi1: 0.5, psi2: 0.0, description: 'Température' },
};

const LoadCombinationsCalculator = () => {
  const [loads, setLoads] = useState<Load[]>([
    { id: '1', name: 'G - Poids propre', value: 25, category: 'permanent', type: 'self-weight' },
    { id: '2', name: 'Q - Charge d\'exploitation', value: 15, category: 'variable', type: 'cat-A', psi0: 0.7, psi1: 0.5, psi2: 0.3 },
  ]);
  
  const [combinations, setCombinations] = useState<Combination[]>([]);
  const [activeTab, setActiveTab] = useState('loads');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPsiValues, setCustomPsiValues] = useState(false);
  const [loadType, setLoadType] = useState('cat-A');

  // Generate a unique ID
  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  // Add a new load
  const addLoad = () => {
    const newId = generateId();
    const isVariable = loads.filter(load => load.category === 'variable').length > 0;
    
    const psiValues = defaultPsiValues['cat-A'];
    
    const newLoad: Load = {
      id: newId,
      name: isVariable ? `G${loads.filter(load => load.category === 'permanent').length + 1} - Charge permanente` : 'Q1 - Charge variable',
      value: 0,
      category: isVariable ? 'permanent' : 'variable',
      type: isVariable ? 'self-weight' : 'cat-A',
      psi0: psiValues.psi0,
      psi1: psiValues.psi1,
      psi2: psiValues.psi2,
    };
    
    setLoads([...loads, newLoad]);
  };

  // Remove a load
  const removeLoad = (id: string) => {
    if (loads.length <= 1) {
      toast.error('Vous devez conserver au moins une charge');
      return;
    }
    setLoads(loads.filter(load => load.id !== id));
  };

  // Update load value
  const updateLoadValue = (id: string, value: string) => {
    setLoads(loads.map(load => {
      if (load.id === id) {
        return { ...load, value: parseFloat(value) || 0 };
      }
      return load;
    }));
  };

  // Update load name
  const updateLoadName = (id: string, name: string) => {
    setLoads(loads.map(load => {
      if (load.id === id) {
        return { ...load, name };
      }
      return load;
    }));
  };

  // Update load category
  const updateLoadCategory = (id: string, category: 'permanent' | 'variable') => {
    setLoads(loads.map(load => {
      if (load.id === id) {
        const type = category === 'permanent' ? 'self-weight' : 'cat-A';
        const psiValues = category === 'variable' ? defaultPsiValues['cat-A'] : undefined;
        
        return { 
          ...load, 
          category,
          type,
          psi0: psiValues?.psi0,
          psi1: psiValues?.psi1,
          psi2: psiValues?.psi2 
        };
      }
      return load;
    }));
  };

  // Update load type for variable loads
  const updateLoadType = (id: string, type: string) => {
    setLoads(loads.map(load => {
      if (load.id === id) {
        const psiValues = defaultPsiValues[type as keyof typeof defaultPsiValues];
        
        return { 
          ...load, 
          type,
          psi0: customPsiValues ? load.psi0 : psiValues?.psi0,
          psi1: customPsiValues ? load.psi1 : psiValues?.psi1,
          psi2: customPsiValues ? load.psi2 : psiValues?.psi2 
        };
      }
      return load;
    }));
  };

  // Update psi values for variable loads
  const updatePsiValue = (id: string, psiType: 'psi0' | 'psi1' | 'psi2', value: string) => {
    setLoads(loads.map(load => {
      if (load.id === id) {
        return { ...load, [psiType]: parseFloat(value) || 0 };
      }
      return load;
    }));
  };

  // Generate combinations
  const generateCombinations = () => {
    setIsGenerating(true);
    
    const permanentLoads = loads.filter(load => load.category === 'permanent');
    const variableLoads = loads.filter(load => load.category === 'variable');
    
    if (variableLoads.length === 0) {
      toast.error('Vous devez définir au moins une charge variable pour générer des combinaisons');
      setIsGenerating(false);
      return;
    }
    
    const newCombinations: Combination[] = [];
    
    // ELU combinations
    // 1.35G + 1.5Q1 + 1.5*psi0*Q2 + ...
    for (let i = 0; i < variableLoads.length; i++) {
      const primaryVariable = variableLoads[i];
      
      let formula = `${gammaG}×(${permanentLoads.map(g => g.name).join(' + ')}) + ${gammaQ}×${primaryVariable.name}`;
      let result = permanentLoads.reduce((sum, g) => sum + (g.value * gammaG), 0) + (primaryVariable.value * gammaQ);
      
      // Add other variable loads with psi0
      for (let j = 0; j < variableLoads.length; j++) {
        if (j !== i) {
          const secondaryVariable = variableLoads[j];
          formula += ` + ${gammaQ}×${secondaryVariable.psi0}×${secondaryVariable.name}`;
          result += secondaryVariable.value * gammaQ * (secondaryVariable.psi0 || 0);
        }
      }
      
      newCombinations.push({
        id: generateId(),
        name: `ELU - ${primaryVariable.name} dominant`,
        formula,
        result,
        type: 'ELU'
      });
    }
    
    // ELS Characteristic combinations
    // G + Q1 + psi0*Q2 + ...
    for (let i = 0; i < variableLoads.length; i++) {
      const primaryVariable = variableLoads[i];
      
      let formula = `${permanentLoads.map(g => g.name).join(' + ')} + ${primaryVariable.name}`;
      let result = permanentLoads.reduce((sum, g) => sum + g.value, 0) + primaryVariable.value;
      
      // Add other variable loads with psi0
      for (let j = 0; j < variableLoads.length; j++) {
        if (j !== i) {
          const secondaryVariable = variableLoads[j];
          formula += ` + ${secondaryVariable.psi0}×${secondaryVariable.name}`;
          result += secondaryVariable.value * (secondaryVariable.psi0 || 0);
        }
      }
      
      newCombinations.push({
        id: generateId(),
        name: `ELS Caractéristique - ${primaryVariable.name} dominant`,
        formula,
        result,
        type: 'ELS',
        elsCategory: 'characteristic'
      });
    }
    
    // ELS Frequent combinations
    // G + psi1*Q1 + psi2*Q2 + ...
    for (let i = 0; i < variableLoads.length; i++) {
      const primaryVariable = variableLoads[i];
      
      let formula = `${permanentLoads.map(g => g.name).join(' + ')} + ${primaryVariable.psi1}×${primaryVariable.name}`;
      let result = permanentLoads.reduce((sum, g) => sum + g.value, 0) + (primaryVariable.value * (primaryVariable.psi1 || 0));
      
      // Add other variable loads with psi2
      for (let j = 0; j < variableLoads.length; j++) {
        if (j !== i) {
          const secondaryVariable = variableLoads[j];
          formula += ` + ${secondaryVariable.psi2}×${secondaryVariable.name}`;
          result += secondaryVariable.value * (secondaryVariable.psi2 || 0);
        }
      }
      
      newCombinations.push({
        id: generateId(),
        name: `ELS Fréquent - ${primaryVariable.name} dominant`,
        formula,
        result,
        type: 'ELS',
        elsCategory: 'frequent'
      });
    }
    
    // ELS Quasi-permanent combination (only one)
    // G + psi2*Q1 + psi2*Q2 + ...
    let quasiFormula = permanentLoads.map(g => g.name).join(' + ');
    let quasiResult = permanentLoads.reduce((sum, g) => sum + g.value, 0);
    
    for (let i = 0; i < variableLoads.length; i++) {
      const variable = variableLoads[i];
      quasiFormula += ` + ${variable.psi2}×${variable.name}`;
      quasiResult += variable.value * (variable.psi2 || 0);
    }
    
    newCombinations.push({
      id: generateId(),
      name: 'ELS Quasi-permanent',
      formula: quasiFormula,
      result: quasiResult,
      type: 'ELS',
      elsCategory: 'quasi-permanent'
    });
    
    setCombinations(newCombinations);
    setActiveTab('combinations');
    setIsGenerating(false);
    
    toast.success('Combinaisons générées avec succès');
  };

  // Export to PDF
  const exportToPDF = () => {
    import('jspdf').then(({ jsPDF }) => {
      import('jspdf-autotable').then((autoTable) => {
        const doc = new jsPDF();
        
        // Title
        doc.setFontSize(18);
        doc.text('Combinaisons de charges selon l\'Eurocode', 105, 15, { align: 'center' });
        
        // Project info
        doc.setFontSize(12);
        doc.text('Projet: Combinaisons EC0', 14, 25);
        doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 14, 32);
        
        // Loads table
        doc.setFontSize(14);
        doc.text('Charges définies', 14, 45);
        
        const loadRows = loads.map(load => [
          load.name,
          load.category === 'permanent' ? 'Permanente' : 'Variable',
          load.value.toString(),
          load.category === 'variable' ? defaultPsiValues[load.type as keyof typeof defaultPsiValues]?.description || load.type : '-',
          load.category === 'variable' ? load.psi0?.toString() || '-' : '-',
          load.category === 'variable' ? load.psi1?.toString() || '-' : '-',
          load.category === 'variable' ? load.psi2?.toString() || '-' : '-',
        ]);
        
        // @ts-ignore
        doc.autoTable({
          startY: 50,
          head: [['Nom', 'Type', 'Valeur (kN/m²)', 'Catégorie', 'ψ₀', 'ψ₁', 'ψ₂']],
          body: loadRows,
        });
        
        // Combinations tables
        const eluCombinations = combinations.filter(c => c.type === 'ELU');
        const elsCharacteristic = combinations.filter(c => c.type === 'ELS' && c.elsCategory === 'characteristic');
        const elsFrequent = combinations.filter(c => c.type === 'ELS' && c.elsCategory === 'frequent');
        const elsQuasiPermanent = combinations.filter(c => c.type === 'ELS' && c.elsCategory === 'quasi-permanent');
        
        // @ts-ignore
        const finalY = doc.lastAutoTable.finalY + 10;
        
        doc.setFontSize(14);
        doc.text('Combinaisons ELU (1.35G + 1.5Q)', 14, finalY);
        
        // @ts-ignore
        doc.autoTable({
          startY: finalY + 5,
          head: [['Combinaison', 'Formule', 'Résultat (kN/m²)']],
          body: eluCombinations.map(c => [c.name, c.formula, c.result.toFixed(2)]),
        });
        
        // @ts-ignore
        const finalY2 = doc.lastAutoTable.finalY + 10;
        
        doc.setFontSize(14);
        doc.text('Combinaisons ELS Caractéristiques (G + Q)', 14, finalY2);
        
        // @ts-ignore
        doc.autoTable({
          startY: finalY2 + 5,
          head: [['Combinaison', 'Formule', 'Résultat (kN/m²)']],
          body: elsCharacteristic.map(c => [c.name, c.formula, c.result.toFixed(2)]),
        });
        
        // Add a new page for remaining combinations
        doc.addPage();
        
        doc.setFontSize(14);
        doc.text('Combinaisons ELS Fréquentes', 14, 15);
        
        // @ts-ignore
        doc.autoTable({
          startY: 20,
          head: [['Combinaison', 'Formule', 'Résultat (kN/m²)']],
          body: elsFrequent.map(c => [c.name, c.formula, c.result.toFixed(2)]),
        });
        
        // @ts-ignore
        const finalY3 = doc.lastAutoTable.finalY + 10;
        
        doc.setFontSize(14);
        doc.text('Combinaison ELS Quasi-permanente', 14, finalY3);
        
        // @ts-ignore
        doc.autoTable({
          startY: finalY3 + 5,
          head: [['Combinaison', 'Formule', 'Résultat (kN/m²)']],
          body: elsQuasiPermanent.map(c => [c.name, c.formula, c.result.toFixed(2)]),
        });
        
        // @ts-ignore
        const finalY4 = doc.lastAutoTable.finalY + 10;
        
        doc.setFontSize(10);
        doc.text('Document généré via le calculateur de combinaisons Eurocode - Progineer', 105, finalY4, { align: 'center' });
        
        doc.save('Combinaisons_Eurocode.pdf');
        
        toast.success('PDF téléchargé avec succès');
      });
    });
  };

  // Export to Excel-like CSV
  const exportToCSV = () => {
    // Create CSV content
    let csvContent = 'Combinaisons de charges selon l\'Eurocode\n\n';
    
    // Add loads
    csvContent += 'CHARGES\n';
    csvContent += 'Nom;Type;Valeur (kN/m²);Catégorie;ψ₀;ψ₁;ψ₂\n';
    
    loads.forEach(load => {
      csvContent += `${load.name};`;
      csvContent += `${load.category === 'permanent' ? 'Permanente' : 'Variable'};`;
      csvContent += `${load.value};`;
      csvContent += `${load.category === 'variable' ? defaultPsiValues[load.type as keyof typeof defaultPsiValues]?.description || load.type : '-'};`;
      csvContent += `${load.category === 'variable' ? load.psi0 || '-' : '-'};`;
      csvContent += `${load.category === 'variable' ? load.psi1 || '-' : '-'};`;
      csvContent += `${load.category === 'variable' ? load.psi2 || '-' : '-'}\n`;
    });
    
    // Add combinations
    csvContent += '\nCOMBINAISONS\n';
    csvContent += 'Combinaison;Formule;Résultat (kN/m²)\n';
    
    combinations.forEach(combo => {
      csvContent += `${combo.name};${combo.formula};${combo.result.toFixed(2)}\n`;
    });
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Combinaisons_Eurocode.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('CSV téléchargé avec succès');
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-purple-600" />
          Générateur de combinaisons d'actions EC0
        </CardTitle>
        <CardDescription>
          Générez automatiquement les combinaisons ELU et ELS à partir des charges permanentes et variables définies
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="loads">Définition des charges</TabsTrigger>
            <TabsTrigger value="combinations">Combinaisons générées</TabsTrigger>
            <TabsTrigger value="help">Aide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="loads" className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Charges à considérer</h3>
                <Button variant="outline" size="sm" onClick={addLoad}>
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter une charge
                </Button>
              </div>
              
              <div className="space-y-4">
                {loads.map((load, index) => (
                  <Card key={load.id} className="relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-2 h-full ${load.category === 'permanent' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                    
                    <CardHeader className="py-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Badge variant={load.category === 'permanent' ? 'secondary' : 'outline'} className={load.category === 'permanent' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}>
                            {load.category === 'permanent' ? 'Permanente' : 'Variable'}
                          </Badge>
                          <CardTitle className="text-base">
                            Charge {index + 1}
                          </CardTitle>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeLoad(load.id)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`load-name-${load.id}`}>Nom de la charge</Label>
                          <Input
                            id={`load-name-${load.id}`}
                            value={load.name}
                            onChange={(e) => updateLoadName(load.id, e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`load-value-${load.id}`}>Valeur (kN/m²)</Label>
                          <Input
                            id={`load-value-${load.id}`}
                            type="number"
                            value={load.value}
                            onChange={(e) => updateLoadValue(load.id, e.target.value)}
                            min="0"
                            step="0.1"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor={`load-category-${load.id}`}>Type de charge</Label>
                          <Select
                            value={load.category}
                            onValueChange={(value) => updateLoadCategory(load.id, value as 'permanent' | 'variable')}
                          >
                            <SelectTrigger id={`load-category-${load.id}`}>
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="permanent">Permanente (G)</SelectItem>
                              <SelectItem value="variable">Variable (Q)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {load.category === 'variable' && (
                          <div className="space-y-2">
                            <Label htmlFor={`load-type-${load.id}`}>Catégorie d'utilisation</Label>
                            <Select
                              value={load.type}
                              onValueChange={(value) => updateLoadType(load.id, value)}
                            >
                              <SelectTrigger id={`load-type-${load.id}`}>
                                <SelectValue placeholder="Sélectionnez une catégorie" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cat-A">Catégorie A - Habitation</SelectItem>
                                <SelectItem value="cat-B">Catégorie B - Bureaux</SelectItem>
                                <SelectItem value="cat-C">Catégorie C - Lieux de réunion</SelectItem>
                                <SelectItem value="cat-D">Catégorie D - Commerces</SelectItem>
                                <SelectItem value="cat-E">Catégorie E - Stockage</SelectItem>
                                <SelectItem value="cat-F">Catégorie F - Trafic véhicules &lt; 30kN</SelectItem>
                                <SelectItem value="cat-G">Catégorie G - Trafic véhicules 30-160kN</SelectItem>
                                <SelectItem value="cat-H">Catégorie H - Toitures</SelectItem>
                                <SelectItem value="snow">Neige (altitude &lt; 1000m)</SelectItem>
                                <SelectItem value="snow-high">Neige (altitude &gt; 1000m)</SelectItem>
                                <SelectItem value="wind">Vent</SelectItem>
                                <SelectItem value="temp">Température</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                      
                      {load.category === 'variable' && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-2">
                            <Label className="font-medium">Coefficients de réduction ψ</Label>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setCustomPsiValues(!customPsiValues)}
                            >
                              {customPsiValues ? 'Utiliser valeurs par défaut' : 'Personnaliser'}
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`load-psi0-${load.id}`}>ψ₀</Label>
                              <Input
                                id={`load-psi0-${load.id}`}
                                type="number"
                                value={load.psi0}
                                onChange={(e) => updatePsiValue(load.id, 'psi0', e.target.value)}
                                min="0"
                                max="1"
                                step="0.1"
                                disabled={!customPsiValues}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`load-psi1-${load.id}`}>ψ₁</Label>
                              <Input
                                id={`load-psi1-${load.id}`}
                                type="number"
                                value={load.psi1}
                                onChange={(e) => updatePsiValue(load.id, 'psi1', e.target.value)}
                                min="0"
                                max="1"
                                step="0.1"
                                disabled={!customPsiValues}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor={`load-psi2-${load.id}`}>ψ₂</Label>
                              <Input
                                id={`load-psi2-${load.id}`}
                                type="number"
                                value={load.psi2}
                                onChange={(e) => updatePsiValue(load.id, 'psi2', e.target.value)}
                                min="0"
                                max="1"
                                step="0.1"
                                disabled={!customPsiValues}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="flex justify-end">
                <Button onClick={generateCombinations} disabled={isGenerating}>
                  {isGenerating ? 'Génération en cours...' : 'Générer les combinaisons'}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="combinations" className="space-y-6">
            {combinations.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-500">Aucune combinaison générée</h3>
                <p className="text-gray-400 mt-2">Définissez vos charges et cliquez sur "Générer les combinaisons"</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setActiveTab('loads')}
                >
                  Définir les charges
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Résultats des combinaisons</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportToCSV}>
                      <FileText className="h-4 w-4 mr-1" />
                      Exporter CSV
                    </Button>
                    <Button variant="outline" size="sm" onClick={exportToPDF}>
                      <Download className="h-4 w-4 mr-1" />
                      Exporter PDF
                    </Button>
                  </div>
                </div>
                
                <Tabs defaultValue="elu">
                  <TabsList>
                    <TabsTrigger value="elu">ELU</TabsTrigger>
                    <TabsTrigger value="els-char">ELS Caractéristique</TabsTrigger>
                    <TabsTrigger value="els-freq">ELS Fréquent</TabsTrigger>
                    <TabsTrigger value="els-quasi">ELS Quasi-permanent</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="elu" className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Combinaison</TableHead>
                            <TableHead>Formule</TableHead>
                            <TableHead className="text-right">Résultat (kN/m²)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {combinations
                            .filter(c => c.type === 'ELU')
                            .map(combination => (
                            <TableRow key={combination.id}>
                              <TableCell className="font-medium">{combination.name}</TableCell>
                              <TableCell>{combination.formula}</TableCell>
                              <TableCell className="text-right">{combination.result.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="els-char" className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Combinaison</TableHead>
                            <TableHead>Formule</TableHead>
                            <TableHead className="text-right">Résultat (kN/m²)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {combinations
                            .filter(c => c.type === 'ELS' && c.elsCategory === 'characteristic')
                            .map(combination => (
                            <TableRow key={combination.id}>
                              <TableCell className="font-medium">{combination.name}</TableCell>
                              <TableCell>{combination.formula}</TableCell>
                              <TableCell className="text-right">{combination.result.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="els-freq" className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Combinaison</TableHead>
                            <TableHead>Formule</TableHead>
                            <TableHead className="text-right">Résultat (kN/m²)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {combinations
                            .filter(c => c.type === 'ELS' && c.elsCategory === 'frequent')
                            .map(combination => (
                            <TableRow key={combination.id}>
                              <TableCell className="font-medium">{combination.name}</TableCell>
                              <TableCell>{combination.formula}</TableCell>
                              <TableCell className="text-right">{combination.result.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="els-quasi" className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Combinaison</TableHead>
                            <TableHead>Formule</TableHead>
                            <TableHead className="text-right">Résultat (kN/m²)</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {combinations
                            .filter(c => c.type === 'ELS' && c.elsCategory === 'quasi-permanent')
                            .map(combination => (
                            <TableRow key={combination.id}>
                              <TableCell className="font-medium">{combination.name}</TableCell>
                              <TableCell>{combination.formula}</TableCell>
                              <TableCell className="text-right">{combination.result.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="help" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">À propos des combinaisons Eurocode</h3>
                <p className="text-gray-600">
                  Ce calculateur génère automatiquement les combinaisons d'actions conformément aux Eurocodes 0 et 1
                  (EN 1990 et EN 1991) pour la vérification des états limites ultimes (ELU) et de service (ELS).
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Types de combinaisons</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>
                    <strong>ELU (État Limite Ultime):</strong> Combinaisons avec coefficients de sécurité pour vérifier la résistance structurelle
                    <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-sm">
                      1.35G + 1.5Q₁ + 1.5ψ₀,₂Q₂ + ...
                    </div>
                  </li>
                  <li>
                    <strong>ELS Caractéristique:</strong> Combinaisons rares, utilisées pour les effets irréversibles
                    <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-sm">
                      G + Q₁ + ψ₀,₂Q₂ + ...
                    </div>
                  </li>
                  <li>
                    <strong>ELS Fréquent:</strong> Combinaisons pour les effets réversibles
                    <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-sm">
                      G + ψ₁,₁Q₁ + ψ₂,₂Q₂ + ...
                    </div>
                  </li>
                  <li>
                    <strong>ELS Quasi-permanent:</strong> Combinaisons pour les effets à long terme
                    <div className="bg-gray-50 p-2 rounded mt-1 font-mono text-sm">
                      G + ψ₂,₁Q₁ + ψ₂,₂Q₂ + ...
                    </div>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-2">Valeurs des coefficients ψ</h3>
                <p className="text-gray-600 mb-2">
                  Les valeurs des coefficients ψ pour les charges variables dépendent de la catégorie d'utilisation :
                </p>
                
                <div className="rounded-md border overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-center">ψ₀</TableHead>
                        <TableHead className="text-center">ψ₁</TableHead>
                        <TableHead className="text-center">ψ₂</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(defaultPsiValues).map(([key, value]) => (
                        <TableRow key={key}>
                          <TableCell className="font-medium">{key}</TableCell>
                          <TableCell>{value.description}</TableCell>
                          <TableCell className="text-center">{value.psi0}</TableCell>
                          <TableCell className="text-center">{value.psi1}</TableCell>
                          <TableCell className="text-center">{value.psi2}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t bg-gray-50 px-6 py-4">
        <div className="flex justify-between items-center w-full">
          <p className="text-xs text-gray-500">
            Conforme à l'EN 1990 (Eurocode 0) et l'EN 1991 (Eurocode 1)
          </p>
          <Button
            variant="link"
            className="text-sm"
            onClick={() => window.open('https://eurocodes.jrc.ec.europa.eu/fr', '_blank')}
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Référence officielle Eurocodes
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoadCombinationsCalculator;
