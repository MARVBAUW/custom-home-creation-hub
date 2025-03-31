
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, FileText, Building2, Flame } from 'lucide-react';
import { buildingClassificationsDTUs } from './data/dtu/incendie/building-classifications';
import { erpDTUs } from './data/dtu/incendie/erp';
import { desenfumageDTUs } from './data/dtu/incendie/desenfumage';
import { parkingDTUs } from './data/dtu/incendie/parking';
import { logementDTUs } from './data/dtu/incendie/logement';
import { Link } from 'react-router-dom';

export const IncendieRecapSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h3 className="text-red-800 font-medium flex items-center gap-2 mb-2">
          <Flame className="h-5 w-5" />
          Sécurité Incendie
        </h3>
        <p className="text-red-700 text-sm">
          Découvrez les principales règles de sécurité incendie applicables aux différents types de bâtiments
          selon la réglementation française. Les fiches récapitulatives présentent les exigences essentielles.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-5">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-1">
          <TabsTrigger value="general">Classification</TabsTrigger>
          <TabsTrigger value="erp">ERP</TabsTrigger>
          <TabsTrigger value="logement">Habitation</TabsTrigger>
          <TabsTrigger value="parking">Parkings</TabsTrigger>
          <TabsTrigger value="desenfumage">Désenfumage</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Classification des bâtiments</CardTitle>
              <CardDescription>
                Principes généraux de classification des bâtiments selon leur destination, 
                taille et caractéristiques pour la sécurité incendie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {buildingClassificationsDTUs.map((dtu) => (
                <div key={dtu.id} className="border rounded-md p-4">
                  <h3 className="font-medium text-base mb-3">{dtu.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{dtu.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Points clés</h4>
                      <ul className="space-y-2">
                        {dtu.rules.map((rule, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="font-semibold min-w-[100px]">{rule.title}:</span>
                            <span>{rule.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {dtu.sections && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Détails</h4>
                        <ul className="space-y-2">
                          {dtu.sections.map((section, index) => (
                            <li key={index} className="text-sm flex gap-2">
                              <span className="font-semibold min-w-[100px]">{section.title}:</span>
                              <span>{section.content}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <FileText className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Pour des calculs spécifiques et un dimensionnement précis, consultez notre calculateur de sécurité incendie.</span>
                </p>
                <div className="flex justify-end mt-2">
                  <Link to="/workspace/calculateurs?tab=incendie">
                    <Button size="sm" variant="outline" className="text-xs bg-white text-blue-600 border-blue-200 hover:bg-blue-50">
                      <Building2 className="h-3 w-3 mr-1" />
                      Calculateurs incendie
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="erp" className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Établissements Recevant du Public (ERP)</CardTitle>
              <CardDescription>
                Exigences spécifiques pour les ERP selon leur type et catégorie
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {erpDTUs.map((dtu) => (
                <div key={dtu.id} className="border rounded-md p-4">
                  <h3 className="font-medium text-base mb-3">{dtu.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{dtu.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Points clés</h4>
                      <ul className="space-y-2">
                        {dtu.rules.map((rule, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="font-semibold min-w-[100px]">{rule.title}:</span>
                            <span>{rule.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {dtu.sections && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Détails</h4>
                        <ul className="space-y-2">
                          {dtu.sections.map((section, index) => (
                            <li key={index} className="text-sm flex gap-2">
                              <span className="font-semibold min-w-[100px]">{section.title}:</span>
                              <span>{section.content}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logement" className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Logements et habitations</CardTitle>
              <CardDescription>
                Réglementation incendie applicable aux immeubles d'habitation individuels et collectifs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {logementDTUs.map((dtu) => (
                <div key={dtu.id} className="border rounded-md p-4">
                  <h3 className="font-medium text-base mb-3">{dtu.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{dtu.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Points clés</h4>
                      <ul className="space-y-2">
                        {dtu.rules.map((rule, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="font-semibold min-w-[100px]">{rule.title}:</span>
                            <span>{rule.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {dtu.sections && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Détails</h4>
                        <ul className="space-y-2">
                          {dtu.sections.map((section, index) => (
                            <li key={index} className="text-sm flex gap-2">
                              <span className="font-semibold min-w-[100px]">{section.title}:</span>
                              <span>{section.content}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parking" className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parcs de stationnement</CardTitle>
              <CardDescription>
                Règles spécifiques pour les parkings couverts et solutions techniques conformes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {parkingDTUs.map((dtu) => (
                <div key={dtu.id} className="border rounded-md p-4">
                  <h3 className="font-medium text-base mb-3">{dtu.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{dtu.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Points clés</h4>
                      <ul className="space-y-2">
                        {dtu.rules.map((rule, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="font-semibold min-w-[100px]">{rule.title}:</span>
                            <span>{rule.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {dtu.sections && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Détails</h4>
                        <ul className="space-y-2">
                          {dtu.sections.map((section, index) => (
                            <li key={index} className="text-sm flex gap-2">
                              <span className="font-semibold min-w-[100px]">{section.title}:</span>
                              <span>{section.content}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desenfumage" className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Désenfumage</CardTitle>
              <CardDescription>
                Principes et méthodes de désenfumage naturel et mécanique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {desenfumageDTUs.map((dtu) => (
                <div key={dtu.id} className="border rounded-md p-4">
                  <h3 className="font-medium text-base mb-3">{dtu.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{dtu.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Points clés</h4>
                      <ul className="space-y-2">
                        {dtu.rules.map((rule, index) => (
                          <li key={index} className="text-sm flex gap-2">
                            <span className="font-semibold min-w-[100px]">{rule.title}:</span>
                            <span>{rule.content}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {dtu.sections && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Détails</h4>
                        <ul className="space-y-2">
                          {dtu.sections.map((section, index) => (
                            <li key={index} className="text-sm flex gap-2">
                              <span className="font-semibold min-w-[100px]">{section.title}:</span>
                              <span>{section.content}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Télécharger PDF
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="bg-orange-50 p-4 rounded-md border border-orange-100">
                <p className="text-sm text-orange-800 flex items-start gap-2">
                  <ExternalLink className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Pour dimensionner précisément vos dispositifs de désenfumage, n'hésitez pas à utiliser notre calculateur spécialisé.</span>
                </p>
                <div className="flex justify-end mt-2">
                  <Link to="/workspace/calculateurs?tab=incendie">
                    <Button size="sm" variant="outline" className="text-xs bg-white text-orange-600 border-orange-200 hover:bg-orange-50">
                      <Flame className="h-3 w-3 mr-1" />
                      Calculateur de désenfumage
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
