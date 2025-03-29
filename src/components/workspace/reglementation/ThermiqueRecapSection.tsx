
import React from 'react';
import { Thermometer, Sun, Home, BarChart3, Leaf } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ThermiqueRecapSection = () => {
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

      <Tabs defaultValue="re2020">
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Thermometer className="mr-2 h-4 w-4" />
                  Voir détails complets
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Télécharger l'infographie
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Solutions techniques RE2020</CardTitle>
              <CardDescription>
                Tableau comparatif des solutions constructives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Solution constructive</th>
                      <th className="text-left py-2 font-medium">Impact carbone</th>
                      <th className="text-left py-2 font-medium">Performance thermique</th>
                      <th className="text-left py-2 font-medium">Confort d'été</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Béton + ITE (R=4)</td>
                      <td className="py-2">Moyen</td>
                      <td className="py-2">Bon</td>
                      <td className="py-2">Très bon</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Ossature bois + LM (R=5)</td>
                      <td className="py-2">Très bon</td>
                      <td className="py-2">Très bon</td>
                      <td className="py-2">Moyen</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Brique + ITE (R=4.5)</td>
                      <td className="py-2">Bon</td>
                      <td className="py-2">Très bon</td>
                      <td className="py-2">Bon</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Bloc béton isolant</td>
                      <td className="py-2">Bon</td>
                      <td className="py-2">Bon</td>
                      <td className="py-2">Bon</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rt2012" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">
              Cette section sur la RT2012 est en cours de développement.
              Elle contiendra prochainement les exigences, le calcul du Bbio, Cep, Tic,
              et autres éléments de la RT2012, toujours applicable pour certains projets.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="renovation" className="space-y-6">
          <div className="text-center py-12">
            <p className="text-gray-500">
              Cette section sur la réglementation thermique pour la rénovation est en cours de développement.
              Elle contiendra prochainement les exigences pour les rénovations globales et élément par élément.
            </p>
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Thermometer className="mr-2 h-4 w-4" />
                  Accéder au calculateur
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Thermometer className="mr-2 h-4 w-4" />
                  Accéder au calculateur
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
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Thermometer className="mr-2 h-4 w-4" />
                  Accéder au calculateur
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
