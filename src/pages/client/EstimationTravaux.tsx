
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { useClientAuth } from '@/hooks/useClientAuth';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { useParams, useNavigate } from 'react-router-dom';
import { loadProjectById } from '@/utils/projectStorage';
import { ProjectDetails } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, DownloadCloud, Mail, Save, Pencil } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

const EstimationTravaux = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [estimation, setEstimation] = useState({
    structuralWork: 0,
    finishingWork: 0,
    technicalLots: 0,
    externalWorks: 0,
    total: 0
  });

  // Load project details
  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      setIsLoading(true);
      try {
        const projectData = await loadProjectById(projectId);
        if (projectData) {
          setProject(projectData);
          calculateEstimation(projectData);
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

  // Calculate a basic estimation based on project type and size
  const calculateEstimation = (project: ProjectDetails) => {
    const workAmount = typeof project.workAmount === 'string' 
      ? parseFloat(project.workAmount) 
      : project.workAmount || 0;
    
    // Base cost distribution
    let structuralWorkPercent = 0.45;
    let finishingWorkPercent = 0.30;
    let technicalLotsPercent = 0.15;
    let externalWorksPercent = 0.10;
    
    // Adjust based on project type
    if (project.projectType === 'residential') {
      // Residential has more finishing work
      structuralWorkPercent = 0.40;
      finishingWorkPercent = 0.35;
    } else if (project.projectType === 'commercial') {
      // Commercial has more technical lots
      structuralWorkPercent = 0.35;
      technicalLotsPercent = 0.25;
      finishingWorkPercent = 0.25;
    } else if (project.projectType === 'industrial') {
      // Industrial has more structural work
      structuralWorkPercent = 0.55;
      technicalLotsPercent = 0.20;
      finishingWorkPercent = 0.15;
    }
    
    setEstimation({
      structuralWork: workAmount * structuralWorkPercent,
      finishingWork: workAmount * finishingWorkPercent,
      technicalLots: workAmount * technicalLotsPercent,
      externalWorks: workAmount * externalWorksPercent,
      total: workAmount
    });
  };

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

  // Export the estimation as PDF
  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "La fonctionnalité d'export PDF est en cours de développement.",
    });
  };

  // Send the estimation by email
  const handleSendEmail = () => {
    toast({
      title: "Envoi par email",
      description: "La fonctionnalité d'envoi par email est en cours de développement.",
    });
  };

  // Save the estimation
  const handleSave = () => {
    toast({
      title: "Sauvegarde",
      description: "La fonctionnalité de sauvegarde est en cours de développement.",
    });
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
        <title>Estimation des travaux | Progineer</title>
        <meta name="description" content="Estimation détaillée des travaux pour votre projet" />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Estimation des travaux
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Établissez une estimation détaillée des travaux pour le projet {project?.projectName || 'sélectionné'}.
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
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(`/workspace/client-area/admin/projects/${projectId}`)}
                    className="flex items-center"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour au projet
                  </Button>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button variant="outline" onClick={handleSendEmail}>
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer par email
                    </Button>
                    <Button className="bg-khaki-600 hover:bg-khaki-700 text-white" onClick={handleExportPDF}>
                      <DownloadCloud className="h-4 w-4 mr-2" />
                      Exporter en PDF
                    </Button>
                  </div>
                </div>
                
                {project ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="border-b pb-4">
                        <div className="flex justify-between items-center">
                          <CardTitle>Estimation des travaux</CardTitle>
                          <div className="text-sm text-gray-500">
                            Référence: EST-{new Date().getFullYear()}-{projectId?.slice(-4).toUpperCase()}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-4 bg-gray-50">
                              <h3 className="font-medium mb-2">Détails du projet</h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Nom du projet:</span>
                                  <span>{project.projectName}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Type:</span>
                                  <span>{project.projectType === 'residential' ? 'Résidentiel' : 
                                         project.projectType === 'commercial' ? 'Commercial' : 
                                         project.projectType === 'industrial' ? 'Industriel' : 
                                         project.projectType}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Localisation:</span>
                                  <span>{project.location || 'Non définie'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Numéro de dossier:</span>
                                  <span>{project.fileNumber || 'Non défini'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border rounded-lg p-4 bg-khaki-50">
                              <h3 className="font-medium mb-2">Estimation globale</h3>
                              <div className="text-center py-2">
                                <div className="text-3xl font-bold text-khaki-800">
                                  {formatCurrency(estimation.total)}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">
                                  Montant estimatif total des travaux HT
                                </div>
                              </div>
                              <div className="mt-4 flex justify-between text-sm">
                                <span>Date d'estimation:</span>
                                <span>{new Date().toLocaleDateString('fr-FR')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-medium">Détail par lots</h3>
                              <Button variant="outline" size="sm" className="flex items-center">
                                <Pencil className="h-3 w-3 mr-1" />
                                Modifier
                              </Button>
                            </div>
                            
                            <table className="w-full">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="text-left p-2">Lots</th>
                                  <th className="text-right p-2 w-1/4">Montant HT</th>
                                  <th className="text-right p-2 w-1/4">Pourcentage</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-2">
                                    <div className="font-medium">Gros œuvre</div>
                                    <div className="text-xs text-gray-500">Fondations, structure, maçonnerie</div>
                                  </td>
                                  <td className="p-2 text-right">{formatCurrency(estimation.structuralWork)}</td>
                                  <td className="p-2 text-right">{Math.round((estimation.structuralWork / estimation.total) * 100)}%</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">
                                    <div className="font-medium">Second œuvre</div>
                                    <div className="text-xs text-gray-500">Menuiseries, plâtrerie, revêtements</div>
                                  </td>
                                  <td className="p-2 text-right">{formatCurrency(estimation.finishingWork)}</td>
                                  <td className="p-2 text-right">{Math.round((estimation.finishingWork / estimation.total) * 100)}%</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">
                                    <div className="font-medium">Lots techniques</div>
                                    <div className="text-xs text-gray-500">Électricité, plomberie, CVC</div>
                                  </td>
                                  <td className="p-2 text-right">{formatCurrency(estimation.technicalLots)}</td>
                                  <td className="p-2 text-right">{Math.round((estimation.technicalLots / estimation.total) * 100)}%</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">
                                    <div className="font-medium">Aménagements extérieurs</div>
                                    <div className="text-xs text-gray-500">VRD, espaces verts, clôtures</div>
                                  </td>
                                  <td className="p-2 text-right">{formatCurrency(estimation.externalWorks)}</td>
                                  <td className="p-2 text-right">{Math.round((estimation.externalWorks / estimation.total) * 100)}%</td>
                                </tr>
                              </tbody>
                              <tfoot className="bg-gray-50 font-medium">
                                <tr>
                                  <td className="p-2">Total HT</td>
                                  <td className="p-2 text-right">{formatCurrency(estimation.total)}</td>
                                  <td className="p-2 text-right">100%</td>
                                </tr>
                                <tr>
                                  <td className="p-2">TVA (20%)</td>
                                  <td className="p-2 text-right">{formatCurrency(estimation.total * 0.2)}</td>
                                  <td className="p-2 text-right">20%</td>
                                </tr>
                                <tr className="font-bold">
                                  <td className="p-2">Total TTC</td>
                                  <td className="p-2 text-right">{formatCurrency(estimation.total * 1.2)}</td>
                                  <td className="p-2 text-right"></td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Notes et hypothèses</h3>
                            <div className="text-sm space-y-2 text-gray-600">
                              <p>Cette estimation est basée sur les hypothèses suivantes :</p>
                              <ul className="list-disc list-inside space-y-1 ml-4">
                                <li>Tarifs marchés actuels (date de l'estimation)</li>
                                <li>Surface approximative de {project.workAmount ? (Number(project.workAmount) / 1500).toFixed(0) : "N/A"} m²</li>
                                <li>Type de construction standard pour un projet {project.projectType === 'residential' ? 'résidentiel' : 
                                   project.projectType === 'commercial' ? 'commercial' : 
                                   project.projectType === 'industrial' ? 'industriel' : 
                                   project.projectType}</li>
                                <li>Terrain sans contraintes particulières</li>
                                <li>Prestations de qualité standard</li>
                              </ul>
                              <p className="mt-4">Cette estimation est fournie à titre indicatif et ne constitue pas un engagement contractuel. Un devis détaillé sera établi après étude approfondie du projet.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Estimation détaillée</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-6">
                          <p className="mb-6 text-gray-600">
                            Pour une estimation plus détaillée, veuillez utiliser notre estimateur avancé qui vous permettra de préciser les caractéristiques techniques de votre projet.
                          </p>
                          <Button 
                            className="bg-khaki-600 hover:bg-khaki-700 text-white"
                            onClick={() => navigate('/calcul-estimation')}
                          >
                            Utiliser l'estimateur avancé
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Projet non trouvé ou impossible à charger.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default EstimationTravaux;
