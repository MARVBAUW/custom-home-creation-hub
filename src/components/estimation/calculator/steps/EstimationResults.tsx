
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftIcon, FileDown, Mail, Phone } from 'lucide-react';
import { FormData } from '../types';

interface EstimationResultsProps {
  estimation: number;
  formData: FormData;
  goToPreviousStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const EstimationResults: React.FC<EstimationResultsProps> = ({
  estimation,
  formData,
  goToPreviousStep,
  updateFormData,
  goToNextStep
}) => {
  // Format currency with Euro symbol
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  // Calculate base values
  const baseEstimation = estimation || 100000; // Default value if no estimation provided
  const vat = baseEstimation * 0.2;
  const totalWithVAT = baseEstimation + vat;
  
  // Calculate additional values based on surface
  const pricePerSqm = formData.surface ? baseEstimation / formData.surface : 0;
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Résultat de votre estimation</h2>
      
      <Card className="bg-gray-50">
        <CardContent className="pt-6 pb-6">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Estimation du coût de votre projet</p>
              <p className="text-3xl font-bold text-blue-600">{formatCurrency(baseEstimation)}</p>
              <p className="text-sm text-gray-500 mt-1">Hors taxes</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded shadow-sm">
                <p className="text-sm text-gray-500">TVA (20%)</p>
                <p className="text-lg font-semibold">{formatCurrency(vat)}</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <p className="text-sm text-gray-500">Total TTC</p>
                <p className="text-lg font-semibold">{formatCurrency(totalWithVAT)}</p>
              </div>
              {formData.surface && (
                <div className="bg-white p-4 rounded shadow-sm col-span-2">
                  <p className="text-sm text-gray-500">Prix au m²</p>
                  <p className="text-lg font-semibold">{formatCurrency(pricePerSqm)} / m²</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded">
              <p className="text-sm text-blue-800">
                Cette estimation est fournie à titre indicatif et pourra être précisée lors d'un rendez-vous avec nos experts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => {
            // Functionality to download or export the estimation
            console.log("Download estimation");
          }}
        >
          <FileDown className="h-4 w-4" />
          Télécharger l'estimation
        </Button>
        
        <Button 
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          onClick={() => {
            // Functionality to contact a professional
            console.log("Contact a professional");
          }}
        >
          <Phone className="h-4 w-4" />
          Contacter un expert
        </Button>
      </div>
      
      <div className="pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Modifier mon estimation
        </Button>
      </div>
    </div>
  );
};

export default EstimationResults;
