
import React from 'react';
import { FormData } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { formatPrice } from './utils';
import Logo from '@/components/common/Logo';
import { Separator } from '@/components/ui/separator';
import { generateEstimationPDF } from './utils/pdfGenerator';

interface EstimationReportProps {
  estimation: any;
  formData: FormData;
  includeTerrainPrice: boolean;
}

const DetailedEstimationReport: React.FC<EstimationReportProps> = ({
  estimation,
  formData,
  includeTerrainPrice
}) => {
  const { toast } = useToast();
  
  // Préparer les données pour le tableau
  const tableData = [
    { label: 'Terrassement', amount: estimation.terrassement },
    { label: 'Fondations', amount: estimation.fondations },
    { label: 'Élévation des murs', amount: estimation.elevationMurs },
    { label: 'Charpente', amount: estimation.charpente },
    { label: 'Couverture', amount: estimation.couverture },
    { label: 'Menuiseries extérieures', amount: estimation.menuiseriesExterieures },
    { label: 'Isolation', amount: estimation.isolation },
    { label: 'Plomberie', amount: estimation.plomberie },
    { label: 'Électricité', amount: estimation.electricite },
    { label: 'Chauffage', amount: estimation.chauffage },
    { label: 'Revêtements de sol', amount: estimation.revetementSol },
    { label: 'Revêtements muraux', amount: estimation.revetementMural },
    { label: 'Peinture', amount: estimation.peinture },
    { label: 'Aménagements extérieurs', amount: estimation.amenagementsExterieurs },
    { label: 'Frais annexes', amount: estimation.fraisAnnexes },
    { label: 'Honoraires architecte', amount: estimation.honorairesArchitecte },
    { label: 'Taxe aménagement', amount: estimation.taxeAmenagement },
    { label: 'Études géotechniques', amount: estimation.etudesGeotechniques },
    { label: 'Étude thermique', amount: estimation.etudeThermique },
    { label: 'Garantie décennale', amount: estimation.garantieDecennale },
  ];
  
  // Helper function to parse values to numbers
  const parseToNumber = (value: any): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };
  
  // Fonction pour générer le PDF
  const handleGeneratePDF = () => {
    try {
      // Prepare combined estimation data with all necessary fields for PDF generation
      const estimationData = {
        ...estimation,
        // Add calculated fields
        vat: parseToNumber(estimation.totalHT) * 0.2,
        honorairesHT: parseToNumber(estimation.totalHT) * 0.1,
        coutGlobalHT: parseToNumber(estimation.totalHT) * 1.15,
        coutGlobalTTC: parseToNumber(estimation.totalHT) * 1.15 * 1.2,
        terrainPrice: parseToNumber(formData.landPrice) || 0,
        fraisNotaire: parseToNumber(formData.landPrice) ? parseToNumber(formData.landPrice) * 0.08 : 0,
        coutTotalAvecTerrain: parseToNumber(estimation.totalTTC) + parseToNumber(formData.landPrice) + 
                             (parseToNumber(formData.landPrice) ? parseToNumber(formData.landPrice) * 0.08 : 0),
        // Convert array format to corpsEtat object format needed for PDF
        corpsEtat: tableData.reduce((acc, item) => ({
          ...acc,
          [item.label]: {
            montantHT: item.amount,
            details: [formData.projectType || '', `Surface: ${formData.surface || 0} m²`].filter(Boolean)
          }
        }), {})
      };
      
      const pdfName = generateEstimationPDF(formData, parseToNumber(estimationData.totalHT), includeTerrainPrice);
      
      toast({
        title: "PDF téléchargé",
        description: `Votre estimation détaillée a été téléchargée sous le nom "${pdfName}"`,
      });
    } catch (error) {
      console.error("Erreur lors de la génération du PDF:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la génération du PDF.",
        variant: "destructive"
      });
    }
  };
  
  // Parse landPrice to number
  const landPriceValue = parseToNumber(formData.landPrice);

  return (
    <Card className="w-full border shadow-md">
      <CardContent className="p-6">
        <ScrollArea className="h-[500px]">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">Détails du projet</h3>
              <div className="text-sm text-gray-500">
                {formData.projectType} - {formData.surface} m²
              </div>
            </div>
            <div className="text-right">
              <Logo variant="default" />
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left font-semibold text-gray-700">Poste</th>
                <th className="py-2 px-4 text-right font-semibold text-gray-700">Montant (€)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-2 px-4">{item.label}</td>
                  <td className="py-2 px-4 text-right">{formatPrice(item.amount)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="py-2 px-4 font-semibold text-right">Total HT</td>
                <td className="py-2 px-4 font-semibold text-right">{formatPrice(estimation.totalHT)}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-semibold text-right">Total TTC</td>
                <td className="py-2 px-4 font-semibold text-right">{formatPrice(estimation.totalTTC)}</td>
              </tr>
              {includeTerrainPrice && landPriceValue > 0 && (
                <>
                  <tr className="bg-gray-100">
                    <td className="py-2 px-4 font-semibold text-left" colSpan={2}>Terrain et frais associés</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-right">Prix du terrain</td>
                    <td className="py-2 px-4 font-semibold text-right">{formatPrice(landPriceValue)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-right">Frais de notaire (estimation)</td>
                    <td className="py-2 px-4 font-semibold text-right">{formatPrice(estimation.fraisNotaire)}</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-4 font-bold text-right">Coût total avec terrain</td>
                    <td className="py-2 px-4 font-bold text-right">{formatPrice(estimation.coutTotalAvecTerrain)}</td>
                  </tr>
                </>
              )}
            </tfoot>
          </table>
        </ScrollArea>
        
        <Separator className="my-4" />
        
        <div className="text-center">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleGeneratePDF}
          >
            <FileText className="h-4 w-4" />
            Télécharger PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedEstimationReport;
