
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { FormData } from './types/formTypes';
import { safeRenderValue } from './utils/typeConversions';

interface CorpsEtatDetails {
  montantHT: number;
  details: string[];
}

export interface EstimationReportProps {
  estimation: {
    totalHT: number;
    totalTTC: number;
    vat: number;
    corpsEtat: Record<string, CorpsEtatDetails>;
    honorairesHT: number;
    coutGlobalHT: number;
    coutGlobalTTC: number;
    taxeAmenagement: number;
    garantieDecennale: number;
    etudesGeotechniques: number;
    etudeThermique: number;
  };
  formData: FormData;
}

const EstimationReport: React.FC<EstimationReportProps> = ({ 
  estimation, 
  formData 
}) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-khaki-50 border-khaki-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Estimation détaillée de votre projet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3 border-b pb-2">Informations du projet</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type de projet:</span>
                  <span className="font-medium">{formData.projectType || 'Construction'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Surface:</span>
                  <span className="font-medium">{formData.surface || '0'} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Localisation:</span>
                  <span className="font-medium">{formData.city || 'Non spécifié'}</span>
                </div>
                {formData.bedrooms && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chambres:</span>
                    <span className="font-medium">{formData.bedrooms}</span>
                  </div>
                )}
                {formData.bathrooms && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salles de bain:</span>
                    <span className="font-medium">{formData.bathrooms}</span>
                  </div>
                )}
                {formData.constructionType && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Construction:</span>
                    <span className="font-medium">{safeRenderValue(formData.constructionType)}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 border-b pb-2">Coûts du projet</h3>
              <div className="space-y-2">
                <div className="flex justify-between font-medium">
                  <span>Total HT:</span>
                  <span>{formatCurrency(estimation.totalHT)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TVA (20%):</span>
                  <span>{formatCurrency(estimation.vat)}</span>
                </div>
                <div className="flex justify-between font-medium text-khaki-800">
                  <span>Total TTC:</span>
                  <span>{formatCurrency(estimation.totalTTC)}</span>
                </div>
                
                <div className="pt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Honoraires MOE:</span>
                    <span>{formatCurrency(estimation.honorairesHT)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxe d'aménagement:</span>
                    <span>{formatCurrency(estimation.taxeAmenagement)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Garantie décennale:</span>
                    <span>{formatCurrency(estimation.garantieDecennale)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-medium pt-2 border-t">
                  <span>Coût global TTC:</span>
                  <span>{formatCurrency(estimation.coutGlobalTTC)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 border-b pb-2">Détail par corps d'état</h3>
          
          <div className="space-y-4">
            {Object.entries(estimation.corpsEtat).map(([nom, corps]) => {
              const typedCorps = corps as CorpsEtatDetails;
              return (
                <div key={nom} className="border rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{nom}</span>
                    <span className="font-medium">{formatCurrency(typedCorps.montantHT)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span>Comprend: </span>
                    {typedCorps.details.join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4 border-b pb-2">Études techniques</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Études géotechniques:</span>
              <span>{formatCurrency(estimation.etudesGeotechniques)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Étude thermique:</span>
              <span>{formatCurrency(estimation.etudeThermique)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-gray-100 p-4 rounded-lg text-xs text-gray-500">
        <p className="font-medium text-sm mb-1">Notes importantes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cette estimation est fournie à titre indicatif et peut varier selon les spécificités du terrain et les choix définitifs.</li>
          <li>Les prix incluent la main d'œuvre et les matériaux standards. Des options plus luxueuses peuvent augmenter le coût.</li>
          <li>Nous vous recommandons de prévoir une provision pour imprévus d'environ 10% du montant total.</li>
          <li>Cette estimation a été générée le {new Date().toLocaleDateString('fr-FR')}.</li>
        </ul>
      </div>
    </div>
  );
};

export default EstimationReport;
