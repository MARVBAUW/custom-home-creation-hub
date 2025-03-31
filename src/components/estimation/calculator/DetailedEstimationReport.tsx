import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormData } from './types';
import { PDFGenerationOptions } from './types/pdf-types';
import { generateEstimationPDF } from './utils/pdfGenerator';
import { Download, Printer } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface DetailedEstimationReportProps {
  formData: FormData;
  estimation: any;
  includeTerrainPrice?: boolean;
  options?: PDFGenerationOptions;
}

const DetailedEstimationReport: React.FC<DetailedEstimationReportProps> = ({
  formData,
  estimation,
  includeTerrainPrice = false,
  options = {}
}) => {
  const handleDownloadPDF = () => {
    const doc = generateEstimationPDF(formData, estimation, {
      ...options,
      includeTerrainPrice,
      fileName: `Estimation_${formData.projectType || 'projet'}_${new Date().toISOString().split('T')[0]}.pdf`
    });
    doc.save(`Estimation_${formData.projectType || 'projet'}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handlePrint = () => {
    const doc = generateEstimationPDF(formData, estimation, {
      ...options,
      includeTerrainPrice
    });
    doc.autoPrint();
    doc.output('dataurlnewwindow');
  };

  // Calculate total with terrain if needed
  const totalWithTerrain = includeTerrainPrice && formData.landPrice
    ? estimation.totalAmount + Number(formData.landPrice)
    : estimation.totalAmount;

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Estimation détaillée</h2>
              <p className="text-sm text-gray-500">
                Projet: {formData.projectType || 'Construction'} {formData.surface && `de ${formData.surface}m²`}
              </p>
              {formData.city && (
                <p className="text-sm text-gray-500">Localisation: {formData.city}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-1">
                <Printer className="h-4 w-4" />
                Imprimer
              </Button>
              <Button variant="default" size="sm" onClick={handleDownloadPDF} className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Télécharger PDF
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Résumé des coûts */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Résumé des coûts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="flex justify-between text-sm">
                    <span>Coût de construction HT:</span>
                    <span>{formatCurrency(estimation.totalAmount)}</span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span>TVA (20%):</span>
                    <span>{formatCurrency(estimation.totalAmount * 0.2)}</span>
                  </p>
                  <p className="flex justify-between text-sm font-medium">
                    <span>Coût de construction TTC:</span>
                    <span>{formatCurrency(estimation.totalAmount * 1.2)}</span>
                  </p>
                  {includeTerrainPrice && formData.landPrice && (
                    <p className="flex justify-between text-sm">
                      <span>Prix du terrain:</span>
                      <span>{formatCurrency(Number(formData.landPrice))}</span>
                    </p>
                  )}
                </div>
                <div>
                  <p className="flex justify-between text-sm">
                    <span>Honoraires et frais:</span>
                    <span>{formatCurrency(estimation.fees?.total || 0)}</span>
                  </p>
                  <p className="flex justify-between text-sm">
                    <span>Autres coûts:</span>
                    <span>{formatCurrency(estimation.otherCosts?.total || 0)}</span>
                  </p>
                  <div className="border-t mt-2 pt-2">
                    <p className="flex justify-between font-bold">
                      <span>TOTAL PROJET:</span>
                      <span>{formatCurrency(totalWithTerrain)}</span>
                    </p>
                    <p className="flex justify-between font-bold">
                      <span>TOTAL PROJET TTC:</span>
                      <span>{formatCurrency(totalWithTerrain * 1.2)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Détail des coûts de construction */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Détail des coûts de construction</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Poste
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant HT
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Gros œuvre
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.constructionCosts?.structuralWork || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {Math.round((estimation.constructionCosts?.structuralWork / estimation.totalAmount) * 100)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Second œuvre
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.constructionCosts?.finishingWork || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {Math.round((estimation.constructionCosts?.finishingWork / estimation.totalAmount) * 100)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Lots techniques
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.constructionCosts?.technicalLots || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {Math.round((estimation.constructionCosts?.technicalLots / estimation.totalAmount) * 100)}%
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Aménagements extérieurs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.constructionCosts?.externalWorks || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {Math.round((estimation.constructionCosts?.externalWorks / estimation.totalAmount) * 100)}%
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        TOTAL CONSTRUCTION
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        {formatCurrency(estimation.constructionCosts?.total || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        100%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Honoraires et frais */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Honoraires et frais</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Poste
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant HT
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Honoraires d'architecte
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.fees?.architect || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Honoraires d'ingénierie
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.fees?.engineeringFees || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Frais administratifs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.fees?.officialFees || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Frais de contrôle
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.fees?.inspectionFees || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Études techniques
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.fees?.technicalStudies || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Autres frais
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.fees?.other || 0)}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        TOTAL HONORAIRES
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        {formatCurrency(estimation.fees?.total || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Autres coûts */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Autres coûts</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Poste
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant HT
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Assurances
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.otherCosts?.insurance || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Imprévus
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.otherCosts?.contingency || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Taxes
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.otherCosts?.taxes || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Divers
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatCurrency(estimation.otherCosts?.miscellaneous || 0)}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                        TOTAL AUTRES COÛTS
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                        {formatCurrency(estimation.otherCosts?.total || 0)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Planning prévisionnel */}
            {estimation.timeline && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Planning prévisionnel</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phase
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Durée (mois)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Conception
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {estimation.timeline.design}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Permis de construire
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {estimation.timeline.permits}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Appel d'offres
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {estimation.timeline.bidding}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Construction
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {estimation.timeline.construction}
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          DURÉE TOTALE
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                          {estimation.timeline.total}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-xs text-gray-500 mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium mb-1">Note importante:</p>
              <p>Cette estimation est fournie à titre indicatif et peut varier en fonction des spécificités du projet, des contraintes du terrain, des choix de matériaux et des finitions. Pour une estimation précise, nous vous recommandons de consulter un professionnel Progineer.</p>
              <p className="mt-1">Les prix indiqués sont hors taxes et basés sur les coûts moyens du marché à la date du {new Date().toLocaleDateString()}.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedEstimationReport;
