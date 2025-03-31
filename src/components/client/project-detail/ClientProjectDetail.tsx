
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Building, Calendar, FileText, MessageSquare, Clock, Users } from 'lucide-react';
import ClientFileManager from "@/components/admin/file-management/ClientFileManager";

const ClientProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les détails du projet
    const loadProject = async () => {
      setLoading(true);
      try {
        // Pour la démonstration, nous utilisons les données du localStorage
        // Dans une implémentation réelle, nous utiliserions Supabase
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        const foundProject = projects.find((p: any) => p.id === projectId);
        
        if (foundProject) {
          setProject(foundProject);
        } else {
          throw new Error('Projet non trouvé');
        }
      } catch (error) {
        console.error("Erreur lors du chargement du projet:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails du projet.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (projectId) {
      loadProject();
    }
  }, [projectId, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Projet non trouvé</h3>
            <p className="text-gray-500">
              Le projet demandé n'existe pas ou vous n'avez pas les permissions nécessaires pour y accéder.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Entête du projet */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">{project.projectName}</CardTitle>
              <p className="text-gray-500 mt-1">
                {project.type || 'Construction'} • {project.location || 'Non spécifié'}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium mr-2">Référence:</span>
                <span className="text-sm text-gray-600">
                  {project.fileNumber || 'Non attribuée'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm" className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contacter le responsable
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Contenu du projet */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger value="overview" className="data-[state=active]:bg-khaki-50">
            <Calendar className="h-4 w-4 mr-2" />
            Vue d'ensemble
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-khaki-50">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="planning" className="data-[state=active]:bg-khaki-50">
            <Clock className="h-4 w-4 mr-2" />
            Planning
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-khaki-50">
            <Users className="h-4 w-4 mr-2" />
            Équipe
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Vue d'ensemble du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Informations générales</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-40 font-medium text-gray-500">Nom du projet:</span>
                        <span>{project.projectName}</span>
                      </div>
                      <div className="flex">
                        <span className="w-40 font-medium text-gray-500">Type:</span>
                        <span>{project.type || 'Non spécifié'}</span>
                      </div>
                      <div className="flex">
                        <span className="w-40 font-medium text-gray-500">Localisation:</span>
                        <span>{project.location || 'Non spécifiée'}</span>
                      </div>
                      <div className="flex">
                        <span className="w-40 font-medium text-gray-500">Surface:</span>
                        <span>{project.surface || 'Non spécifiée'} m²</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3">Dates importantes</h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-40 font-medium text-gray-500">Début du projet:</span>
                        <span>
                          {project.startDate 
                            ? new Date(project.startDate).toLocaleDateString('fr-FR') 
                            : 'Non spécifiée'}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-40 font-medium text-gray-500">Fin prévue:</span>
                        <span>
                          {project.endDate 
                            ? new Date(project.endDate).toLocaleDateString('fr-FR') 
                            : 'Non spécifiée'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Avancement</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Avancement global</span>
                          <span className="text-sm font-medium">{project.progress || 0}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-khaki-600 rounded-full" 
                            style={{ width: `${project.progress || 0}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="bg-khaki-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Phase actuelle</h4>
                        <p>{project.currentPhase || 'Études préliminaires'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Contact principal</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Architecte chef de projet</p>
                      <p className="text-gray-600">Jean Dupont</p>
                      <p className="text-gray-600">jean.dupont@progineer.fr</p>
                      <p className="text-gray-600">06 XX XX XX XX</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <ClientFileManager projectId={projectId} />
        </TabsContent>
        
        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>Planning du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Phase 1: Études préliminaires</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>01/06/2023 - 15/07/2023</span>
                    <span className="font-medium text-green-600">Terminé</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Phase 2: Conception détaillée</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>16/07/2023 - 30/09/2023</span>
                    <span className="font-medium text-blue-600">En cours</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full w-3/4"></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Phase 3: Permis de construire</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>01/10/2023 - 31/12/2023</span>
                    <span className="font-medium text-gray-600">À venir</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-400 rounded-full w-0"></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Phase 4: Appel d'offres</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>01/01/2024 - 28/02/2024</span>
                    <span className="font-medium text-gray-600">À venir</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-400 rounded-full w-0"></div>
                  </div>
                </div>
                
                <div className="bg-gray-50 border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Phase 5: Construction</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>01/03/2024 - 30/11/2024</span>
                    <span className="font-medium text-gray-600">À venir</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-gray-400 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Équipe du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-1">Jean Dupont</h3>
                  <p className="text-khaki-700 mb-2">Architecte chef de projet</p>
                  <p className="text-sm text-gray-600">jean.dupont@progineer.fr</p>
                  <p className="text-sm text-gray-600">06 XX XX XX XX</p>
                </div>
                
                <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-1">Marie Lambert</h3>
                  <p className="text-khaki-700 mb-2">Ingénieure structure</p>
                  <p className="text-sm text-gray-600">marie.lambert@progineer.fr</p>
                  <p className="text-sm text-gray-600">06 XX XX XX XX</p>
                </div>
                
                <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-1">Pierre Martin</h3>
                  <p className="text-khaki-700 mb-2">Économiste de la construction</p>
                  <p className="text-sm text-gray-600">pierre.martin@progineer.fr</p>
                  <p className="text-sm text-gray-600">06 XX XX XX XX</p>
                </div>
                
                <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-medium mb-1">Sophie Lefevre</h3>
                  <p className="text-khaki-700 mb-2">Ingénieure fluides</p>
                  <p className="text-sm text-gray-600">sophie.lefevre@progineer.fr</p>
                  <p className="text-sm text-gray-600">06 XX XX XX XX</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientProjectDetail;
