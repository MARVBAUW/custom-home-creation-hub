
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { InvestmentData, InvestmentResults } from './types';
import { 
  calculateInvestment, 
  prepareChartData, 
  generatePDF, 
  getInitialInvestmentData, 
  getInitialInvestmentResults 
} from './utils';
import RentabilityHeader from './RentabilityHeader';
import PurchaseTab from './tabs/PurchaseTab';
import RentalTab from './tabs/RentalTab';
import FinancingTab from './tabs/FinancingTab';
import ResultsTab from './tabs/ResultsTab';
import 'jspdf-autotable';

const RentabilityCalculator = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('purchase');
  const [investmentData, setInvestmentData] = useState<InvestmentData>(getInitialInvestmentData());
  const [results, setResults] = useState<InvestmentResults>(getInitialInvestmentResults());
  const [hasCalculated, setHasCalculated] = useState(false);
  const [cashFlowData, setCashFlowData] = useState<any[]>([]);
  const [expensesData, setExpensesData] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);

  const handleCalculateInvestment = () => {
    // Calculate the investment metrics
    const calculatedResults = calculateInvestment(investmentData);
    setResults(calculatedResults);
    
    // Prepare chart data
    const chartData = prepareChartData(
      calculatedResults.monthlyCashFlow + calculatedResults.totalMonthlyExpenses,
      calculatedResults.totalMonthlyExpenses - calculatedResults.monthlyPayment,
      calculatedResults.monthlyPayment,
      calculatedResults.totalInvestment,
      calculatedResults.initialInvestment,
      investmentData,
      calculatedResults
    );
    
    setCashFlowData(chartData.monthlyData);
    setExpensesData(chartData.expensesChart);
    setPerformanceData(chartData.performanceOverTime);
    
    setHasCalculated(true);
    
    toast({
      title: "Calcul effectué",
      description: "Les résultats de rentabilité ont été mis à jour",
    });
  };

  const handleResetCalculator = () => {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser le calculateur ? Toutes les données seront perdues.")) {
      setInvestmentData(getInitialInvestmentData());
      setResults(getInitialInvestmentResults());
      setHasCalculated(false);
      
      toast({
        title: "Calculateur réinitialisé",
        description: "Toutes les données ont été effacées."
      });
    }
  };

  const handleGeneratePDF = () => {
    generatePDF(investmentData, results, expensesData);
    
    toast({
      title: "PDF généré avec succès",
      description: "Le document a été téléchargé sur votre appareil."
    });
  };

  const handleSaveToLocalStorage = () => {
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

  const handleLoadFromLocalStorage = () => {
    const savedData = localStorage.getItem('rentabilityCalculator');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setInvestmentData(data.investmentData);
        setResults(data.results);
        setHasCalculated(data.hasCalculated);
        
        // Recréer les données de graphiques
        if (data.hasCalculated) {
          const chartData = prepareChartData(
            data.results.monthlyCashFlow + data.results.totalMonthlyExpenses,
            data.results.totalMonthlyExpenses - data.results.monthlyPayment,
            data.results.monthlyPayment,
            data.results.totalInvestment,
            data.results.initialInvestment,
            data.investmentData,
            data.results
          );
          
          setCashFlowData(chartData.monthlyData);
          setExpensesData(chartData.expensesChart);
          setPerformanceData(chartData.performanceOverTime);
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

  return (
    <Card className="shadow-md">
      <RentabilityHeader 
        resetCalculator={handleResetCalculator} 
        saveToLocalStorage={handleSaveToLocalStorage} 
      />
      
      <CardContent>
        <Tabs defaultValue="purchase" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="purchase">Acquisition</TabsTrigger>
            <TabsTrigger value="rental">Location</TabsTrigger>
            <TabsTrigger value="financing">Financement</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="purchase">
            <PurchaseTab 
              investmentData={investmentData} 
              handleInputChange={handleInputChange} 
              setActiveTab={setActiveTab} 
            />
          </TabsContent>
          
          <TabsContent value="rental">
            <RentalTab 
              investmentData={investmentData} 
              handleInputChange={handleInputChange} 
              setActiveTab={setActiveTab} 
            />
          </TabsContent>
          
          <TabsContent value="financing">
            <FinancingTab 
              investmentData={investmentData} 
              results={results} 
              handleInputChange={handleInputChange} 
              calculateInvestment={handleCalculateInvestment} 
              hasCalculated={hasCalculated} 
              setActiveTab={setActiveTab} 
            />
          </TabsContent>
          
          <TabsContent value="results">
            <ResultsTab 
              hasCalculated={hasCalculated} 
              results={results} 
              investmentData={investmentData} 
              expensesData={expensesData} 
              cashFlowData={cashFlowData} 
              performanceData={performanceData} 
              generatePDF={handleGeneratePDF} 
              saveToLocalStorage={handleSaveToLocalStorage} 
              loadFromLocalStorage={handleLoadFromLocalStorage} 
              setActiveTab={setActiveTab} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RentabilityCalculator;
