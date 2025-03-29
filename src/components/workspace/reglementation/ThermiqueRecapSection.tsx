
import React, { useState } from 'react';
import { thermiqueDTUs } from './data/dtu/thermique';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Thermometer, Sun, Home, BarChart3, Leaf, Download, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const ThermiqueRecapSection = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    filteredDTUs 
  } = useDTUSearch(thermiqueDTUs);
  
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [thermiqueTab, setThermiqueTab] = useState("re2020");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [openCalculator, setOpenCalculator] = useState<string | null>(null);
  
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

  const calculators = {
    'thermique-resistance': {
      title: 'Calcul de résistance thermique',
      description: 'Estimation de la résistance thermique des parois',
      content: 'Cet outil vous permet de calculer la résistance thermique d\'une paroi en fonction des matériaux qui la composent et de leurs épaisseurs respectives. Entrez les caractéristiques de chaque couche pour obtenir la résistance thermique totale et le coefficient U.'
    },
    'thermique-ponts': {
      title: 'Calcul de ponts thermiques',
      description: 'Estimation des déperditions par ponts thermiques',
      content: 'Ce calculateur vous permet d\'évaluer l\'impact des ponts thermiques sur la performance globale du bâtiment en fonction de différentes configurations constructives.'
    },
    'thermique-bilan': {
      title: 'Bilan thermique simplifié',
      description: 'Estimation des besoins de chauffage',
      content: 'Calculez une estimation des besoins de chauffage annuels en kWh/m² selon les caractéristiques du bâtiment (isolation, orientation, surfaces vitrées, etc.).'
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 mb-6">
        <h3 className="text-teal-800 font-medium flex items-center gap-2 mb-2">
          <Thermometer className="h-5 w-5" />
          Réglementation Thermique
        </h3>
        <p className="text-teal-700 text-sm">
          Cette section présente les réglementations thermiques RE2020, RT2012 et autres exigences.
          Consultez les obligations et calculez les performances thermiques.
        </p>
      </div>

      <SearchAndFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      <Tabs value={thermiqueTab} onValueChange={setThermiqueTab} className="mt-6">
        <TabsList className="mb-6 bg-teal-50">
          <TabsTrigger value="re2020" className="data-[state=active]:bg-white">
            <Leaf className="h-4 w-4 mr-2" />
            <span>RE2020</span>
          </TabsTrigger>
          <TabsTrigger value="rt2012" className="data-[state=active]:bg-white">
            <Sun className="h-4 w-4 mr-2" />
            <span>RT2012</span>
          </TabsTrigger>
          <TabsTrigger value="renovation" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            <span>Rénovation</span>
          </TabsTrigger>
          <TabsTrigger value="calculateurs" className="data-[state=active]:bg-white">
            <BarChart3 className="h-4 w-4 mr-2" />
            <span>Calculateurs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="re2020" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('re2020'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>RE2020 - Exigences principales</CardTitle>
                <CardDescription>
                  Applicable depuis le 1er janvier 2022 pour les logements neufs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Les 3 objectifs :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Diminuer l'impact carbone :</strong> Ic énergie et Ic construction</li>
                  <li><strong>Améliorer la performance énergétique :</strong> Bbio et Cep</li>
                  <li><strong>Garantir le confort d'été :</strong> DH (degrés-heures d'inconfort)</li>
                </ul>
                <h4 className="font-medium text-sm mt-3">Seuils de référence :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Bbio :</strong> ≤ Bbiomax</li>
                  <li><strong>Cep :</strong> ≤ Cepmax (en kWhEP/m²/an)</li>
                  <li><strong>DH :</strong> ≤ 1250°C.h </li>
                  <li><strong>Ic énergie :</strong> ≤ 560 kgCO2eq/m² pour maisons</li>
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('re2020-guide', 'Guide complet RE2020')}
                  disabled={downloadingId === 're2020-guide'}
                >
                  {downloadingId === 're2020-guide' ? (
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
                <CardTitle>Calendrier d'application</CardTitle>
                <CardDescription>
                  Échéances et renforcements progressifs de la RE2020
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">1er janvier 2022</h4>
                    <p className="text-xs text-gray-600">Application aux logements individuels et collectifs</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">1er juillet 2022</h4>
                    <p className="text-xs text-gray-600">Extension aux bureaux et bâtiments d'enseignement</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">2025</h4>
                    <p className="text-xs text-gray-600">Renforcement des exigences carbone</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">2028</h4>
                    <p className="text-xs text-gray-600">Nouveau renforcement carbone et énergétique</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">2031</h4>
                    <p className="text-xs text-gray-600">Exigences finales après derniers ajustements</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('re2020-infographie', 'Infographie calendrier RE2020')}
                  disabled={downloadingId === 're2020-infographie'}
                >
                  {downloadingId === 're2020-infographie' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger l'infographie
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rt2012" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('rt2012'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>RT2012 - Principaux indicateurs</CardTitle>
                <CardDescription>
                  Pour les bâtiments neufs jusqu'en 2021
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Exigences de résultat :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Bbio :</strong> Besoins bioclimatiques du bâti ≤ Bbiomax</li>
                  <li><strong>Cep :</strong> Consommation en énergie primaire ≤ Cepmax (50 kWhEP/m²/an modulé)</li>
                  <li><strong>Tic :</strong> Température intérieure conventionnelle ≤ Ticréf</li>
                </ul>
                <h4 className="font-medium text-sm mt-3">Exigences de moyens :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Étanchéité à l'air :</strong> Q4Pa-surf ≤ 0,6 m³/(h.m²) pour l'individuel</li>
                  <li><strong>Énergies renouvelables :</strong> Obligation de recours aux ENR</li>
                  <li><strong>Surface vitrée :</strong> ≥ 1/6 de la surface habitable</li>
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('rt2012-doc', 'Documentation RT2012')}
                  disabled={downloadingId === 'rt2012-doc'}
                >
                  {downloadingId === 'rt2012-doc' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger la documentation
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Applications par typologie</CardTitle>
                <CardDescription>
                  Variations selon le type de bâtiment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Maisons individuelles</h4>
                    <p className="text-xs text-gray-600">Test d'étanchéité à l'air obligatoire, perméabilité ≤ 0,6 m³/(h.m²)</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Logements collectifs</h4>
                    <p className="text-xs text-gray-600">Perméabilité ≤ 1,0 m³/(h.m²), test obligatoire ou démarche qualité</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Tertiaire</h4>
                    <p className="text-xs text-gray-600">Modulation du Cepmax selon l'usage, éclairage pris en compte</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('rt-re-comparatif', 'Comparatif RT2012/RE2020')}
                  disabled={downloadingId === 'rt-re-comparatif'}
                >
                  {downloadingId === 'rt-re-comparatif' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Comparer avec RE2020
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="renovation" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('renovation'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dispositifs d'aides à la rénovation</CardTitle>
                <CardDescription>
                  Aides financières pour les travaux d'amélioration énergétique
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Principales aides :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>MaPrimeRénov' :</strong> Aide principale selon revenus et gain énergétique</li>
                  <li><strong>CEE :</strong> Certificats d'Économies d'Énergie (primes énergie)</li>
                  <li><strong>Éco-PTZ :</strong> Prêt à taux zéro jusqu'à 50 000€ sur 20 ans</li>
                  <li><strong>TVA à 5,5% :</strong> Pour travaux d'amélioration énergétique</li>
                </ul>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('aides-calculator')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculer mes aides
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('guide-aides', 'Guide des aides 2024')}
                  disabled={downloadingId === 'guide-aides'}
                >
                  {downloadingId === 'guide-aides' ? (
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
                <CardTitle>Performance minimale des produits</CardTitle>
                <CardDescription>
                  Critères techniques pour éligibilité aux aides
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Isolation thermique</h4>
                    <p className="text-xs">Murs : R ≥ 3,7 m².K/W</p>
                    <p className="text-xs">Toiture : R ≥ 7,0 m².K/W</p>
                    <p className="text-xs">Planchers bas : R ≥ 3,0 m².K/W</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Menuiseries</h4>
                    <p className="text-xs">Fenêtres : Uw ≤ 1,3 W/m².K et Sw ≥ 0,3</p>
                    <p className="text-xs">Portes : Ud ≤ 1,7 W/m².K</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Chauffage et ECS</h4>
                    <p className="text-xs">PAC air/eau : ETAS ≥ 126% (chauffage)</p>
                    <p className="text-xs">Chaudière à granulés : η ≥ 90% et émissions limitées</p>
                    <p className="text-xs">Chauffe-eau thermodynamique : COP ≥ 2,9</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('criteres-techniques', 'Critères techniques 2024')}
                  disabled={downloadingId === 'criteres-techniques'}
                >
                  {downloadingId === 'criteres-techniques' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger tous les critères
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calculateurs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calcul de résistance thermique</CardTitle>
                <CardDescription>
                  Estimation de la résistance thermique des parois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Calculez la résistance thermique totale d'une paroi en fonction
                  des matériaux et de leurs épaisseurs.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('thermique-resistance')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('guide-resistance', 'Guide résistance thermique')}
                  disabled={downloadingId === 'guide-resistance'}
                >
                  {downloadingId === 'guide-resistance' ? (
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
                <CardTitle>Calcul de ponts thermiques</CardTitle>
                <CardDescription>
                  Estimation des déperditions par ponts thermiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Évaluez l'impact des ponts thermiques sur la performance
                  globale du bâtiment selon différentes configurations.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('thermique-ponts')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('guide-ponts', 'Guide ponts thermiques')}
                  disabled={downloadingId === 'guide-ponts'}
                >
                  {downloadingId === 'guide-ponts' ? (
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
                <CardTitle>Bilan thermique simplifié</CardTitle>
                <CardDescription>
                  Estimation des besoins de chauffage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Calculez une estimation des besoins de chauffage annuels
                  en kWh/m² selon les caractéristiques du bâtiment.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('thermique-bilan')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('guide-bilan', 'Guide bilan thermique')}
                  disabled={downloadingId === 'guide-bilan'}
                >
                  {downloadingId === 'guide-bilan' ? (
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
          
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <p className="text-center text-gray-500">
              {openCalculator && calculators[openCalculator as keyof typeof calculators]?.content}
            </p>
            <div className="flex justify-center mt-6">
              <p className="text-sm text-blue-600">
                Calculateur interactif en cours de chargement...
              </p>
            </div>
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
