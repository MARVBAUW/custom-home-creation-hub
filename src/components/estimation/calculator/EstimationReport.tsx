
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormData } from './types/formTypes';
import { EstimationResponseData } from './types/estimationTypes';
import { ensureNumber, ensureString, ensureReactNode } from './utils/typeConversions';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowLeftCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EstimationReportProps {
  estimation: {
    totalHT: number;
    totalTTC: number;
    vat: number;
    coutGlobalHT: number;
    coutGlobalTTC: number;
    honorairesHT: number;
    taxeAmenagement: number;
    garantieDecennale: number;
    etudesGeotechniques: number;
    etudeThermique: number;
    corpsEtat: {
      [key: string]: {
        montantHT: number;
        details: string[];
      }
    }
  };
  formData: FormData;
  onBack?: () => void;
}

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9146FF', 
  '#1D4ED8', '#065F46', '#F59E0B', '#BE185D', '#6D28D9',
  '#10B981', '#8B5CF6', '#F43F5E', '#3B82F6', '#EC4899'
];

const EstimationReport: React.FC<EstimationReportProps> = ({ estimation, formData, onBack }) => {
  // Format numbers for display
  const formatCurrency = (num: number): string => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(num);
  };
  
  const formatDate = (date: Date | string): string => {
    if (!date) return 'Non définie';
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString('fr-FR');
  };

  // Prepare data for pie chart
  const pieData = Object.entries(estimation.corpsEtat).map(([name, data]) => ({
    name,
    value: data.montantHT
  }));
  
  // Handle print functionality
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {onBack && (
            <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
              <ArrowLeftCircle className="h-4 w-4" />
              Retour
            </Button>
          )}
          <h2 className="text-xl font-bold">Estimation Détaillée du Projet</h2>
        </div>
        <Button variant="outline" onClick={handlePrint} className="print:hidden">
          <Download className="mr-2 h-4 w-4" />
          Télécharger PDF
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Résumé du Projet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Type de projet</p>
                <p className="font-medium">{ensureString(formData.projectType) || "Construction"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Surface</p>
                <p className="font-medium">{ensureNumber(formData.surface)} m²</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Localisation</p>
                <p className="font-medium">{ensureString(formData.city) || "Non précisée"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Budget estimé</p>
                <p className="font-medium">{formatCurrency(estimation.totalTTC)}</p>
              </div>
              {formData.startDate && (
                <div>
                  <p className="text-sm text-gray-500">Date souhaitée de début</p>
                  <p className="font-medium">{ensureString(formData.startDate)}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Coûts Estimés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Coût des travaux HT</span>
                <span className="font-medium">{formatCurrency(estimation.totalHT)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">TVA (20%)</span>
                <span className="font-medium">{formatCurrency(estimation.vat)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Coût des travaux TTC</span>
                <span className="font-medium">{formatCurrency(estimation.totalTTC)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Coût global de l'opération</span>
                <span className="font-semibold text-primary">{formatCurrency(estimation.coutGlobalTTC)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Coûts par Corps d'État</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4 overflow-y-auto max-h-[300px]">
              {Object.entries(estimation.corpsEtat).map(([name, data], index) => (
                <div key={index} className="p-3 border rounded-md">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{name}</span>
                    <span className="font-medium">{formatCurrency(data.montantHT)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {data.details.map((detail, i) => (
                      <div key={i}>{ensureString(detail)}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Frais Annexes et Honoraires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Honoraires Maîtrise d'œuvre</span>
                <span className="font-medium">{formatCurrency(estimation.honorairesHT)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Taxe d'aménagement</span>
                <span className="font-medium">{formatCurrency(estimation.taxeAmenagement)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Garantie décennale</span>
                <span className="font-medium">{formatCurrency(estimation.garantieDecennale)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Études géotechniques</span>
                <span className="font-medium">{formatCurrency(estimation.etudesGeotechniques)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Étude thermique</span>
                <span className="font-medium">{formatCurrency(estimation.etudeThermique)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-xs text-gray-500 text-center">
        Cette estimation est fournie à titre indicatif. Une étude détaillée est nécessaire pour un chiffrage précis.
        <br />
        Date d'établissement: {formatDate(new Date())}
      </div>
    </div>
  );
};

export default EstimationReport;
