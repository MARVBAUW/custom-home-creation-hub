
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Container from '@/components/common/Container';
import ClientNavigation from '@/components/client/ClientNavigation';
import AdminSwitch from '@/components/client/AdminSwitch';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { FileDigit, FileText, Send, Download, Printer, RefreshCw } from 'lucide-react';

interface ProjectData {
  id: string;
  name: string;
  fileNumber: string;
  clientName: string;
  workAmount: number;
}

interface QuotePhase {
  id: string;
  name: string;
  percentage: number;
  amount: number;
}

const AdminQuotes = () => {
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('projectId');
  const navigate = useNavigate();
  const [isAdminMode, setIsAdminMode] = useState(true);
  const { toast } = useToast();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [workAmount, setWorkAmount] = useState<number>(0);
  const [feePercentage, setFeePercentage] = useState<number>(8);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [phases, setPhases] = useState<QuotePhase[]>([
    { id: '1', name: 'Esquisse / Études préliminaires', percentage: 10, amount: 0 },
    { id: '2', name: 'Avant-projet sommaire (APS)', percentage: 15, amount: 0 },
    { id: '3', name: 'Avant-projet définitif (APD)', percentage: 20, amount: 0 },
    { id: '4', name: 'Dossier de permis de construire', percentage: 5, amount: 0 },
    { id: '5', name: 'Études d\'exécution (EXE)', percentage: 15, amount: 0 },
    { id: '6', name: 'Assistance aux contrats de travaux (ACT)', percentage: 5, amount: 0 },
    { id: '7', name: 'Direction de l\'exécution des travaux (DET)', percentage: 25, amount: 0 },
    { id: '8', name: 'Assistance lors des opérations de réception (AOR)', percentage: 5, amount: 0 }
  ]);

  useEffect(() => {
    if (projectId) {
      // Simuler le chargement des données du projet
      setTimeout(() => {
        const mockProject = {
          id: projectId,
          name: "Villa Méditerranée",
          fileNumber: "2023-105",
          clientName: "Jean Dupont",
          workAmount: 450000
        };
        setProject(mockProject);
        setWorkAmount(mockProject.workAmount);
        
        // Calculer le pourcentage d'honoraires en fonction du montant des travaux
        const calculatedPercentage = calculateFeePercentage(mockProject.workAmount);
        setFeePercentage(calculatedPercentage);
        
        const calculatedFees = mockProject.workAmount * (calculatedPercentage / 100);
        setTotalFees(calculatedFees);
        
        // Mettre à jour les montants des phases
        updatePhaseAmounts(calculatedFees);
      }, 500);
    }
  }, [projectId]);

  // Fonction pour calculer le pourcentage d'honoraires en fonction du montant des travaux
  const calculateFeePercentage = (amount: number): number => {
    if (amount <= 60000) return 12;
    if (amount <= 150000) return 10;
    if (amount <= 300000) return 8;
    if (amount <= 600000) return 7;
    if (amount <= 1000000) return 6;
    return 5;
  };

  // Mettre à jour les montants des phases lorsque le total change
  const updatePhaseAmounts = (total: number) => {
    setPhases(prevPhases => 
      prevPhases.map(phase => ({
        ...phase,
        amount: Math.round(total * (phase.percentage / 100))
      }))
    );
  };

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
        ? "Vous pouvez maintenant gérer les devis." 
        : "Vous voyez maintenant l'interface client standard.",
    });
  };

  // Gérer le changement de montant des travaux
  const handleWorkAmountChange = (value: string) => {
    const amount = parseFloat(value) || 0;
    setWorkAmount(amount);
    
    // Recalculer le pourcentage et le total des honoraires
    const percentage = calculateFeePercentage(amount);
    setFeePercentage(percentage);
    
    const fees = amount * (percentage / 100);
    setTotalFees(fees);
    
    // Mettre à jour les montants des phases
    updatePhaseAmounts(fees);
  };

  // Gérer le changement de pourcentage des honoraires
  const handleFeePercentageChange = (value: string) => {
    const percentage = parseFloat(value) || 0;
    setFeePercentage(percentage);
    
    const fees = workAmount * (percentage / 100);
    setTotalFees(fees);
    
    // Mettre à jour les montants des phases
    updatePhaseAmounts(fees);
  };

  // Gérer le changement de pourcentage d'une phase
  const handlePhasePercentageChange = (id: string, value: string) => {
    const percentage = parseFloat(value) || 0;
    
    // Mettre à jour le pourcentage de la phase
    setPhases(prevPhases => 
      prevPhases.map(phase => 
        phase.id === id 
          ? { ...phase, percentage, amount: Math.round(totalFees * (percentage / 100)) }
          : phase
      )
    );
  };

  const handleSaveQuote = () => {
    toast({
      title: "Devis enregistré",
      description: "Le devis a été enregistré avec succès.",
    });
  };

  const handleSendToClient = () => {
    toast({
      title: "Devis envoyé",
      description: "Le devis a été envoyé au client avec succès.",
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (!project) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

  // Vérifier que les pourcentages des phases totalisent 100%
  const totalPercentage = phases.reduce((sum, phase) => sum + phase.percentage, 0);
  const isPercentageValid = Math.abs(totalPercentage - 100) < 0.01; // Tolérance pour les erreurs d'arrondi

  return (
    <>
      <Helmet>
        <title>Génération de devis | Progineer</title>
        <meta name="description" content="Générer et gérer les devis pour les projets." />
      </Helmet>

      <section className="pt-32 pb-16 bg-gradient-to-b from-khaki-50 to-white dark:from-gray-900 dark:to-gray-950">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-khaki-100 text-khaki-800 dark:bg-khaki-900/30 dark:text-khaki-200 text-sm font-medium">
                Gestion des devis
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-900 dark:text-white">
                Génération de devis
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-4">
                {project.name} - Dossier #{project.fileNumber}
              </p>
            </div>
            
            <div className="md:mt-0 mt-4 flex items-center gap-3">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleGoBack}
              >
                Retour
              </Button>
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
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <FileDigit className="h-5 w-5 mr-2" /> 
                      Paramètres du devis
                    </CardTitle>
                    <CardDescription>Définir les détails du devis pour {project.clientName}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="workAmount">Montant des travaux (€)</Label>
                        <Input 
                          id="workAmount" 
                          type="number" 
                          value={workAmount} 
                          onChange={(e) => handleWorkAmountChange(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="feePercentage">Pourcentage d'honoraires (%)</Label>
                        <Input 
                          id="feePercentage" 
                          type="number" 
                          value={feePercentage}
                          step="0.1"
                          onChange={(e) => handleFeePercentageChange(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="totalFees">Montant total des honoraires</Label>
                        <Input 
                          id="totalFees" 
                          type="text" 
                          value={formatCurrency(totalFees)}
                          readOnly
                          className="bg-gray-50 dark:bg-gray-800"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-4">Répartition par phase</h3>
                      
                      {!isPercentageValid && (
                        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md text-amber-800 dark:text-amber-300">
                          <div className="flex items-center">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            <p>Attention: La somme des pourcentages doit être égale à 100% (actuellement {totalPercentage.toFixed(1)}%)</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[40%]">Phase</TableHead>
                              <TableHead className="w-[20%]">Pourcentage (%)</TableHead>
                              <TableHead className="w-[20%] text-right">Montant (€)</TableHead>
                              <TableHead className="w-[20%] text-right">TVA (20%)</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {phases.map((phase) => (
                              <TableRow key={phase.id}>
                                <TableCell className="font-medium">{phase.name}</TableCell>
                                <TableCell>
                                  <Input 
                                    type="number" 
                                    value={phase.percentage}
                                    step="0.1"
                                    min="0"
                                    max="100"
                                    onChange={(e) => handlePhasePercentageChange(phase.id, e.target.value)}
                                    className="w-20 h-8"
                                  />
                                </TableCell>
                                <TableCell className="text-right">{formatCurrency(phase.amount)}</TableCell>
                                <TableCell className="text-right">{formatCurrency(phase.amount * 0.2)}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="bg-muted/40">
                              <TableCell className="font-bold">Total</TableCell>
                              <TableCell className={!isPercentageValid ? 'text-red-500 font-bold' : 'font-bold'}>
                                {totalPercentage.toFixed(1)}%
                              </TableCell>
                              <TableCell className="text-right font-bold">{formatCurrency(totalFees)}</TableCell>
                              <TableCell className="text-right font-bold">{formatCurrency(totalFees * 0.2)}</TableCell>
                            </TableRow>
                            <TableRow className="bg-muted/60">
                              <TableCell className="font-bold">Total TTC</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell className="text-right font-bold">{formatCurrency(totalFees * 1.2)}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-6">
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                      >
                        <Printer className="h-4 w-4" /> Imprimer
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" /> Télécharger PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={handleSaveQuote}
                      >
                        <FileText className="h-4 w-4" /> Enregistrer
                      </Button>
                      <Button 
                        className="bg-khaki-600 hover:bg-khaki-700 text-white flex items-center gap-2"
                        onClick={handleSendToClient}
                      >
                        <Send className="h-4 w-4" /> Envoyer au client
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Aperçu du devis</CardTitle>
                    <CardDescription>Prévisualisation du devis tel qu'il sera envoyé au client</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-md p-6 space-y-6 bg-white dark:bg-gray-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold">PROGINEER</h2>
                          <p className="text-sm">24 Travers Chante Perdrix</p>
                          <p className="text-sm">13010 Marseille</p>
                          <p className="text-sm">SIRET: XXXXX</p>
                        </div>
                        <div className="text-right">
                          <h3 className="text-lg font-bold text-khaki-700 dark:text-khaki-300">DEVIS</h3>
                          <p className="text-sm">Devis N°: {project.fileNumber}-D001</p>
                          <p className="text-sm">Date: {new Date().toLocaleDateString('fr-FR')}</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-b py-4 my-6">
                        <h3 className="font-medium mb-2">CLIENT</h3>
                        <p>{project.clientName}</p>
                        <p>Adresse du client</p>
                        <p>Email: client@example.com</p>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-4">PROJET: {project.name}</h3>
                        <p className="mb-4">Montant estimé des travaux: {formatCurrency(workAmount)}</p>
                        
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100 dark:bg-gray-700">
                              <th className="border p-2 text-left">Désignation</th>
                              <th className="border p-2 text-right">Montant HT</th>
                              <th className="border p-2 text-right">TVA (20%)</th>
                              <th className="border p-2 text-right">Montant TTC</th>
                            </tr>
                          </thead>
                          <tbody>
                            {phases.map((phase) => (
                              <tr key={phase.id} className="border-b">
                                <td className="border p-2">{phase.name}</td>
                                <td className="border p-2 text-right">{formatCurrency(phase.amount)}</td>
                                <td className="border p-2 text-right">{formatCurrency(phase.amount * 0.2)}</td>
                                <td className="border p-2 text-right">{formatCurrency(phase.amount * 1.2)}</td>
                              </tr>
                            ))}
                            <tr className="font-bold">
                              <td className="border p-2">TOTAL</td>
                              <td className="border p-2 text-right">{formatCurrency(totalFees)}</td>
                              <td className="border p-2 text-right">{formatCurrency(totalFees * 0.2)}</td>
                              <td className="border p-2 text-right">{formatCurrency(totalFees * 1.2)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-8 space-y-4 text-sm">
                        <h3 className="font-medium">CONDITIONS DE PAIEMENT</h3>
                        <p>Acompte de 30% à la signature, puis facturation à l'achèvement de chaque phase.</p>
                        <p>Délai de paiement: 30 jours à compter de la date de facturation.</p>
                        <p>Validité du devis: 30 jours à compter de la date d'émission.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AdminQuotes;
