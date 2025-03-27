
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calculator, TrendingDown, TrendingUp, Banknote, PieChart as PieChartIcon } from 'lucide-react';
import { InvestmentData, InvestmentResults, COLORS } from '../types';
import { generatePDF } from '../utils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

interface ResultsTabProps {
  investmentData: InvestmentData;
  results: InvestmentResults;
  cashFlowData: any[];
  expensesData: any[];
  performanceData: any[];
  hasCalculated: boolean;
  handleCalculate: () => void;
  onPrevious: () => void;
}

export const ResultsTab: React.FC<ResultsTabProps> = ({ 
  investmentData, 
  results,
  cashFlowData,
  expensesData,
  performanceData,
  hasCalculated,
  handleCalculate,
  onPrevious
}) => {
  if (!hasCalculated) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <PieChartIcon className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-600 mb-2">Pas encore de résultats</h3>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Veuillez compléter les informations dans les onglets précédents et cliquer sur "Calculer la rentabilité".
        </p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={onPrevious}>
            Retour au financement
          </Button>
          <Button onClick={handleCalculate} className="bg-khaki-600 hover:bg-khaki-700">
            <Calculator className="mr-2 h-4 w-4" />
            Calculer maintenant
          </Button>
        </div>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    generatePDF(investmentData, results, expensesData);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Rendement brut</div>
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">{results.grossYield.toFixed(2)}%</div>
            <Badge variant={results.grossYield > 5 ? "success" : "warning"} className="ml-auto">
              {results.grossYield > 5 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {results.grossYield > 5 ? "Bon" : "Moyen"}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Rendement net</div>
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">{results.netYield.toFixed(2)}%</div>
            <Badge variant={results.netYield > 4 ? "success" : "warning"} className="ml-auto">
              {results.netYield > 4 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {results.netYield > 4 ? "Bon" : "Moyen"}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Cash flow mensuel</div>
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">{results.monthlyCashFlow.toFixed(0)} €</div>
            <Badge variant={results.monthlyCashFlow > 0 ? "success" : "destructive"} className="ml-auto">
              {results.monthlyCashFlow > 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {results.monthlyCashFlow > 0 ? "Positif" : "Négatif"}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Cash on Cash</div>
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">{results.cashOnCash.toFixed(2)}%</div>
            <Badge variant={results.cashOnCash > 6 ? "success" : "warning"} className="ml-auto">
              {results.cashOnCash > 6 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {results.cashOnCash > 6 ? "Excellent" : "Correct"}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">TRI sur 10 ans</div>
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">{results.irr10Years.toFixed(2)}%</div>
            <Badge variant={results.irr10Years > 7 ? "success" : "warning"} className="ml-auto">
              {results.irr10Years > 7 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {results.irr10Years > 7 ? "Excellent" : "Correct"}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <div className="text-sm text-gray-500 mb-1">Durée d'amortissement</div>
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">
              {results.amortizationPeriod > 0 ? results.amortizationPeriod.toFixed(1) : "∞"} ans
            </div>
            <Badge variant={results.amortizationPeriod > 0 && results.amortizationPeriod < 15 ? "success" : "warning"} className="ml-auto">
              {results.amortizationPeriod > 0 && results.amortizationPeriod < 15 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {results.amortizationPeriod > 0 && results.amortizationPeriod < 15 ? "Rapide" : "Long terme"}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Répartition des dépenses</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <ReTooltip formatter={(value) => `${value.toFixed(0)} €`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 border border-gray-200 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Analyse du cash flow mensuel</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cashFlowData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ReTooltip formatter={(value) => `${value.toFixed(0)} €`} />
                <Bar dataKey="value" fill="#A28554" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Évolution sur 10 ans</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={performanceData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <ReTooltip formatter={(value) => `${value.toLocaleString('fr-FR')} €`} />
              <Area type="monotone" dataKey="propertyValue" stackId="1" stroke="#8884d8" fill="#8884d8" name="Valeur du bien" />
              <Area type="monotone" dataKey="cumulativeCashFlow" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Cash flow cumulé" />
              <Area type="monotone" dataKey="netWorth" stackId="3" stroke="#ffc658" fill="#ffc658" name="Patrimoine net" />
              <Legend />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between gap-4 pt-4">
        <Button variant="outline" onClick={onPrevious}>
          Retour au financement
        </Button>
        
        <div className="flex gap-2">
          <Button onClick={handleCalculate} variant="outline" className="border-khaki-600 text-khaki-700">
            <Calculator className="mr-2 h-4 w-4" />
            Recalculer
          </Button>
          
          <Button onClick={handleDownloadPDF} className="bg-khaki-600 hover:bg-khaki-700">
            <Download className="mr-2 h-4 w-4" />
            Télécharger en PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
