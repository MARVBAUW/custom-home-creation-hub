
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Container from '@/components/common/Container';
import { useClientAuth } from '@/hooks/useClientAuth';
import ClientNavigation from '@/components/client/ClientNavigation';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Home, Calculator, Euro, Hammer, Building, Ruler, RefreshCcw, Download, Check } from 'lucide-react';

const EstimationTravaux = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculatedEstimation, setCalculatedEstimation] = useState<null | number>(null);
  const navigate = useNavigate();
  
  // Check localStorage for admin mode
  React.useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Generate a random estimation between 50,000 and 150,000
      const estimation = Math.floor(Math.random() * (150000 - 50000 + 1)) + 50000;
      setCalculatedEstimation(estimation);
      setIsCalculating(false);
    }, 1500);
  };

  const formattedPrice = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Estimation de Travaux | Espace Client Progineer</title>
        <meta name="description" content="Estimez le coût de vos travaux avec Progineer." />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Outils
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Estimation de Travaux
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Estimez le coût de vos travaux de construction ou de rénovation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <ClientNavigation isAdminMode={isAdminMode} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="construction" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="construction" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>Construction Neuve</span>
                  </TabsTrigger>
                  <TabsTrigger value="renovation" className="flex items-center gap-2">
                    <Hammer className="h-4 w-4" />
                    <span>Rénovation</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Construction Neuve */}
                <TabsContent value="construction">
                  <Card>
                    <CardHeader>
                      <CardTitle>Estimation Construction Neuve</CardTitle>
                      <CardDescription>
                        Entrez les caractéristiques de votre projet pour obtenir une estimation.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="surface">Surface habitable (m²)</Label>
                        <Input id="surface" type="number" placeholder="Ex: 120" />
                      </div>
                      
                      <div>
                        <Label htmlFor="type">Type de construction</Label>
                        <Select defaultValue="traditional">
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="traditional">Traditionnelle</SelectItem>
                            <SelectItem value="modern">Moderne</SelectItem>
                            <SelectItem value="eco">Éco-responsable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Emplacement</Label>
                        <Select defaultValue="city">
                          <SelectTrigger id="location">
                            <SelectValue placeholder="Sélectionnez un emplacement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="city">Zone urbaine</SelectItem>
                            <SelectItem value="suburban">Zone périurbaine</SelectItem>
                            <SelectItem value="rural">Zone rurale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="quality">Niveau de qualité</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="quality">
                            <SelectValue placeholder="Sélectionnez un niveau" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">Basique</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="luxury">Luxe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col space-y-1">
                          <Label htmlFor="garage">Garage</Label>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Inclure un garage</span>
                        </div>
                        <Switch id="garage" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col space-y-1">
                          <Label htmlFor="basement">Sous-sol</Label>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Inclure un sous-sol</span>
                        </div>
                        <Switch id="basement" />
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="flex items-center gap-2">
                          <span>Options supplémentaires</span>
                          <Badge variant="outline" className="ml-2">Facultatif</Badge>
                        </Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="pool" />
                            <Label htmlFor="pool">Piscine</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="solar" />
                            <Label htmlFor="solar">Panneaux solaires</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="heatpump" />
                            <Label htmlFor="heatpump">Pompe à chaleur</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="smarthome" />
                            <Label htmlFor="smarthome">Domotique</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <Button 
                        className="w-full bg-khaki-600 hover:bg-khaki-700 text-white flex items-center justify-center h-12"
                        onClick={handleCalculate}
                        disabled={isCalculating}
                      >
                        {isCalculating ? (
                          <>
                            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                            Calcul en cours...
                          </>
                        ) : (
                          <>
                            <Calculator className="mr-2 h-4 w-4" />
                            Calculer l'estimation
                          </>
                        )}
                      </Button>
                      
                      {calculatedEstimation && (
                        <div className="w-full p-4 border border-green-200 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-green-800 flex items-center">
                              <Check className="mr-2 h-5 w-5" />
                              Estimation complétée
                            </h3>
                            <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                              <Download className="mr-1.5 h-3.5 w-3.5" />
                              PDF
                            </Button>
                          </div>
                          <p className="text-green-700 mb-2">
                            Votre projet est estimé à environ:
                          </p>
                          <div className="text-3xl font-bold text-green-800 flex items-center">
                            <Euro className="mr-2 h-6 w-6" />
                            {formattedPrice(calculatedEstimation)}
                          </div>
                          <p className="text-sm text-green-600 mt-2">
                            Cette estimation inclut le coût de construction sans les frais de notaire et les taxes.
                          </p>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Rénovation */}
                <TabsContent value="renovation">
                  <Card>
                    <CardHeader>
                      <CardTitle>Estimation Rénovation</CardTitle>
                      <CardDescription>
                        Estimez le coût de vos travaux de rénovation.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="renovation-surface">Surface à rénover (m²)</Label>
                        <Input id="renovation-surface" type="number" placeholder="Ex: 80" />
                      </div>
                      
                      <div>
                        <Label htmlFor="renovation-type">Type de rénovation</Label>
                        <Select defaultValue="light">
                          <SelectTrigger id="renovation-type">
                            <SelectValue placeholder="Sélectionnez un type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Légère (peinture, sols)</SelectItem>
                            <SelectItem value="medium">Moyenne (cuisine, salle de bain)</SelectItem>
                            <SelectItem value="heavy">Lourde (murs, plomberie, électricité)</SelectItem>
                            <SelectItem value="complete">Complète (tout refaire)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="building-age">Âge du bâtiment</Label>
                        <Select defaultValue="10-30">
                          <SelectTrigger id="building-age">
                            <SelectValue placeholder="Sélectionnez une tranche d'âge" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-10">Moins de 10 ans</SelectItem>
                            <SelectItem value="10-30">10 à 30 ans</SelectItem>
                            <SelectItem value="30-50">30 à 50 ans</SelectItem>
                            <SelectItem value="50+">Plus de 50 ans</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label>Postes de travaux</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="walls" />
                            <Label htmlFor="walls">Murs / Cloisons</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="flooring" />
                            <Label htmlFor="flooring">Sols</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="plumbing" />
                            <Label htmlFor="plumbing">Plomberie</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="electricity" />
                            <Label htmlFor="electricity">Électricité</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="kitchen" />
                            <Label htmlFor="kitchen">Cuisine</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="bathroom" />
                            <Label htmlFor="bathroom">Salle de bain</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="windows" />
                            <Label htmlFor="windows">Fenêtres</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="heating" />
                            <Label htmlFor="heating">Chauffage</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <Button 
                        className="w-full bg-khaki-600 hover:bg-khaki-700 text-white flex items-center justify-center h-12"
                        onClick={handleCalculate}
                        disabled={isCalculating}
                      >
                        {isCalculating ? (
                          <>
                            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                            Calcul en cours...
                          </>
                        ) : (
                          <>
                            <Calculator className="mr-2 h-4 w-4" />
                            Calculer l'estimation
                          </>
                        )}
                      </Button>
                      
                      {calculatedEstimation && (
                        <div className="w-full p-4 border border-green-200 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-medium text-green-800 flex items-center">
                              <Check className="mr-2 h-5 w-5" />
                              Estimation complétée
                            </h3>
                            <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                              <Download className="mr-1.5 h-3.5 w-3.5" />
                              PDF
                            </Button>
                          </div>
                          <p className="text-green-700 mb-2">
                            Vos travaux sont estimés à environ:
                          </p>
                          <div className="text-3xl font-bold text-green-800 flex items-center">
                            <Euro className="mr-2 h-6 w-6" />
                            {formattedPrice(calculatedEstimation)}
                          </div>
                          <p className="text-sm text-green-600 mt-2">
                            Cette estimation inclut les matériaux et la main d'œuvre hors taxes.
                          </p>
                        </div>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default EstimationTravaux;
