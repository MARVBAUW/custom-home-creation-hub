
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useParams, useNavigate } from 'react-router-dom';
import { loadProjectById, saveProject } from '@/utils/projectStorage';
import { ProjectDetails } from '@/types/project';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Save, ArrowLeft } from 'lucide-react';
import FormSubmitButton from '@/components/admin/project-creation/FormSubmitButton';

const AdminProjectEdit = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load project details when component mounts
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

    if (isSignedIn) {
      fetchProject();
    }
  }, [projectId, isSignedIn, navigate, toast]);

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

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (project) {
      setProject({
        ...project,
        [name]: value,
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    setIsSubmitting(true);
    try {
      await saveProject(project);
      toast({
        title: 'Succès',
        description: 'Le projet a été mis à jour avec succès',
      });
      navigate(`/workspace/client-area/admin/projects/${projectId}`);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le projet',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
    </div>;
  }

  return (
    <>
      <Helmet>
        <title>Modifier le projet | Progineer</title>
        <meta name="description" content="Modifier les informations du projet" />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Modifier le projet
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Mettez à jour les informations du projet.
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
            <div className="lg:col-span-3">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/workspace/client-area/admin/projects/${projectId}`)}
                className="mb-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux détails du projet
              </Button>

              {project ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Modifier le projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="projectName">Nom du projet</Label>
                          <Input
                            id="projectName"
                            name="projectName"
                            value={project.projectName}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="fileNumber">Numéro de dossier</Label>
                          <Input
                            id="fileNumber"
                            name="fileNumber"
                            value={project.fileNumber}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="projectType">Type de projet</Label>
                          <select
                            id="projectType"
                            name="projectType"
                            value={project.projectType}
                            onChange={handleChange}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                            required
                          >
                            <option value="residential">Résidentiel</option>
                            <option value="commercial">Commercial</option>
                            <option value="industrial">Industriel</option>
                            <option value="other">Autre</option>
                          </select>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="projectOwner">Maître d'ouvrage</Label>
                          <Input
                            id="projectOwner"
                            name="projectOwner"
                            value={project.projectOwner}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="location">Localisation</Label>
                          <Input
                            id="location"
                            name="location"
                            value={project.location || ''}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="workAmount">Montant des travaux (€)</Label>
                          <Input
                            id="workAmount"
                            name="workAmount"
                            type="text"
                            value={project.workAmount}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="space-y-3 md:col-span-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={project.description || ''}
                            onChange={handleChange}
                            rows={4}
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-3 pt-4">
                        <Button 
                          type="button"
                          variant="outline"
                          onClick={() => navigate(`/workspace/client-area/admin/projects/${projectId}`)}
                          disabled={isSubmitting}
                        >
                          Annuler
                        </Button>
                        <FormSubmitButton 
                          isSubmitting={isSubmitting} 
                          label="Enregistrer les modifications"
                          submitLabel="Enregistrement..."
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Projet non trouvé ou impossible à charger.</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminProjectEdit;
