
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Send, Download, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { sendEstimationByEmail } from './services/emailService';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormData, EstimationResponseData } from './types';
import { formatCurrency } from '@/utils/formatters';

interface EstimationResultProps {
  estimationResult: EstimationResponseData;
  formData: FormData;
  onBack: () => void;
}

const EstimationResult: React.FC<EstimationResultProps> = ({ estimationResult, formData, onBack }) => {
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Handle email share
  const handleShareByEmail = async () => {
    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    try {
      const result = await sendEstimationByEmail(email, formData, estimationResult);
      
      if (result.success) {
        toast({
          title: "Estimation envoyée",
          description: result.message,
        });
        setShowShareDialog(false);
      } else {
        toast({
          title: "Erreur",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'envoi de l'email.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Estimation de votre projet', 105, 15, { align: 'center' });
    
    // Add project info
    doc.setFontSize(14);
    doc.text('Informations du projet', 14, 30);
    
    // Create a table with project details
    const projectInfo = [
      ['Type de projet', formData.projectType || 'Non spécifié'],
      ['Surface', `${formData.surface || 0} m²`],
      ['Ville', formData.city || 'Non spécifiée'],
    ];
    
    doc.autoTable({
      startY: 35,
      head: [['Caractéristique', 'Valeur']],
      body: projectInfo,
    });
    
    // Add cost breakdown
    doc.setFontSize(14);
    doc.text('Coûts estimés', 14, doc.autoTable.previous.finalY + 10);
    
    const costBreakdown = [
      ['Gros œuvre', formatCurrency(estimationResult.constructionCosts.structuralWork)],
      ['Second œuvre', formatCurrency(estimationResult.constructionCosts.finishingWork)],
      ['Lots techniques', formatCurrency(estimationResult.constructionCosts.technicalLots)],
      ['Aménagements extérieurs', formatCurrency(estimationResult.constructionCosts.externalWorks)],
      ['Honoraires et études', formatCurrency(estimationResult.fees.total)],
      ['Autres frais', formatCurrency(estimationResult.otherCosts.total)],
      ['TOTAL', formatCurrency(estimationResult.totalAmount)],
    ];
    
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      head: [['Poste de dépense', 'Montant estimé (€)']],
      body: costBreakdown,
    });
    
    // Add timeline
    doc.setFontSize(14);
    doc.text('Calendrier prévisionnel', 14, doc.autoTable.previous.finalY + 10);
    
    const timelineData = [
      ['Conception et études', `${estimationResult.timeline.design} mois`],
      ['Autorisations administratives', `${estimationResult.timeline.permits} mois`],
      ['Consultation des entreprises', `${estimationResult.timeline.bidding} mois`],
      ['Travaux', `${estimationResult.timeline.construction} mois`],
      ['Durée totale', `${estimationResult.timeline.total} mois`],
    ];
    
    doc.autoTable({
      startY: doc.autoTable.previous.finalY + 15,
      head: [['Phase', 'Durée estimée']],
      body: timelineData,
    });
    
    // Add footer with disclaimer
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text('Cette estimation est fournie à titre indicatif et peut varier en fonction des détails spécifiques du projet.', 105, 285, {
        align: 'center'
      });
    }
    
    // Save the PDF
    doc.save('estimation-projet.pdf');
    
    toast({
      title: "PDF téléchargé",
      description: "L'estimation a été téléchargée avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 mb-4"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l'estimation
      </Button>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">Estimation totale</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {formatCurrency(estimationResult.totalAmount)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Cette estimation inclut tous les coûts de construction, honoraires et frais annexes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-lg">Construction</h4>
                <p className="text-xl font-semibold mt-1">{formatCurrency(estimationResult.constructionCosts.total)}</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Gros œuvre</span>
                    <span>{formatCurrency(estimationResult.constructionCosts.structuralWork)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Second œuvre</span>
                    <span>{formatCurrency(estimationResult.constructionCosts.finishingWork)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lots techniques</span>
                    <span>{formatCurrency(estimationResult.constructionCosts.technicalLots)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Extérieurs</span>
                    <span>{formatCurrency(estimationResult.constructionCosts.externalWorks)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-lg">Honoraires</h4>
                <p className="text-xl font-semibold mt-1">{formatCurrency(estimationResult.fees.total)}</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Architecte</span>
                    <span>{formatCurrency(estimationResult.fees.architectFees)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Bureau d'études</span>
                    <span>{formatCurrency(estimationResult.fees.engineeringFees)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Frais administratifs</span>
                    <span>{formatCurrency(estimationResult.fees.officialFees)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Contrôle technique</span>
                    <span>{formatCurrency(estimationResult.fees.inspectionFees)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-lg">Autres frais</h4>
                <p className="text-xl font-semibold mt-1">{formatCurrency(estimationResult.otherCosts.total)}</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Assurances</span>
                    <span>{formatCurrency(estimationResult.otherCosts.insurance)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Imprévus</span>
                    <span>{formatCurrency(estimationResult.otherCosts.contingency)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Taxes</span>
                    <span>{formatCurrency(estimationResult.otherCosts.taxes)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Divers</span>
                    <span>{formatCurrency(estimationResult.otherCosts.miscellaneous)}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">Calendrier prévisionnel</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Durée totale estimée:</span>
                  <span className="font-semibold">{estimationResult.timeline.total} mois</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Conception et études</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 h-4 rounded-full" style={{ width: `${estimationResult.timeline.design * 10}px` }}></div>
                      <span>{estimationResult.timeline.design} mois</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Autorisations</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-100 h-4 rounded-full" style={{ width: `${estimationResult.timeline.permits * 10}px` }}></div>
                      <span>{estimationResult.timeline.permits} mois</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Consultation entreprises</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 h-4 rounded-full" style={{ width: `${estimationResult.timeline.bidding * 10}px` }}></div>
                      <span>{estimationResult.timeline.bidding} mois</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Travaux</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 h-4 rounded-full" style={{ width: `${estimationResult.timeline.construction * 10}px` }}></div>
                      <span>{estimationResult.timeline.construction} mois</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 pt-2">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowShareDialog(true)}
              >
                <Share2 className="h-4 w-4" />
                Partager par email
              </Button>
              
              <Button 
                className="flex items-center gap-2"
                onClick={handleDownloadPDF}
              >
                <Download className="h-4 w-4" />
                Télécharger en PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Partager l'estimation par email</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSending}
              onClick={handleShareByEmail}
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isSending ? 'Envoi en cours...' : 'Envoyer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EstimationResult;
