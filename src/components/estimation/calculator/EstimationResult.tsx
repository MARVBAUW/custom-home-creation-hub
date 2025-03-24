
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Download, Share, Mail, Printer, Loader2 } from "lucide-react";
import { motion } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import EstimationSummaryReport from './EstimationSummaryReport';
import { FormData } from './types';
import { sendEstimationEmail } from './services/emailService';

// Interface pour les montants par corps d'état
interface CategoryAmount {
  category: string;
  amount: number;
  details?: string;
}

type EstimationResultProps = {
  showResultDialog: boolean;
  setShowResultDialog: (show: boolean) => void;
  estimationResult: number | null;
  formData: FormData;
};

const EstimationResult: React.FC<EstimationResultProps> = ({
  showResultDialog,
  setShowResultDialog,
  estimationResult,
  formData
}) => {
  const { toast } = useToast();
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // Générer les montants par corps d'état basés sur le formData
  const categoriesAmounts: CategoryAmount[] = [];

  // Remplir les catégories si nous avons un résultat d'estimation
  useEffect(() => {
    if (estimationResult && showResultDialog) {
      generateCategoriesAmounts();
    }
  }, [estimationResult, showResultDialog, formData]);

  const generateCategoriesAmounts = () => {
    // Cette fonction doit être enrichie avec la logique réelle de répartition
    // basée sur les données du formulaire et les calculs

    // Exemple de répartition (à remplacer par la vraie logique)
    if (estimationResult) {
      // Vider le tableau
      categoriesAmounts.length = 0;
      
      // Gros oeuvre (environ 30% du total)
      const grosOeuvreAmount = estimationResult * 0.3;
      categoriesAmounts.push({
        category: "Gros œuvre",
        amount: grosOeuvreAmount,
        details: formData.wallType ? `Type de mur: ${formData.wallType}` : undefined
      });
      
      // Charpente et couverture (environ 15% du total)
      const charpenteAmount = estimationResult * 0.15;
      categoriesAmounts.push({
        category: "Charpente et couverture",
        amount: charpenteAmount,
        details: formData.roofType ? `Type de toit: ${formData.roofType}` : undefined
      });
      
      // Isolation et façade (environ 10% du total)
      const isolationAmount = estimationResult * 0.1;
      categoriesAmounts.push({
        category: "Isolation et façade",
        amount: isolationAmount,
        details: formData.insulationType ? `Isolation: ${formData.insulationType}` : undefined
      });
      
      // Menuiseries extérieures (environ 10% du total)
      const menuiseriesExtAmount = estimationResult * 0.1;
      categoriesAmounts.push({
        category: "Menuiseries extérieures",
        amount: menuiseriesExtAmount,
        details: formData.windowType ? `Type de menuiseries: ${formData.windowType}` : undefined
      });
      
      // Électricité et plomberie (environ 15% du total)
      const electriciteAmount = estimationResult * 0.08;
      const plomberieAmount = estimationResult * 0.07;
      categoriesAmounts.push({
        category: "Électricité",
        amount: electriciteAmount,
        details: formData.electricalType ? `Type d'installation: ${formData.electricalType}` : undefined
      });
      categoriesAmounts.push({
        category: "Plomberie et chauffage",
        amount: plomberieAmount,
        details: formData.heatingType ? `Chauffage: ${formData.heatingType}` : undefined
      });
      
      // Cloisons, plâtrerie (environ 5% du total)
      const platrerie = estimationResult * 0.05;
      categoriesAmounts.push({
        category: "Cloisons et plâtrerie",
        amount: platrerie
      });
      
      // Revêtements de sols et murs (environ 10% du total)
      const revetements = estimationResult * 0.1;
      categoriesAmounts.push({
        category: "Revêtements (sols et murs)",
        amount: revetements
      });
      
      // Équipements et finitions (environ 5% du total)
      const equipements = estimationResult * 0.05;
      categoriesAmounts.push({
        category: "Équipements et finitions",
        amount: equipements
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mon estimation Progineer',
        text: `J'ai estimé mon projet à ${estimationResult ? formatPrice(estimationResult) : ''}`,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    }
  };

  const handleSendEmail = async () => {
    if (!estimationResult || !formData.email) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email. Vérifiez votre adresse email.",
        variant: "destructive",
      });
      return;
    }

    setSendingEmail(true);

    try {
      // Générer les catégories si nécessaire
      if (categoriesAmounts.length === 0) {
        generateCategoriesAmounts();
      }

      // Envoyer l'email
      const success = await sendEstimationEmail(formData, estimationResult, categoriesAmounts);
      
      if (success) {
        setEmailSent(true);
        toast({
          title: "Email envoyé",
          description: "Le récapitulatif a été envoyé à votre adresse email et à l'équipe Progineer.",
        });
      } else {
        throw new Error("Échec de l'envoi");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto relative">
        {/* Animation de confettis en arrière-plan */}
        <div className="absolute -z-10 inset-0 overflow-hidden opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-progineer-gold/30 to-transparent"></div>
        </div>
        
        <DialogTitle className="text-2xl font-semibold flex items-center gap-2 text-progineer-gold">
          <Check size={24} className="text-green-500" />
          Estimation complétée
        </DialogTitle>
        
        <DialogDescription>
          Votre estimation est maintenant prête. Un conseiller Progineer vous contactera sous 24h pour discuter de votre projet.
        </DialogDescription>
        
        <div className="py-4">
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="mb-4"
            >
              <h3 className="text-lg font-medium text-gray-700">Estimation de votre projet</h3>
              <p className="text-3xl font-bold tracking-tighter text-progineer-gold mt-2">
                {estimationResult ? formatPrice(estimationResult) : '---'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">*Prix approximatif TTC</p>
            </motion.div>
          </div>

          {/* Rapport détaillé par corps d'état */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <EstimationSummaryReport 
              formData={formData}
              estimationResult={estimationResult}
              categoriesAmounts={categoriesAmounts}
            />
          </motion.div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Fermer
            </Button>
          </DialogClose>
          
          <Button 
            className="w-full sm:w-auto bg-progineer-gold hover:bg-progineer-gold/90" 
            onClick={handlePrint}
          >
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          
          <Button 
            className="w-full sm:w-auto" 
            onClick={handleSendEmail}
            disabled={sendingEmail || emailSent || !formData.email}
          >
            {sendingEmail ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            {emailSent ? "Email envoyé" : "Recevoir par email"}
          </Button>
          
          <Button 
            className="w-full sm:w-auto bg-progineer-gold hover:bg-progineer-gold/90" 
            onClick={handleShare}
          >
            <Share className="mr-2 h-4 w-4" />
            Partager
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EstimationResult;
