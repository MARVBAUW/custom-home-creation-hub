
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator, ArrowRightLeft } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

interface LoanData {
  name: string;
  amount: number;
  rate: number;
  duration: number;
  insuranceRate: number;
  fees: number;
  paymentType: 'constant' | 'degressive';
  gracePeriod: number;
}

interface ComparisonResult {
  name: string;
  monthlyPayment: number;
  totalInterest: number;
  totalInsurance: number;
  totalCost: number;
  effectiveRate: number;
}

const LoanComparisonCalculator = () => {
  const { toast } = useToast();
  const [loans, setLoans] = useState<LoanData[]>([
    {
      name: "Offre 1",
      amount: 200000,
      rate: 3.5,
      duration: 20,
      insuranceRate: 0.36,
      fees: 2000,
      paymentType: 'constant',
      gracePeriod: 0
    },
    {
      name: "Offre 2",
      amount: 200000,
      rate: 3.65,
      duration: 25,
      insuranceRate: 0.34,
      fees: 1800,
      paymentType: 'constant',
      gracePeriod: 0
    }
  ]);
  const [activeTab, setActiveTab] = useState('input');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [paymentChartData, setPaymentChartData] = useState<any[]>([]);
  const [costChartData, setCostChartData] = useState<any[]>([]);

  const addLoan = () => {
    if (loans.length >= 5) {
      toast({
        title: "Limite atteinte",
        description: "Vous pouvez comparer jusqu'à 5 offres de prêt simultanément",
        variant: "destructive"
      });
      return;
    }

    const newLoan: LoanData = {
      name: `Offre ${loans.length + 1}`,
      amount: 200000,
      rate: 3.5,
      duration: 20,
      insuranceRate: 0.36,
      fees: 2000,
      paymentType: 'constant',
      gracePeriod: 0
    };

    setLoans([...loans, newLoan]);
  };

  const removeLoan = (index: number) => {
    if (loans.length <= 2) {
      toast({
        title: "Action impossible",
        description: "Vous devez conserver au moins 2 offres pour une comparaison",
        variant: "destructive"
      });
      return;
    }

    const updatedLoans = [...loans];
    updatedLoans.splice(index, 1);
    setLoans(updatedLoans);
  };

  const updateLoan = (index: number, field: keyof LoanData, value: any) => {
    const updatedLoans = [...loans];
    updatedLoans[index] = {
      ...updatedLoans[index],
      [field]: value
    };
    setLoans(updatedLoans);
  };

  const calculatePayments = () => {
    const results: ComparisonResult[] = loans.map(loan => {
      const monthlyRate = loan.rate / 12 / 100;
      const totalMonths = loan.duration * 12;
      let monthlyPayment = 0;
      let totalInterest = 0;

      // Calcul de la mensualité sans assurance
      if (loan.paymentType === 'constant') {
        if (monthlyRate > 0) {
          monthlyPayment = (loan.amount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
        } else {
          monthlyPayment = loan.amount / totalMonths;
        }
        totalInterest = (monthlyPayment * totalMonths) - loan.amount;
      } else {
        // Calcul pour un prêt dégressif - simplification
        const principalPerMonth = loan.amount / totalMonths;
        let remainingAmount = loan.amount;
        let totalPayments = 0;

        for (let i = 0; i < totalMonths; i++) {
          const interestPayment = remainingAmount * monthlyRate;
          totalPayments += (principalPerMonth + interestPayment);
          remainingAmount -= principalPerMonth;
        }

        monthlyPayment = totalPayments / totalMonths;
        totalInterest = totalPayments - loan.amount;
      }

      // Calcul du coût de l'assurance
      const monthlyInsuranceRate = loan.insuranceRate / 12 / 100;
      const totalInsurance = loan.amount * monthlyInsuranceRate * totalMonths;
      
      // Ajout de l'assurance à la mensualité
      const monthlyPaymentWithInsurance = monthlyPayment + (loan.amount * monthlyInsuranceRate);
      
      // Calcul du coût total
      const totalCost = totalInterest + totalInsurance + loan.fees;
      
      // Calcul du TAEG approximatif
      const effectiveRate = (totalCost / (loan.amount * loan.duration)) * 100;

      return {
        name: loan.name,
        monthlyPayment: monthlyPaymentWithInsurance,
        totalInterest,
        totalInsurance,
        totalCost,
        effectiveRate
      };
    });

    setComparisonResults(results);
    prepareChartData(results);
    setHasCalculated(true);
    setActiveTab('results');

    toast({
      title: "Comparaison effectuée",
      description: "Les résultats ont été calculés avec succès"
    });
  };

  const prepareChartData = (results: ComparisonResult[]) => {
    // Données pour le graphique des mensualités
    const paymentData = results.map(result => ({
      name: result.name,
      value: result.monthlyPayment
    }));
    setPaymentChartData(paymentData);

    // Données pour le graphique des coûts
    const costDataTemp: any[] = [];
    
    results.forEach(result => {
      costDataTemp.push({
        name: result.name,
        key: "Intérêts",
        value: result.totalInterest
      });
      
      costDataTemp.push({
        name: result.name,
        key: "Assurance",
        value: result.totalInsurance
      });
      
      costDataTemp.push({
        name: result.name,
        key: "Frais",
        value: loans.find(loan => loan.name === result.name)?.fees || 0
      });
    });
    
    setCostChartData(costDataTemp);
  };

  const getLoanColors = () => {
    return ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28554'];
  };

  const getKPIColor = (value: number, lowerIsBetter: boolean = true, results: ComparisonResult[] = comparisonResults) => {
    if (results.length === 0) return 'text-gray-600';
    
    const values = results.map(r => 
      lowerIsBetter ? r.monthlyPayment : r.effectiveRate
    );
    
    const best = lowerIsBetter ? Math.min(...values) : Math.max(...values);
    const worst = lowerIsBetter ? Math.max(...values) : Math.min(...values);
    
    if (Math.abs(value - best) < 0.01) return 'text-green-600';
    if (Math.abs(value - worst) < 0.01) return 'text-red-600';
    return 'text-yellow-600';
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5 text-khaki-600" />
          Comparateur de prêts immobiliers
        </CardTitle>
        <CardDescription>
          Comparez différentes offres de prêt pour trouver la plus avantageuse
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="input" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="input">Saisie des offres</TabsTrigger>
            <TabsTrigger value="results" disabled={!hasCalculated}>Résultats</TabsTrigger>
          </TabsList>
          
          <TabsContent value="input" className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Vos offres de prêt</h3>
                <Button onClick={addLoan} size="sm">
                  Ajouter une offre
                </Button>
              </div>
              
              {loans.map((loan, index) => (
                <Card key={index} className="mb-6 p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <Badge style={{ backgroundColor: getLoanColors()[index % 5] }} className="h-3 w-3 p-0 rounded-full" />
                      <Label htmlFor={`name-${index}`}>Nom de l'offre</Label>
                    </div>
                    {loans.length > 2 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeLoan(index)}
                        className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Supprimer
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Input
                        id={`name-${index}`}
                        value={loan.name}
                        onChange={(e) => updateLoan(index, 'name', e.target.value)}
                        className="mb-4"
                      />
                      
                      <Label htmlFor={`amount-${index}`}>Montant emprunté</Label>
                      <Input
                        id={`amount-${index}`}
                        type="number"
                        value={loan.amount}
                        onChange={(e) => updateLoan(index, 'amount', parseFloat(e.target.value) || 0)}
                        className="mb-2"
                      />
                      <p className="text-xs text-gray-500 mb-4">Montant du capital emprunté en euros</p>
                      
                      <Label htmlFor={`fees-${index}`}>Frais de dossier</Label>
                      <Input
                        id={`fees-${index}`}
                        type="number"
                        value={loan.fees}
                        onChange={(e) => updateLoan(index, 'fees', parseFloat(e.target.value) || 0)}
                        className="mb-2"
                      />
                      <p className="text-xs text-gray-500">Frais bancaires, courtage, garanties...</p>
                    </div>
                    
                    <div>
                      <Label htmlFor={`rate-${index}`}>Taux d'intérêt (%)</Label>
                      <Input
                        id={`rate-${index}`}
                        type="number"
                        step="0.01"
                        value={loan.rate}
                        onChange={(e) => updateLoan(index, 'rate', parseFloat(e.target.value) || 0)}
                        className="mb-2"
                      />
                      <p className="text-xs text-gray-500 mb-4">Taux nominal annuel (hors assurance)</p>
                      
                      <Label htmlFor={`duration-${index}`}>Durée (années)</Label>
                      <Input
                        id={`duration-${index}`}
                        type="number"
                        value={loan.duration}
                        onChange={(e) => updateLoan(index, 'duration', parseInt(e.target.value) || 0)}
                        className="mb-2"
                      />
                      <p className="text-xs text-gray-500 mb-4">Durée totale du prêt en années</p>
                      
                      <Label htmlFor={`insurance-${index}`}>Taux d'assurance (%)</Label>
                      <Input
                        id={`insurance-${index}`}
                        type="number"
                        step="0.01"
                        value={loan.insuranceRate}
                        onChange={(e) => updateLoan(index, 'insuranceRate', parseFloat(e.target.value) || 0)}
                        className="mb-2"
                      />
                      <p className="text-xs text-gray-500">Taux annuel sur le capital emprunté</p>
                    </div>
                    
                    {showAdvanced && (
                      <div>
                        <Label htmlFor={`paymentType-${index}`}>Type d'amortissement</Label>
                        <Select
                          value={loan.paymentType}
                          onValueChange={(value: 'constant' | 'degressive') => updateLoan(index, 'paymentType', value)}
                        >
                          <SelectTrigger id={`paymentType-${index}`} className="mb-2">
                            <SelectValue placeholder="Type d'amortissement" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="constant">Mensualités constantes</SelectItem>
                            <SelectItem value="degressive">Mensualités dégressives</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-gray-500 mb-4">Mode de calcul des remboursements</p>
                        
                        <Label htmlFor={`gracePeriod-${index}`}>Différé (mois)</Label>
                        <Input
                          id={`gracePeriod-${index}`}
                          type="number"
                          value={loan.gracePeriod}
                          onChange={(e) => updateLoan(index, 'gracePeriod', parseInt(e.target.value) || 0)}
                          className="mb-2"
                        />
                        <p className="text-xs text-gray-500">Période de différé d'amortissement</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              
              <Separator className="my-6" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="advanced-mode"
                    checked={showAdvanced}
                    onCheckedChange={setShowAdvanced}
                  />
                  <Label htmlFor="advanced-mode">Mode avancé</Label>
                </div>
                
                <Button onClick={calculatePayments}>
                  Comparer les offres
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="results" className="space-y-6">
            {hasCalculated && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Comparaison des mensualités</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={paymentChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `${value.toFixed(2)} €`} />
                            <Bar dataKey="value" name="Mensualité" fill="#a28554" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Comparaison des coûts totaux</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={costChartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value: number) => `${value.toLocaleString('fr-FR')} €`} />
                            <Legend />
                            <Bar dataKey="value" name="Coût" fill="#a28554" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-left">
                        <th className="py-3 px-4 font-medium"></th>
                        {comparisonResults.map((result, index) => (
                          <th key={index} className="py-3 px-4 font-medium">
                            <div className="flex items-center">
                              <Badge 
                                style={{ backgroundColor: getLoanColors()[index % 5] }} 
                                className="h-3 w-3 p-0 rounded-full mr-2" 
                              />
                              {result.name}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">Mensualité</td>
                        {comparisonResults.map((result, index) => (
                          <td key={index} className={`py-3 px-4 ${getKPIColor(result.monthlyPayment, true)}`}>
                            {result.monthlyPayment.toFixed(2)} €
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">Total intérêts</td>
                        {comparisonResults.map((result, index) => (
                          <td key={index} className="py-3 px-4">
                            {result.totalInterest.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">Total assurance</td>
                        {comparisonResults.map((result, index) => (
                          <td key={index} className="py-3 px-4">
                            {result.totalInsurance.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">Frais de dossier</td>
                        {comparisonResults.map((result, index) => (
                          <td key={index} className="py-3 px-4">
                            {(loans[index].fees).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200 font-medium">
                        <td className="py-3 px-4 font-medium">Coût total</td>
                        {comparisonResults.map((result, index) => (
                          <td key={index} className={`py-3 px-4 ${getKPIColor(result.totalCost, true)}`}>
                            {result.totalCost.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 px-4 font-medium">TAEG approximatif</td>
                        {comparisonResults.map((result, index) => (
                          <td key={index} className={`py-3 px-4 ${getKPIColor(result.effectiveRate, true)}`}>
                            {result.effectiveRate.toFixed(2)} %
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Analyse comparative</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Les valeurs en vert représentent les meilleures options, celles en rouge les moins avantageuses.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {comparisonResults.map((result, index) => {
                      const loan = loans[index];
                      return (
                        <Card key={index} className="border" style={{ borderLeftColor: getLoanColors()[index % 5], borderLeftWidth: '4px' }}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{result.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-1">
                                <div className="text-sm text-gray-500">Montant</div>
                                <div className="text-sm font-medium text-right">{loan.amount.toLocaleString('fr-FR')} €</div>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <div className="text-sm text-gray-500">Taux nominal</div>
                                <div className="text-sm font-medium text-right">{loan.rate.toFixed(2)} %</div>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <div className="text-sm text-gray-500">Durée</div>
                                <div className="text-sm font-medium text-right">{loan.duration} ans</div>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <div className="text-sm text-gray-500">Mensualité</div>
                                <div className={`text-sm font-medium text-right ${getKPIColor(result.monthlyPayment, true)}`}>
                                  {result.monthlyPayment.toFixed(2)} €
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-1">
                                <div className="text-sm text-gray-500">Coût total</div>
                                <div className={`text-sm font-medium text-right ${getKPIColor(result.totalCost, true)}`}>
                                  {result.totalCost.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} €
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setActiveTab('input')}>
                    Modifier les données
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LoanComparisonCalculator;
