
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Printer, Share2 } from 'lucide-react';
import { formatCurrency, ensureNumber } from '../utils/typeConversions';
import { ResultsFormProps } from '../types/formTypes';
import EstimationReport from '../EstimationReport';

const ResultsForm: React.FC<ResultsFormProps> = ({ 
  estimationResult, 
  formData, 
  categoriesAmounts, 
  goToPreviousStep,
  animationDirection 
}) => {
  // Ensure we have numbers for all calculations
  const result = ensureNumber(estimationResult);
  const surface = ensureNumber(formData.surface);
  
  // Apply VAT
  const tva = result * 0.2;
  const totalTTC = result + tva;
  
  // Calculate price per square meter
  const pricePerSqm = surface > 0 ? result / surface : 0;
  
  // Handle print action
  const handlePrint = () => {
    window.print();
  };
  
  // Handle download action (placeholder)
  const handleDownload = () => {
    alert('Téléchargement du rapport d\'estimation...');
    // In a real implementation, this would generate and download a PDF
  };
  
  // Handle share action (placeholder)
  const handleShare = () => {
    alert('Partage du rapport d\'estimation...');
    // In a real implementation, this would open a share dialog
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-progineer-gold to-amber-500 text-white">
          <CardTitle className="text-center text-2xl font-bold">Résultats de votre estimation</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-lg font-medium text-gray-500">Coût estimatif de votre projet</h3>
            <div className="text-4xl font-bold text-progineer-gold mt-2">
              {formatCurrency(result)}
              <span className="text-sm font-normal text-gray-500 ml-1">HT</span>
            </div>
            <div className="text-xl font-semibold mt-1">
              {formatCurrency(totalTTC)}
              <span className="text-sm font-normal text-gray-500 ml-1">TTC</span>
            </div>
            {surface > 0 && (
              <div className="text-sm text-gray-500 mt-2">
                Soit environ {formatCurrency(pricePerSqm)} HT/m²
              </div>
            )}
          </div>
          
          <div className="divide-y">
            <h4 className="font-semibold text-lg pb-2">Répartition par corps d'état</h4>
            
            {categoriesAmounts.map((category, index) => (
              <div key={index} className="py-3 flex justify-between items-center">
                <span className="text-gray-700">{category.category}</span>
                <span className="font-medium">{formatCurrency(category.amount)}</span>
              </div>
            ))}
            
            <div className="py-3 flex justify-between items-center font-semibold">
              <span>TVA (20%)</span>
              <span>{formatCurrency(tva)}</span>
            </div>
            
            <div className="py-3 flex justify-between items-center font-bold text-lg">
              <span>Total TTC</span>
              <span>{formatCurrency(totalTTC)}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <h4 className="font-semibold mb-2">Informations sur votre projet</h4>
            <ul className="space-y-1 text-sm">
              <li><span className="font-medium">Type de projet :</span> {formData.projectType}</li>
              {formData.surface && <li><span className="font-medium">Surface :</span> {formData.surface} m²</li>}
              {formData.levels && <li><span className="font-medium">Nombre de niveaux :</span> {formData.levels}</li>}
              {formData.city && <li><span className="font-medium">Localisation :</span> {formData.city}</li>}
            </ul>
          </div>
          
          <div className="mt-8">
            <h4 className="font-semibold mb-4">Rapport d'estimation détaillé</h4>
            
            <EstimationReport 
              estimation={{
                totalHT: result,
                totalTTC: totalTTC,
                vat: tva,
                coutGlobalHT: result * 1.1,
                coutGlobalTTC: result * 1.1 * 1.2,
                honorairesHT: result * 0.1,
                taxeAmenagement: result * 0.03,
                garantieDecennale: result * 0.01,
                etudesGeotechniques: result * 0.005,
                etudeThermique: result * 0.005,
                corpsEtat: categoriesAmounts.reduce((acc, cat) => ({
                  ...acc,
                  [cat.category]: {
                    montantHT: cat.amount,
                    details: [
                      formData.projectType ? `Type de projet: ${formData.projectType}` : '',
                      formData.surface ? `Surface concernée: ${formData.surface} m²` : '',
                    ].filter(Boolean)
                  }
                }), {})
              }} 
              formData={formData}
              includeTerrainPrice={!!formData.landPrice}
              estimationResult={result}
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-3 bg-gray-50 p-4">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={goToPreviousStep}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto" 
              onClick={handlePrint}
            >
              <Printer className="mr-2 h-4 w-4" />
              Imprimer
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full sm:w-auto" 
              onClick={handleDownload}
            >
              <Download className="mr-2 h-4 w-4" />
              Télécharger
            </Button>
            
            <Button 
              variant="default" 
              className="w-full sm:w-auto" 
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Partager
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsForm;
