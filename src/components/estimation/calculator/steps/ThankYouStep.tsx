
import React from 'react';
import { FormData } from '../types/formTypes';
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Download, Mail, ThumbsUp } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { ensureNumber } from '../utils/typeConversions';

interface ThankYouStepProps {
  formData: FormData;
  animationDirection: 'forward' | 'backward';
}

const ThankYouStep: React.FC<ThankYouStepProps> = ({ 
  formData,
  animationDirection
}) => {
  // Format the estimation amount
  const formatAmount = (amount: number | undefined) => {
    if (!amount) return "0";
    return new Intl.NumberFormat('fr-FR').format(amount);
  };

  // Get estimation amount from formData
  const estimationAmount = ensureNumber(formData.montantT);

  return (
    <div className={`space-y-8 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <div className="text-center">
        <ThumbsUp className="h-16 w-16 mx-auto text-green-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Merci pour votre demande d'estimation !</h2>
        <p className="text-gray-600">
          Nous avons bien reçu vos informations et nous prendrons contact avec vous rapidement.
        </p>
      </div>
      
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="text-xl font-semibold text-center mb-4">L'estimation de votre projet est de :</h3>
          
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold text-blue-700">
              {formatAmount(estimationAmount)} €/HT*
            </span>
            
            <p className="text-xs text-gray-500 mt-2">
              (hors terrain, frais de notaire, étude géotechnique, honoraires de maîtrise d'œuvre, taxe d'aménagement, taxe archéologique, assurance dommage ouvrage)
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center h-full">
            <Award className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Honoraires Progineer</h3>
            <p className="text-sm text-gray-600 mb-4">Découvrez les honoraires de notre service de maîtrise d'œuvre pour ce projet.</p>
            <Button className="mt-auto" variant="outline">
              En savoir plus
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center h-full">
            <Download className="h-10 w-10 text-blue-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">Télécharger l'estimation</h3>
            <p className="text-sm text-gray-600 mb-4">Recevez une copie détaillée de cette estimation par email.</p>
            <Button className="mt-auto">
              Recevoir par email
              <Mail className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        <p>
          Notre équipe analysera votre projet en détail et vous contactera sous 24h pour discuter des possibilités.
        </p>
        <p className="mt-1">
          Pour toute question urgente, n'hésitez pas à nous contacter au <span className="font-medium">04 91 xx xx xx</span>.
        </p>
      </div>
    </div>
  );
};

export default ThankYouStep;
