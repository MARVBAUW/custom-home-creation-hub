
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { InvestmentData } from '../types';
import { Calculator } from 'lucide-react';

interface FinancingTabProps {
  investmentData: InvestmentData;
  handleInputChange: (field: keyof InvestmentData, value: any) => void;
  onCalculate: () => void;
  onPrevious: () => void;
}

export const FinancingTab: React.FC<FinancingTabProps> = ({ 
  investmentData, 
  handleInputChange,
  onCalculate,
  onPrevious
}) => {
  // Calcul du montant restant à financer
  const totalInvestment = investmentData.purchasePrice + investmentData.notaryFees + 
    investmentData.renovationCost + investmentData.furnitureCost;
  const remainingAmount = totalInvestment - investmentData.loanAmount;
  const loanPercent = totalInvestment > 0 ? (investmentData.loanAmount / totalInvestment) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="loanAmount">Montant du prêt (€)</Label>
            <Input 
              id="loanAmount" 
              type="number" 
              value={investmentData.loanAmount} 
              onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)} 
              placeholder="Montant emprunté"
            />
            <p className="text-xs text-gray-500 mt-1">
              {loanPercent.toFixed(1)}% de l'investissement total
            </p>
          </div>
          
          <div>
            <Label htmlFor="loanRate">Taux d'intérêt (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="loanRate"
                min={0.5}
                max={10}
                step={0.1}
                value={[investmentData.loanRate]}
                onValueChange={(value) => handleInputChange('loanRate', value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right">{investmentData.loanRate}%</span>
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
              <span className="w-12 text-right">{investmentData.loanDuration}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="loanInsuranceRate">Taux d'assurance emprunteur (%)</Label>
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
              <span className="w-12 text-right">{investmentData.loanInsuranceRate}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Pourcentage du capital emprunté (annuel)</p>
          </div>
          
          <div>
            <Label htmlFor="propertyAppreciation">Appréciation annuelle du bien (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="propertyAppreciation"
                min={-2}
                max={5}
                step={0.5}
                value={[investmentData.propertyAppreciation]}
                onValueChange={(value) => handleInputChange('propertyAppreciation', value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right">{investmentData.propertyAppreciation}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Estimation de l'évolution de la valeur du bien</p>
          </div>
          
          <div className="flex items-center space-x-2 pt-4">
            <Switch
              id="includeAmortization"
              checked={investmentData.includeAmortization}
              onCheckedChange={(checked) => handleInputChange('includeAmortization', checked)}
            />
            <Label htmlFor="includeAmortization">Inclure l'amortissement (LMNP)</Label>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-gray-500">Investissement total</div>
            <div className="text-lg font-semibold">{totalInvestment.toLocaleString('fr-FR')} €</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Montant emprunté</div>
            <div className="text-lg font-semibold">{investmentData.loanAmount.toLocaleString('fr-FR')} €</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Apport personnel</div>
            <div className="text-lg font-semibold">{remainingAmount.toLocaleString('fr-FR')} €</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Pourcentage financé</div>
            <div className="text-lg font-semibold">{loanPercent.toFixed(1)}%</div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Retour aux revenus locatifs
        </Button>
        <Button onClick={onCalculate} className="bg-khaki-600 hover:bg-khaki-700">
          <Calculator className="mr-2 h-4 w-4" />
          Calculer la rentabilité
        </Button>
      </div>
    </div>
  );
};
