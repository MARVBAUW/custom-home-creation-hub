import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2, Mail, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from '@/utils/formatters';
import { jsPDF } from 'jspdf';
import { sendEstimationByEmail } from '../services/emailService';
import { BaseFormProps } from '../types/formTypes';

const EstimationResults = (props: BaseFormProps) => {
  const { formData, estimationResult, goToPreviousStep, isLoading } = props;
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("summary");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailAddress, setEmailAddress] = useState(formData.email || "");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Handle email sending
  const handleSendEmail = async () => {
    if (!emailAddress || !emailAddress.includes('@')) {
      toast({
        title: "Email invalide",
        description: "Veuillez entrer une adresse email valide.",
        variant: "destructive",
      });
      return;
    }

    setIsSendingEmail(true);
    try {
      const result = await sendEstimationByEmail(emailAddress, formData, 
        typeof estimationResult === 'number' ? {
          totalAmount: estimationResult,
          constructionCosts: {
            structuralWork: estimationResult * 0.3,
            finishingWork: estimationResult * 0.3,
            technicalLots: estimationResult * 0.2,
            externalWorks: estimationResult * 0.1,
            total: estimationResult * 0.9
          },
          fees: {
            architectFees: estimationResult * 0.05,
            engineeringFees: estimationResult * 0.025,
            officialFees: estimationResult * 0.015,
            inspectionFees: estimationResult * 0.01,
            total: estimationResult * 0.1
          },
          otherCosts: {
            insurance: estimationResult * 0.02,
            contingency: estimationResult * 0.02,
            taxes: estimationResult * 0.005,
            miscellaneous: estimationResult * 0.005,
            total: estimationResult * 0.05
          },
          timeline: {
            design: 2,
            permits: 3,
            bidding: 1,
            construction: 12,
            total: 18
          }
        } : estimationResult
      );
      
      if (result.success) {
        toast({
          title: "Email envoyé",
          description: "L'estimation a été envoyée à votre adresse email.",
        });
        setShowEmailForm(false);
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email.",
        variant: "destructive",
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Handle share functionality
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: "Estimation de projet Progineer",
        text: `Mon estimation de projet: ${formatCurrency(typeof estimationResult === 'number' ? estimationResult : estimationResult?.totalAmount || 0)}`,
        url: window.location.href,
      }).catch((error) => console.log("Error sharing", error));
    } else {
      setShowEmailForm(true);
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
      ['Type de terrain', formData.terrainType || 'Non spécifié'],
      ['Complexité', formData.complexity || 'Standard'],
      ['Standard de qualité', formData.qualityStandard || 'Standard']
    ];
    
    doc.autoTable({
      startY: 35,
      head: [['Caractéristique', 'Valeur']],
      body: projectInfo,
    });
    
    // Add cost breakdown
    doc.setFontSize(14);
    doc.text('Coûts estimés', 14, (doc as any).autoTable.previous.finalY + 10);
    
    const totalAmount = typeof estimationResult === 'number' ? estimationResult : (estimationResult?.totalAmount || 0);
    
    const costBreakdown = [
      ['Gros œuvre', formatCurrency(totalAmount * 0.3)],
      ['Second œuvre', formatCurrency(totalAmount * 0.3)],
      ['Lots techniques', formatCurrency(totalAmount * 0.2)],
      ['Aménagements extérieurs', formatCurrency(totalAmount * 0.1)],
      ['Honoraires et études', formatCurrency(totalAmount * 0.1)],
      ['TOTAL', formatCurrency(totalAmount)],
    ];
    
    doc.autoTable({
      startY: (doc as any).autoTable.previous.finalY + 15,
      head: [['Poste de dépense', 'Montant estimé (€)']],
      body: costBreakdown,
    });
    
    // Add timeline
    doc.setFontSize(14);
    doc.text('Calendrier prévisionnel', 14, (doc as any).autoTable.previous.finalY + 10);
    
    const timelineData = [
      ['Conception et études', '2 mois'],
      ['Autorisations administratives', '3 mois'],
      ['Consultation des entreprises', '1 mois'],
      ['Travaux', '12 mois'],
      ['Durée totale', '18 mois'],
    ];
    
    doc.autoTable({
      startY: (doc as any).autoTable.previous.finalY + 15,
      head: [['Phase', 'Durée estimée']],
      body: timelineData,
    });
    
    // Add footer with disclaimer
    const pageCount = (doc as any).internal.getNumberOfPages();
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600 mb-4"></div>
        <p className="text-gray-600">Calcul de l'estimation en cours...</p>
      </div>
    );
  }

  const totalAmount = typeof estimationResult === 'number' ? estimationResult : (estimationResult?.totalAmount || 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={goToPreviousStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShareClick}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Partager
          </Button>
        </div>
      </div>

      <Card className="bg-khaki-50 border-khaki-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-khaki-800">Estimation totale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-khaki-900">
            {formatCurrency(totalAmount)}
          </div>
          <p className="text-sm text-khaki-600 mt-1">
            TVA incluse • Honoraires inclus • Frais annexes inclus
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="breakdown" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="breakdown">Répartition des coûts</TabsTrigger>
          <TabsTrigger value="timeline">Calendrier</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Gros œuvre</span>
                  <span>{formatCurrency(totalAmount * 0.3)}</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Second œuvre</span>
                  <span>{formatCurrency(totalAmount * 0.3)}</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Lots techniques</span>
                  <span>{formatCurrency(totalAmount * 0.2)}</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Aménagements extérieurs</span>
                  <span>{formatCurrency(totalAmount * 0.1)}</span>
                </li>
                <li className="flex justify-between items-center pb-2 border-b">
                  <span className="font-medium">Honoraires et études</span>
                  <span>{formatCurrency(totalAmount * 0.1)}</span>
                </li>
                <li className="flex justify-between items-center pt-2 font-bold">
                  <span>TOTAL</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="pt-4">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Conception et études</span>
                    <span>2 mois</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '11%' }}></div>
                  </div>
                </li>
                <li className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Autorisations administratives</span>
                    <span>3 mois</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                  </div>
                </li>
                <li className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Consultation des entreprises</span>
                    <span>1 mois</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '6%' }}></div>
                  </div>
                </li>
                <li className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Travaux</span>
                    <span>12 mois</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '66%' }}></div>
                  </div>
                </li>
                <li className="pt-4 border-t mt-4">
                  <div className="flex justify-between items-center font-bold">
                    <span>Durée totale estimée</span>
                    <span>18 mois</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => setShowEmailForm(true)}
        >
          <Mail className="mr-2 h-4 w-4" />
          Recevoir par email
        </Button>
        
        <Button 
          className="w-full" 
          onClick={handleDownloadPDF}
        >
          <Download className="mr-2 h-4 w-4" />
          Télécharger en PDF
        </Button>
      </div>

      {showEmailForm && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Recevoir par email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 border rounded"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowEmailForm(false)}
                >
                  Annuler
                </Button>
                <Button 
                  onClick={handleSendEmail} 
                  disabled={isSendingEmail}
                >
                  {isSendingEmail ? "Envoi..." : "Envoyer"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EstimationResults;
