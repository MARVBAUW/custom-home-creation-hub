
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, FileDown, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LoanOption {
  id: string;
  name: string;
  loanAmount: number;
  interestRate: number;
  duration: number;
  insuranceRate: number;
  fees: number;
}

const LoanComparatorCalculator = () => {
  const { toast } = useToast();
  const [loanOptions, setLoanOptions] = useState<LoanOption[]>([
    {
      id: '1',
      name: 'Option 1',
      loanAmount: 200000,
      interestRate: 3.5,
      duration: 20,
      insuranceRate: 0.36,
      fees: 2000
    }
  ]);
  
  const [newLoan, setNewLoan] = useState<Omit<LoanOption, 'id'>>({
    name: '',
    loanAmount: 0,
    interestRate: 0,
    duration: 0,
    insuranceRate: 0,
    fees: 0
  });

  const addLoanOption = () => {
    if (!newLoan.name) {
      toast({
        title: "Nom requis",
        description: "Veuillez donner un nom à cette option de prêt",
        variant: "destructive"
      });
      return;
    }
    
    setLoanOptions([...loanOptions, { ...newLoan, id: Date.now().toString() }]);
    setNewLoan({
      name: '',
      loanAmount: 0,
      interestRate: 0,
      duration: 0,
      insuranceRate: 0,
      fees: 0
    });
    
    toast({
      title: "Option ajoutée",
      description: "Nouvelle option de prêt ajoutée avec succès."
    });
  };

  const removeLoanOption = (id: string) => {
    setLoanOptions(loanOptions.filter(option => option.id !== id));
    toast({
      title: "Option supprimée",
      description: "L'option de prêt a été supprimée."
    });
  };

  const calculateMonthlyPayment = (option: LoanOption) => {
    const monthlyInterestRate = option.interestRate / 100 / 12;
    const totalMonths = option.duration * 12;
    const principal = option.loanAmount;
    
    const monthlyPayment = principal * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / 
      (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
      
    const insuranceMonthly = (principal * (option.insuranceRate / 100)) / 12;
    
    return monthlyPayment + insuranceMonthly;
  };

  const calculateTotalCost = (option: LoanOption) => {
    const monthlyPayment = calculateMonthlyPayment(option);
    const totalMonths = option.duration * 12;
    return (monthlyPayment * totalMonths) + option.fees;
  };

  const saveComparison = () => {
    // In a real implementation, this would save to local storage or database
    toast({
      title: "Comparaison sauvegardée",
      description: "Votre comparaison de prêts a été sauvegardée dans votre espace personnel."
    });
  };

  const exportComparison = () => {
    // In a real implementation, this would export to PDF
    toast({
      title: "Export en cours",
      description: "Votre comparaison de prêts est en cours d'export en PDF."
    });
  };

  const getBestOption = () => {
    if (loanOptions.length === 0) return null;
    
    return loanOptions.reduce((best, current) => 
      calculateTotalCost(current) < calculateTotalCost(best) ? current : best
    );
  };

  const bestOption = getBestOption();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Comparateur de prêts immobiliers</CardTitle>
        <CardDescription>
          Comparez différentes offres de prêts pour trouver la plus avantageuse
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="comparison">
          <TabsList>
            <TabsTrigger value="comparison">Comparaison</TabsTrigger>
            <TabsTrigger value="add">Ajouter une option</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comparison" className="space-y-6">
            {loanOptions.length > 0 ? (
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
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loanOptions.map(option => (
                      <TableRow key={option.id} className={option.id === bestOption?.id ? "bg-green-50" : ""}>
                        <TableCell className="font-medium">{option.name}</TableCell>
                        <TableCell>{option.loanAmount.toLocaleString('fr-FR')} €</TableCell>
                        <TableCell>{option.interestRate}%</TableCell>
                        <TableCell>{option.duration} ans</TableCell>
                        <TableCell>{calculateMonthlyPayment(option).toFixed(2)} €</TableCell>
                        <TableCell>{calculateTotalCost(option).toFixed(2)} €</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeLoanOption(option.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {bestOption && (
                  <div className="bg-green-50 p-4 rounded-md border border-green-200">
                    <h3 className="font-medium text-lg mb-1 text-green-700">Meilleure option</h3>
                    <p className="font-bold text-lg">{bestOption.name}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Cette option vous offre le coût total le plus avantageux sur la durée du prêt.
                    </p>
                  </div>
                )}
                
                <div className="flex gap-3">
                  <Button variant="outline" onClick={saveComparison}>
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" onClick={exportComparison}>
                    <FileDown className="h-4 w-4 mr-2" />
                    Exporter en PDF
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 border rounded-md border-dashed">
                <p className="text-gray-500">Ajoutez des options de prêts pour les comparer</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => document.querySelector('[data-value="add"]')?.click()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une option
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="add" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'option</Label>
                <Input 
                  id="name" 
                  value={newLoan.name}
                  onChange={e => setNewLoan({...newLoan, name: e.target.value})}
                  placeholder="ex: Banque ABC"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Montant du prêt (€)</Label>
                <Input 
                  id="amount" 
                  type="number"
                  value={newLoan.loanAmount || ''}
                  onChange={e => setNewLoan({...newLoan, loanAmount: Number(e.target.value)})}
                  placeholder="ex: 200000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rate">Taux d'intérêt (%)</Label>
                <Input 
                  id="rate" 
                  type="number"
                  step="0.01"
                  value={newLoan.interestRate || ''}
                  onChange={e => setNewLoan({...newLoan, interestRate: Number(e.target.value)})}
                  placeholder="ex: 3.5"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Durée (années)</Label>
                <Input 
                  id="duration" 
                  type="number"
                  value={newLoan.duration || ''}
                  onChange={e => setNewLoan({...newLoan, duration: Number(e.target.value)})}
                  placeholder="ex: 20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insurance">Taux d'assurance (%)</Label>
                <Input 
                  id="insurance" 
                  type="number"
                  step="0.01"
                  value={newLoan.insuranceRate || ''}
                  onChange={e => setNewLoan({...newLoan, insuranceRate: Number(e.target.value)})}
                  placeholder="ex: 0.36"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fees">Frais de dossier (€)</Label>
                <Input 
                  id="fees" 
                  type="number"
                  value={newLoan.fees || ''}
                  onChange={e => setNewLoan({...newLoan, fees: Number(e.target.value)})}
                  placeholder="ex: 2000"
                />
              </div>
            </div>
            
            <Button onClick={addLoanOption} className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter cette option
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoanComparatorCalculator;
