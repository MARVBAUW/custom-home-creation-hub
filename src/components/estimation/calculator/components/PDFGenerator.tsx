
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download, FileText } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';
import { generateEstimationPDF } from '../utils/pdfGenerator';

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
  const handleDownload = () => {
    // Use the enhanced PDF generator from the utility file
    const doc = generateEstimationPDF(formData, estimation, {
      includeBreakdown: true,
      includeContactInfo: !!formData.name,
      includeLogo: true,
      includeTimeline: !!estimation.timeline
    });
    
    // Save the PDF
    doc.save('estimation-projet-progineer.pdf');
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
