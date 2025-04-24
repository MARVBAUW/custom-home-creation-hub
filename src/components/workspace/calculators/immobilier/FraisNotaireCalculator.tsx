
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Save, Download } from 'lucide-react';
import { useSimulationExport } from '@/hooks/useSimulationExport';
import PDFExporter from '@/components/common/PDFExporter';
import { formatCurrency } from '@/utils/pdfUtils';

const FraisNotaireCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(250000);
  const [propertyType, setPropertyType] = useState<'ancien' | 'neuf'>('ancien');
  const [showPdfOptions, setShowPdfOptions] = useState(false);
  const [projectName, setProjectName] = useState('Mon achat immobilier');

  // Calculate notary fees based on property value and type
  const calculateFees = () => {
    // France notary fees calculation (simplified version)
    let departmentTaxRate = 0.0;
    let communeTaxRate = 0.0;
    let stateTaxRate = 0.0;
    let notaryFeeRate = 0.0;
    
    if (propertyType === 'ancien') {
      departmentTaxRate = 4.5;  // 4.5% for most departments
      communeTaxRate = 1.2;     // 1.2% typically
      notaryFeeRate = 0.814;    // Notary fees for existing property
      stateTaxRate = 0.09;      // State tax (contribution de sécurité immobilière)
    } else {
      // For new properties
      departmentTaxRate = 0.7;  // Lower tax for new properties in most cases
      communeTaxRate = 0.0;     // Usually exempt
      notaryFeeRate = 0.814;    // Notary fees
      stateTaxRate = 0.09;      // State tax
    }
    
    const departmentTax = (propertyValue * departmentTaxRate) / 100;
    const communeTax = (propertyValue * communeTaxRate) / 100;
    const stateTax = (propertyValue * stateTaxRate) / 100;
    const notaryFee = (propertyValue * notaryFeeRate) / 100;
    const vatOnFees = notaryFee * 0.2; // 20% VAT on notary fees
    
    // Additional fixed costs
    const fixedCosts = 800; // Formalities, copies, etc.
    
    const totalTaxes = departmentTax + communeTax + stateTax;
    const totalFees = notaryFee + vatOnFees + fixedCosts;
    const totalCosts = totalTaxes + totalFees;
    
    return {
      propertyValue,
      departmentTax,
      communeTax,
      stateTax,
      notaryFee,
      vatOnFees,
      fixedCosts,
      totalTaxes,
      totalFees,
      totalCosts
    };
  };

  const results = calculateFees();
  
  const { saveSimulation, generatePDF, saving } = useSimulationExport({
    type: 'frais-notaire',
    title: projectName || 'Calcul des frais de notaire',
    data: {
      projectName,
      propertyValue,
      propertyType
    },
    results
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">Frais de notaire</CardTitle>
        <CardDescription>
          Calculez les frais de notaire pour votre achat immobilier
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="projectName">Nom du projet</Label>
          <Input 
            id="projectName" 
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="propertyValue">Prix du bien (€)</Label>
          <Input
            id="propertyValue"
            type="number"
            min="0"
            step="1000"
            value={propertyValue}
            onChange={(e) => setPropertyValue(Number(e.target.value))}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Type de bien</Label>
          <RadioGroup
            value={propertyType}
            onValueChange={(value: 'ancien' | 'neuf') => setPropertyType(value)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ancien" id="ancien" />
              <Label htmlFor="ancien">Ancien</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="neuf" id="neuf" />
              <Label htmlFor="neuf">Neuf</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="rounded-md bg-slate-50 p-4">
          <h3 className="text-lg font-medium mb-3">Résultats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Prix du bien:</span>
              <span>{formatCurrency(results.propertyValue)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes départementales:</span>
              <span>{formatCurrency(results.departmentTax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes communales:</span>
              <span>{formatCurrency(results.communeTax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Contribution de sécurité immobilière:</span>
              <span>{formatCurrency(results.stateTax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Émoluments du notaire:</span>
              <span>{formatCurrency(results.notaryFee)}</span>
            </div>
            <div className="flex justify-between">
              <span>TVA sur émoluments:</span>
              <span>{formatCurrency(results.vatOnFees)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frais divers:</span>
              <span>{formatCurrency(results.fixedCosts)}</span>
            </div>
            <div className="h-px bg-gray-300 my-2"></div>
            <div className="flex justify-between font-semibold">
              <span>Total des frais de notaire:</span>
              <span>{formatCurrency(results.totalCosts)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Pourcentage du prix d'achat:</span>
              <span>{((results.totalCosts / results.propertyValue) * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setShowPdfOptions(!showPdfOptions)}
        >
          {showPdfOptions ? 'Masquer options PDF' : 'Exporter en PDF'}
        </Button>
        <Button 
          onClick={saveSimulation}
          disabled={saving}
        >
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      </CardFooter>
      
      {showPdfOptions && (
        <div className="px-6 pb-6">
          <PDFExporter 
            data={{
              projectName,
              propertyValue,
              propertyType: propertyType === 'ancien' ? 'Bien ancien' : 'Bien neuf'
            }}
            title={projectName || 'Calcul des frais de notaire'}
            generatePDF={generatePDF}
            onSaveSimulation={saveSimulation}
            defaultFileName={`frais-notaire-${propertyName.toLowerCase().replace(/\s+/g, '-')}`}
          />
        </div>
      )}
    </Card>
  );
};

export default FraisNotaireCalculator;
