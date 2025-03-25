
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Plus, Trash2, Download, Printer } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

type Room = {
  id: string;
  name: string;
  length: number;
  width: number;
  area: number;
  type: string;
};

// Add the jsPDF types
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const SurfaceCalculator = () => {
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomName, setRoomName] = useState('');
  const [roomLength, setRoomLength] = useState('');
  const [roomWidth, setRoomWidth] = useState('');
  const [roomType, setRoomType] = useState('habitable');
  
  const roomTypes = [
    { value: 'habitable', label: 'Surface habitable' },
    { value: 'annexe', label: 'Annexe' },
    { value: 'exterieur', label: 'Extérieur' }
  ];
  
  // Calculate total areas
  const totalHabitable = rooms
    .filter(room => room.type === 'habitable')
    .reduce((sum, room) => sum + room.area, 0);
    
  const totalAnnexe = rooms
    .filter(room => room.type === 'annexe')
    .reduce((sum, room) => sum + room.area, 0);
    
  const totalExterieur = rooms
    .filter(room => room.type === 'exterieur')
    .reduce((sum, room) => sum + room.area, 0);
  
  const totalArea = totalHabitable + totalAnnexe + totalExterieur;
  
  const handleAddRoom = () => {
    if (!roomName || !roomLength || !roomWidth) {
      toast({
        title: "Champs incomplets",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }
    
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    
    if (isNaN(length) || isNaN(width)) {
      toast({
        title: "Valeurs invalides",
        description: "Les dimensions doivent être des nombres valides",
        variant: "destructive",
      });
      return;
    }
    
    const newRoom: Room = {
      id: Date.now().toString(),
      name: roomName,
      length,
      width,
      area: length * width,
      type: roomType
    };
    
    setRooms([...rooms, newRoom]);
    toast({
      title: "Pièce ajoutée",
      description: `${roomName} ajoutée avec une surface de ${(length * width).toFixed(2)} m²`,
    });
    
    // Reset form
    setRoomName('');
    setRoomLength('');
    setRoomWidth('');
  };
  
  const handleDeleteRoom = (id: string) => {
    setRooms(rooms.filter(room => room.id !== id));
    toast({
      title: "Pièce supprimée",
      description: "La pièce a été supprimée du calcul",
    });
  };
  
  const formatArea = (area: number) => {
    return area.toFixed(2);
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title and header
    doc.setFontSize(20);
    doc.text('Calculateur de Surface - Progineer', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Rapport de calcul de surface', 105, 30, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 40, { align: 'center' });
    
    // Add room table
    doc.autoTable({
      startY: 50,
      head: [['Pièce', 'Type', 'Longueur (m)', 'Largeur (m)', 'Surface (m²)']],
      body: rooms.map(room => [
        room.name, 
        roomTypes.find(t => t.value === room.type)?.label || room.type,
        room.length.toString(),
        room.width.toString(),
        formatArea(room.area)
      ]),
      headStyles: { fillColor: [171, 163, 138] },
      alternateRowStyles: { fillColor: [245, 245, 240] }
    });
    
    // Add summary
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    
    doc.setFontSize(14);
    doc.text('Résumé des surfaces', 20, finalY + 20);
    
    doc.setFontSize(12);
    doc.text(`Surface habitable: ${formatArea(totalHabitable)} m²`, 20, finalY + 30);
    doc.text(`Surface annexes: ${formatArea(totalAnnexe)} m²`, 20, finalY + 40);
    doc.text(`Surface extérieure: ${formatArea(totalExterieur)} m²`, 20, finalY + 50);
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text(`Surface totale: ${formatArea(totalArea)} m²`, 20, finalY + 70);
    
    // Footer
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Document généré par l\'outil de calcul Progineer', 105, 280, { align: 'center' });
    
    // Save PDF
    doc.save('calcul-surface-progineer.pdf');
    
    toast({
      title: "PDF généré",
      description: "Le rapport a été téléchargé avec succès",
    });
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5 text-khaki-600" />
          Calculateur de surface habitable
        </CardTitle>
        <CardDescription>
          Calculez facilement la surface habitable de votre logement selon les normes en vigueur
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="input" className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="input">Saisie des pièces</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="roomName">Nom de la pièce</Label>
                    <Input
                      id="roomName"
                      placeholder="Ex: Salon, Chambre 1..."
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="roomLength">Longueur (m)</Label>
                    <Input
                      id="roomLength"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 4.5"
                      value={roomLength}
                      onChange={(e) => setRoomLength(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="roomWidth">Largeur (m)</Label>
                    <Input
                      id="roomWidth"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 3.2"
                      value={roomWidth}
                      onChange={(e) => setRoomWidth(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="roomType">Type de surface</Label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger id="roomType" className="w-full">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleAddRoom} className="w-full md:w-auto">
                  <Plus className="mr-2 h-4 w-4" /> Ajouter cette pièce
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Liste des pièces</h3>
                {rooms.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Aucune pièce n'a été ajoutée</p>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pièce</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surface</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {rooms.map((room) => (
                          <tr key={room.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {roomTypes.find(t => t.value === room.type)?.label}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {room.length} x {room.width} m
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">
                              {formatArea(room.area)} m²
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleDeleteRoom(room.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              <div className="bg-khaki-50 p-6 rounded-lg border border-khaki-100">
                <h3 className="text-lg font-medium mb-4">Résumé des surfaces</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500">Surface habitable</p>
                    <p className="text-2xl font-bold text-khaki-800">{formatArea(totalHabitable)} m²</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500">Surface annexes</p>
                    <p className="text-2xl font-bold text-khaki-800">{formatArea(totalAnnexe)} m²</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                    <p className="text-sm text-gray-500">Surface extérieure</p>
                    <p className="text-2xl font-bold text-khaki-800">{formatArea(totalExterieur)} m²</p>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-khaki-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Surface totale</p>
                      <p className="text-3xl font-bold text-khaki-800">{formatArea(totalArea)} m²</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2">
                        <Printer className="h-4 w-4" /> Imprimer
                      </Button>
                      <Button onClick={generatePDF} className="flex items-center gap-2 bg-khaki-600 hover:bg-khaki-700">
                        <Download className="h-4 w-4" /> Exporter en PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h4 className="font-medium mb-2">Note sur le calcul des surfaces</h4>
                <p className="text-sm text-gray-600">
                  La surface habitable d'un logement est la surface de plancher construite, après déduction des surfaces 
                  occupées par les murs, cloisons, marches et cages d'escaliers, gaines, embrasures de portes et de fenêtres.
                  Il n'est pas tenu compte de la superficie des combles non aménagés, caves, sous-sols, remises, garages, 
                  terrasses, loggias, balcons, séchoirs extérieurs au logement, vérandas, volumes vitrés, locaux communs et autres 
                  dépendances des logements, ni des parties de locaux d'une hauteur inférieure à 1,80 mètre.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SurfaceCalculator;
