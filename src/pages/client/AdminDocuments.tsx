
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FileText, Clock, Download, FileUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDocuments = () => {
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();

  // Handle admin mode toggle
  const handleAdminModeToggle = (checked: boolean) => {
    setIsAdminMode(checked);
    localStorage.setItem('adminMode', checked.toString());
    toast({
      title: checked ? "Mode administrateur activé" : "Mode client activé",
      description: checked 
        ? "Vous pouvez maintenant gérer les dossiers et les clients." 
        : "Vous voyez maintenant l'interface client standard.",
    });
  };

  // Mock data for documents
  const documents = [
    {
      id: '1',
      name: 'Conditions générales de vente',
      type: 'pdf',
      size: '1.2 MB',
      updated: '2023-09-15',
      category: 'legal'
    },
    {
      id: '2',
      name: 'Contrat type',
      type: 'docx',
      size: '245 KB',
      updated: '2023-08-22',
      category: 'contracts'
    },
    {
      id: '3',
      name: 'CCTP modèle',
      type: 'pdf',
      size: '3.5 MB',
      updated: '2023-07-14',
      category: 'technical'
    },
    {
      id: '4',
      name: 'Procès-verbal de réception',
      type: 'pdf',
      size: '420 KB',
      updated: '2023-09-05',
      category: 'technical'
    }
  ];

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Gestion des documents | Progineer</title>
        <meta name="description" content="Gérez tous les documents dans l'espace administration." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Gestion des documents
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Organisez et gérez tous les documents de la plateforme.
              </p>
            </div>
            
            {/* Admin Switch */}
            <div className="md:mt-0 mt-4 flex items-center gap-3">
              <AdminSwitch isAdminMode={isAdminMode} onToggle={handleAdminModeToggle} />
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-gray-950">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <ClientNavigation isAdminMode={isAdminMode} />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Documents</h2>
                <Button variant="default" className="bg-khaki-600 hover:bg-khaki-700">
                  <FileUp className="h-4 w-4 mr-2" />
                  Ajouter un document
                </Button>
              </div>
              
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="technical">Techniques</TabsTrigger>
                  <TabsTrigger value="contracts">Contrats</TabsTrigger>
                  <TabsTrigger value="legal">Légaux</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="divide-y">
                        {documents.map((doc) => (
                          <div key={doc.id} className="py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-khaki-600" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span className="uppercase">{doc.type}</span>
                                  <span className="mx-2">•</span>
                                  <span>{doc.size}</span>
                                  <span className="mx-2">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Mis à jour le {new Date(doc.updated).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="technical" className="mt-0">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="divide-y">
                        {documents.filter(doc => doc.category === 'technical').map((doc) => (
                          <div key={doc.id} className="py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-khaki-600" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span className="uppercase">{doc.type}</span>
                                  <span className="mx-2">•</span>
                                  <span>{doc.size}</span>
                                  <span className="mx-2">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Mis à jour le {new Date(doc.updated).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="contracts" className="mt-0">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="divide-y">
                        {documents.filter(doc => doc.category === 'contracts').map((doc) => (
                          <div key={doc.id} className="py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-khaki-600" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span className="uppercase">{doc.type}</span>
                                  <span className="mx-2">•</span>
                                  <span>{doc.size}</span>
                                  <span className="mx-2">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Mis à jour le {new Date(doc.updated).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="legal" className="mt-0">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="divide-y">
                        {documents.filter(doc => doc.category === 'legal').map((doc) => (
                          <div key={doc.id} className="py-3 flex justify-between items-center">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-khaki-600" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span className="uppercase">{doc.type}</span>
                                  <span className="mx-2">•</span>
                                  <span>{doc.size}</span>
                                  <span className="mx-2">•</span>
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>Mis à jour le {new Date(doc.updated).toLocaleDateString('fr-FR')}</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4 mr-1" />
                              Télécharger
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminDocuments;
