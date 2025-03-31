
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FormData, EstimationResponseData } from './types';
import { formatCurrency } from '@/utils/formatters';
import EstimationPDFExport from './EstimationPDFExport';
import EstimationBreakdown from './EstimationBreakdown';
import EstimationTimeline from './EstimationTimeline';
import { useEstimationStorage } from './services/estimationStorageService';

interface EstimationResultProps {
  formData: FormData;
  estimation: EstimationResponseData | null;
  onBack: () => void;
}

const EstimationResult: React.FC<EstimationResultProps> = ({ formData, estimation, onBack }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { saveEstimation } = useEstimationStorage();

  if (!estimation) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune estimation disponible. Veuillez remplir le formulaire.</p>
        <Button onClick={onBack} className="mt-4">Retour au formulaire</Button>
      </div>
    );
  }

  const handleSaveEstimation = async () => {
    try {
      setIsSaving(true);
      
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Connexion requise",
          description: "Vous devez être connecté pour enregistrer une estimation.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }
      
      // Save the estimation using the service
      const estimationId = await saveEstimation(formData, estimation.totalAmount);
      
      if (estimationId) {
        toast({
          title: "Estimation enregistrée",
          description: "Votre estimation a été sauvegardée avec succès dans votre espace client.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'estimation:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder l'estimation.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendEmail = async () => {
    try {
      setIsSending(true);
      
      // Assuming the user has entered an email in the form
      const recipientEmail = formData.email;
      
      if (!recipientEmail) {
        toast({
          title: "Email requis",
          description: "Veuillez fournir une adresse email pour recevoir l'estimation.",
          variant: "destructive",
        });
        setIsSending(false);
        return;
      }
      
      // Create HTML content for the email
      const html = createEmailHtml(formData, estimation);
      
      // Send email using the Edge function
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-estimation-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          to: recipientEmail,
          subject: `Votre estimation de projet - Progineer`,
          html: html,
          cc: "progineer.moe@gmail.com",
          formData: JSON.stringify(formData),
          estimationAmount: estimation.totalAmount
        }),
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      
      toast({
        title: "Email envoyé",
        description: `L'estimation a été envoyée à ${recipientEmail}`,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const createEmailHtml = (formData: FormData, estimation: EstimationResponseData): string => {
    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; padding: 20px 0; }
            .logo { max-width: 150px; }
            h1 { color: #58503a; }
            .section { margin: 20px 0; padding: 15px; background-color: #f8f8f5; border-radius: 5px; }
            .section h2 { color: #58503a; margin-top: 0; }
            table { width: 100%; border-collapse: collapse; }
            table th, table td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            table th { background-color: #58503a; color: white; }
            .footer { text-align: center; font-size: 12px; color: #777; margin-top: 30px; }
            .btn { display: inline-block; background-color: #58503a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://progineer.fr/wp-content/uploads/2023/10/logo-progineer.png" alt="Progineer Logo" class="logo">
              <h1>Votre estimation de projet</h1>
            </div>
            
            <p>Bonjour,</p>
            <p>Nous vous remercions d'avoir utilisé notre outil d'estimation de projet. Veuillez trouver ci-dessous les détails de votre estimation :</p>
            
            <div class="section">
              <h2>Détails du projet</h2>
              <table>
                <tr><td><strong>Type de projet</strong></td><td>${formData.projectType || 'Non spécifié'}</td></tr>
                <tr><td><strong>Surface</strong></td><td>${formData.surface || 0} m²</td></tr>
                <tr><td><strong>Ville</strong></td><td>${formData.city || 'Non spécifiée'}</td></tr>
                <tr><td><strong>Type de terrain</strong></td><td>${formData.landType || 'Non spécifié'}</td></tr>
                <tr><td><strong>Complexité</strong></td><td>${formData.complexity || 'Standard'}</td></tr>
                <tr><td><strong>Standard de qualité</strong></td><td>${formData.qualityStandard || 'Standard'}</td></tr>
              </table>
            </div>
            
            <div class="section">
              <h2>Résultats de l'estimation</h2>
              <table>
                <tr><th>Poste de dépense</th><th>Montant estimé (€)</th></tr>
                <tr><td>Gros œuvre</td><td>${formatCurrency(estimation.constructionCosts.structuralWork)}</td></tr>
                <tr><td>Second œuvre</td><td>${formatCurrency(estimation.constructionCosts.finishingWork)}</td></tr>
                <tr><td>Lots techniques</td><td>${formatCurrency(estimation.constructionCosts.technicalLots)}</td></tr>
                <tr><td>Aménagements extérieurs</td><td>${formatCurrency(estimation.constructionCosts.externalWorks)}</td></tr>
                <tr><td>Honoraires et études</td><td>${formatCurrency(estimation.fees.total)}</td></tr>
                <tr><td>Autres frais</td><td>${formatCurrency(estimation.otherCosts.total)}</td></tr>
                <tr style="font-weight: bold;"><td>TOTAL GLOBAL</td><td>${formatCurrency(estimation.totalAmount)}</td></tr>
              </table>
            </div>
            
            <div class="section">
              <h2>Calendrier prévisionnel</h2>
              <table>
                <tr><th>Phase</th><th>Durée estimée</th></tr>
                <tr><td>Conception et études</td><td>${estimation.timeline.design} mois</td></tr>
                <tr><td>Autorisations administratives</td><td>${estimation.timeline.permits} mois</td></tr>
                <tr><td>Consultation des entreprises</td><td>${estimation.timeline.bidding} mois</td></tr>
                <tr><td>Travaux</td><td>${estimation.timeline.construction} mois</td></tr>
                <tr style="font-weight: bold;"><td>DURÉE TOTALE</td><td>${estimation.timeline.total} mois</td></tr>
              </table>
            </div>
            
            <p>Cette estimation est fournie à titre indicatif et peut varier selon les spécificités de votre projet. Pour une évaluation plus précise, n'hésitez pas à nous contacter.</p>
            
            <p style="text-align: center; margin: 30px 0;">
              <a href="https://progineer.fr/contact" class="btn">Demander un devis personnalisé</a>
            </p>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Progineer. Tous droits réservés.</p>
              <p>Pour toute question, contactez-nous à progineer.moe@gmail.com ou au +33 4 84 61 52 88.</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Modifier les données
            </Button>
            <h2 className="text-2xl font-semibold text-center">Résultats de l'estimation</h2>
          </div>
          
          <div className="bg-khaki-50 p-4 rounded-lg text-center">
            <p className="text-lg text-gray-600">Coût total estimé du projet</p>
            <p className="text-3xl font-bold text-khaki-900">{formatCurrency(estimation.totalAmount)}</p>
            <p className="text-sm text-gray-500 mt-2">Cette estimation est donnée à titre indicatif et peut varier selon les spécificités de votre projet.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <EstimationBreakdown estimation={estimation} />
            </div>
            <div className="col-span-1">
              <EstimationTimeline timeline={estimation.timeline} />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <Button 
              onClick={handleSaveEstimation} 
              variant="outline" 
              className="flex-1"
              disabled={isSaving}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Sauvegarde en cours..." : "Sauvegarder l'estimation"}
            </Button>
            
            <Button 
              onClick={handleSendEmail} 
              variant="outline" 
              className="flex-1"
              disabled={isSending}
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSending ? "Envoi en cours..." : "Recevoir par email"}
            </Button>
            
            <div className="flex-1">
              <EstimationPDFExport formData={formData} estimation={estimation} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationResult;
