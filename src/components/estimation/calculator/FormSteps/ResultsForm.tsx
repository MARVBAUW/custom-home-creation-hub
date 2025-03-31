
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Download } from 'lucide-react';
import { DollarSign, Calendar, Clock } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { ResultsFormProps } from '../types/formTypes';
import EstimationPDFExport from '../EstimationPDFExport';

const ResultsForm: React.FC<ResultsFormProps> = ({
  estimationResult,
  formData,
  categoriesAmounts,
  goToPreviousStep,
  animationDirection,
  isLoading = false // Add default value for isLoading
}) => {
  // Extract the estimation amount
  const estimationAmount = estimationResult 
    ? (typeof estimationResult === 'number' 
        ? estimationResult 
        : estimationResult.totalAmount)
    : 0;

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Résultat de l'estimation</h2>
      
      {isLoading ? (
        <div className="flex flex-col items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-progineer-gold"></div>
          <p className="mt-4 text-lg">Calcul de l'estimation en cours...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/80">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <DollarSign className="h-10 w-10 text-progineer-gold mb-2" />
                <p className="text-sm text-gray-500">Estimation totale</p>
                <p className="text-2xl font-bold">{formatCurrency(estimationAmount)}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Calendar className="h-10 w-10 text-progineer-gold mb-2" />
                <p className="text-sm text-gray-500">Surface</p>
                <p className="text-2xl font-bold">{formData.surface || 0} m²</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Clock className="h-10 w-10 text-progineer-gold mb-2" />
                <p className="text-sm text-gray-500">Prix au m²</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(formData.surface && Number(formData.surface) > 0 
                    ? estimationAmount / Number(formData.surface) 
                    : 0)}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {categoriesAmounts && categoriesAmounts.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Détail par catégorie</h3>
              <div className="bg-white/80 rounded-lg shadow p-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Catégorie</th>
                      <th className="text-right py-2">Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesAmounts.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2">{item.category}</td>
                        <td className="text-right py-2">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Modifier mon estimation
            </Button>
            
            {estimationResult && (
              <EstimationPDFExport 
                formData={formData} 
                estimationResult={estimationResult} 
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultsForm;
