
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Download, Mail, FileClock } from 'lucide-react';
import { FormData } from '../types';

interface EstimationResultsFormProps {
  estimation: number;
  formData: FormData;
  goToPreviousStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

const EstimationResultsForm: React.FC<EstimationResultsFormProps> = ({
  estimation,
  formData,
  goToPreviousStep,
  updateFormData,
  goToNextStep
}) => {
  const calculateCost = (): number => {
    let basePrice = 0;
    const surfaceValue = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 0);
    
    // Base price calculation based on project type and surface
    if (formData.projectType === 'construction') {
      basePrice = surfaceValue * 1800; // Average cost per m² for new constructions
    } else if (formData.projectType === 'renovation') {
      basePrice = surfaceValue * 1200; // Average cost per m² for renovations
    } else if (formData.projectType === 'extension') {
      basePrice = surfaceValue * 1500; // Average cost per m² for extensions
    }
    
    // Adjust by finish level
    if (formData.finishStandard === 'economic') {
      basePrice *= 0.8;
    } else if (formData.finishStandard === 'premium') {
      basePrice *= 1.3;
    }
    
    // Add extras for special features
    if (formData.pool) basePrice += 25000;
    if (formData.terrace) basePrice += 10000;
    if (formData.outdoorKitchen) basePrice += 15000;
    if (formData.solarPanels) basePrice += 12000;
    if (formData.rainwaterHarvesting) basePrice += 5000;
    if (formData.homeAutomation) basePrice += 8000;
    if (formData.energyEfficiency) basePrice += 15000;
    
    return Math.round(basePrice);
  };
  
  const estimatedCost = calculateCost();
  
  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
  };
  
  // Calculate fee breakdown
  const constructionCost = estimatedCost * 0.85;
  const architectFees = estimatedCost * 0.08;
  const technicalFees = estimatedCost * 0.05;
  const adminFees = estimatedCost * 0.02;
  
  const handleDownloadPDF = () => {
    alert('Téléchargement du PDF en cours... (fonctionnalité en développement)');
  };
  
  const handleSendByEmail = () => {
    alert('Envoi par email en cours... (fonctionnalité en développement)');
  };
  
  const handleRequestDetailed = () => {
    alert('Demande d\'estimation détaillée envoyée! Un expert Progineer vous contactera bientôt.');
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Estimation de votre projet</h2>
        <div className="text-3xl font-bold text-green-600 mb-2">
          {formatCurrency(estimatedCost)}
        </div>
        <p className="text-sm text-gray-500">
          Estimation approximative pour votre projet de {formData.projectType || 'construction'} de {formData.surface} m²
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h3 className="font-medium">Détail de l'estimation</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Coût de construction</span>
              <span>{formatCurrency(constructionCost)}</span>
            </div>
            <div className="flex justify-between">
              <span>Honoraires d'architecte</span>
              <span>{formatCurrency(architectFees)}</span>
            </div>
            <div className="flex justify-between">
              <span>Études techniques</span>
              <span>{formatCurrency(technicalFees)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frais administratifs</span>
              <span>{formatCurrency(adminFees)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(estimatedCost)}</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500 mt-2">
            <p>Cette estimation est fournie à titre indicatif et peut varier en fonction des spécificités de votre projet.</p>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2"
            onClick={handleDownloadPDF}
          >
            <Download className="h-4 w-4" />
            Télécharger en PDF
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center justify-center gap-2"
            onClick={handleSendByEmail}
          >
            <Mail className="h-4 w-4" />
            Recevoir par email
          </Button>
          
          <Button 
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleRequestDetailed}
          >
            <FileClock className="h-4 w-4" />
            Obtenir une estimation détaillée
          </Button>
        </div>
        
        <div className="flex justify-start pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Retour
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EstimationResultsForm;
