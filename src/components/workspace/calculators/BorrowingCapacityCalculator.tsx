
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, Save, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const BorrowingCapacityCalculator = () => {
  const { toast } = useToast();
  const [monthlyIncome, setMonthlyIncome] = useState<number>(3000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(1000);
  const [loanDuration, setLoanDuration] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [result, setResult] = useState<number | null>(null);

  const calculateBorrowingCapacity = () => {
    // Maximum debt ratio of 33%
    const maxMonthlyPayment = (monthlyIncome - monthlyExpenses) * 0.33;
    
    // Convert annual interest rate to monthly
    const monthlyInterestRate = interestRate / 100 / 12;
    
    // Convert years to months
    const totalMonths = loanDuration * 12;
    
    // Calculate loan amount using the formula: PMT = P * (r * (1+r)^n) / ((1+r)^n - 1)
    // Where: PMT = monthly payment, P = principal (what we're solving for), r = monthly interest rate, n = number of payments
    const borrowingCapacity = maxMonthlyPayment * ((1 - Math.pow(1 + monthlyInterestRate, -totalMonths)) / monthlyInterestRate);
    
    setResult(Math.round(borrowingCapacity));
    
    toast({
      title: "Calcul effectué",
      description: "Votre capacité d'emprunt a été calculée avec succès."
    });
  };

  const saveSimulation = () => {
    // In a real implementation, this would save to a database
    toast({
      title: "Simulation sauvegardée",
      description: "Votre simulation a été enregistrée dans votre espace personnel."
    });
  };

  const exportSimulation = () => {
    // In a real implementation, this would generate a PDF
    toast({
      title: "Export en cours",
      description: "Votre simulation est en cours d'export en PDF."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-khaki-600" />
          Calculateur de capacité d'emprunt
        </CardTitle>
        <CardDescription>
          Estimez le montant que vous pouvez emprunter en fonction de vos revenus et charges
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="income">Revenus mensuels (€)</Label>
            <Input 
              id="income" 
              type="number" 
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              min={0}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expenses">Charges mensuelles (€)</Label>
            <Input 
              id="expenses" 
              type="number" 
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              min={0}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="duration">Durée du prêt</Label>
              <span className="text-sm text-gray-500">{loanDuration} ans</span>
            </div>
            <Slider 
              id="duration"
              min={5}
              max={30}
              step={1}
              value={[loanDuration]}
              onValueChange={(value) => setLoanDuration(value[0])}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="rate">Taux d'intérêt</Label>
              <span className="text-sm text-gray-500">{interestRate}%</span>
            </div>
            <Slider 
              id="rate"
              min={1}
              max={7}
              step={0.1}
              value={[interestRate]}
              onValueChange={(value) => setInterestRate(value[0])}
              className="w-full"
            />
          </div>
          
          <Button 
            onClick={calculateBorrowingCapacity}
            className="w-full mt-4 bg-khaki-600 hover:bg-khaki-700"
          >
            Calculer ma capacité d'emprunt
          </Button>
        </div>
        
        {result !== null && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="font-medium text-lg mb-1">Résultat du calcul</h3>
            <p className="text-2xl font-bold text-khaki-700 mb-3">
              {result.toLocaleString('fr-FR')} €
            </p>
            <p className="text-sm text-gray-600">
              Avec un taux d'intérêt de {interestRate}% sur {loanDuration} ans, votre capacité d'emprunt est estimée à {result.toLocaleString('fr-FR')} €.
            </p>
            
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={saveSimulation}>
                <Save className="h-4 w-4 mr-1" />
                Sauvegarder
              </Button>
              <Button variant="outline" size="sm" onClick={exportSimulation}>
                <FileDown className="h-4 w-4 mr-1" />
                Exporter
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BorrowingCapacityCalculator;
