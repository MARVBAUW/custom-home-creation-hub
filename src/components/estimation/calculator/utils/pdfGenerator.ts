
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';
import { PDFGenerationOptions } from '../types/pdf-types';

export const generateEstimationPDF = (formData: FormData, estimation: any, options: PDFGenerationOptions = {}) => {
  const doc = new jsPDF();
  
  doc.text('Estimation Details', 10, 10);
  
  return doc;
};
