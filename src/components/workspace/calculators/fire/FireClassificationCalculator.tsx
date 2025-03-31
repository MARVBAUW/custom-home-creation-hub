
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Building, Users, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FireClassificationCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('erp');
  const [erpType, setErpType] = useState('M');
  const [erpOccupancy, setErpOccupancy] = useState('300');
  const [habitationType, setHabitationType] = useState('');
  const [floorsCount, setFloorsCount] = useState('3');
  const [buildingHeight, setBuildingHeight] = useState('9');
  
  // Détermination de la catégorie ERP
  const determineErpCategory = () => {
    const occupancy = parseInt(erpOccupancy);
    
    if (occupancy > 1500) return '1ère catégorie';
    if (occupancy > 700) return '2ème catégorie';
    if (occupancy > 300) return '3ème catégorie';
    if (occupancy > 200 && ['L', 'M', 'R', 'S', 'T', 'V', 'W', 'X', 'Y'].includes(erpType)) return '4ème catégorie';
    if (occupancy > 100 && ['N', 'O', 'P', 'U'].includes(erpType)) return '4ème catégorie';
    if (occupancy > 20 && ['J'].includes(erpType)) return '4ème catégorie';
    return '5ème catégorie';
  };
  
  // Détermination de la famille d'habitation
  const determineHabitationFamily = () => {
    const floors = parseInt(floorsCount);
    const height = parseFloat(buildingHeight);
    
    if (habitationType === 'individual') {
      if (floors <= 1) return '1ère famille';
      return '2ème famille';
    }
    
    if (habitationType === 'collective') {
      if (floors <= 3) return '2ème famille';
      if (floors <= 7 && height <= 28) {
        if (height <= 8) return '3ème famille A';
        return '3ème famille B';
      }
      if (height <= 50) return '4ème famille';
      return 'IGH';
    }
    
    return 'Non déterminé';
  };
  
  const getErpTypeDescription = () => {
    const erpTypeDescriptions: {[key: string]: string} = {
      'J': 'Structures d\'accueil pour personnes âgées ou handicapées',
      'L': 'Salles de spectacles, réunions, conférences, multimédia',
      'M': 'Magasins, centres commerciaux',
      'N': 'Restaurants, débits de boissons',
      'O': 'Hôtels et autres hébergements',
      'P': 'Salles de danse, de jeux',
      'R': 'Établissements d\'enseignement, colonies de vacances',
      'S': 'Bibliothèques, centres de documentation',
      'T': 'Salles d\'expositions',
      'U': 'Établissements sanitaires',
      'V': 'Établissements de culte',
      'W': 'Bureaux, administrations',
      'X': 'Établissements sportifs couverts',
      'Y': 'Musées',
    };
    
    return erpTypeDescriptions[erpType] || 'Type non spécifié';
  };
  
  // Reset form values
  const handleReset = () => {
    setErpType('M');
    setErpOccupancy('300');
    setHabitationType('');
    setFloorsCount('3');
    setBuildingHeight('9');
  };
  
  // Handle download report
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport de classification incendie est en cours de téléchargement."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculateur de Classification Incendie</CardTitle>
        <CardDescription>
          Détermination du classement des bâtiments selon la réglementation incendie en vigueur
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="erp" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span>ERP</span>
            </TabsTrigger>
            <TabsTrigger value="habitation" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Habitation</span>
            </TabsTrigger>
            <TabsTrigger value="reference" className="flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>Référence</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="erp" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="erpType">Type d'ERP</Label>
                  <Select value={erpType} onValueChange={setErpType}>
                    <SelectTrigger id="erpType">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="J">J - Structures d'accueil</SelectItem>
                      <SelectItem value="L">L - Salles de spectacles</SelectItem>
                      <SelectItem value="M">M - Magasins, commerces</SelectItem>
                      <SelectItem value="N">N - Restaurants</SelectItem>
                      <SelectItem value="O">O - Hôtels</SelectItem>
                      <SelectItem value="P">P - Dancings, jeux</SelectItem>
                      <SelectItem value="R">R - Enseignement</SelectItem>
                      <SelectItem value="S">S - Bibliothèques</SelectItem>
                      <SelectItem value="T">T - Expositions</SelectItem>
                      <SelectItem value="U">U - Sanitaires</SelectItem>
                      <SelectItem value="V">V - Culte</SelectItem>
                      <SelectItem value="W">W - Bureaux</SelectItem>
                      <SelectItem value="X">X - Sportifs</SelectItem>
                      <SelectItem value="Y">Y - Musées</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="erpOccupancy">Effectif total (personnes)</Label>
                  <Input 
                    id="erpOccupancy"
                    type="number" 
                    value={erpOccupancy} 
                    onChange={(e) => setErpOccupancy(e.target.value)}
                  />
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" onClick={handleReset} className="mr-2">
                    Réinitialiser
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-3">Résultat</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Type d'établissement</p>
                      <p className="text-lg font-medium">Type {erpType} - {getErpTypeDescription()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Catégorie</p>
                      <p className="text-lg font-medium">{determineErpCategory()}</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertDescription>
                    Ce calcul est basé sur l'effectif global de l'établissement. Des règles spécifiques peuvent s'appliquer selon la configuration exacte.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="habitation" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="habitationType" className="mb-2 block">Type d'habitation</Label>
                  <RadioGroup 
                    value={habitationType} 
                    onValueChange={setHabitationType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Individuelle</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="collective" id="collective" />
                      <Label htmlFor="collective">Collective</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="floorsCount">Nombre d'étages (hors RDC)</Label>
                  <Input 
                    id="floorsCount"
                    type="number" 
                    value={floorsCount} 
                    onChange={(e) => setFloorsCount(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="buildingHeight">Hauteur du plancher bas du dernier niveau (m)</Label>
                  <Input 
                    id="buildingHeight"
                    type="number" 
                    step="0.1"
                    value={buildingHeight} 
                    onChange={(e) => setBuildingHeight(e.target.value)}
                  />
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" onClick={handleReset} className="mr-2">
                    Réinitialiser
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-3">Résultat</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Famille d'habitation</p>
                      <p className="text-lg font-medium">{determineHabitationFamily()}</p>
                    </div>
                    
                    {habitationType && (
                      <div>
                        <p className="text-sm text-gray-500">Type d'habitation</p>
                        <p className="text-lg font-medium">
                          {habitationType === 'individual' ? 'Habitation individuelle' : 'Habitation collective'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertDescription>
                    La classification dépend également de la distance aux escaliers et de l'accessibilité par les échelles incendie qui ne sont pas prises en compte dans ce calcul simplifié.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reference" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Classification des ERP</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><span className="font-medium">1ère catégorie:</span> Plus de 1500 personnes</li>
                  <li><span className="font-medium">2ème catégorie:</span> De 701 à 1500 personnes</li>
                  <li><span className="font-medium">3ème catégorie:</span> De 301 à 700 personnes</li>
                  <li><span className="font-medium">4ème catégorie:</span> 300 personnes et moins, sauf 5ème catégorie</li>
                  <li><span className="font-medium">5ème catégorie:</span> Effectif inférieur au seuil d'assujettissement</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Classification des habitations</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><span className="font-medium">1ère famille:</span> Habitations individuelles R+1 maximum, isolées ou jumelées</li>
                  <li><span className="font-medium">2ème famille:</span> Habitations individuelles &gt; R+1, collectives ≤ R+3</li>
                  <li><span className="font-medium">3ème famille A:</span> R+7 maximum, dernier niveau ≤ 28m, accès échelles pompiers</li>
                  <li><span className="font-medium">3ème famille B:</span> R+7 maximum, dernier niveau ≤ 28m, sans accès échelles pompiers</li>
                  <li><span className="font-medium">4ème famille:</span> 28m &lt; dernier niveau ≤ 50m</li>
                  <li><span className="font-medium">IGH:</span> Immeuble de Grande Hauteur (dernier niveau &gt; 50m)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Les résultats de ce calculateur sont fournis à titre indicatif. La classification exacte doit être validée par un bureau de contrôle agréé.
      </CardFooter>
    </Card>
  );
};

export default FireClassificationCalculator;
