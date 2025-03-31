
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormData, EstimationResponseData } from './types';
import { ArrowLeft } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

interface EstimationResultProps {
  formData: FormData;
  estimationResult: EstimationResponseData;
  onBack: () => void;
}

const EstimationResult: React.FC<EstimationResultProps> = ({ 
  formData, 
  estimationResult,
  onBack
}) => {
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="flex items-center gap-2 mb-4"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à l'estimation
      </Button>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">Estimation totale</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {formatCurrency(estimationResult.totalAmount)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Cette estimation inclut tous les coûts de construction, honoraires et frais annexes.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-lg">Construction</h4>
                <p className="text-xl font-semibold mt-1">{formatCurrency(estimationResult.constructionCosts?.total || 0)}</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Gros œuvre</span>
                    <span>{formatCurrency(estimationResult.constructionCosts?.structuralWork || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Second œuvre</span>
                    <span>{formatCurrency(estimationResult.constructionCosts?.finishingWork || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Lots techniques</span>
                    <span>{formatCurrency(estimationResult.constructionCosts?.technicalLots || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Extérieurs</span>
                    <span>{formatCurrency(estimationResult.constructionCosts?.externalWorks || 0)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-lg">Honoraires</h4>
                <p className="text-xl font-semibold mt-1">{formatCurrency(estimationResult.fees?.total || 0)}</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Architecte</span>
                    <span>{formatCurrency(estimationResult.fees?.architectFees || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Bureau d'études</span>
                    <span>{formatCurrency(estimationResult.fees?.engineeringFees || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Frais administratifs</span>
                    <span>{formatCurrency(estimationResult.fees?.officialFees || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Contrôle technique</span>
                    <span>{formatCurrency(estimationResult.fees?.inspectionFees || 0)}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-lg">Autres frais</h4>
                <p className="text-xl font-semibold mt-1">{formatCurrency(estimationResult.otherCosts?.total || 0)}</p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li className="flex justify-between">
                    <span>Assurances</span>
                    <span>{formatCurrency(estimationResult.otherCosts?.insurance || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Imprévus</span>
                    <span>{formatCurrency(estimationResult.otherCosts?.contingency || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Taxes</span>
                    <span>{formatCurrency(estimationResult.otherCosts?.taxes || 0)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Divers</span>
                    <span>{formatCurrency(estimationResult.otherCosts?.miscellaneous || 0)}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-3">Calendrier prévisionnel</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Durée totale estimée:</span>
                  <span className="font-semibold">{estimationResult.timeline?.total || 0} mois</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Conception et études</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 h-4 rounded-full" style={{ width: `${(estimationResult.timeline?.design || 0) * 10}px` }}></div>
                      <span>{estimationResult.timeline?.design || 0} mois</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Autorisations</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-amber-100 h-4 rounded-full" style={{ width: `${(estimationResult.timeline?.permits || 0) * 10}px` }}></div>
                      <span>{estimationResult.timeline?.permits || 0} mois</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Consultation entreprises</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-green-100 h-4 rounded-full" style={{ width: `${(estimationResult.timeline?.bidding || 0) * 10}px` }}></div>
                      <span>{estimationResult.timeline?.bidding || 0} mois</span>
                    </div>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Travaux</span>
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-100 h-4 rounded-full" style={{ width: `${(estimationResult.timeline?.construction || 0) * 10}px` }}></div>
                      <span>{estimationResult.timeline?.construction || 0} mois</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimationResult;
