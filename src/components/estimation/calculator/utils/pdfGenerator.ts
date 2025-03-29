// Import section with jsPDF correctly imported
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { FormData } from '../types';

// Define extended types for jsPDF with autoTable 
// This correctly handles the TypeScript integration with the jsPDF-autotable plugin
interface PageInfo {
  pageNumber: number;
  pageContext: any;
  objId?: number;
}

// Add autoTable to jsPDF
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => any;
    getCurrentPageInfo: () => PageInfo;
  }
}

// Function to generate the PDF document
export const generateEstimationPDF = (formData: FormData, estimationResult: number | null, includeTerrainPrice: boolean = false) => {
  // Initialize jsPDF
  const doc = new jsPDF();

  // Define header
  const header = (doc: jsPDF) => {
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFont('helvetica', 'bold');
    doc.text("Estimation Détaillée de Projet", 15, 25);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text("PROGINEER - Maître d'œuvre", 15, 32);
    doc.setFontSize(10);
    doc.text(`Estimation générée le ${new Date().toLocaleDateString('fr-FR')}`, 15, 37);
  };

  // Define footer
  const footer = (doc: jsPDF) => {
    const pageCount = doc.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(40);
      doc.text(`Page ${i} sur ${pageCount} - Progineer PACA | www.progineer.fr | contact@progineer.fr | 04 XX XX XX XX`, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }
  };

  // Function to add a page with header and footer
  const addPage = (doc: jsPDF) => {
    doc.addPage();
    header(doc);
  };

  // Title
  header(doc);

  // Project Information
  doc.setFontSize(16);
  doc.setTextColor(40, 80, 160);
  doc.text("Informations du Projet", 15, 50);
  
  doc.setFontSize(12);
  doc.setTextColor(40);

  let y = 60;
  const lineHeight = 8;

  // Function to add information with two columns to the PDF
  const addInfoRow = (label1: string, value1: any, label2: string = "", value2: any = "") => {
    doc.setFont('helvetica', 'normal');
    doc.text(`${label1}:`, 15, y);
    doc.setFont('helvetica', 'bold');
    doc.text(`${value1 !== undefined && value1 !== null && value1 !== '' ? value1 : 'Non spécifié'}`, 70, y);
    
    if (label2) {
      doc.setFont('helvetica', 'normal');
      doc.text(`${label2}:`, 110, y);
      doc.setFont('helvetica', 'bold');
      doc.text(`${value2 !== undefined && value2 !== null && value2 !== '' ? value2 : 'Non spécifié'}`, 165, y);
    }
    
    y += lineHeight;
  };

  // General project information
  addInfoRow("Type de projet", formData.projectType === 'construction' ? 'Construction neuve' : 
             formData.projectType === 'renovation' ? 'Rénovation' : 
             formData.projectType === 'extension' ? 'Extension' : 'Division', 
             "Surface", `${formData.surface} m²`);
             
  addInfoRow("Localisation", formData.city || 'Non spécifié', 
             "Terrain", formData.terrainType || 'Non spécifié');
             
  if (formData.projectType === 'construction' || formData.projectType === 'extension') {
    addInfoRow("Type de construction", formData.constructionType === 'traditional' ? 'Traditionnelle' : 
               formData.constructionType === 'contemporary' ? 'Contemporaine' : 
               formData.constructionType === 'eco' ? 'Écologique' : 'Standard', 
               "Style", formData.constructionStyle || 'Non spécifié');
  }
  
  addInfoRow("Isolation", formData.insulationType || 'Non spécifié', 
             "Toiture", formData.roofingType || 'Non spécifié');
  
  if (formData.bedrooms || formData.bathrooms) {
    addInfoRow("Chambres", formData.bedrooms || 'Non spécifié', 
               "Salles de bain", formData.bathrooms || 'Non spécifié');
  }

  y += 5;

  // Divider
  doc.setDrawColor(200);
  doc.line(15, y, 195, y);
  y += 10;

  // Estimation Results
  doc.setFontSize(16);
  doc.setTextColor(40, 80, 160);
  doc.text("Estimation Financière", 15, y);
  y += 15;
  
  doc.setFontSize(12);
  doc.setTextColor(40);

  // Make sure we have a valid estimation
  if (estimationResult !== null) {
    // Calculate additional costs
    const tvaMontant = estimationResult * 0.2;
    const totalTTC = estimationResult + tvaMontant;
    
    // Honoraires based on project size
    const surface = typeof formData.surface === 'string' ? parseFloat(formData.surface) : (formData.surface || 100);
    const honorairesTaux = surface < 100 ? 0.12 : surface < 200 ? 0.10 : 0.08;
    const honorairesHT = estimationResult * honorairesTaux;
    const honorairesTTC = honorairesHT * 1.2;
    
    // Other additional fees
    const isRenovation = formData.projectType === 'renovation' || formData.projectType === 'division';
    const taxeAmenagement = isRenovation ? 0 : estimationResult * 0.05;
    const dommageOuvrage = estimationResult * 0.03;
    const etudeThermique = isRenovation ? 1500 : 2500;
    const etudeGeotechnique = isRenovation ? 0 : 3000;
    const fraisGeometre = isRenovation ? 1000 : 2000;
    
    // Land price and notary fees
    const landPrice = typeof formData.landPrice === 'string' ? parseFloat(formData.landPrice) : (formData.landPrice || 0);
    const fraisNotaire = landPrice * 0.08;
    
    // Total project cost
    const totalFraisAnnexes = honorairesHT + taxeAmenagement + dommageOuvrage + etudeThermique + etudeGeotechnique + fraisGeometre;
    const totalProjetHT = estimationResult + totalFraisAnnexes;
    const totalProjetTTC = totalProjetHT * 1.2;
    const totalAvecTerrain = totalProjetTTC + landPrice + fraisNotaire;

    // Cost table sections
    doc.setFillColor(240, 240, 250);
    doc.rect(15, y, 180, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text("Travaux", 20, y + 7);
    doc.text("Montant (€)", 170, y + 7);
    y += 15;

    // Work costs
    doc.setFont('helvetica', 'normal');
    doc.text("Coût des travaux HT", 20, y);
    doc.text(estimationResult.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.text("TVA sur travaux (20%)", 20, y);
    doc.text(tvaMontant.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.setFont('helvetica', 'bold');
    doc.text("Total des travaux TTC", 20, y);
    doc.text(totalTTC.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight * 2;
    
    // Additional costs header
    doc.setFillColor(240, 240, 250);
    doc.rect(15, y, 180, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text("Frais Annexes", 20, y + 7);
    doc.text("Montant (€)", 170, y + 7);
    y += 15;
    
    // Additional costs details
    doc.setFont('helvetica', 'normal');
    doc.text(`Honoraires de maîtrise d'œuvre (${Math.round(honorairesTaux * 100)}%)`, 20, y);
    doc.text(honorairesHT.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    if (!isRenovation) {
      doc.text("Taxe d'aménagement", 20, y);
      doc.text(taxeAmenagement.toLocaleString('fr-FR'), 170, y, {align: 'right'});
      y += lineHeight;
    }
    
    doc.text("Assurance dommage-ouvrage", 20, y);
    doc.text(dommageOuvrage.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.text("Étude thermique", 20, y);
    doc.text(etudeThermique.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    if (!isRenovation) {
      doc.text("Étude géotechnique", 20, y);
      doc.text(etudeGeotechnique.toLocaleString('fr-FR'), 170, y, {align: 'right'});
      y += lineHeight;
    }
    
    doc.text("Frais de géomètre", 20, y);
    doc.text(fraisGeometre.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.setFont('helvetica', 'bold');
    doc.text("Total frais annexes HT", 20, y);
    doc.text(totalFraisAnnexes.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight * 2;
    
    // Project total
    doc.setFillColor(230, 240, 255);
    doc.rect(15, y, 180, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text("Total Projet", 20, y + 7);
    doc.text("Montant (€)", 170, y + 7);
    y += 15;
    
    doc.setFont('helvetica', 'normal');
    doc.text("Total projet HT", 20, y);
    doc.text(totalProjetHT.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.text("TVA globale (20%)", 20, y);
    doc.text((totalProjetTTC - totalProjetHT).toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.setFont('helvetica', 'bold');
    doc.text("Total projet TTC", 20, y);
    doc.text(totalProjetTTC.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight * 2;
    
    // Add land price if applicable
    if (includeTerrainPrice && landPrice > 0) {
      doc.setFillColor(230, 245, 230);
      doc.rect(15, y, 180, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text("Terrain et Frais Associés", 20, y + 7);
      doc.text("Montant (€)", 170, y + 7);
      y += 15;
      
      doc.setFont('helvetica', 'normal');
      doc.text("Prix du terrain", 20, y);
      doc.text(landPrice.toLocaleString('fr-FR'), 170, y, {align: 'right'});
      y += lineHeight;
      
      doc.text("Frais de notaire (8%)", 20, y);
      doc.text(fraisNotaire.toLocaleString('fr-FR'), 170, y, {align: 'right'});
      y += lineHeight * 2;
      
      // Grand total with land
      doc.setFillColor(50, 100, 50);
      doc.setTextColor(255);
      doc.rect(15, y, 180, 12, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text("COÛT TOTAL AVEC TERRAIN", 20, y + 8);
      doc.text(totalAvecTerrain.toLocaleString('fr-FR'), 170, y + 8, {align: 'right'});
      doc.setTextColor(40);
      y += lineHeight * 2;
    } else {
      // Grand total without land
      doc.setFillColor(40, 80, 160);
      doc.setTextColor(255);
      doc.rect(15, y, 180, 12, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text("COÛT TOTAL DU PROJET", 20, y + 8);
      doc.text(totalProjetTTC.toLocaleString('fr-FR'), 170, y + 8, {align: 'right'});
      doc.setTextColor(40);
      y += lineHeight * 2;
    }

    // Check if we need a new page for the loan simulation
    if (y > 240) {
      addPage(doc);
      y = 50;
    }
    
    // Add loan simulation
    doc.setFontSize(16);
    doc.setTextColor(40, 80, 160);
    doc.text("Simulation de Financement", 15, y);
    y += 15;
    
    doc.setFontSize(12);
    doc.setTextColor(40);
    
    // Loan variables
    const loanAmount = includeTerrainPrice && landPrice > 0 ? totalAvecTerrain : totalProjetTTC;
    const interestRate = 4.1; // 4.1%
    const loanYears = 20; // 20 years
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanYears * 12;
    const monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalCost = monthlyPayment * numPayments;
    const totalInterest = totalCost - loanAmount;
    
    // Loan details
    doc.setFillColor(240, 240, 250);
    doc.rect(15, y, 180, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text("Simulation de prêt sur 20 ans à 4.1%", 20, y + 7);
    doc.text("Montant (€)", 170, y + 7);
    y += 15;
    
    doc.setFont('helvetica', 'normal');
    doc.text("Montant financé", 20, y);
    doc.text(loanAmount.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.text("Mensualité", 20, y);
    doc.text(monthlyPayment.toFixed(2).replace('.', ',') + ' €/mois', 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.text("Coût total des intérêts", 20, y);
    doc.text(totalInterest.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight;
    
    doc.setFont('helvetica', 'bold');
    doc.text("Coût total du crédit", 20, y);
    doc.text(totalCost.toLocaleString('fr-FR'), 170, y, {align: 'right'});
    y += lineHeight * 2;
    
    // Add a note about the loan simulation
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text("* Cette simulation est donnée à titre indicatif et ne constitue pas une offre de prêt. Les taux et conditions peuvent", 15, y);
    y += 5;
    doc.text("varier selon votre profil emprunteur, la durée du prêt et les conditions du marché.", 15, y);
    y += 15;
    
    // Add detailed cost breakdown chart (if space available, otherwise on a new page)
    if (y > 230) {
      addPage(doc);
      y = 50;
    }
    
    // Cost breakdown
    doc.setFontSize(16);
    doc.setTextColor(40, 80, 160);
    doc.text("Répartition Détaillée des Coûts", 15, y);
    y += 15;

    // Calculate percentages based on project type
    const costBreakdown = [];
    
    if (isRenovation) {
      costBreakdown.push(
        {item: 'Démolition/Préparation', percentage: 0.08, cost: estimationResult * 0.08},
        {item: 'Maçonnerie', percentage: 0.15, cost: estimationResult * 0.15},
        {item: 'Plomberie', percentage: 0.12, cost: estimationResult * 0.12},
        {item: 'Électricité', percentage: 0.10, cost: estimationResult * 0.10},
        {item: 'Menuiseries', percentage: 0.15, cost: estimationResult * 0.15},
        {item: 'Isolation', percentage: 0.12, cost: estimationResult * 0.12},
        {item: 'Revêtements sol/mur', percentage: 0.11, cost: estimationResult * 0.11},
        {item: 'Peinture', percentage: 0.07, cost: estimationResult * 0.07},
        {item: 'Équipements', percentage: 0.10, cost: estimationResult * 0.10}
      );
    } else {
      costBreakdown.push(
        {item: 'Terrassement', percentage: 0.05, cost: estimationResult * 0.05},
        {item: 'Fondations', percentage: 0.10, cost: estimationResult * 0.10},
        {item: 'Gros œuvre/Murs', percentage: 0.15, cost: estimationResult * 0.15},
        {item: 'Charpente', percentage: 0.08, cost: estimationResult * 0.08},
        {item: 'Couverture', percentage: 0.07, cost: estimationResult * 0.07},
        {item: 'Menuiseries extérieures', percentage: 0.08, cost: estimationResult * 0.08},
        {item: 'Isolation', percentage: 0.06, cost: estimationResult * 0.06},
        {item: 'Plomberie', percentage: 0.06, cost: estimationResult * 0.06},
        {item: 'Électricité', percentage: 0.07, cost: estimationResult * 0.07},
        {item: 'Chauffage/VMC', percentage: 0.05, cost: estimationResult * 0.05},
        {item: 'Plâtrerie', percentage: 0.05, cost: estimationResult * 0.05},
        {item: 'Menuiseries intérieures', percentage: 0.04, cost: estimationResult * 0.04},
        {item: 'Revêtements sols', percentage: 0.05, cost: estimationResult * 0.05},
        {item: 'Peinture', percentage: 0.04, cost: estimationResult * 0.04},
        {item: 'Aménagements extérieurs', percentage: 0.05, cost: estimationResult * 0.05}
      );
    }

    // Generate a table with the detailed costs
    if (costBreakdown.length > 0) {
      doc.autoTable({
        startY: y,
        head: [['Poste', 'Pourcentage', 'Coût HT (€)', 'Coût TTC (€)']],
        body: costBreakdown.map(item => [
          item.item, 
          `${(item.percentage * 100).toFixed(1)}%`,
          Math.round(item.cost).toLocaleString('fr-FR'),
          Math.round(item.cost * 1.2).toLocaleString('fr-FR')
        ]),
        styles: { fontSize: 10 },
        headStyles: { fillColor: [40, 80, 160] },
        alternateRowStyles: { fillColor: [245, 245, 250] },
        margin: { left: 15, right: 15 },
      });
    }
  } else {
    // If no valid estimation is available
    doc.setFont('helvetica', 'italic');
    doc.text("Estimation non disponible. Veuillez fournir plus d'informations sur votre projet.", 15, y);
  }

  // Add footer with contact info
  footer(doc);

  // Generate the PDF file with date in the filename
  const dateStr = new Date().toISOString().split('T')[0];
  const projectType = formData.projectType || 'projet';
  const pdfName = `estimation-${projectType}-${dateStr}.pdf`;
  
  doc.save(pdfName);
  return pdfName;
};

// Export with both names for backward compatibility
export const generatePDF = generateEstimationPDF;
