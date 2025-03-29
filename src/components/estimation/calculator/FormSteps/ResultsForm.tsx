
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'; // Import for Chart.js registration
import { ResultsFormProps } from '../types/formTypes';

const ResultsForm: React.FC<ResultsFormProps> = ({
  estimationResult,
  formData,
  categoriesAmounts,
  goToPreviousStep,
  animationDirection
}) => {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };

  // Data for the chart
  const chartData = {
    labels: categoriesAmounts.map(item => item.category),
    datasets: [
      {
        data: categoriesAmounts.map(item => item.amount),
        backgroundColor: [
          '#4F6F52', '#739072', '#86A789', '#D2E3C8',
          '#A2CDB0', '#8BAAAD', '#7D7C84', '#6C809A',
          '#4A5859', '#2A3B47', '#1E1E24', '#3C4CAD',
          '#6066D0', '#9F70D0', '#B070D0', '#D07FB6',
          '#D07F7F', '#D0B37F', '#B8D07F', '#7FD0A1',
        ],
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
  };

  // If no estimation result, show loading or error
  if (!estimationResult) {
    return (
      <Card className="shadow-md">
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">Calcul en cours...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">Estimation de votre projet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Prix total estimation */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-700">Coût total estimé</h3>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {formatCurrency(estimationResult)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Prix TTC incluant main d'œuvre et matériaux
            </p>
          </div>

          <Separator />

          {/* Récapitulatif du projet */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Récapitulatif du projet</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Type de projet</p>
                <p className="font-medium">{formData.projectType || 'Non spécifié'}</p>
              </div>
              <div>
                <p className="text-gray-500">Surface</p>
                <p className="font-medium">{formData.surface ? `${formData.surface} m²` : 'Non spécifié'}</p>
              </div>
              <div>
                <p className="text-gray-500">Ville</p>
                <p className="font-medium">{formData.city || 'Non spécifié'}</p>
              </div>
              <div>
                <p className="text-gray-500">Type de terrain</p>
                <p className="font-medium">{formData.terrainType || 'Non spécifié'}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Graphique */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 h-64">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
            <div className="w-full md:w-1/2">
              <h4 className="font-semibold text-lg mb-3">Répartition des coûts</h4>
              <div className="max-h-60 overflow-y-auto pr-2">
                {categoriesAmounts.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: chartData.datasets[0].backgroundColor[index % 20] }}
                      ></span>
                      <span className="text-sm truncate">{item.category}</span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(item.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Prochaines étapes */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Prochaines étapes</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Téléchargez votre devis détaillé</li>
              <li>Prenez rendez-vous avec un expert Progineer</li>
              <li>Affinez votre estimation avec un architecte</li>
              <li>Recevez des recommandations personnalisées</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={goToPreviousStep} className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Modifier les informations
          </Button>
          <Button type="button" className="bg-green-600 hover:bg-green-700 text-white">
            Télécharger l'estimation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsForm;
