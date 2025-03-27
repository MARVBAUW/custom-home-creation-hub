
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Container from '@/components/common/Container';
import { useClientAuth } from '@/hooks/useClientAuth';
import ClientNavigation from '@/components/client/ClientNavigation';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Calculator, Euro, ClipboardCheck, Download, Check, RefreshCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DevisHonoraires = () => {
  const { isLoaded, isSignedIn, user } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [montantTravaux, setMontantTravaux] = useState<number>(100000);
  const [typeMission, setTypeMission] = useState<string>('complete');
  const [typeProjet, setTypeProjet] = useState<string>('individual');
  const [complexite, setComplexite] = useState<number>(50);
  const [isCalculating, setIsCalculating] = useState(false);
  const [tauxHonoraires, setTauxHonoraires] = useState<number | null>(null);
  const [montantHonoraires, setMontantHonoraires] = useState<number | null>(null);
  
  // Check localStorage for admin mode
  React.useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  const calculerHonoraires = () => {
    setIsCalculating(true);
    
    // Simuler un appel API
    setTimeout(() => {
      // Calculer le taux d'honoraires en fonction du montant des travaux
      // et de la complexité
      let taux = 0;
      
      if (montantTravaux < 50000) {
        taux = 12;
      } else if (montantTravaux < 150000) {
        taux = 10;
      } else if (montantTravaux < 300000) {
        taux = 9;
      } else if (montantTravaux < 500000) {
        taux = 8;
      } else {
        taux = 7;
      }
      
      // Ajuster le taux en fonction de la complexité (±2%)
      const ajustementComplexite = ((complexite - 50) / 50) * 2;
      taux += ajustementComplexite;
      
      // Ajuster le taux en fonction du type de mission
      if (typeMission === 'partielle') {
        taux *= 0.7;
      } else if (typeMission === 'etude') {
        taux *= 0.4;
      }
      
      // Ajuster le taux en fonction du type de projet
      if (typeProjet === 'commercial') {
        taux *= 1.2;
      } else if (typeProjet === 'renovation') {
        taux *= 1.1;
      }
      
      // Arrondir à 2 décimales
      taux = Math.round(taux * 100) / 100;
      
      // Calculer le montant des honoraires
      const montant = Math.round(montantTravaux * (taux / 100));
      
      setTauxHonoraires(taux);
      setMontantHonoraires(montant);
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
        <title>Devis Honoraires | Espace Client Progineer</title>
        <meta name="description" content="Calculez les honoraires pour votre projet avec Progineer." />
      </Helmet>

      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Devis
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Calcul d'Honoraires
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Estimez les honoraires du maître d'œuvre pour votre projet.
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
              <Card>
                <CardHeader>
                  <CardTitle>Devis d'Honoraires</CardTitle>
                  <CardDescription>
                    Calculez les honoraires du maître d'œuvre en fonction de votre projet.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert variant="default" className="bg-blue-50 text-blue-800 border-blue-200">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Information</AlertTitle>
                    <AlertDescription>
                      Ce calculateur donne une estimation des honoraires. Le taux exact peut varier 
                      en fonction des spécificités de votre projet. Contactez-nous pour un devis précis.
                    </AlertDescription>
                  </Alert>
                  
                  <div>
                    <Label htmlFor="montant-travaux">
                      Montant estimé des travaux : {formattedPrice(montantTravaux)}
                    </Label>
                    <Input 
                      id="montant-travaux" 
                      type="range" 
                      min={10000} 
                      max={1000000} 
                      step={1000}
                      value={montantTravaux}
                      onChange={(e) => setMontantTravaux(parseInt(e.target.value))}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>10 000 €</span>
                      <span>1 000 000 €</span>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="type-mission">Type de mission</Label>
                    <RadioGroup 
                      id="type-mission" 
                      value={typeMission}
                      onValueChange={setTypeMission}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="complete" id="mission-complete" />
                        <Label htmlFor="mission-complete" className="cursor-pointer">
                          Mission complète
                          <span className="block text-xs text-gray-500">
                            Conception à réception
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="partielle" id="mission-partielle" />
                        <Label htmlFor="mission-partielle" className="cursor-pointer">
                          Mission partielle
                          <span className="block text-xs text-gray-500">
                            Sans suivi d'exécution
                          </span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="etude" id="mission-etude" />
                        <Label htmlFor="mission-etude" className="cursor-pointer">
                          Étude uniquement
                          <span className="block text-xs text-gray-500">
                            Phase conception
                          </span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label htmlFor="type-projet">Type de projet</Label>
                    <Select 
                      value={typeProjet}
                      onValueChange={setTypeProjet}
                    >
                      <SelectTrigger id="type-projet" className="mt-2">
                        <SelectValue placeholder="Sélectionnez un type de projet" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Maison individuelle</SelectItem>
                        <SelectItem value="renovation">Rénovation</SelectItem>
                        <SelectItem value="extension">Extension</SelectItem>
                        <SelectItem value="commercial">Bâtiment commercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="complexite">Complexité du projet</Label>
                      <Badge variant="outline" className="text-xs">
                        {complexite < 30 ? 'Simple' : complexite < 70 ? 'Moyen' : 'Complexe'}
                      </Badge>
                    </div>
                    <Slider
                      id="complexite"
                      value={[complexite]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => setComplexite(value[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Simple</span>
                      <span>Standard</span>
                      <span>Complexe</span>
                    </div>
                  </div>
                  
                  <Separator />
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    className="w-full bg-khaki-600 hover:bg-khaki-700 text-white flex items-center justify-center h-12"
                    onClick={calculerHonoraires}
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
                        Calculer les honoraires
                      </>
                    )}
                  </Button>
                  
                  {montantHonoraires !== null && tauxHonoraires !== null && (
                    <div className="w-full p-4 border border-green-200 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-medium text-green-800 flex items-center">
                          <Check className="mr-2 h-5 w-5" />
                          Estimation complétée
                        </h3>
                        <Button variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                          <Download className="mr-1.5 h-3.5 w-3.5" />
                          Devis PDF
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-green-700">Taux d'honoraires :</p>
                          <span className="text-2xl font-bold text-green-800">
                            {tauxHonoraires.toFixed(2)} %
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-green-700">Montant des honoraires HT :</p>
                          <span className="text-2xl font-bold text-green-800 flex items-center">
                            <Euro className="mr-1 h-5 w-5" />
                            {formattedPrice(montantHonoraires)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-3 border-t border-green-200">
                        <Button variant="outline" size="sm" className="text-green-700 border-green-300 hover:bg-green-100">
                          <ClipboardCheck className="mr-1.5 h-3.5 w-3.5" />
                          Demander un devis détaillé
                        </Button>
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DevisHonoraires;
