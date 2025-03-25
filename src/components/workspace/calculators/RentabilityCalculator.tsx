
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ChartBar, Download, Printer, Calculator, Wallet } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Add the jsPDF types
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface InvestmentData {
  purchasePrice: number;
  renovationCost: number;
  notaryFees: number;
  furnishingCost: number;
  monthlyRent: number;
  annualCharges: number;
  propertyTax: number;
  managementFees: number;
  insuranceCost: number;
  vacancyRate: number;
  loanAmount: number;
  loanDuration: number;
  interestRate: number;
}

const RentabilityCalculator = () => {
  const { toast } = useToast();
  
  const [data, setData] = useState<InvestmentData>({
    purchasePrice: 200000,
    renovationCost: 15000,
    notaryFees: 15000,
    furnishingCost: 5000,
    monthlyRent: 800,
    annualCharges: 1200,
    propertyTax: 1000,
    managementFees: 7,
    insuranceCost: 350,
    vacancyRate: 5,
    loanAmount: 180000,
    loanDuration: 20,
    interestRate: 3.5
  });
  
  const [results, setResults] = useState({
    totalInvestment: 0,
    annualRent: 0,
    netAnnualRent: 0,
    grossYield: 0,
    netYield: 0,
    monthlyPayment: 0,
    cashflow: 0,
    roi: 0,
    breakEvenPoint: 0
  });
  
  // Calculate results when data changes
  useEffect(() => {
    calculateResults();
  }, [data]);
  
  const handleChange = (field: keyof InvestmentData, value: number) => {
    setData(prev => ({ ...prev, [field]: value }));
  };
  
  const calculateResults = () => {
    // Total investment
    const totalInvestment = data.purchasePrice + data.renovationCost + data.notaryFees + data.furnishingCost;
    
    // Annual rent
    const annualRent = data.monthlyRent * 12;
    
    // Management fees
    const managementFeeAmount = (annualRent * data.managementFees) / 100;
    
    // Vacancy loss
    const vacancyLoss = (annualRent * data.vacancyRate) / 100;
    
    // Net annual rent (after charges, taxes, insurance, management fees, vacancy)
    const netAnnualRent = annualRent - data.annualCharges - data.propertyTax - data.insuranceCost - managementFeeAmount - vacancyLoss;
    
    // Gross yield (before expenses)
    const grossYield = (annualRent / totalInvestment) * 100;
    
    // Net yield (after expenses, before loan payment)
    const netYield = (netAnnualRent / totalInvestment) * 100;
    
    // Monthly loan payment calculation
    const monthlyInterestRate = data.interestRate / 100 / 12;
    const numberOfPayments = data.loanDuration * 12;
    let monthlyPayment = 0;
    
    if (data.loanAmount > 0 && monthlyInterestRate > 0) {
      monthlyPayment = data.loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
    
    // Annual loan payment
    const annualLoanPayment = monthlyPayment * 12;
    
    // Monthly cashflow
    const monthlyCashflow = (netAnnualRent - annualLoanPayment) / 12;
    
    // Return on investment (ROI) considering only down payment
    const downPayment = totalInvestment - data.loanAmount;
    const roi = downPayment > 0 ? (monthlyCashflow * 12 / downPayment) * 100 : 0;
    
    // Break-even point (in years)
    const breakEvenPoint = downPayment > 0 ? downPayment / (monthlyCashflow * 12) : 0;
    
    setResults({
      totalInvestment,
      annualRent,
      netAnnualRent,
      grossYield,
      netYield,
      monthlyPayment,
      cashflow: monthlyCashflow,
      roi,
      breakEvenPoint
    });
  };
  
  const generateChartData = () => {
    return [
      { name: 'Achat', montant: data.purchasePrice },
      { name: 'Travaux', montant: data.renovationCost },
      { name: 'Frais de notaire', montant: data.notaryFees },
      { name: 'Ameublement', montant: data.furnishingCost }
    ];
  };
  
  const generateIncomeChartData = () => {
    const annualRent = data.monthlyRent * 12;
    const managementFees = (annualRent * data.managementFees) / 100;
    const vacancyLoss = (annualRent * data.vacancyRate) / 100;
    
    return [
      { name: 'Loyers', montant: annualRent },
      { name: 'Charges', montant: -data.annualCharges },
      { name: 'Taxe foncière', montant: -data.propertyTax },
      { name: 'Assurance', montant: -data.insuranceCost },
      { name: 'Gestion', montant: -managementFees },
      { name: 'Vacance', montant: -vacancyLoss },
      { name: 'Crédit', montant: -results.monthlyPayment * 12 },
    ];
  };
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`;
  };
  
  const formatYear = (value: number) => {
    return `${value.toFixed(1)} ans`;
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title and header
    doc.setFontSize(20);
    doc.text('Analyse de rentabilité locative - Progineer', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('Rapport détaillé d\'investissement immobilier', 105, 30, { align: 'center' });
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 105, 40, { align: 'center' });
    
    // Investment details
    doc.setFontSize(14);
    doc.text('Détails de l\'investissement', 20, 60);
    
    doc.autoTable({
      startY: 65,
      head: [['Description', 'Montant']],
      body: [
        ['Prix d\'achat', formatPrice(data.purchasePrice)],
        ['Coût des travaux', formatPrice(data.renovationCost)],
        ['Frais de notaire', formatPrice(data.notaryFees)],
        ['Coût d\'ameublement', formatPrice(data.furnishingCost)],
        ['Investissement total', formatPrice(results.totalInvestment)],
        ['Montant du prêt', formatPrice(data.loanAmount)],
        ['Apport personnel', formatPrice(results.totalInvestment - data.loanAmount)]
      ],
      headStyles: { fillColor: [171, 163, 138] },
      alternateRowStyles: { fillColor: [245, 245, 240] }
    });
    
    // Rental income
    doc.setFontSize(14);
    const finalY1 = (doc as any).lastAutoTable.finalY + 10;
    doc.text('Revenus locatifs', 20, finalY1);
    
    doc.autoTable({
      startY: finalY1 + 5,
      head: [['Description', 'Montant']],
      body: [
        ['Loyer mensuel', formatPrice(data.monthlyRent)],
        ['Loyer annuel', formatPrice(data.monthlyRent * 12)],
        ['Charges annuelles', formatPrice(data.annualCharges)],
        ['Taxe foncière', formatPrice(data.propertyTax)],
        ['Assurance', formatPrice(data.insuranceCost)],
        ['Frais de gestion (' + data.managementFees + '%)', formatPrice((data.monthlyRent * 12 * data.managementFees) / 100)],
        ['Pertes vacance (' + data.vacancyRate + '%)', formatPrice((data.monthlyRent * 12 * data.vacancyRate) / 100)],
        ['Revenu net annuel', formatPrice(results.netAnnualRent)]
      ],
      headStyles: { fillColor: [171, 163, 138] },
      alternateRowStyles: { fillColor: [245, 245, 240] }
    });
    
    // Loan details
    doc.setFontSize(14);
    const finalY2 = (doc as any).lastAutoTable.finalY + 10;
    doc.text('Détails du financement', 20, finalY2);
    
    doc.autoTable({
      startY: finalY2 + 5,
      head: [['Description', 'Valeur']],
      body: [
        ['Montant emprunté', formatPrice(data.loanAmount)],
        ['Durée du prêt', `${data.loanDuration} ans`],
        ['Taux d\'intérêt', `${data.interestRate}%`],
        ['Mensualité', formatPrice(results.monthlyPayment)],
        ['Coût annuel du crédit', formatPrice(results.monthlyPayment * 12)]
      ],
      headStyles: { fillColor: [171, 163, 138] },
      alternateRowStyles: { fillColor: [245, 245, 240] }
    });
    
    // Rentability indicators
    doc.setFontSize(14);
    const finalY3 = (doc as any).lastAutoTable.finalY + 10;
    doc.text('Indicateurs de rentabilité', 20, finalY3);
    
    doc.autoTable({
      startY: finalY3 + 5,
      head: [['Indicateur', 'Valeur']],
      body: [
        ['Rendement brut', formatPercent(results.grossYield)],
        ['Rendement net', formatPercent(results.netYield)],
        ['Cash-flow mensuel', formatPrice(results.cashflow)],
        ['Cash-flow annuel', formatPrice(results.cashflow * 12)],
        ['Retour sur investissement (ROI)', formatPercent(results.roi)],
        ['Point d\'équilibre', formatYear(results.breakEvenPoint)]
      ],
      headStyles: { fillColor: [171, 163, 138] },
      alternateRowStyles: { fillColor: [245, 245, 240] }
    });
    
    // Footer
    doc.setFontSize(10);
    doc.text('Document généré par l\'outil d\'analyse de rentabilité Progineer', 105, 280, { align: 'center' });
    
    // Save PDF
    doc.save('analyse-rentabilite-progineer.pdf');
    
    toast({
      title: "PDF généré",
      description: "Le rapport a été téléchargé avec succès",
    });
  };
  
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-khaki-600" />
          Simulateur de rentabilité locative
        </CardTitle>
        <CardDescription>
          Analysez rapidement la rentabilité de vos investissements immobiliers locatifs
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="investment" className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="investment">Investissement</TabsTrigger>
            <TabsTrigger value="income">Revenus locatifs</TabsTrigger>
            <TabsTrigger value="results">Résultats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="investment" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="purchasePrice">Prix d'achat (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="purchasePrice"
                      type="number"
                      min="0"
                      value={data.purchasePrice}
                      onChange={(e) => handleChange('purchasePrice', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="renovationCost">Coût des travaux (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="renovationCost"
                      type="number"
                      min="0"
                      value={data.renovationCost}
                      onChange={(e) => handleChange('renovationCost', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="notaryFees">Frais de notaire (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="notaryFees"
                      type="number"
                      min="0"
                      value={data.notaryFees}
                      onChange={(e) => handleChange('notaryFees', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="furnishingCost">Coût d'ameublement (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="furnishingCost"
                      type="number"
                      min="0"
                      value={data.furnishingCost}
                      onChange={(e) => handleChange('furnishingCost', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={generateChartData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatPrice(Number(value))} />
                      <Legend />
                      <Bar dataKey="montant" name="Montant" fill="#ab9f76" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 p-4 bg-khaki-50 rounded-lg border border-khaki-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Investissement total</p>
                      <p className="text-2xl font-bold text-khaki-800">{formatPrice(results.totalInvestment)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Apport personnel</p>
                      <p className="text-xl font-semibold text-khaki-700">
                        {formatPrice(results.totalInvestment - data.loanAmount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">Financement</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="loanAmount">Montant du prêt (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="loanAmount"
                      type="number"
                      min="0"
                      value={data.loanAmount}
                      onChange={(e) => handleChange('loanAmount', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="loanDuration">Durée du prêt (années)</Label>
                  <div className="mt-2">
                    <Slider
                      id="loanDuration"
                      min={5}
                      max={30}
                      step={1}
                      value={[data.loanDuration]}
                      onValueChange={(value) => handleChange('loanDuration', value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>5 ans</span>
                      <span>{data.loanDuration} ans</span>
                      <span>30 ans</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="interestRate">Taux d'intérêt (%)</Label>
                  <div className="mt-2">
                    <Slider
                      id="interestRate"
                      min={0}
                      max={10}
                      step={0.1}
                      value={[data.interestRate]}
                      onValueChange={(value) => handleChange('interestRate', value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>{data.interestRate}%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="income" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="monthlyRent">Loyer mensuel (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="monthlyRent"
                      type="number"
                      min="0"
                      value={data.monthlyRent}
                      onChange={(e) => handleChange('monthlyRent', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="annualCharges">Charges annuelles (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="annualCharges"
                      type="number"
                      min="0"
                      value={data.annualCharges}
                      onChange={(e) => handleChange('annualCharges', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="propertyTax">Taxe foncière (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="propertyTax"
                      type="number"
                      min="0"
                      value={data.propertyTax}
                      onChange={(e) => handleChange('propertyTax', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="insuranceCost">Assurance annuelle (€)</Label>
                  <div className="flex items-center mt-2">
                    <Input
                      id="insuranceCost"
                      type="number"
                      min="0"
                      value={data.insuranceCost}
                      onChange={(e) => handleChange('insuranceCost', Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="managementFees">Frais de gestion (%)</Label>
                  <div className="mt-2">
                    <Slider
                      id="managementFees"
                      min={0}
                      max={15}
                      step={0.5}
                      value={[data.managementFees]}
                      onValueChange={(value) => handleChange('managementFees', value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>{data.managementFees}%</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="vacancyRate">Taux de vacance (%)</Label>
                  <div className="mt-2">
                    <Slider
                      id="vacancyRate"
                      min={0}
                      max={20}
                      step={1}
                      value={[data.vacancyRate]}
                      onValueChange={(value) => handleChange('vacancyRate', value[0])}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>{data.vacancyRate}%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={generateIncomeChartData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatPrice(Number(value))} />
                      <Legend />
                      <Bar 
                        dataKey="montant" 
                        name="Montant" 
                        fill={(data) => data.montant >= 0 ? "#4ade80" : "#f87171"}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 p-4 bg-khaki-50 rounded-lg border border-khaki-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Loyer annuel</p>
                      <p className="text-xl font-semibold text-khaki-700">{formatPrice(data.monthlyRent * 12)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Revenu net annuel</p>
                      <p className="text-xl font-semibold text-khaki-700">{formatPrice(results.netAnnualRent)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-khaki-50 p-6 rounded-lg border border-khaki-100">
                    <h3 className="text-lg font-medium mb-4">Rendements</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Rendement brut</p>
                        <p className="text-2xl font-bold text-khaki-800">{formatPercent(results.grossYield)}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Rendement net</p>
                        <p className="text-2xl font-bold text-khaki-800">{formatPercent(results.netYield)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-khaki-50 p-6 rounded-lg border border-khaki-100">
                    <h3 className="text-lg font-medium mb-4">Cash-flow</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Cash-flow mensuel</p>
                        <p className={`text-2xl font-bold ${results.cashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPrice(results.cashflow)}
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Cash-flow annuel</p>
                        <p className={`text-2xl font-bold ${results.cashflow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatPrice(results.cashflow * 12)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-khaki-50 p-6 rounded-lg border border-khaki-100">
                    <h3 className="text-lg font-medium mb-4">Financement</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Apport</p>
                        <p className="text-2xl font-bold text-khaki-800">
                          {formatPrice(results.totalInvestment - data.loanAmount)}
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Mensualité</p>
                        <p className="text-2xl font-bold text-khaki-800">{formatPrice(results.monthlyPayment)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-khaki-50 p-6 rounded-lg border border-khaki-100">
                    <h3 className="text-lg font-medium mb-4">Retour sur investissement</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">ROI</p>
                        <p className="text-2xl font-bold text-khaki-800">{formatPercent(results.roi)}</p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                        <p className="text-sm text-gray-500">Point d'équilibre</p>
                        <p className="text-2xl font-bold text-khaki-800">{formatYear(results.breakEvenPoint)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => window.print()} className="flex items-center gap-2">
                  <Printer className="h-4 w-4" /> Imprimer
                </Button>
                <Button onClick={generatePDF} className="flex items-center gap-2 bg-khaki-600 hover:bg-khaki-700">
                  <Download className="h-4 w-4" /> Exporter en PDF
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RentabilityCalculator;
