
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { FormData, EstimationResponseData, PDFGenerationOptions } from './types';
import { formatCurrency } from '@/utils/formatters';

// Add the autoTable method type to jsPDF
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
    internal: {
      getNumberOfPages: () => number;
    };
  }
}

interface EstimationPDFExportProps {
  formData: FormData;
  estimationResult: EstimationResponseData | number;
  title?: string;
}

const EstimationPDFExport: React.FC<EstimationPDFExportProps> = ({
  formData,
  estimationResult,
  title = 'Estimation de votre projet'
}) => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(title, 105, 15, { align: 'center' });
    
    // Add project info
    doc.setFontSize(14);
    doc.text('Informations du projet', 14, 30);
    
    // Ensure estimationResult is in the right format
    const result = typeof estimationResult === 'number' 
      ? {
          totalAmount: estimationResult,
          constructionCosts: { 
            structuralWork: estimationResult * 0.3,
            finishingWork: estimationResult * 0.3,
            technicalLots: estimationResult * 0.2,
            externalWorks: estimationResult * 0.1,
            total: estimationResult * 0.9
          },
          fees: {
            total: estimationResult * 0.1,
            architect: estimationResult * 0.05,
            technicalStudies: estimationResult * 0.025,
            other: estimationResult * 0.015,
            architectFees: estimationResult * 0.05,
            engineeringFees: estimationResult * 0.025,
            officialFees: estimationResult * 0.015,
            inspectionFees: estimationResult * 0.01
          },
          otherCosts: {
            total: estimationResult * 0.05,
            insurance: estimationResult * 0.02,
            contingency: estimationResult * 0.02,
            taxes: estimationResult * 0.005,
            miscellaneous: estimationResult * 0.005
          },
          timeline: {
            design: 2,
            permits: 3,
            bidding: 1,
            construction: 8,
            total: 14
          }
        }
      : estimationResult;
    
    // Create a table with project details
    const projectDetails = [
      ['Type de projet', formData.projectType || 'Non spécifié'],
      ['Surface', `${formData.surface || 0} m²`],
      ['Ville', formData.city || 'Non spécifiée'],
      ['Type de terrain', formData.terrainType || 'Non spécifié'],
      ['Complexité', formData.complexity || 'Standard'],
      ['Standard de qualité', formData.qualityStandard || 'Standard']
    ];
    
    doc.autoTable({
      startY: 35,
      head: [['Caractéristique', 'Valeur']],
      body: projectDetails,
    });
    
    // Add cost breakdown
    doc.setFontSize(14);
    doc.text('Coûts estimés', 14, doc.lastAutoTable.finalY + 10);
    
    const costBreakdown = [
      ['Gros œuvre', formatCurrency(result.constructionCosts.structuralWork)],
      ['Second œuvre', formatCurrency(result.constructionCosts.finishingWork)],
      ['Lots techniques', formatCurrency(result.constructionCosts.technicalLots)],
      ['Aménagements extérieurs', formatCurrency(result.constructionCosts.externalWorks)],
      ['Honoraires et études', formatCurrency(result.fees.total)],
      ['Autres frais', formatCurrency(result.otherCosts.total)],
      ['TOTAL', formatCurrency(result.totalAmount)],
    ];
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Poste de dépense', 'Montant estimé (€)']],
      body: costBreakdown,
    });
    
    // Add timeline
    doc.setFontSize(14);
    doc.text('Calendrier prévisionnel', 14, doc.lastAutoTable.finalY + 10);
    
    const timelineData = [
      ['Conception et études', `${result.timeline.design} mois`],
      ['Autorisations administratives', `${result.timeline.permits} mois`],
      ['Consultation des entreprises', `${result.timeline.bidding} mois`],
      ['Travaux', `${result.timeline.construction} mois`],
      ['Durée totale', `${result.timeline.total} mois`],
    ];
    
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [['Phase', 'Durée estimée']],
      body: timelineData,
    });
    
    // Add footer with disclaimer and date
    const pageCount = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text('Cette estimation est fournie à titre indicatif et peut varier en fonction des détails spécifiques du projet.', 105, 285, {
        align: 'center'
      });
      doc.text(`Estimation générée le ${new Date().toLocaleDateString()}`, 105, 290, {
        align: 'center'
      });
    }
    
    // Save the PDF
    doc.save('estimation-projet.pdf');
  };

  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2"
      onClick={handleExportPDF}
    >
      <Download className="h-4 w-4" />
      Télécharger en PDF
    </Button>
  );
};

export default EstimationPDFExport;
