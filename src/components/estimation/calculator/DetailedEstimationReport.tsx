
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from '@/lib/utils';
import { FormData } from './types';

interface DetailedEstimationReportProps {
  formData: FormData;
  estimation: any;
  includeTerrainPrice?: boolean;
  options?: {
    includeDetails?: boolean;
    includeLogo?: boolean;
    includeContactInfo?: boolean;
    includeBreakdown?: boolean;
    includeTerrainPrice?: boolean;
    includeTimeline?: boolean;
    includeDetailedBreakdown?: boolean;
    clientInfo?: boolean;
    companyLogo?: boolean;
    fileName?: string;
  };
}

const DetailedEstimationReport: React.FC<DetailedEstimationReportProps> = ({ 
  formData, 
  estimation, 
  includeTerrainPrice = false,
  options = {} 
}) => {
  const surfaceArea = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface || '0') 
    : formData.surface || 0;
  
  const totalAmount = estimation?.totalHT || 0;
  const pricePerSqm = surfaceArea > 0 ? totalAmount / surfaceArea : 0;
  
  return (
    <Card className="print:shadow-none print:border-none">
      <CardHeader className="py-4">
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Estimation détaillée</span>
          <span className="text-blue-600 font-bold">{formatCurrency(totalAmount)}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Type de projet:</span>
            <span className="font-medium">{formData.projectType}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Surface:</span>
            <span className="font-medium">{formData.surface} m²</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Localisation:</span>
            <span className="font-medium">{formData.city}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Prix au m²:</span>
            <span className="font-medium">{formatCurrency(pricePerSqm)}/m²</span>
          </div>
        </div>
        
        <Separator />
        
        {/* Coûts de construction */}
        <div className="space-y-4">
          <h3 className="font-medium">Coûts de construction</h3>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Corps d'état</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(estimation.corpsEtat || {}).map(([key, value]: [string, any]) => (
                <TableRow key={key}>
                  <TableCell>{key}</TableCell>
                  <TableCell className="text-right">{formatCurrency(value.montantHT)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Separator />
        
        {/* Frais annexes */}
        <div className="space-y-4">
          <h3 className="font-medium">Frais annexes</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Honoraires de maîtrise d'œuvre:</span>
              <span className="font-medium">{formatCurrency(estimation.honorairesHT || 0)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Taxe d'aménagement:</span>
              <span className="font-medium">{formatCurrency(estimation.taxeAmenagement || 0)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Garantie décennale:</span>
              <span className="font-medium">{formatCurrency(estimation.garantieDecennale || 0)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Études géotechniques:</span>
              <span className="font-medium">{formatCurrency(estimation.etudesGeotechniques || 0)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Étude thermique:</span>
              <span className="font-medium">{formatCurrency(estimation.etudeThermique || 0)}</span>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Récapitulatif final */}
        <div className="space-y-4">
          <h3 className="font-medium">Récapitulatif financier</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Total HT:</span>
              <span className="font-medium">{formatCurrency(estimation.totalHT || 0)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">TVA (20%):</span>
              <span className="font-medium">{formatCurrency(estimation.vat || 0)}</span>
            </div>
            
            <div className="flex justify-between font-bold">
              <span>Total TTC:</span>
              <span>{formatCurrency(estimation.totalTTC || 0)}</span>
            </div>
            
            {includeTerrainPrice && formData.landPrice && (
              <>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix du terrain:</span>
                  <span className="font-medium">{formatCurrency(formData.landPrice)}</span>
                </div>
                
                <div className="flex justify-between font-bold">
                  <span>Coût global (terrain + construction):</span>
                  <span>{formatCurrency(estimation.coutGlobalTTC || 0)}</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-6">
          <p>Note: Cette estimation est fournie à titre indicatif sur la base des informations transmises. Des variations peuvent survenir en fonction des spécificités précises du projet et des conditions locales.</p>
          <p className="mt-1">Estimation générée le {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailedEstimationReport;
