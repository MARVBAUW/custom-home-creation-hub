
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { EstimationResponseData } from './types';
import { formatCurrency } from '@/utils/formatters';

interface EstimationBreakdownProps {
  estimation: EstimationResponseData;
}

const EstimationBreakdown: React.FC<EstimationBreakdownProps> = ({ estimation }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-3">Coûts de construction</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-1">
              <span>Gros œuvre</span>
              <span className="font-medium">{formatCurrency(estimation.constructionCosts.structuralWork)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Second œuvre</span>
              <span className="font-medium">{formatCurrency(estimation.constructionCosts.finishingWork)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Lots techniques</span>
              <span className="font-medium">{formatCurrency(estimation.constructionCosts.technicalLots)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Aménagements extérieurs</span>
              <span className="font-medium">{formatCurrency(estimation.constructionCosts.externalWorks)}</span>
            </div>
            <div className="flex justify-between pt-1 font-semibold">
              <span>Total construction</span>
              <span>{formatCurrency(estimation.constructionCosts.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-3">Honoraires et frais d'études</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-1">
              <span>Honoraires d'architecte</span>
              <span className="font-medium">{formatCurrency(estimation.fees.architectFees)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Honoraires d'ingénierie</span>
              <span className="font-medium">{formatCurrency(estimation.fees.engineeringFees)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Frais administratifs</span>
              <span className="font-medium">{formatCurrency(estimation.fees.officialFees)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Contrôle technique</span>
              <span className="font-medium">{formatCurrency(estimation.fees.inspectionFees)}</span>
            </div>
            <div className="flex justify-between pt-1 font-semibold">
              <span>Total honoraires</span>
              <span>{formatCurrency(estimation.fees.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-3">Autres coûts</h3>
          <div className="space-y-2">
            <div className="flex justify-between border-b pb-1">
              <span>Assurances</span>
              <span className="font-medium">{formatCurrency(estimation.otherCosts.insurance)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Imprévus</span>
              <span className="font-medium">{formatCurrency(estimation.otherCosts.contingency)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Taxes</span>
              <span className="font-medium">{formatCurrency(estimation.otherCosts.taxes)}</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>Divers</span>
              <span className="font-medium">{formatCurrency(estimation.otherCosts.miscellaneous)}</span>
            </div>
            <div className="flex justify-between pt-1 font-semibold">
              <span>Total autres coûts</span>
              <span>{formatCurrency(estimation.otherCosts.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-khaki-50 border-khaki-200">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total TTC</span>
            <span className="text-xl font-bold text-khaki-800">{formatCurrency(estimation.totalAmount)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimationBreakdown;
