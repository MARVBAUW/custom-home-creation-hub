
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Trash2, BarChart } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LoanOption {
  id: number;
  name: string;
  amount: number;
  rate: number;
  term: number;
  fees: number;
  monthlyPayment: number;
  totalCost: number;
}

const LoanComparatorCalculator: React.FC = () => {
  const [loans, setLoans] = useState<LoanOption[]>([
    {
      id: 1,
      name: "Option 1",
      amount: 200000,
      rate: 3.5,
      term: 20,
      fees: 3000,
      monthlyPayment: 0,
      totalCost: 0
    },
    {
      id: 2,
      name: "Option 2",
      amount: 200000,
      rate: 3.2,
      term: 25,
      fees: 4000,
      monthlyPayment: 0,
      totalCost: 0
    }
  ]);
  
  const [activeTab, setActiveTab] = useState<string>("comparison");

  // Calculer les mensualités et le coût total
  const calculateLoan = (loan: LoanOption): LoanOption => {
    const monthlyRate = loan.rate / 100 / 12;
    const numberOfPayments = loan.term * 12;
    const monthlyPayment = loan.amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalCost = (monthlyPayment * numberOfPayments) + loan.fees - loan.amount;
    
    return {
      ...loan,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100
    };
  };

  // Calculer toutes les options de prêt
  const calculateAllLoans = () => {
    const calculatedLoans = loans.map(loan => calculateLoan(loan));
    setLoans(calculatedLoans);
  };

  // Ajouter un nouveau prêt
  const addLoan = () => {
    const newId = Math.max(...loans.map(loan => loan.id), 0) + 1;
    const newLoan: LoanOption = {
      id: newId,
      name: `Option ${newId}`,
      amount: 200000,
      rate: 3.0,
      term: 20,
      fees: 2000,
      monthlyPayment: 0,
      totalCost: 0
    };
    
    setLoans([...loans, newLoan]);
  };

  // Supprimer un prêt
  const removeLoan = (id: number) => {
    const updatedLoans = loans.filter(loan => loan.id !== id);
    setLoans(updatedLoans);
  };

  // Mettre à jour un prêt
  const updateLoan = (id: number, field: keyof LoanOption, value: number | string) => {
    const updatedLoans = loans.map(loan => {
      if (loan.id === id) {
        return { ...loan, [field]: field === 'name' ? value : Number(value) };
      }
      return loan;
    });
    
    setLoans(updatedLoans);
  };

  // Trouver le meilleur prêt (coût total le plus bas)
  const getBestLoan = (): number => {
    if (loans.length === 0 || loans[0].totalCost === 0) return -1;
    
    const bestLoanIndex = loans.reduce(
      (bestIndex, loan, currentIndex, array) => 
        loan.totalCost < array[bestIndex].totalCost ? currentIndex : bestIndex, 
      0
    );
    
    return loans[bestLoanIndex].id;
  };

  const bestLoanId = getBestLoan();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="h-5 w-5 text-primary" />
          Comparateur de Prêts Immobiliers
        </CardTitle>
        <CardDescription>
          Comparez différentes options de financement pour trouver la plus avantageuse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Édition</TabsTrigger>
            <TabsTrigger value="comparison">Comparaison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="space-y-4 pt-4">
            <div className="space-y-6">
              {loans.map(loan => (
                <Card key={loan.id} className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Input
                        className="max-w-[150px] font-medium"
                        value={loan.name}
                        onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                      />
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLoan(loan.id)}
                      disabled={loans.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor={`amount-${loan.id}`}>Montant du prêt (€)</Label>
                      <Input
                        id={`amount-${loan.id}`}
                        type="number"
                        value={loan.amount}
                        onChange={(e) => updateLoan(loan.id, 'amount', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`rate-${loan.id}`}>Taux d'intérêt (%)</Label>
                      <Input
                        id={`rate-${loan.id}`}
                        type="number"
                        step="0.01"
                        value={loan.rate}
                        onChange={(e) => updateLoan(loan.id, 'rate', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`term-${loan.id}`}>Durée (années)</Label>
                      <Input
                        id={`term-${loan.id}`}
                        type="number"
                        value={loan.term}
                        onChange={(e) => updateLoan(loan.id, 'term', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`fees-${loan.id}`}>Frais de dossier (€)</Label>
                      <Input
                        id={`fees-${loan.id}`}
                        type="number"
                        value={loan.fees}
                        onChange={(e) => updateLoan(loan.id, 'fees', e.target.value)}
                      />
                    </div>
                  </div>
                </Card>
              ))}
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="gap-1"
                  onClick={addLoan}
                >
                  <PlusCircle className="h-4 w-4" />
                  Ajouter une option
                </Button>
                
                <Button type="button" onClick={calculateAllLoans}>
                  Calculer et comparer
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="pt-4">
            {loans[0].monthlyPayment > 0 ? (
              <div className="space-y-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Option</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Taux</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Mensualité</TableHead>
                      <TableHead>Coût total</TableHead>
                      <TableHead>Frais</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loans.map(loan => (
                      <TableRow key={loan.id} className={loan.id === bestLoanId ? "bg-green-50" : ""}>
                        <TableCell className="font-medium">
                          {loan.name}
                          {loan.id === bestLoanId && (
                            <span className="ml-2 text-xs text-green-600 font-normal">(Meilleure option)</span>
                          )}
                        </TableCell>
                        <TableCell>{loan.amount.toLocaleString('fr-FR')} €</TableCell>
                        <TableCell>{loan.rate}%</TableCell>
                        <TableCell>{loan.term} ans</TableCell>
                        <TableCell>{loan.monthlyPayment.toLocaleString('fr-FR')} €</TableCell>
                        <TableCell className={loan.id === bestLoanId ? "font-bold text-green-600" : ""}>
                          {loan.totalCost.toLocaleString('fr-FR')} €
                        </TableCell>
                        <TableCell>{loan.fees.toLocaleString('fr-FR')} €</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <Card className="p-4">
                  <h3 className="text-lg font-medium mb-4">Comparaison des options</h3>
                  
                  {loans.length > 1 && bestLoanId !== -1 && (
                    <div className="space-y-2">
                      <p className="font-medium">
                        La meilleure option est <span className="text-green-600">{loans.find(l => l.id === bestLoanId)?.name}</span>
                      </p>
                      
                      {loans.filter(loan => loan.id !== bestLoanId).map(loan => {
                        const bestLoan = loans.find(l => l.id === bestLoanId);
                        const difference = loan.totalCost - (bestLoan?.totalCost || 0);
                        
                        return (
                          <div key={loan.id} className="text-sm">
                            <span className="font-medium">{loan.name}</span> coûte <span className="text-red-500 font-medium">{difference.toLocaleString('fr-FR')} €</span> de plus que la meilleure option.
                          </div>
                        );
                      })}
                    </div>
                  )}
                </Card>
                
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("edit")}
                  >
                    Modifier les options
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">Aucune comparaison disponible</h3>
                <p className="text-muted-foreground mb-4">
                  Veuillez saisir vos options de prêt et cliquer sur "Calculer et comparer"
                </p>
                <Button onClick={() => setActiveTab("edit")}>
                  Saisir mes options
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoanComparatorCalculator;
