import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { EstimationFormData } from '../types/estimationFormData';
import { FormData } from '../types';
import { formatCurrency } from '@/utils/formatters';

/**
 * Generate a PDF document based on form data
 * @param documentTitle Title of the document
 * @param data Estimation form data
 * @param fileName Name of the PDF file to download
 */
export const generatePDF = (
  documentTitle: string,
  data: EstimationFormData,
  fileName: string = 'estimation'
): void => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Add document title
  doc.setFontSize(20);
  doc.text(documentTitle, 105, 20, { align: 'center' });
  
  // Add date of generation
  const date = new Date();
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Généré le: ${date.toLocaleDateString()}`, 195, 10, { align: 'right' });
  
  // Add project information header
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text('Informations du projet', 14, 40);
  
  // Data rows for project information
  const projectDetails: string[][] = [
    ['Type de projet', data.projectType || '-'],
    ['Surface', `${data.surface || '-'} m²`],
    ['Ville', data.city || '-'],
    ['Type de terrain', data.terrainType || '-'],
    ['Style de construction', data.constructionStyle || '-'],
    ['Complexité', data.complexity || '-'],
  ];
  
  // Add table for project information
  doc.autoTable({
    startY: 45,
    head: [['Caractéristique', 'Valeur']],
    body: projectDetails,
    theme: 'grid',
    headStyles: { fillColor: [69, 123, 157], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 80 }
    }
  });
  
  // Add construction costs header
  const lastY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.text('Estimation des coûts', 14, lastY);
  
  // Pricing estimate
  let pricePerSqm = 0;
  
  // Determine base price per sqm based on project type
  switch (data.projectType) {
    case 'construction':
      pricePerSqm = 1800;
      break;
    case 'renovation':
      pricePerSqm = 1200;
      break;
    case 'extension':
      pricePerSqm = 1500;
      break;
    default:
      pricePerSqm = 1500;
  }
  
  // Adjust for complexity
  switch (data.complexity) {
    case 'complex':
      pricePerSqm *= 1.3;
      break;
    case 'moderate':
      pricePerSqm *= 1.15;
      break;
    case 'simple':
      pricePerSqm *= 1;
      break;
    default:
      // No adjustment
  }
  
  // Calculate construction costs
  const surface = typeof data.surface === 'string' ? parseInt(data.surface, 10) : (data.surface || 0);
  const constructionCost = surface * pricePerSqm;
  
  const constructionCosts: string[][] = [
    ['Gros œuvre', formatCurrency(constructionCost * 0.4)],
    ['Second œuvre', formatCurrency(constructionCost * 0.3)],
    ['Lots techniques', formatCurrency(constructionCost * 0.2)],
    ['Aménagements extérieurs', formatCurrency(constructionCost * 0.1)],
    ['TOTAL construction HT', formatCurrency(constructionCost)],
    ['TVA (20%)', formatCurrency(constructionCost * 0.2)],
    ['TOTAL construction TTC', formatCurrency(constructionCost * 1.2)],
  ];
  
  // Add table for construction costs
  doc.autoTable({
    startY: lastY + 10,
    head: [['Poste', 'Montant']],
    body: constructionCosts,
    theme: 'grid',
    headStyles: { fillColor: [69, 123, 157], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 70 }
    },
    footStyles: { fillColor: [220, 220, 220] },
    foot: [['TOTAL', formatCurrency(constructionCost * 1.2)]],
  });
  
  // Add additional fees header
  const lastY2 = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.text('Honoraires et frais annexes', 14, lastY2);
  
  // Calculate fees
  const architectFee = constructionCost * 0.1;
  const engineeringFee = constructionCost * 0.03;
  const permitFee = constructionCost * 0.02;
  const insuranceFee = constructionCost * 0.03;
  
  const feeCosts: string[][] = [
    ['Honoraires architecte', formatCurrency(architectFee)],
    ['Etudes techniques', formatCurrency(engineeringFee)],
    ['Permis de construire', formatCurrency(permitFee)],
    ['Assurance dommage-ouvrage', formatCurrency(insuranceFee)],
    ['TOTAL frais HT', formatCurrency(architectFee + engineeringFee + permitFee + insuranceFee)],
    ['TVA (20%)', formatCurrency((architectFee + engineeringFee + permitFee + insuranceFee) * 0.2)],
    ['TOTAL frais TTC', formatCurrency((architectFee + engineeringFee + permitFee + insuranceFee) * 1.2)],
  ];
  
  // Add table for fees
  doc.autoTable({
    startY: lastY2 + 10,
    head: [['Poste', 'Montant']],
    body: feeCosts,
    theme: 'grid',
    headStyles: { fillColor: [69, 123, 157], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 70 }
    }
  });
  
  // Add final project total
  const lastY3 = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 100, 0);
  doc.text('Estimation globale du projet', 14, lastY3);
  
  const totalProjectCost = constructionCost * 1.2 + (architectFee + engineeringFee + permitFee + insuranceFee) * 1.2;
  
  doc.autoTable({
    startY: lastY3 + 10,
    body: [['COÛT TOTAL ESTIMÉ (TTC)', formatCurrency(totalProjectCost)]],
    theme: 'grid',
    styles: { 
      fontSize: 14,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: { fillColor: [220, 230, 240] }
  });
  
  // Add footnote
  const lastY4 = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('* Cette estimation est fournie à titre indicatif et ne constitue pas un devis détaillé.', 14, lastY4);
  doc.text('Les prix peuvent varier en fonction des spécificités du projet, des matériaux choisis et des contraintes du site.', 14, lastY4 + 5);
  
  // Add Progineer contact info
  const pageCount = doc.internal.getNumberOfPages();
  doc.setPage(pageCount);
  doc.setFontSize(8);
  doc.text('Progineer - Expertise en maîtrise d\'œuvre | contact@progineer.fr | www.progineer.fr', 105, 285, { align: 'center' });
  
  // Save PDF
  doc.save(`${fileName}.pdf`);
};

/**
 * Generate an estimation PDF for a client project
 * @param formData Form data containing project information
 * @param totalHT Total cost before taxes
 * @param includeTerrainPrice Whether to include terrain price in calculations
 * @returns The filename of the generated PDF
 */
export const generateEstimationPDF = (
  formData: FormData,
  totalHT: number,
  includeTerrainPrice: boolean = false
): string => {
  // Create new PDF document
  const doc = new jsPDF();
  
  // Define PDF file name with timestamp to make it unique
  const timestamp = new Date().getTime();
  const fileName = `estimation-progineer-${timestamp}.pdf`;
  
  // Add document title
  doc.setFontSize(20);
  doc.text("Estimation détaillée de projet", 105, 20, { align: 'center' });
  
  // Add date of generation
  const date = new Date();
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Généré le: ${date.toLocaleDateString('fr-FR')}`, 195, 10, { align: 'right' });
  
  // Add project information header
  doc.setFontSize(16);
  doc.setTextColor(0);
  doc.text('Informations du projet', 14, 40);
  
  // Data rows for project information
  const projectDetails: string[][] = [
    ['Type de projet', formData.projectType || '-'],
    ['Surface', `${formData.surface || '-'} m²`],
    ['Ville', formData.city || '-'],
  ];
  
  // Add table for project information
  doc.autoTable({
    startY: 45,
    head: [['Caractéristique', 'Valeur']],
    body: projectDetails,
    theme: 'grid',
    headStyles: { fillColor: [69, 123, 157], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 70 },
      1: { cellWidth: 80 }
    }
  });
  
  // Add construction costs header
  const lastY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.text('Estimation des coûts', 14, lastY);
  
  // Calculate costs for different construction categories
  const structuralWork = totalHT * 0.4;
  const finishingWork = totalHT * 0.3;
  const technicalLots = totalHT * 0.2;
  const exteriorWorks = totalHT * 0.1;
  
  const constructionCosts: string[][] = [
    ['Gros œuvre', formatCurrency(structuralWork)],
    ['Second œuvre', formatCurrency(finishingWork)],
    ['Lots techniques', formatCurrency(technicalLots)],
    ['Aménagements extérieurs', formatCurrency(exteriorWorks)],
    ['TOTAL construction HT', formatCurrency(totalHT)],
    ['TVA (20%)', formatCurrency(totalHT * 0.2)],
    ['TOTAL construction TTC', formatCurrency(totalHT * 1.2)],
  ];
  
  // Add table for construction costs
  doc.autoTable({
    startY: lastY + 10,
    head: [['Poste', 'Montant']],
    body: constructionCosts,
    theme: 'grid',
    headStyles: { fillColor: [69, 123, 157], textColor: [255, 255, 255] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 70 }
    }
  });
  
  let totalAmount = totalHT * 1.2; // Construction cost with VAT
  
  // Add terrain information if needed
  if (includeTerrainPrice && formData.landPrice) {
    const terrainPrice = typeof formData.landPrice === 'string' 
      ? parseFloat(formData.landPrice) 
      : formData.landPrice;
    
    if (!isNaN(terrainPrice) && terrainPrice > 0) {
      const lastY2 = (doc as any).lastAutoTable.finalY + 20;
      doc.setFontSize(16);
      doc.text('Terrain et frais associés', 14, lastY2);
      
      const fraisNotaire = terrainPrice * 0.08;
      
      const terrainCosts: string[][] = [
        ['Prix du terrain', formatCurrency(terrainPrice)],
        ['Frais de notaire (estimation 8%)', formatCurrency(fraisNotaire)],
        ['TOTAL terrain', formatCurrency(terrainPrice + fraisNotaire)],
      ];
      
      doc.autoTable({
        startY: lastY2 + 10,
        head: [['Poste', 'Montant']],
        body: terrainCosts,
        theme: 'grid',
        headStyles: { fillColor: [69, 123, 157], textColor: [255, 255, 255] },
        styles: { fontSize: 10 },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 70 }
        }
      });
      
      totalAmount += terrainPrice + fraisNotaire;
    }
  }
  
  // Add final project total
  const lastY3 = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.setTextColor(0, 100, 0);
  doc.text('Estimation globale du projet', 14, lastY3);
  
  doc.autoTable({
    startY: lastY3 + 10,
    body: [['COÛT TOTAL ESTIMÉ', formatCurrency(totalAmount)]],
    theme: 'grid',
    styles: { 
      fontSize: 14,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: { fillColor: [220, 230, 240] }
  });
  
  // Add footnote
  const lastY4 = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text('* Cette estimation est fournie à titre indicatif et ne constitue pas un devis détaillé.', 14, lastY4);
  doc.text('Les prix peuvent varier en fonction des spécificités du projet, des matériaux choisis et des contraintes du site.', 14, lastY4 + 5);
  
  // Add Progineer contact info
  const pageCount = doc.getNumberOfPages();
  doc.setPage(pageCount);
  doc.setFontSize(8);
  doc.text('Progineer - Expertise en maîtrise d\'œuvre | contact@progineer.fr | www.progineer.fr', 105, 285, { align: 'center' });
  
  // Save PDF
  doc.save(fileName);
  
  return fileName;
};
