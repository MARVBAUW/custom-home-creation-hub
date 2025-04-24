
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Mail, Share2 } from 'lucide-react';
import { FormData } from '../types/formTypes';

interface ResultsSummaryProps {
  showSummary: boolean;
  estimationResult: any;
  formData: FormData;
  onBackClick: () => void;
}

const ResultsSummary: React.FC<ResultsSummaryProps> = ({ 
  showSummary, 
  estimationResult, 
  formData, 
  onBackClick 
}) => {
  if (!showSummary || !estimationResult) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
  };

  // Extract data from the estimation result
  const totalAmount = estimationResult.totalAmount || 0;
  const perSquareMeter = formData.surface ? totalAmount / formData.surface : 0;
  const projectTitle = getProjectTitle(formData);
  
  function getProjectTitle(formData: FormData): string {
    const projectType = formData.projectType || 'construction';
    const projectTypeName = {
      'construction': 'Construction',
      'renovation': 'Rénovation',
      'extension': 'Extension',
      'optimization': 'Optimisation',
      'division': 'Division'
    }[projectType] || 'Projet';
    
    const location = formData.city ? ` à ${formData.city}` : '';
    const surface = formData.surface ? ` de ${formData.surface}m²` : '';
    
    return `${projectTypeName}${surface}${location}`;
  }

  return (
    <div>
      <Button
        variant="outline"
        onClick={onBackClick}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour au formulaire
      </Button>
      
      <Card className="border-2 border-green-500 shadow-lg">
        <CardHeader className="bg-green-50">
          <CardTitle className="text-2xl">Estimation de votre projet</CardTitle>
          <CardDescription>{projectTitle}</CardDescription>
        </CardHeader>
        
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500 font-medium">Estimation totale</h3>
              <p className="text-3xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-500 font-medium">Prix au m²</h3>
              <p className="text-3xl font-bold">{formatCurrency(perSquareMeter)}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Détails de l'estimation</h3>
            <div className="space-y-2">
              {estimationResult.constructionCosts && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Coûts de construction</span>
                  <span>{formatCurrency(estimationResult.constructionCosts.total)}</span>
                </div>
              )}
              
              {estimationResult.fees && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Honoraires et frais</span>
                  <span>{formatCurrency(estimationResult.fees.total)}</span>
                </div>
              )}
              
              {estimationResult.otherCosts && (
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Autres coûts</span>
                  <span>{formatCurrency(estimationResult.otherCosts.total)}</span>
                </div>
              )}
              
              <div className="flex justify-between py-4 border-t-2 border-t-green-500 font-bold">
                <span>Total TTC</span>
                <span>{formatCurrency(totalAmount * 1.2)}</span>
              </div>
            </div>
          </div>
          
          {estimationResult.timeline && (
            <div>
              <h3 className="text-lg font-medium mb-3">Calendrier estimatif</h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Conception</p>
                  <p className="text-xl font-semibold">{estimationResult.timeline.design} mois</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Autorisations</p>
                  <p className="text-xl font-semibold">{estimationResult.timeline.permits} mois</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-500">Construction</p>
                  <p className="text-xl font-semibold">{estimationResult.timeline.construction} mois</p>
                </div>
              </div>
              <p className="text-sm text-center mt-2 text-gray-500">
                Durée totale estimée: <span className="font-medium">{estimationResult.timeline.totalMonths} mois</span>
              </p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="bg-gray-50 p-6 flex flex-wrap gap-3 justify-between">
          <div className="text-sm text-gray-500">
            Estimation générée le {new Date().toLocaleDateString()}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Recevoir par email
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Partager
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsSummary;
