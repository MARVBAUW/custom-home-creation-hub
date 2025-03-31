
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { EstimationResponseData } from './types';
import { formatCurrency } from '@/utils/formatters';

interface EstimationBreakdownProps {
  estimation: EstimationResponseData;
}

const EstimationBreakdown: React.FC<EstimationBreakdownProps> = ({ estimation }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Répartition détaillée des coûts</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Coûts de construction</h4>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Gros œuvre</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.structuralWork)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Second œuvre</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.finishingWork)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Lots techniques</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.technicalLots)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Aménagements extérieurs</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.externalWorks)}</td>
                </tr>
                <tr className="font-medium bg-gray-50">
                  <td className="py-2">Sous-total construction</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.constructionCosts.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Honoraires et études</h4>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Architecte et maîtrise d'œuvre</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.fees.architect)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Bureau d'études techniques</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.fees.technicalStudies)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Autres honoraires</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.fees.other)}</td>
                </tr>
                <tr className="font-medium bg-gray-50">
                  <td className="py-2">Sous-total honoraires</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.fees.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Autres frais</h4>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Assurances</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.otherCosts.insurance)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Taxes et raccordements</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.otherCosts.taxes)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Divers et imprévus</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.otherCosts.contingency)}</td>
                </tr>
                <tr className="font-medium bg-gray-50">
                  <td className="py-2">Sous-total autres frais</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.otherCosts.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="pt-4 border-t-2 border-khaki-200">
            <table className="w-full">
              <tbody>
                <tr className="font-bold text-lg">
                  <td className="py-2">TOTAL GLOBAL</td>
                  <td className="py-2 text-right">{formatCurrency(estimation.totalAmount)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationBreakdown;
