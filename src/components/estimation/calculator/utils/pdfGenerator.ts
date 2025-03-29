import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';

// Function to generate the PDF document
export const generatePDF = (formData: FormData, estimation: any) => {
  // Initialize jsPDF
  const doc = new jsPDF();

  // Define document margins
  const margin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
  };

  // Function to add a header to each page
  const addHeader = (doc: jsPDF) => {
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.text("Progineer - Estimation de Travaux", margin.left, margin.top);
  };

  // Function to add a footer to each page
  const addFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
    doc.setFontSize(10);
    doc.setTextColor(40);
    doc.text(`Page ${pageNumber} sur ${totalPages}`, margin.left, doc.internal.pageSize.height - margin.bottom);
  };

  // Add header and footer to the first page
  addHeader(doc);
  addFooter(doc, 1, 1);

  // Title of the document
  doc.setFontSize(22);
  doc.setTextColor(40);
  doc.setFont('helvetica', 'bold');
  const titleText = "Rapport d'Estimation Détaillée";
  const titleWidth = doc.getTextWidth(titleText);
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleX = (pageWidth - titleWidth) / 2;
  doc.text(titleText, titleX, 25);

  // Subtitle
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  const subtitleText = "Informations clés de votre projet";
  const subtitleWidth = doc.getTextWidth(subtitleText);
  const subtitleX = (pageWidth - subtitleWidth) / 2;
  doc.text(subtitleText, subtitleX, 35);

  // Function to add a new page with header and footer
  const addNewPage = (doc: jsPDF, pageNumber: number, totalPages: number) => {
    doc.addPage();
    addHeader(doc);
    addFooter(doc, pageNumber, totalPages);
  };

  // Add client and project information
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("Informations Client", margin.left, 50);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Type de client: ${formData.clientType || 'Non spécifié'}`, margin.left, 58);
  doc.text(`Nom: ${formData.firstName || 'Non spécifié'} ${formData.lastName || ''}`, margin.left, 64);
  doc.text(`Email: ${formData.email || 'Non spécifié'}`, margin.left, 70);
  doc.text(`Téléphone: ${formData.phone || 'Non spécifié'}`, margin.left, 76);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text("Informations Projet", margin.left, 84);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Type de projet: ${formData.projectType || 'Non spécifié'}`, margin.left, 92);
  doc.text(`Surface: ${formData.surface || 'Non spécifié'} m²`, margin.left, 98);
  doc.text(`Localisation: ${formData.city || 'Non spécifié'}`, margin.left, 104);

  // Detailed Estimation Table
  if (estimation && estimation.corpsEtat) {
    let startY = 112;
    let pageNumber = 1;
    let totalPages = 1;
    const corpsEtatKeys = Object.keys(estimation.corpsEtat);
    totalPages = Math.ceil(corpsEtatKeys.length / 10); // Assuming 10 corps d'état per page

    corpsEtatKeys.forEach((corps, index) => {
      if (index % 10 === 0 && index > 0) {
        pageNumber++;
        addNewPage(doc, pageNumber, totalPages);
        startY = 30; // Reset Y position for the new page
      }

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${corps}`, margin.left, startY);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Montant HT: ${estimation.corpsEtat[corps].montantHT.toFixed(2)} €`, margin.left, startY + 6);
      startY += 12;
    });

    // Summary
    if (pageNumber < totalPages) {
      addNewPage(doc, ++pageNumber, totalPages);
      startY = 30;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Résumé de l'Estimation", margin.left, startY);
    startY += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total HT: ${estimation.totalHT.toFixed(2)} €`, margin.left, startY);
    doc.text(`TVA (20%): ${estimation.vat.toFixed(2)} €`, margin.left + 80, startY);
    startY += 8;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total TTC: ${estimation.totalTTC.toFixed(2)} €`, margin.left, startY);
  }

  // Function to handle missing property in CellHookData
  const didCellHookDataHandler = (data: any) => {
    // Add isHeaderCell property if it doesn't exist
    if (data && !data.hasOwnProperty('isHeaderCell')) {
      data.isHeaderCell = false;
    }
    return data;
  };

  // AutoTable
  if (estimation && estimation.corpsEtat) {
    let startY = 112;
    let pageNumber = 1;
    let totalPages = 1;
    const corpsEtatKeys = Object.keys(estimation.corpsEtat);
    totalPages = Math.ceil(corpsEtatKeys.length / 10); // Assuming 10 corps d'état per page

    // Prepare table data
    const tableData = corpsEtatKeys.map(corps => [
      corps,
      estimation.corpsEtat[corps].montantHT.toFixed(2) + ' €',
      estimation.corpsEtat[corps].details.join(', ')
    ]);

    // Define table options
    const tableOptions = {
      startY: startY,
      margin: margin,
      headStyles: { fillColor: [41, 128, 185] },
      columnStyles: {
        0: { fontStyle: 'bold' },
        1: { halign: 'right' }
      },
      didParseCell: function(cellData) {
        return didCellHookDataHandler(cellData);
      }
    };

    // Add table header
    const tableHeader = [["Corps d'état", "Montant HT", "Détails"]];

    // Add table to the document
    (doc as any).autoTable({
      head: tableHeader,
      body: tableData,
      ...tableOptions
    });

    // Summary
    if (pageNumber < totalPages) {
      addNewPage(doc, ++pageNumber, totalPages);
      startY = 30;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Résumé de l'Estimation", margin.left, startY);
    startY += 10;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total HT: ${estimation.totalHT.toFixed(2)} €`, margin.left, startY);
    doc.text(`TVA (20%): ${estimation.vat.toFixed(2)} €`, margin.left + 80, startY);
    startY += 8;
    doc.setFont('helvetica', 'bold');
    doc.text(`Total TTC: ${estimation.totalTTC.toFixed(2)} €`, margin.left, startY);
  }

  // Save the PDF
  doc.save("estimation_travaux.pdf");
};
