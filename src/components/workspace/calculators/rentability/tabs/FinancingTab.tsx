
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { InvestmentData, InvestmentResults } from '../types';

interface FinancingTabProps {
  investmentData: InvestmentData;
  results: InvestmentResults;
  handleInputChange: (field: keyof InvestmentData, value: any) => void;
  calculateInvestment: () => void;
  hasCalculated: boolean;
  setActiveTab: (tab: string) => void;
}

const FinancingTab: React.FC<FinancingTabProps> = ({ 
  investmentData, 
  results, 
  handleInputChange, 
  calculateInvestment, 
  hasCalculated, 
  setActiveTab 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="loanAmount">Montant du prêt (€)</Label>
            <Input 
              id="loanAmount" 
              type="number" 
              value={investmentData.loanAmount} 
              onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)} 
              placeholder="Montant à emprunter"
            />
          </div>
          
          <div>
            <Label htmlFor="loanRate">Taux d'intérêt (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="loanRate"
                min={0}
                max={10}
                step={0.05}
                value={[investmentData.loanRate]}
                onValueChange={(value) => handleInputChange('loanRate', value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right">{investmentData.loanRate.toFixed(2)}%</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="loanDuration">Durée du prêt (années)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="loanDuration"
                min={5}
                max={30}
                step={1}
                value={[investmentData.loanDuration]}
                onValueChange={(value) => handleInputChange('loanDuration', value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right">{investmentData.loanDuration} ans</span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="loanInsuranceRate">Taux assurance prêt (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="loanInsuranceRate"
                min={0}
                max={1}
                step={0.01}
                value={[investmentData.loanInsuranceRate]}
                onValueChange={(value) => handleInputChange('loanInsuranceRate', value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right">{investmentData.loanInsuranceRate.toFixed(2)}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Taux annuel en % du capital emprunté</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="rounded-xl bg-khaki-50 p-6 space-y-4">
            <h3 className="font-semibold text-lg">Synthèse du financement</h3>
            <div className="grid grid-cols-2 gap-y-3">
              <div>Prix d'achat total:</div>
              <div className="text-right font-medium">{(investmentData.purchasePrice + investmentData.notaryFees).toLocaleString('fr-FR')} €</div>
              
              <div>Frais annexes:</div>
              <div className="text-right font-medium">{(investmentData.renovationCost + investmentData.furnitureCost).toLocaleString('fr-FR')} €</div>
              
              <div>Montant emprunté:</div>
              <div className="text-right font-medium">{investmentData.loanAmount.toLocaleString('fr-FR')} €</div>
              
              <div>Apport personnel:</div>
              <div className="text-right font-medium">
                {(investmentData.purchasePrice + investmentData.notaryFees + 
                   investmentData.renovationCost + investmentData.furnitureCost - 
                   investmentData.loanAmount).toLocaleString('fr-FR')} €
              </div>
              
              <div>Taux d'endettement:</div>
              <div className="text-right font-medium">
                {investmentData.loanAmount > 0 ?
                  (investmentData.loanAmount / (investmentData.purchasePrice + investmentData.notaryFees) * 100).toFixed(1) + '%'
                : '0%'}
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <Button onClick={calculateInvestment} className="w-full">
                <Calculator className="mr-2 h-4 w-4" />
                Calculer la rentabilité
              </Button>
              
              {hasCalculated && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-y-2">
                    <div>Mensualité:</div>
                    <div className="text-right font-semibold">{results.monthlyPayment.toFixed(2)} €</div>
                    
                    <div>Cash-flow mensuel:</div>
                    <div className={`text-right font-semibold ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {results.monthlyCashFlow.toFixed(2)} €
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button onClick={() => setActiveTab('results')} disabled={!hasCalculated}>
              Voir les résultats détaillés
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancingTab;
