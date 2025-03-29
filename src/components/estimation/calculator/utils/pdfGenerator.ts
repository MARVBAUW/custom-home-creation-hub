
import { FormData } from '../types';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

// Fonction pour formater les prix
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

// Fonction pour générer un PDF d'estimation détaillée
export const generateEstimationPDF = (estimation: any, formData: FormData) => {
  // Créer un nouveau document PDF
  const doc = new jsPDF();
  
  // Ajouter le logo et les informations d'en-tête
  doc.setFillColor(242, 242, 242);
  doc.rect(0, 0, 210, 30, 'F');
  
  // Titre et sous-titre
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(74, 74, 74);
  doc.text('ESTIMATION DÉTAILLÉE', 105, 15, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(120, 120, 120);
  doc.text('Progineer | Estimation réalisée le ' + new Date().toLocaleDateString('fr-FR'), 105, 22, { align: 'center' });
  
  // Informations du projet
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text('DÉTAILS DU PROJET', 14, 40);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  
  let yPos = 50;
  const leftCol = 14;
  const rightCol = 80;
  
  // Caractéristiques principales
  doc.setFont('helvetica', 'bold');
  doc.text('Type de projet:', leftCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.projectType || 'Non spécifié', rightCol, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Surface:', leftCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`${formData.surface || 'Non spécifiée'} m²`, rightCol, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Localisation:', leftCol, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.city || 'Non spécifiée', rightCol, yPos);
  yPos += 8;
  
  if (formData.levels) {
    doc.setFont('helvetica', 'bold');
    doc.text('Nombre de niveaux:', leftCol, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.levels.toString() || 'Non spécifié', rightCol, yPos);
    yPos += 8;
  }
  
  if (formData.finishLevel) {
    doc.setFont('helvetica', 'bold');
    doc.text('Niveau de finition:', leftCol, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.finishLevel || 'Non spécifié', rightCol, yPos);
    yPos += 8;
  }
  
  // Ligne de séparation
  doc.setDrawColor(220, 220, 220);
  doc.line(14, yPos, 196, yPos);
  yPos += 10;
  
  // Titre pour le détail des postes
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('DÉTAIL PAR CORPS D\'ÉTAT', 14, yPos);
  yPos += 10;
  
  // Tableau des corps d'état
  const tableData: string[][] = [];
  
  // Ajouter chaque poste au tableau
  Object.entries(estimation).forEach(([key, value]) => {
    if (typeof value === 'number' && 
        !['totalHT', 'totalTTC', 'fraisNotaire', 'coutTotalAvecTerrain'].includes(key)) {
      // Convertir la clé en nom lisible
      const readableName = key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (str) => str.toUpperCase());
      
      tableData.push([readableName, formatPrice(value as number)]);
    }
  });
  
  // Ajouter le tableau
  autoTable(doc, {
    startY: yPos,
    head: [['Poste', 'Montant (€)']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [166, 150, 117],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnStyles: {
      0: { cellWidth: 130 },
      1: { cellWidth: 40, halign: 'right' }
    },
    margin: { left: 14, right: 14 }
  });
  
  // Récupérer la position Y après le tableau
  const finalY = (doc as any).lastAutoTable.finalY;
  
  // Ajouter les totaux
  yPos = finalY + 15;
  
  // Ligne de séparation
  doc.setDrawColor(220, 220, 220);
  doc.line(14, yPos - 5, 196, yPos - 5);
  
  // Totaux
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Total HT:', 140, yPos);
  doc.text(formatPrice(estimation.totalHT), 196, yPos, { align: 'right' });
  yPos += 8;
  
  doc.text('TVA (20%):', 140, yPos);
  doc.text(formatPrice(estimation.totalHT * 0.2), 196, yPos, { align: 'right' });
  yPos += 8;
  
  doc.setFontSize(14);
  doc.text('Total TTC:', 140, yPos);
  doc.text(formatPrice(estimation.totalTTC), 196, yPos, { align: 'right' });
  yPos += 15;
  
  // Prix du terrain si inclus
  if (formData.landPrice) {
    doc.setFontSize(12);
    doc.text('Prix du terrain:', 140, yPos);
    doc.text(formatPrice(formData.landPrice), 196, yPos, { align: 'right' });
    yPos += 8;
    
    doc.text('Frais de notaire:', 140, yPos);
    doc.text(formatPrice(estimation.fraisNotaire), 196, yPos, { align: 'right' });
    yPos += 8;
    
    doc.setFontSize(14);
    doc.text('Coût total avec terrain:', 140, yPos);
    doc.text(formatPrice(estimation.coutTotalAvecTerrain), 196, yPos, { align: 'right' });
    yPos += 15;
  }
  
  // Pied de page
  const pageCount = (doc as any).getNumberOfPages();
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  const footerText = 'Cette estimation est fournie à titre indicatif et pourrait varier selon les spécificités de votre projet.';
  doc.text(footerText, 105, 280, { align: 'center' });
  doc.text('© Progineer - Estimation générée le ' + new Date().toLocaleDateString('fr-FR'), 105, 285, { align: 'center' });
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} sur ${pageCount}`, 196, 285, { align: 'right' });
  }
  
  return doc;
};

// Fonction pour générer un PDF de devis professionnel
export const generateQuotePDF = (formData: FormData, estimationResult: number | null) => {
  // Créer un nouveau document PDF
  const doc = new jsPDF();
  
  // Générer un numéro de devis aléatoire
  const quoteNumber = `DEV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  
  // Dates
  const issueDate = new Date().toLocaleDateString('fr-FR');
  const validUntilDate = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');
  
  // En-tête du document
  doc.setFillColor(242, 242, 242);
  doc.rect(0, 0, 210, 40, 'F');
  
  // Titre du devis
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(74, 74, 74);
  doc.text('DEVIS', 105, 15, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(120, 120, 120);
  doc.text(`Numéro: ${quoteNumber}`, 105, 22, { align: 'center' });
  doc.text(`Émis le: ${issueDate} - Valable jusqu'au: ${validUntilDate}`, 105, 29, { align: 'center' });
  
  // Informations de l'entreprise et du client
  let yPos = 50;
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text('ENTREPRISE', 14, yPos);
  doc.text('CLIENT', 120, yPos);
  yPos += 7;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  
  // Détails de l'entreprise
  doc.text('Progineer', 14, yPos);
  doc.text(formData.name || 'Client', 120, yPos);
  yPos += 5;
  
  doc.text('229 Rue Saint-Honoré', 14, yPos);
  doc.text(formData.email || 'email@client.com', 120, yPos);
  yPos += 5;
  
  doc.text('75001 Paris, France', 14, yPos);
  doc.text(formData.phone || '', 120, yPos);
  yPos += 5;
  
  doc.text('SIRET: 93518678500018', 14, yPos);
  doc.text(formData.city || '', 120, yPos);
  yPos += 5;
  
  doc.text('N° TVA: FR80935186785', 14, yPos);
  yPos += 15;
  
  // Description du projet
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('DESCRIPTION DU PROJET', 14, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  
  const projectDesc = `${formData.projectType || 'Construction'} ${formData.surface ? `de ${formData.surface}m² ` : ''}${formData.city ? `à ${formData.city}` : ''}`;
  doc.text(projectDesc, 14, yPos);
  yPos += 15;
  
  // Tableau des prestations
  const tableData: string[][] = [];
  const baseHonoraires = estimationResult ? Math.min(estimationResult * 0.07, 10000) : 5000;
  
  // Prestations
  tableData.push([
    'DIRECTION, EXECUTION DES TRAVAUX / ORDONNACEMENT, PILOTAGE, COORDINATION',
    'Réunion(s)',
    '6',
    formatPrice(Math.round(baseHonoraires / 6)),
    '20%',
    formatPrice(Math.round(baseHonoraires))
  ]);
  
  tableData.push([
    'OPERATIONS PREALABLES A LA RECEPTION',
    'Forfait',
    '1',
    formatPrice(Math.round(baseHonoraires * 0.05)),
    '20%',
    formatPrice(Math.round(baseHonoraires * 0.05))
  ]);
  
  tableData.push([
    'RECEPTION DES TRAVAUX',
    'Forfait',
    '1',
    formatPrice(Math.round(baseHonoraires * 0.1)),
    '20%',
    formatPrice(Math.round(baseHonoraires * 0.1))
  ]);
  
  // Ajouter le tableau des prestations
  autoTable(doc, {
    startY: yPos,
    head: [['Description', 'Unité', 'Quantité', 'Prix U. HT', 'TVA', 'Total HT']],
    body: tableData,
    theme: 'striped',
    headStyles: {
      fillColor: [166, 150, 117],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnStyles: {
      0: { cellWidth: 75 },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 20, halign: 'center' },
      3: { cellWidth: 25, halign: 'right' },
      4: { cellWidth: 15, halign: 'center' },
      5: { cellWidth: 25, halign: 'right' }
    },
    margin: { left: 14, right: 14 },
    didDrawCell: (data) => {
      // Ajouter des détails sous certaines lignes
      if (data.row.index === 0 && data.column.index === 0 && !data.isHeaderCell) {
        const text = [
          'Lancement de chantier,',
          'Suivi de chantier comprenant des comptes rendus hebdomadaires,',
          'Ordonnancement, pilotage et coordination du chantier.'
        ];
        
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        
        let y = data.cell.y + data.cell.height + 3;
        text.forEach(line => {
          doc.text(line, data.cell.x + 3, y);
          y += 4;
        });
      }
    }
  });
  
  // Récupérer la position Y après le tableau
  const finalY = (doc as any).lastAutoTable.finalY;
  yPos = finalY + 15;
  
  // Calcul des totaux
  const totalHT = baseHonoraires + baseHonoraires * 0.05 + baseHonoraires * 0.1;
  const totalTVA = totalHT * 0.2;
  const totalTTC = totalHT + totalTVA;
  
  // Totaux
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Total HT', 140, yPos);
  doc.text(formatPrice(totalHT), 196, yPos, { align: 'right' });
  yPos += 8;
  
  doc.text('TVA (20%)', 140, yPos);
  doc.text(formatPrice(totalTVA), 196, yPos, { align: 'right' });
  yPos += 8;
  
  doc.setFontSize(12);
  doc.text('Total TTC', 140, yPos);
  doc.text(formatPrice(totalTTC), 196, yPos, { align: 'right' });
  yPos += 15;
  
  // Conditions de paiement
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('CONDITIONS DE PAIEMENT', 14, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('• Acompte de 30% à la signature du devis', 14, yPos);
  yPos += 5;
  doc.text('• 30% au démarrage des travaux', 14, yPos);
  yPos += 5;
  doc.text('• 30% à mi-chantier', 14, yPos);
  yPos += 5;
  doc.text('• Solde de 10% à la réception des travaux', 14, yPos);
  yPos += 12;
  
  // Informations bancaires
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('COORDONNÉES BANCAIRES', 14, yPos);
  yPos += 8;
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('IBAN: FR76 1751 5914 0508 0407 5262 387', 14, yPos);
  yPos += 5;
  doc.text('BIC: SXNBFRPP', 14, yPos);
  
  // Pied de page
  const pageCount = (doc as any).getNumberOfPages();
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('Ce devis est valable 60 jours à compter de sa date d\'émission.', 105, 277, { align: 'center' });
  doc.text('PGR PROGINEER - SAS au capital de 1 500 € - SIRET: 93518678500018 - TVA: FR80935186785', 105, 282, { align: 'center' });
  doc.text(`Devis ${quoteNumber} • Page 1 sur ${pageCount}`, 105, 287, { align: 'center' });
  
  return doc;
};

// Fonction principale pour générer le PDF approprié
export const generatePDF = (type: 'estimation' | 'quote', estimation: any, formData: FormData, estimationResult: number | null) => {
  try {
    let doc;
    
    if (type === 'estimation') {
      doc = generateEstimationPDF(estimation, formData);
    } else {
      doc = generateQuotePDF(formData, estimationResult);
    }
    
    // Générer le nom du fichier
    const fileName = type === 'estimation' 
      ? `Estimation_${formData.projectType || 'Projet'}_${formData.surface || '0'}m2_${new Date().toISOString().slice(0, 10)}.pdf`
      : `Devis_${formData.projectType || 'Projet'}_${formData.surface || '0'}m2_${new Date().toISOString().slice(0, 10)}.pdf`;
      
    // Télécharger le PDF
    doc.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    return false;
  }
};
