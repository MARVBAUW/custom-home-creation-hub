
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';

interface PDFGeneratorProps {
  formData: FormData;
  estimation: any;
  title?: string;
}

const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  formData,
  estimation,
  title = 'Estimation de votre projet'
}) => {
  const generatePDF = (): jsPDF => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(title, 105, 15, { align: 'center' });
    
    // Add project info
    doc.setFontSize(14);
    doc.text('Informations du projet', 14, 30);
    
    // Create a table with project details
    const projectDetails = [
      ['Type de projet', formData.projectType || 'Non spécifié'],
      ['Surface', `${formData.surface || 0} m²`],
      ['Ville', formData.city || 'Non spécifiée'],
      ['Type de terrain', formData.terrainType || 'Non spécifié']
    ];
    
    doc.autoTable({
      startY: 35,
      head: [['Caractéristique', 'Valeur']],
      body: projectDetails,
    });
    
    // Store the last table's Y position
    const lastTableY = (doc as any).lastAutoTable.finalY;
    
    // Add cost breakdown
    doc.setFontSize(14);
    doc.text('Coûts estimés', 14, lastTableY + 10);
    
    // Generate cost breakdown data
    const costBreakdown = Object.entries(estimation)
      .filter(([key, _]) => key !== 'totalAmount' && key !== 'timeline')
      .map(([key, value]) => [
        key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
        `${value} €`
      ]);
    
    doc.autoTable({
      startY: lastTableY + 15,
      head: [['Poste de dépense', 'Montant estimé (€)']],
      body: costBreakdown,
    });
    
    // Add footer with disclaimer
    const pageCount = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text('Cette estimation est fournie à titre indicatif et peut varier en fonction des détails spécifiques du projet.', 
        105, 285, { align: 'center' });
      doc.text(`Estimation générée le ${new Date().toLocaleDateString()}`, 
        105, 290, { align: 'center' });
    }
    
    return doc;
  };

  const handleDownload = () => {
    const doc = generatePDF();
    
    // Save the PDF directly
    doc.save('estimation-projet.pdf');
  };

  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2"
      onClick={handleDownload}
    >
      <Download className="h-4 w-4" />
      Télécharger en PDF
    </Button>
  );
};

export default PDFGenerator;
