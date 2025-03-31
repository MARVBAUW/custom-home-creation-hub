
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormData } from '../types';
import { ExtendedJsPDF, PDFGenerationOptions } from '../types/pdf-types';

/**
 * Generates a PDF estimation report for the user
 */
export const generateEstimationPDF = (
  formData: FormData,
  estimationAmount: number,
  options: PDFGenerationOptions = {}
): Blob => {
  // Create a new PDF document
  const doc = new jsPDF() as ExtendedJsPDF;
  
  // Default options
  const defaultOptions: PDFGenerationOptions = {
    includeTerrainPrice: true,
    includeTimeline: true,
    includeDetailedBreakdown: true,
    clientInfo: true,
    companyLogo: true,
    fileName: 'estimation-progineer.pdf'
  };
  
  // Merge options
  const pdfOptions = { ...defaultOptions, ...options };
  
  // Add header with company name/logo
  if (pdfOptions.companyLogo) {
    // Here we'd usually add the logo image
    // doc.addImage(logoBase64, 'PNG', 10, 10, 40, 20);
    
    // For now we'll just add the company name
    doc.setFontSize(20);
    doc.setTextColor(120, 115, 70); // Progineer gold
    doc.text('PROGINEER', 10, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Estimation de projet', 10, 30);
    
    doc.setDrawColor(120, 115, 70);
    doc.line(10, 35, 200, 35);
  }
  
  // Add project information
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('Informations du projet', 10, 50);
  
  // Project details table
  autoTable(doc, {
    startY: 55,
    head: [['Caractéristique', 'Valeur']],
    body: [
      ['Type de projet', formData.projectType || 'Non spécifié'],
      ['Surface', formData.surface ? `${formData.surface} m²` : 'Non spécifiée'],
      ['Ville', formData.city || 'Non spécifiée'],
      ['Type de terrain', formData.terrainType ? (formData.terrainType === 'flat' ? 'Terrain plat' : 'Terrain en pente') : 'Non spécifié'],
      ['Niveau de finition', formData.finishStandard ? {
        'basic': 'Basique',
        'standard': 'Standard',
        'premium': 'Premium',
        'luxury': 'Luxe'
      }[formData.finishStandard] : 'Standard']
    ],
    theme: 'grid',
    headStyles: { 
      fillColor: [120, 115, 70],
      textColor: [255, 255, 255]
    },
    styles: {
      fontSize: 10
    }
  });
  
  // If client info is included and available
  if (pdfOptions.clientInfo && (formData.firstName || formData.lastName)) {
    const clientY = doc.lastAutoTable?.finalY || 120;
    
    doc.setFontSize(14);
    doc.text('Informations client', 10, clientY + 10);
    
    autoTable(doc, {
      startY: clientY + 15,
      head: [['Information', 'Valeur']],
      body: [
        ['Nom', `${formData.firstName || ''} ${formData.lastName || ''}`],
        ['Email', formData.email || 'Non spécifié'],
        ['Téléphone', formData.phone || 'Non spécifié']
      ],
      theme: 'grid',
      headStyles: { 
        fillColor: [120, 115, 70],
        textColor: [255, 255, 255]
      },
      styles: {
        fontSize: 10
      }
    });
  }
  
  // Add estimation results
  const estimationY = doc.lastAutoTable?.finalY || 150;
  
  doc.setFontSize(16);
  doc.setTextColor(120, 115, 70);
  doc.text('Estimation du projet', 10, estimationY + 10);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Calculate additional costs
  const vat = estimationAmount * 0.2;
  const totalWithVAT = estimationAmount + vat;
  const pricePerSqm = formData.surface ? Math.round(estimationAmount / formData.surface) : 0;
  
  // Main estimation table
  autoTable(doc, {
    startY: estimationY + 15,
    head: [['Désignation', 'Montant']],
    body: [
      ['Estimation HT', formatCurrency(estimationAmount)],
      ['TVA (20%)', formatCurrency(vat)],
      ['Estimation TTC', formatCurrency(totalWithVAT)],
      ...(pricePerSqm ? [['Prix au m²', `${formatCurrency(pricePerSqm)} / m²`]] : []),
      ...(pdfOptions.includeTerrainPrice && formData.landPrice ? [['Prix du terrain', formatCurrency(formData.landPrice as number)]] : []),
      ...(pdfOptions.includeTerrainPrice && formData.landPrice ? [['Total avec terrain', formatCurrency(totalWithVAT + (formData.landPrice as number))]] : [])
    ],
    theme: 'grid',
    headStyles: { 
      fillColor: [120, 115, 70],
      textColor: [255, 255, 255]
    },
    styles: {
      fontSize: 10
    },
    bodyStyles: {
      fontSize: 12
    },
    foot: [['TOTAL PROJET', formatCurrency(pdfOptions.includeTerrainPrice && formData.landPrice ? 
      totalWithVAT + (formData.landPrice as number) : totalWithVAT)]],
    footStyles: {
      fillColor: [240, 240, 240],
      textColor: [0, 0, 0],
      fontStyle: 'bold',
      fontSize: 12
    }
  });
  
  // If detailed breakdown is requested
  if (pdfOptions.includeDetailedBreakdown) {
    const breakdownY = doc.lastAutoTable?.finalY || 220;
    
    // Check if we need a new page
    if (breakdownY > 240) {
      doc.addPage();
    } else {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Détail par corps d\'état', 10, breakdownY + 10);
    }
    
    // Create a breakdown of costs by category
    const categories = [
      { name: 'Gros œuvre', percentage: 0.25 },
      { name: 'Charpente / Couverture', percentage: 0.15 },
      { name: 'Menuiseries extérieures', percentage: 0.10 },
      { name: 'Plomberie / Sanitaire', percentage: 0.08 },
      { name: 'Électricité', percentage: 0.07 },
      { name: 'Isolation / Cloisons', percentage: 0.08 },
      { name: 'Revêtements sols et murs', percentage: 0.10 },
      { name: 'Menuiseries intérieures', percentage: 0.05 },
      { name: 'Chauffage / Climatisation', percentage: 0.07 },
      { name: 'Peinture', percentage: 0.03 },
      { name: 'Divers / Aménagements', percentage: 0.02 }
    ];
    
    const breakdownData = categories.map(cat => [
      cat.name, 
      formatCurrency(estimationAmount * cat.percentage)
    ]);
    
    autoTable(doc, {
      startY: doc.pageCount > 1 ? 20 : breakdownY + 15,
      head: [['Corps d\'état', 'Montant HT estimé']],
      body: breakdownData,
      theme: 'grid',
      headStyles: { 
        fillColor: [120, 115, 70],
        textColor: [255, 255, 255]
      },
      styles: {
        fontSize: 10
      }
    });
  }
  
  // Add timeline information if requested
  if (pdfOptions.includeTimeline) {
    const timelineY = doc.lastAutoTable?.finalY || 280;
    
    // Check if we need a new page
    if (timelineY > 240) {
      doc.addPage();
    } else {
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Calendrier estimatif', 10, timelineY + 10);
    }
    
    // Timeline data - this would normally be calculated based on project specifics
    const timelineData = [
      ['Études et conception', '1 à 3 mois'],
      ['Permis de construire', '2 à 5 mois'],
      ['Préparation du chantier', '1 mois'],
      ['Fondations et gros œuvre', '2 à 4 mois'],
      ['Charpente et couverture', '1 à 2 mois'],
      ['Second œuvre', '3 à 5 mois'],
      ['Finitions', '1 à 2 mois']
    ];
    
    autoTable(doc, {
      startY: doc.pageCount > 1 ? (doc.lastAutoTable?.finalY || 20) + 10 : timelineY + 15,
      head: [['Phase', 'Durée estimée']],
      body: timelineData,
      theme: 'grid',
      headStyles: { 
        fillColor: [120, 115, 70],
        textColor: [255, 255, 255]
      },
      styles: {
        fontSize: 10
      }
    });
  }
  
  // Add footer with disclaimer
  // Get total number of pages to add footer to each page
  const pageCount = doc.getNumberOfPages();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Cette estimation est fournie à titre indicatif et peut varier en fonction des spécificités du projet.', 10, 285);
    doc.text(`Page ${i} sur ${pageCount}`, 180, 285);
  }
  
  // Return the PDF as a blob
  return doc.output('blob');
};

/**
 * Formats a number as currency (€)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Generate a PDF document with the given data
 * This is the function imported by PDFGenerator component
 */
export const generatePDF = (
  documentTitle: string,
  data: FormData | Record<string, any>,
  fileName: string = 'estimation'
): void => {
  // Create a new PDF document
  const doc = new jsPDF() as ExtendedJsPDF;
  
  // Add title
  doc.setFontSize(20);
  doc.text(documentTitle, 105, 15, { align: 'center' });
  
  // Add timestamp
  const now = new Date();
  doc.setFontSize(10);
  doc.text(`Généré le ${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR')}`, 105, 25, { align: 'center' });
  
  // Add data as table
  const tableData = Object.entries(data)
    .filter(([_, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      // Format boolean values
      if (typeof value === 'boolean') {
        return [key, value ? 'Oui' : 'Non'];
      }
      // Format number values
      if (typeof value === 'number') {
        // Check if it looks like a price (larger values)
        if (value > 1000) {
          return [key, formatCurrency(value)];
        }
        // For smaller numbers, just return as is
        return [key, value.toString()];
      }
      // Return other values as strings
      return [key, String(value)];
    });
  
  autoTable(doc, {
    startY: 35,
    head: [['Paramètre', 'Valeur']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [120, 115, 70],
      textColor: [255, 255, 255]
    }
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('Estimation Progineer - Document non contractuel', 105, 285, { align: 'center' });
    doc.text(`Page ${i} sur ${pageCount}`, 190, 285, { align: 'right' });
  }
  
  // Save the PDF
  doc.save(`${fileName}.pdf`);
};

export default {
  generateEstimationPDF,
  formatCurrency,
  generatePDF
};
