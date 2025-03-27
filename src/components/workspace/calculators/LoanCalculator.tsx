
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet, Download, Calculator, TrendingDown, Save, RotateCcw, FileText, ArrowDownToLine, InfoIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface LoanData {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  insuranceRate: number;
  brokerFees: number;
  guaranteeFees: number;
  fileFees: number;
  prepaymentOption: boolean;
  prepaymentPenalty: number;
  startDate: string;
  paymentFrequency: 'monthly' | 'bimonthly' | 'quarterly';
  profileType: 'firstTime' | 'investor' | 'senior';
  debtRatio: number;
  borrowerAge: number;
  projectType: 'primary' | 'secondary' | 'rental';
  projectName: string;
}

interface LoanResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalInsurance: number;
  totalCost: number;
  effectiveRate: number;
  debtServiceRatio: number;
  maxLoanAmount: number;
  amortizationTable: AmortizationRow[];
  endDate: string;
}

interface AmortizationRow {
  period: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  insurance: number;
  remainingBalance: number;
  cumulativePrincipal: number;
  cumulativeInterest: number;
  cumulativeInsurance: number;
}

interface ComparisonLoan {
  id: number;
  name: string;
  amount: number;
  rate: number;
  term: number;
  insuranceRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  color: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28554', '#C694D7'];

const LoanCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('main');
  const [loanData, setLoanData] = useState<LoanData>({
    loanAmount: 200000,
    interestRate: 3.85,
    loanTerm: 25,
    insuranceRate: 0.36,
    brokerFees: 0,
    guaranteeFees: 2200,
    fileFees: 1200,
    prepaymentOption: false,
    prepaymentPenalty: 3,
    startDate: new Date().toISOString().slice(0, 10),
    paymentFrequency: 'monthly',
    profileType: 'firstTime',
    debtRatio: 33,
    borrowerAge: 35,
    projectType: 'primary',
    projectName: 'Mon prêt immobilier'
  });
  
  const [results, setResults] = useState<LoanResults>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    totalInsurance: 0,
    totalCost: 0,
    effectiveRate: 0,
    debtServiceRatio: 0,
    maxLoanAmount: 0,
    amortizationTable: [],
    endDate: ''
  });
  
  const [hasCalculated, setHasCalculated] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [monthlyIncome, setMonthlyIncome] = useState(4000);
  const [comparisonLoans, setComparisonLoans] = useState<ComparisonLoan[]>([]);
  const [rateHistoryData, setRateHistoryData] = useState<any[]>([]);
  
  // Calcul du prêt
  const calculateLoan = () => {
    // Nombre de paiements
    const paymentsPerYear = loanData.paymentFrequency === 'monthly' ? 12 :
                            loanData.paymentFrequency === 'bimonthly' ? 6 : 4;
    const totalPayments = loanData.loanTerm * paymentsPerYear;
    
    // Taux périodique
    const periodicRate = loanData.interestRate / 100 / paymentsPerYear;
    const insurancePeriodicRate = loanData.insuranceRate / 100 / 12 * (12 / paymentsPerYear);
    
    // Calcul de la mensualité (formule du crédit amortissable)
    const paymentAmount = loanData.loanAmount * 
      (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
      (Math.pow(1 + periodicRate, totalPayments) - 1);
    
    // Assurance
    const insuranceAmount = loanData.loanAmount * insurancePeriodicRate;
    
    // Total par période
    const totalPeriodicPayment = paymentAmount + insuranceAmount;
    
    // Table d'amortissement
    const amortizationTable: AmortizationRow[] = [];
    let remainingBalance = loanData.loanAmount;
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;
    let cumulativeInsurance = 0;
    
    // Date de début
    const startDate = new Date(loanData.startDate);
    
    for (let i = 1; i <= totalPayments; i++) {
      // Calcul de la date de la période
      const paymentDate = new Date(startDate);
      if (loanData.paymentFrequency === 'monthly') {
        paymentDate.setMonth(startDate.getMonth() + i);
      } else if (loanData.paymentFrequency === 'bimonthly') {
        paymentDate.setMonth(startDate.getMonth() + i * 2);
      } else {
        paymentDate.setMonth(startDate.getMonth() + i * 3);
      }
      
      // Calcul des intérêts pour la période
      const interestPayment = remainingBalance * periodicRate;
      
      // Calcul du principal remboursé
      const principalPayment = paymentAmount - interestPayment;
      
      // Mise à jour du capital restant dû
      remainingBalance -= principalPayment;
      
      // Cumuls
      cumulativePrincipal += principalPayment;
      cumulativeInterest += interestPayment;
      cumulativeInsurance += insuranceAmount;
      
      amortizationTable.push({
        period: i,
        date: paymentDate.toISOString().slice(0, 10),
        payment: totalPeriodicPayment,
        principal: principalPayment,
        interest: interestPayment,
        insurance: insuranceAmount,
        remainingBalance: Math.max(0, remainingBalance),
        cumulativePrincipal,
        cumulativeInterest,
        cumulativeInsurance
      });
    }
    
    // Calcul du coût total du crédit
    const totalPayment = totalPeriodicPayment * totalPayments;
    const totalInterest = cumulativeInterest;
    const totalInsurance = cumulativeInsurance;
    const totalFees = loanData.brokerFees + loanData.guaranteeFees + loanData.fileFees;
    const totalCost = totalInterest + totalInsurance + totalFees;
    
    // Taux effectif global (approximation)
    const effectiveRate = ((totalCost / loanData.loanAmount) / loanData.loanTerm) * 100;
    
    // Ratio d'endettement
    const debtServiceRatio = (totalPeriodicPayment * (12 / paymentsPerYear) / monthlyIncome) * 100;
    
    // Capacité d'emprunt maximale
    const maxMonthlyPayment = monthlyIncome * (loanData.debtRatio / 100);
    const maxInsurancePayment = maxMonthlyPayment * (insuranceAmount / totalPeriodicPayment);
    const maxLoanPayment = maxMonthlyPayment - maxInsurancePayment;
    
    const maxLoanAmount = maxLoanPayment * 
      (Math.pow(1 + periodicRate, totalPayments) - 1) / 
      (periodicRate * Math.pow(1 + periodicRate, totalPayments));
    
    // Date de fin du prêt
    const endDate = amortizationTable[amortizationTable.length - 1].date;
    
    // Mise à jour des résultats
    setResults({
      monthlyPayment: totalPeriodicPayment * (12 / paymentsPerYear) / 12, // Conversion en équivalent mensuel
      totalPayment,
      totalInterest,
      totalInsurance,
      totalCost,
      effectiveRate,
      debtServiceRatio,
      maxLoanAmount,
      amortizationTable,
      endDate
    });
    
    // Génération des données de comparaison
    generateComparisonLoans();
    
    // Génération des données historiques des taux
    generateRateHistoryData();
    
    setHasCalculated(true);
    
    toast({
      title: "Calcul effectué",
      description: "Les résultats du prêt ont été mis à jour",
    });
  };
  
  // Génération des données de comparaison
  const generateComparisonLoans = () => {
    // Prêt actuel
    const currentLoan: ComparisonLoan = {
      id: 1,
      name: "Simulation actuelle",
      amount: loanData.loanAmount,
      rate: loanData.interestRate,
      term: loanData.loanTerm,
      insuranceRate: loanData.insuranceRate,
      monthlyPayment: 0, // Sera calculé
      totalInterest: 0,  // Sera calculé
      totalCost: 0,      // Sera calculé
      color: COLORS[0]
    };
    
    // Prêts alternatifs pour comparaison
    const alternatives: ComparisonLoan[] = [
      {
        id: 2,
        name: "Taux inférieur",
        amount: loanData.loanAmount,
        rate: Math.max(0.5, loanData.interestRate - 0.5),
        term: loanData.loanTerm,
        insuranceRate: loanData.insuranceRate,
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        color: COLORS[1]
      },
      {
        id: 3,
        name: "Durée plus courte",
        amount: loanData.loanAmount,
        rate: loanData.interestRate,
        term: Math.max(10, loanData.loanTerm - 5),
        insuranceRate: loanData.insuranceRate,
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        color: COLORS[2]
      },
      {
        id: 4,
        name: "Assurance optimisée",
        amount: loanData.loanAmount,
        rate: loanData.interestRate,
        term: loanData.loanTerm,
        insuranceRate: Math.max(0.1, loanData.insuranceRate - 0.15),
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        color: COLORS[3]
      }
    ];
    
    // Calcul des résultats pour chaque prêt
    const allLoans = [currentLoan, ...alternatives];
    allLoans.forEach(loan => {
      // Valeurs mensuelles
      const periodicRate = loan.rate / 100 / 12;
      const totalPayments = loan.term * 12;
      const insuranceMonthly = loan.amount * (loan.insuranceRate / 100 / 12);
      
      // Calcul de la mensualité sans assurance
      const paymentWithoutInsurance = loan.amount * 
        (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
        (Math.pow(1 + periodicRate, totalPayments) - 1);
      
      // Total mensuel
      loan.monthlyPayment = paymentWithoutInsurance + insuranceMonthly;
      
      // Coût total des intérêts
      loan.totalInterest = (paymentWithoutInsurance * totalPayments) - loan.amount;
      
      // Coût total (intérêts + assurance + frais)
      const totalInsurance = insuranceMonthly * totalPayments;
      const totalFees = loanData.brokerFees + loanData.guaranteeFees + loanData.fileFees;
      loan.totalCost = loan.totalInterest + totalInsurance + totalFees;
    });
    
    setComparisonLoans(allLoans);
  };
  
  // Génération des données historiques des taux
  const generateRateHistoryData = () => {
    // Données simplifiées pour illustration
    const historicalRates = [
      { date: '2012-01', rate: 4.1 },
      { date: '2013-01', rate: 3.7 },
      { date: '2014-01', rate: 3.5 },
      { date: '2015-01', rate: 2.9 },
      { date: '2016-01', rate: 2.5 },
      { date: '2017-01', rate: 1.9 },
      { date: '2018-01', rate: 1.7 },
      { date: '2019-01', rate: 1.6 },
      { date: '2020-01', rate: 1.4 },
      { date: '2021-01', rate: 1.1 },
      { date: '2022-01', rate: 1.3 },
      { date: '2022-07', rate: 1.8 },
      { date: '2023-01', rate: 2.7 },
      { date: '2023-06', rate: 3.4 },
      { date: '2023-12', rate: 3.9 },
      { date: '2024-03', rate: loanData.interestRate }
    ];
    
    setRateHistoryData(historicalRates);
  };
  
  const resetCalculator = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le calculateur ? Toutes les données seront perdues.")) {
      setLoanData({
        loanAmount: 200000,
        interestRate: 3.85,
        loanTerm: 25,
        insuranceRate: 0.36,
        brokerFees: 0,
        guaranteeFees: 2200,
        fileFees: 1200,
        prepaymentOption: false,
        prepaymentPenalty: 3,
        startDate: new Date().toISOString().slice(0, 10),
        paymentFrequency: 'monthly',
        profileType: 'firstTime',
        debtRatio: 33,
        borrowerAge: 35,
        projectType: 'primary',
        projectName: 'Mon prêt immobilier'
      });
      setMonthlyIncome(4000);
      setHasCalculated(false);
      
      toast({
        title: "Calculateur réinitialisé",
        description: "Toutes les données ont été effacées."
      });
    }
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Titre
    doc.setFontSize(20);
    doc.text('Simulation de prêt immobilier', 105, 15, { align: 'center' });
    
    // Informations du projet
    doc.setFontSize(12);
    doc.text(`Projet: ${loanData.projectName}`, 14, 30);
    doc.text(`Type de projet: ${
      loanData.projectType === 'primary' ? 'Résidence principale' : 
      loanData.projectType === 'secondary' ? 'Résidence secondaire' : 'Investissement locatif'
    }`, 14, 37);
    doc.text(`Profil emprunteur: ${
      loanData.profileType === 'firstTime' ? 'Premier achat' : 
      loanData.profileType === 'investor' ? 'Investisseur' : 'Senior'
    }`, 14, 44);
    doc.text(`Date de simulation: ${new Date().toLocaleDateString('fr-FR')}`, 14, 51);
    
    // Caractéristiques du prêt
    doc.setFontSize(14);
    doc.text('Caractéristiques du prêt', 14, 65);
    doc.setFontSize(12);
    doc.text(`Montant emprunté: ${loanData.loanAmount.toLocaleString('fr-FR')} €`, 14, 75);
    doc.text(`Taux d'intérêt: ${loanData.interestRate.toFixed(2)}%`, 14, 82);
    doc.text(`Durée: ${loanData.loanTerm} ans`, 14, 89);
    doc.text(`Taux d'assurance: ${loanData.insuranceRate.toFixed(2)}%`, 14, 96);
    doc.text(`Périodicité: ${
      loanData.paymentFrequency === 'monthly' ? 'Mensuelle' : 
      loanData.paymentFrequency === 'bimonthly' ? 'Bimestrielle' : 'Trimestrielle'
    }`, 14, 103);
    
    // Résultats principaux
    doc.setFontSize(14);
    doc.text('Résultats du prêt', 14, 117);
    doc.setFontSize(12);
    doc.text(`Mensualité: ${results.monthlyPayment.toFixed(2)} €`, 14, 127);
    doc.text(`Coût total du crédit: ${results.totalCost.toLocaleString('fr-FR')} €`, 14, 134);
    doc.text(`Total des intérêts: ${results.totalInterest.toLocaleString('fr-FR')} €`, 14, 141);
    doc.text(`Total assurance: ${results.totalInsurance.toLocaleString('fr-FR')} €`, 14, 148);
    doc.text(`Taux d'endettement: ${results.debtServiceRatio.toFixed(2)}%`, 14, 155);
    doc.text(`Échéance du prêt: ${new Date(results.endDate).toLocaleDateString('fr-FR')}`, 14, 162);
    
    // Extrait du tableau d'amortissement
    if (results.amortizationTable.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.text('Extrait du tableau d\'amortissement', 14, 20);
      
      // Sélectionner un échantillon représentatif
      const samplePeriods = [0, 4, 9, 14, 19, 24].filter(i => i < results.amortizationTable.length);
      const sampleRows = samplePeriods.map(i => results.amortizationTable[i]);
      
      // Ajouter la dernière ligne
      if (results.amortizationTable.length > 30 && !samplePeriods.includes(results.amortizationTable.length - 1)) {
        sampleRows.push(results.amortizationTable[results.amortizationTable.length - 1]);
      }
      
      // @ts-ignore
      doc.autoTable({
        startY: 30,
        head: [['N°', 'Date', 'Mensualité', 'Capital', 'Intérêts', 'Assurance', 'Capital restant']],
        body: sampleRows.map(row => [
          row.period,
          new Date(row.date).toLocaleDateString('fr-FR'),
          row.payment.toFixed(2) + ' €',
          row.principal.toFixed(2) + ' €',
          row.interest.toFixed(2) + ' €',
          row.insurance.toFixed(2) + ' €',
          row.remainingBalance.toFixed(2) + ' €'
        ]),
        headStyles: { fillColor: [162, 133, 84] }
      });
      
      // Note
      const finalY = (doc as any).lastAutoTable.finalY || 200;
      doc.setFontSize(10);
      doc.text('Note: Seul un échantillon représentatif du tableau d\'amortissement est présenté ici.', 14, finalY + 10);
    }
    
    // Mentions légales
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Mentions légales', 14, 20);
    doc.setFontSize(10);
    doc.text('Ce document est une simulation fournie à titre indicatif et n\'a aucune valeur contractuelle.', 14, 30);
    doc.text('Les calculs sont basés sur les informations que vous avez saisies et sur des hypothèses simplifiées.', 14, 40);
    doc.text('Les taux, frais et conditions réels proposés par les établissements financiers peuvent varier.', 14, 50);
    doc.text('Nous vous recommandons de consulter un conseiller financier pour une étude personnalisée.', 14, 60);
    
    doc.setFontSize(14);
    doc.text('Comparatif des solutions', 14, 80);
    
    // @ts-ignore
    doc.autoTable({
      startY: 90,
      head: [['Solution', 'Taux', 'Durée', 'Mensualité', 'Coût total']],
      body: comparisonLoans.map(loan => [
        loan.name,
        loan.rate.toFixed(2) + ' %',
        loan.term + ' ans',
        loan.monthlyPayment.toFixed(2) + ' €',
        loan.totalCost.toLocaleString('fr-FR') + ' €'
      ]),
      headStyles: { fillColor: [162, 133, 84] }
    });
    
    // Pied de page
    const finalY = doc.internal.pageSize.height - 20;
    doc.setFontSize(10);
    doc.text('Document généré par Progineer', 105, finalY, { align: 'center' });
    
    // Sauvegarde
    doc.save(`Simulation_pret_${loanData.projectName.replace(/\s+/g, '_')}.pdf`);
    
    toast({
      title: "PDF généré avec succès",
      description: "Le document a été téléchargé sur votre appareil."
    });
  };
  
  const saveToLocalStorage = () => {
    const data = {
      loanData,
      monthlyIncome,
      hasCalculated,
      results
    };
    
    localStorage.setItem('loanCalculator', JSON.stringify(data));
    
    toast({
      title: "Projet sauvegardé",
      description: "Vos calculs ont été enregistrés localement."
    });
  };
  
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('loanCalculator');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setLoanData(data.loanData);
        setMonthlyIncome(data.monthlyIncome);
        setHasCalculated(data.hasCalculated);
        setResults(data.results);
        
        // Regénérer les données de comparaison et historiques
        if (data.hasCalculated) {
          generateComparisonLoans();
          generateRateHistoryData();
        }
        
        toast({
          title: "Projet chargé",
          description: "Vos calculs ont été restaurés."
        });
      } catch (e) {
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les données sauvegardées.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "Aucune sauvegarde",
        description: "Aucun projet sauvegardé n'a été trouvé."
      });
    }
  };
  
  const handleInputChange = (field: keyof LoanData, value: any) => {
    setLoanData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Convertir une mensualité en annuité
  const formatAnnuity = (monthlyValue: number) => {
    return (monthlyValue * 12).toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };
  
  // Calculer la part de chaque composant dans la mensualité
  const calculatePaymentBreakdown = () => {
    if (!hasCalculated) return [];
    
    const principalPart = results.monthlyPayment - 
      (loanData.loanAmount * loanData.interestRate / 100 / 12) - 
      (loanData.loanAmount * loanData.insuranceRate / 100 / 12);
      
    const interestPart = loanData.loanAmount * loanData.interestRate / 100 / 12;
    const insurancePart = loanData.loanAmount * loanData.insuranceRate / 100 / 12;
    
    return [
      { name: 'Capital', value: principalPart },
      { name: 'Intérêts', value: interestPart },
      { name: 'Assurance', value: insurancePart }
    ];
  };
  
  // Préparer les données pour le graphique d'évolution du capital restant dû
  const prepareAmortizationChartData = () => {
    if (!hasCalculated || results.amortizationTable.length === 0) return [];
    
    // Sélectionner des points représentatifs (un point par an)
    const pointsPerYear = loanData.paymentFrequency === 'monthly' ? 12 :
                          loanData.paymentFrequency === 'bimonthly' ? 6 : 4;
                          
    return results.amortizationTable
      .filter((_, index) => index % pointsPerYear === 0)
      .map(row => ({
        period: Math.floor(row.period / pointsPerYear),
        principal: row.cumulativePrincipal,
        interest: row.cumulativeInterest,
        insurance: row.cumulativeInsurance,
        remainingBalance: row.remainingBalance
      }));
  };
  
  // Formatter les dates pour les étiquettes du graphique
  const formatDateForChart = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getFullYear().toString().substring(2)}`;
  };
  
  // Progression de l'avancement du prêt (0-100%)
  const calculateLoanProgress = () => {
    if (!hasCalculated) return 0;
    
    // Déterminer la date actuelle
    const today = new Date();
    const startDate = new Date(loanData.startDate);
    const endDate = new Date(results.endDate);
    
    // Si le prêt n'a pas encore commencé
    if (today < startDate) return 0;
    
    // Si le prêt est terminé
    if (today > endDate) return 100;
    
    // Calcul de la progression
    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedTime = today.getTime() - startDate.getTime();
    
    return (elapsedTime / totalDuration) * 100;
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-khaki-600" />
              Calculateur de prêt immobilier
            </CardTitle>
            <CardDescription>
              Simulez votre crédit immobilier et analysez sa rentabilité
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={resetCalculator}>
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Réinitialiser le calculateur</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={saveToLocalStorage}>
                    <Save className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sauvegarder le projet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={loadFromLocalStorage}>
                    <ArrowDownToLine className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Charger le projet sauvegardé</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="main" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="main">Principal</TabsTrigger>
            <TabsTrigger value="advanced">Avancé</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="table">Amortissement</TabsTrigger>
          </TabsList>
          
          {/* Onglet Principal */}
          <TabsContent value="main" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Nom du projet</Label>
                  <Input 
                    id="projectName" 
                    value={loanData.projectName} 
                    onChange={(e) => handleInputChange('projectName', e.target.value)} 
                    placeholder="Mon prêt immobilier"
                  />
                </div>
                
                <div>
                  <Label htmlFor="loanAmount">Montant du prêt (€)</Label>
                  <Input 
                    id="loanAmount" 
                    type="number" 
                    value={loanData.loanAmount} 
                    onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)} 
                    placeholder="Montant emprunté"
                  />
                </div>
                
                <div>
                  <Label htmlFor="interestRate">Taux d'intérêt (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="interestRate"
                      min={0.5}
                      max={7}
                      step={0.05}
                      value={[loanData.interestRate]}
                      onValueChange={(value) => handleInputChange('interestRate', value[0])}
                      className="flex-1"
                    />
                    <span className="w-16 text-right">{loanData.interestRate.toFixed(2)}%</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="loanTerm">Durée du prêt (années)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="loanTerm"
                      min={5}
                      max={35}
                      step={1}
                      value={[loanData.loanTerm]}
                      onValueChange={(value) => handleInputChange('loanTerm', value[0])}
                      className="flex-1"
                    />
                    <span className="w-16 text-right">{loanData.loanTerm} ans</span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="insuranceRate">Taux d'assurance emprunteur (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="insuranceRate"
                      min={0}
                      max={1}
                      step={0.01}
                      value={[loanData.insuranceRate]}
                      onValueChange={(value) => handleInputChange('insuranceRate', value[0])}
                      className="flex-1"
                    />
                    <span className="w-16 text-right">{loanData.insuranceRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="monthlyIncome">Revenu mensuel net (€)</Label>
                  <Input 
                    id="monthlyIncome" 
                    type="number" 
                    value={monthlyIncome} 
                    onChange={(e) => setMonthlyIncome(parseFloat(e.target.value) || 0)} 
                    placeholder="Revenus mensuels nets"
                  />
                  <p className="text-xs text-gray-500 mt-1">Nécessaire pour calculer le taux d'endettement</p>
                </div>
                
                <div>
                  <Label htmlFor="debtRatio">Taux d'endettement maximal (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="debtRatio"
                      min={10}
                      max={50}
                      step={1}
                      value={[loanData.debtRatio]}
                      onValueChange={(value) => handleInputChange('debtRatio', value[0])}
                      className="flex-1"
                    />
                    <span className="w-16 text-right">{loanData.debtRatio}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Généralement limité à 35% par les banques</p>
                </div>
                
                <div>
                  <Label htmlFor="startDate">Date de début du prêt</Label>
                  <Input 
                    id="startDate" 
                    type="date" 
                    value={loanData.startDate} 
                    onChange={(e) => handleInputChange('startDate', e.target.value)} 
                  />
                </div>
                
                <div>
                  <Label htmlFor="projectType">Type de projet</Label>
                  <Select 
                    value={loanData.projectType} 
                    onValueChange={(value: any) => handleInputChange('projectType', value)}
                  >
                    <SelectTrigger id="projectType">
                      <SelectValue placeholder="Type de projet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="primary">Résidence principale</SelectItem>
                      <SelectItem value="secondary">Résidence secondaire</SelectItem>
                      <SelectItem value="rental">Investissement locatif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="profileType">Profil emprunteur</Label>
                  <Select 
                    value={loanData.profileType} 
                    onValueChange={(value: any) => handleInputChange('profileType', value)}
                  >
                    <SelectTrigger id="profileType">
                      <SelectValue placeholder="Profil emprunteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="firstTime">Premier achat</SelectItem>
                      <SelectItem value="investor">Investisseur</SelectItem>
                      <SelectItem value="senior">Senior (55+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <Button onClick={calculateLoan} className="w-full mt-6">
              <Calculator className="h-4 w-4 mr-2" />
              Calculer le prêt
            </Button>
            
            {hasCalculated && (
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Résultat du calcul</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Mensualité</div>
                      <div className="text-2xl font-bold">{results.monthlyPayment.toFixed(2)} €</div>
                      <div className="text-xs text-gray-500">
                        {formatAnnuity(results.monthlyPayment)} par an
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Coût total du crédit</div>
                      <div className="text-2xl font-bold">{results.totalCost.toLocaleString('fr-FR')} €</div>
                      <div className="text-xs text-gray-500">
                        Intérêts + assurance + frais
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-500">Taux d'endettement</div>
                      <div className="text-2xl font-bold">
                        {results.debtServiceRatio.toFixed(1)}%
                        <Badge 
                          className="ml-2"
                          variant={results.debtServiceRatio <= loanData.debtRatio ? "outline" : "destructive"}
                        >
                          {results.debtServiceRatio <= loanData.debtRatio ? "OK" : "Dépassé"}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Limite recommandée: {loanData.debtRatio}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab('results')}>
                      Voir les résultats détaillés
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Onglet Avancé */}
          <TabsContent value="advanced" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="brokerFees">Frais de courtage (€)</Label>
                  <Input 
                    id="brokerFees" 
                    type="number" 
                    value={loanData.brokerFees} 
                    onChange={(e) => handleInputChange('brokerFees', parseFloat(e.target.value) || 0)} 
                    placeholder="Frais de courtage"
                  />
                </div>
                
                <div>
                  <Label htmlFor="guaranteeFees">Frais de garantie (€)</Label>
                  <Input 
                    id="guaranteeFees" 
                    type="number" 
                    value={loanData.guaranteeFees} 
                    onChange={(e) => handleInputChange('guaranteeFees', parseFloat(e.target.value) || 0)} 
                    placeholder="Frais de garantie (hypothèque, caution...)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Estimation: environ 1-1.5% du montant emprunté pour une caution
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="fileFees">Frais de dossier (€)</Label>
                  <Input 
                    id="fileFees" 
                    type="number" 
                    value={loanData.fileFees} 
                    onChange={(e) => handleInputChange('fileFees', parseFloat(e.target.value) || 0)} 
                    placeholder="Frais de dossier bancaire"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Généralement entre 500€ et 1.5% du montant emprunté
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="borrowerAge">Âge de l'emprunteur</Label>
                  <Input 
                    id="borrowerAge" 
                    type="number" 
                    value={loanData.borrowerAge} 
                    onChange={(e) => handleInputChange('borrowerAge', parseInt(e.target.value) || 0)} 
                    placeholder="Âge"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paymentFrequency">Périodicité des échéances</Label>
                  <Select 
                    value={loanData.paymentFrequency} 
                    onValueChange={(value: any) => handleInputChange('paymentFrequency', value)}
                  >
                    <SelectTrigger id="paymentFrequency">
                      <SelectValue placeholder="Périodicité des paiements" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensuelle</SelectItem>
                      <SelectItem value="bimonthly">Bimestrielle</SelectItem>
                      <SelectItem value="quarterly">Trimestrielle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="prepaymentOption">Option de remboursement anticipé</Label>
                    <Switch
                      id="prepaymentOption"
                      checked={loanData.prepaymentOption}
                      onCheckedChange={(checked) => handleInputChange('prepaymentOption', checked)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Prévoyez-vous de rembourser partiellement ou totalement par anticipation ?
                  </p>
                </div>
                
                {loanData.prepaymentOption && (
                  <div>
                    <Label htmlFor="prepaymentPenalty">Pénalités de remboursement anticipé (%)</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        id="prepaymentPenalty"
                        min={0}
                        max={6}
                        step={0.5}
                        value={[loanData.prepaymentPenalty]}
                        onValueChange={(value) => handleInputChange('prepaymentPenalty', value[0])}
                        className="flex-1"
                      />
                      <span className="w-16 text-right">{loanData.prepaymentPenalty}%</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Généralement entre 0% et 3% du capital remboursé par anticipation
                    </p>
                  </div>
                )}
                
                <div className="pt-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="text-sm font-medium text-blue-800 mb-2 flex items-center">
                      <InfoIcon className="h-4 w-4 mr-1" />
                      Informations sur les frais
                    </h3>
                    <p className="text-xs text-blue-700">
                      Les frais de garantie dépendent du type de garantie choisie (hypothèque, caution bancaire, 
                      organisme de caution mutuelle comme Crédit Logement). Ils varient généralement entre 1% et 
                      2% du montant emprunté.
                    </p>
                    <p className="text-xs text-blue-700 mt-2">
                      Les frais de dossier sont facturés par la banque pour l'étude et la mise en place du crédit. 
                      Ils sont parfois négociables, en particulier si vous avez un bon profil d'emprunteur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <Button onClick={calculateLoan} className="w-full mt-6">
              <Calculator className="h-4 w-4 mr-2" />
              Calculer le prêt avec options avancées
            </Button>
          </TabsContent>
          
          {/* Onglet Résultats */}
          <TabsContent value="results" className="space-y-6">
            {hasCalculated ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Wallet className="h-4 w-4 text-gray-500" />
                        Mensualité
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{results.monthlyPayment.toFixed(2)} €</div>
                      <div className="text-sm text-gray-500">
                        {formatAnnuity(results.monthlyPayment)} par an
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <TrendingDown className="h-4 w-4 text-gray-500" />
                        Taux d'endettement
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {results.debtServiceRatio.toFixed(1)}%
                        <Badge 
                          className="ml-2"
                          variant={results.debtServiceRatio <= loanData.debtRatio ? "outline" : "destructive"}
                        >
                          {results.debtServiceRatio <= loanData.debtRatio ? "OK" : "Dépassé"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-500">
                        Limite recommandée: {loanData.debtRatio}%
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        Capacité d'emprunt
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{results.maxLoanAmount.toLocaleString('fr-FR')} €</div>
                      <div className="text-sm text-gray-500">
                        Selon votre taux d'endettement max.
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Composition de la mensualité</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={calculatePaymentBreakdown()}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {calculatePaymentBreakdown().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <ReTooltip formatter={(value: number) => `${value.toFixed(2)} €`} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Évolution du capital restant dû</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={prepareAmortizationChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              dataKey="period" 
                              label={{ value: 'Années', position: 'insideBottom', offset: -5 }} 
                            />
                            <YAxis />
                            <ReTooltip 
                              formatter={(value: number) => `${value.toLocaleString('fr-FR')} €`} 
                            />
                            <Area 
                              type="monotone" 
                              dataKey="remainingBalance" 
                              name="Capital restant dû"
                              stackId="1" 
                              stroke="#8884d8" 
                              fill="#8884d8" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Évolution des taux d'intérêt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={rateHistoryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            label={{ value: 'Période', position: 'insideBottom', offset: -5 }} 
                          />
                          <YAxis />
                          <ReTooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
                          <Line 
                            type="monotone" 
                            dataKey="rate" 
                            name="Taux moyen"
                            stroke="#a28554" 
                            activeDot={{ r: 8 }} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Comparaison de solutions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Solution</TableHead>
                          <TableHead>Taux</TableHead>
                          <TableHead>Durée</TableHead>
                          <TableHead>Mensualité</TableHead>
                          <TableHead>Coût total</TableHead>
                          <TableHead>Économie</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {comparisonLoans.map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">
                              {loan.name}
                              {loan.id === 1 && (
                                <Badge variant="outline" className="ml-2">
                                  Actuel
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>{loan.rate.toFixed(2)}%</TableCell>
                            <TableCell>{loan.term} ans</TableCell>
                            <TableCell>{loan.monthlyPayment.toFixed(2)} €</TableCell>
                            <TableCell>{loan.totalCost.toLocaleString('fr-FR')} €</TableCell>
                            <TableCell>
                              {loan.id === 1 ? (
                                "—"
                              ) : (
                                <span className={loan.totalCost < comparisonLoans[0].totalCost ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                  {(comparisonLoans[0].totalCost - loan.totalCost).toLocaleString('fr-FR')} €
                                </span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Récapitulatif financier</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Total à rembourser</div>
                        <div className="text-lg font-medium">{results.totalPayment.toLocaleString('fr-FR')} €</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Total des intérêts</div>
                        <div className="text-lg font-medium">{results.totalInterest.toLocaleString('fr-FR')} €</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Total de l'assurance</div>
                        <div className="text-lg font-medium">{results.totalInsurance.toLocaleString('fr-FR')} €</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Fin du prêt</div>
                        <div className="text-lg font-medium">{new Date(results.endDate).toLocaleDateString('fr-FR')}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Montant emprunté</div>
                        <div className="text-lg font-medium">{loanData.loanAmount.toLocaleString('fr-FR')} €</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Frais de garantie</div>
                        <div className="text-lg font-medium">{loanData.guaranteeFees.toLocaleString('fr-FR')} €</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Frais de dossier</div>
                        <div className="text-lg font-medium">{loanData.fileFees.toLocaleString('fr-FR')} €</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Coût total du crédit</div>
                        <div className="text-lg font-medium">{results.totalCost.toLocaleString('fr-FR')} €</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="text-sm font-medium mb-2">Progression du prêt</div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-khaki-600 rounded-full"
                          style={{ width: `${calculateLoanProgress()}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{new Date(loanData.startDate).toLocaleDateString('fr-FR')}</span>
                        <span>{calculateLoanProgress().toFixed(1)}% remboursé</span>
                        <span>{new Date(results.endDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-end">
                  <Button onClick={generatePDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le rapport PDF
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-khaki-100 mb-4">
                  <Calculator className="h-8 w-8 text-khaki-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Aucun calcul effectué</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Veuillez remplir les informations nécessaires dans les onglets précédents et calculer le prêt.
                </p>
                <Button onClick={() => setActiveTab('main')}>
                  Commencer la simulation
                </Button>
              </div>
            )}
          </TabsContent>
          
          {/* Onglet Tableau d'amortissement */}
          <TabsContent value="table" className="space-y-6">
            {hasCalculated && results.amortizationTable.length > 0 ? (
              <>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Prêt</div>
                      <div className="text-lg font-medium">{loanData.loanAmount.toLocaleString('fr-FR')} €</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Mensualité</div>
                      <div className="text-lg font-medium">{results.monthlyPayment.toFixed(2)} €</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Périodicité</div>
                      <div className="text-lg font-medium">
                        {loanData.paymentFrequency === 'monthly' ? 'Mensuelle' : 
                         loanData.paymentFrequency === 'bimonthly' ? 'Bimestrielle' : 'Trimestrielle'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="max-h-[500px] overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                      <TableRow>
                        <TableHead>N°</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Échéance</TableHead>
                        <TableHead>Capital</TableHead>
                        <TableHead>Intérêts</TableHead>
                        <TableHead>Assurance</TableHead>
                        <TableHead>Capital restant</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.amortizationTable.map((row) => (
                        <TableRow key={row.period}>
                          <TableCell>{row.period}</TableCell>
                          <TableCell>{new Date(row.date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>{row.payment.toFixed(2)} €</TableCell>
                          <TableCell>{row.principal.toFixed(2)} €</TableCell>
                          <TableCell>{row.interest.toFixed(2)} €</TableCell>
                          <TableCell>{row.insurance.toFixed(2)} €</TableCell>
                          <TableCell>{row.remainingBalance.toFixed(2)} €</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => window.print()}>
                    Imprimer le tableau
                  </Button>
                  <Button onClick={generatePDF}>
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le rapport PDF
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-khaki-100 mb-4">
                  <FileText className="h-8 w-8 text-khaki-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Aucun tableau d'amortissement disponible</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  Veuillez d'abord effectuer une simulation de prêt pour générer le tableau d'amortissement.
                </p>
                <Button onClick={() => setActiveTab('main')}>
                  Commencer la simulation
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="border-t pt-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Ce calculateur donne une estimation basée sur les informations fournies. Consultez un professionnel du crédit pour un avis personnalisé.
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={saveToLocalStorage}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoanCalculator;
