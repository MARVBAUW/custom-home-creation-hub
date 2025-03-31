import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Save, Mail, Download } from 'lucide-react';
import { FormData, EstimationResponseData } from '../types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/utils/formatters';
import { calculateEstimation } from '../calculationUtils';
import { useEstimationStorage } from '../services/estimationStorageService';
import { useAuth } from '@/hooks/useAuth';
import EstimationPDFExport from '../EstimationPDFExport';

interface EstimationResultsProps {
  estimation: EstimationResponseData | number;
  formData: FormData;
  onBack?: () => void;
  goToPreviousStep?: () => void;
  updateFormData?: (data: Partial<FormData>) => void;
  goToNextStep?: () => void;
  isLoading?: boolean;
}

const EstimationResults: React.FC<EstimationResultsProps> = ({ 
  estimation: initialEstimation, 
  formData, 
  onBack, 
  goToPreviousStep, 
  updateFormData, 
  goToNextStep, 
  isLoading 
}) => {
  // Ensure estimation is the correct type
  const [estimation, setEstimation] = useState<EstimationResponseData>(
    typeof initialEstimation === 'number' 
      ? calculateEstimation(formData) 
      : initialEstimation
  );
  
  const [isSending, setIsSending] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { saveEstimation } = useEstimationStorage();
  const { user } = useAuth();

  // Recalculate on form data change
  useEffect(() => {
    if (typeof initialEstimation === 'number') {
      setEstimation(calculateEstimation(formData));
    } else {
      setEstimation(initialEstimation);
    }
  }, [formData, initialEstimation]);

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (goToPreviousStep) {
      goToPreviousStep();
    }
  };

  const handleSaveEstimation = async () => {
    try {
      setIsSaving(true);
      
      // Check if user is logged in
      if (!user) {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleGoBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Modifier les données
        </Button>
        <h2 className="text-2xl font-semibold">Résultats de l'estimation</h2>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="bg-khaki-50 p-4 rounded-lg text-center mb-6">
            <p className="text-lg text-gray-600">Coût total estimé du projet</p>
            <p className="text-3xl font-bold text-khaki-900">{formatCurrency(estimation.totalAmount)}</p>
            <p className="text-sm text-gray-500 mt-2">Cette estimation est donnée à titre indicatif et peut varier selon les spécificités de votre projet.</p>
          </div>
          
          <Tabs defaultValue="breakdown">
            <TabsList className="mb-4">
              <TabsTrigger value="breakdown">Détail des coûts</TabsTrigger>
              <TabsTrigger value="timeline">Planning prévisionnel</TabsTrigger>
              <TabsTrigger value="assumptions">Hypothèses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="breakdown">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Coûts de construction</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Gros œuvre</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.structuralWork)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Second œuvre</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.finishingWork)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Lots techniques</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.technicalLots)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Aménagements extérieurs</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.externalWorks)}</td>
                      </tr>
                      <tr className="font-medium">
                        <td className="py-2">Sous-total construction</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Honoraires et études</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Architecte et maîtrise d'œuvre</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.fees.architect)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Bureau d'études techniques</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.fees.technicalStudies)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Autres honoraires</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.fees.other)}</td>
                      </tr>
                      <tr className="font-medium">
                        <td className="py-2">Sous-total honoraires</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.fees.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Autres frais</h3>
                  <table className="w-full">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Assurances</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.otherCosts.insurance)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Taxes et raccordements</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.otherCosts.taxes)}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Divers et imprévus</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.otherCosts.contingency)}</td>
                      </tr>
                      <tr className="font-medium">
                        <td className="py-2">Sous-total autres frais</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.otherCosts.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="pt-4 border-t-2 border-khaki-200">
                  <table className="w-full">
                    <tbody>
                      <tr className="font-bold text-lg">
                        <td className="py-2">TOTAL GLOBAL</td>
                        <td className="py-2 text-right">{formatCurrency(estimation.totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <div>
                <h3 className="text-lg font-medium mb-4">Planning prévisionnel du projet</h3>
                
                <div className="space-y-4">
                  <div className="relative pt-6">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-khaki-200"></div>
                    {Object.entries(estimation.timeline)
                      .filter(([key]) => key !== 'total')
                      .map(([phase, duration], index) => (
                        <div key={phase} className="ml-12 relative mb-6">
                          <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center">
                            {index + 1}
                          </div>
                          <h4 className="font-medium">
                            {phase === 'design' ? 'Conception et études' :
                            phase === 'permits' ? 'Autorisations administratives' :
                            phase === 'bidding' ? 'Consultation des entreprises' :
                            phase === 'construction' ? 'Travaux' : phase}
                          </h4>
                          <p className="text-gray-600">{duration} mois</p>
                        </div>
                      ))}
                  </div>
                  
                  <div className="bg-khaki-50 p-4 rounded-lg">
                    <p className="font-medium">Durée totale estimée: {estimation.timeline.total} mois</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="assumptions">
              <div>
                <h3 className="text-lg font-medium mb-4">Hypothèses utilisées pour le calcul</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Coût de construction</h4>
                    <p className="text-gray-600">
                      Le coût au m² est basé sur le type de projet ({formData.projectType}), la complexité 
                      ({formData.complexity}) et le standard de qualité ({formData.qualityStandard}).
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Répartition des coûts</h4>
                    <p className="text-gray-600">
                      Les coûts de construction sont répartis selon des ratios standards pour ce type de projet.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Honoraires</h4>
                    <p className="text-gray-600">
                      Les honoraires sont calculés en pourcentage du coût de construction, selon les pratiques du marché.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Planning</h4>
                    <p className="text-gray-600">
                      Les durées des phases sont estimées en fonction de la taille du projet et de sa complexité.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <p className="text-amber-800 font-medium">Note importante</p>
                    <p className="text-amber-700">
                      Cette estimation est fournie à titre indicatif et peut varier selon les spécificités techniques, les contraintes du site, et les fluctuations du marché. Pour une évaluation précise, une étude détaillée est nécessaire.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4">
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
  );
};

export default EstimationResults;
