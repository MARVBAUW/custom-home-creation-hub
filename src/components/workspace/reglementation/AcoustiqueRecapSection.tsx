
import React, { useState } from 'react';
import { DTU } from './dtu/types';
import { Volume, Home, Store, Headphones, Building, School } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const AcoustiqueRecapSection = () => {
  const [acoustiqueTab, setAcoustiqueTab] = useState("logement");

  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 mb-6">
        <h3 className="text-indigo-800 font-medium flex items-center gap-2 mb-2">
          <Volume className="h-5 w-5" />
          Réglementation Acoustique
        </h3>
        <p className="text-indigo-700 text-sm">
          Cette section présente les règles, normes et données techniques relatives à l'acoustique du bâtiment.
          Consultez les exigences pour différents types de bâtiments et leurs applications.
        </p>
      </div>
      
      <Tabs value={acoustiqueTab} onValueChange={setAcoustiqueTab} className="mt-6">
        <TabsList className="mb-6 bg-indigo-50">
          <TabsTrigger value="logement" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            <span>Logement</span>
          </TabsTrigger>
          <TabsTrigger value="erp" className="data-[state=active]:bg-white">
            <Store className="h-4 w-4 mr-2" />
            <span>ERP</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-white">
            <School className="h-4 w-4 mr-2" />
            <span>Établissements d'enseignement</span>
          </TabsTrigger>
          <TabsTrigger value="bureau" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            <span>Bureaux</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle Réglementation Acoustique (NRA)</CardTitle>
                <CardDescription>
                  Arrêté du 30 juin 1999 - Logements neufs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Isolation aux bruits aériens extérieurs</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>DnT,A,tr ≥ 30 dB :</strong> Zones d'exposition au bruit standard</li>
                  <li><strong>DnT,A,tr ≥ 35 dB :</strong> Voies routières importantes</li>
                  <li><strong>DnT,A,tr ≥ 38 dB :</strong> Voies ferrées importantes</li>
                </ul>
                
                <h4 className="font-medium text-sm mt-3">Isolation entre logements</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>DnT,A ≥ 53 dB :</strong> Isolement acoustique standardisé pondéré</li>
                  <li><strong>L'nT,w ≤ 58 dB :</strong> Niveau de bruit de choc standardisé</li>
                </ul>
                
                <h4 className="font-medium text-sm mt-3">Équipements du bâtiment</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>LnAT ≤ 30 dB(A) :</strong> Équipements individuels d'un logement</li>
                  <li><strong>LnAT ≤ 35 dB(A) :</strong> Équipements collectifs</li>
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
                <CardTitle>Rénovation acoustique</CardTitle>
                <CardDescription>
                  Exigences pour les travaux de rénovation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">Pour les rénovations importantes, il est recommandé d'atteindre les performances suivantes :</p>
                  
                  <div className="bg-indigo-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Isolation aux bruits extérieurs</h4>
                    <p className="text-xs text-gray-600">DnT,A,tr ≥ 30 dB minimum, 35 dB recommandé en zones bruyantes</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Isolation entre logements</h4>
                    <p className="text-xs text-gray-600">DnT,A ≥ 53 dB entre logements adjacents</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Bruits de chocs</h4>
                    <p className="text-xs text-gray-600">L'nT,w ≤ 58 dB pour limiter la transmission des bruits d'impact</p>
                  </div>
                  
                  <p className="text-sm mt-3 text-gray-600">
                    Bien que la réglementation soit moins contraignante pour les rénovations, respecter les normes NRA permet d'assurer un confort acoustique optimal.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Headphones className="mr-2 h-4 w-4" />
                  Télécharger le guide
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Solutions techniques acoustiques</CardTitle>
              <CardDescription>
                Comparatif des solutions par type de bruit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Type de bruit</th>
                      <th className="text-left py-2 font-medium">Solutions efficaces</th>
                      <th className="text-left py-2 font-medium">Gain acoustique</th>
                      <th className="text-left py-2 font-medium">Coût relatif</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Bruits aériens extérieurs</td>
                      <td className="py-2">Double vitrage, entrées d'air acoustiques</td>
                      <td className="py-2">+5 à +10 dB</td>
                      <td className="py-2">Moyen</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Bruits aériens intérieurs</td>
                      <td className="py-2">Doublage sur ossature, laine minérale</td>
                      <td className="py-2">+10 à +15 dB</td>
                      <td className="py-2">Moyen</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Bruits de chocs</td>
                      <td className="py-2">Sous-couche acoustique, chape flottante</td>
                      <td className="py-2">+15 à +20 dB</td>
                      <td className="py-2">Élevé</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2">Bruits d'équipements</td>
                      <td className="py-2">Désolidarisation, plots antivibratiles</td>
                      <td className="py-2">+5 à +15 dB</td>
                      <td className="py-2">Faible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="erp" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Réglementation ERP</CardTitle>
                <CardDescription>
                  Établissements recevant du public
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Exigences générales</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Isolation de façade :</strong> Selon zone d'exposition (30 à 45 dB)</li>
                  <li><strong>Aires d'accueil :</strong> Temps de réverbération adapté à l'usage</li>
                  <li><strong>Isolement entre locaux :</strong> Variable selon destination</li>
                </ul>
                
                <h4 className="font-medium text-sm mt-3">Hôtellerie</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>DnT,A ≥ 50 dB :</strong> Entre chambres d'hôtel</li>
                  <li><strong>DnT,A ≥ 38 dB :</strong> Entre chambre et circulation</li>
                  <li><strong>L'nT,w ≤ 60 dB :</strong> Bruits de choc entre chambres</li>
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
                <CardTitle>Salles de spectacles et cinémas</CardTitle>
                <CardDescription>
                  Exigences spécifiques pour les ERP culturels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Isolation acoustique</h4>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li><strong>DnT,A ≥ 55 dB :</strong> Entre salles de spectacle</li>
                    <li><strong>DnT,A ≥ 40 dB :</strong> Avec circulations communes</li>
                  </ul>
                  
                  <h4 className="font-medium text-sm mt-3">Qualité acoustique interne</h4>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li><strong>Temps de réverbération (TR) :</strong> 0.4s à 1.2s selon usage</li>
                    <li><strong>Bruit de fond :</strong> NR25 à NR30 maximum</li>
                  </ul>
                  
                  <p className="text-sm mt-3 text-gray-600">
                    Les exigences varient selon le type d'établissement (théâtre, cinéma, salle polyvalente)
                    et doivent être adaptées à l'usage prévu.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Headphones className="mr-2 h-4 w-4" />
                  Télécharger la norme
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Établissements d'enseignement</CardTitle>
                <CardDescription>
                  Arrêté du 25 avril 2003
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Exigences d'isolement</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>DnT,A ≥ 43 dB :</strong> Entre salles de classe</li>
                  <li><strong>DnT,A ≥ 53 dB :</strong> Entre salle et local bruyant</li>
                  <li><strong>DnT,A ≥ 30 à 40 dB :</strong> Avec circulation selon local</li>
                </ul>
                
                <h4 className="font-medium text-sm mt-3">Bruits de choc</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>L'nT,w ≤ 60 dB :</strong> En réception dans salle de classe</li>
                </ul>
                
                <h4 className="font-medium text-sm mt-3">Temps de réverbération</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Salles de classe :</strong> 0.4s à 0.8s</li>
                  <li><strong>Circulations :</strong> ≤ 1.2s + 0.1s</li>
                  <li><strong>Restauration :</strong> ≤ 1.2s + 0.1s</li>
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
                <CardTitle>Solutions acoustiques spécifiques</CardTitle>
                <CardDescription>
                  Adaptations pour établissements d'enseignement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Correction acoustique</h4>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    <li><strong>Plafonds acoustiques :</strong> Absorption αw ≥ 0.9</li>
                    <li><strong>Panneaux muraux :</strong> Sur 15-25% des surfaces en salle de classe</li>
                  </ul>
                  
                  <h4 className="font-medium text-sm mt-3">Locaux spécifiques</h4>
                  <div className="bg-indigo-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Salles de musique</h4>
                    <p className="text-xs text-gray-600">DnT,A ≥ 55 dB avec autres locaux, TR adapté entre 0.6s et 1.2s</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-md mt-2">
                    <h4 className="font-medium text-sm">Gymnases</h4>
                    <p className="text-xs text-gray-600">TR ≤ 1.5s pour volume ≤ 250m³, limité à 2.5s pour grands volumes</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-md mt-2">
                    <h4 className="font-medium text-sm">Ateliers techniques</h4>
                    <p className="text-xs text-gray-600">Isolation renforcée DnT,A ≥ 55 dB, traitement acoustique interne</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <School className="mr-2 h-4 w-4" />
                  Guide pratique
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="bureau" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Immeubles de bureaux</CardTitle>
                <CardDescription>
                  Recommandations acoustiques
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <h4 className="font-medium text-sm">Isolation entre bureaux</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>DnT,A ≥ 35 dB :</strong> Entre bureaux standards</li>
                  <li><strong>DnT,A ≥ 40 à 45 dB :</strong> Pour bureaux confidentiels</li>
                </ul>
                
                <h4 className="font-medium text-sm mt-3">Open space</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>Décroissance spatiale :</strong> D2,S entre 7 et 9 dB(A)</li>
                  <li><strong>Rayon de distraction :</strong> rD &lt; 5m recommandé</li>
                </ul>
                
                <h4 className="font-medium text-sm mt-3">Bruit de fond</h4>
                <ul className="text-sm list-disc pl-5 space-y-1">
                  <li><strong>NR 30-35 :</strong> Pour bureaux individuels</li>
                  <li><strong>NR 35-40 :</strong> Pour open space</li>
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
                <CardTitle>Certification HQE</CardTitle>
                <CardDescription>
                  Exigences pour label acoustique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm">Pour obtenir une certification HQE, les niveaux de performance acoustique sont répartis en 3 niveaux :</p>
                  
                  <div className="bg-indigo-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Base</h4>
                    <p className="text-xs text-gray-600">Respect des réglementations minimales</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Performant</h4>
                    <p className="text-xs text-gray-600">DnT,A +3 dB par rapport à la base, L'nT,w -3 dB par rapport à la base</p>
                  </div>
                  
                  <div className="bg-indigo-50 p-3 rounded-md">
                    <h4 className="font-medium text-sm">Très performant</h4>
                    <p className="text-xs text-gray-600">DnT,A +6 dB par rapport à la base, L'nT,w -6 dB par rapport à la base</p>
                  </div>
                  
                  <p className="text-sm mt-3 text-gray-600">
                    Ces critères concernent l'isolation aux bruits aériens, aux bruits d'impact,
                    aux bruits d'équipements et aux bruits extérieurs.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Building className="mr-2 h-4 w-4" />
                  Référentiel HQE
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
