
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from '@/lib/utils';
import { FormData } from '../types';

interface EstimationBreakdownProps {
  categories: Array<{ category: string; amount: number }>;
  formData: FormData;
}

const EstimationBreakdown: React.FC<EstimationBreakdownProps> = ({ categories, formData }) => {
  // Group categories by main category
  const constructionCategories = categories.filter(c => 
    ['Terrassement', 'Fondations', 'Élévation des murs', 'Charpente', 'Couverture', 'Menuiseries extérieures'].includes(c.category));
  
  const finishingCategories = categories.filter(c => 
    ['Isolation', 'Plomberie', 'Électricité', 'Chauffage', 'Revêtements de sol', 'Revêtements muraux', 'Peinture'].includes(c.category));
  
  const otherCategories = categories.filter(c => 
    ['Aménagements extérieurs', 'Frais annexes', 'Honoraires architecte', 'Taxe aménagement', 'Études géotechniques', 'Étude thermique', 'Garantie décennale'].includes(c.category));

  // Calculate totals
  const constructionTotal = constructionCategories.reduce((sum, item) => sum + item.amount, 0);
  const finishingTotal = finishingCategories.reduce((sum, item) => sum + item.amount, 0);
  const otherTotal = otherCategories.reduce((sum, item) => sum + item.amount, 0);
  const grandTotal = constructionTotal + finishingTotal + otherTotal;

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-3">Coûts de construction</h3>
          <div className="space-y-2">
            {constructionCategories.map(item => (
              <div key={item.category} className="flex justify-between border-b pb-1">
                <span>{item.category}</span>
                <span className="font-medium">{formatCurrency(item.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-1 font-semibold">
              <span>Total construction</span>
              <span>{formatCurrency(constructionTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-3">Second œuvre</h3>
          <div className="space-y-2">
            {finishingCategories.map(item => (
              <div key={item.category} className="flex justify-between border-b pb-1">
                <span>{item.category}</span>
                <span className="font-medium">{formatCurrency(item.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-1 font-semibold">
              <span>Total second œuvre</span>
              <span>{formatCurrency(finishingTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-3">Autres coûts</h3>
          <div className="space-y-2">
            {otherCategories.map(item => (
              <div key={item.category} className="flex justify-between border-b pb-1">
                <span>{item.category}</span>
                <span className="font-medium">{formatCurrency(item.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-1 font-semibold">
              <span>Total autres coûts</span>
              <span>{formatCurrency(otherTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total TTC</span>
            <span className="text-xl font-bold text-blue-800">{formatCurrency(grandTotal)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimationBreakdown;
