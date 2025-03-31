
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
import { ArrowLeft, DownloadCloud, Calculator, Mail, Save } from 'lucide-react';

const DevisHonoraires = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isLoaded, isSignedIn } = useClientAuth({ redirectIfUnauthenticated: true });
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [honorairesData, setHonorairesData] = useState({
    baseRate: 10, // pourcentage par défaut
    additionalServices: [] as {name: string, amount: number}[],
    totalHonoraires: 0,
    tva: 0,
    totalTTC: 0
  });

  // Charger les détails du projet
  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      setIsLoading(true);
      try {
        const projectData = await loadProjectById(projectId);
        if (projectData) {
          setProject(projectData);
          calculateHonoraires(projectData);
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

  // Calculer les honoraires en fonction du projet
  const calculateHonoraires = (project: ProjectDetails) => {
    const workAmount = typeof project.workAmount === 'string' 
      ? parseFloat(project.workAmount) 
      : project.workAmount || 0;
    
    // Taux de base selon le type de projet
    let baseRate = 10; // pourcentage par défaut
    if (project.projectType === 'residential') {
      baseRate = 12;
    } else if (project.projectType === 'commercial') {
      baseRate = 8;
    } else if (project.projectType === 'industrial') {
      baseRate = 6;
    }
    
    // Services additionnels
    const additionalServices = [
      { name: 'Étude de faisabilité', amount: workAmount * 0.01 },
      { name: 'Dossier de permis de construire', amount: workAmount * 0.02 },
      { name: 'Consultation des entreprises', amount: workAmount * 0.015 },
      { name: 'Direction de l\'exécution des travaux', amount: workAmount * 0.03 },
    ];
    
    // Calculs
    const baseHonoraires = workAmount * (baseRate / 100);
    const additionalTotal = additionalServices.reduce((total, service) => total + service.amount, 0);
    const totalHonoraires = baseHonoraires + additionalTotal;
    const tva = totalHonoraires * 0.2; // TVA à 20%
    const totalTTC = totalHonoraires + tva;
    
    setHonorairesData({
      baseRate,
      additionalServices,
      totalHonoraires,
      tva,
      totalTTC
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

  // Export the fees proposal as PDF
  const handleExportPDF = () => {
    toast({
      title: "Export PDF",
      description: "La fonctionnalité d'export PDF est en cours de développement.",
    });
  };

  // Send the fees proposal by email
  const handleSendEmail = () => {
    toast({
      title: "Envoi par email",
      description: "La fonctionnalité d'envoi par email est en cours de développement.",
    });
  };

  // Save the fees proposal
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
        <title>Devis d'honoraires | Progineer</title>
        <meta name="description" content="Établissement du devis d'honoraires pour votre projet" />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900 dark:text-khaki-100 text-sm font-medium">
                Administration
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Devis d'honoraires
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                Établissez un devis d'honoraires pour le projet {project?.projectName || 'sélectionné'}.
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
                      <CardHeader className="border-b">
                        <div className="flex justify-between items-center">
                          <CardTitle>Devis d'honoraires</CardTitle>
                          <div className="text-sm text-gray-500">
                            Référence: HON-{new Date().getFullYear()}-{projectId?.slice(-4).toUpperCase()}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-4 bg-gray-50">
                              <h3 className="font-medium mb-2">Progineer</h3>
                              <div className="space-y-1 text-sm">
                                <p>123 Avenue de la République</p>
                                <p>75011 Paris</p>
                                <p>Email: contact@progineer.fr</p>
                                <p>Téléphone: 01 23 45 67 89</p>
                                <p>SIRET: 123 456 789 00010</p>
                              </div>
                            </div>
                            
                            <div className="border rounded-lg p-4 bg-gray-50">
                              <h3 className="font-medium mb-2">Client</h3>
                              <div className="space-y-1 text-sm">
                                <p>{project.projectOwner || "Client non défini"}</p>
                                <p>{project.location || "Adresse non définie"}</p>
                                <p>Projet: {project.projectName}</p>
                                <p>Référence: {project.fileNumber}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Mission</h3>
                            <p className="text-gray-600 mb-4">
                              Maîtrise d'œuvre pour le projet "{project.projectName}" situé à {project.location || "lieu non défini"}.
                            </p>
                            
                            <div className="space-y-4">
                              <div>
                                <h4 className="text-sm font-medium mb-2">Missions de base</h4>
                                <div className="bg-gray-50 p-3 rounded">
                                  <div className="flex justify-between mb-2">
                                    <span>Montant estimatif des travaux HT</span>
                                    <span className="font-medium">
                                      {typeof project.workAmount === 'string' 
                                        ? parseFloat(project.workAmount).toLocaleString('fr-FR')
                                        : (project.workAmount || 0).toLocaleString('fr-FR')} €
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Taux d'honoraires de base</span>
                                    <span className="font-medium">{honorairesData.baseRate}%</span>
                                  </div>
                                </div>
                              </div>
                              
                              <table className="w-full">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="text-left p-2">Détail des prestations</th>
                                    <th className="text-right p-2">Montant HT</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b">
                                    <td className="p-2">
                                      Mission de base de maîtrise d'œuvre ({honorairesData.baseRate}%)
                                    </td>
                                    <td className="p-2 text-right">
                                      {(typeof project.workAmount === 'string' 
                                        ? parseFloat(project.workAmount) * (honorairesData.baseRate / 100)
                                        : (project.workAmount || 0) * (honorairesData.baseRate / 100)).toLocaleString('fr-FR')} €
                                    </td>
                                  </tr>
                                  {honorairesData.additionalServices.map((service, index) => (
                                    <tr key={index} className="border-b">
                                      <td className="p-2">{service.name}</td>
                                      <td className="p-2 text-right">{service.amount.toLocaleString('fr-FR')} €</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-gray-50 font-medium">
                                  <tr>
                                    <td className="p-2">Total honoraires HT</td>
                                    <td className="p-2 text-right">{honorairesData.totalHonoraires.toLocaleString('fr-FR')} €</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2">TVA (20%)</td>
                                    <td className="p-2 text-right">{honorairesData.tva.toLocaleString('fr-FR')} €</td>
                                  </tr>
                                  <tr className="font-bold">
                                    <td className="p-2">Total TTC</td>
                                    <td className="p-2 text-right">{honorairesData.totalTTC.toLocaleString('fr-FR')} €</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Modalités de paiement</h3>
                            <table className="w-full">
                              <thead className="bg-gray-100">
                                <tr>
                                  <th className="text-left p-2">Échéance</th>
                                  <th className="text-right p-2">Pourcentage</th>
                                  <th className="text-right p-2">Montant TTC</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="p-2">À la signature</td>
                                  <td className="p-2 text-right">30%</td>
                                  <td className="p-2 text-right">{(honorairesData.totalTTC * 0.3).toLocaleString('fr-FR')} €</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">Au dépôt du permis de construire</td>
                                  <td className="p-2 text-right">20%</td>
                                  <td className="p-2 text-right">{(honorairesData.totalTTC * 0.2).toLocaleString('fr-FR')} €</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">À l'ouverture du chantier</td>
                                  <td className="p-2 text-right">30%</td>
                                  <td className="p-2 text-right">{(honorairesData.totalTTC * 0.3).toLocaleString('fr-FR')} €</td>
                                </tr>
                                <tr className="border-b">
                                  <td className="p-2">À la réception des travaux</td>
                                  <td className="p-2 text-right">20%</td>
                                  <td className="p-2 text-right">{(honorairesData.totalTTC * 0.2).toLocaleString('fr-FR')} €</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="border rounded-lg p-4">
                            <h3 className="font-medium mb-4">Conditions générales</h3>
                            <div className="text-sm space-y-2 text-gray-600">
                              <p>Le présent devis est valable pour une durée de 3 mois à compter de sa date d'émission.</p>
                              <p>Les honoraires sont calculés sur la base du montant estimatif des travaux. Ils seront réajustés en fonction du coût réel des travaux à la fin du chantier.</p>
                              <p>Tout dépassement du montant estimatif des travaux supérieur à 10% fera l'objet d'un avenant au contrat.</p>
                              <p>Les délais d'exécution seront précisés dans le contrat de maîtrise d'œuvre.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Simulateur d'honoraires</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-center py-8">
                          <Button 
                            className="flex items-center bg-khaki-600 hover:bg-khaki-700 text-white"
                            onClick={() => {
                              toast({
                                title: "Simulateur",
                                description: "Le simulateur d'honoraires est en cours de développement.",
                              });
                            }}
                          >
                            <Calculator className="h-4 w-4 mr-2" />
                            Lancer le simulateur
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

export default DevisHonoraires;
