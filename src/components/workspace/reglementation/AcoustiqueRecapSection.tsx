
import React from 'react';
import { Volume, Home, Building, Earbuds, Library } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AcoustiqueRecapSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-6">
        <h3 className="text-indigo-800 font-medium flex items-center gap-2 mb-2">
          <Volume className="h-5 w-5" />
          Réglementation Acoustique
        </h3>
        <p className="text-indigo-700 text-sm">
          Cette section présente les réglementations acoustiques pour différents types de bâtiments.
          Consultez les exigences minimales et calculez les performances acoustiques.
        </p>
      </div>

      <Tabs defaultValue="logement">
        <TabsList className="mb-6 bg-indigo-50">
          <TabsTrigger value="logement" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            <span>Logements</span>
          </TabsTrigger>
          <TabsTrigger value="tertiaire" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            <span>Tertiaire</span>
          </TabsTrigger>
          <TabsTrigger value="equipements" className="data-[state=active]:bg-white">
            <Earbuds className="h-4 w-4 mr-2" />
            <span>Équipements</span>
          </TabsTrigger>
          <TabsTrigger value="normes" className="data-[state=active]:bg-white">
            <Library className="h-4 w-4 mr-2" />
            <span>Normes & DTU</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle Réglementation Acoustique (NRA)</CardTitle>
                <CardDescription>
                  Arrêté du 30 juin 1999, applicable à tous les logements neufs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Exigences minimales :</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Isolement aux bruits aériens extérieurs :</strong> 30 dB minimum</li>
                  <li><strong>Isolement aux bruits aériens intérieurs :</strong> 53 dB entre logements</li>
                  <li><strong>Niveau de bruit de choc :</strong> ≤ 58 dB</li>
                  <li><strong>Bruit des équipements :</strong> ≤ 30 dB(A) pour équipements individuels</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Volume className="mr-2 h-4 w-4" />
                  Voir détails complets
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Calculateur d'isolement acoustique</CardTitle>
                <CardDescription>
                  Estimez les performances acoustiques de vos parois
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-3">
                  Cet outil vous permet de calculer l'indice d'affaiblissement acoustique
                  et l'isolement aux bruits aériens de différentes parois.
                </p>
                <div className="flex justify-center py-2">
                  <Volume className="h-12 w-12 text-indigo-300" />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Volume className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tableau de solutions techniques</CardTitle>
              <CardDescription>
                Solutions constructives courantes et leurs performances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Type de paroi</th>
                      <th className="text-left py-2 font-medium">Description</th>
                      <th className="text-left py-2 font-medium">Rw+C (dB)</th>
                      <th className="text-left py-2 font-medium">Conformité NRA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Mur séparatif</td>
                      <td className="py-2">Béton 18cm</td>
                      <td className="py-2">54 dB</td>
                      <td className="py-2">Oui</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Mur séparatif</td>
                      <td className="py-2">Double ossature 98/48 + 2BA13 + LM</td>
                      <td className="py-2">63 dB</td>
                      <td className="py-2">Oui</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Plancher</td>
                      <td className="py-2">Dalle béton 20cm + chape flottante</td>
                      <td className="py-2">58 dB</td>
                      <td className="py-2">Oui</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Façade</td>
                      <td className="py-2">Béton 16cm + ITE + R+A,tr=30dB</td>
                      <td className="py-2">45 dB</td>
                      <td className="py-2">Oui</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tertiaire" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">
              Cette section sur l'acoustique des bâtiments tertiaires est en cours de développement.
              Elle contiendra prochainement les réglementations spécifiques pour les bureaux, 
              établissements de santé et d'enseignement.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="equipements" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">
              Cette section sur l'acoustique des équipements est en cours de développement.
              Elle contiendra prochainement les règles concernant les bruits d'équipements,
              ventilation, chauffage et autres systèmes techniques.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="normes" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">
              Cette section sur les normes acoustiques est en cours de développement.
              Elle contiendra prochainement les références aux normes NF EN ISO, 
              méthodes de mesure et DTU acoustiques.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
