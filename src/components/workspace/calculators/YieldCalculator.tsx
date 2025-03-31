
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Save, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const YieldCalculator = () => {
  const { toast } = useToast();
  const [purchasePrice, setPurchasePrice] = useState<number>(200000);
  const [notaryFees, setNotaryFees] = useState<number>(15000);
  const [renovationCosts, setRenovationCosts] = useState<number>(0);
  const [monthlyRent, setMonthlyRent] = useState<number>(800);
  const [propertyTax, setPropertyTax] = useState<number>(1200);
  const [managementFees, setManagementFees] = useState<number>(0);
  const [maintenanceCosts, setMaintenanceCosts] = useState<number>(500);
  const [insuranceCosts, setInsuranceCosts] = useState<number>(300);
  const [vacancyRate, setVacancyRate] = useState<number>(5);
  const [results, setResults] = useState<{
    grossYield: number;
    netYield: number;
    cashOnCash: number;
  } | null>(null);

  const calculateYield = () => {
    // Calculate total investment
    const totalInvestment = purchasePrice + notaryFees + renovationCosts;
    
    // Calculate annual rental income
    const annualRent = monthlyRent * 12;
    
    // Calculate gross yield (annual rent / total investment)
    const grossYield = (annualRent / totalInvestment) * 100;
    
    // Calculate annual expenses
    const vacancyLoss = (annualRent * vacancyRate) / 100;
    const totalAnnualExpenses = propertyTax + managementFees + maintenanceCosts + insuranceCosts + vacancyLoss;
    
    // Calculate net income
    const netIncome = annualRent - totalAnnualExpenses;
    
    // Calculate net yield (net income / total investment)
    const netYield = (netIncome / totalInvestment) * 100;
    
    // Cash on Cash Return (assuming 20% down payment for simplicity)
    const downPayment = totalInvestment * 0.2;
    const cashOnCash = (netIncome / downPayment) * 100;
    
    setResults({
      grossYield,
      netYield,
      cashOnCash
    });
    
    toast({
      title: "Calcul effectué",
      description: "Les rendements ont été calculés avec succès."
    });
  };

  const saveSimulation = () => {
    toast({
      title: "Simulation sauvegardée",
      description: "Votre simulation a été enregistrée dans votre espace personnel."
    });
  };

  const exportSimulation = () => {
    toast({
      title: "Export en cours",
      description: "Votre simulation est en cours d'export en PDF."
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-khaki-600" />
          Calculateur de rendement locatif
        </CardTitle>
        <CardDescription>
          Estimez le rendement brut et net de votre investissement immobilier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Investissement</h3>
            
            <div className="space-y-2">
              <Label htmlFor="purchasePrice">Prix d'achat (€)</Label>
              <Input 
                id="purchasePrice" 
                type="number" 
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notaryFees">Frais de notaire (€)</Label>
              <Input 
                id="notaryFees" 
                type="number" 
                value={notaryFees}
                onChange={(e) => setNotaryFees(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="renovationCosts">Coûts de rénovation (€)</Label>
              <Input 
                id="renovationCosts" 
                type="number" 
                value={renovationCosts}
                onChange={(e) => setRenovationCosts(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="monthlyRent">Loyer mensuel (€)</Label>
              <Input 
                id="monthlyRent" 
                type="number" 
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Charges annuelles</h3>
            
            <div className="space-y-2">
              <Label htmlFor="propertyTax">Taxe foncière (€/an)</Label>
              <Input 
                id="propertyTax" 
                type="number" 
                value={propertyTax}
                onChange={(e) => setPropertyTax(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="managementFees">Frais de gestion (€/an)</Label>
              <Input 
                id="managementFees" 
                type="number" 
                value={managementFees}
                onChange={(e) => setManagementFees(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maintenanceCosts">Charges d'entretien (€/an)</Label>
              <Input 
                id="maintenanceCosts" 
                type="number" 
                value={maintenanceCosts}
                onChange={(e) => setMaintenanceCosts(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="insuranceCosts">Assurance PNO (€/an)</Label>
              <Input 
                id="insuranceCosts" 
                type="number" 
                value={insuranceCosts}
                onChange={(e) => setInsuranceCosts(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vacancyRate">Taux de vacance (%)</Label>
              <Input 
                id="vacancyRate" 
                type="number" 
                value={vacancyRate}
                onChange={(e) => setVacancyRate(Number(e.target.value))}
                min={0}
                max={100}
              />
            </div>
          </div>
        </div>
        
        <Button 
          onClick={calculateYield}
          className="w-full mt-4 bg-khaki-600 hover:bg-khaki-700"
        >
          Calculer le rendement
        </Button>
        
        {results && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="font-medium text-lg mb-3">Résultats de l'analyse</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded-md border">
                <div className="text-sm text-gray-500">Rendement brut</div>
                <div className="text-2xl font-bold text-khaki-700">{results.grossYield.toFixed(2)}%</div>
              </div>
              
              <div className="p-3 bg-white rounded-md border">
                <div className="text-sm text-gray-500">Rendement net</div>
                <div className="text-2xl font-bold text-khaki-700">{results.netYield.toFixed(2)}%</div>
              </div>
              
              <div className="p-3 bg-white rounded-md border">
                <div className="text-sm text-gray-500">Cash-on-Cash</div>
                <div className="text-2xl font-bold text-khaki-700">{results.cashOnCash.toFixed(2)}%</div>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 mt-4">
              <p>Le calcul est basé sur un investissement total de {(purchasePrice + notaryFees + renovationCosts).toLocaleString('fr-FR')} €.</p>
              <p>Le revenu annuel brut est de {(monthlyRent * 12).toLocaleString('fr-FR')} €.</p>
              <p>Le revenu annuel net après charges est de {((monthlyRent * 12) - (propertyTax + managementFees + maintenanceCosts + insuranceCosts + ((monthlyRent * 12) * vacancyRate / 100))).toLocaleString('fr-FR')} €.</p>
            </div>
            
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

export default YieldCalculator;
