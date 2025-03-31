import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';
import { PDFGenerationOptions } from '../types/pdf-types';

export const generateEstimationPDF = (formData: FormData, estimation: any, options: PDFGenerationOptions = {}) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 51, 102);
  doc.text('Estimation Détaillée', 105, 20, { align: 'center' });
  
  // Add project info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Type de projet: ${formData.projectType || 'Non spécifié'}`, 14, 40);
  doc.text(`Surface: ${formData.surface || 'Non spécifiée'} m²`, 14, 48);
  doc.text(`Localisation: ${formData.city || 'Non spécifiée'}`, 14, 56);
  
  if (options.includeContactInfo && formData.name) {
    doc.text(`Client: ${formData.name}`, 14, 64);
    if (formData.email) doc.text(`Email: ${formData.email}`, 14, 72);
    if (formData.phone) doc.text(`Téléphone: ${formData.phone}`, 14, 80);
  }
  
  // Add estimation total
  doc.setFontSize(16);
  doc.setTextColor(0, 102, 204);
  doc.text('Estimation Totale:', 14, 100);
  doc.text(`${Number(estimation.totalAmount || estimation.totalHT || 0).toLocaleString('fr-FR')} €`, 100, 100);
  
  // Add detailed breakdown if requested
  if (options.includeBreakdown && estimation) {
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Détail par poste', 14, 120);
    
    const tableData = [];
    
    // Construction costs
    if (estimation.constructionCosts) {
      Object.entries(estimation.constructionCosts).forEach(([key, value]: [string, any]) => {
        if (key !== 'total') {
          tableData.push([
            key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            `${Number(value).toLocaleString('fr-FR')} €`
          ]);
        }
      });
    }
    
    // Fees
    if (estimation.fees) {
      Object.entries(estimation.fees).forEach(([key, value]: [string, any]) => {
        if (key !== 'total') {
          tableData.push([
            key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            `${Number(value).toLocaleString('fr-FR')} €`
          ]);
        }
      });
    }
    
    // Other costs
    if (estimation.otherCosts) {
      Object.entries(estimation.otherCosts).forEach(([key, value]: [string, any]) => {
        if (key !== 'total') {
          tableData.push([
            key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            `${Number(value).toLocaleString('fr-FR')} €`
          ]);
        }
      });
    }
    
    // Add corps d'état if available
    if (estimation.corpsEtat) {
      Object.entries(estimation.corpsEtat || {}).forEach(([key, value]: [string, any]) => {
        tableData.push([
          key,
          `${Number(value.montantHT).toLocaleString('fr-FR')} €`
        ]);
      });
    }
    
    // Add the table
    (doc as any).autoTable({
      startY: 125,
      head: [['Poste', 'Montant']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [0, 102, 204],
        textColor: 255,
        fontStyle: 'bold'
      }
    });
  }
  
  // Add footer
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `Estimation générée le ${new Date().toLocaleDateString('fr-FR')} - Page ${i} sur ${pageCount}`,
      doc.internal.pageSize.getWidth() / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    
    // Add disclaimer
    if (i === pageCount) {
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.text(
        'Cette estimation est fournie à titre indicatif et peut varier en fonction des spécificités du projet.',
        doc.internal.pageSize.getWidth() / 2,
        doc.internal.pageSize.getHeight() - 20,
        { align: 'center' }
      );
    }
  }
  
  return doc;
};
