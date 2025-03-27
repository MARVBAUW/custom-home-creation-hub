
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvestmentData } from '../types';

interface RentalTabProps {
  investmentData: InvestmentData;
  handleInputChange: (field: keyof InvestmentData, value: any) => void;
  setActiveTab: (tab: string) => void;
}

const RentalTab: React.FC<RentalTabProps> = ({ 
  investmentData, 
  handleInputChange, 
  setActiveTab 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="rentalIncome">Loyer mensuel (€)</Label>
            <Input 
              id="rentalIncome" 
              type="number" 
              value={investmentData.rentalIncome} 
              onChange={(e) => handleInputChange('rentalIncome', parseFloat(e.target.value) || 0)} 
              placeholder="Loyer mensuel hors charges"
            />
          </div>
          
          <div>
            <Label htmlFor="rentalCharges">Charges locatives récupérables (€/mois)</Label>
            <Input 
              id="rentalCharges" 
              type="number" 
              value={investmentData.rentalCharges} 
              onChange={(e) => handleInputChange('rentalCharges', parseFloat(e.target.value) || 0)} 
              placeholder="Charges locatives"
            />
          </div>
          
          <div>
            <Label htmlFor="vacancyRate">Taux de vacance locative (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="vacancyRate"
                min={0}
                max={20}
                step={1}
                value={[investmentData.vacancyRate]}
                onValueChange={(value) => handleInputChange('vacancyRate', value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right">{investmentData.vacancyRate}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Estimation du pourcentage de temps où le bien sera vacant</p>
          </div>
          
          <div>
            <Label htmlFor="unpaidRate">Taux d'impayés (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="unpaidRate"
                min={0}
                max={10}
                step={0.5}
                value={[investmentData.unpaidRate]}
                onValueChange={(value) => handleInputChange('unpaidRate', value[0])}
                className="flex-1"
              />
              <span className="w-12 text-right">{investmentData.unpaidRate}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Estimation du risque d'impayés locatifs</p>
          </div>
          
          <div>
            <Label htmlFor="fiscalOption">Option fiscale</Label>
            <Select 
              value={investmentData.fiscalOption} 
              onValueChange={(value: any) => handleInputChange('fiscalOption', value)}
            >
              <SelectTrigger id="fiscalOption">
                <SelectValue placeholder="Choisir un régime fiscal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="real">Régime réel (non meublé)</SelectItem>
                <SelectItem value="micro">Micro-foncier (non meublé)</SelectItem>
                <SelectItem value="lmnp">LMNP réel (meublé)</SelectItem>
                <SelectItem value="furnished">Micro-BIC (meublé)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="propertyTax">Taxe foncière annuelle (€)</Label>
            <Input 
              id="propertyTax" 
              type="number" 
              value={investmentData.propertyTax} 
              onChange={(e) => handleInputChange('propertyTax', parseFloat(e.target.value) || 0)} 
              placeholder="Taxe foncière"
            />
          </div>
          
          <div>
            <Label htmlFor="condoFees">Charges de copropriété annuelles (€)</Label>
            <Input 
              id="condoFees" 
              type="number" 
              value={investmentData.condoFees} 
              onChange={(e) => handleInputChange('condoFees', parseFloat(e.target.value) || 0)} 
              placeholder="Charges annuelles"
            />
          </div>
          
          <div>
            <Label htmlFor="insurance">Assurance PNO annuelle (€)</Label>
            <Input 
              id="insurance" 
              type="number" 
              value={investmentData.insurance} 
              onChange={(e) => handleInputChange('insurance', parseFloat(e.target.value) || 0)} 
              placeholder="Assurance propriétaire non occupant"
            />
          </div>
          
          <div>
            <Label htmlFor="maintenanceProvision">Provision travaux annuelle (€)</Label>
            <Input 
              id="maintenanceProvision" 
              type="number" 
              value={investmentData.maintenanceProvision} 
              onChange={(e) => handleInputChange('maintenanceProvision', parseFloat(e.target.value) || 0)} 
              placeholder="Provision pour travaux futurs"
            />
          </div>
          
          <div>
            <Label htmlFor="managementFees">Frais de gestion locative (€/mois)</Label>
            <Input 
              id="managementFees" 
              type="number" 
              value={investmentData.managementFees} 
              onChange={(e) => handleInputChange('managementFees', parseFloat(e.target.value) || 0)} 
              placeholder="Frais d'agence ou de gestion"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button onClick={() => setActiveTab('financing')}>
          Passer au financement
        </Button>
      </div>
    </div>
  );
};

export default RentalTab;
