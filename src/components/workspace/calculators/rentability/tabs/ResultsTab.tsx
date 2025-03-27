
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  TrendingUp,
  Banknote,
  Download,
  Save,
  RotateCcw
} from 'lucide-react';
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
  AreaChart,
  Area
} from 'recharts';
import { InvestmentData, InvestmentResults, COLORS } from '../types';

interface ResultsTabProps {
  hasCalculated: boolean;
  results: InvestmentResults;
  investmentData: InvestmentData;
  expensesData: any[];
  cashFlowData: any[];
  performanceData: any[];
  generatePDF: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  setActiveTab: (tab: string) => void;
}

const ResultsTab: React.FC<ResultsTabProps> = ({
  hasCalculated,
  results,
  investmentData,
  expensesData,
  cashFlowData,
  performanceData,
  generatePDF,
  saveToLocalStorage,
  loadFromLocalStorage,
  setActiveTab
}) => {
  if (!hasCalculated) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">Aucun calcul effectué</h3>
        <p className="text-muted-foreground max-w-md mb-8">
          Veuillez renseigner les informations concernant votre investissement et cliquer sur "Calculer la rentabilité" dans l'onglet Financement.
        </p>
        <Button onClick={() => setActiveTab('financing')}>
          Aller au financement
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Carte Rendement brut */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-green-500" />
              Rendement brut
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{results.grossYield.toFixed(2)}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Rapport entre les loyers annuels et le prix d'achat total
            </p>
            {results.grossYield < 4 ? (
              <Badge variant="outline" className="mt-2 bg-red-50 text-red-700">Faible</Badge>
            ) : results.grossYield < 7 ? (
              <Badge variant="outline" className="mt-2 bg-amber-50 text-amber-700">Moyen</Badge>
            ) : (
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Bon</Badge>
            )}
          </CardContent>
        </Card>
        
        {/* Carte Rendement net */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <TrendingUp className="mr-2 h-4 w-4 text-blue-500" />
              Rendement net
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{results.netYield.toFixed(2)}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Revenus locatifs nets de charges / prix d'achat total
            </p>
            {results.netYield < 2 ? (
              <Badge variant="outline" className="mt-2 bg-red-50 text-red-700">Faible</Badge>
            ) : results.netYield < 4 ? (
              <Badge variant="outline" className="mt-2 bg-amber-50 text-amber-700">Moyen</Badge>
            ) : (
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Bon</Badge>
            )}
          </CardContent>
        </Card>
        
        {/* Carte Cash on Cash */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Banknote className="mr-2 h-4 w-4 text-khaki-600" />
              Cash on Cash
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{results.cashOnCash.toFixed(2)}%</div>
            <p className="text-sm text-muted-foreground mt-1">
              Rapport entre le cash-flow annuel et l'apport personnel
            </p>
            {results.cashOnCash < 0 ? (
              <Badge variant="outline" className="mt-2 bg-red-50 text-red-700">Négatif</Badge>
            ) : results.cashOnCash < 5 ? (
              <Badge variant="outline" className="mt-2 bg-amber-50 text-amber-700">Faible</Badge>
            ) : (
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700">Bon</Badge>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Graphique de répartition des charges */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Répartition des charges annuelles</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {expensesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <ReTooltip formatter={(value: any) => [`${value.toFixed(2)} €`, 'Montant annuel']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Graphique de cash-flow */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analyse du cash-flow mensuel</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={cashFlowData}
                margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis />
                <ReTooltip formatter={(value: any) => [`${value.toFixed(2)} €`, 'Montant']} />
                <Bar dataKey="value" fill="#A28554">
                  {cashFlowData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === cashFlowData.length - 1 
                        ? (entry.value >= 0 ? '#10B981' : '#EF4444') 
                        : '#A28554'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Évolution du patrimoine sur 10 ans</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ReTooltip formatter={(value: any) => [`${value.toLocaleString('fr-FR')} €`, '']} />
                <Area 
                  type="monotone" 
                  dataKey="propertyValue" 
                  stackId="1"
                  stroke="#8884d8" 
                  fill="#8884d8"
                  name="Valeur du bien" 
                />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeCashFlow" 
                  stackId="2"
                  stroke="#82ca9d" 
                  fill="#82ca9d"
                  name="Cash-flow cumulé" 
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button onClick={generatePDF} className="flex-1">
          <Download className="mr-2 h-4 w-4" />
          Exporter en PDF
        </Button>
        <Button onClick={saveToLocalStorage} variant="outline" className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
        <Button onClick={loadFromLocalStorage} variant="outline" className="flex-1">
          <RotateCcw className="mr-2 h-4 w-4" />
          Charger
        </Button>
      </div>
    </div>
  );
};

export default ResultsTab;
