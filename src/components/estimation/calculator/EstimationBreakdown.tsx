
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Banknote } from 'lucide-react';
import { EstimationResponseData } from './types';
import { formatCurrency } from '@/utils/formatters';

interface EstimationBreakdownProps {
  estimation: EstimationResponseData;
}

const EstimationBreakdown: React.FC<EstimationBreakdownProps> = ({ estimation }) => {
  // Prepare data for pie chart
  const constructionData = [
    { name: 'Gros œuvre', value: estimation.constructionCosts.structuralWork },
    { name: 'Second œuvre', value: estimation.constructionCosts.finishingWork },
    { name: 'Lots techniques', value: estimation.constructionCosts.technicalLots },
    { name: 'Aménagements ext.', value: estimation.constructionCosts.externalWorks },
  ];
  
  const costDistribution = [
    { name: 'Construction', value: estimation.constructionCosts.total },
    { name: 'Honoraires', value: estimation.fees.total },
    { name: 'Autres coûts', value: estimation.otherCosts.total },
  ];
  
  const COLORS = ['#8F7F4F', '#A89666', '#C1B17F', '#D9CBA0', '#E6DDB9'];
  const SECONDARY_COLORS = ['#6B8E23', '#9CB071', '#BDD2A0'];
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border shadow-sm text-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-khaki-700">{formatCurrency(payload[0].value)}</p>
          <p className="text-gray-500">
            {Math.round((payload[0].value / estimation.totalAmount) * 100)}% du total
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Banknote className="h-5 w-5 mr-2 text-khaki-600" />
          <h3 className="text-lg font-medium">Répartition des coûts</h3>
        </div>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3 text-center">Répartition globale</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {costDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SECONDARY_COLORS[index % SECONDARY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3 text-center">Détail construction</h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={constructionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {constructionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Détail des coûts</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Gros œuvre</span>
                <span className="font-medium">{formatCurrency(estimation.constructionCosts.structuralWork)}</span>
              </div>
              <div className="flex justify-between">
                <span>Second œuvre</span>
                <span className="font-medium">{formatCurrency(estimation.constructionCosts.finishingWork)}</span>
              </div>
              <div className="flex justify-between">
                <span>Lots techniques</span>
                <span className="font-medium">{formatCurrency(estimation.constructionCosts.technicalLots)}</span>
              </div>
              <div className="flex justify-between">
                <span>Aménagements extérieurs</span>
                <span className="font-medium">{formatCurrency(estimation.constructionCosts.externalWorks)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t mt-2">
                <span>Honoraires et études</span>
                <span className="font-medium">{formatCurrency(estimation.fees.total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frais divers</span>
                <span className="font-medium">{formatCurrency(estimation.otherCosts.total)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t mt-2 font-bold">
                <span>TOTAL</span>
                <span>{formatCurrency(estimation.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationBreakdown;
