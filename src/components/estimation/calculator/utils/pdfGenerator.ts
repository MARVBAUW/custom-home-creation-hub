
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';
import { PDFGenerationOptions } from '../types/pdf-types';

export const generateEstimationPDF = (formData: FormData, estimation: any, options: PDFGenerationOptions = {}) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(20);
  doc.text('Estimation Détaillée de Projet', 105, 15, { align: 'center' });
  
  // Add client info if requested
  if (options.clientInfo) {
    doc.setFontSize(14);
    doc.text('Informations client', 14, 30);
    
    const clientInfo = [
      ['Nom', `${formData.firstName || ''} ${formData.lastName || ''}`],
      ['Email', formData.email || ''],
      ['Téléphone', formData.phone || ''],
      ['Ville', formData.city || '']
    ];
    
    doc.autoTable({
      startY: 35,
      head: [['Information', 'Valeur']],
      body: clientInfo,
    });
  }
  
  // Add project details
  const lastTableY = (doc as any).lastAutoTable?.finalY || 30;
  
  doc.setFontSize(14);
  doc.text('Détails du projet', 14, lastTableY + 10);
  
  const projectDetails = [
    ['Type de projet', formData.projectType || 'Non spécifié'],
    ['Surface', `${formData.surface || 0} m²`],
    ['Complexité', formData.complexity || 'Standard'],
    ['Type de terrain', formData.terrainType || 'Non spécifié']
  ];
  
  doc.autoTable({
    startY: lastTableY + 15,
    head: [['Caractéristique', 'Valeur']],
    body: projectDetails,
  });
  
  // Add detailed breakdown if requested
  if (options.includeDetailedBreakdown) {
    const newLastTableY = (doc as any).lastAutoTable.finalY;
    
    doc.setFontSize(14);
    doc.text('Détail des coûts', 14, newLastTableY + 10);
    
    // Convert the cost breakdown to array format
    const costDetails = Object.entries(estimation).filter(([key]) => 
      key !== 'totalHT' && key !== 'totalTTC' && key !== 'coutTotalAvecTerrain'
    ).map(([key, value]) => [
      key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
      `${value} €`
    ]);
    
    doc.autoTable({
      startY: newLastTableY + 15,
      head: [['Poste', 'Montant (€)']],
      body: costDetails,
    });
  }
  
  // Add summary
  const summaryY = (doc as any).lastAutoTable.finalY + 10;
  
  doc.setFontSize(14);
  doc.text('Récapitulatif', 14, summaryY);
  
  const totalHT = estimation.totalHT || estimation.totalAmount || 0;
  
  const summary = [
    ['Coût total HT', `${totalHT} €`],
    ['TVA (20%)', `${totalHT * 0.2} €`],
    ['Coût total TTC', `${totalHT * 1.2} €`]
  ];
  
  if (options.includeTerrainPrice && formData.landPrice) {
    summary.push(['Prix du terrain', `${formData.landPrice} €`]);
    summary.push(['Coût global avec terrain', `${totalHT * 1.2 + Number(formData.landPrice)} €`]);
  }
  
  doc.autoTable({
    startY: summaryY + 5,
    body: summary,
    theme: 'grid',
    styles: { 
      fontSize: 12,
      fontStyle: 'bold'
    },
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(10);
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text('Cette estimation est fournie à titre indicatif et peut varier en fonction des détails spécifiques du projet.', 105, 285, {
      align: 'center'
    });
    doc.text(`Estimation générée le ${new Date().toLocaleDateString()}`, 105, 290, {
      align: 'center'
    });
  }
  
  // Return the document for further processing or save it
  return doc;
};

// Helper function to save the PDF
export const savePDF = (doc: jsPDF, fileName: string = 'estimation-projet.pdf') => {
  doc.save(fileName);
};

// Helper function to get PDF as blob
export const getPDFBlob = (doc: jsPDF) => {
  return new Blob([doc.output('blob')], { type: 'application/pdf' });
};
