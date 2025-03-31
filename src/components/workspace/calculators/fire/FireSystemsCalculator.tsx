
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, BellRing, Siren, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface SSICategoryState {
  [key: string]: boolean;
}

const FireSystemsCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('ssi');
  const [erpType, setErpType] = useState('M');
  const [erpCategory, setErpCategory] = useState('1');
  const [buildingType, setBuildingType] = useState('erp');
  const [detectionType, setDetectionType] = useState('manual');
  
  // État pour les catégories SSI sélectionnées
  const [ssiCategoryChecks, setSsiCategoryChecks] = useState<SSICategoryState>({
    sleepingOccupancy: false,
    highRiseBulding: false,
    multipleLevels: true,
    largeOpenSpace: false,
    difficultEvacuation: false
  });
  
  // Détermination de la catégorie SSI
  const determineSSICategory = () => {
    // ERP première catégorie ou avec locaux à sommeil = SSI A
    if (buildingType === 'erp' && (erpCategory === '1' || ssiCategoryChecks.sleepingOccupancy)) {
      return 'A';
    }
    
    // Immeuble de grande hauteur (IGH)
    if (ssiCategoryChecks.highRiseBulding) {
      return 'A';
    }
    
    // ERP 2ème catégorie ou grande surface ou évacuation difficile
    if (buildingType === 'erp' && (erpCategory === '2' || ssiCategoryChecks.largeOpenSpace || ssiCategoryChecks.difficultEvacuation)) {
      return 'B';
    }
    
    // ERP 3ème ou 4ème catégorie
    if (buildingType === 'erp' && (erpCategory === '3' || erpCategory === '4')) {
      return 'C';
    }
    
    // ERP 5ème catégorie ou habitation
    if (buildingType === 'erp' && erpCategory === '5') {
      return 'E';
    }
    
    // Code du travail, principalement SSI de catégorie D ou E
    if (buildingType === 'workplace') {
      if (ssiCategoryChecks.multipleLevels || ssiCategoryChecks.largeOpenSpace) {
        return 'D';
      }
      return 'E';
    }
    
    // Habitation
    if (buildingType === 'residential') {
      return 'E';
    }
    
    return 'D'; // Par défaut
  };
  
  // Détermination du type d'alarme
  const determineAlarmType = () => {
    const ssiCategory = determineSSICategory();
    
    if (ssiCategory === 'A') return detectionType === 'automatic' ? '1' : '2a';
    if (ssiCategory === 'B') return '2b';
    if (ssiCategory === 'C') return '3';
    if (ssiCategory === 'D') return '4';
    return 'Alarme simple';
  };
  
  // Handle download
  const handleDownload = () => {
    toast({
      title: "Téléchargement démarré",
      description: "Le rapport de dimensionnement SSI est en cours de téléchargement."
    });
  };
  
  // Liste des types d'ERP avec descriptions
  const erpTypes = [
    { value: "J", label: "J - Structures d'accueil" },
    { value: "L", label: "L - Salles de spectacles" },
    { value: "M", label: "M - Magasins, commerces" },
    { value: "N", label: "N - Restaurants" },
    { value: "O", label: "O - Hôtels" },
    { value: "P", label: "P - Dancings, jeux" },
    { value: "R", label: "R - Enseignement" },
    { value: "S", label: "S - Bibliothèques" },
    { value: "T", label: "T - Expositions" },
    { value: "U", label: "U - Sanitaires" },
    { value: "V", label: "V - Culte" },
    { value: "W", label: "W - Bureaux" },
    { value: "X", label: "X - Sportifs" },
    { value: "Y", label: "Y - Musées" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Systèmes de Sécurité Incendie (SSI)</CardTitle>
        <CardDescription>
          Détermination des systèmes d'alarme, de détection et de mise en sécurité incendie adaptés à votre bâtiment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="ssi" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Catégorie SSI</span>
            </TabsTrigger>
            <TabsTrigger value="alarm" className="flex items-center gap-2">
              <BellRing className="w-4 h-4" />
              <span>Type d'alarme</span>
            </TabsTrigger>
            <TabsTrigger value="rules" className="flex items-center gap-2">
              <Siren className="w-4 h-4" />
              <span>Réglementation</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="ssi" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="buildingType" className="mb-2 block">Type de bâtiment</Label>
                  <RadioGroup 
                    value={buildingType} 
                    onValueChange={setBuildingType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="erp" id="erp" />
                      <Label htmlFor="erp">ERP (établissement recevant du public)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="workplace" id="workplace" />
                      <Label htmlFor="workplace">Code du travail</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="residential" id="residential" />
                      <Label htmlFor="residential">Habitation</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {buildingType === 'erp' && (
                  <>
                    <div>
                      <Label htmlFor="erpType">Type d'ERP</Label>
                      <Select value={erpType} onValueChange={setErpType}>
                        <SelectTrigger id="erpType">
                          <SelectValue placeholder="Sélectionner un type" />
                        </SelectTrigger>
                        <SelectContent>
                          {erpTypes.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="erpCategory">Catégorie d'ERP</Label>
                      <Select value={erpCategory} onValueChange={setErpCategory}>
                        <SelectTrigger id="erpCategory">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1ère catégorie (&gt; 1500 personnes)</SelectItem>
                          <SelectItem value="2">2ème catégorie (701 à 1500 personnes)</SelectItem>
                          <SelectItem value="3">3ème catégorie (301 à 700 personnes)</SelectItem>
                          <SelectItem value="4">4ème catégorie (≤ 300 personnes)</SelectItem>
                          <SelectItem value="5">5ème catégorie (seuil spécifique)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                <div>
                  <Label htmlFor="detectionType" className="mb-2 block">Type de détection</Label>
                  <RadioGroup 
                    value={detectionType} 
                    onValueChange={setDetectionType}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manual" id="manual" />
                      <Label htmlFor="manual">Manuelle (déclencheurs manuels)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="automatic" id="automatic" />
                      <Label htmlFor="automatic">Automatique (détecteurs)</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="mr-2">
                    Réinitialiser
                  </Button>
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Caractéristiques du bâtiment</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sleepingOccupancy" 
                        checked={ssiCategoryChecks.sleepingOccupancy}
                        onCheckedChange={() => setSsiCategoryChecks({
                          ...ssiCategoryChecks,
                          sleepingOccupancy: !ssiCategoryChecks.sleepingOccupancy
                        })}
                      />
                      <label
                        htmlFor="sleepingOccupancy"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Locaux à sommeil (hébergement)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="highRiseBulding" 
                        checked={ssiCategoryChecks.highRiseBulding}
                        onCheckedChange={() => setSsiCategoryChecks({
                          ...ssiCategoryChecks,
                          highRiseBulding: !ssiCategoryChecks.highRiseBulding
                        })}
                      />
                      <label
                        htmlFor="highRiseBulding"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Immeuble de grande hauteur (IGH)
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="multipleLevels" 
                        checked={ssiCategoryChecks.multipleLevels}
                        onCheckedChange={() => setSsiCategoryChecks({
                          ...ssiCategoryChecks,
                          multipleLevels: !ssiCategoryChecks.multipleLevels
                        })}
                      />
                      <label
                        htmlFor="multipleLevels"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Plusieurs niveaux
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="largeOpenSpace" 
                        checked={ssiCategoryChecks.largeOpenSpace}
                        onCheckedChange={() => setSsiCategoryChecks({
                          ...ssiCategoryChecks,
                          largeOpenSpace: !ssiCategoryChecks.largeOpenSpace
                        })}
                      />
                      <label
                        htmlFor="largeOpenSpace"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Grande surface en plateau
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="difficultEvacuation" 
                        checked={ssiCategoryChecks.difficultEvacuation}
                        onCheckedChange={() => setSsiCategoryChecks({
                          ...ssiCategoryChecks,
                          difficultEvacuation: !ssiCategoryChecks.difficultEvacuation
                        })}
                      />
                      <label
                        htmlFor="difficultEvacuation"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Évacuation difficile ou complexe
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-3">Résultats</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Catégorie de SSI</p>
                      <p className="text-xl font-medium">Catégorie {determineSSICategory()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Type d'alarme</p>
                      <p className="text-xl font-medium">Type {determineAlarmType()}</p>
                    </div>
                  </div>
                </div>
                
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertDescription>
                    Cette préconisation est indicative et doit être validée par un bureau d'études spécialisé en sécurité incendie.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="alarm" className="space-y-4">
            <div className="space-y-6">
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Types d'alarme et caractéristiques</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Détection</th>
                        <th className="text-left p-2">Équipements requis</th>
                        <th className="text-left p-2">Application typique</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2">Type 1</td>
                        <td className="p-2">Automatique</td>
                        <td className="p-2">SDI, CMSI, détecteurs automatiques, BAAS Sa + BAAS Sa-ME</td>
                        <td className="p-2">ERP 1ère catégorie, IGH, locaux à sommeil</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Type 2a</td>
                        <td className="p-2">Manuelle</td>
                        <td className="p-2">CMSI, déclencheurs manuels, BAAS Sa + BAAS Sa-ME</td>
                        <td className="p-2">ERP 1ère catégorie, sans détection automatique</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Type 2b</td>
                        <td className="p-2">Manuelle</td>
                        <td className="p-2">Équipement d'alarme, déclencheurs manuels, BAAS Sa/Sa-ME</td>
                        <td className="p-2">ERP 2ème catégorie</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2">Type 3</td>
                        <td className="p-2">Manuelle</td>
                        <td className="p-2">Équipement d'alarme, déclencheurs manuels, BAAS Ma-ME</td>
                        <td className="p-2">ERP 3ème et 4ème catégorie</td>
                      </tr>
                      <tr>
                        <td className="p-2">Type 4</td>
                        <td className="p-2">Manuelle</td>
                        <td className="p-2">Équipement d'alarme, déclencheurs manuels, BAAS Ma</td>
                        <td className="p-2">ERP 5ème catégorie, code du travail</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Équipements de SSI</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><span className="font-medium">SDI:</span> Système de Détection Incendie</li>
                    <li><span className="font-medium">CMSI:</span> Centralisateur de Mise en Sécurité Incendie</li>
                    <li><span className="font-medium">BAAS:</span> Bloc Autonome d'Alarme Sonore</li>
                    <li><span className="font-medium">Sa:</span> Équipement d'alarme de type Sa (Sonore)</li>
                    <li><span className="font-medium">Ma:</span> Équipement d'alarme de type Ma (Manuel)</li>
                    <li><span className="font-medium">ME:</span> Message Enregistré d'évacuation</li>
                  </ul>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="font-medium mb-2">Fonctions de mise en sécurité</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><span className="font-medium">Compartimentage:</span> Fermeture des portes coupe-feu</li>
                    <li><span className="font-medium">Désenfumage:</span> Ouverture des exutoires ou lancement extraction</li>
                    <li><span className="font-medium">Évacuation:</span> Diffusion du signal d'évacuation</li>
                    <li><span className="font-medium">Non-arrêt ascenseurs:</span> Rappel des ascenseurs au niveau d'évacuation</li>
                    <li><span className="font-medium">Arrêt ventilation:</span> Coupure de la ventilation non liée au désenfumage</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Cadre réglementaire</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><span className="font-medium">Arrêté du 25 juin 1980:</span> Règlement de sécurité contre les risques d'incendie et de panique dans les ERP</li>
                  <li><span className="font-medium">Arrêté du 31 janvier 1986:</span> Protection contre l'incendie des bâtiments d'habitation</li>
                  <li><span className="font-medium">Code du travail:</span> Articles R.4216-1 à R.4216-34 et R.4227-1 à R.4227-57</li>
                  <li><span className="font-medium">Norme NF S 61-930 et suivantes:</span> Systèmes concourant à la Sécurité Incendie</li>
                  <li><span className="font-medium">IT 246:</span> Désenfumage dans les ERP</li>
                </ul>
              </div>
              
              <div className="p-4 border rounded-md">
                <h3 className="font-medium mb-2">Catégories de SSI</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><span className="font-medium">Catégorie A:</span> Système centralisé complet avec SDI et CMSI, fonctions automatiques et manuelles</li>
                  <li><span className="font-medium">Catégorie B:</span> Système centralisé sans SDI, avec CMSI et déclencheurs manuels</li>
                  <li><span className="font-medium">Catégorie C:</span> Équipements d'alarme avec temporisation</li>
                  <li><span className="font-medium">Catégorie D:</span> Équipements d'alarme simple</li>
                  <li><span className="font-medium">Catégorie E:</span> Équipements d'alarme élémentaires sans obligation normative stricte</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Les résultats de ce calculateur sont fournis à titre indicatif. La conception d'un système de sécurité incendie doit être réalisée par un bureau d'études spécialisé.
      </CardFooter>
    </Card>
  );
};

export default FireSystemsCalculator;
