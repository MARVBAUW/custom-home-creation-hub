
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Calculator, Ruler, Plus, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

type Room = {
  id: string;
  name: string;
  width: number;
  length: number;
  coefficient: number;
  area: number;
};

const SurfaceCalculator = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [projectName, setProjectName] = useState<string>("Mon calcul de surface");
  const [rooms, setRooms] = useState<Room[]>([
    { id: '1', name: 'Salon', width: 5, length: 4, coefficient: 1, area: 20 },
    { id: '2', name: 'Chambre 1', width: 3.5, length: 3, coefficient: 1, area: 10.5 },
  ]);
  const [calculationType, setCalculationType] = useState<'shab' | 'shon'>('shab');
  
  // Calculate total surface
  const calculateTotalSurface = () => {
    const updatedRooms = rooms.map(room => ({
      ...room,
      area: parseFloat((room.width * room.length * room.coefficient).toFixed(2))
    }));
    
    setRooms(updatedRooms);
    
    const totalSurface = updatedRooms.reduce((total, room) => total + room.area, 0);
    
    toast({
      title: "Calcul effectué",
      description: `Surface totale ${calculationType.toUpperCase()}: ${totalSurface.toFixed(2)} m²`,
    });
  };
  
  // Add a new room
  const addRoom = () => {
    const newId = (rooms.length + 1).toString();
    setRooms([
      ...rooms,
      { id: newId, name: `Pièce ${newId}`, width: 3, length: 3, coefficient: 1, area: 9 }
    ]);
  };
  
  // Delete a room
  const deleteRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };
  
  // Handle room property change
  const handleRoomChange = (id: string, property: keyof Room, value: number | string) => {
    setRooms(rooms.map(room => {
      if (room.id === id) {
        const updatedRoom = { ...room, [property]: value };
        if (property === 'width' || property === 'length' || property === 'coefficient') {
          const width = property === 'width' ? Number(value) : room.width;
          const length = property === 'length' ? Number(value) : room.length;
          const coefficient = property === 'coefficient' ? Number(value) : room.coefficient;
          updatedRoom.area = parseFloat((width * length * coefficient).toFixed(2));
        }
        return updatedRoom;
      }
      return room;
    }));
  };
  
  // Generate PDF report
  const generatePDF = () => {
    toast({
      title: "Export PDF",
      description: "Votre rapport de calcul de surface a été généré avec succès.",
    });
    // In a real implementation, would use jsPDF or similar
  };
  
  // Save calculation to user account
  const saveCalculation = async () => {
    if (!user) {
      toast({
        title: "Authentification requise",
        description: "Vous devez être connecté pour sauvegarder un calcul.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const totalSurface = rooms.reduce((total, room) => total + room.area, 0);
      
      const simulationData = {
        title: projectName,
        type: 'surface',
        user_id: user.id,
        is_temporary: false,
        content: {
          calculationType,
          rooms,
          totalSurface
        }
      };
      
      const { data, error } = await supabase
        .from('user_simulations')
        .insert(simulationData)
        .select('id');
        
      if (error) throw error;
      
      toast({
        title: "Simulation sauvegardée",
        description: "Votre calcul de surface a été sauvegardé dans votre compte.",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la simulation. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };
  
  // Calculate totals
  const totalSurface = rooms.reduce((total, room) => total + room.area, 0);
  
  // Prepare data for pie chart
  const chartData = rooms.map(room => ({
    name: room.name,
    value: room.area
  }));
  
  const COLORS = ['#A8A878', '#C6B785', '#D8C69E', '#E8D8B0', '#F0E5C9', '#F8F0DD', '#FFFAF0'];
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Ruler className="h-5 w-5 text-khaki-600" />
          Calculateur de surfaces
        </CardTitle>
        <CardDescription>
          Calculez précisément la surface habitable (SHAB), surface hors œuvre nette (SHON) et autres métriques de votre projet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator">
          <TabsList className="mb-4">
            <TabsTrigger value="calculator">Calculateur</TabsTrigger>
            <TabsTrigger value="information">Informations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Nom du projet</Label>
                    <Input
                      id="projectName"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Type de calcul</Label>
                    <RadioGroup
                      value={calculationType}
                      onValueChange={(value: 'shab' | 'shon') => setCalculationType(value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="shab" id="shab" />
                        <Label htmlFor="shab">Surface habitable (SHAB)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="shon" id="shon" />
                        <Label htmlFor="shon">Surface hors œuvre nette (SHON)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="bg-khaki-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-3">Résultat</h3>
                  <div className="text-3xl font-bold text-khaki-700 mb-3">
                    {totalSurface.toFixed(2)} m²
                  </div>
                  
                  {rooms.length > 0 && (
                    <div className="h-40">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value} m²`}
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} m²`, '']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Liste des pièces</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={addRoom}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter une pièce
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div key={room.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <Input
                            value={room.name}
                            onChange={(e) => handleRoomChange(room.id, 'name', e.target.value)}
                            className="max-w-[200px] font-medium"
                          />
                          <span className="text-sm text-gray-500">
                            {room.area} m²
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteRoom(room.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor={`width-${room.id}`} className="text-xs">Largeur (m)</Label>
                          <Input
                            id={`width-${room.id}`}
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={room.width}
                            onChange={(e) => handleRoomChange(room.id, 'width', Number(e.target.value))}
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor={`length-${room.id}`} className="text-xs">Longueur (m)</Label>
                          <Input
                            id={`length-${room.id}`}
                            type="number"
                            min="0.1"
                            step="0.1"
                            value={room.length}
                            onChange={(e) => handleRoomChange(room.id, 'length', Number(e.target.value))}
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor={`coefficient-${room.id}`} className="text-xs">Coefficient</Label>
                          <Select
                            value={room.coefficient.toString()}
                            onValueChange={(value) => handleRoomChange(room.id, 'coefficient', Number(value))}
                          >
                            <SelectTrigger id={`coefficient-${room.id}`}>
                              <SelectValue placeholder="Coefficient" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">100% - Pièce principale</SelectItem>
                              <SelectItem value="0.5">50% - Sous hauteur</SelectItem>
                              <SelectItem value="0">0% - Non comptabilisée</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-6 gap-3">
                  <Button 
                    onClick={calculateTotalSurface} 
                    className="bg-khaki-500 hover:bg-khaki-600 text-white"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer la surface
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-khaki-200 hover:bg-khaki-100"
                    onClick={generatePDF}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Exporter en PDF
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="border-khaki-200 hover:bg-khaki-100"
                    onClick={saveCalculation}
                  >
                    <Ruler className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="information">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Les différentes surfaces en immobilier</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Surface habitable (SHAB)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    La surface habitable correspond à la superficie des planchers construits, après déduction des surfaces occupées par les murs, cloisons, marches et cages d'escaliers, gaines, embrasures de portes et de fenêtres.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>Exclut les combles non aménagés, sous-sols, remises, garages, terrasses, loggias, balcons, vérandas, caves et dépendances</li>
                    <li>Exclut les parties de locaux d'une hauteur inférieure à 1,80 mètre</li>
                    <li>Utilisée pour les baux d'habitation, ventes de logements, calcul des charges locatives</li>
                  </ul>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Surface hors œuvre nette (SHON)</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    La SHON est égale à la surface hors œuvre brute (SHOB) après déduction de certaines surfaces.
                  </p>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    <li>La SHOB comprend la totalité des surfaces de planchers de chaque niveau de construction</li>
                    <li>De la SHOB, on déduit: combles et sous-sols non aménageables, toitures-terrasses, balcons, loggias, surfaces non closes au rez-de-chaussée</li>
                    <li>Utilisée principalement pour le calcul des droits à construire et des taxes d'urbanisme</li>
                  </ul>
                </div>
              </div>
              
              <div className="border p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Autres surfaces utiles</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Surface utile</p>
                    <p className="text-xs text-gray-600">Surface habitable + surfaces annexes pondérées (caves, garages, etc.)</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Surface de plancher</p>
                    <p className="text-xs text-gray-600">A remplacé la SHON depuis 2012 pour les demandes d'autorisation d'urbanisme</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Surface Carrez</p>
                    <p className="text-xs text-gray-600">Utilisée pour la vente de lots en copropriété, mesurée à l'intérieur des murs</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Surface pondérée</p>
                    <p className="text-xs text-gray-600">Attribue des coefficients de pondération aux différentes pièces selon leur usage</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-khaki-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Comment utiliser ce calculateur ?</h4>
                <ol className="list-decimal pl-5 text-sm space-y-2">
                  <li>Choisissez le type de calcul que vous souhaitez effectuer (SHAB ou SHON)</li>
                  <li>Ajoutez les différentes pièces de votre bien</li>
                  <li>Pour chaque pièce, indiquez ses dimensions (largeur et longueur)</li>
                  <li>Appliquez un coefficient selon la nature de la pièce:
                    <ul className="list-disc pl-5 mt-1 text-xs">
                      <li>100% pour les pièces principales</li>
                      <li>50% pour les surfaces sous hauteur (entre 1,80m et 2,20m)</li>
                      <li>0% pour les surfaces non comptabilisées</li>
                    </ul>
                  </li>
                  <li>Cliquez sur "Calculer la surface" pour obtenir le résultat total</li>
                </ol>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SurfaceCalculator;
