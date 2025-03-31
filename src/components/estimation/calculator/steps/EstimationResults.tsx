
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Share2, Printer, Send, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { FormData } from '../types';
import { formatCurrency } from '@/utils/formatters';
import { sendEstimationByEmail } from '../services/emailService';

interface EstimationResultsProps {
  estimation: number | null;
  formData: FormData;
  goToPreviousStep: () => void;
  updateFormData?: (data: Partial<FormData>) => void;
  goToNextStep?: () => void;
}

// Function to format a number with thousand separators
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

const EstimationResults: React.FC<EstimationResultsProps> = ({
  estimation,
  formData,
  goToPreviousStep
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [email, setEmail] = useState(formData.email || '');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  // Handle print PDF
  const handlePrint = () => {
    window.print();
  };

  // Handle share by email
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
      const result = await sendEstimationByEmail(email, formData, estimation || 0);
      
      if (result.success) {
        toast({
          title: "Estimation envoyée",
          description: "Votre estimation a été envoyée à l'adresse email indiquée.",
        });
        setShowShareDialog(false);
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de l'envoi de l'email.",
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

  // Format estimation amount
  const formattedEstimation = estimation ? formatCurrency(estimation) : '0 €';

  // Get project type display name
  const getProjectTypeDisplay = (type: string | undefined): string => {
    if (!type) return 'Construction';
    
    switch (type.toLowerCase()) {
      case 'construction': return 'Construction neuve';
      case 'renovation': return 'Rénovation';
      case 'extension': return 'Extension';
      default: return type;
    }
  };

  // Calculate detailed costs
  const structuralWork = estimation ? Math.round(estimation * 0.35) : 0;
  const finishingWork = estimation ? Math.round(estimation * 0.25) : 0;
  const technicalLots = estimation ? Math.round(estimation * 0.20) : 0;
  const externalWorks = estimation ? Math.round(estimation * 0.10) : 0;
  const fees = estimation ? Math.round(estimation * 0.10) : 0;

  return (
    <div className="space-y-6">
      <Button variant="outline" className="flex items-center gap-2" onClick={goToPreviousStep}>
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Button>
      
      <Card className="print:shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl flex items-center justify-between">
            Résultats de l'estimation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg">Montant estimatif</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{formattedEstimation}</p>
            <p className="text-sm text-gray-500 mt-1">
              Cette estimation est fournie à titre indicatif et peut varier selon les spécificités de votre projet.
            </p>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-3">Caractéristiques du projet</h3>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="font-medium">Type de projet</div>
              <div>{getProjectTypeDisplay(formData.projectType)}</div>
              
              <div className="font-medium">Surface</div>
              <div>{formData.surface ? `${formData.surface} m²` : 'Non spécifiée'}</div>
              
              <div className="font-medium">Localisation</div>
              <div>{formData.city || 'Non spécifiée'}</div>
              
              <div className="font-medium">Niveaux</div>
              <div>{formData.levels || 'Non spécifié'}</div>
              
              <div className="font-medium">Nombre de pièces</div>
              <div>{formData.roomCount || 'Non spécifié'}</div>
              
              <div className="font-medium">Qualité de finition</div>
              <div>{formData.finishLevel || 'Standard'}</div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-3">Répartition des coûts</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-36 text-sm">Gros œuvre</div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm font-medium">{formatCurrency(structuralWork)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-36 text-sm">Second œuvre</div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm font-medium">{formatCurrency(finishingWork)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-36 text-sm">Lots techniques</div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm font-medium">{formatCurrency(technicalLots)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-36 text-sm">Aménagements ext.</div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm font-medium">{formatCurrency(externalWorks)}</div>
              </div>
              
              <div className="flex items-center">
                <div className="w-36 text-sm">Honoraires et frais</div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
                <div className="w-24 text-right text-sm font-medium">{formatCurrency(fees)}</div>
              </div>
            </div>
          </div>
          
          <div className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-3">Planning prévisionnel</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Conception et études</span>
                <span className="font-medium">2 à 3 mois</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Dépôt et instruction du permis</span>
                <span className="font-medium">2 à 5 mois</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Consultation des entreprises</span>
                <span className="font-medium">1 à 2 mois</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Réalisation des travaux</span>
                <span className="font-medium">6 à 12 mois</span>
              </div>
              <div className="flex justify-between text-sm font-medium">
                <span>Durée totale</span>
                <span>11 à 22 mois</span>
              </div>
            </div>
          </div>
          
          <div className="print:hidden">
            <h3 className="font-semibold text-lg mb-3">Partager cette estimation</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowShareDialog(true)}>
                <Share2 className="h-4 w-4" />
                Partager par email
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                Imprimer
              </Button>
              
              <Button variant="default" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Télécharger en PDF
              </Button>
            </div>
          </div>
          
          <div className="pt-4 text-center text-xs text-gray-500 border-t">
            <p>Cette estimation est calculée sur la base des informations fournies et représente un ordre de grandeur indicatif.</p>
            <p>Pour une étude personnalisée, n'hésitez pas à prendre rendez-vous avec nos experts.</p>
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

export default EstimationResults;
