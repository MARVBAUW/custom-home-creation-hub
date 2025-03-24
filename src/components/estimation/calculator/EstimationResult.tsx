
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Download, Share, Mail } from "lucide-react";
import { motion } from 'framer-motion';

type EstimationResultProps = {
  showResultDialog: boolean;
  setShowResultDialog: (show: boolean) => void;
  estimationResult: number | null;
};

const EstimationResult: React.FC<EstimationResultProps> = ({
  showResultDialog,
  setShowResultDialog,
  estimationResult
}) => {
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

  return (
    <Dialog open={showResultDialog} onOpenChange={setShowResultDialog}>
      <DialogContent className="sm:max-w-md relative overflow-hidden">
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
        
        <div className="py-6">
          <div className="text-center">
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
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-2"
            >
              <p className="text-sm">
                <span className="font-medium">Note:</span> Cette estimation est basée sur les informations fournies et peut varier en fonction des spécificités de votre projet et des contraintes du site.
              </p>
            </motion.div>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Fermer
            </Button>
          </DialogClose>
          
          <Button className="w-full sm:w-auto bg-progineer-gold hover:bg-progineer-gold/90" onClick={handleShare}>
            <Share className="mr-2 h-4 w-4" />
            Partager
          </Button>
          
          <Button className="w-full sm:w-auto">
            <Mail className="mr-2 h-4 w-4" />
            Recevoir par email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EstimationResult;
