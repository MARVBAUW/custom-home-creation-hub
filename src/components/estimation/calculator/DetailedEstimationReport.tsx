
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
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  
  // Fonction pour générer le PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Titre du document
    doc.setFontSize(20);
    doc.text('Estimation Détaillée du Projet', 14, 20);
    
    // Informations du projet
    doc.setFontSize(12);
    doc.text(`Type de projet: ${formData.projectType}`, 14, 30);
    doc.text(`Surface: ${formData.surface} m²`, 14, 36);
    doc.text(`Localisation: ${formData.city || 'Non spécifiée'}`, 14, 42);
    doc.text(`Finition: ${formData.finishLevel || 'Standard'}`, 14, 48);
    
    // Configuration du tableau
    const columnStyles = {
      0: { fontStyle: 'bold' as const },
      1: { halign: 'right' as const }
    };
    
    const headStyles = {
      fillColor: [242, 242, 242],
      textColor: [51, 51, 51],
      fontStyle: 'bold' as const,
      halign: 'center' as const
    };
    
    // Préparation des données pour le tableau
    const tableBody = tableData.map(item => [item.label, formatPrice(item.amount)]);
    
    // Ajout du tableau
    autoTable(doc, {
      head: [['Poste', 'Montant (€)']],
      body: tableBody,
      columnStyles: columnStyles,
      headStyles: headStyles,
      startY: 60,
    });
    
    // Totaux
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total HT: ${formatPrice(estimation.totalHT)}`, 14, finalY);
    doc.text(`Total TTC: ${formatPrice(estimation.totalTTC)}`, 14, finalY + 10);
    
    // Prix du terrain si inclus
    if (includeTerrainPrice && formData.landPrice) {
      doc.text(`Prix du terrain: ${formatPrice(formData.landPrice)}`, 14, finalY + 20);
      doc.text(`Frais de notaire (estimation): ${formatPrice(estimation.fraisNotaire)}`, 14, finalY + 30);
      doc.text(`Coût total avec terrain: ${formatPrice(estimation.coutTotalAvecTerrain)}`, 14, finalY + 40);
    }
    
    // Footer
    const pageCount = doc.internal.pages.length - 1;
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(40);
      doc.text(`Page ${i} sur ${pageCount}`, doc.internal.pageSize.getWidth() - 35, doc.internal.pageSize.getHeight() - 10);
    }
    
    // Téléchargement du PDF
    doc.save('estimation-detaillee.pdf');
    
    toast({
      title: "PDF téléchargé",
      description: "Votre estimation détaillée a été téléchargée avec succès.",
    });
  };
  
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
              {includeTerrainPrice && formData.landPrice && (
                <>
                  <tr>
                    <td className="py-2 px-4 font-semibold text-right">Prix du terrain</td>
                    <td className="py-2 px-4 font-semibold text-right">{formatPrice(formData.landPrice)}</td>
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
            onClick={generatePDF}
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
