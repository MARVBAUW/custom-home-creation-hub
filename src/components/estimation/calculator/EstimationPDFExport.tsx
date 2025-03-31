
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Printer, Mail, Save } from 'lucide-react';
import { FormData } from './types';
import { generateEstimationReport } from './calculationUtils';
import { useToast } from '@/hooks/use-toast';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { formatCurrency } from '@/utils/formatters';
import { sendEstimationEmail } from './services/emailService';
import { useEstimationStorage } from './services/estimationStorageService';
import { useAuth } from '@/hooks/useAuth';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface EstimationPDFExportProps {
  formData: FormData;
  estimationResult: number | null;
  onEmailSent?: () => void;
}

const EstimationPDFExport: React.FC<EstimationPDFExportProps> = ({
  formData,
  estimationResult,
  onEmailSent
}) => {
  const { toast } = useToast();
  const reportRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { saveEstimation } = useEstimationStorage();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  
  const handlePrint = () => {
    if (reportRef.current) {
      window.print();
    }
  };
  
  const handleDownloadPDF = () => {
    if (!estimationResult) {
      toast({
        title: "Erreur",
        description: "Aucune estimation disponible à exporter",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Créer une nouvelle instance de jsPDF
      const doc = new jsPDF();
      
      // Préparer les données du rapport
      const report = generateEstimationReport(formData, estimationResult);
      
      // Ajouter le titre
      doc.setFontSize(20);
      doc.text("Progineer - Rapport d'Estimation", 105, 20, { align: 'center' });
      
      // Ajouter les informations du client
      doc.setFontSize(14);
      doc.text("Informations client", 20, 40);
      doc.setFontSize(12);
      doc.text(`Type de client: ${report.clientInfo.clientType === 'professional' ? 'Professionnel' : 'Particulier'}`, 20, 50);
      doc.text(`Nom: ${report.clientInfo.name}`, 20, 60);
      doc.text(`Email: ${report.clientInfo.email}`, 20, 70);
      doc.text(`Téléphone: ${report.clientInfo.phone}`, 20, 80);
      
      // Ajouter les informations du projet
      doc.setFontSize(14);
      doc.text("Informations projet", 20, 100);
      doc.setFontSize(12);
      doc.text(`Type de projet: ${report.projectInfo.type}`, 20, 110);
      doc.text(`Surface: ${report.projectInfo.surface} m²`, 20, 120);
      doc.text(`Localisation: ${report.projectInfo.location}`, 20, 130);
      
      // Ajouter le résumé de l'estimation
      doc.setFontSize(14);
      doc.text("Estimation", 20, 150);
      doc.setFontSize(12);
      doc.text(`Montant HT: ${formatCurrency(report.estimationDetails.totalHT)}`, 20, 160);
      doc.text(`TVA (20%): ${formatCurrency(report.estimationDetails.vat)}`, 20, 170);
      doc.text(`Montant TTC: ${formatCurrency(report.estimationDetails.totalTTC)}`, 20, 180);
      
      // Ajouter les détails par catégorie avec un tableau
      const tableColumn = ["Catégorie", "Pourcentage", "Montant HT"];
      const tableRows = report.categories.map(category => [
        category.name,
        `${category.percentage}%`,
        formatCurrency(category.amount)
      ]);
      
      // @ts-ignore - Ajout du tableau (jspdf-autotable)
      doc.autoTable({
        startY: 200,
        head: [tableColumn],
        body: tableRows,
      });
      
      // Ajouter l'échéancier de paiement
      if (report.estimationDetails.paymentSchedule) {
        const paymentStartY = doc.lastAutoTable?.finalY || 280;
        
        doc.setFontSize(14);
        doc.text("Échéancier de paiement", 20, paymentStartY + 20);
        
        const paymentTable = report.estimationDetails.paymentSchedule.map(payment => [
          payment.phase,
          `${payment.percentage}%`,
          formatCurrency(payment.amount)
        ]);
        
        // @ts-ignore
        doc.autoTable({
          startY: paymentStartY + 30,
          head: [["Phase", "Pourcentage", "Montant TTC"]],
          body: paymentTable,
        });
      }
      
      // Ajouter la date et le pied de page
      const date = new Date().toLocaleDateString('fr-FR');
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Date: ${date}`, 20, doc.internal.pageSize.height - 10);
        doc.text(`Page ${i} sur ${pageCount}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
        doc.text("Progineer - www.progineer.fr", doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: 'center' });
      }
      
      // Télécharger le PDF
      doc.save(`Estimation_Progineer_${date.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "PDF téléchargé",
        description: "Votre estimation a été téléchargée avec succès",
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer le PDF",
        variant: "destructive"
      });
    }
  };
  
  const handleSendByEmail = async () => {
    const userEmail = formData.email || formData.contactEmail;
    
    if (!estimationResult || !userEmail) {
      toast({
        title: "Erreur",
        description: "Email manquant ou aucune estimation disponible",
        variant: "destructive"
      });
      return;
    }
    
    setIsEmailSending(true);
    
    try {
      const result = await sendEstimationEmail(
        userEmail,
        formData,
        estimationResult
      );
      
      if (result.success) {
        toast({
          title: "Email envoyé",
          description: `L'estimation a été envoyée à ${userEmail}`,
        });
        
        if (onEmailSent) {
          onEmailSent();
        }
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email: " + (error instanceof Error ? error.message : "Erreur inconnue"),
        variant: "destructive"
      });
    } finally {
      setIsEmailSending(false);
    }
  };
  
  const handleSaveEstimation = async () => {
    if (!estimationResult) {
      toast({
        title: "Erreur",
        description: "Aucune estimation disponible à sauvegarder",
        variant: "destructive"
      });
      return;
    }
    
    // Si l'utilisateur n'est pas connecté, afficher le dialogue de connexion
    if (!user) {
      setIsLoginDialogOpen(true);
      return;
    }
    
    setIsSaving(true);
    
    try {
      const estimationId = await saveEstimation(formData, estimationResult);
      
      if (estimationId) {
        toast({
          title: "Estimation sauvegardée",
          description: "Votre estimation a été sauvegardée dans votre compte",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'estimation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'estimation",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLoginForSave = () => {
    // Rediriger vers la page de connexion avec un paramètre de retour
    // pour revenir à l'estimation après la connexion
    navigate(`/auth/login?redirect=/estimations&email=${encodeURIComponent(loginEmail)}`);
    setIsLoginDialogOpen(false);
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="hidden" ref={reportRef}>
        {/* Contenu du rapport qui sera imprimé */}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <Button 
          onClick={handleDownloadPDF} 
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 flex-1"
        >
          <Download className="h-4 w-4" />
          Télécharger en PDF
        </Button>
        
        <Button 
          onClick={handlePrint} 
          variant="outline" 
          className="flex items-center justify-center gap-2 flex-1"
        >
          <Printer className="h-4 w-4" />
          Imprimer
        </Button>
        
        {(formData.email || formData.contactEmail) && (
          <Button 
            onClick={handleSendByEmail} 
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 flex-1"
            disabled={isEmailSending}
          >
            <Mail className="h-4 w-4" />
            {isEmailSending ? 'Envoi en cours...' : 'Envoyer par email'}
          </Button>
        )}
        
        <Button
          onClick={handleSaveEstimation}
          className="flex items-center justify-center gap-2 bg-khaki-600 hover:bg-khaki-700 flex-1"
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder dans mon compte'}
        </Button>
      </div>
      
      {/* Login Dialog */}
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent>
          <DialogTitle>Connexion requise</DialogTitle>
          <DialogDescription>
            Vous devez être connecté pour sauvegarder une estimation. Veuillez vous connecter ou créer un compte.
          </DialogDescription>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="votre@email.com" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLoginDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleLoginForSave}>
              Se connecter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EstimationPDFExport;
