
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from 'lucide-react';
import { generateEstimationPDF } from '../utils/pdfGenerator';
import { EstimationFormData } from '../types';

interface PDFGeneratorProps {
  documentTitle: string;
  data: EstimationFormData | Record<string, any>;
  fileName?: string;
  buttonLabel?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  className?: string;
}

export const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  documentTitle,
  data,
  fileName = 'document',
  buttonLabel = 'Télécharger en PDF',
  variant = 'outline',
  className = '',
}) => {
  const handleGeneratePDF = () => {
    // Create a minimal version of the data for the PDF
    const pdfData = {
      projectType: data.projectType || 'Non spécifié',
      surface: data.surface || 0,
      city: data.city || 'Non spécifiée',
      terrainType: data.terrainType || 'flat',
      clientType: data.clientType || 'individual',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      email: data.email || '',
      phone: data.phone || '',
      landIncluded: data.landIncluded || 'no',
      landPrice: data.landPrice || 0
    };
    
    // Generate the PDF with estimation amount of 150000 as fallback
    const estimationAmount = 150000; // Placeholder estimation
    const pdfBlob = generateEstimationPDF(pdfData, estimationAmount);
    
    // Create a download link
    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.pdf`;
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
  };

  return (
    <Button 
      onClick={handleGeneratePDF} 
      variant={variant} 
      className={className}
    >
      <FileDown className="h-4 w-4 mr-2" />
      {buttonLabel}
    </Button>
  );
};

export default PDFGenerator;
