
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvestmentData } from '../types';

interface PurchaseTabProps {
  investmentData: InvestmentData;
  handleInputChange: (field: keyof InvestmentData, value: any) => void;
  pricePerSqm: number;
  onNext: () => void;
}

export const PurchaseTab: React.FC<PurchaseTabProps> = ({ 
  investmentData, 
  handleInputChange, 
  pricePerSqm,
  onNext
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="projectName">Nom du projet</Label>
          <Input 
            id="projectName" 
            value={investmentData.projectName} 
            onChange={(e) => handleInputChange('projectName', e.target.value)} 
            placeholder="Mon investissement locatif"
          />
        </div>
        
        <div>
          <Label htmlFor="location">Localisation</Label>
          <Input 
            id="location" 
            value={investmentData.location} 
            onChange={(e) => handleInputChange('location', e.target.value)} 
            placeholder="Ville ou quartier"
          />
        </div>
        
        <div>
          <Label htmlFor="propertyType">Type de bien</Label>
          <Select 
            value={investmentData.propertyType} 
            onValueChange={(value) => handleInputChange('propertyType', value)}
          >
            <SelectTrigger id="propertyType">
              <SelectValue placeholder="Sélectionnez un type de bien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Appartement</SelectItem>
              <SelectItem value="house">Maison</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="commercial">Local commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="area">Surface (m²)</Label>
          <Input 
            id="area" 
            type="number" 
            value={investmentData.area} 
            onChange={(e) => handleInputChange('area', parseFloat(e.target.value) || 0)} 
            placeholder="Surface en m²"
          />
        </div>
        
        <div>
          <Label htmlFor="propertyAge">Âge du bien (années)</Label>
          <Input 
            id="propertyAge" 
            type="number" 
            value={investmentData.propertyAge} 
            onChange={(e) => handleInputChange('propertyAge', parseInt(e.target.value) || 0)} 
            placeholder="Âge du bien"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="purchasePrice">Prix d'achat (€)</Label>
          <Input 
            id="purchasePrice" 
            type="number" 
            value={investmentData.purchasePrice} 
            onChange={(e) => handleInputChange('purchasePrice', parseFloat(e.target.value) || 0)} 
            placeholder="Prix d'achat"
          />
        </div>
        
        <div>
          <Label htmlFor="notaryFees">Frais de notaire (€)</Label>
          <Input 
            id="notaryFees" 
            type="number" 
            value={investmentData.notaryFees} 
            onChange={(e) => handleInputChange('notaryFees', parseFloat(e.target.value) || 0)} 
            placeholder="Frais de notaire"
          />
          <p className="text-xs text-gray-500 mt-1">Estimation: environ 7-8% du prix d'achat</p>
        </div>
        
        <div>
          <Label htmlFor="renovationCost">Budget travaux (€)</Label>
          <Input 
            id="renovationCost" 
            type="number" 
            value={investmentData.renovationCost} 
            onChange={(e) => handleInputChange('renovationCost', parseFloat(e.target.value) || 0)} 
            placeholder="Budget travaux"
          />
        </div>
        
        <div>
          <Label htmlFor="furnitureCost">Budget mobilier (€)</Label>
          <Input 
            id="furnitureCost" 
            type="number" 
            value={investmentData.furnitureCost} 
            onChange={(e) => handleInputChange('furnitureCost', parseFloat(e.target.value) || 0)} 
            placeholder="Budget mobilier (pour location meublée)"
          />
        </div>
        
        <div className="pt-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-medium">Prix au m²</div>
              <div className="text-2xl font-bold">
                {pricePerSqm > 0 ? pricePerSqm.toFixed(0) : "0"} €/m²
              </div>
            </div>
            <div>
              <div className="font-medium">Investissement total</div>
              <div className="text-2xl font-bold">
                {(investmentData.purchasePrice + investmentData.notaryFees + 
                  investmentData.renovationCost + investmentData.furnitureCost).toLocaleString('fr-FR')} €
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:col-span-2 flex justify-end pt-4">
        <Button onClick={onNext}>
          Passer aux revenus locatifs
        </Button>
      </div>
    </div>
  );
};
