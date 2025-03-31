
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Edit, ArrowLeft, Calendar, FileText, Settings, Users, Truck, Building } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loadProjectById } from '@/utils/projectStorage';
import { ProjectDetails } from '@/types/project';
import ProjectPhases from './ProjectPhases';
import ProjectTools from './ProjectTools';
import ProjectGanttView from './ProjectGanttView';
import { formatDateFrench } from '@/utils/dateUtils';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      setIsLoading(true);
      try {
        const projectData = await loadProjectById(projectId);
        if (projectData) {
          setProject(projectData);
        } else {
          toast({
            title: 'Erreur',
            description: 'Projet non trouvé',
            variant: 'destructive',
          });
          navigate('/workspace/client-area/admin/projects');
        }
      } catch (error) {
        console.error('Erreur lors du chargement du projet :', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les détails du projet',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [projectId, navigate, toast]);

  const handleEdit = () => {
    if (projectId) {
      navigate(`/workspace/client-area/admin/projects/${projectId}/edit`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate('/workspace/client-area/admin/projects')}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste des projets
        </Button>
        
        <Button 
          onClick={handleEdit}
          className="flex items-center bg-khaki-600 hover:bg-khaki-700 text-white"
        >
          <Edit className="h-4 w-4 mr-2" />
          Modifier le projet
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <CardTitle className="text-2xl">{project.projectName}</CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-gray-500">
                <div className="flex items-center">
                  <Building className="h-4 w-4 mr-1" />
                  <span>Dossier {project.fileNumber || "Non attribué"}</span>
                </div>
                <div className="hidden sm:block text-gray-300">•</div>
                <div className="flex items-center">
                  <span>{project.workAmount ? `${project.workAmount} €` : "Montant non défini"}</span>
                </div>
              </div>
            </div>
            
            <ProjectTools projectId={projectId} />
          </div>
        </CardHeader>
      </Card>
      
      <ProjectPhases projectId={projectId} phases={project.phases} />
      
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1">
          <TabsTrigger value="details" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <FileText className="h-4 w-4 mr-2" />
            Détails
          </TabsTrigger>
          <TabsTrigger value="planning" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <Calendar className="h-4 w-4 mr-2" />
            Planning
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <Users className="h-4 w-4 mr-2" />
            Équipe
          </TabsTrigger>
          <TabsTrigger value="companies" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <Truck className="h-4 w-4 mr-2" />
            Entreprises
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Nom du projet</span>
                    <p>{project.projectName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Numéro de dossier</span>
                    <p>{project.fileNumber || "Non attribué"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Type de projet</span>
                    <p>{
                      project.projectType === "residential" ? "Résidentiel" :
                      project.projectType === "commercial" ? "Commercial" :
                      project.projectType === "industrial" ? "Industriel" : "Autre"
                    }</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Maître d'ouvrage</span>
                    <p>{project.projectOwner || "Non défini"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Localisation</span>
                    <p>{project.location || "Non définie"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Montant des travaux</span>
                    <p>{project.workAmount ? `${project.workAmount} €` : "Non défini"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="planning" className="space-y-6">
          <ProjectGanttView project={project} />
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Équipe du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Chef de projet</span>
                    <p>{project.team?.projectManager || "Non assigné"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Directeur technique</span>
                    <p>{project.team?.technicalDirector || "Non assigné"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Dessinateur</span>
                    <p>{project.team?.draftsman || "Non assigné"}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Superviseur de chantier</span>
                    <p>{project.team?.workSupervisor || "Non assigné"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Assistant administratif</span>
                    <p>{project.team?.adminAssistant || "Non assigné"}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Directeur de division</span>
                    <p>{project.team?.divisionDirector || "Non assigné"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Entreprises</CardTitle>
                <Button className="bg-khaki-600 hover:bg-khaki-700 text-white">
                  Ajouter une entreprise
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {project.companies && project.companies.length > 0 ? (
                <div className="space-y-4">
                  {project.companies.map((company, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-medium">{company.name}</h3>
                        <span className="bg-khaki-100 text-khaki-800 text-xs px-2 py-1 rounded">
                          {company.role || "Prestataire"}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Contact : </span>
                          {company.contactName || "Non défini"}
                        </div>
                        <div>
                          <span className="text-gray-500">Téléphone : </span>
                          {company.phone || "Non défini"}
                        </div>
                        <div>
                          <span className="text-gray-500">Email : </span>
                          {company.email || "Non défini"}
                        </div>
                        <div>
                          <span className="text-gray-500">Adresse : </span>
                          {company.address || "Non définie"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">Aucune entreprise n'est rattachée à ce projet pour le moment.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Autorisations administratives</h3>
                  <p>{project.adminAuthorization === "building_permit" ? "Permis de construire" : project.adminAuthorization}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Dates</h3>
                  <div className="flex items-center mb-2">
                    <input 
                      type="checkbox" 
                      checked={project.automaticDates} 
                      disabled 
                      className="mr-2" 
                    />
                    <span>Calculer automatiquement les dates</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Date de début globale</span>
                      <p>{project.dates?.global?.startDate ? formatDateFrench(new Date(project.dates.global.startDate)) : "Non définie"}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Date de fin globale</span>
                      <p>{project.dates?.global?.endDate ? formatDateFrench(new Date(project.dates.global.endDate)) : "Non définie"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
