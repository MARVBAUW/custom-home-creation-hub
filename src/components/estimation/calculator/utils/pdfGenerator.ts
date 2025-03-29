import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';

// Function to generate PDF
export const generatePDF = (formData: FormData, estimationData: any) => {
  const doc = new jsPDF();
  const pdfName = `Estimation-${formData.projectType}-${new Date().toLocaleDateString()}.pdf`;
  
  // Set document properties
  doc.setProperties({
    title: 'Estimation Détaillée',
    subject: 'Estimation de projet de construction ou rénovation',
    author: 'Progineer',
    keywords: 'estimation, construction, rénovation'
  });
  
  // Add header
  const logoWidth = 50;
  const logoHeight = 20;
  doc.addImage('/images/logo-progineer.png', 'PNG', 14, 10, logoWidth, logoHeight);
  
  // Add document title
  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.setFont('helvetica', 'bold');
  doc.text('Estimation Détaillée', 105, 20, { align: 'center' });
  
  // Add project details
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text(`Projet: ${formData.projectType || 'N/A'}`, 14, 40);
  doc.text(`Surface: ${formData.surface || 'N/A'} m²`, 14, 48);
  doc.text(`Ville: ${formData.city || 'N/A'}`, 14, 56);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 64);
  
  // Define table columns
  const columns = [
    { header: 'Poste', dataKey: 'poste' },
    { header: 'Montant HT (€)', dataKey: 'montantHT' },
    { header: 'Détails', dataKey: 'details' }
  ];
  
  // Prepare table rows
  const tableRows = Object.entries(estimationData.corpsEtat).map(([poste, details]: [string, any]) => ({
    poste: poste,
    montantHT: details.montantHT ? details.montantHT.toFixed(2) : '0.00',
    details: details.details ? details.details.join(', ') : ''
  }));
  
  // Add table to the document
  (doc as any).autoTable({
    columns: columns,
    body: tableRows,
    startY: 70,
    styles: {
      font: 'helvetica',
      fontSize: 10,
      textColor: 40,
      columnWidth: 'auto',
      overflow: 'linebreak',
      tableWidth: 'auto'
    },
    headerStyles: {
      fillColor: [230, 230, 230],
      textColor: 40,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fillColor: [255, 255, 255]
    },
    columnStyles: {
      poste: { fontStyle: 'bold' }
    }
  });
  
  // Calculate the y position after the table
  let finalY = (doc as any).autoTable.previous.finalY || 70;
  
  // Add totals
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total HT: ${estimationData.totalHT.toFixed(2)} €`, 14, finalY + 15);
  doc.text(`TVA (20%): ${estimationData.vat.toFixed(2)} €`, 14, finalY + 23);
  doc.text(`Total TTC: ${estimationData.totalTTC.toFixed(2)} €`, 14, finalY + 31);
  
  if (formData.landPrice) {
    doc.text(`Prix du terrain: ${estimationData.terrainPrice.toFixed(2)} €`, 14, finalY + 39);
    doc.text(`Frais de notaire (estimation): ${estimationData.fraisNotaire.toFixed(2)} €`, 14, finalY + 47);
    doc.text(`Coût total avec terrain: ${estimationData.coutTotalAvecTerrain.toFixed(2)} €`, 14, finalY + 55);
  }
  
  // Add a new page for additional details
  doc.addPage();
  
  // Add "Additional Details" title
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.setFont('helvetica', 'bold');
  doc.text('Détails Supplémentaires', 105, 20, { align: 'center' });
  
  // Add "Coûts Globaux Estimés" section
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Coûts Globaux Estimés', 14, 35);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Honoraires (10%): ${estimationData.honorairesHT.toFixed(2)} €`, 14, 45);
  doc.text(`Taxe d'aménagement (3%): ${estimationData.taxeAmenagement.toFixed(2)} €`, 14, 53);
  doc.text(`Garantie décennale (1%): ${estimationData.garantieDecennale.toFixed(2)} €`, 14, 61);
  doc.text(`Études géotechniques (0.5%): ${estimationData.etudesGeotechniques.toFixed(2)} €`, 14, 69);
  doc.text(`Étude thermique (0.5%): ${estimationData.etudeThermique.toFixed(2)} €`, 14, 77);
  doc.text(`Coût global HT (estimé): ${estimationData.coutGlobalHT.toFixed(2)} €`, 14, 85);
  doc.text(`Coût global TTC (estimé): ${estimationData.coutGlobalTTC.toFixed(2)} €`, 14, 93);
  
  // Add "Disclaimer" section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Disclaimer', 14, 110);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const disclaimerText = `Cette estimation est fournie à titre indicatif et est basée sur les informations que vous avez fournies. Les coûts réels peuvent varier en fonction des spécificités du projet, des matériaux choisis et des conditions du marché. Pour une estimation précise, veuillez consulter un expert Progineer.`;
  const textLines = doc.splitTextToSize(disclaimerText, 190);
  doc.text(textLines, 14, 120);
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'normal');
    
    // Add page number
    const pageText = `Page ${i} sur ${pageCount}`;
    doc.text(pageText, 190, doc.internal.pageSize.height - 10, { align: 'right' });
    
    // Add company info
    const companyInfo = 'Progineer - Estimation de projet';
    doc.text(companyInfo, 14, doc.internal.pageSize.height - 10);
  }
  
  // Save the PDF
  doc.save(pdfName);
  
  return pdfName;
};
