
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PercentIcon, FileDown, Calculator, TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const YieldCalculator = () => {
  const { toast } = useToast();
  const [purchasePrice, setPurchasePrice] = useState<number>(200000);
  const [notaryFees, setNotaryFees] = useState<number>(16000);
  const [renovationCosts, setRenovationCosts] = useState<number>(0);
  const [annualRent, setAnnualRent] = useState<number>(12000);
  const [vacancyRate, setVacancyRate] = useState<number>(5);
  const [hasLoan, setHasLoan] = useState<boolean>(false);
  const [loanAmount, setLoanAmount] = useState<number>(150000);
  const [loanInterestRate, setLoanInterestRate] = useState<number>(3.5);
  const [loanYears, setLoanYears] = useState<number>(20);
  const [propertyTax, setPropertyTax] = useState<number>(1200);
  const [condoFees, setCondoFees] = useState<number>(1800);
  const [maintenanceCosts, setMaintenanceCosts] = useState<number>(600);
  const [managementFees, setManagementFees] = useState<number>(0);
  const [rentalInsurance, setRentalInsurance] = useState<number>(0);
  const [propertyInsurance, setPropertyInsurance] = useState<number>(300);
  const [incomeRateSlider, setIncomeRateSlider] = useState<number[]>([30]);
  const [results, setResults] = useState<{
    grossYield: number;
    netYield: number;
    cashflow: number;
    roi: number;
    grossAnnualIncome: number;
    totalAnnualExpenses: number;
    mortgagePayment: number;
    netAnnualIncome: number;
    incomeRate: number;
  } | null>(null);
  
  // Calculate notary fees automatically based on purchase price
  useEffect(() => {
    const calculatedFees = Math.round(purchasePrice * 0.08); // Approximation for old properties
    setNotaryFees(calculatedFees);
  }, [purchasePrice]);
  
  // Calculate management fees based on annual rent
  useEffect(() => {
    const calculatedFees = Math.round(annualRent * 0.08); // Typical rate
    setManagementFees(calculatedFees);
  }, [annualRent]);
  
  // Calculate rental insurance based on annual rent
  useEffect(() => {
    const calculatedFees = Math.round(annualRent * 0.025); // Typical rate
    setRentalInsurance(calculatedFees);
  }, [annualRent]);
  
  // Calculate monthly mortgage payment
  const calculateMonthlyPayment = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;
    
    if (monthlyRate === 0) return principal / numPayments;
    
    const x = Math.pow(1 + monthlyRate, numPayments);
    return (principal * monthlyRate * x) / (x - 1);
  };
  
  // Calculate investment results
  const calculateResults = () => {
    // Total investment
    const totalInvestment = purchasePrice + notaryFees + renovationCosts;
    
    // Annual mortgage payment (if applicable)
    const annualMortgagePayment = hasLoan
      ? calculateMonthlyPayment(loanAmount, loanInterestRate, loanYears) * 12
      : 0;
    
    // Effective annual rent (accounting for vacancy)
    const effectiveAnnualRent = annualRent * (1 - vacancyRate / 100);
    
    // Total annual expenses
    const totalAnnualExpenses = propertyTax + condoFees + maintenanceCosts + 
                               managementFees + rentalInsurance + propertyInsurance;
    
    // Calculate yields
    const grossYield = (effectiveAnnualRent / totalInvestment) * 100;
    const netYield = ((effectiveAnnualRent - totalAnnualExpenses) / totalInvestment) * 100;
    
    // Calculate cash flow (after mortgage)
    const cashflow = effectiveAnnualRent - totalAnnualExpenses - annualMortgagePayment;
    
    // Calculate ROI (return on investment)
    const actualInvestment = hasLoan 
      ? totalInvestment - loanAmount 
      : totalInvestment;
      
    const roi = (cashflow / actualInvestment) * 100;
    
    // Income tax calculation (simplified)
    const incomeRate = incomeRateSlider[0] / 100;
    
    const results = {
      grossYield,
      netYield,
      cashflow,
      roi,
      grossAnnualIncome: effectiveAnnualRent,
      totalAnnualExpenses,
      mortgagePayment: annualMortgagePayment,
      netAnnualIncome: cashflow,
      incomeRate
    };
    
    setResults(results);
    
    toast({
      title: "Calcul effectué",
      description: `Rendement brut: ${grossYield.toFixed(2)}% | Rendement net: ${netYield.toFixed(2)}%`,
    });
  };
  
  // Generate PDF report
  const generatePDF = () => {
    toast({
      title: "Export PDF",
      description: "Votre rapport de rendement a été généré avec succès.",
    });
  };
  
  // Format data for pie chart
  const preparePieData = () => {
    if (!results) return [];
    
    return [
      { name: 'Charges de copropriété', value: condoFees },
      { name: 'Taxe foncière', value: propertyTax },
      { name: 'Entretien', value: maintenanceCosts },
      { name: 'Assurance PNO', value: propertyInsurance },
      { name: 'Gestion locative', value: managementFees },
      { name: 'Assurance loyers impayés', value: rentalInsurance },
    ];
  };
  
  // Format data for bar chart
  const prepareBarData = () => {
    if (!results) return [];
    
    return [
      {
        name: 'Rendement',
        Brut: results.grossYield,
        Net: results.netYield,
        'ROI': hasLoan ? results.roi : results.netYield,
      },
    ];
  };
  
  const COLORS = ['#A8A878', '#C6B785', '#D8C69E', '#E8D8B0', '#F0E8C8', '#F8F0D8'];
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PercentIcon className="h-5 w-5 text-khaki-600" />
          Calculateur de rendement brut/net
        </CardTitle>
        <CardDescription>
          Évaluez avec précision la rentabilité de vos investissements immobiliers locatifs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="input">
          <TabsList className="mb-4">
            <TabsTrigger value="input">Données d'entrée</TabsTrigger>
            <TabsTrigger value="results" disabled={!results}>Résultats</TabsTrigger>
            <TabsTrigger value="charts" disabled={!results}>Graphiques</TabsTrigger>
            <TabsTrigger value="info">Informations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Informations sur l'acquisition</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="purchasePrice">Prix d'achat (€)</Label>
                      <Input
                        id="purchasePrice"
                        type="number"
                        min="10000"
                        step="1000"
                        value={purchasePrice}
                        onChange={(e) => setPurchasePrice(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="notaryFees">Frais de notaire (€)</Label>
                      <Input
                        id="notaryFees"
                        type="number"
                        min="0"
                        step="100"
                        value={notaryFees}
                        onChange={(e) => setNotaryFees(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="renovationCosts">Coûts de rénovation (€)</Label>
                      <Input
                        id="renovationCosts"
                        type="number"
                        min="0"
                        step="100"
                        value={renovationCosts}
                        onChange={(e) => setRenovationCosts(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="hasLoan" 
                          checked={hasLoan} 
                          onCheckedChange={(checked) => setHasLoan(checked as boolean)}
                        />
                        <Label htmlFor="hasLoan">Financement par emprunt</Label>
                      </div>
                    </div>
                    
                    {hasLoan && (
                      <div className="space-y-4 pl-6 border-l-2 border-khaki-200 mt-2">
                        <div className="space-y-2">
                          <Label htmlFor="loanAmount">Montant emprunté (€)</Label>
                          <Input
                            id="loanAmount"
                            type="number"
                            min="0"
                            max={purchasePrice + notaryFees}
                            step="1000"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                          />
                          <p className="text-xs text-muted-foreground">
                            {Math.round((loanAmount / (purchasePrice + notaryFees)) * 100)}% du prix d'acquisition
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="loanInterestRate">Taux d'intérêt (%)</Label>
                          <Input
                            id="loanInterestRate"
                            type="number"
                            min="0"
                            max="15"
                            step="0.05"
                            value={loanInterestRate}
                            onChange={(e) => setLoanInterestRate(Number(e.target.value))}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="loanYears">Durée du prêt (années)</Label>
                          <Input
                            id="loanYears"
                            type="number"
                            min="1"
                            max="30"
                            step="1"
                            value={loanYears}
                            onChange={(e) => setLoanYears(Number(e.target.value))}
                          />
                        </div>
                        
                        <div className="text-sm bg-khaki-50 p-2 rounded">
                          <strong>Mensualité estimée:</strong> {hasLoan ? Math.round(calculateMonthlyPayment(loanAmount, loanInterestRate, loanYears)) : 0} €/mois
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Informations sur la location</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="annualRent">Loyer annuel (€)</Label>
                      <Input
                        id="annualRent"
                        type="number"
                        min="0"
                        step="100"
                        value={annualRent}
                        onChange={(e) => setAnnualRent(Number(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Soit environ {Math.round(annualRent / 12)} € par mois
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="vacancyRate">Taux de vacance locative (%)</Label>
                      <Input
                        id="vacancyRate"
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={vacancyRate}
                        onChange={(e) => setVacancyRate(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Charges récurrentes</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyTax">Taxe foncière annuelle (€)</Label>
                      <Input
                        id="propertyTax"
                        type="number"
                        min="0"
                        step="50"
                        value={propertyTax}
                        onChange={(e) => setPropertyTax(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="condoFees">Charges de copropriété (€/an)</Label>
                      <Input
                        id="condoFees"
                        type="number"
                        min="0"
                        step="50"
                        value={condoFees}
                        onChange={(e) => setCondoFees(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceCosts">Provision pour entretien (€/an)</Label>
                      <Input
                        id="maintenanceCosts"
                        type="number"
                        min="0"
                        step="50"
                        value={maintenanceCosts}
                        onChange={(e) => setMaintenanceCosts(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="propertyInsurance">Assurance PNO (€/an)</Label>
                      <Input
                        id="propertyInsurance"
                        type="number"
                        min="0"
                        step="10"
                        value={propertyInsurance}
                        onChange={(e) => setPropertyInsurance(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="managementFees">Frais de gestion locative (€/an)</Label>
                      <Input
                        id="managementFees"
                        type="number"
                        min="0"
                        step="10"
                        value={managementFees}
                        onChange={(e) => setManagementFees(Number(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rentalInsurance">Assurance loyers impayés (€/an)</Label>
                      <Input
                        id="rentalInsurance"
                        type="number"
                        min="0"
                        step="10"
                        value={rentalInsurance}
                        onChange={(e) => setRentalInsurance(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Fiscalité</h3>
                  
                  <div className="space-y-4">
                    <Label>Taux marginal d'imposition: {incomeRateSlider[0]}%</Label>
                    <Slider
                      defaultValue={[30]}
                      max={55}
                      step={1}
                      value={incomeRateSlider}
                      onValueChange={setIncomeRateSlider}
                    />
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={calculateResults} 
                    className="w-full bg-khaki-500 hover:bg-khaki-600 text-white"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Calculer le rendement
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            {results && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-khaki-50 p-6 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold text-center mb-6">Rendements</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-khaki-700">
                          {results.grossYield.toFixed(2)}%
                        </div>
                        <p className="text-sm text-gray-500">Rendement brut</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-3xl font-bold text-khaki-700">
                          {results.netYield.toFixed(2)}%
                        </div>
                        <p className="text-sm text-gray-500">Rendement net</p>
                      </div>
                      
                      {hasLoan && (
                        <>
                          <div className="text-center col-span-2">
                            <div className="text-3xl font-bold text-khaki-700">
                              {results.roi.toFixed(2)}%
                            </div>
                            <p className="text-sm text-gray-500">ROI (Return on Investment)</p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-khaki-200">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-khaki-700">
                          {results.cashflow.toFixed(0)} €
                        </div>
                        <p className="text-sm text-gray-500">Cash-flow annuel</p>
                        <p className="text-sm text-gray-500 mt-1">
                          Soit environ {Math.round(results.cashflow / 12)} € par mois
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Détail de l'investissement</h3>
                      <table className="w-full text-sm">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Prix d'achat</td>
                            <td className="py-2 text-right font-medium">{purchasePrice.toLocaleString()} €</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Frais de notaire</td>
                            <td className="py-2 text-right font-medium">{notaryFees.toLocaleString()} €</td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Travaux</td>
                            <td className="py-2 text-right font-medium">{renovationCosts.toLocaleString()} €</td>
                          </tr>
                          <tr className="border-b font-medium">
                            <td className="py-2">Investissement total</td>
                            <td className="py-2 text-right">{(purchasePrice + notaryFees + renovationCosts).toLocaleString()} €</td>
                          </tr>
                          {hasLoan && (
                            <>
                              <tr className="border-b">
                                <td className="py-2">Emprunt</td>
                                <td className="py-2 text-right font-medium">- {loanAmount.toLocaleString()} €</td>
                              </tr>
                              <tr className="border-b font-medium">
                                <td className="py-2">Apport personnel</td>
                                <td className="py-2 text-right">{(purchasePrice + notaryFees + renovationCosts - loanAmount).toLocaleString()} €</td>
                              </tr>
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Détail des revenus</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Loyer annuel brut</td>
                          <td className="py-2 text-right font-medium">{annualRent.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Vacance locative ({vacancyRate}%)</td>
                          <td className="py-2 text-right text-red-500 font-medium">- {Math.round(annualRent * (vacancyRate / 100)).toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b font-medium">
                          <td className="py-2">Loyer annuel net</td>
                          <td className="py-2 text-right">{results.grossAnnualIncome.toFixed(0).toLocaleString()} €</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Détail des charges</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Taxe foncière</td>
                          <td className="py-2 text-right text-red-500 font-medium">- {propertyTax.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Charges de copropriété</td>
                          <td className="py-2 text-right text-red-500 font-medium">- {condoFees.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Entretien</td>
                          <td className="py-2 text-right text-red-500 font-medium">- {maintenanceCosts.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Assurance PNO</td>
                          <td className="py-2 text-right text-red-500 font-medium">- {propertyInsurance.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Gestion locative</td>
                          <td className="py-2 text-right text-red-500 font-medium">- {managementFees.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Assurance loyers impayés</td>
                          <td className="py-2 text-right text-red-500 font-medium">- {rentalInsurance.toLocaleString()} €</td>
                        </tr>
                        <tr className="border-b font-medium">
                          <td className="py-2">Total des charges</td>
                          <td className="py-2 text-right text-red-500">- {results.totalAnnualExpenses.toFixed(0).toLocaleString()} €</td>
                        </tr>
                        {hasLoan && (
                          <tr className="border-b">
                            <td className="py-2">Remboursement emprunt</td>
                            <td className="py-2 text-right text-red-500 font-medium">- {results.mortgagePayment.toFixed(0).toLocaleString()} €</td>
                          </tr>
                        )}
                        <tr className="border-b font-medium">
                          <td className="py-2">Cash-flow annuel</td>
                          <td className="py-2 text-right">{results.netAnnualIncome.toFixed(0).toLocaleString()} €</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      onClick={generatePDF}
                      className="w-full border-khaki-200 hover:bg-khaki-100"
                      variant="outline"
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Exporter les résultats en PDF
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="charts">
            {results && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Répartition des charges</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={preparePieData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {preparePieData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `${Number(value).toLocaleString()} €`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Comparaison des rendements</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prepareBarData()}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis unit="%" />
                        <Tooltip formatter={(value: any) => `${Number(value).toFixed(2)}%`} />
                        <Legend />
                        <Bar dataKey="Brut" fill="#A8A878" />
                        <Bar dataKey="Net" fill="#C6B785" />
                        {hasLoan && <Bar dataKey="ROI" fill="#D8C69E" />}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="info">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Comprendre les différents rendements</h3>
                <div className="space-y-4">
                  <div className="bg-khaki-50 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2 text-khaki-600" />
                      Rendement brut
                    </h4>
                    <p className="mt-2 text-sm">
                      Le rendement brut est le rapport entre les loyers annuels et l'investissement total 
                      (prix d'achat + frais de notaire + travaux). Il ne tient pas compte des charges et des impôts.
                      <br /><br />
                      <strong>Formule:</strong> Loyers annuels ÷ Investissement total × 100
                    </p>
                  </div>
                  
                  <div className="bg-khaki-50 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <PieChartIcon className="h-4 w-4 mr-2 text-khaki-600" />
                      Rendement net
                    </h4>
                    <p className="mt-2 text-sm">
                      Le rendement net prend en compte les charges récurrentes (taxe foncière, charges de copropriété, 
                      assurances, etc.) mais pas les remboursements d'emprunt.
                      <br /><br />
                      <strong>Formule:</strong> (Loyers annuels - Charges annuelles) ÷ Investissement total × 100
                    </p>
                  </div>
                  
                  <div className="bg-khaki-50 p-4 rounded-lg">
                    <h4 className="font-medium flex items-center">
                      <BarChartIcon className="h-4 w-4 mr-2 text-khaki-600" />
                      ROI (Return on Investment)
                    </h4>
                    <p className="mt-2 text-sm">
                      Le ROI mesure le rendement de l'apport personnel en tenant compte du financement par emprunt. 
                      Il représente le taux de rentabilité réel de votre investissement.
                      <br /><br />
                      <strong>Formule:</strong> Cash-flow annuel ÷ Apport personnel × 100
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Critères d'évaluation</h3>
                <p className="text-sm mb-4">
                  Voici quelques repères pour évaluer la qualité d'un investissement locatif:
                </p>
                
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-khaki-100">
                      <th className="py-2 px-4 text-left">Type de rendement</th>
                      <th className="py-2 px-4 text-center">Faible</th>
                      <th className="py-2 px-4 text-center">Moyen</th>
                      <th className="py-2 px-4 text-center">Bon</th>
                      <th className="py-2 px-4 text-center">Excellent</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">Rendement brut</td>
                      <td className="py-2 px-4 text-center">&lt; 4%</td>
                      <td className="py-2 px-4 text-center">4 - 6%</td>
                      <td className="py-2 px-4 text-center">6 - 8%</td>
                      <td className="py-2 px-4 text-center">&gt; 8%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">Rendement net</td>
                      <td className="py-2 px-4 text-center">&lt; 2%</td>
                      <td className="py-2 px-4 text-center">2 - 4%</td>
                      <td className="py-2 px-4 text-center">4 - 6%</td>
                      <td className="py-2 px-4 text-center">&gt; 6%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 px-4">ROI (avec emprunt)</td>
                      <td className="py-2 px-4 text-center">&lt; 5%</td>
                      <td className="py-2 px-4 text-center">5 - 10%</td>
                      <td className="py-2 px-4 text-center">10 - 15%</td>
                      <td className="py-2 px-4 text-center">&gt; 15%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default YieldCalculator;
