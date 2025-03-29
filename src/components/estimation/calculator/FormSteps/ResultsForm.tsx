
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChartPie, Download, FileText, Printer } from "lucide-react";
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ResultsFormProps } from '../types/formTypes';
import EstimationReport from '../EstimationReport';
import { parseToNumber } from '../utils/typeConversions';

// Colors for the pie chart
const COLORS = [
  '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe',
  '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd',
  '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa',
  '#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb', '#3b82f6'
];

const ResultsForm: React.FC<ResultsFormProps> = ({
  estimationResult,
  formData,
  categoriesAmounts,
  goToPreviousStep,
  animationDirection
}) => {
  const [activeTab, setActiveTab] = React.useState("summary");
  
  // Format price with euro symbol
  const formatPrice = (price: number | null) => {
    if (price === null) return "€0";
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };
  
  // Calculate total with terrain if applicable
  const landPriceValue = parseToNumber(formData.landPrice, 0);
  const totalWithTerrain = (estimationResult || 0) + landPriceValue;
  
  // Convert to monthly payment (rough estimation)
  const monthlyPayment = estimationResult ? Math.round((estimationResult * 1.2) / 240) : 0; // 20 years loan at 20% interest total
  
  // Handle print of the estimation
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <motion.div
      key="step-results"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <Card className="bg-white rounded-xl shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-progineer-gold/90 to-progineer-gold py-6">
          <CardTitle className="text-white text-center flex flex-col items-center">
            <div className="mb-2">Estimation Détaillée - Progineer</div>
            <div className="text-3xl font-bold mt-2">
              {formatPrice(estimationResult)}
              <span className="text-base font-normal ml-1">TTC</span>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Projet</h3>
              <p className="text-sm text-gray-600">Type: {formData.projectType || '-'}</p>
              <p className="text-sm text-gray-600">Surface: {formData.surface || '-'} m²</p>
              <p className="text-sm text-gray-600">Ville: {formData.city || '-'}</p>
              {formData.landPrice && (
                <p className="text-sm text-gray-600">Prix terrain: {formatPrice(landPriceValue)}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Financement indicatif</h3>
              <p className="text-sm text-gray-600">Mensualité estimée: <span className="font-semibold">{formatPrice(monthlyPayment)}/mois</span></p>
              <p className="text-sm text-gray-600">Sur 20 ans à 3.5% (à titre indicatif)</p>
              {formData.landPrice && (
                <p className="text-sm text-gray-600">Total avec terrain: {formatPrice(totalWithTerrain)}</p>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="summary" className="text-sm">
                Résumé
              </TabsTrigger>
              <TabsTrigger value="details" className="text-sm">
                Détails
              </TabsTrigger>
              <TabsTrigger value="chart" className="text-sm">
                Graphique
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="mt-0">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Cette estimation a été générée automatiquement sur la base des informations que vous avez fournies.
                  Pour une estimation plus précise, nos experts Progineer vous contacteront sous 24h.
                </p>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm py-1 border-b">
                    <span>Coût de construction HT</span>
                    <span className="font-medium">{formatPrice((estimationResult || 0) / 1.2)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1 border-b">
                    <span>TVA (20%)</span>
                    <span className="font-medium">{formatPrice((estimationResult || 0) - (estimationResult || 0) / 1.2)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-1 border-b">
                    <span>Coût de construction TTC</span>
                    <span className="font-semibold">{formatPrice(estimationResult)}</span>
                  </div>
                  
                  {formData.landPrice && (
                    <>
                      <div className="flex justify-between text-sm py-1 border-b">
                        <span>Prix du terrain</span>
                        <span className="font-medium">{formatPrice(landPriceValue)}</span>
                      </div>
                      <div className="flex justify-between text-sm py-1 border-b">
                        <span>Budget total (construction + terrain)</span>
                        <span className="font-semibold">{formatPrice(totalWithTerrain)}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-8 flex justify-center space-x-4">
                  <Button variant="outline" onClick={handlePrint} className="flex items-center">
                    <Printer className="mr-2 h-4 w-4" />
                    Imprimer
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger PDF
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  {categoriesAmounts.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-1 border-b">
                      <span>{item.category}</span>
                      <span className="font-medium">{formatPrice(item.amount)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Coût total TTC</span>
                    <span>{formatPrice(estimationResult)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-xs text-gray-500">
                    * Cette estimation détaillée est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts Progineer.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chart" className="mt-0">
              <div className="flex flex-col items-center">
                <div className="w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoriesAmounts}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="category"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoriesAmounts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatPrice(Number(value))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex justify-center items-center text-sm text-gray-600 mt-4">
                  <ChartPie className="mr-2 h-4 w-4" />
                  <span>Répartition budgétaire par poste de dépense</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
            <p>Un expert Progineer vous contactera dans les 24h pour affiner cette estimation et répondre à vos questions.</p>
          </div>
          
          <div className="mt-6">
            {activeTab === "details" && (
              <div className="print-only">
                <EstimationReport
                  estimation={{
                    totalHT: (estimationResult || 0) / 1.2,
                    totalTTC: estimationResult || 0,
                    vat: ((estimationResult || 0) - (estimationResult || 0) / 1.2),
                    honorairesHT: ((estimationResult || 0) / 1.2) * 0.1,
                    honorairesTTC: ((estimationResult || 0) / 1.2) * 0.1 * 1.2,
                    taxeAmenagement: ((estimationResult || 0) / 1.2) * 0.03,
                    garantieDecennale: ((estimationResult || 0) / 1.2) * 0.01,
                    etudesGeotechniques: 3000,
                    etudeThermique: 2000,
                    coutGlobalHT: ((estimationResult || 0) / 1.2) * 1.15,
                    coutGlobalTTC: ((estimationResult || 0) / 1.2) * 1.15 * 1.2,
                    corpsEtat: categoriesAmounts.reduce((acc, cat) => ({
                      ...acc,
                      [cat.category]: {
                        montantHT: cat.amount / 1.2,
                        details: []
                      }
                    }), {})
                  }}
                  formData={formData}
                  includeTerrainPrice={!!formData.landPrice}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousStep}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux informations
        </Button>
        
        <Button 
          className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
          onClick={handlePrint}
        >
          <FileText className="w-4 h-4" />
          Récapitulatif PDF
        </Button>
      </div>
    </motion.div>
  );
};

export default ResultsForm;
