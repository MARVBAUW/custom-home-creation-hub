
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Calculator } from "lucide-react";
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
  return (
    <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
      <AlertDialogContent className="sm:max-w-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-progineer-gold flex items-center">
              <Calculator className="mr-2 h-5 w-5" />
              Estimation de votre projet
            </AlertDialogTitle>
            <AlertDialogDescription>
              Selon les informations que vous avez fournies, le coût estimé de votre projet est de:
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="py-6 text-center">
            <motion.p 
              className="text-4xl font-bold text-progineer-gold"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              {estimationResult?.toLocaleString('fr-FR')} €
            </motion.p>
            <p className="text-sm text-muted-foreground mt-2">
              Cette estimation est indicative et peut varier en fonction des spécificités de votre projet.
            </p>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogAction className="bg-progineer-gold hover:bg-progineer-gold/90 transition-all duration-300">
              J'ai compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </motion.div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EstimationResult;
