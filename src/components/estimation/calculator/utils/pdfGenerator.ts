// Import section with jsPDF correctly imported

import { jsPDF as JSPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';

// Define the extended jsPDF type
interface ExtendedJSPDF extends JSPDF {
  getNumberOfPages: () => number;
  getCurrentPageInfo: () => {
    pageNumber: number;
    pageContext: any;
  };
}

// Function to generate the PDF document
export const generateEstimationPDF = (formData: FormData, estimationResult: number | null, includeTerrainPrice: boolean = false) => {
  // Initialize jsPDF
  const doc = new JSPDF() as ExtendedJSPDF;

  // Define header
  const header = (doc: ExtendedJSPDF) => {
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'bold');
    doc.text("Estimation de Projet", 15, 25);
  };

  // Define footer
  const footer = (doc: ExtendedJSPDF) => {
    const pageCount = doc.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(40);
      doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.getWidth() - 35, doc.internal.pageSize.getHeight() - 10);
    }
  };

  // Function to add a page with header and footer
  const addPage = (doc: ExtendedJSPDF) => {
    doc.addPage();
    header(doc);
    footer(doc);
  };

  // Title
  header(doc);

  // General Information
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text("Informations Générales", 15, 40);

  let y = 50;
  const lineHeight = 10;

  // Function to add information to the PDF
  const addInfo = (label: string, value: any) => {
    if (value !== undefined && value !== null && value !== '') {
      doc.setFontSize(12);
      doc.text(`${label}: ${value}`, 15, y);
      y += lineHeight;
    }
  };

  addInfo("Type de client", formData.clientType);
  addInfo("Type de projet", formData.projectType);
  addInfo("Type d'estimation", formData.estimationType);

  if (formData.surface) {
    addInfo("Surface", `${formData.surface} m²`);
  }

  if (includeTerrainPrice && formData.landPrice) {
    addInfo("Prix du terrain", `${formData.landPrice} €`);
  }

  y += 10;

  // Construction Details
  doc.setFontSize(16);
  doc.text("Détails de Construction", 15, y);
  y += lineHeight + 5;

  addInfo("Type de terrain", formData.terrainType);
  addInfo("Structure des murs", formData.wallType);
  addInfo("Type de toiture", formData.roofType);
  addInfo("Type de combles", formData.atticType);

  y += 10;

  // Contact Information
  doc.setFontSize(16);
  doc.text("Informations de Contact", 15, y);
  y += lineHeight + 5;

  addInfo("Nom", formData.firstName);
  addInfo("Prénom", formData.lastName);
  addInfo("Email", formData.email);
  addInfo("Téléphone", formData.phone);

  // Add a new page for the estimation result
  addPage(doc);

  // Estimation Result
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text("Résultat de l'Estimation", 15, 40);

  y = 50;

  if (estimationResult !== null) {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Estimation Totale: ${estimationResult.toFixed(2)} €`, 15, y);
    y += lineHeight;
  } else {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text("Estimation non disponible.", 15, y);
    y += lineHeight;
  }

  // AutoTable example - Detailed costs
  const detailedCosts = [
    { item: 'Terrassement', cost: estimationResult ? (estimationResult * 0.1).toFixed(2) : 'N/A' },
    { item: 'Fondations', cost: estimationResult ? (estimationResult * 0.15).toFixed(2) : 'N/A' },
    { item: 'Murs', cost: estimationResult ? (estimationResult * 0.2).toFixed(2) : 'N/A' },
    { item: 'Toiture', cost: estimationResult ? (estimationResult * 0.15).toFixed(2) : 'N/A' },
    { item: 'Menuiseries', cost: estimationResult ? (estimationResult * 0.1).toFixed(2) : 'N/A' },
    { item: 'Second oeuvre', cost: estimationResult ? (estimationResult * 0.3).toFixed(2) : 'N/A' },
  ];

  (doc as ExtendedJSPDF).autoTable({
    head: [['Poste', 'Coût (€)']],
    body: detailedCosts.map(item => [item.item, item.cost]),
    startY: y + 10,
    margin: { left: 15 },
    styles: {
      fontSize: 12,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 13,
    },
  });

  footer(doc);

  // Generate the PDF file
  return doc.output('datauristring');
};
