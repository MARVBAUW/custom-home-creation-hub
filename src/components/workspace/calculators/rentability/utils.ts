
import { InvestmentData, InvestmentResults, COLORS } from './types';

// Fonction pour calculer l'investissement
export const calculateInvestment = (investmentData: InvestmentData, previousResults: InvestmentResults) => {
  // Calcul du total de l'investissement
  const totalInvestment = investmentData.purchasePrice + investmentData.notaryFees + 
    investmentData.renovationCost + investmentData.furnitureCost;
  
  // Calcul du montant initial investi (apport personnel)
  const initialInvestment = totalInvestment - investmentData.loanAmount;
  
  // Calcul de la mensualité du prêt
  const monthlyRate = investmentData.loanRate / 12 / 100;
  const nbPayments = investmentData.loanDuration * 12;
  let monthlyPayment = 0;
  
  if (investmentData.loanAmount > 0 && monthlyRate > 0) {
    monthlyPayment = investmentData.loanAmount * monthlyRate * Math.pow(1 + monthlyRate, nbPayments) / 
      (Math.pow(1 + monthlyRate, nbPayments) - 1);
  }
  
  // Ajout de l'assurance prêt
  const loanInsurance = investmentData.loanAmount * (investmentData.loanInsuranceRate / 100) / 12;
  monthlyPayment += loanInsurance;
  
  // Calcul des revenus et charges mensuels
  const monthlyIncome = investmentData.rentalIncome;
  const monthlyIncomeAfterVacancy = monthlyIncome * (1 - investmentData.vacancyRate / 100);
  const monthlyIncomeAfterUnpaid = monthlyIncomeAfterVacancy * (1 - investmentData.unpaidRate / 100);
  
  // Charges mensuelles
  const monthlyExpenses = (
    (investmentData.propertyTax / 12) +
    (investmentData.managementFees > 0 ? investmentData.managementFees : 0) +
    (investmentData.condoFees / 12) +
    (investmentData.insurance / 12) +
    (investmentData.maintenanceProvision / 12)
  );
  
  // Calcul du cash-flow
  const monthlyCashFlow = monthlyIncomeAfterUnpaid - monthlyExpenses - monthlyPayment;
  const annualCashFlow = monthlyCashFlow * 12;
  
  // Calcul des rendements
  const grossYield = (monthlyIncome * 12 / totalInvestment) * 100;
  const netYield = ((monthlyIncomeAfterUnpaid - monthlyExpenses) * 12 / totalInvestment) * 100;
  
  // Retour sur investissement (apport)
  const cashOnCash = (annualCashFlow / initialInvestment) * 100;
  
  // Période d'amortissement
  const amortizationPeriod = initialInvestment > 0 && annualCashFlow > 0 
    ? initialInvestment / annualCashFlow 
    : 0;
  
  // Calcul du TRI sur 10 ans
  const calculateIRR = () => {
    let irr = 0;
    
    // Calcul très simplifié du TRI
    // Dans un cas réel, il faudrait utiliser une méthode numérique plus précise
    const totalInflow = annualCashFlow * 10 + 
      totalInvestment * Math.pow(1 + investmentData.propertyAppreciation / 100, 10);
    
    if (initialInvestment > 0) {
      irr = Math.pow(totalInflow / initialInvestment, 1/10) - 1;
    }
    
    return irr * 100;
  };
  
  const irr10Years = calculateIRR();
  
  // Créer le nouvel objet de résultats
  const newResults: InvestmentResults = {
    cashFlow: annualCashFlow,
    grossYield,
    netYield,
    roi: 0, // À calculer plus précisément
    monthlyPayment,
    totalInvestment,
    amortizationPeriod,
    cashOnCash,
    irr10Years,
    totalMonthlyExpenses: monthlyExpenses + monthlyPayment,
    monthlyCashFlow,
    initialInvestment
  };
  
  // Préparation des données pour les graphiques
  const chartData = prepareChartData(
    investmentData,
    newResults
  );
  
  return {
    newResults,
    newCashFlowData: chartData.cashFlowData,
    newExpensesData: chartData.expensesData,
    newPerformanceData: chartData.performanceData
  };
};

// Fonction pour préparer les données des graphiques
export const prepareChartData = (
  investmentData: InvestmentData,
  results: InvestmentResults
) => {
  // Calcul des variables nécessaires
  const monthlyIncome = investmentData.rentalIncome * (1 - investmentData.vacancyRate / 100) * (1 - investmentData.unpaidRate / 100);
  const monthlyExpenses = results.totalMonthlyExpenses - results.monthlyPayment;
  
  // Données pour le graphique de répartition des dépenses
  const expensesData = [
    { name: 'Remboursement prêt', value: results.monthlyPayment * 12 },
    { name: 'Taxe foncière', value: investmentData.propertyTax },
    { name: 'Charges copropriété', value: investmentData.condoFees },
    { name: 'Assurance', value: investmentData.insurance },
    { name: 'Provision travaux', value: investmentData.maintenanceProvision },
    { name: 'Gestion locative', value: investmentData.managementFees * 12 }
  ].filter(item => item.value > 0); // Filtrer les valeurs nulles
  
  // Données pour le cash flow mensuel
  const cashFlowData = [
    { name: 'Revenus locatifs', value: investmentData.rentalIncome },
    { name: 'Après vacance', value: investmentData.rentalIncome * (1 - investmentData.vacancyRate / 100) },
    { name: 'Après impayés', value: monthlyIncome },
    { name: 'Moins charges', value: monthlyIncome - monthlyExpenses },
    { name: 'Cash-flow final', value: results.monthlyCashFlow }
  ];
  
  // Données de performance sur 10 ans
  const performanceData = [];
  let cumulativeCashFlow = 0;
  
  for (let year = 0; year <= 10; year++) {
    // Valeur du bien avec appréciation
    const propertyValue = results.totalInvestment * Math.pow(1 + investmentData.propertyAppreciation / 100, year);
    
    // Cash-flow cumulé
    cumulativeCashFlow += year > 0 ? results.cashFlow : 0;
    
    // Patrimoine net (valeur - reste à rembourser)
    let loanRemaining = 0;
    if (year < investmentData.loanDuration) {
      const monthsPaid = year * 12;
      const totalMonths = investmentData.loanDuration * 12;
      const basePayment = results.monthlyPayment - (investmentData.loanAmount * (investmentData.loanInsuranceRate / 100) / 12);
      
      // Calcul approximatif du capital restant dû
      loanRemaining = investmentData.loanAmount * (1 - (monthsPaid / totalMonths)) * 1.1; // Approximation
    }
    
    performanceData.push({
      year,
      propertyValue,
      cumulativeCashFlow,
      netWorth: propertyValue - loanRemaining + cumulativeCashFlow
    });
  }
  
  return {
    cashFlowData,
    expensesData,
    performanceData
  };
};

// Fonction pour générer un PDF rapport
export const generatePDF = (investmentData: InvestmentData, results: InvestmentResults, expensesData: any[]) => {
  import('jspdf').then(({ jsPDF }) => {
    import('jspdf-autotable').then(() => {
      const doc = new jsPDF();
      
      // Titre
      doc.setFontSize(18);
      doc.text('Analyse de rentabilité immobilière', 105, 15, { align: 'center' });
      
      // Informations du projet
      doc.setFontSize(12);
      doc.text(`Projet: ${investmentData.projectName}`, 14, 30);
      doc.text(`Localisation: ${investmentData.location || 'Non spécifiée'}`, 14, 37);
      doc.text(`Type de bien: ${investmentData.propertyType === 'apartment' ? 'Appartement' : 'Maison'}`, 14, 44);
      doc.text(`Surface: ${investmentData.area} m²`, 14, 51);
      doc.text(`Date de l'analyse: ${new Date().toLocaleDateString('fr-FR')}`, 14, 58);
      
      // Principaux indicateurs
      doc.setFontSize(14);
      doc.text('Indicateurs de performance', 14, 70);
      doc.setFontSize(12);
      doc.text(`Prix d'achat: ${investmentData.purchasePrice.toLocaleString('fr-FR')} €`, 14, 80);
      doc.text(`Investissement total: ${results.totalInvestment.toLocaleString('fr-FR')} €`, 14, 87);
      doc.text(`Apport personnel: ${results.initialInvestment.toLocaleString('fr-FR')} €`, 14, 94);
      doc.text(`Loyer mensuel: ${investmentData.rentalIncome.toLocaleString('fr-FR')} €`, 14, 101);
      doc.text(`Cash-flow mensuel: ${results.monthlyCashFlow.toFixed(2)} €`, 14, 108);
      
      // Indicateurs de rentabilité
      doc.setFontSize(14);
      doc.text('Rentabilité', 14, 122);
      doc.setFontSize(12);
      doc.text(`Rendement brut: ${results.grossYield.toFixed(2)}%`, 14, 132);
      doc.text(`Rendement net: ${results.netYield.toFixed(2)}%`, 14, 139);
      doc.text(`Cash on Cash: ${results.cashOnCash.toFixed(2)}%`, 14, 146);
      doc.text(`TRI sur 10 ans: ${results.irr10Years.toFixed(2)}%`, 14, 153);
      doc.text(`Durée d'amortissement: ${results.amortizationPeriod.toFixed(1)} ans`, 14, 160);
      
      // Financement
      doc.setFontSize(14);
      doc.text('Financement', 14, 174);
      doc.setFontSize(12);
      doc.text(`Montant du prêt: ${investmentData.loanAmount.toLocaleString('fr-FR')} €`, 14, 184);
      doc.text(`Taux d'intérêt: ${investmentData.loanRate.toFixed(2)}%`, 14, 191);
      doc.text(`Durée: ${investmentData.loanDuration} ans`, 14, 198);
      doc.text(`Mensualité: ${results.monthlyPayment.toFixed(2)} €`, 14, 205);
      
      // Tableau récapitulatif des charges
      if (expensesData.length > 0) {
        doc.addPage();
        doc.setFontSize(14);
        doc.text('Détail des charges annuelles', 14, 20);
        
        // @ts-ignore
        doc.autoTable({
          startY: 30,
          head: [['Poste de dépense', 'Montant annuel (€)']],
          body: expensesData.map(item => [item.name, item.value.toFixed(2)]),
          foot: [['Total', expensesData.reduce((sum, item) => sum + item.value, 0).toFixed(2)]],
          headStyles: { fillColor: [162, 133, 84] },
          footStyles: { fillColor: [240, 240, 240], fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [245, 245, 240] }
        });
      }
      
      // Mentions légales
      const finalY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 20 : 220;
      doc.setFontSize(10);
      doc.text('Document généré par Progineer', 105, finalY, { align: 'center' });
      doc.text('Cette étude est fournie à titre indicatif et ne constitue pas un conseil en investissement.', 105, finalY + 7, { align: 'center' });
      
      // Sauvegarde
      doc.save(`Rentabilite_${investmentData.projectName.replace(/\s+/g, '_')}.pdf`);
    });
  });
};
