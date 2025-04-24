
import React from 'react';
import { Button } from "@/components/ui/button";
import { FormData } from '../types';
import { Download, Mail, FileCheck, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ensureNumber } from '../utils/typeConversions';

interface ThankYouStepProps {
  formData: FormData;
  animationDirection: string;
}

const ThankYouStep: React.FC<ThankYouStepProps> = ({ 
  formData,
  animationDirection
}) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const estimationAmount = ensureNumber(formData.montantT, 0);
  
  const handleDownloadPDF = () => {
    alert('Téléchargement de l\'estimation en PDF - Fonctionnalité en cours de développement');
  };
  
  const handleSendEmail = () => {
    alert('Envoi de l\'estimation par email - Fonctionnalité en cours de développement');
  };
  
  const handleNewEstimation = () => {
    window.location.reload();
  };
  
  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <div className="text-center space-y-4 mb-6">
        <FileCheck className="h-16 w-16 text-green-600 mx-auto" />
        <h2 className="text-2xl font-bold">Merci pour votre demande d'estimation</h2>
        <p className="text-gray-600">
          Un expert Progineer vous contactera prochainement pour discuter en détail de votre projet.
        </p>
      </div>
      
      <Card className="border-green-100 shadow-md">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="text-center">Estimation de votre projet</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">
              {formatCurrency(estimationAmount)}
            </div>
            <p className="text-sm text-gray-600">
              {formData.projectType === 'renovation' ? 'Rénovation' : 
               formData.projectType === 'construction' ? 'Construction' :
               formData.projectType === 'extension' ? 'Extension' : 'Projet'} de {formData.surface} m²
            </p>
          </div>
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <p className="text-sm text-gray-500">
              Cette estimation ne comprend pas : le terrain, les frais de notaire, l'étude géotechnique, 
              les honoraires de maîtrise d'œuvre, les assurances et les taxes.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 bg-gray-50 border-t border-gray-100">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4" />
            Télécharger l'estimation en PDF
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSendEmail}
          >
            <Mail className="h-4 w-4" />
            Recevoir l'estimation par email
          </Button>
          
          <Button 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleNewEstimation}
          >
            <ArrowLeft className="h-4 w-4" />
            Nouvelle estimation
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center pt-4">
        <p className="text-gray-600 text-sm">
          Notre équipe a reçu votre demande d'estimation pour votre projet {formData.projectType}.
          Nous vous contacterons dans les 24 heures pour affiner cette estimation.
        </p>
      </div>
    </div>
  );
};

export default ThankYouStep;
