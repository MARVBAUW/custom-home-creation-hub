
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart as BarChartIcon, RotateCcw, Save } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

import { InvestmentData, InvestmentResults } from './types';
import { PurchaseTab } from './tabs/PurchaseTab';
import { RentalTab } from './tabs/RentalTab';
import { FinancingTab } from './tabs/FinancingTab';
import { ResultsTab } from './tabs/ResultsTab';
import { calculateInvestment, prepareChartData } from './utils';

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

  // Calculer les résultats
  const handleCalculate = () => {
    const { newResults, newCashFlowData, newExpensesData, newPerformanceData } = 
      calculateInvestment(investmentData, results);
    
    setResults(newResults);
    setCashFlowData(newCashFlowData);
    setExpensesData(newExpensesData);
    setPerformanceData(newPerformanceData);
    setHasCalculated(true);
    
    toast({
      title: "Calcul effectué",
      description: "Les résultats de rentabilité ont été mis à jour",
    });
  };

  // Réinitialiser le calculateur
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

  // Sauvegarder dans le localStorage
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

  // Charger depuis le localStorage
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
          const charts = prepareChartData(
            data.investmentData,
            data.results
          );
          
          setCashFlowData(charts.cashFlowData);
          setExpensesData(charts.expensesData);
          setPerformanceData(charts.performanceData);
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

  // Gérer les changements d'input
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
          
          <TabsContent value="purchase" className="space-y-4">
            <PurchaseTab 
              investmentData={investmentData}
              handleInputChange={handleInputChange}
              pricePerSqm={pricePerSqm}
              onNext={() => setActiveTab('rental')}
            />
          </TabsContent>
          
          <TabsContent value="rental" className="space-y-4">
            <RentalTab
              investmentData={investmentData}
              handleInputChange={handleInputChange}
              onNext={() => setActiveTab('financing')}
              onPrevious={() => setActiveTab('purchase')}
            />
          </TabsContent>
          
          <TabsContent value="financing" className="space-y-4">
            <FinancingTab
              investmentData={investmentData}
              handleInputChange={handleInputChange}
              onCalculate={handleCalculate}
              onPrevious={() => setActiveTab('rental')}
            />
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            <ResultsTab
              investmentData={investmentData}
              results={results}
              cashFlowData={cashFlowData}
              expensesData={expensesData}
              performanceData={performanceData}
              hasCalculated={hasCalculated}
              handleCalculate={handleCalculate}
              onPrevious={() => setActiveTab('financing')}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RentabilityCalculator;
