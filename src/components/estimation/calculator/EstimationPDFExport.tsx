
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { FormData, EstimationResponseData } from '../types';
import { formatCurrency } from '@/utils/formatters';
import logo from '@/assets/images/progineer-logo.png';

interface EstimationPDFExportProps {
  formData: FormData;
  estimation: EstimationResponseData;
  isGenerating?: boolean;
}

const EstimationPDFExport: React.FC<EstimationPDFExportProps> = ({
  formData,
  estimation,
  isGenerating = false
}) => {
  const handleExportPDF = async () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();
    
    try {
      // Add logo
      const logoWidth = 50;
      doc.addImage(logo, 'PNG', (doc.internal.pageSize.width - logoWidth) / 2, 10, logoWidth, logoWidth / 3);
      
      // Add title
      doc.setFontSize(18);
      doc.setTextColor(66, 66, 66);
      doc.text('Estimation de projet', doc.internal.pageSize.width / 2, 40, { align: 'center' });
      
      // Add subtitle
      doc.setFontSize(12);
      doc.text(`Référence: EST-${Date.now().toString().slice(-6)}`, doc.internal.pageSize.width / 2, 48, { align: 'center' });
      doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, doc.internal.pageSize.width / 2, 54, { align: 'center' });
      
      // Project details
      doc.setFontSize(14);
      doc.setTextColor(88, 80, 55); // Khaki color
      doc.text('Détails du projet', 14, 70);
      
      doc.setFontSize(10);
      doc.setTextColor(66, 66, 66);
      
      // Project details table
      autoTable(doc, {
        startY: 75,
        head: [['Caractéristique', 'Valeur']],
        body: [
          ['Type de projet', formData.projectType || 'Non spécifié'],
          ['Surface', `${formData.surface || 0} m²`],
          ['Ville', formData.city || 'Non spécifiée'],
          ['Type de terrain', formData.landType || 'Non spécifié'],
          ['Complexité', formData.complexity || 'Standard'],
          ['Standard de qualité', formData.qualityStandard || 'Standard'],
        ],
        headStyles: { fillColor: [88, 80, 55], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });
      
      // Estimation results
      doc.setFontSize(14);
      doc.setTextColor(88, 80, 55);
      doc.text('Résultats de l\'estimation', 14, doc.autoTable.previous.finalY + 15);
      
      // Cost breakdown table
      autoTable(doc, {
        startY: doc.autoTable.previous.finalY + 20,
        head: [['Poste de dépense', 'Montant estimé (€)']],
        body: [
          ['Gros œuvre', formatCurrency(estimation.constructionCosts.structuralWork)],
          ['Second œuvre', formatCurrency(estimation.constructionCosts.finishingWork)],
          ['Lots techniques', formatCurrency(estimation.constructionCosts.technicalLots)],
          ['Aménagements extérieurs', formatCurrency(estimation.constructionCosts.externalWorks)],
          ['Honoraires et études', formatCurrency(estimation.fees.total)],
          ['Autres frais', formatCurrency(estimation.otherCosts.total)],
        ],
        foot: [['TOTAL GLOBAL', formatCurrency(estimation.totalAmount)]],
        headStyles: { fillColor: [88, 80, 55], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        footStyles: { fillColor: [66, 66, 66], textColor: [255, 255, 255] },
      });
      
      // Timeline
      doc.setFontSize(14);
      doc.setTextColor(88, 80, 55);
      doc.text('Calendrier prévisionnel', 14, doc.autoTable.previous.finalY + 15);
      
      // Timeline table
      autoTable(doc, {
        startY: doc.autoTable.previous.finalY + 20,
        head: [['Phase', 'Durée estimée']],
        body: [
          ['Conception et études', `${estimation.timeline.design} mois`],
          ['Autorisations administratives', `${estimation.timeline.permits} mois`],
          ['Consultation des entreprises', `${estimation.timeline.bidding} mois`],
          ['Travaux', `${estimation.timeline.construction} mois`],
        ],
        foot: [['DURÉE TOTALE', `${estimation.timeline.total} mois`]],
        headStyles: { fillColor: [88, 80, 55], textColor: [255, 255, 255] },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        footStyles: { fillColor: [66, 66, 66], textColor: [255, 255, 255] },
      });
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          'Document généré par Progineer - Cette estimation est fournie à titre indicatif et peut varier selon les spécificités du projet.',
          doc.internal.pageSize.width / 2,
          doc.internal.pageSize.height - 10,
          { align: 'center' }
        );
        doc.text(
          `Page ${i} sur ${pageCount}`,
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 5
        );
      }
      
      // Save PDF
      doc.save(`Estimation_Progineer_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    }
  };

  return (
    <Button
      onClick={handleExportPDF}
      className="w-full bg-khaki-600 hover:bg-khaki-700 text-white"
      disabled={isGenerating}
    >
      <Download className="h-4 w-4 mr-2" />
      Exporter en PDF
    </Button>
  );
};

export default EstimationPDFExport;
