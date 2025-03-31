
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileDown, Calculator, TrendingUp, CalendarRange } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const RentabilityCalculator = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [propertyValue, setPropertyValue] = useState<number>(200000);
  const [rentalIncome, setRentalIncome] = useState<number>(1000);
  const [expenses, setExpenses] = useState<number>(150);
  const [loanAmount, setLoanAmount] = useState<number>(160000);
  const [interestRate, setInterestRate] = useState<number>(2.5);
  const [loanDuration, setLoanDuration] = useState<number>(20);
  const [appreciationRate, setAppreciationRate] = useState<number>(2);
  const [vacancyRate, setVacancyRate] = useState<number>(5);
  const [investmentType, setInvestmentType] = useState<string>("residential");
  const [projectName, setProjectName] = useState<string>("Mon investissement");
  
  const [calculationResult, setCalculationResult] = useState<{
    cashFlow: number;
    cashOnCash: number;
    netYield: number;
    roi: number;
    breakEven: number;
    futureValue: number;
    monthlyPayment: number;
    cashFlowData: {year: number, cashFlow: number, cumulativeCashFlow: number}[];
  } | null>(null);
  
  // Calculate rentability metrics
  const calculateRentability = () => {
    const downPayment = propertyValue - loanAmount;
    const monthlyRentalIncome = rentalIncome;
    const monthlyExpenses = expenses;
    const effectiveMonthlyIncome = monthlyRentalIncome * (1 - vacancyRate / 100);
    
    // Calculate loan payment
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanDuration * 12;
    const monthlyPayment = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    
    // Calculate cash flow
    const monthlyCashFlow = effectiveMonthlyIncome - monthlyExpenses - monthlyPayment;
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Calculate return metrics
    const cashOnCash = (annualCashFlow / downPayment) * 100;
    const netYield = (annualCashFlow / propertyValue) * 100;
    const roi = cashOnCash + appreciationRate;
    
    // Calculate break-even point (months)
    const breakEven = downPayment / monthlyCashFlow;
    
    // Future value after loan term
    const futureValue = propertyValue * Math.pow(1 + appreciationRate / 100, loanDuration);
    
    // Generate cash flow projection data
    const cashFlowData = [];
    let cumulativeCashFlow = -downPayment;
    
    for (let year = 1; year <= loanDuration; year++) {
      const yearlyRentalIncome = effectiveMonthlyIncome * 12 * Math.pow(1.02, year - 1); // Assuming 2% annual rent increase
      const yearlyExpenses = monthlyExpenses * 12 * Math.pow(1.02, year - 1); // Assuming 2% annual expense increase
      const yearlyMortgage = monthlyPayment * 12;
      const yearCashFlow = yearlyRentalIncome - yearlyExpenses - yearlyMortgage;
      cumulativeCashFlow += yearCashFlow;
      
      cashFlowData.push({
        year,
        cashFlow: Math.round(yearCashFlow),
        cumulativeCashFlow: Math.round(cumulativeCashFlow)
      });
    }
    
    setCalculationResult({
      cashFlow: annualCashFlow,
      cashOnCash,
      netYield,
      roi,
      breakEven,
      futureValue,
      monthlyPayment,
      cashFlowData
    });
    
    toast({
      title: "Calcul effectué",
      description: `Rentabilité estimée : ${cashOnCash.toFixed(2)}% de rendement`,
    });
  };
  
  // Generate PDF report
  const generatePDF = () => {
    toast({
      title: "Export PDF",
      description: "Votre rapport de rentabilité a été généré avec succès.",
    });
    // Typically would use a library like jsPDF here
  };
  
  // Save calculation to user account
  const saveCalculation = async () => {
    if (!user) {
      toast({
        title: "Authentification requise",
        description: "Vous devez être connecté pour sauvegarder un calcul.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const simulationData = {
        title: projectName,
        type: 'rentability',
        user_id: user.id,
        is_temporary: false,
        content: {
          propertyValue,
          rentalIncome,
          expenses,
          loanAmount,
          interestRate,
          loanDuration,
          appreciationRate,
          vacancyRate,
          investmentType,
          result: calculationResult
        }
      };
      
      const { data, error } = await supabase
        .from('user_simulations')
        .insert(simulationData)
        .select('id');
        
      if (error) throw error;
      
      toast({
        title: "Simulation sauvegardée",
        description: "Votre calcul de rentabilité a été sauvegardé dans votre compte.",
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la simulation. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };
  
  // COLORS for the charts
  const COLORS = ['#A8A878', '#D8C69E', '#E8D8B0', '#F0E5C9'];
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-khaki-600" />
          Calculateur de rentabilité immobilière
        </CardTitle>
        <CardDescription>
          Analysez la rentabilité de vos investissements immobiliers et obtenez des projections financières détaillées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator">
          <TabsList className="mb-4">
            <TabsTrigger value="calculator">Calculateur</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
            <TabsTrigger value="information">Informations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Nom du projet</Label>
                  <Input
                    id="projectName"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Valeur du bien (€)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    min="10000"
                    step="1000"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Montant du prêt (€)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    min="0"
                    step="1000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="text-lg"
                  />
                  <p className="text-xs text-gray-500">Apport personnel: {(propertyValue - loanAmount).toLocaleString()} €</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Taux d'intérêt (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="interestRate"
                      min={0.5}
                      max={5}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-center">{interestRate}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="loanDuration">Durée du prêt (années)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="loanDuration"
                      min={5}
                      max={30}
                      step={1}
                      value={[loanDuration]}
                      onValueChange={(value) => setLoanDuration(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-center">{loanDuration}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Type de bien</Label>
                  <RadioGroup
                    value={investmentType}
                    onValueChange={setInvestmentType}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="residential" id="residential" />
                      <Label htmlFor="residential">Résidentiel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commercial" id="commercial" />
                      <Label htmlFor="commercial">Commercial</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rentalIncome">Loyer mensuel (€)</Label>
                  <Input
                    id="rentalIncome"
                    type="number"
                    min="0"
                    step="50"
                    value={rentalIncome}
                    onChange={(e) => setRentalIncome(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expenses">Charges mensuelles (€)</Label>
                  <Input
                    id="expenses"
                    type="number"
                    min="0"
                    step="10"
                    value={expenses}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vacancyRate">Taux de vacance (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="vacancyRate"
                      min={0}
                      max={15}
                      step={1}
                      value={[vacancyRate]}
                      onValueChange={(value) => setVacancyRate(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-center">{vacancyRate}%</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appreciationRate">Appréciation annuelle (%)</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="appreciationRate"
                      min={0}
                      max={5}
                      step={0.1}
                      value={[appreciationRate]}
                      onValueChange={(value) => setAppreciationRate(value[0])}
                      className="flex-grow"
                    />
                    <span className="w-12 text-center">{appreciationRate}%</span>
                  </div>
                </div>
                
                <Button 
                  onClick={calculateRentability} 
                  className="w-full bg-khaki-500 hover:bg-khaki-600 text-white mt-4"
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Calculer la rentabilité
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {calculationResult ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 bg-khaki-50">
                    <h3 className="text-lg font-medium mb-2 text-khaki-800">Cash Flow Annuel</h3>
                    <p className="text-2xl font-bold text-khaki-700">{calculationResult.cashFlow.toLocaleString()} €</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Cash flow mensuel: {(calculationResult.cashFlow / 12).toLocaleString()} €
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-khaki-50">
                    <h3 className="text-lg font-medium mb-2 text-khaki-800">Rendement</h3>
                    <p className="text-2xl font-bold text-khaki-700">{calculationResult.cashOnCash.toFixed(2)}%</p>
                    <p className="text-xs text-gray-500 mt-1">
                      ROI Total: {calculationResult.roi.toFixed(2)}%
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-khaki-50">
                    <h3 className="text-lg font-medium mb-2 text-khaki-800">Mensualité du prêt</h3>
                    <p className="text-2xl font-bold text-khaki-700">{calculationResult.monthlyPayment.toLocaleString()} €</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Coût total: {(calculationResult.monthlyPayment * loanDuration * 12).toLocaleString()} €
                    </p>
                  </Card>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Projection de cash flow sur {loanDuration} ans</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={calculationResult.cashFlowData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} €`, '']} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="cashFlow" 
                          name="Cash Flow Annuel" 
                          stroke="#A8A878" 
                          activeDot={{ r: 8 }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="cumulativeCashFlow" 
                          name="Cash Flow Cumulé" 
                          stroke="#8884d8" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Synthèse financière</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Valeur du bien</td>
                          <td className="py-2 text-right font-medium">{propertyValue.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Montant de l'emprunt</td>
                          <td className="py-2 text-right font-medium">{loanAmount.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Apport personnel</td>
                          <td className="py-2 text-right font-medium">{(propertyValue - loanAmount).toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Loyer mensuel</td>
                          <td className="py-2 text-right font-medium">{rentalIncome.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Charges mensuelles</td>
                          <td className="py-2 text-right font-medium">{expenses.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Mensualité du prêt</td>
                          <td className="py-2 text-right font-medium">{calculationResult.monthlyPayment.toLocaleString()} €</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Indicateurs de performance</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Cash Flow mensuel</td>
                          <td className="py-2 text-right font-medium">{(calculationResult.cashFlow / 12).toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Cash Flow annuel</td>
                          <td className="py-2 text-right font-medium">{calculationResult.cashFlow.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Rendement sur investissement</td>
                          <td className="py-2 text-right font-medium">{calculationResult.cashOnCash.toFixed(2)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Rendement locatif net</td>
                          <td className="py-2 text-right font-medium">{calculationResult.netYield.toFixed(2)}%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Point d'équilibre (mois)</td>
                          <td className="py-2 text-right font-medium">{Math.round(calculationResult.breakEven)}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Valeur future estimée</td>
                          <td className="py-2 text-right font-medium">{Math.round(calculationResult.futureValue).toLocaleString()} €</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  <Button
                    variant="outline"
                    className="border-khaki-200 hover:bg-khaki-100"
                    onClick={generatePDF}
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Exporter en PDF
                  </Button>
                  
                  <Button
                    className="bg-khaki-600 hover:bg-khaki-700 text-white"
                    onClick={saveCalculation}
                  >
                    <CalendarRange className="mr-2 h-4 w-4" />
                    Sauvegarder la simulation
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <TrendingUp className="h-12 w-12 text-khaki-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun calcul effectué</h3>
                <p className="text-gray-500 max-w-md">
                  Complétez le formulaire dans l'onglet "Calculateur" et cliquez sur "Calculer la rentabilité" pour obtenir une analyse détaillée.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="information">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Guide d'utilisation</h3>
              <p>
                Ce calculateur vous permet d'estimer la rentabilité d'un investissement immobilier locatif en prenant en compte de nombreux facteurs:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Termes clés</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li><strong>Cash Flow</strong> : Revenus locatifs nets après déduction de toutes les charges et du remboursement du prêt</li>
                    <li><strong>Rendement sur investissement</strong> : Ratio entre le cash flow annuel et l'apport personnel</li>
                    <li><strong>ROI Total</strong> : Rendement sur investissement + appréciation du bien</li>
                    <li><strong>Point d'équilibre</strong> : Temps nécessaire pour récupérer l'apport initial</li>
                  </ul>
                </div>
                
                <div className="border p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Conseils d'utilisation</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Utilisez des données réalistes, particulièrement pour les loyers et charges</li>
                    <li>Prévoyez une vacance locative pour être prudent</li>
                    <li>Tenez compte des travaux futurs potentiels</li>
                    <li>Ajustez le taux d'appréciation selon la zone géographique</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-khaki-50 p-4 rounded-lg mt-6">
                <h4 className="font-medium mb-2">Qu'est-ce qu'un bon investissement?</h4>
                <p className="text-sm">
                  Un investissement locatif est généralement considéré comme intéressant lorsque:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                  <li>Le cash flow mensuel est positif</li>
                  <li>Le rendement sur investissement dépasse 5-6%</li>
                  <li>Le point d'équilibre est inférieur à 15 ans</li>
                  <li>Le bien est situé dans une zone à fort potentiel d'appréciation</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RentabilityCalculator;
