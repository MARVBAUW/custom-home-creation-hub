
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { PDFExportOptions } from '@/components/common/PDFExporter';

export const generateStandardPDF = (
  title: string,
  data: any,
  content: { [key: string]: any },
  options: PDFExportOptions = {}
): jsPDF => {
  const doc = new jsPDF();
  
  // Set font for the whole document
  doc.setFont('helvetica');
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 102);
  doc.text(title, 105, 20, { align: 'center' });
  
  // Add logo if requested
  if (options.includeLogo) {
    // In a real implementation, you would add the logo image here
    // doc.addImage('/images/logo.png', 'PNG', 10, 10, 30, 15);
    
    // For now, let's add a placeholder
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('PROGINEER', 20, 15);
  }
  
  // Add main content details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  
  let y = 40;
  
  // Add input parameters if requested
  if (options.includeDetails && data) {
    doc.setFontSize(14);
    doc.text('Paramètres', 14, y);
    y += 10;
    
    const inputData = [];
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value !== 'function' && key !== 'result' && key !== 'results') {
        const formattedKey = key.replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .replace(/_/g, ' ');
          
        let displayValue = value;
        if (typeof value === 'number') {
          displayValue = value.toLocaleString('fr-FR');
        } else if (typeof value === 'boolean') {
          displayValue = value ? 'Oui' : 'Non';
        }
        
        inputData.push([formattedKey, displayValue]);
      }
    }
    
    if (inputData.length > 0) {
      (doc as any).autoTable({
        startY: y,
        head: [['Paramètre', 'Valeur']],
        body: inputData,
        theme: 'grid',
        headStyles: {
          fillColor: [230, 230, 230],
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        }
      });
      
      y = (doc as any).lastAutoTable.finalY + 15;
    }
  }
  
  // Add results if requested
  if (options.includeBreakdown && content) {
    doc.setFontSize(14);
    doc.text('Résultats', 14, y);
    y += 10;
    
    const resultData = [];
    
    for (const [key, value] of Object.entries(content)) {
      if (typeof value !== 'object') {
        const formattedKey = key.replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .replace(/_/g, ' ');
          
        let displayValue = value;
        if (typeof value === 'number') {
          displayValue = value.toLocaleString('fr-FR');
          
          // Add euro symbol for monetary values
          if (key.toLowerCase().includes('prix') || 
              key.toLowerCase().includes('budget') || 
              key.toLowerCase().includes('montant') ||
              key.toLowerCase().includes('cout') ||
              key.toLowerCase().includes('coût') ||
              key.toLowerCase().includes('total')) {
            displayValue += ' €';
          }
        }
        
        resultData.push([formattedKey, displayValue]);
      }
    }
    
    if (resultData.length > 0) {
      (doc as any).autoTable({
        startY: y,
        head: [['Résultat', 'Valeur']],
        body: resultData,
        theme: 'grid',
        headStyles: {
          fillColor: [200, 220, 240],
          textColor: [0, 0, 0],
          fontStyle: 'bold'
        }
      });
      
      y = (doc as any).lastAutoTable.finalY + 15;
    }
    
    // Add tables for complex nested results if they exist
    for (const [key, value] of Object.entries(content)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        doc.setFontSize(12);
        
        const formattedKey = key.replace(/([A-Z])/g, ' $1')
          .replace(/^./, str => str.toUpperCase())
          .replace(/_/g, ' ');
          
        doc.text(formattedKey, 14, y);
        y += 8;
        
        const nestedData = [];
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (typeof nestedValue !== 'object') {
            const formattedNestedKey = nestedKey.replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase())
              .replace(/_/g, ' ');
              
            let displayValue = nestedValue;
            if (typeof nestedValue === 'number') {
              displayValue = nestedValue.toLocaleString('fr-FR');
              
              // Add euro symbol for monetary values
              if (nestedKey.toLowerCase().includes('prix') || 
                  nestedKey.toLowerCase().includes('budget') || 
                  nestedKey.toLowerCase().includes('montant') ||
                  nestedKey.toLowerCase().includes('cout') ||
                  nestedKey.toLowerCase().includes('coût') ||
                  nestedKey.toLowerCase().includes('total')) {
                displayValue += ' €';
              }
            }
            
            nestedData.push([formattedNestedKey, displayValue]);
          }
        }
        
        if (nestedData.length > 0) {
          (doc as any).autoTable({
            startY: y,
            head: [['Paramètre', 'Valeur']],
            body: nestedData,
            theme: 'grid',
            headStyles: {
              fillColor: [240, 240, 240],
              textColor: [0, 0, 0],
              fontStyle: 'bold'
            }
          });
          
          y = (doc as any).lastAutoTable.finalY + 15;
        }
      }
    }
  }
  
  // Add contact information if requested
  if (options.includeContactInfo) {
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Progineer - Maître d\'oeuvre en PACA', 105, 280, { align: 'center' });
    doc.text('www.progineer.fr - contact@progineer.fr', 105, 285, { align: 'center' });
  }
  
  // Add footer with page numbers
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      195,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    );
  }
  
  return doc;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(value);
};
