
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Volume2, Save, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AcousticCalculator = () => {
  const { toast } = useToast();
  const [material, setMaterial] = useState('brick');
  const [thickness, setThickness] = useState<number>(200);
  const [frequency, setFrequency] = useState<number>(500);
  const [results, setResults] = useState<{
    transmissionLoss: number;
    soundClass: string;
    recommendations: string[];
  } | null>(null);

  // Materials acoustic data (simplified)
  const materials = {
    brick: {
      density: 1800,
      elasticity: 15e9,
      description: 'Brique pleine'
    },
    concrete: {
      density: 2400,
      elasticity: 30e9,
      description: 'Béton'
    },
    gypsum: {
      density: 700,
      elasticity: 3e9,
      description: 'Plaque de plâtre'
    },
    glasswool: {
      density: 25,
      elasticity: 0.1e9,
      description: 'Laine de verre'
    },
    woodpanel: {
      density: 700,
      elasticity: 10e9,
      description: 'Panneau de bois'
    }
  };

  const calculateAcousticPerformance = () => {
    // Simplified mass law calculation for sound transmission loss (dB)
    // TL = 20*log10(m*f) - 47
    // Where m is mass per unit area (kg/m²), f is frequency (Hz)
    
    // Calculate mass per unit area
    // @ts-ignore - materials indexing
    const massPerArea = materials[material].density * (thickness / 1000); // Convert mm to m
    
    // Calculate transmission loss using mass law
    const transmissionLoss = 20 * Math.log10(massPerArea * frequency) - 47;
    
    // Determine sound insulation class
    let soundClass;
    if (transmissionLoss >= 60) {
      soundClass = 'Classe A';
    } else if (transmissionLoss >= 50) {
      soundClass = 'Classe B';
    } else if (transmissionLoss >= 40) {
      soundClass = 'Classe C';
    } else if (transmissionLoss >= 30) {
      soundClass = 'Classe D';
    } else {
      soundClass = 'Classe E';
    }
    
    // Generate recommendations
    const recommendations = [];
    if (transmissionLoss < 40) {
      recommendations.push('Ajoutez une isolation acoustique supplémentaire.');
      recommendations.push('Considérez une construction à double paroi avec un espace d\'air.');
    }
    if (material === 'gypsum' && thickness < 25) {
      recommendations.push('Utilisez des plaques de plâtre plus épaisses ou doubles.');
    }
    if (material === 'glasswool' && thickness < 100) {
      recommendations.push('Augmentez l\'épaisseur de laine de verre pour de meilleures performances.');
    }
    if (recommendations.length === 0) {
      recommendations.push('Les performances acoustiques sont satisfaisantes.');
    }
    
    setResults({
      transmissionLoss,
      soundClass,
      recommendations
    });
    
    toast({
      title: "Calcul effectué",
      description: "Les performances acoustiques ont été calculées avec succès."
    });
  };

  const saveSimulation = () => {
    toast({
      title: "Simulation sauvegardée",
      description: "Votre simulation a été enregistrée dans votre espace personnel."
    });
  };

  const exportSimulation = () => {
    toast({
      title: "Export en cours",
      description: "Votre simulation est en cours d'export en PDF."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Volume2 className="h-5 w-5 mr-2 text-khaki-600" />
          Calculateur acoustique
        </CardTitle>
        <CardDescription>
          Estimez les performances acoustiques d'une paroi et obtenez des recommandations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="material">Matériau</Label>
              <Select value={material} onValueChange={setMaterial}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un matériau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brick">Brique pleine</SelectItem>
                  <SelectItem value="concrete">Béton</SelectItem>
                  <SelectItem value="gypsum">Plaque de plâtre</SelectItem>
                  <SelectItem value="glasswool">Laine de verre</SelectItem>
                  <SelectItem value="woodpanel">Panneau de bois</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="thickness">Épaisseur (mm)</Label>
              <Input 
                id="thickness" 
                type="number" 
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Fréquence (Hz)</Label>
              <Select 
                value={frequency.toString()} 
                onValueChange={(value) => setFrequency(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une fréquence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="125">125 Hz (Basses fréquences)</SelectItem>
                  <SelectItem value="250">250 Hz</SelectItem>
                  <SelectItem value="500">500 Hz (Médium)</SelectItem>
                  <SelectItem value="1000">1000 Hz</SelectItem>
                  <SelectItem value="2000">2000 Hz</SelectItem>
                  <SelectItem value="4000">4000 Hz (Hautes fréquences)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 mt-4">
              <h3 className="text-sm font-medium">Propriétés du matériau</h3>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Description</TableCell>
                    {/* @ts-ignore - materials indexing */}
                    <TableCell>{materials[material].description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Masse volumique</TableCell>
                    {/* @ts-ignore - materials indexing */}
                    <TableCell>{materials[material].density} kg/m³</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={calculateAcousticPerformance}
          className="w-full mt-4 bg-khaki-600 hover:bg-khaki-700"
        >
          Calculer les performances acoustiques
        </Button>
        
        {results && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="font-medium text-lg mb-3">Résultats d'analyse acoustique</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-md border">
                <div className="text-sm text-gray-500">Affaiblissement acoustique</div>
                <div className="text-2xl font-bold text-khaki-700">{Math.round(results.transmissionLoss)} dB</div>
              </div>
              
              <div className="p-3 bg-white rounded-md border">
                <div className="text-sm text-gray-500">Classe d'isolation acoustique</div>
                <div className="text-2xl font-bold text-khaki-700">{results.soundClass}</div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium">Recommandations :</h4>
              <ul className="list-disc list-inside mt-1 text-sm">
                {results.recommendations.map((rec, index) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={saveSimulation}>
                <Save className="h-4 w-4 mr-1" />
                Sauvegarder
              </Button>
              <Button variant="outline" size="sm" onClick={exportSimulation}>
                <FileDown className="h-4 w-4 mr-1" />
                Exporter
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AcousticCalculator;
