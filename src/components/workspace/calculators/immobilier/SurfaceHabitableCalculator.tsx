
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash, Save, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSimulationExport } from '@/hooks/useSimulationExport';
import PDFExporter from '@/components/common/PDFExporter';

interface Room {
  id: string;
  name: string;
  length: number;
  width: number;
  area?: number;
}

const SurfaceHabitableCalculator: React.FC = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Séjour', length: 5, width: 4 },
    { id: '2', name: 'Cuisine', length: 3, width: 3 },
    { id: '3', name: 'Chambre 1', length: 4, width: 3 }
  ]);
  const [projectName, setProjectName] = useState('Mon logement');
  const [showPdfOptions, setShowPdfOptions] = useState(false);

  // Calculate total area
  const totalArea = rooms.reduce((sum, room) => sum + (room.length * room.width), 0);
  
  // Calculate results including breakdown
  const results = {
    totalSurfaceHabitable: totalArea,
    surfaceShob: Math.round(totalArea * 1.15), // Simplified approximation
    surfaceShon: Math.round(totalArea * 1.1),  // Simplified approximation
    rooms: rooms.map(room => ({
      name: room.name,
      area: room.length * room.width
    }))
  };

  // Use our custom export hook
  const { saveSimulation, generatePDF, saving } = useSimulationExport({
    type: 'surface',
    title: projectName || 'Calcul de surface',
    data: {
      projectName,
      rooms: rooms.map(r => ({ name: r.name, length: r.length, width: r.width }))
    },
    results
  });

  const addRoom = () => {
    const newId = (rooms.length + 1).toString();
    setRooms([...rooms, { id: newId, name: `Pièce ${newId}`, length: 3, width: 3 }]);
  };

  const updateRoom = (id: string, field: keyof Room, value: any) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, [field]: field === 'name' ? value : parseFloat(value) } : room
    ));
  };

  const removeRoom = (id: string) => {
    if (rooms.length > 1) {
      setRooms(rooms.filter(room => room.id !== id));
    } else {
      toast({
        title: "Erreur",
        description: "Vous devez conserver au moins une pièce",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Calculateur de surface habitable</CardTitle>
        <CardDescription>
          Calculez la surface habitable d'un logement ainsi que la SHON/SHOB
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="projectName">Nom du projet</Label>
          <Input 
            id="projectName" 
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-md font-medium">Liste des pièces</h3>
            <Button
              onClick={addRoom}
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une pièce
            </Button>
          </div>
          
          <div className="space-y-3">
            {rooms.map((room) => (
              <div key={room.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-4">
                  <Input
                    value={room.name}
                    onChange={(e) => updateRoom(room.id, 'name', e.target.value)}
                    placeholder="Nom de la pièce"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={room.length}
                    onChange={(e) => updateRoom(room.id, 'length', e.target.value)}
                    placeholder="Longueur (m)"
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={room.width}
                    onChange={(e) => updateRoom(room.id, 'width', e.target.value)}
                    placeholder="Largeur (m)"
                  />
                </div>
                <div className="col-span-1 text-right">
                  {(room.length * room.width).toFixed(2)} m²
                </div>
                <div className="col-span-1 flex justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRoom(room.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-md bg-slate-50 p-4">
          <h3 className="text-lg font-medium mb-3">Résultats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Surface habitable totale:</span>
              <span className="font-semibold">{totalArea.toFixed(2)} m²</span>
            </div>
            <div className="flex justify-between">
              <span>Surface hors œuvre brute (SHOB):</span>
              <span>{results.surfaceShob.toFixed(2)} m²</span>
            </div>
            <div className="flex justify-between">
              <span>Surface hors œuvre nette (SHON):</span>
              <span>{results.surfaceShon.toFixed(2)} m²</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setShowPdfOptions(!showPdfOptions)}
        >
          {showPdfOptions ? 'Masquer options PDF' : 'Exporter en PDF'}
        </Button>
        <Button 
          onClick={saveSimulation}
          disabled={saving}
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </CardFooter>
      
      {showPdfOptions && (
        <div className="px-6 pb-6">
          <PDFExporter 
            data={{
              projectName,
              rooms: rooms.map(r => ({ name: r.name, length: r.length, width: r.width }))
            }}
            title={projectName || 'Calcul de surface'}
            generatePDF={generatePDF}
            onSaveSimulation={saveSimulation}
            defaultFileName={`surface-habitable-${projectName.toLowerCase().replace(/\s+/g, '-')}`}
          />
        </div>
      )}
    </Card>
  );
};

export default SurfaceHabitableCalculator;
