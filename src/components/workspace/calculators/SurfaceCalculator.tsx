
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Calculator, Download, Save, RotateCcw, Plus, Minus, HelpCircle, Check } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface RoomData {
  id: number;
  name: string;
  length: number;
  width: number;
  height: number;
  openings: number; // Surface des ouvertures (fenêtres, portes)
  area: number;
  legalArea: number; // Surface légale (Loi Carrez)
  habitalArea: number; // Surface habitable
  notes: string;
}

const SurfaceCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('standard');
  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [nextId, setNextId] = useState(1);
  const [totalSurface, setTotalSurface] = useState(0);
  const [totalHabitable, setTotalHabitable] = useState(0);
  const [totalCarrez, setTotalCarrez] = useState(0);
  const [projectName, setProjectName] = useState('Mon projet');
  const [clientName, setClientName] = useState('');
  const [address, setAddress] = useState('');
  const [coefficient, setCoefficient] = useState(1);
  const [includeHeightFactor, setIncludeHeightFactor] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [tempRoom, setTempRoom] = useState<Partial<RoomData>>({
    name: '',
    length: 0,
    width: 0,
    height: 2.5,
    openings: 0
  });

  // Calculer les totaux
  useEffect(() => {
    const surface = rooms.reduce((sum, room) => sum + room.area, 0);
    const habitable = rooms.reduce((sum, room) => sum + room.habitalArea, 0);
    const carrez = rooms.reduce((sum, room) => sum + room.legalArea, 0);
    
    setTotalSurface(parseFloat(surface.toFixed(2)));
    setTotalHabitable(parseFloat(habitable.toFixed(2)));
    setTotalCarrez(parseFloat(carrez.toFixed(2)));
  }, [rooms]);

  const calculateSurface = (length: number, width: number, height: number, openings: number) => {
    if (!length || !width) return { area: 0, habitalArea: 0, legalArea: 0 };
    
    // Surface brute
    const area = length * width * coefficient;
    
    // Application des règles pour la surface habitable
    let habitalArea = area - openings;
    
    // Règles de hauteur pour surface habitable
    if (includeHeightFactor) {
      if (height < 1.8) {
        habitalArea = 0; // Surface sous 1.8m non comptabilisée
      } else if (height < 2.2) {
        habitalArea = habitalArea * 0.5; // Surface sous 2.2m comptée pour moitié
      }
    }
    
    // Surface Carrez (pas de déduction sous 8m²)
    let legalArea = area;
    if (area < 8) {
      legalArea = 0;
    }
    
    return {
      area: parseFloat(area.toFixed(2)),
      habitalArea: parseFloat(habitalArea.toFixed(2)),
      legalArea: parseFloat(legalArea.toFixed(2))
    };
  };

  const handleRoomChange = (field: string, value: string | number, id: number) => {
    const updatedRooms = rooms.map(room => {
      if (room.id === id) {
        const updatedRoom = { ...room, [field]: value };
        
        // Recalculer les surfaces
        if (['length', 'width', 'height', 'openings'].includes(field)) {
          const { area, habitalArea, legalArea } = calculateSurface(
            updatedRoom.length,
            updatedRoom.width,
            updatedRoom.height,
            updatedRoom.openings
          );
          
          return {
            ...updatedRoom,
            area,
            habitalArea,
            legalArea
          };
        }
        
        return updatedRoom;
      }
      return room;
    });
    
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    if (!tempRoom.name || !tempRoom.length || !tempRoom.width) {
      toast({
        title: "Données incomplètes",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    const { area, habitalArea, legalArea } = calculateSurface(
      tempRoom.length || 0,
      tempRoom.width || 0,
      tempRoom.height || 2.5,
      tempRoom.openings || 0
    );
    
    const newRoom: RoomData = {
      id: nextId,
      name: tempRoom.name || '',
      length: tempRoom.length || 0,
      width: tempRoom.width || 0,
      height: tempRoom.height || 2.5,
      openings: tempRoom.openings || 0,
      area,
      habitalArea,
      legalArea,
      notes: tempRoom.notes || ''
    };
    
    setRooms([...rooms, newRoom]);
    setNextId(nextId + 1);
    setTempRoom({
      name: '',
      length: 0,
      width: 0,
      height: 2.5,
      openings: 0,
      notes: ''
    });
    
    toast({
      title: "Pièce ajoutée",
      description: `${newRoom.name} ajouté avec une surface de ${newRoom.area} m².`
    });
  };

  const removeRoom = (id: number) => {
    setRooms(rooms.filter(room => room.id !== id));
    toast({
      title: "Pièce supprimée",
      description: "La pièce a été retirée du calcul."
    });
  };

  const resetCalculator = () => {
    if (rooms.length > 0) {
      if (confirm("Êtes-vous sûr de vouloir réinitialiser le calculateur ? Toutes les données seront perdues.")) {
        setRooms([]);
        setProjectName('Mon projet');
        setClientName('');
        setAddress('');
        setCoefficient(1);
        setIncludeHeightFactor(false);
        setAdvancedMode(false);
        
        toast({
          title: "Calculateur réinitialisé",
          description: "Toutes les données ont été effacées."
        });
      }
    } else {
      toast({
        title: "Aucune donnée à effacer",
        description: "Le calculateur est déjà vide."
      });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Titre
    doc.setFontSize(20);
    doc.text('Calcul de surfaces', 105, 15, { align: 'center' });
    
    // Informations du projet
    doc.setFontSize(12);
    doc.text(`Projet: ${projectName}`, 14, 30);
    doc.text(`Client: ${clientName}`, 14, 37);
    doc.text(`Adresse: ${address}`, 14, 44);
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 14, 51);
    
    // Totaux
    doc.setFontSize(14);
    doc.text('Résumé des surfaces:', 14, 65);
    doc.setFontSize(12);
    doc.text(`Surface brute totale: ${totalSurface} m²`, 14, 72);
    doc.text(`Surface habitable: ${totalHabitable} m²`, 14, 79);
    doc.text(`Surface Loi Carrez: ${totalCarrez} m²`, 14, 86);
    
    // Tableau des pièces
    if (rooms.length > 0) {
      // @ts-ignore
      doc.autoTable({
        startY: 95,
        head: [['Pièce', 'Dimensions (m)', 'Surface (m²)', 'Surface habitable (m²)', 'Surface Carrez (m²)', 'Notes']],
        body: rooms.map(room => [
          room.name,
          `${room.length} × ${room.width} × ${room.height}`,
          room.area.toFixed(2),
          room.habitalArea.toFixed(2),
          room.legalArea.toFixed(2),
          room.notes || '-'
        ]),
        headStyles: { fillColor: [163, 145, 97] },
        alternateRowStyles: { fillColor: [245, 245, 240] }
      });
    }
    
    // Mentions légales
    const finalY = (doc as any).lastAutoTable.finalY || 200;
    doc.setFontSize(10);
    doc.text('Document généré par Progineer', 105, finalY + 15, { align: 'center' });
    doc.text('Ce document est fourni à titre indicatif et ne constitue pas un document officiel.', 105, finalY + 22, { align: 'center' });
    
    // Sauvegarde
    doc.save(`Calcul_surfaces_${projectName.replace(/\s+/g, '_')}.pdf`);
    
    toast({
      title: "PDF généré avec succès",
      description: "Le document a été téléchargé sur votre appareil."
    });
  };

  const saveToLocalStorage = () => {
    const data = {
      projectName,
      clientName,
      address,
      rooms,
      coefficient,
      includeHeightFactor,
      advancedMode
    };
    
    localStorage.setItem('surfaceCalculator', JSON.stringify(data));
    
    toast({
      title: "Projet sauvegardé",
      description: "Vos calculs ont été enregistrés localement."
    });
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('surfaceCalculator');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setProjectName(data.projectName || 'Mon projet');
        setClientName(data.clientName || '');
        setAddress(data.address || '');
        setRooms(data.rooms || []);
        setCoefficient(data.coefficient || 1);
        setIncludeHeightFactor(data.includeHeightFactor || false);
        setAdvancedMode(data.advancedMode || false);
        
        // Trouver le prochain ID disponible
        if (data.rooms && data.rooms.length > 0) {
          const maxId = Math.max(...data.rooms.map((r: RoomData) => r.id));
          setNextId(maxId + 1);
        }
        
        toast({
          title: "Projet chargé",
          description: "Vos calculs ont été restaurés."
        });
      } catch (e) {
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données sauvegardées.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Aucune sauvegarde",
        description: "Aucun projet sauvegardé n'a été trouvé."
      });
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-khaki-600" />
              Calculateur de surfaces
            </CardTitle>
            <CardDescription>
              Calculez facilement la surface habitable et la surface Loi Carrez
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={resetCalculator}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Réinitialiser le calculateur</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={saveToLocalStorage}>
                    <Save className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sauvegarder le projet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={loadFromLocalStorage}>
                    <Check className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Charger le dernier projet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="standard">Informations</TabsTrigger>
            <TabsTrigger value="calculator">Calculateur</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          {/* Onglet Informations */}
          <TabsContent value="standard" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Nom du projet</Label>
                <Input 
                  id="projectName" 
                  value={projectName} 
                  onChange={(e) => setProjectName(e.target.value)} 
                  placeholder="Nom du projet"
                />
              </div>
              
              <div>
                <Label htmlFor="clientName">Nom du client</Label>
                <Input 
                  id="clientName" 
                  value={clientName} 
                  onChange={(e) => setClientName(e.target.value)} 
                  placeholder="Nom du client"
                />
              </div>
              
              <div>
                <Label htmlFor="address">Adresse du bien</Label>
                <Input 
                  id="address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="Adresse complète"
                />
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="advanced">Mode avancé</Label>
                  <Switch
                    id="advanced"
                    checked={advancedMode}
                    onCheckedChange={setAdvancedMode}
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Activez le mode avancé pour accéder à des options supplémentaires comme les coefficients et les règles de hauteur.
                </p>
              </div>
              
              {advancedMode && (
                <>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Label htmlFor="coefficient">Coefficient de majoration/minoration</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Permet d'appliquer un coefficient (ex: 0.98 pour un biais de mesure, 1.05 pour une marge de sécurité)</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input 
                        id="coefficient" 
                        value={coefficient} 
                        onChange={(e) => setCoefficient(parseFloat(e.target.value) || 1)} 
                        className="w-24 text-right"
                        type="number"
                        step="0.01"
                        min="0.5"
                        max="1.5"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        <Label htmlFor="heightFactor">Appliquer les règles de hauteur sous plafond</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-gray-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">Selon la réglementation: les surfaces de moins de 1.8m de hauteur ne sont pas comptées, celles entre 1.8m et 2.2m sont comptées pour moitié</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Switch
                        id="heightFactor"
                        checked={includeHeightFactor}
                        onCheckedChange={setIncludeHeightFactor}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="pt-4">
                <Button onClick={() => setActiveTab('calculator')} className="w-full">
                  Passer au calcul des surfaces
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Onglet Calculateur */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Formulaire d'ajout de pièce */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ajouter une pièce</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="roomName">Nom de la pièce *</Label>
                    <Input 
                      id="roomName" 
                      value={tempRoom.name} 
                      onChange={(e) => setTempRoom({...tempRoom, name: e.target.value})} 
                      placeholder="Ex: Salon, Chambre 1..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="roomLength">Longueur (m) *</Label>
                      <Input 
                        id="roomLength" 
                        type="number" 
                        step="0.01"
                        value={tempRoom.length || ''} 
                        onChange={(e) => setTempRoom({...tempRoom, length: parseFloat(e.target.value) || 0})} 
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomWidth">Largeur (m) *</Label>
                      <Input 
                        id="roomWidth" 
                        type="number" 
                        step="0.01"
                        value={tempRoom.width || ''} 
                        onChange={(e) => setTempRoom({...tempRoom, width: parseFloat(e.target.value) || 0})} 
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="roomHeight">Hauteur (m)</Label>
                      <Input 
                        id="roomHeight" 
                        type="number" 
                        step="0.01"
                        value={tempRoom.height || 2.5} 
                        onChange={(e) => setTempRoom({...tempRoom, height: parseFloat(e.target.value) || 2.5})} 
                        placeholder="2.50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="roomOpenings">Surface des ouvertures (m²)</Label>
                      <Input 
                        id="roomOpenings" 
                        type="number" 
                        step="0.01"
                        value={tempRoom.openings || ''} 
                        onChange={(e) => setTempRoom({...tempRoom, openings: parseFloat(e.target.value) || 0})} 
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="roomNotes">Notes</Label>
                    <Input 
                      id="roomNotes" 
                      value={tempRoom.notes || ''} 
                      onChange={(e) => setTempRoom({...tempRoom, notes: e.target.value})} 
                      placeholder="Informations supplémentaires..."
                    />
                  </div>
                  
                  <Button onClick={addRoom} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter cette pièce
                  </Button>
                </CardContent>
              </Card>
              
              {/* Aperçu des calculs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Aperçu du calcul</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tempRoom.length && tempRoom.width ? (
                    <>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Dimensions:</div>
                        <div className="font-medium">{tempRoom.length} × {tempRoom.width} m</div>
                        
                        <div>Surface brute:</div>
                        <div className="font-medium">
                          {(tempRoom.length * tempRoom.width * coefficient).toFixed(2)} m²
                        </div>
                        
                        {tempRoom.openings ? (
                          <>
                            <div>Surface des ouvertures:</div>
                            <div className="font-medium">{tempRoom.openings} m²</div>
                          </>
                        ) : null}
                        
                        <div>Surface habitable estimée:</div>
                        <div className="font-medium">
                          {calculateSurface(
                            tempRoom.length || 0,
                            tempRoom.width || 0,
                            tempRoom.height || 2.5,
                            tempRoom.openings || 0
                          ).habitalArea.toFixed(2)} m²
                        </div>
                        
                        <div>Surface Loi Carrez estimée:</div>
                        <div className="font-medium">
                          {calculateSurface(
                            tempRoom.length || 0,
                            tempRoom.width || 0,
                            tempRoom.height || 2.5,
                            tempRoom.openings || 0
                          ).legalArea.toFixed(2)} m²
                        </div>
                      </div>
                      
                      {includeHeightFactor && (tempRoom.height || 0) < 2.2 && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm">
                          <div className="font-medium text-amber-800 mb-1">Attention à la hauteur sous plafond</div>
                          <p className="text-amber-700">
                            {(tempRoom.height || 0) < 1.8 
                              ? "Cette hauteur est inférieure à 1.8m. La surface ne sera pas comptabilisée dans la surface habitable."
                              : "Cette hauteur est entre 1.8m et 2.2m. La surface sera comptabilisée pour moitié dans la surface habitable."}
                          </p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Entrez les dimensions pour voir l'aperçu du calcul</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Liste des pièces ajoutées */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Liste des pièces ({rooms.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {rooms.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pièce</TableHead>
                          <TableHead>Dimensions</TableHead>
                          <TableHead>Surface brute</TableHead>
                          <TableHead>Surface habitable</TableHead>
                          <TableHead>Surface Carrez</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rooms.map((room) => (
                          <TableRow key={room.id}>
                            <TableCell className="font-medium">{room.name}</TableCell>
                            <TableCell>{room.length} × {room.width} m</TableCell>
                            <TableCell>{room.area.toFixed(2)} m²</TableCell>
                            <TableCell>{room.habitalArea.toFixed(2)} m²</TableCell>
                            <TableCell>{room.legalArea.toFixed(2)} m²</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeRoom(room.id)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Aucune pièce n'a encore été ajoutée</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button onClick={() => setActiveTab('results')} disabled={rooms.length === 0}>
                Voir les résultats
              </Button>
            </div>
          </TabsContent>
          
          {/* Onglet Résultats */}
          <TabsContent value="results" className="space-y-6">
            {rooms.length > 0 ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle>Récapitulatif des surfaces</CardTitle>
                    <CardDescription>
                      Projet: {projectName} {clientName ? `| Client: ${clientName}` : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-khaki-50 p-4 rounded-lg space-y-1">
                        <div className="text-sm text-gray-500">Surface brute totale</div>
                        <div className="text-3xl font-bold">{totalSurface} m²</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg space-y-1">
                        <div className="text-sm text-gray-500">Surface habitable</div>
                        <div className="text-3xl font-bold">{totalHabitable} m²</div>
                        <div className="text-xs text-gray-500">
                          Selon la loi Boutin (CCH: R.111-2)
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg space-y-1">
                        <div className="text-sm text-gray-500">Surface Loi Carrez</div>
                        <div className="text-3xl font-bold">{totalCarrez} m²</div>
                        <div className="text-xs text-gray-500">
                          Surfaces ≥ 8m² avec h ≥ 1.80m
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Détail par pièce</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Pièce</TableHead>
                          <TableHead>Dimensions</TableHead>
                          <TableHead>Surface brute</TableHead>
                          <TableHead>Surface habitable</TableHead>
                          <TableHead>Surface Carrez</TableHead>
                          {tempRoom.notes && <TableHead>Notes</TableHead>}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rooms.map((room) => (
                          <TableRow key={room.id}>
                            <TableCell className="font-medium">{room.name}</TableCell>
                            <TableCell>{room.length} × {room.width} m</TableCell>
                            <TableCell>{room.area.toFixed(2)} m²</TableCell>
                            <TableCell>
                              {room.habitalArea.toFixed(2)} m²
                              {room.habitalArea !== room.area && (
                                <Badge variant="outline" className="ml-2 text-xs">
                                  {(room.habitalArea / room.area * 100).toFixed(0)}%
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {room.legalArea.toFixed(2)} m²
                              {room.legalArea === 0 && room.area > 0 && (
                                <Badge variant="outline" className="ml-2 text-xs bg-red-50 text-red-700">
                                  Non comptée
                                </Badge>
                              )}
                            </TableCell>
                            {room.notes && <TableCell>{room.notes}</TableCell>}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setActiveTab('calculator')}>
                    Modifier le calcul
                  </Button>
                  <Button onClick={generatePDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le rapport PDF
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-khaki-100 mb-4">
                  <Calculator className="h-8 w-8 text-khaki-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Aucune donnée disponible</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Vous n'avez pas encore ajouté de pièces à votre calcul. Commencez par ajouter des pièces dans l'onglet "Calculateur".
                </p>
                <Button onClick={() => setActiveTab('calculator')}>
                  Aller au calculateur
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t pt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Ce calculateur respecte les normes de calcul de surfaces selon la loi Boutin et la loi Carrez.
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={saveToLocalStorage}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SurfaceCalculator;
