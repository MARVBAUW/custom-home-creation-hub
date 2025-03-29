
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Calculator, Download, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateDetailedEstimation } from '../calculations/detailedEstimation';
import { ResultsFormProps } from '../types/formTypes';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Chart from 'chart.js/auto';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EstimationReport from '../EstimationReport';

const ResultsForm: React.FC<ResultsFormProps> = ({
  estimationResult,
  formData,
  categoriesAmounts,
  goToPreviousStep,
  animationDirection
}) => {
  const [chartInstance, setChartInstance] = React.useState<Chart | null>(null);
  const chartRef = React.useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    if (chartRef.current && categoriesAmounts.length > 0) {
      // Destroy any existing chart
      if (chartInstance) {
        chartInstance.destroy();
      }
      
      // Create a new chart
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        const newChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: categoriesAmounts.map(item => item.category),
            datasets: [
              {
                data: categoriesAmounts.map(item => item.amount),
                backgroundColor: [
                  '#D1AC00', '#B69200', '#9C8700', '#826C00', '#685200',
                  '#4E3800', '#341E00', '#735F1F', '#978032', '#BB9F44'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#333'
                }
              }
            }
          }
        });
        setChartInstance(newChart);
      }
    }
    
    return () => {
      // Cleanup on component unmount
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [categoriesAmounts]);
  
  const handlePrintEstimation = () => {
    window.print();
  };
  
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Estimation de projet de construction', 20, 20);
    
    // Add project type
    doc.setFontSize(16);
    doc.text(`Type de projet: ${formData.projectType || 'Non spécifié'}`, 20, 35);
    
    // Add project details
    doc.setFontSize(12);
    doc.text(`Surface: ${formData.surface || 'Non spécifiée'} m²`, 20, 45);
    doc.text(`Ville: ${formData.city || 'Non spécifiée'}`, 20, 52);
    
    // Add estimation result
    doc.setFontSize(16);
    doc.text(`Estimation totale: ${estimationResult?.toLocaleString() || '0'} €`, 20, 65);
    
    // Add categories table
    const tableData = categoriesAmounts.map(item => [
      item.category,
      `${Math.round(item.amount).toLocaleString()} €`
    ]);
    
    // @ts-ignore
    doc.autoTable({
      head: [['Catégorie', 'Montant (€)']],
      body: tableData,
      startY: 75,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: { fillColor: [209, 172, 0] }
    });
    
    // Save document
    doc.save('estimation-projet-construction.pdf');
  };
  
  // Calculating detailed estimation
  const detailedEstimation = calculateDetailedEstimation(formData);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: animationDirection === 'forward' ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: animationDirection === 'forward' ? -20 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-6 results-container">
        <div className="text-center mb-6">
          <Calculator className="h-12 w-12 mx-auto text-progineer-gold" />
          <h2 className="text-2xl font-bold mt-3">Résultats de votre estimation</h2>
          <p className="text-muted-foreground">
            Voici le détail de l'estimation pour votre projet
          </p>
        </div>
        
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="summary">Résumé</TabsTrigger>
            <TabsTrigger value="detailed">Détaillé</TabsTrigger>
            <TabsTrigger value="charts">Graphique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="p-4">
            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold text-progineer-gold">
                {estimationResult?.toLocaleString()} €
              </h3>
              <p className="text-sm text-muted-foreground">Estimation TTC</p>
            </div>
            
            <div className="grid gap-4 mb-6">
              {categoriesAmounts.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <span>{item.category}</span>
                  <span className="font-medium">{Math.round(item.amount).toLocaleString()} €</span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="detailed" className="p-4">
            <EstimationReport
              estimation={detailedEstimation}
              formData={formData}
              includeTerrainPrice={!!formData.landPrice}
            />
          </TabsContent>
          
          <TabsContent value="charts" className="p-4 text-center">
            <div className="max-w-md mx-auto">
              <canvas ref={chartRef} height="300"></canvas>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-col sm:flex-row gap-2 justify-between mt-6">
          <Button
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Retour
          </Button>
          
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrintEstimation}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Imprimer
            </Button>
            
            <Button
              type="button"
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-progineer-gold hover:bg-progineer-gold/90"
            >
              <Download className="h-4 w-4" />
              Télécharger PDF
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ResultsForm;
