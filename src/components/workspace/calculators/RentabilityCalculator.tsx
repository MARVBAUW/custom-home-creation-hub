import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Calculator, BarChart as BarChartIcon, TrendingDown, TrendingUp, Banknote, PieChart as PieChartIcon, Save, RotateCcw, InfoIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface InvestmentData {
  purchasePrice: number;
  notaryFees: number;
  renovationCost: number;
  furnitureCost: number;
  propertyTax: number;
  managementFees: number;
  condoFees: number;
  insurance: number;
  maintenanceProvision: number;
  vacancyRate: number;
  unpaidRate: number;
  rentalIncome: number;
  propertyAppreciation: number;
  loanAmount: number;
  loanRate: number;
  loanDuration: number;
  loanInsuranceRate: number;
  area: number;
  fiscalOption: 'real' | 'micro' | 'lmnp' | 'furnished';
  includeAmortization: boolean;
  propertyAge: number;
  rentalCharges: number;
  projectName: string;
  location: string;
  propertyType: string;
}

interface InvestmentResults {
  cashFlow: number;
  grossYield: number;
  netYield: number;
  roi: number;
  monthlyPayment: number;
  totalInvestment: number;
  amortizationPeriod: number;
  cashOnCash: number;
  irr10Years: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  initialInvestment: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28554', '#C694D7'];

const RentabilityCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('purchase');
  const [investmentData, setInvestmentData] = useState<InvestmentData>({
    purchasePrice: 200000,
    notaryFees: 15000,
    renovationCost: 10000,
    furnitureCost: 0,
    propertyTax: 1200,
    managementFees: 0,
    condoFees: 1800,
    insurance: 400,
    maintenanceProvision: 800,
    vacancyRate: 5,
    unpaidRate: 0,
    rentalIncome: 900,
    propertyAppreciation: 2,
    loanAmount: 180000,
    loanRate: 3.5,
    loanDuration: 20,
    loanInsuranceRate: 0.34,
    area: 60,
    fiscalOption: 'real',
    includeAmortization: true,
    propertyAge: 15,
    rentalCharges: 100,
    projectName: 'Mon investissement',
    location: '',
    propertyType: 'apartment'
  });
  const [results, setResults] = useState<InvestmentResults>({
    cashFlow: 0,
    grossYield: 0,
    netYield: 0,
    roi: 0,
    monthlyPayment: 0,
    totalInvestment: 0,
    amortizationPeriod: 0,
    cashOnCash: 0,
    irr10Years: 0,
    totalMonthlyExpenses: 0,
    monthlyCashFlow: 0,
    initialInvestment: 0
  });
  const [taxRate, setTaxRate] = useState(30);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [cashFlowData, setCashFlowData] = useState<any[]>([]);
  const [expensesData, setExpensesData] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  const calculateInvestment = () => {
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
    
    // Mise à jour des résultats
    setResults({
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
    });
    
    // Préparation des données pour les graphiques
    prepareChartData(
      monthlyIncomeAfterUnpaid,
      monthlyExpenses,
      monthlyPayment,
      totalInvestment,
      initialInvestment
    );
    
    setHasCalculated(true);
    
    toast({
      title: "Calcul effectué",
      description: "Les résultats de rentabilité ont été mis à jour",
    });
  };

  const prepareChartData = (
    monthlyIncome: number,
    monthlyExpenses: number,
    monthlyPayment: number,
    totalInvestment: number,
    initialInvestment: number
  ) => {
    // Données pour le graphique de répartition des dépenses
    const expensesChart = [
      { name: 'Remboursement prêt', value: monthlyPayment * 12 },
      { name: 'Taxe foncière', value: investmentData.propertyTax },
      { name: 'Charges copropriété', value: investmentData.condoFees },
      { name: 'Assurance', value: investmentData.insurance },
      { name: 'Provision travaux', value: investmentData.maintenanceProvision },
      { name: 'Gestion locative', value: investmentData.managementFees * 12 }
    ];
    
    setExpensesData(expensesChart);
    
    // Données pour le cash flow mensuel
    const monthlyData = [
      { name: 'Revenus locatifs', value: investmentData.rentalIncome },
      { name: 'Après vacance', value: investmentData.rentalIncome * (1 - investmentData.vacancyRate / 100) },
      { name: 'Après impayés', value: monthlyIncome },
      { name: 'Moins charges', value: monthlyIncome - monthlyExpenses },
      { name: 'Cash-flow final', value: monthlyIncome - monthlyExpenses - monthlyPayment }
    ];
    
    setCashFlowData(monthlyData);
    
    // Données de performance sur 10 ans
    const performanceOverTime = [];
    let cumulativeCashFlow = 0;
    
    for (let year = 0; year <= 10; year++) {
      // Valeur du bien avec appréciation
      const propertyValue = totalInvestment * Math.pow(1 + investmentData.propertyAppreciation / 100, year);
      
      // Cash-flow cumulé
      cumulativeCashFlow += year > 0 ? results.cashFlow : 0;
      
      // Patrimoine net (valeur - reste à rembourser)
      let loanRemaining = 0;
      if (year < investmentData.loanDuration) {
        const monthsPaid = year * 12;
        const totalMonths = investmentData.loanDuration * 12;
        const basePayment = results.monthlyPayment - (investmentData.loanAmount * (investmentData.loanInsuranceRate / 100) / 12);
        
        // Calcul approximatif du capital restant dû
        // Dans un cas réel, il faudrait utiliser un tableau d'amortissement précis
        loanRemaining = investmentData.loanAmount * (1 - (monthsPaid / totalMonths)) * 1.1; // Approximation
      }
      
      performanceOverTime.push({
        year,
        propertyValue,
        cumulativeCashFlow,
        netWorth: propertyValue - loanRemaining + cumulativeCashFlow
      });
    }
    
    setPerformanceData(performanceOverTime);
  };

  const resetCalculator = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le calculateur ? Toutes les données seront perdues.")) {
      setInvestmentData({
        purchasePrice: 200000,
        notaryFees: 15000,
        renovationCost: 10000,
        furnitureCost: 0,
        propertyTax: 1200,
        managementFees: 0,
        condoFees: 1800,
        insurance: 400,
        maintenanceProvision: 800,
        vacancyRate: 5,
        unpaidRate: 0,
        rentalIncome: 900,
        propertyAppreciation: 2,
        loanAmount: 180000,
        loanRate: 3.5,
        loanDuration: 20,
        loanInsuranceRate: 0.34,
        area: 60,
        fiscalOption: 'real',
        includeAmortization: true,
        propertyAge: 15,
        rentalCharges: 100,
        projectName: 'Mon investissement',
        location: '',
        propertyType: 'apartment'
      });
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
    
    toast({
      title: "PDF généré avec succès",
      description: "Le document a été téléchargé sur votre appareil."
    });
  };

  const saveToLocalStorage = () => {
    const data = {
      investmentData,
      results,
      hasCalculated
    };
    
    localStorage.setItem('rentabilityCalculator', JSON.stringify(data));
    
    toast({
      title: "Projet sauvegardé",
      description: "Vos calculs ont été enregistrés localement."
    });
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem('rentabilityCalculator');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setInvestmentData(data.investmentData);
        setResults(data.results);
        setHasCalculated(data.hasCalculated);
        
        // Recréer les données de graphiques
        if (data.hasCalculated) {
          prepareChartData(
            data.results.monthlyCashFlow + data.results.totalMonthlyExpenses,
            data.results.totalMonthlyExpenses - data.results.monthlyPayment,
            data.results.monthlyPayment,
            data.results.totalInvestment,
            data.results.initialInvestment
          );
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

  const handleInputChange = (field: keyof InvestmentData, value: any) => {
    setInvestmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculer automatiquement les frais de notaire si le prix d'achat change
  useEffect(() => {
    // Estimation des frais de notaire (environ 7-8% du prix d'achat)
    const estimatedNotaryFees = Math.round(investmentData.purchasePrice * 0.075);
    
    if (Math.abs(estimatedNotaryFees - investmentData.notaryFees) > investmentData.purchasePrice * 0.02) {
      setInvestmentData(prev => ({
        ...prev,
        notaryFees: estimatedNotaryFees
      }));
    }
  }, [investmentData.purchasePrice]);

  // Calculer automatiquement le rendement au m² lorsque les données changent
  const pricePerSqm = investmentData.area > 0 
    ? investmentData.purchasePrice / investmentData.area 
    : 0;
  
  const rentalYieldPerSqm = investmentData.area > 0 
    ? (investmentData.rentalIncome * 12) / (investmentData.purchasePrice + investmentData.notaryFees)
    : 0;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="h-5 w-5 text-khaki-600" />
              Calculateur de rentabilité locative
            </CardTitle>
            <CardDescription>
              Analysez la rentabilité de votre investissement immobilier
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
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="purchase" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="purchase">Acquisition</TabsTrigger>
            <TabsTrigger value="rental">Location</TabsTrigger>
            <TabsTrigger value="financing">Financement</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          {/* Onglet Acquisition */}
          <TabsContent value="purchase" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Nom du projet</Label>
                  <Input 
                    id="projectName" 
                    value={investmentData.projectName} 
                    onChange={(e) => handleInputChange('projectName', e.target.value)} 
                    placeholder="Mon investissement locatif"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Localisation</Label>
                  <Input 
                    id="location" 
                    value={investmentData.location} 
                    onChange={(e) => handleInputChange('location', e.target.value)} 
                    placeholder="Ville ou quartier"
                  />
                </div>
                
                <div>
                  <Label htmlFor="propertyType">Type de bien</Label>
                  <Select 
                    value={investmentData.propertyType} 
                    onValueChange={(value) => handleInputChange('propertyType', value)}
                  >
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Sélectionnez un type de bien" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Appartement</SelectItem>
                      <SelectItem value="house">Maison</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="commercial">Local commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="area">Surface (m²)</Label>
                  <Input 
                    id="area" 
                    type="number" 
                    value={investmentData.area} 
                    onChange={(e) => handleInputChange('area', parseFloat(e.target.value) || 0)} 
                    placeholder="Surface en m²"
                  />
                </div>
                
                <div>
                  <Label htmlFor="propertyAge">Âge du bien (années)</Label>
                  <Input 
                    id="propertyAge" 
                    type="number" 
                    value={investmentData.propertyAge} 
                    onChange={(e) => handleInputChange('propertyAge', parseInt(e.target.value) || 0)} 
                    placeholder="Âge du bien"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="purchasePrice">Prix d'achat (€)</Label>
                  <Input 
                    id="purchasePrice" 
                    type="number" 
                    value={investmentData.purchasePrice} 
                    onChange={(e) => handleInputChange('purchasePrice', parseFloat(e.target.value) || 0)} 
                    placeholder="Prix d'achat"
                  />
                </div>
                
                <div>
                  <Label htmlFor="notaryFees">Frais de notaire (€)</Label>
                  <Input 
                    id="notaryFees" 
                    type="number" 
                    value={investmentData.notaryFees} 
                    onChange={(e) => handleInputChange('notaryFees', parseFloat(e.target.value) || 0)} 
                    placeholder="Frais de notaire"
                  />
                  <p className="text-xs text-gray-500 mt-1">Estimation: environ 7-8% du prix d'achat</p>
                </div>
                
                <div>
                  <Label htmlFor="renovationCost">Budget travaux (€)</Label>
                  <Input 
                    id="renovationCost" 
                    type="number" 
                    value={investmentData.renovationCost} 
                    onChange={(e) => handleInputChange('renovationCost', parseFloat(e.target.value) || 0)} 
                    placeholder="Budget travaux"
                  />
                </div>
                
                <div>
                  <Label htmlFor="furnitureCost">Budget mobilier (€)</Label>
                  <Input 
                    id="furnitureCost" 
                    type="number" 
                    value={investmentData.furnitureCost} 
                    onChange={(e) => handleInputChange('furnitureCost', parseFloat(e.target.value) || 0)} 
                    placeholder="Budget mobilier (pour location meublée)"
                  />
                </div>
                
                <div className="pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-medium">Prix au m²</div>
                      <div className="text-2xl font-bold">
                        {pricePerSqm > 0 ? pricePerSqm.toFixed(0) : "0"} €/m²
                      </div>
                    </div>
                    <div>
                      <div className="font-medium">Investissement total</div>
                      <div className="text-2xl font-bold">
                        {(investmentData.purchasePrice + investmentData.notaryFees + 
                          investmentData.renovationCost + investmentData.furnitureCost).toLocaleString('fr-FR')} €
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <Button onClick={() => setActiveTab('rental')}>
                Passer aux revenus locatifs
              </Button>
            </div>
          </TabsContent>
          
          {/* Onglet Location */}
          <TabsContent value="rental" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="rentalIncome">Loyer mensuel (€)</Label>
                  <Input 
                    id="rentalIncome" 
                    type="number" 
                    value={investmentData.rentalIncome} 
                    onChange={(e) => handleInputChange('rentalIncome', parseFloat(e.target.value) || 0)} 
                    placeholder="Loyer mensuel hors charges"
                  />
                </div>
                
                <div>
                  <Label htmlFor="rentalCharges">Charges locatives récupérables (€/mois)</Label>
                  <Input 
                    id="rentalCharges" 
                    type="number" 
                    value={investmentData.rentalCharges} 
                    onChange={(e) => handleInputChange('rentalCharges', parseFloat(e.target.value) || 0)} 
                    placeholder="Charges locatives"
                  />
                </div>
                
                <div>
                  <Label htmlFor="vacancyRate">Taux de vacance locative (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="vacancyRate"
                      min={0}
                      max={20}
                      step={1}
                      value={[investmentData.vacancyRate]}
                      onValueChange={(value) => handleInputChange('vacancyRate', value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{investmentData.vacancyRate}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Estimation du pourcentage de temps où le bien sera vacant</p>
                </div>
                
                <div>
                  <Label htmlFor="unpaidRate">Taux d'impayés (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="unpaidRate"
                      min={0}
                      max={10}
                      step={0.5}
                      value={[investmentData.unpaidRate]}
                      onValueChange={(value) => handleInputChange('unpaidRate', value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right">{investmentData.unpaidRate}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Estimation du risque d'impayés locatifs</p>
                </div>
                
                <div>
                  <Label htmlFor="fiscalOption">Option fiscale</Label>
                  <Select 
                    value={investmentData.fiscalOption} 
                    onValueChange={(value: any) => handleInputChange('fiscalOption', value)}
                  >
                    <SelectTrigger id="fiscalOption">
                      <SelectValue placeholder="Choisir un régime fiscal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real">Régime réel (non meublé)</SelectItem>
                      <SelectItem value="micro">Micro-foncier (non meublé)</SelectItem>
                      <SelectItem value="lmnp">LMNP réel (meublé)</SelectItem>
                      <SelectItem value="furnished">Micro-BIC (meublé)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="propertyTax">Taxe foncière annuelle (€)</Label>
                  <Input 
                    id="propertyTax" 
                    type="number" 
                    value={investmentData.propertyTax} 
                    onChange={(e) => handleInputChange('propertyTax', parseFloat(e.target.value) || 0)} 
                    placeholder="Taxe foncière"
                  />
                </div>
                
                <div>
                  <Label htmlFor="condoFees">Charges de copropriété annuelles (€)</Label>
                  <Input 
                    id="condoFees" 
                    type="number" 
                    value={investmentData.condoFees} 
                    onChange={(e) => handleInputChange('condoFees', parseFloat(e.target.value) || 0)} 
                    placeholder="Charges annuelles"
                  />
                </div>
                
                <div>
                  <Label htmlFor="insurance">Assurance PNO annuelle (€)</Label>
                  <Input 
                    id="insurance" 
                    type="number" 
                    value={investmentData.insurance} 
                    onChange={(e) => handleInputChange('insurance', parseFloat(e.target.value) || 0)} 
                    placeholder="Assurance propriétaire non occupant"
                  />
                </div>
                
                <div>
                  <Label htmlFor="maintenanceProvision">Provision travaux annuelle (€)</Label>
                  <Input 
                    id="maintenanceProvision" 
                    type="number" 
                    value={investmentData.maintenanceProvision} 
                    onChange={(e) => handleInputChange('maintenanceProvision', parseFloat(e.target.value) || 0)} 
                    placeholder="Provision pour travaux futurs"
                  />
                </div>
                
                <div>
                  <Label htmlFor="managementFees">Frais de gestion locative (€/mois)</Label>
                  <Input 
                    id="managementFees" 
                    type="number" 
                    value={investmentData.managementFees} 
                    onChange={(e) => handleInputChange('managementFees', parseFloat(e.target.value) || 0)} 
                    placeholder="Frais d'agence ou de gestion"
                  />
                </div>
