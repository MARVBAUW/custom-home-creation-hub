
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PDFGenerator } from '../components/PDFGenerator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BaseFormProps } from '../types/baseTypes';
import { EstimationResponseData } from '../types/estimationTypes';
import { formatCurrency } from '@/utils/formatters';

// Extend BaseFormProps with specific props for the results form
interface ResultsFormProps extends BaseFormProps {
  estimationResult?: EstimationResponseData | number | null;
  categoriesAmounts?: Array<{ category: string; amount: number }>;
}

const ResultsForm: React.FC<ResultsFormProps> = ({
  formData,
  estimationResult,
  categoriesAmounts,
  goToPreviousStep,
  isLoading,
  animationDirection
}) => {
  if (isLoading) {
    return (
      <Card className="bg-white/50 backdrop-blur transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-xl text-center">Calcul de votre estimation en cours...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
          <p className="text-gray-600">Veuillez patienter, nous calculons votre estimation détaillée...</p>
        </CardContent>
      </Card>
    );
  }

  if (!estimationResult) {
    return (
      <Card className="bg-white/50 backdrop-blur transition-all duration-500">
        <CardHeader>
          <CardTitle className="text-xl text-center">Résultats non disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>
              Une erreur est survenue lors du calcul de l'estimation. Veuillez réessayer.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center mt-6">
            <Button onClick={goToPreviousStep} variant="outline">
              Retour
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate total amount
  const totalAmount = typeof estimationResult === 'number' 
    ? estimationResult 
    : estimationResult.totalAmount;

  return (
    <Card className="bg-white/50 backdrop-blur transition-all duration-500">
      <CardHeader>
        <CardTitle className="text-xl text-center">Estimation de votre projet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Total estimation */}
          <div className="bg-blue-50 p-6 rounded-xl text-center">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Estimation globale du projet</h3>
            <p className="text-3xl font-bold text-blue-900">
              {formatCurrency(totalAmount)}
            </p>
            <p className="text-sm text-blue-700 mt-2">
              {formData.surface && `${formatCurrency(totalAmount / Number(formData.surface))} / m²`}
            </p>
          </div>

          {/* Breakdown by category */}
          {categoriesAmounts && categoriesAmounts.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Répartition par corps d'état</h3>
              <div className="space-y-3">
                {categoriesAmounts.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-700">{item.category}</span>
                    <span className="font-medium">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          {typeof estimationResult !== 'number' && estimationResult.timeline && (
            <div>
              <h3 className="text-lg font-medium mb-4">Calendrier prévisionnel</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Études et conception</p>
                  <p className="text-lg font-medium">{estimationResult.timeline.design} mois</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Autorisations</p>
                  <p className="text-lg font-medium">{estimationResult.timeline.permits} mois</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Consultation</p>
                  <p className="text-lg font-medium">{estimationResult.timeline.bidding} mois</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Construction</p>
                  <p className="text-lg font-medium">{estimationResult.timeline.construction} mois</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mt-4 text-center">
                <p className="text-sm text-blue-500">Durée totale estimée</p>
                <p className="text-xl font-medium text-blue-700">{estimationResult.timeline.total} mois</p>
              </div>
            </div>
          )}

          {/* Project summary */}
          <div>
            <h3 className="text-lg font-medium mb-4">Résumé du projet</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="text-gray-600">Type de projet:</div>
              <div className="font-medium">{formData.projectType}</div>
              
              <div className="text-gray-600">Surface:</div>
              <div className="font-medium">{formData.surface} m²</div>
              
              {formData.city && (
                <>
                  <div className="text-gray-600">Localisation:</div>
                  <div className="font-medium">{formData.city}</div>
                </>
              )}
              
              {formData.constructionType && (
                <>
                  <div className="text-gray-600">Type de construction:</div>
                  <div className="font-medium">{formData.constructionType}</div>
                </>
              )}
              
              {formData.constructionStyle && (
                <>
                  <div className="text-gray-600">Style architectural:</div>
                  <div className="font-medium">{formData.constructionStyle}</div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between pt-4">
            <Button onClick={goToPreviousStep} variant="outline">
              Modifier mon estimation
            </Button>
            
            <PDFGenerator
              documentTitle="Estimation détaillée de projet"
              data={formData}
              fileName="estimation-progineer"
              buttonLabel="Télécharger l'estimation"
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
            />
          </div>
          
          <div className="text-xs text-gray-500 mt-4 text-center">
            * Cette estimation est fournie à titre indicatif et ne constitue pas un engagement contractuel.
            Les prix peuvent varier selon les spécificités du projet, les matériaux choisis et les contraintes du site.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsForm;
