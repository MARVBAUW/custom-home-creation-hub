
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';
import { formatPrice } from './index';

// Function to generate the PDF document
export const generatePDF = (formData: FormData, estimation: any) => {
  // Initialize jsPDF
  const doc = new jsPDF();

  // Define document margins
  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
  };

  // Add Progineer logo header
  const addHeader = (doc: jsPDF) => {
    doc.setFontSize(18);
    doc.setTextColor(212, 175, 55); // Gold color
    doc.text("PROGINEER", margin.left, margin.top);
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text("Maîtrise d'œuvre & Architecture", margin.left, margin.top + 7);
    
    doc.setFontSize(10);
    doc.setDrawColor(212, 175, 55);
    doc.line(margin.left, margin.top + 10, doc.internal.pageSize.getWidth() - margin.right, margin.top + 10);
  };

  // Function to add a footer to each page
  const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`PROGINEER - Estimation de projet - Page ${pageNumber}/${totalPages}`, margin.left, doc.internal.pageSize.height - margin.bottom);
    doc.text("www.progineer.fr | contact@progineer.fr | 04 XX XX XX XX", doc.internal.pageSize.getWidth() - margin.right, doc.internal.pageSize.height - margin.bottom, { align: 'right' });
    
    doc.setDrawColor(212, 175, 55);
    doc.line(margin.left, doc.internal.pageSize.height - margin.bottom - 5, doc.internal.pageSize.getWidth() - margin.right, doc.internal.pageSize.height - margin.bottom - 5);
  };

  // Add header to the first page
  addHeader(doc);
  
  // Title of the document
  doc.setFontSize(16);
  doc.setTextColor(40);
  doc.setFont('helvetica', 'bold');
  const titleText = "Estimation Détaillée de Projet";
  const titleWidth = doc.getTextWidth(titleText);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(titleText, titleX, margin.top + 25);

  // Subtitle with project type
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  const projectType = formData.projectType || 'Construction';
  const subtitleText = `${projectType} - ${formData.city || 'Non spécifié'}`;
  const subtitleWidth = doc.getTextWidth(subtitleText);
  const subtitleX = (pageWidth - subtitleWidth) / 2;
  doc.text(subtitleText, subtitleX, margin.top + 35);

  // Reference number and date
  doc.setFontSize(10);
  const today = new Date().toLocaleDateString('fr-FR');
  const refNumber = `REF-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  
  doc.text(`Référence: ${refNumber}`, margin.left, margin.top + 50);
  doc.text(`Date: ${today}`, margin.left, margin.top + 58);
  
  // Client information if available
  let clientInfoY = margin.top + 70;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("Informations Client", margin.left, clientInfoY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  clientInfoY += 10;
  if (formData.firstName || formData.lastName) {
    doc.text(`Nom: ${formData.firstName || ''} ${formData.lastName || ''}`, margin.left, clientInfoY);
    clientInfoY += 7;
  }
  
  if (formData.email) {
    doc.text(`Email: ${formData.email}`, margin.left, clientInfoY);
    clientInfoY += 7;
  }
  
  if (formData.phone) {
    doc.text(`Téléphone: ${formData.phone}`, margin.left, clientInfoY);
    clientInfoY += 7;
  }
  
  if (formData.clientType) {
    doc.text(`Type de client: ${formData.clientType}`, margin.left, clientInfoY);
    clientInfoY += 7;
  }

  // Project details
  clientInfoY += 5;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("Détails du Projet", margin.left, clientInfoY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  clientInfoY += 10;
  doc.text(`Type de projet: ${formData.projectType || 'Non spécifié'}`, margin.left, clientInfoY);
  clientInfoY += 7;
  
  if (formData.surface) {
    doc.text(`Surface: ${formData.surface} m²`, margin.left, clientInfoY);
    clientInfoY += 7;
  }
  
  if (formData.city) {
    doc.text(`Localisation: ${formData.city}`, margin.left, clientInfoY);
    clientInfoY += 7;
  }
  
  if (formData.finishLevel) {
    doc.text(`Niveau de finition: ${formData.finishLevel}`, margin.left, clientInfoY);
    clientInfoY += 7;
  }
  
  if (formData.constructionType) {
    doc.text(`Type de construction: ${formData.constructionType}`, margin.left, clientInfoY);
    clientInfoY += 7;
  }

  // Summary of the estimation
  clientInfoY += 7;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text("Récapitulatif de l'Estimation", margin.left, clientInfoY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  clientInfoY += 10;
  doc.text(`Coût total HT: ${formatPrice(estimation.totalHT)}`, margin.left, clientInfoY);
  clientInfoY += 7;
  
  doc.text(`TVA (20%): ${formatPrice(estimation.vat || estimation.totalHT * 0.2)}`, margin.left, clientInfoY);
  clientInfoY += 7;
  
  doc.text(`Coût total TTC: ${formatPrice(estimation.totalTTC)}`, margin.left, clientInfoY);
  clientInfoY += 7;
  
  doc.text(`Honoraires MOE: ${formatPrice(estimation.honorairesHT)}`, margin.left, clientInfoY);
  clientInfoY += 7;
  
  doc.text(`Taxe d'aménagement: ${formatPrice(estimation.taxeAmenagement)}`, margin.left, clientInfoY);
  clientInfoY += 7;
  
  doc.text(`Coût global (hors terrain): ${formatPrice(estimation.coutGlobalTTC)}`, margin.left, clientInfoY);
  clientInfoY += 10;
  
  // Land price and notary fees - This is the part that was missing
  if (formData.landPrice && formData.landPrice > 0) {
    doc.setFillColor(245, 245, 245);
    doc.rect(margin.left, clientInfoY, pageWidth - margin.left - margin.right, 25, 'F');
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text("Terrain et Frais Associés", margin.left + 4, clientInfoY + 7);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    doc.text(`Prix du terrain: ${formatPrice(formData.landPrice)}`, margin.left + 4, clientInfoY + 14);
    
    const notaryFees = formData.landPrice * 0.08; // Assuming 8% notary fees
    doc.text(`Frais de notaire (8%): ${formatPrice(notaryFees)}`, margin.left + 4, clientInfoY + 21);
    
    clientInfoY += 30;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    const totalWithLand = estimation.coutGlobalTTC + formData.landPrice + notaryFees;
    doc.text(`Coût global avec terrain: ${formatPrice(totalWithLand)}`, margin.left, clientInfoY);
    clientInfoY += 10;
  }

  // Add a new page for the detailed breakdown
  doc.addPage();
  addHeader(doc);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("Détail par Corps d'État", margin.left, margin.top + 20);
  doc.setFont('helvetica', 'normal');

  // Set up data for the table
  const tableData = [];
  let totalAmount = 0;

  // Iterate through corps d'état to build the table data
  if (estimation.corpsEtat) {
    for (const [name, data] of Object.entries(estimation.corpsEtat as Record<string, any>)) {
      const amount = data.montantHT;
      totalAmount += amount;
      const percentage = ((amount / estimation.totalHT) * 100).toFixed(1);
      
      tableData.push([
        name,
        `${formatPrice(amount)}`,
        `${percentage}%`,
        data.details ? data.details.join(', ') : ''
      ]);
    }
  }

  // Add auto table
  (doc as any).autoTable({
    startY: margin.top + 30,
    head: [['Corps d\'État', 'Montant HT', 'Pourcentage', 'Détails']],
    body: tableData,
    headStyles: { 
      fillColor: [212, 175, 55],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { halign: 'right' },
      2: { halign: 'center' }
    },
    margin: margin,
    didDrawPage: function(data: any) {
      // Add footer to each page
      addFooter(doc, doc.internal.getCurrentPageInfo().pageNumber, 2);
    }
  });

  // Annexes costs on the same page if there's room, or on a new page
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  
  if (finalY > doc.internal.pageSize.getHeight() - 100) {
    doc.addPage();
    addHeader(doc);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Coûts Annexes", margin.left, margin.top + 20);
    doc.setFont('helvetica', 'normal');
    
    const annexTableY = margin.top + 30;
    
    // Table with annexes costs
    const annexData = [
      ['Honoraires MOE', formatPrice(estimation.honorairesHT)],
      ['Taxe d\'aménagement', formatPrice(estimation.taxeAmenagement)],
      ['Études géotechniques', formatPrice(estimation.etudesGeotechniques || 0)],
      ['Étude thermique', formatPrice(estimation.etudeThermique || 0)],
      ['Garantie décennale', formatPrice(estimation.garantieDecennale || 0)]
    ];
    
    // Add land price and notary fees to annex costs if present
    if (formData.landPrice && formData.landPrice > 0) {
      annexData.push(['Prix du terrain', formatPrice(formData.landPrice)]);
      const notaryFees = formData.landPrice * 0.08;
      annexData.push(['Frais de notaire (8%)', formatPrice(notaryFees)]);
    }
    
    (doc as any).autoTable({
      startY: annexTableY,
      head: [['Description', 'Montant']],
      body: annexData,
      headStyles: { 
        fillColor: [212, 175, 55],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { halign: 'right' }
      },
      margin: margin
    });
  } else {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text("Coûts Annexes", margin.left, finalY);
    doc.setFont('helvetica', 'normal');
    
    // Table with annexes costs
    const annexData = [
      ['Honoraires MOE', formatPrice(estimation.honorairesHT)],
      ['Taxe d\'aménagement', formatPrice(estimation.taxeAmenagement)],
      ['Études géotechniques', formatPrice(estimation.etudesGeotechniques || 0)],
      ['Étude thermique', formatPrice(estimation.etudeThermique || 0)],
      ['Garantie décennale', formatPrice(estimation.garantieDecennale || 0)]
    ];
    
    // Add land price and notary fees to annex costs if present
    if (formData.landPrice && formData.landPrice > 0) {
      annexData.push(['Prix du terrain', formatPrice(formData.landPrice)]);
      const notaryFees = formData.landPrice * 0.08;
      annexData.push(['Frais de notaire (8%)', formatPrice(notaryFees)]);
    }
    
    (doc as any).autoTable({
      startY: finalY + 10,
      head: [['Description', 'Montant']],
      body: annexData,
      headStyles: { 
        fillColor: [212, 175, 55],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { halign: 'right' }
      },
      margin: margin
    });
  }

  // Add footer to the first page
  addFooter(doc, 1, doc.internal.getNumberOfPages());

  // Final disclaimer
  doc.setFontSize(8);
  doc.setTextColor(100);
  doc.text("Cette estimation est fournie à titre indicatif et pourrait varier selon les spécificités de votre projet.", margin.left, doc.internal.pageSize.height - margin.bottom - 12, { maxWidth: pageWidth - margin.left - margin.right });
  doc.text("Elle sera affinée lors d'un rendez-vous avec nos experts Progineer.", margin.left, doc.internal.pageSize.height - margin.bottom - 8, { maxWidth: pageWidth - margin.left - margin.right });

  // Save the PDF with a meaningful filename
  const pdfName = `Estimation_${projectType}_${formData.surface || ''}m2_${today.replace(/\//g, '-')}.pdf`;
  doc.save(pdfName);
  
  return pdfName;
};

// Add a helper function to format prices
export const formatPrice = (price: number | string) => {
  if (typeof price === 'string') {
    price = parseFloat(price);
  }
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(price || 0);
};
