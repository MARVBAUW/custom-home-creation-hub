
import React from 'react';
import { Calculator, BookOpen, Ruler, Columns, Atom } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const EurocodeRecapSection = () => {
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Consulter les tableaux
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Calculator className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ec3" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">
              Cette section sur l'Eurocode 3 (Structures en acier) est en cours de développement.
              Elle contiendra prochainement des outils de calcul et des tableaux de dimensionnement.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="ec5" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">
              Cette section sur l'Eurocode 5 (Structures en bois) est en cours de développement.
              Elle contiendra prochainement des outils de calcul et des tableaux de dimensionnement.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
