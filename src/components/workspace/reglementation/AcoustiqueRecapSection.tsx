
import React, { useState } from 'react';
import { DTU } from './dtu/types';
import { Volume, Home, Store, Headphones, Building, School, ExternalLink, BookOpen, Download, Calculator } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { acoustiqueData } from './data/acoustique';
import { acoustiqueDTUs } from './data/dtu/acoustique';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const AcoustiqueRecapSection = () => {
  const [acoustiqueTab, setAcoustiqueTab] = useState("logement");
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDTUDialogOpen, setIsDTUDialogOpen] = useState(false);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [openCalculator, setOpenCalculator] = useState<string | null>(null);

  const handleOpenDTU = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDTUDialogOpen(true);
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
    'acoustique-isolement': {
      title: 'Isolement aux bruits aériens',
      description: 'Calcul d\'isolement acoustique entre locaux',
      content: 'Ce calculateur permet d\'estimer l\'isolement acoustique standardisé DnT,A entre deux locaux en fonction des parois de séparation, des transmissions latérales et des éléments constructifs utilisés.'
    },
    'acoustique-impact': {
      title: 'Bruits d\'impact',
      description: 'Calcul de niveau de bruit d\'impact',
      content: 'Cet outil permet d\'évaluer l\'isolement aux bruits d\'impact d\'un plancher en fonction de sa composition et des revêtements appliqués.'
    },
    'acoustique-reverberation': {
      title: 'Temps de réverbération',
      description: 'Calcul du temps de réverbération d\'un local',
      content: 'Calculez le temps de réverbération d\'un local en fonction de son volume, de sa géométrie et des matériaux de revêtement utilisés sur les différentes surfaces.'
    }
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
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload(`${key}-details`, `Réglementation acoustique ${key} détaillée`)}
                    disabled={downloadingId === `${key}-details`}
                  >
                    {downloadingId === `${key}-details` ? (
                      <span className="flex items-center">Téléchargement...</span>
                    ) : (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Télécharger les détails
                      </>
                    )}
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
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleDownload(`${key}-guide`, `Guide acoustique ${key}`)}
                    disabled={downloadingId === `${key}-guide`}
                  >
                    {downloadingId === `${key}-guide` ? (
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
                <CardTitle>Outils de calcul acoustique</CardTitle>
                <CardDescription>
                  Calculateurs et simulateurs pour l'acoustique du bâtiment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium">Isolement aux bruits aériens</h3>
                    <p className="text-sm text-gray-600 mt-1">Calcul d'isolement entre locaux</p>
                    <div className="mt-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenCalculator('acoustique-isolement')}
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Calculer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleDownload('acoustique-isolement-doc', 'Guide isolement acoustique')}
                        disabled={downloadingId === 'acoustique-isolement-doc'}
                      >
                        {downloadingId === 'acoustique-isolement-doc' ? 'En cours...' : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Guide
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium">Bruits d'impact</h3>
                    <p className="text-sm text-gray-600 mt-1">Calcul niveau de bruit d'impact</p>
                    <div className="mt-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenCalculator('acoustique-impact')}
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Calculer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleDownload('acoustique-impact-doc', 'Guide bruits d\'impact')}
                        disabled={downloadingId === 'acoustique-impact-doc'}
                      >
                        {downloadingId === 'acoustique-impact-doc' ? 'En cours...' : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Guide
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium">Temps de réverbération</h3>
                    <p className="text-sm text-gray-600 mt-1">Calcul de réverbération d'un local</p>
                    <div className="mt-2 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenCalculator('acoustique-reverberation')}
                      >
                        <Calculator className="h-4 w-4 mr-1" />
                        Calculer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => handleDownload('acoustique-reverberation-doc', 'Guide réverbération')}
                        disabled={downloadingId === 'acoustique-reverberation-doc'}
                      >
                        {downloadingId === 'acoustique-reverberation-doc' ? 'En cours...' : (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Guide
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="ghost">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Détails
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(`dtu-${dtu.id}`, dtu.title);
                          }}
                          disabled={downloadingId === `dtu-${dtu.id}`}
                        >
                          {downloadingId === `dtu-${dtu.id}` ? 'En cours...' : (
                            <>
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </>
                          )}
                        </Button>
                      </div>
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
