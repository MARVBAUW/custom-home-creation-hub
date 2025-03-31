
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileDown, Save, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SurfaceHabitableCalculator = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Séjour', length: 5, width: 4, area: 20, included: true },
    { id: 2, name: 'Chambre 1', length: 4, width: 3, area: 12, included: true },
    { id: 3, name: 'Cuisine', length: 3, width: 2.5, area: 7.5, included: true }
  ]);
  
  const [newRoom, setNewRoom] = useState({ name: '', length: 0, width: 0 });
  
  // Calculate total surface area
  const totalArea = rooms
    .filter(room => room.included)
    .reduce((sum, room) => sum + room.area, 0);
  
  // Add a new room
  const handleAddRoom = () => {
    if (!newRoom.name || newRoom.length <= 0 || newRoom.width <= 0) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez renseigner le nom et les dimensions de la pièce.",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.max(0, ...rooms.map(r => r.id)) + 1;
    const area = newRoom.length * newRoom.width;
    
    setRooms([...rooms, { 
      id: newId, 
      name: newRoom.name, 
      length: newRoom.length, 
      width: newRoom.width, 
      area: area, 
      included: true 
    }]);
    
    setNewRoom({ name: '', length: 0, width: 0 });
    
    toast({
      title: "Pièce ajoutée",
      description: `${newRoom.name} (${area.toFixed(2)} m²) a été ajoutée au calcul.`
    });
  };
  
  // Remove a room
  const handleRemoveRoom = (id: number) => {
    setRooms(rooms.filter(room => room.id !== id));
    
    toast({
      title: "Pièce supprimée",
      description: "La pièce a été retirée du calcul."
    });
  };
  
  // Toggle room inclusion
  const toggleRoomInclusion = (id: number) => {
    setRooms(rooms.map(room => 
      room.id === id ? { ...room, included: !room.included } : room
    ));
  };
  
  // Update room dimensions
  const updateRoomDimension = (id: number, field: 'length' | 'width', value: number) => {
    setRooms(rooms.map(room => {
      if (room.id === id) {
        const updatedRoom = { ...room, [field]: value };
        updatedRoom.area = updatedRoom.length * updatedRoom.width;
        return updatedRoom;
      }
      return room;
    }));
  };
  
  // Save the calculation
  const handleSave = () => {
    const calculation = {
      date: new Date().toISOString(),
      rooms: rooms,
      totalArea: totalArea
    };
    
    // In a real app, this would save to database
    localStorage.setItem('surfaceCalculation', JSON.stringify(calculation));
    
    toast({
      title: "Calcul sauvegardé",
      description: "Votre calcul de surface habitable a été sauvegardé dans votre espace client."
    });
  };
  
  // Export as PDF
  const handleExport = () => {
    toast({
      title: "Export en cours",
      description: "Votre calcul de surface habitable est en cours d'export en PDF."
    });
    
    // In a real implementation, this would generate a PDF
    setTimeout(() => {
      toast({
        title: "Export terminé",
        description: "Le PDF a été généré et téléchargé."
      });
    }, 1500);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Calculateur de surface habitable</CardTitle>
        <CardDescription>
          Calculez la surface habitable d'un logement selon la loi Carrez
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="p-2 text-left">Pièce</th>
                <th className="p-2 text-left">Longueur (m)</th>
                <th className="p-2 text-left">Largeur (m)</th>
                <th className="p-2 text-right">Surface (m²)</th>
                <th className="p-2 text-center">Inclure</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map(room => (
                <tr key={room.id} className="border-b dark:border-gray-700">
                  <td className="p-2">{room.name}</td>
                  <td className="p-2">
                    <Input 
                      type="number" 
                      value={room.length || ''} 
                      onChange={e => updateRoomDimension(room.id, 'length', parseFloat(e.target.value) || 0)}
                      className="w-24"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="p-2">
                    <Input 
                      type="number" 
                      value={room.width || ''} 
                      onChange={e => updateRoomDimension(room.id, 'width', parseFloat(e.target.value) || 0)}
                      className="w-24"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="p-2 text-right font-medium">{room.area.toFixed(2)} m²</td>
                  <td className="p-2 text-center">
                    <input 
                      type="checkbox" 
                      checked={room.included} 
                      onChange={() => toggleRoomInclusion(room.id)}
                      className="h-4 w-4"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveRoom(room.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <td colSpan={3} className="p-2 font-medium">Surface habitable totale</td>
                <td className="p-2 text-right font-bold">{totalArea.toFixed(2)} m²</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
          <h3 className="font-medium mb-2">Ajouter une pièce</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="room-name">Nom de la pièce</Label>
              <Input 
                id="room-name" 
                value={newRoom.name}
                onChange={e => setNewRoom({...newRoom, name: e.target.value})}
                placeholder="ex: Chambre 2"
              />
            </div>
            <div>
              <Label htmlFor="room-length">Longueur (m)</Label>
              <Input 
                id="room-length" 
                type="number"
                value={newRoom.length || ''}
                onChange={e => setNewRoom({...newRoom, length: parseFloat(e.target.value) || 0})}
                placeholder="ex: 4.5"
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="room-width">Largeur (m)</Label>
              <Input 
                id="room-width" 
                type="number"
                value={newRoom.width || ''}
                onChange={e => setNewRoom({...newRoom, width: parseFloat(e.target.value) || 0})}
                placeholder="ex: 3.2"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <Button 
            onClick={handleAddRoom} 
            className="mt-4 w-full md:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter cette pièce
          </Button>
        </div>
        
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <FileDown className="h-4 w-4 mr-2" />
            Exporter en PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurfaceHabitableCalculator;
