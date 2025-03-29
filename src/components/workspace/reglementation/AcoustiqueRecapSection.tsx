
import React, { useState } from 'react';
import { DTU } from './dtu/types';
import { Volume, Home, Store, Headphones, Building, School, ExternalLink, BookOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { acoustiqueData } from './data/acoustique';
import { acoustiqueDTUs } from './data/dtu/acoustique';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';

export const AcoustiqueRecapSection = () => {
  const [acoustiqueTab, setAcoustiqueTab] = useState("logement");
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDTUDialogOpen, setIsDTUDialogOpen] = useState(false);

  const handleOpenDTU = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDTUDialogOpen(true);
  };

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

        {Object.entries(acoustiqueData).map(([key, data]) => (
          <TabsContent key={key} value={key} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{data.title}</CardTitle>
                  <CardDescription>
                    {data.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.sections.slice(0, 2).map((section) => (
                    <div key={section.id}>
                      <h4 className="font-medium text-sm">{section.title}</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        {section.rules.map((rule, rIndex) => (
                          <li key={rIndex}><strong>{rule.title} :</strong> {rule.content}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
                  <CardTitle>Solutions techniques</CardTitle>
                  <CardDescription>
                    Mise en application pour {key === 'logement' ? 'logements' : 
                                            key === 'erp' ? 'ERP' : 
                                            key === 'education' ? 'établissements d\'enseignement' : 'bureaux'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.sections.slice(2, 3).map((section) => (
                      <div key={section.id}>
                        <h4 className="font-medium text-sm">{section.title}</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          {section.rules.map((rule, rIndex) => (
                            <li key={rIndex}>
                              <div className={`p-3 rounded-md ${
                                rule.type === 'warning' ? 'bg-amber-50' : 
                                rule.type === 'tip' ? 'bg-blue-50' : 'bg-green-50'
                              }`}>
                                <strong>{rule.title}</strong>: {rule.content}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    
                    <p className="text-sm mt-3 text-gray-600">
                      Pour des performances optimales, combinez différentes solutions selon les contraintes du projet.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Consulter les guides
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>DTU et normes applicables</CardTitle>
                <CardDescription>
                  Documents techniques unifiés et normes acoustiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {acoustiqueDTUs.map((dtu) => (
                    <div 
                      key={dtu.id} 
                      onClick={() => handleOpenDTU(dtu)}
                      className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{dtu.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{dtu.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {dtu.category}
                        </Badge>
                      </div>
                      <Button size="sm" variant="ghost" className="mt-2">
                        <BookOpen className="h-4 w-4 mr-1" />
                        Détails
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Dialog de détail DTU */}
      <DTUDetailDialog
        dtu={selectedDTU}
        isOpen={isDTUDialogOpen}
        onOpenChange={setIsDTUDialogOpen}
      />
    </div>
  );
};
