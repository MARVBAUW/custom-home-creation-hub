
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  Users, 
  Building, 
  CheckCircle, 
  Pencil, 
  Copy, 
  FileDigit,
  Send
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface ProjectDetail {
  id: string;
  name: string;
  fileNumber: string;
  clientName: string;
  address: string;
  status: 'en-cours' | 'termine' | 'en-attente';
  workAmount: number;
  description: string;
  startDate: string;
  endDate: string;
  phases: {
    name: string;
    status: 'completed' | 'in-progress' | 'pending';
    percentage: number;
  }[];
}

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [isAdminMode, setIsAdminMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const { toast } = useToast();
  const [project, setProject] = useState<ProjectDetail | null>(null);

  useEffect(() => {
    // Simuler le chargement des données du projet
    setTimeout(() => {
      const mockProject: ProjectDetail = {
        id: projectId || '1',
        name: "Villa Méditerranée",
        fileNumber: "2023-105",
        clientName: "Jean Dupont",
        address: "24 Avenue de la Plage, 13008 Marseille",
        status: 'en-cours',
        workAmount: 450000,
        description: "Construction d'une villa contemporaine de 180m² avec piscine et jardin méditerranéen.",
        startDate: "2023-03-15",
        endDate: "2024-06-30",
        phases: [
          { name: "Esquisse / Études préliminaires", status: 'completed', percentage: 100 },
          { name: "Avant-projet sommaire (APS)", status: 'completed', percentage: 100 },
          { name: "Avant-projet définitif (APD)", status: 'in-progress', percentage: 75 },
          { name: "Dossier de permis de construire", status: 'in-progress', percentage: 50 },
          { name: "Études d'exécution (EXE)", status: 'pending', percentage: 0 },
          { name: "Assistance aux contrats de travaux (ACT)", status: 'pending', percentage: 0 },
          { name: "Direction de l'exécution des travaux (DET)", status: 'pending', percentage: 0 },
          { name: "Assistance lors des opérations de réception (AOR)", status: 'pending', percentage: 0 }
        ]
      };
      setProject(mockProject);
    }, 500);
  }, [projectId]);

  // Persistence du mode admin
  useEffect(() => {
    const savedMode = localStorage.getItem('adminMode');
    if (savedMode === 'false') {
      setIsAdminMode(false);
    } else {
      localStorage.setItem('adminMode', 'true');
    }
  }, []);

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

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Modifications enregistrées",
      description: "Les informations du projet ont été mises à jour.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Modifications publiées",
      description: "Les informations du projet sont maintenant visibles par le client.",
    });
  };

  const handleGenerateQuote = () => {
    navigate(`/workspace/client-area/admin/quotes?projectId=${projectId}`);
  };

  const handleSendToClient = () => {
    toast({
      title: "Notification envoyée",
      description: "Le client a été notifié des mises à jour du projet.",
    });
  };

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

  const statusBadgeClass = {
    'en-cours': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'termine': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'en-attente': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
  }[project.status];

  const formattedWorkAmount = new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(project.workAmount);

  const calculateFees = (amount: number): number => {
    // Calcul des honoraires entre 12% et 5% selon le montant des travaux
    if (amount <= 60000) return amount * 0.12;
    if (amount <= 150000) return amount * 0.10;
    if (amount <= 300000) return amount * 0.08;
    if (amount <= 600000) return amount * 0.07;
    if (amount <= 1000000) return amount * 0.06;
    return amount * 0.05;
  };

  const fees = calculateFees(project.workAmount);
  const formattedFees = new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(fees);

  return (
    <>
      <Helmet>
        <title>Détails du projet | Progineer</title>
        <meta name="description" content="Détails et suivi du projet de construction ou rénovation." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900/30 dark:text-khaki-200 text-sm font-medium">
                Détails du projet
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                {project.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-4">
                Dossier #{project.fileNumber}
              </p>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass}`}>
                  {project.status === 'en-cours' ? 'En cours' : 
                   project.status === 'termine' ? 'Terminé' : 'En attente'}
                </span>
                {isAdminMode && (
                  <div className="ml-4 flex items-center">
                    <Label htmlFor="published" className="mr-2 text-sm text-gray-600 dark:text-gray-300">
                      Publié
                    </Label>
                    <Switch
                      id="published"
                      checked={isPublished}
                      onCheckedChange={setIsPublished}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:mt-0 mt-4 flex items-center gap-3">
              {isAdminMode && !isEditing && (
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil className="h-4 w-4" /> Modifier
                </Button>
              )}
              {isAdminMode && isEditing && (
                <Button 
                  className="bg-khaki-600 hover:bg-khaki-700 text-white"
                  onClick={handleSave}
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> Enregistrer
                </Button>
              )}
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
              <Tabs defaultValue="details" className="space-y-6">
                <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1">
                  <TabsTrigger value="details" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
                    <FileText className="h-4 w-4 mr-2" />
                    Informations
                  </TabsTrigger>
                  <TabsTrigger value="progress" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
                    <Calendar className="h-4 w-4 mr-2" />
                    Suivi
                  </TabsTrigger>
                  <TabsTrigger value="budget" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Budget
                  </TabsTrigger>
                  {isAdminMode && (
                    <TabsTrigger value="admin" className="data-[state=active]:bg-khaki-50 dark:data-[state=active]:bg-khaki-900/20">
                      <Users className="h-4 w-4 mr-2" />
                      Administration
                    </TabsTrigger>
                  )}
                </TabsList>
                
                <TabsContent value="details" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Informations générales du projet</CardTitle>
                      <CardDescription>Détails du projet de construction</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="projectName">Nom du projet</Label>
                              <Input id="projectName" defaultValue={project.name} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="fileNumber">Numéro de dossier</Label>
                              <Input id="fileNumber" defaultValue={project.fileNumber} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="clientName">Client</Label>
                              <Input id="clientName" defaultValue={project.clientName} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="address">Adresse</Label>
                              <Input id="address" defaultValue={project.address} />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="workAmount">Montant des travaux (€)</Label>
                              <Input id="workAmount" type="number" defaultValue={project.workAmount} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="startDate">Date de début</Label>
                              <Input id="startDate" type="date" defaultValue={project.startDate} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="endDate">Date de fin prévisionnelle</Label>
                              <Input id="endDate" type="date" defaultValue={project.endDate} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="status">Statut</Label>
                              <Select defaultValue={project.status}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionner un statut" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="en-attente">En attente</SelectItem>
                                  <SelectItem value="en-cours">En cours</SelectItem>
                                  <SelectItem value="termine">Terminé</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="col-span-1 md:col-span-2">
                            <div className="space-y-2">
                              <Label htmlFor="description">Description</Label>
                              <Textarea id="description" rows={4} defaultValue={project.description} />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nom du projet</h3>
                              <p className="mt-1 text-base font-medium">{project.name}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Numéro de dossier</h3>
                              <p className="mt-1">{project.fileNumber}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</h3>
                              <p className="mt-1">{project.clientName}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Adresse</h3>
                              <p className="mt-1">{project.address}</p>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Montant des travaux</h3>
                              <p className="mt-1 font-medium">{formattedWorkAmount}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de début</h3>
                              <p className="mt-1">{new Date(project.startDate).toLocaleDateString('fr-FR')}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de fin prévisionnelle</h3>
                              <p className="mt-1">{new Date(project.endDate).toLocaleDateString('fr-FR')}</p>
                            </div>
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Statut</h3>
                              <p className="mt-1">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadgeClass}`}>
                                  {project.status === 'en-cours' ? 'En cours' : 
                                  project.status === 'termine' ? 'Terminé' : 'En attente'}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="col-span-1 md:col-span-2">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h3>
                              <p className="mt-1">{project.description}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="progress" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Avancement du projet</CardTitle>
                      <CardDescription>Statut des différentes phases</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {project.phases.map((phase, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                {isEditing && isAdminMode ? (
                                  <Checkbox id={`phase-${index}`} checked={phase.status !== 'pending'} />
                                ) : (
                                  <div className={`w-4 h-4 rounded-full mr-2 
                                    ${phase.status === 'completed' ? 'bg-green-500' : 
                                      phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`} 
                                  />
                                )}
                                <Label htmlFor={`phase-${index}`} className="ml-2">{phase.name}</Label>
                              </div>
                              <span className="text-sm font-medium">
                                {phase.percentage}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  phase.status === 'completed' ? 'bg-green-500' : 
                                  phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                                style={{ width: `${phase.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="budget" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Informations budgétaires</CardTitle>
                      <CardDescription>Estimation des honoraires et coûts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Montant des travaux</h3>
                            <p className="mt-1 text-2xl font-semibold">{formattedWorkAmount}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Honoraires totaux</h3>
                            <p className="mt-1 text-2xl font-semibold">{formattedFees}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {(fees / project.workAmount * 100).toFixed(1)}% du montant des travaux
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-medium">Répartition des honoraires par phase</h3>
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm">Esquisse</span>
                                  <span className="text-sm font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fees * 0.1)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">APS</span>
                                  <span className="text-sm font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fees * 0.15)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">APD</span>
                                  <span className="text-sm font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fees * 0.2)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">PC</span>
                                  <span className="text-sm font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fees * 0.05)}</span>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm">EXE</span>
                                  <span className="text-sm font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fees * 0.15)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">ACT</span>
                                  <span className="text-sm font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fees * 0.05)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">DET</span>
                                  <span className="text-sm font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fees * 0.25)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">AOR</span>
                                  <span className="text-sm font-medium">{new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(fees * 0.05)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {isAdminMode && (
                          <div className="flex justify-end space-x-3 pt-4">
                            <Button 
                              variant="outline" 
                              className="flex items-center gap-2"
                              onClick={handleGenerateQuote}
                            >
                              <FileDigit className="h-4 w-4" /> Générer un devis
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {isAdminMode && (
                  <TabsContent value="admin" className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Outils d'administration</CardTitle>
                        <CardDescription>Options réservées aux administrateurs</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <Button 
                              variant="outline" 
                              className="w-full flex items-center justify-center gap-2 h-auto py-6"
                              onClick={handleGenerateQuote}
                            >
                              <FileDigit className="h-5 w-5" /> 
                              <div className="text-left">
                                <div className="font-medium">Générer un devis</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Créer un devis basé sur les montants</div>
                              </div>
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <Button 
                              variant="outline" 
                              className="w-full flex items-center justify-center gap-2 h-auto py-6"
                            >
                              <Building className="h-5 w-5" /> 
                              <div className="text-left">
                                <div className="font-medium">Estimatif détaillé</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Par corps de métier et travaux</div>
                              </div>
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <Button 
                              variant="outline" 
                              className="w-full flex items-center justify-center gap-2 h-auto py-6"
                            >
                              <Copy className="h-5 w-5" /> 
                              <div className="text-left">
                                <div className="font-medium">Générer CCTP</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Cahier des clauses techniques</div>
                              </div>
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <Button 
                              variant="outline" 
                              className="w-full flex items-center justify-center gap-2 h-auto py-6"
                              onClick={handleSendToClient}
                            >
                              <Send className="h-5 w-5" /> 
                              <div className="text-left">
                                <div className="font-medium">Notifier le client</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Envoyer une notification</div>
                              </div>
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-6 space-y-4">
                          <h3 className="font-medium text-sm">Actions de publication</h3>
                          <div className="flex justify-end space-x-3">
                            {!isPublished ? (
                              <Button 
                                onClick={handlePublish}
                                className="bg-khaki-600 hover:bg-khaki-700 text-white"
                              >
                                Publier les modifications
                              </Button>
                            ) : (
                              <Button 
                                onClick={handleSendToClient}
                                className="bg-khaki-600 hover:bg-khaki-700 text-white"
                              >
                                Notifier le client des mises à jour
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProjectDetails;
