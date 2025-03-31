
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download, DoorOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const FireEvacuationCalculator = () => {
  const { toast } = useToast();
  const [occupants, setOccupants] = useState('150');
  const [buildingType, setBuildingType] = useState('erp');
  const [doorWidth, setDoorWidth] = useState('0.90');
  
  // Calcul des unités de passage requises
  const calculatePassageUnits = () => {
    const people = parseInt(occupants);
    let units = 0;
    
    if (buildingType === 'erp') {
      if (people <= 19) units = 1;
      else if (people <= 50) units = 2;
      else units = Math.ceil(people / 100) + 2;
    } else if (buildingType === 'workplace') {
      if (people < 50) units = 1;
      else units = Math.ceil(people / 100) + 1;
    } else { // Habitation
      if (people <= 50) units = 1;
      else units = Math.ceil(people / 50);
    }
    
    return units;
  };
  
  // Calcul de la largeur minimale des issues
  const calculateMinWidth = () => {
    const units = calculatePassageUnits();
    let width = 0;
    
    if (units === 1) width = 0.9;
    else if (units === 2) width = 1.4;
    else width = units * 0.6;
    
    return width.toFixed(2);
  };
  
  // Vérification de conformité
  const isCompliant = () => {
    const minWidth = parseFloat(calculateMinWidth());
    const currentWidth = parseFloat(doorWidth);
    
    return currentWidth >= minWidth;
  };
  
  // Handle download
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport de calcul d'évacuation est en cours de téléchargement."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur d'Évacuation</CardTitle>
        <CardDescription>
          Dimensionnement des issues de secours et vérification de la conformité aux normes d'évacuation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="buildingType">Type de bâtiment</Label>
              <Select value={buildingType} onValueChange={setBuildingType}>
                <SelectTrigger id="buildingType">
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="erp">ERP (établissement recevant du public)</SelectItem>
                  <SelectItem value="workplace">Code du travail</SelectItem>
                  <SelectItem value="residential">Habitation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="occupants">Nombre d'occupants</Label>
              <Input 
                id="occupants"
                type="number" 
                value={occupants} 
                onChange={(e) => setOccupants(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="doorWidth">Largeur actuelle des issues (m)</Label>
              <Input 
                id="doorWidth"
                type="number" 
                step="0.01"
                value={doorWidth} 
                onChange={(e) => setDoorWidth(e.target.value)}
              />
            </div>
            
            <div className="pt-4">
              <Button onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Exporter le rapport
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium mb-3">Résultats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Unités de passage requises</p>
                  <p className="text-lg font-medium">{calculatePassageUnits()} UP</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Largeur minimale des issues</p>
                  <p className="text-lg font-medium">{calculateMinWidth()} m</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conformité</p>
                  <p className={`text-lg font-medium ${isCompliant() ? 'text-green-600' : 'text-red-600'}`}>
                    {isCompliant() ? '✓ Conforme' : '✗ Non conforme'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <h3 className="text-base font-medium mb-2">Rappel des largeurs réglementaires</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Unités de passage</TableHead>
                    <TableHead>Largeur minimale</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>1 UP</TableCell>
                    <TableCell>0.90 m</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>2 UP</TableCell>
                    <TableCell>1.40 m</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>3 UP</TableCell>
                    <TableCell>1.80 m</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>n UP</TableCell>
                    <TableCell>n × 0.60 m</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Les résultats de ce calculateur sont fournis à titre indicatif. La réglementation comporte des spécificités selon le type précis d'établissement et sa configuration.
      </CardFooter>
    </Card>
  );
};

export default FireEvacuationCalculator;
