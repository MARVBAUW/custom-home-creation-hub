
import React, { useState } from 'react';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Droplets, Home, Building, Calculator, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Sample DTU data for hygrometry
const hygrometrieDTUs: DTU[] = [
  {
    id: 'condensation-risque',
    title: 'Risques de condensation',
    category: ['Hygrométrie', 'Conception'],
    content: 'Cette fiche présente les risques de condensation dans le bâtiment et les méthodes de prévention.',
    references: ['DTU 20.1', 'NF EN ISO 13788'],
    date: '2023-06-15'
  },
  {
    id: 'point-rosee',
    title: 'Point de rosée et condensation',
    category: ['Hygrométrie', 'Calcul'],
    content: 'Cette fiche explique comment calculer le point de rosée et évaluer les risques de condensation dans les parois.',
    references: ['DTU 20.1', 'NF EN ISO 13788'],
    date: '2023-06-15'
  },
  {
    id: 'permeabilite-vapeur',
    title: 'Perméabilité à la vapeur d\'eau',
    category: ['Hygrométrie', 'Matériaux'],
    content: 'Caractéristiques de perméabilité à la vapeur d\'eau des principaux matériaux de construction.',
    references: ['DTU 20.1', 'NF EN ISO 13788'],
    date: '2023-06-15'
  },
  {
    id: 'ventilation-hygrometrie',
    title: 'Ventilation et contrôle hygrométrique',
    category: ['Hygrométrie', 'Ventilation'],
    content: 'Principes de ventilation pour le contrôle de l\'humidité dans les bâtiments.',
    references: ['DTU 68.3', 'Arrêté du 24 mars 1982'],
    date: '2023-06-15'
  },
  {
    id: 'frein-vapeur',
    title: 'Membranes pare-vapeur et frein-vapeur',
    category: ['Hygrométrie', 'Solutions techniques'],
    content: 'Caractéristiques et mise en œuvre des membranes pare-vapeur et frein-vapeur.',
    references: ['DTU 31.2', 'DTU 45.10'],
    date: '2023-06-15'
  },
  {
    id: 'humidite-relative',
    title: 'Humidité relative et absolue',
    category: ['Hygrométrie', 'Principes'],
    content: 'Définitions et principes de l\'humidité relative et absolue dans l\'air.',
    references: ['NF EN ISO 13788'],
    date: '2023-06-15'
  }
];

export const HygrometrieRecapSection = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    filteredDTUs 
  } = useDTUSearch(hygrometrieDTUs);
  
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [hygrometrieTab, setHygrometrieTab] = useState("principes");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [openCalculator, setOpenCalculator] = useState<string | null>(null);

  // Calculator states
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(60);
  const [wallTemperature, setWallTemperature] = useState(15);
  const [surfaceTemperature, setSurfaceTemperature] = useState(16);
  const [materialThickness, setMaterialThickness] = useState(0.2);
  const [materialLambda, setMaterialLambda] = useState(0.04);
  
  const handleDTUClick = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    
    // Simulate download delay
    setTimeout(() => {
      toast.success(`${name} téléchargé avec succès`);
      setDownloadingId(null);
    }, 1500);
  };

  const handleOpenCalculator = (id: string) => {
    setOpenCalculator(id);
  };

  // Calculate dew point temperature
  const calculateDewPoint = () => {
    // Magnus formula approximation
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return Math.round(dewPoint * 100) / 100;
  };

  // Calculate condensation risk
  const isCondensationRisk = () => {
    const dewPoint = calculateDewPoint();
    return surfaceTemperature < dewPoint;
  };

  // Calculate thermal resistance
  const calculateThermalResistance = () => {
    return materialThickness / materialLambda;
  };

  const calculators = {
    'dewpoint-calculator': {
      title: 'Calculateur de point de rosée',
      description: 'Déterminez le point de rosée et le risque de condensation'
    },
    'vapor-resistance-calculator': {
      title: 'Calculateur de résistance à la diffusion de vapeur',
      description: 'Évaluez la résistance d\'une paroi à la diffusion de vapeur d\'eau'
    },
    'hygrometry-risk-calculator': {
      title: 'Évaluation du risque hygrométrique',
      description: 'Calculez les risques liés à l\'humidité dans votre bâtiment'
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h3 className="text-blue-800 font-medium flex items-center gap-2 mb-2">
          <Droplets className="h-5 w-5" />
          Réglementation Hygrométrie
        </h3>
        <p className="text-blue-700 text-sm">
          Cette section présente les principes hygrométriques, les risques de condensation et les solutions techniques.
          Consultez les outils de calcul pour évaluer les performances hygrométriques de vos projets.
        </p>
      </div>

      <SearchAndFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      <Tabs value={hygrometrieTab} onValueChange={setHygrometrieTab} className="mt-6">
        <TabsList className="mb-6 bg-blue-50">
          <TabsTrigger value="principes" className="data-[state=active]:bg-white">
            <Droplets className="h-4 w-4 mr-2" />
            <span>Principes</span>
          </TabsTrigger>
          <TabsTrigger value="logement" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            <span>Logement</span>
          </TabsTrigger>
          <TabsTrigger value="tertiaire" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            <span>Tertiaire</span>
          </TabsTrigger>
          <TabsTrigger value="calculateurs" className="data-[state=active]:bg-white">
            <Calculator className="h-4 w-4 mr-2" />
            <span>Calculateurs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="principes" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.category.includes('Principes') || dtu.category.includes('Calcul'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Hygrométrie - Principes fondamentaux</CardTitle>
                <CardDescription>
                  Comprendre les bases de l'hygrométrie dans le bâtiment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Définitions essentielles :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Hygrométrie :</strong> Mesure du taux d'humidité dans l'air</li>
                  <li><strong>Humidité relative :</strong> Rapport entre l'humidité présente et la capacité maximale d'absorption d'humidité de l'air</li>
                  <li><strong>Point de rosée :</strong> Température à laquelle l'air devient saturé en humidité</li>
                  <li><strong>Condensation :</strong> Phénomène de passage de l'eau de l'état gazeux à l'état liquide</li>
                </ul>
                <h4 className="font-medium text-sm mt-3">Phénomènes hygrométriques :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Condensation superficielle :</strong> Formation d'eau sur les surfaces froides</li>
                  <li><strong>Condensation interne :</strong> Formation d'eau à l'intérieur des parois</li>
                  <li><strong>Migration de vapeur :</strong> Déplacement de la vapeur d'eau dans les matériaux</li>
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('hygrometrie-guide', 'Guide hygrométrie')}
                  disabled={downloadingId === 'hygrometrie-guide'}
                >
                  {downloadingId === 'hygrometrie-guide' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le guide
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Réglementation applicable</CardTitle>
                <CardDescription>
                  Exigences réglementaires relatives à l'hygrométrie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">DTU 20.1</h4>
                    <p className="text-xs text-gray-600">Ouvrages en maçonnerie de petits éléments - Parois et murs</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">DTU 68.3</h4>
                    <p className="text-xs text-gray-600">Installations de ventilation mécanique</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">NF EN ISO 13788</h4>
                    <p className="text-xs text-gray-600">Performance hygrothermique des composants et parois de bâtiments</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Arrêté du 24 mars 1982</h4>
                    <p className="text-xs text-gray-600">Dispositions relatives à l'aération des logements</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('hygro-reglem', 'Réglementation hygrométrie')}
                  disabled={downloadingId === 'hygro-reglem'}
                >
                  {downloadingId === 'hygro-reglem' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger la synthèse
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logement" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('ventilation') || dtu.id.includes('frein-vapeur'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Exigences pour l'habitat</CardTitle>
                <CardDescription>
                  Règles spécifiques aux bâtiments résidentiels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Ventilation :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Débits d'extraction :</strong> Cuisine: 20-45 m³/h, SDB: 15-30 m³/h, WC: 15-30 m³/h</li>
                  <li><strong>VMC :</strong> Simple flux ou double flux selon les besoins</li>
                  <li><strong>VMC Hygroréglable :</strong> Ajustement automatique selon l'humidité</li>
                </ul>
                <h4 className="font-medium text-sm mt-3">Protection contre l'humidité :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Pare-vapeur :</strong> Obligatoire dans les zones humides (Sd > 18m)</li>
                  <li><strong>Étanchéité à l'air :</strong> Q4Pa-surf ≤ 0,6 m³/(h.m²) pour les maisons</li>
                  <li><strong>Traitement des ponts thermiques :</strong> Pour éviter la condensation</li>
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('hygro-logement', 'Guide hygrométrie logement')}
                  disabled={downloadingId === 'hygro-logement'}
                >
                  {downloadingId === 'hygro-logement' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le guide
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Solutions techniques</CardTitle>
                <CardDescription>
                  Recommandations pour la gestion de l'humidité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Membrane pare-vapeur</h4>
                    <p className="text-xs text-gray-600">À placer du côté chaud de l'isolation pour limiter la migration de vapeur d'eau</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Membrane frein-vapeur</h4>
                    <p className="text-xs text-gray-600">Permet une légère migration de vapeur pour favoriser le séchage des parois</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Ventilation des parois</h4>
                    <p className="text-xs text-gray-600">Création de lames d'air ventilées pour évacuer l'humidité</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Matériaux hygroscopiques</h4>
                    <p className="text-xs text-gray-600">Capacité à absorber et restituer l'humidité pour réguler le taux d'humidité</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('dewpoint-calculator')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculateur de point de rosée
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tertiaire" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('condensation') || dtu.id.includes('permeabilite'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bâtiments tertiaires - Classification</CardTitle>
                <CardDescription>
                  Classification hygrométrique des locaux tertiaires
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Classes d'hygrométrie :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Faible :</strong> Bureaux, salles de classe, commerce (W/n ≤ 2,5 g/m³)</li>
                  <li><strong>Moyenne :</strong> Habitation, hôtels, restaurants (2,5 < W/n ≤ 5 g/m³)</li>
                  <li><strong>Forte :</strong> Cuisines collectives, salles de sport (5 < W/n ≤ 7,5 g/m³)</li>
                  <li><strong>Très forte :</strong> Piscines, blanchisseries (W/n > 7,5 g/m³)</li>
                </ul>
                <h4 className="font-medium text-sm mt-3">Exigences spécifiques :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Ventilation :</strong> Débits spécifiques selon l'occupation</li>
                  <li><strong>Déshumidification :</strong> Obligatoire pour les locaux à forte production d'humidité</li>
                  <li><strong>Étanchéité à l'air :</strong> Q4Pa-surf ≤ 1,2 m³/(h.m²) pour les bâtiments tertiaires</li>
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('hygro-tertiaire', 'Guide hygrométrie tertiaire')}
                  disabled={downloadingId === 'hygro-tertiaire'}
                >
                  {downloadingId === 'hygro-tertiaire' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le guide
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Caractéristiques des matériaux</CardTitle>
                <CardDescription>
                  Facteurs de résistance à la diffusion de vapeur d'eau (μ)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Matériaux d'isolation</h4>
                    <p className="text-xs text-gray-600">Laine minérale : μ = 1-2 | Polystyrène : μ = 30-100 | Polyuréthane : μ = 30-50</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Matériaux de construction</h4>
                    <p className="text-xs text-gray-600">Béton : μ = 50-100 | Brique : μ = 5-10 | Bois : μ = 20-50</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Pare-vapeur et membranes</h4>
                    <p className="text-xs text-gray-600">Film polyéthylène : μ > 100 000 | Frein-vapeur : μ = 2 000-20 000</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Revêtements</h4>
                    <p className="text-xs text-gray-600">Peinture acrylique : μ = 2 000-5 000 | Peinture glycéro : μ > 10 000</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('vapor-resistance-calculator')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculateur de résistance vapeur
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculateurs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calculateur de point de rosée</CardTitle>
                <CardDescription>
                  Déterminez le point de rosée et le risque de condensation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Température intérieure (°C)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="temperature"
                        min={0} 
                        max={30} 
                        step={0.5}
                        value={[temperature]} 
                        onValueChange={(value) => setTemperature(value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-medium">{temperature} °C</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidité relative (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="humidity"
                        min={0} 
                        max={100} 
                        step={1}
                        value={[humidity]} 
                        onValueChange={(value) => setHumidity(value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-medium">{humidity} %</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="surface-temp">Température de surface (°C)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="surface-temp"
                        min={0} 
                        max={30} 
                        step={0.5}
                        value={[surfaceTemperature]} 
                        onValueChange={(value) => setSurfaceTemperature(value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-medium">{surfaceTemperature} °C</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Point de rosée :</span>
                      <span className="font-bold">{calculateDewPoint()} °C</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Risque de condensation :</span>
                      <span className={isCondensationRisk() ? "font-bold text-red-500" : "font-bold text-green-500"}>
                        {isCondensationRisk() ? "OUI" : "NON"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('guide-point-rosee', 'Guide du point de rosée')}
                  disabled={downloadingId === 'guide-point-rosee'}
                >
                  {downloadingId === 'guide-point-rosee' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le guide
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Calculateur de résistance à la diffusion de vapeur</CardTitle>
                <CardDescription>
                  Évaluez la résistance d'une paroi à la diffusion de vapeur d'eau
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="material-thickness">Épaisseur du matériau (m)</Label>
                    <Input 
                      id="material-thickness"
                      type="number"
                      min={0.001}
                      max={1}
                      step={0.001}
                      value={materialThickness}
                      onChange={(e) => setMaterialThickness(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="material-lambda">Conductivité thermique λ (W/m.K)</Label>
                    <Input 
                      id="material-lambda"
                      type="number"
                      min={0.01}
                      max={2}
                      step={0.01}
                      value={materialLambda}
                      onChange={(e) => setMaterialLambda(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Résistance thermique :</span>
                      <span className="font-bold">{calculateThermalResistance().toFixed(2)} m².K/W</span>
                    </div>
                    
                    <div className="text-sm text-gray-500 mt-2">
                      Pour calculer la résistance à la diffusion de vapeur Sd, multipliez l'épaisseur du matériau par son facteur μ.
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('guide-resistance-vapeur', 'Guide de la résistance à la vapeur')}
                  disabled={downloadingId === 'guide-resistance-vapeur'}
                >
                  {downloadingId === 'guide-resistance-vapeur' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le guide
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Évaluation du risque hygrométrique</CardTitle>
                <CardDescription>
                  Calculez les risques liés à l'humidité dans votre bâtiment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wall-temp">Température de paroi (°C)</Label>
                    <div className="flex items-center gap-4">
                      <Slider 
                        id="wall-temp"
                        min={0} 
                        max={30} 
                        step={0.5}
                        value={[wallTemperature]} 
                        onValueChange={(value) => setWallTemperature(value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-right font-medium">{wallTemperature} °C</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-sm mb-2">
                      <strong>Facteurs de risque :</strong>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Condensation superficielle</span>
                        <span className={wallTemperature < calculateDewPoint() ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                          {wallTemperature < calculateDewPoint() ? "Risque élevé" : "Risque faible"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Moisissures</span>
                        <span className={wallTemperature < calculateDewPoint() + 2 ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                          {wallTemperature < calculateDewPoint() + 2 ? "Risque élevé" : "Risque faible"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span>Dégradation des matériaux</span>
                        <span className={humidity > 80 ? "text-red-500 font-medium" : "text-green-500 font-medium"}>
                          {humidity > 80 ? "Risque élevé" : "Risque faible"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('guide-risque-hygro', 'Guide des risques hygrométriques')}
                  disabled={downloadingId === 'guide-risque-hygro'}
                >
                  {downloadingId === 'guide-risque-hygro' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le guide
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <DTUDetailDialog 
        dtu={selectedDTU} 
        isOpen={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
        searchTerm={searchTerm}
      />

      {/* Calculator Dialogs */}
      <Dialog open={!!openCalculator} onOpenChange={() => setOpenCalculator(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {openCalculator && calculators[openCalculator as keyof typeof calculators]?.title}
            </DialogTitle>
            <DialogDescription>
              {openCalculator && calculators[openCalculator as keyof typeof calculators]?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4">
            {openCalculator === 'dewpoint-calculator' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="temperature-calc">Température intérieure (°C)</Label>
                      <Input 
                        id="temperature-calc"
                        type="number"
                        min={0}
                        max={40}
                        step={0.1}
                        value={temperature}
                        onChange={(e) => setTemperature(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="humidity-calc">Humidité relative (%)</Label>
                      <Input 
                        id="humidity-calc"
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        value={humidity}
                        onChange={(e) => setHumidity(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="surface-temp-calc">Température de surface (°C)</Label>
                      <Input 
                        id="surface-temp-calc"
                        type="number"
                        min={0}
                        max={40}
                        step={0.1}
                        value={surfaceTemperature}
                        onChange={(e) => setSurfaceTemperature(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Résultats</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Point de rosée :</span>
                        <span className="font-bold text-xl">{calculateDewPoint()} °C</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Risque de condensation :</span>
                        <span className={`font-bold text-xl ${isCondensationRisk() ? "text-red-500" : "text-green-500"}`}>
                          {isCondensationRisk() ? "OUI" : "NON"}
                        </span>
                      </div>
                      
                      <div className="pt-4 text-sm text-gray-600">
                        {isCondensationRisk() ? (
                          <p>Il y a un risque de condensation car la température de surface ({surfaceTemperature} °C) est inférieure au point de rosée ({calculateDewPoint()} °C).</p>
                        ) : (
                          <p>Pas de risque de condensation car la température de surface ({surfaceTemperature} °C) est supérieure au point de rosée ({calculateDewPoint()} °C).</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm bg-blue-50 p-4 rounded-md">
                  <p className="mb-2 font-medium">Comment éviter la condensation :</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Améliorer l'isolation thermique des parois pour augmenter leur température de surface</li>
                    <li>Ventiler correctement les locaux pour réduire l'humidité relative</li>
                    <li>Installer un pare-vapeur du côté chaud de l'isolation</li>
                    <li>Utiliser un déshumidificateur si nécessaire</li>
                  </ul>
                </div>
              </div>
            )}
            
            {openCalculator === 'vapor-resistance-calculator' && (
              <div className="space-y-4">
                <p className="text-center text-gray-500">
                  Le calculateur de résistance à la diffusion de vapeur est en cours de chargement...
                </p>
              </div>
            )}
            
            {openCalculator === 'hygrometry-risk-calculator' && (
              <div className="space-y-4">
                <p className="text-center text-gray-500">
                  L'évaluateur de risque hygrométrique est en cours de chargement...
                </p>
              </div>
            )}
            
            <div className="flex justify-center mt-8">
              <Button onClick={() => setOpenCalculator(null)}>
                Fermer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
