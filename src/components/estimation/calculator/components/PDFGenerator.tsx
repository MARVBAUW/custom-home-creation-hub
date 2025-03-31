
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
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
    generatePDF(documentTitle, data, fileName);
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
