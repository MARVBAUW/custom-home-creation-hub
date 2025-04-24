
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CreditCard, Download, Info, PiggyBank } from 'lucide-react';
import PDFExporter from '@/components/common/PDFExporter';
import { generateStandardPDF } from '@/utils/pdfUtils';

interface LoanCalculation {
  maxLoanAmount: number;
  monthlyPayment: number;
  interestTotal: number;
  loanToIncome: number;
  debtServiceRatio: number;
}

const CapaciteEmpruntCalculator: React.FC = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(3000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(500);
  const [loanDuration, setLoanDuration] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(2.5);
  const [personalContribution, setPersonalContribution] = useState<number>(20000);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [insuranceRate, setInsuranceRate] = useState<number>(0.34);

  // Calculate max loan amount and monthly payment
  const calculation = useMemo<LoanCalculation>(() => {
    // Maximum recommended debt service ratio (35%)
    const maxDebtRatio = 0.35;
    
    // Calculate available monthly payment capacity
    const availableMonthly = monthlyIncome * maxDebtRatio - monthlyExpenses;
    
    // Calculate the effective interest rate for the payment calculation
    let effectiveRate = interestRate / 100 / 12;
    if (includeInsurance) {
      effectiveRate += insuranceRate / 100 / 12;
    }
    
    // Calculate max loan amount using the PMT formula
    const numberOfPayments = loanDuration * 12;
    const presentValue = availableMonthly * (1 - Math.pow(1 + effectiveRate, -numberOfPayments)) / effectiveRate;
    
    // Calculate monthly payment for the calculated loan amount
    const monthlyPayment = (presentValue * effectiveRate) / (1 - Math.pow(1 + effectiveRate, -numberOfPayments));
    
    // Calculate total interest paid over the life of the loan
    const totalPayments = monthlyPayment * numberOfPayments;
    const interestTotal = totalPayments - presentValue;
    
    // Calculate loan-to-income ratio
    const annualIncome = monthlyIncome * 12;
    const loanToIncome = presentValue / annualIncome;
    
    // Calculate debt service ratio
    const debtServiceRatio = monthlyPayment / monthlyIncome;

    return {
      maxLoanAmount: Math.round(presentValue),
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      interestTotal: Math.round(interestTotal),
      loanToIncome: Math.round(loanToIncome * 100) / 100,
      debtServiceRatio: Math.round(debtServiceRatio * 10000) / 100
    };
  }, [monthlyIncome, monthlyExpenses, loanDuration, interestRate, includeInsurance, insuranceRate]);

  // Total budget including personal contribution
  const totalBudget = calculation.maxLoanAmount + personalContribution;

  // Generate PDF
  const handleGeneratePDF = (options: any) => {
    return generateStandardPDF(
      'Capacité d\'emprunt', 
      {
        monthlyIncome,
        monthlyExpenses,
        loanDuration,
        interestRate,
        personalContribution,
        includeInsurance,
        insuranceRate
      },
      {
        maxLoanAmount: calculation.maxLoanAmount,
        monthlyPayment: calculation.monthlyPayment,
        totalBudget,
        interestTotal: calculation.interestTotal,
        loanToIncome: calculation.loanToIncome,
        debtServiceRatio: calculation.debtServiceRatio
      },
      options
    );
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Calculateur de Capacité d'Emprunt
        </CardTitle>
        <CardDescription>
          Estimez votre capacité d'emprunt et votre mensualité maximale
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="parameters">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="parameters">Paramètres</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="parameters" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Revenus mensuels nets (€)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">Charges mensuelles (€)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="loanDuration">Durée du prêt: {loanDuration} ans</Label>
              <Slider
                id="loanDuration"
                value={[loanDuration]}
                min={5}
                max={30}
                step={1}
                onValueChange={(value) => setLoanDuration(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate">Taux d'intérêt: {interestRate}%</Label>
              <Slider
                id="interestRate"
                value={[interestRate]}
                min={0.5}
                max={6}
                step={0.1}
                onValueChange={(value) => setInterestRate(value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeInsurance"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="includeInsurance">Inclure l'assurance emprunteur</Label>
              </div>
              
              {includeInsurance && (
                <div className="pt-2">
                  <Label htmlFor="insuranceRate">Taux d'assurance: {insuranceRate}%</Label>
                  <Slider
                    id="insuranceRate"
                    value={[insuranceRate]}
                    min={0.1}
                    max={1}
                    step={0.01}
                    onValueChange={(value) => setInsuranceRate(value[0])}
                    className="py-4"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalContribution">Apport personnel (€)</Label>
              <Input
                id="personalContribution"
                type="number"
                value={personalContribution}
                onChange={(e) => setPersonalContribution(Number(e.target.value))}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Capacité d'emprunt</p>
                <p className="text-2xl font-semibold">{calculation.maxLoanAmount.toLocaleString('fr-FR')} €</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Budget total (avec apport)</p>
                <p className="text-2xl font-semibold">{totalBudget.toLocaleString('fr-FR')} €</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Mensualité estimée</p>
                <p className="text-2xl font-semibold">{calculation.monthlyPayment.toLocaleString('fr-FR')} €</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Coût total des intérêts</p>
                <p className="text-2xl font-semibold">{calculation.interestTotal.toLocaleString('fr-FR')} €</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Alert variant="default" className="bg-blue-50">
                <PiggyBank className="h-4 w-4" />
                <AlertDescription>
                  <strong>Taux d'endettement:</strong> {calculation.debtServiceRatio}% de vos revenus 
                  {calculation.debtServiceRatio > 33 ? 
                    " (Au-dessus du seuil recommandé de 33%)" : 
                    " (Sous le seuil recommandé de 33%)"}
                </AlertDescription>
              </Alert>
            </div>
            
            <div className="space-y-2">
              <Alert variant="default" className="bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Rapport prêt/revenu:</strong> {calculation.loanToIncome} fois votre revenu annuel
                  {calculation.loanToIncome > 5 ? 
                    " (Au-dessus du seuil recommandé de 5)" : 
                    " (Sous le seuil recommandé de 5)"}
                </AlertDescription>
              </Alert>
            </div>
            
            <PDFExporter 
              data={{
                monthlyIncome,
                monthlyExpenses,
                loanDuration,
                interestRate,
                personalContribution
              }}
              title="Capacité d'emprunt"
              generatePDF={handleGeneratePDF}
              defaultFileName="capacite-emprunt"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CapaciteEmpruntCalculator;
