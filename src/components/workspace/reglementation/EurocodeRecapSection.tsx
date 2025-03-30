
import React, { useState } from 'react';
import { Calculator, BookOpen, Ruler, Columns, Atom, Download, ExternalLink, Home, Database } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  LoadCombinationsCalculator, 
  ClimateCalculator, 
  BeamCalculator,
  ColumnCalculator,
  FoundationCalculator,
  SlabCalculator
} from '../calculators/eurocode';

export const EurocodeRecapSection = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [openCalculator, setOpenCalculator] = useState<string | null>(null);

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
    'ec1-climate': {
      title: 'Calcul des charges climatiques',
      description: 'Calculateur des charges de neige et de vent selon l\'EC1',
      content: <ClimateCalculator />
    },
    'ec1-combinations': {
      title: 'Combinaisons d\'actions',
      description: 'Générateur de combinaisons d\'actions selon l\'EC0',
      content: <LoadCombinationsCalculator />
    },
    'ec2-beams': {
      title: 'Dimensionnement de poutres',
      description: 'Calculateur de sections de poutres en béton armé',
      content: <BeamCalculator />
    },
    'ec2-columns': {
      title: 'Dimensionnement de poteaux',
      description: 'Calculateur de sections de poteaux en béton armé',
      content: <ColumnCalculator />
    },
    'ec2-slabs': {
      title: 'Calcul de dalles',
      description: 'Dimensionnement de dalles en béton armé',
      content: <SlabCalculator />
    },
    'ec7-foundations': {
      title: 'Dimensionnement de fondations',
      description: 'Calculateur de semelles isolées selon l\'EC7',
      content: <FoundationCalculator />
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 mb-6">
        <h3 className="text-purple-800 font-medium flex items-center gap-2 mb-2">
          <Calculator className="h-5 w-5" />
          Eurocodes - Outils de dimensionnement
        </h3>
        <p className="text-purple-700 text-sm">
          Cette section propose des outils de calcul et de dimensionnement selon les normes européennes.
          Consultez les différents Eurocodes et utilisez les calculateurs associés.
        </p>
      </div>

      <Tabs defaultValue="ec1">
        <TabsList className="mb-6 bg-purple-50 w-full justify-start overflow-x-auto">
          <TabsTrigger value="ec1" className="data-[state=active]:bg-white">
            <Atom className="h-4 w-4 mr-2" />
            <span>EC1 - Actions</span>
          </TabsTrigger>
          <TabsTrigger value="ec2" className="data-[state=active]:bg-white">
            <Columns className="h-4 w-4 mr-2" />
            <span>EC2 - Béton</span>
          </TabsTrigger>
          <TabsTrigger value="ec3" className="data-[state=active]:bg-white">
            <Ruler className="h-4 w-4 mr-2" />
            <span>EC3 - Acier</span>
          </TabsTrigger>
          <TabsTrigger value="ec5" className="data-[state=active]:bg-white">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>EC5 - Bois</span>
          </TabsTrigger>
          <TabsTrigger value="ec7" className="data-[state=active]:bg-white">
            <Database className="h-4 w-4 mr-2" />
            <span>EC7 - Géotechnique</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ec1" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Calcul des charges climatiques</CardTitle>
                <CardDescription>
                  Calculateur des charges de neige et de vent selon l'EC1
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Déterminez les charges climatiques en fonction de la localisation géographique,
                  l'altitude et la géométrie de la construction.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('ec1-climate')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('ec1-climate-pdf', 'Fiche EC1 Climat')}
                  disabled={downloadingId === 'ec1-climate-pdf'}
                >
                  {downloadingId === 'ec1-climate-pdf' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger la fiche
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Combinaisons d'actions</CardTitle>
                <CardDescription>
                  Générateur de combinaisons d'actions selon l'EC0
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Générez automatiquement les combinaisons d'actions ELU et ELS
                  à partir des charges permanentes et variables de votre projet.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="default" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('ec1-combinations')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('ec1-combinations-pdf', 'Fiche combinaisons EC0')}
                  disabled={downloadingId === 'ec1-combinations-pdf'}
                >
                  {downloadingId === 'ec1-combinations-pdf' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger la fiche
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tableaux de synthèse EC1</CardTitle>
                <CardDescription>
                  Récapitulatif des principales valeurs de l'Eurocode 1
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Consultez les tableaux récapitulatifs des coefficients, 
                  catégories d'usage et valeurs caractéristiques des actions.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('ec1-tables-pdf', 'Tableaux EC1')}
                  disabled={downloadingId === 'ec1-tables-pdf'}
                >
                  {downloadingId === 'ec1-tables-pdf' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger les tableaux
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ec2" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dimensionnement de poutres</CardTitle>
                <CardDescription>
                  Calculateur de sections de poutres en béton armé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Calculez le ferraillage nécessaire pour une poutre en béton armé
                  soumise à de la flexion simple ou composée.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('ec2-beams')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('ec2-beams-guide', 'Guide poutres EC2')}
                  disabled={downloadingId === 'ec2-beams-guide'}
                >
                  {downloadingId === 'ec2-beams-guide' ? (
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
                <CardTitle>Dimensionnement de poteaux</CardTitle>
                <CardDescription>
                  Vérification de sections de poteaux en béton armé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Vérifiez la résistance d'un poteau soumis à de la compression
                  simple ou composée selon l'Eurocode 2.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('ec2-columns')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('ec2-columns-guide', 'Guide poteaux EC2')}
                  disabled={downloadingId === 'ec2-columns-guide'}
                >
                  {downloadingId === 'ec2-columns-guide' ? (
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
                <CardTitle>Calcul de dalles</CardTitle>
                <CardDescription>
                  Dimensionnement de dalles en béton armé
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Déterminez l'épaisseur et le ferraillage nécessaires pour une dalle
                  en béton armé selon l'Eurocode 2.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('ec2-slabs')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('ec2-slabs-guide', 'Guide dalles EC2')}
                  disabled={downloadingId === 'ec2-slabs-guide'}
                >
                  {downloadingId === 'ec2-slabs-guide' ? (
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

        <TabsContent value="ec3" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Profilés métalliques</CardTitle>
                <CardDescription>
                  Base de données et dimensions des profilés normalisés
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Consultez les caractéristiques géométriques et mécaniques des profilés
                  métalliques standardisés (IPE, HEA, HEB, UPE, etc.).
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('ec3-profiles-db', 'Base de données profilés')}
                  disabled={downloadingId === 'ec3-profiles-db'}
                >
                  {downloadingId === 'ec3-profiles-db' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger le catalogue
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Guide EC3 simplifié</CardTitle>
                <CardDescription>
                  Guide pratique pour l'application de l'Eurocode 3
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Guide pratique synthétisant les principaux points de l'Eurocode 3
                  pour les structures en acier avec des exemples concrets.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('ec3-guide', 'Guide EC3')}
                  disabled={downloadingId === 'ec3-guide'}
                >
                  {downloadingId === 'ec3-guide' ? (
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
          
          <Card>
            <CardHeader>
              <CardTitle>Outils de calcul EC3 - Prochainement</CardTitle>
              <CardDescription>
                De nouveaux calculateurs pour l'Eurocode 3 sont en cours de développement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Nous travaillons actuellement sur des outils de dimensionnement pour les structures métalliques :
                vérification de sections, flambement, assemblages boulonnés/soudés. 
                Ils seront disponibles dans une prochaine mise à jour.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ec5" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Assemblages bois</CardTitle>
                <CardDescription>
                  Guide des assemblages courants en structure bois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Catalogue détaillé des assemblages traditionnels et modernes
                  en construction bois avec dimensionnement selon l'Eurocode 5.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('ec5-connections', 'Guide assemblages bois')}
                  disabled={downloadingId === 'ec5-connections'}
                >
                  {downloadingId === 'ec5-connections' ? (
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
                <CardTitle>Guide EC5 simplifié</CardTitle>
                <CardDescription>
                  Guide pratique pour l'application de l'Eurocode 5
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Guide synthétique sur l'Eurocode 5 pour les structures en bois
                  avec des exemples de dimensionnement pratiques.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('ec5-guide', 'Guide EC5')}
                  disabled={downloadingId === 'ec5-guide'}
                >
                  {downloadingId === 'ec5-guide' ? (
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
          
          <Card>
            <CardHeader>
              <CardTitle>Outils de calcul EC5 - Prochainement</CardTitle>
              <CardDescription>
                De nouveaux calculateurs pour l'Eurocode 5 sont en cours de développement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Nous travaillons actuellement sur des outils de dimensionnement pour les structures bois :
                vérification de sections, assemblages, stabilité. 
                Ils seront disponibles dans une prochaine mise à jour.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ec7" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Dimensionnement de fondations</CardTitle>
                <CardDescription>
                  Calculateur de semelles isolées selon l'EC7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Dimensionnez les fondations superficielles selon les critères de l'Eurocode 7
                  et vérifiez la capacité portante du sol.
                </p>
              </CardContent>
              <CardFooter className="flex gap-2 flex-col sm:flex-row">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleOpenCalculator('ec7-foundations')}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => handleDownload('ec7-foundations-guide', 'Guide fondations EC7')}
                  disabled={downloadingId === 'ec7-foundations-guide'}
                >
                  {downloadingId === 'ec7-foundations-guide' ? (
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
                <CardTitle>Guide de reconnaissance des sols</CardTitle>
                <CardDescription>
                  Paramètres géotechniques et méthodes d'investigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Guide pratique sur les différentes méthodes de reconnaissance des sols
                  et l'interprétation des résultats d'essais in-situ et en laboratoire.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('ec7-soil-guide', 'Guide reconnaissance des sols')}
                  disabled={downloadingId === 'ec7-soil-guide'}
                >
                  {downloadingId === 'ec7-soil-guide' ? (
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
                <CardTitle>Abaques géotechniques</CardTitle>
                <CardDescription>
                  Abaques et tableaux de valeurs caractéristiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Collection d'abaques et de tableaux de valeurs caractéristiques
                  pour différents types de sols selon l'Eurocode 7.
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownload('ec7-abacus', 'Abaques géotechniques')}
                  disabled={downloadingId === 'ec7-abacus'}
                >
                  {downloadingId === 'ec7-abacus' ? (
                    <span className="flex items-center">Téléchargement...</span>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger les abaques
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Calculator Dialogs */}
      <Dialog open={!!openCalculator} onOpenChange={() => setOpenCalculator(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {openCalculator && calculators[openCalculator as keyof typeof calculators]?.title}
            </DialogTitle>
            <DialogDescription>
              {openCalculator && typeof calculators[openCalculator as keyof typeof calculators]?.description === 'string' 
                ? calculators[openCalculator as keyof typeof calculators]?.description 
                : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            {openCalculator && (
              <>
                {typeof calculators[openCalculator as keyof typeof calculators]?.content === 'string' ? (
                  <>
                    <p className="text-center text-gray-500">
                      {calculators[openCalculator as keyof typeof calculators]?.content}
                    </p>
                    <div className="flex justify-center mt-6">
                      <p className="text-sm text-blue-600">
                        Calculateur interactif en cours de chargement...
                      </p>
                    </div>
                  </>
                ) : (
                  calculators[openCalculator as keyof typeof calculators]?.content
                )}
                <div className="flex justify-center mt-8">
                  <Button onClick={() => setOpenCalculator(null)}>
                    Fermer
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
