
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, AlertTriangle, Droplets, ThermometerSnowflake, BarChart2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const HygrometrieRecapSection = () => {
  return (
    <div className="py-8">
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Droplets className="h-6 w-6 text-blue-500" />
            <CardTitle>Hygrométrie et condensation</CardTitle>
          </div>
          <CardDescription>
            Comprendre et gérer l'humidité dans les bâtiments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="introduction" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="introduction">Introduction</TabsTrigger>
              <TabsTrigger value="reglementation">Réglementation</TabsTrigger>
              <TabsTrigger value="calculs">Méthodes de calcul</TabsTrigger>
              <TabsTrigger value="solutions">Solutions techniques</TabsTrigger>
            </TabsList>
            
            <TabsContent value="introduction">
              <div className="space-y-4 mt-4">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-2">Qu'est-ce que l'hygrométrie ?</h3>
                    <p className="text-muted-foreground mb-4">
                      L'hygrométrie est la mesure de la quantité de vapeur d'eau contenue dans l'air. 
                      Elle joue un rôle crucial dans le confort thermique et la durabilité des bâtiments.
                    </p>
                    
                    <Alert className="mb-4">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Point clé</AlertTitle>
                      <AlertDescription>
                        Une mauvaise gestion de l'humidité peut entraîner des problèmes structurels, 
                        des moisissures et des problèmes de santé pour les occupants.
                      </AlertDescription>
                    </Alert>
                    
                    <h3 className="text-lg font-medium mb-2">Les différents types d'humidité</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>
                        <strong>Humidité relative</strong> : rapport entre la quantité de vapeur d'eau 
                        présente dans l'air et la quantité maximale possible à une température donnée.
                      </li>
                      <li>
                        <strong>Point de rosée</strong> : température à laquelle la vapeur d'eau 
                        contenue dans l'air commence à se condenser.
                      </li>
                      <li>
                        <strong>Condensation superficielle</strong> : apparaît sur les surfaces froides 
                        lorsque leur température est inférieure au point de rosée.
                      </li>
                      <li>
                        <strong>Condensation interne</strong> : se forme à l'intérieur des parois lorsque 
                        la vapeur d'eau traverse la structure et rencontre une zone froide.
                      </li>
                    </ul>
                  </div>
                  
                  <div className="md:w-1/3">
                    <div className="rounded-md overflow-hidden mb-4">
                      <img 
                        src="/images/hygro-condensation.jpg" 
                        alt="Condensation sur une fenêtre"
                        className="w-full h-auto"
                      />
                    </div>
                    
                    <Card className="bg-blue-50">
                      <CardContent className="pt-4">
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
                          Le saviez-vous ?
                        </h4>
                        <p className="text-sm">
                          L'air chaud peut contenir plus de vapeur d'eau que l'air froid. C'est pourquoi 
                          la condensation apparaît souvent en hiver sur les surfaces froides comme les fenêtres.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">Enjeux et conséquences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Alert variant="destructive" className="border-red-200 bg-red-50">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Problèmes liés à une humidité excessive</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-5 mt-2">
                          <li>Développement de moisissures et champignons</li>
                          <li>Détérioration des matériaux de construction</li>
                          <li>Problèmes respiratoires et allergies</li>
                          <li>Inconfort thermique</li>
                          <li>Ponts thermiques aggravés</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                    
                    <Alert variant="default" className="border-green-200 bg-green-50">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Bénéfices d'une bonne gestion de l'hygrométrie</AlertTitle>
                      <AlertDescription>
                        <ul className="list-disc pl-5 mt-2">
                          <li>Confort thermique accru</li>
                          <li>Qualité de l'air intérieur améliorée</li>
                          <li>Durabilité des structures et matériaux</li>
                          <li>Économies d'énergie</li>
                          <li>Prévention des problèmes de santé</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline" asChild>
                      <Link href="/workspace/calculateurs/hygro-condensation">
                        Accéder au calculateur de point de rosée {"->"} 
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reglementation">
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-medium mb-3">Cadre réglementaire</h3>
                
                <Card className="mb-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Réglementation thermique et hygrométrie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      La réglementation française concernant l'hygrométrie est intégrée dans plusieurs textes 
                      qui encadrent la construction et la rénovation des bâtiments.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">RE2020 - Réglementation Environnementale</h4>
                        <p className="text-sm text-muted-foreground">
                          La RE2020 intègre des exigences concernant la migration de vapeur d'eau dans les parois 
                          pour prévenir les risques de condensation interne.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">DTU 20.1 et DTU 24.1</h4>
                        <p className="text-sm text-muted-foreground">
                          Ces Documents Techniques Unifiés définissent les règles de construction concernant 
                          les parois et les systèmes d'évacuation en tenant compte des problématiques d'humidité.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">NF EN ISO 13788</h4>
                        <p className="text-sm text-muted-foreground">
                          Cette norme définit la méthode de calcul des températures superficielles intérieures 
                          afin d'éviter l'humidité superficielle critique et la condensation interne.
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Avis Techniques (ATec) et Documents Techniques d'Application (DTA)</h4>
                        <p className="text-sm text-muted-foreground">
                          Ces documents précisent les conditions de mise en œuvre des matériaux et systèmes 
                          constructifs pour prévenir les problèmes liés à l'humidité.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <h3 className="text-lg font-medium mb-3">Exigences par type de bâtiment</h3>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type de bâtiment</TableHead>
                        <TableHead>Exigences hygrométriques</TableHead>
                        <TableHead>Textes de référence</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Logements résidentiels</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Facteur de température surfacique ≥ 0,17</li>
                            <li>Ventilation adaptée aux pièces humides</li>
                            <li>Système d'évacuation d'humidité</li>
                          </ul>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">RE2020</Badge>
                          <Badge variant="outline" className="ml-2">NF DTU 68.3</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>ERP (Établissements Recevant du Public)</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Facteur de température surfacique ≥ 0,25</li>
                            <li>Renouvellement d'air renforcé</li>
                            <li>Gestion spécifique selon l'affluence</li>
                          </ul>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Règlement Sanitaire</Badge>
                          <Badge variant="outline" className="ml-2">Code du Travail</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bâtiments industriels</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Adaptation aux process spécifiques</li>
                            <li>Traitement des points singuliers</li>
                            <li>Ventilation industrielle adaptée</li>
                          </ul>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">NF EN 13779</Badge>
                          <Badge variant="outline" className="ml-2">Code du Travail</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Piscines et zones humides</TableCell>
                        <TableCell>
                          <ul className="list-disc pl-5">
                            <li>Traitement spécifique des parois et vitrages</li>
                            <li>Déshumidification contrôlée</li>
                            <li>Facteur de température surfacique ≥ 0,30</li>
                          </ul>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">DTU 65.9</Badge>
                          <Badge variant="outline" className="ml-2">NF 90-461</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <Alert className="mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Attention</AlertTitle>
                  <AlertDescription>
                    Les valeurs indiquées sont données à titre indicatif. Il est nécessaire de consulter 
                    les textes réglementaires en vigueur pour une application précise selon votre projet.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>
            
            <TabsContent value="calculs">
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-medium mb-3">Méthodes de calcul</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <ThermometerSnowflake className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-base">Calcul du point de rosée</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm">
                        Le point de rosée est la température à laquelle la vapeur d'eau contenue dans l'air 
                        commence à se condenser. Son calcul est essentiel pour prévenir les problèmes de condensation.
                      </p>
                      
                      <div className="bg-gray-100 p-3 rounded-md mb-3">
                        <h4 className="font-medium mb-1 text-sm">Formule de Magnus-Tetens :</h4>
                        <p className="font-mono text-xs">
                          Td = (b × ln(RH/100) + a × t) / (a - ln(RH/100) - a × t / b)
                        </p>
                        <p className="text-xs mt-2">
                          Où :<br />
                          Td = Température du point de rosée (°C)<br />
                          RH = Humidité relative (%)<br />
                          t = Température ambiante (°C)<br />
                          a = 17,27 et b = 237,7 (constantes)
                        </p>
                      </div>
                      
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href="/workspace/calculateurs/hygro-condensation">
                          Accéder au calculateur de point de rosée
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-base">Diagramme de Glaser</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-3 text-sm">
                        Le diagramme de Glaser permet d'analyser la diffusion de vapeur d'eau à travers une paroi 
                        et de vérifier s'il y a risque de condensation interne.
                      </p>
                      
                      <div className="bg-gray-100 p-3 rounded-md mb-3">
                        <h4 className="font-medium mb-1 text-sm">Étapes d'analyse :</h4>
                        <ol className="list-decimal pl-5 text-xs">
                          <li>Calcul des températures dans la paroi</li>
                          <li>Calcul des pressions de vapeur saturante</li>
                          <li>Calcul des pressions de vapeur réelles</li>
                          <li>Comparaison des pressions pour identifier les zones à risque</li>
                        </ol>
                      </div>
                      
                      <Button variant="outline" size="sm" asChild className="w-full">
                        <Link href="/workspace/calculateurs/diagramme-glaser">
                          Accéder au calculateur Glaser
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-lg font-medium mb-3">Facteur de température</h3>
                
                <p className="mb-4">
                  Le facteur de température (fRsi) est un indicateur utilisé pour évaluer le risque de condensation 
                  superficielle sur les parois intérieures des bâtiments.
                </p>
                
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <h4 className="font-medium mb-2">Calcul du facteur de température</h4>
                  <div className="font-mono text-sm mb-2">
                    fRsi = (Tsi - Te) / (Ti - Te)
                  </div>
                  <p className="text-sm">
                    Où :<br />
                    Tsi = Température de surface intérieure (°C)<br />
                    Ti = Température intérieure (°C)<br />
                    Te = Température extérieure (°C)
                  </p>
                  
                  <div className="mt-3">
                    <h4 className="font-medium mb-1 text-sm">Valeurs seuils règlementaires :</h4>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Logements : fRsi {">"} 0,17</li>
                      <li>Bureaux et écoles : fRsi {">"} 0,25</li>
                      <li>Piscines : fRsi {">"} 0,30</li>
                    </ul>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-3">Résistance à la diffusion de vapeur d'eau</h3>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Matériau</TableHead>
                        <TableHead>Facteur μ</TableHead>
                        <TableHead>Sd (m) pour 1 cm</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Béton</TableCell>
                        <TableCell>50 - 100</TableCell>
                        <TableCell>0,5 - 1,0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Brique</TableCell>
                        <TableCell>5 - 10</TableCell>
                        <TableCell>0,05 - 0,1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Laine minérale</TableCell>
                        <TableCell>1 - 2</TableCell>
                        <TableCell>0,01 - 0,02</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Polystyrène expansé</TableCell>
                        <TableCell>20 - 100</TableCell>
                        <TableCell>0,2 - 1,0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Membrane pare-vapeur</TableCell>
                        <TableCell>8000 - 100000</TableCell>
                        <TableCell>8 - 100</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Bois massif</TableCell>
                        <TableCell>20 - 50</TableCell>
                        <TableCell>0,2 - 0,5</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2">
                  μ : Facteur de résistance à la diffusion de vapeur d'eau (sans unité)<br />
                  Sd : Épaisseur équivalente d'air pour la diffusion de vapeur (m)
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="solutions">
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-medium mb-3">Solutions techniques</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Barrières contre l'humidité</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>Pare-vapeur</strong> : Membrane étanche à la vapeur d'eau, placée du côté chaud 
                          de l'isolation pour empêcher la migration de la vapeur d'eau dans la paroi.
                        </li>
                        <li>
                          <strong>Freine-vapeur</strong> : Membrane qui ralentit le passage de la vapeur d'eau 
                          sans l'arrêter complètement, permettant une certaine respiration de la paroi.
                        </li>
                        <li>
                          <strong>Membranes hygrovariables</strong> : Leur perméabilité varie en fonction de l'humidité 
                          ambiante, permettant un séchage de la paroi en été.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Ventilation et renouvellement d'air</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>VMC simple flux</strong> : Extraction mécanique de l'air vicié et entrées 
                          d'air naturelles pour l'air neuf.
                        </li>
                        <li>
                          <strong>VMC double flux</strong> : Extraction et insufflation mécaniques avec récupération 
                          de chaleur, permettant un meilleur contrôle de l'humidité.
                        </li>
                        <li>
                          <strong>VMC hygroréglable</strong> : Le débit d'extraction varie en fonction de l'humidité 
                          relative, optimisant l'évacuation de l'humidité.
                        </li>
                        <li>
                          <strong>Ventilation naturelle assistée</strong> : Combinaison d'entrées d'air et 
                          d'extracteurs assistés par des forces naturelles (vent, tirage thermique).
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Traitement des ponts thermiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>Rupteurs de ponts thermiques</strong> : Éléments isolants placés aux jonctions 
                          des structures pour limiter les transferts de chaleur.
                        </li>
                        <li>
                          <strong>Isolation par l'extérieur (ITE)</strong> : Enveloppe continue autour du bâtiment 
                          qui limite considérablement les ponts thermiques.
                        </li>
                        <li>
                          <strong>Traitement des tableaux de fenêtres</strong> : Retours d'isolation sur les embrasures 
                          pour éviter les zones froides propices à la condensation.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Matériaux hygroscopiques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2 text-sm">
                        Les matériaux hygroscopiques peuvent absorber et restituer l'humidité, contribuant 
                        à réguler naturellement l'hygrométrie intérieure.
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Bois et dérivés du bois</li>
                        <li>Terre crue et enduits à la chaux</li>
                        <li>Matériaux isolants biosourcés (fibres de bois, chanvre, lin)</li>
                        <li>Béton de chanvre</li>
                        <li>Plâtre non hydrofugé</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Conception bioclimatique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>Zonage des espaces</strong> : Séparation des pièces humides (cuisine, salle de bain) 
                          des pièces sèches avec ventilation adaptée.
                        </li>
                        <li>
                          <strong>Conception des parois perspirants</strong> : Gradation de la perméabilité à la 
                          vapeur d'eau de l'intérieur vers l'extérieur.
                        </li>
                        <li>
                          <strong>Orientation et implantation</strong> : Prise en compte des vents dominants et 
                          de l'ensoleillement pour optimiser le séchage naturel des façades.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Équipements de régulation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>
                          <strong>Déshumidificateurs</strong> : Appareils réduisant l'humidité ambiante 
                          par condensation ou absorption.
                        </li>
                        <li>
                          <strong>Humidificateurs</strong> : Utiles dans les climats très secs pour maintenir 
                          un niveau d'humidité confortable.
                        </li>
                        <li>
                          <strong>Capteurs et régulateurs d'humidité</strong> : Pilotage automatique des 
                          systèmes de ventilation en fonction de l'humidité mesurée.
                        </li>
                        <li>
                          <strong>Détecteurs de point de rosée</strong> : Pour anticiper les risques de 
                          condensation dans les systèmes CVCD.
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <Alert className="mt-4 bg-amber-50 border-amber-200">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Conseil professionnel</AlertTitle>
                  <AlertDescription>
                    L'approche la plus efficace consiste à combiner plusieurs stratégies adaptées à votre projet 
                    spécifique. Une analyse hygrothermique détaillée permet d'optimiser les solutions techniques.
                  </AlertDescription>
                </Alert>
                
                <div className="flex justify-end mt-6">
                  <Button asChild>
                    <Link href="/workspace/calculateurs">
                      Explorer nos calculateurs hygrométriques
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default HygrometrieRecapSection;
