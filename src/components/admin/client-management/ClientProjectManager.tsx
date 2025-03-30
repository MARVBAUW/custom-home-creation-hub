
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Plus, Search, UserPlus, FileText, Trash2, PenLine, AlertTriangle } from 'lucide-react';

interface ClientProject {
  id: string;
  user_id: string;
  title: string;
  project_type: string;
  construction_type: string;
  description: string;
  location: string;
  surface: number;
  budget: number;
  has_pool: boolean;
  has_solar_panels: boolean;
  has_garage: boolean;
  has_basement: boolean;
  created_at: string;
  status: string;
}

interface ClientProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
}

interface ClientProjectManagerProps {
  clientId?: string;
}

const ClientProjectManager: React.FC<ClientProjectManagerProps> = ({ clientId }) => {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Load client projects and profile
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (clientId) {
          // Fetch client profile
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', clientId)
            .single();
            
          if (profileError) throw profileError;
          
          setClient(profileData);
          
          // Fetch client projects
          const { data: projectsData, error: projectsError } = await supabase
            .from('client_projects')
            .select('*')
            .eq('user_id', clientId);
            
          if (projectsError) throw projectsError;
          
          setProjects(projectsData || []);
        } else {
          // Fetch all projects from all clients
          const { data: projectsData, error: projectsError } = await supabase
            .from('client_projects')
            .select('*')
            .order('created_at', { ascending: false });
            
          if (projectsError) throw projectsError;
          
          setProjects(projectsData || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les données du client",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [clientId, toast]);
  
  // Confirm and handle project deletion
  const handleDeleteProject = async () => {
    if (!deleteProjectId) return;
    
    try {
      const { error } = await supabase
        .from('client_projects')
        .delete()
        .eq('id', deleteProjectId);
        
      if (error) throw error;
      
      setProjects(projects.filter(project => project.id !== deleteProjectId));
      
      toast({
        title: "Projet supprimé",
        description: "Le projet a été supprimé avec succès",
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le projet",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setDeleteProjectId(null);
    }
  };
  
  // Format project type for display
  const formatProjectType = (type: string) => {
    const types = {
      'new': 'Construction neuve',
      'renovation': 'Rénovation',
      'extension': 'Extension',
      'other': 'Autre'
    };
    return types[type as keyof typeof types] || type;
  };
  
  // Format construction type for display
  const formatConstructionType = (type: string) => {
    const types = {
      'residential': 'Résidentiel',
      'commercial': 'Commercial',
      'industrial': 'Industriel',
      'other': 'Autre'
    };
    return types[type as keyof typeof types] || type;
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  // Create a new admin project from client project
  const createAdminProject = async (clientProject: ClientProject) => {
    try {
      // First, check if the project already has an admin project
      const { data: existingProjects, error: checkError } = await supabase
        .from('admin_projects')
        .select('id')
        .eq('client_project_id', clientProject.id);
        
      if (checkError) throw checkError;
      
      if (existingProjects && existingProjects.length > 0) {
        toast({
          title: "Projet existant",
          description: "Un projet administrateur est déjà associé à ce projet client",
          variant: "default",
        });
        return;
      }
      
      // Create new admin project
      const { data, error } = await supabase
        .from('admin_projects')
        .insert({
          client_project_id: clientProject.id,
          client_id: clientProject.user_id,
          project_title: clientProject.title,
          project_type: clientProject.project_type,
          construction_type: clientProject.construction_type,
          description: clientProject.description,
          location: clientProject.location,
          estimated_budget: clientProject.budget,
          surface: clientProject.surface,
          status: 'new',
          created_at: new Date().toISOString()
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Projet créé",
        description: "Le projet administrateur a été créé avec succès",
      });
      
      // Redirect to the new project
      window.location.href = `/workspace/client-area/admin/projects/${data.id}`;
    } catch (error) {
      console.error('Error creating admin project:', error);
      toast({
        title: "Erreur",
        description: "Impossible de créer le projet administrateur",
        variant: "destructive",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-khaki-600" />
        <span className="ml-2 text-lg">Chargement des projets...</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {client && (
        <Card className="bg-gray-50 border-khaki-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Informations client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-500 text-sm">Nom</Label>
                <p className="font-medium">{client.full_name}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-sm">Email</Label>
                <p className="font-medium">{client.email}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-sm">Téléphone</Label>
                <p className="font-medium">{client.phone || 'Non renseigné'}</p>
              </div>
              <div>
                <Label className="text-gray-500 text-sm">Adresse</Label>
                <p className="font-medium">{client.address || 'Non renseignée'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle>Projets client</CardTitle>
              <CardDescription>
                {projects.length === 0 
                  ? "Aucun projet n'a été créé par ce client" 
                  : `${projects.length} projet(s) associé(s) à ce client`}
              </CardDescription>
            </div>
            
            <div className="flex gap-2">
              <Input
                type="search"
                placeholder="Rechercher un projet..."
                className="w-full md:w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="py-8 text-center bg-gray-50 rounded-md">
              <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-2" />
              <h3 className="text-lg font-medium mb-1">Aucun projet trouvé</h3>
              <p className="text-gray-500 mb-4">Ce client n'a pas encore créé de projet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 md:p-6 flex-grow">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-medium">{project.title}</h3>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {formatProjectType(project.project_type)}
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            <p className="text-gray-600">{project.description.slice(0, 150)}...</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Type:</span>
                                <span className="font-medium">{formatConstructionType(project.construction_type)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Localisation:</span>
                                <span className="font-medium">{project.location}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Surface:</span>
                                <span className="font-medium">{project.surface} m²</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Budget:</span>
                                <span className="font-medium">{project.budget.toLocaleString('fr-FR')} €</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Date:</span>
                                <span className="font-medium">{formatDate(project.created_at)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Statut:</span>
                                <Badge
                                  variant="outline"
                                  className={
                                    project.status === 'new' ? 'bg-green-50 text-green-700 border-green-200' :
                                    project.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                    project.status === 'completed' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                    'bg-gray-50 text-gray-700 border-gray-200'
                                  }
                                >
                                  {project.status === 'new' ? 'Nouveau' :
                                   project.status === 'in_progress' ? 'En cours' :
                                   project.status === 'completed' ? 'Terminé' : 'Inconnu'}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-1">
                              {project.has_pool && (
                                <Badge variant="outline" className="bg-gray-50">Piscine</Badge>
                              )}
                              {project.has_solar_panels && (
                                <Badge variant="outline" className="bg-gray-50">Panneaux solaires</Badge>
                              )}
                              {project.has_garage && (
                                <Badge variant="outline" className="bg-gray-50">Garage</Badge>
                              )}
                              {project.has_basement && (
                                <Badge variant="outline" className="bg-gray-50">Sous-sol</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-200 flex flex-row md:flex-col justify-center md:justify-start gap-2 md:gap-3">
                      <Button 
                        variant="default" 
                        className="bg-khaki-600 hover:bg-khaki-700 h-9 px-3"
                        onClick={() => createAdminProject(project)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Créer projet admin
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9 px-3"
                      >
                        <PenLine className="h-4 w-4 mr-2" />
                        Modifier
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9 px-3 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => {
                          setDeleteProjectId(project.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce projet client ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProject}
            >
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientProjectManager;
