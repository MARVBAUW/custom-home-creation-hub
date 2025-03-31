
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  ArrowLeft, 
  DollarSign, 
  Clock, 
  BarChart, 
  List,
  Share2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import EstimationBreakdown from '../components/EstimationBreakdown';
import EstimationTimeline from '../components/EstimationTimeline';
import EstimationOverview from '../components/EstimationOverview';
import EstimationPDFExport from '../EstimationPDFExport';
import { BaseFormProps } from '../types/formTypes';
import { EstimationResponseData } from '../types/estimationFormData';

interface ResultsFormProps extends BaseFormProps {
  estimationResult?: EstimationResponseData | number | null;
  categoriesAmounts?: Array<{ category: string; amount: number }>;
}

const ResultsForm: React.FC<ResultsFormProps> = ({
  formData,
  goToPreviousStep,
  animationDirection,
  updateFormData,
  goToNextStep,
  estimationResult,
  categoriesAmounts = []
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Extract the total amount
  const totalAmount = typeof estimationResult === 'number' 
    ? estimationResult 
    : estimationResult?.totalAmount || 0;
  
  // Extract the surface area
  const surfaceArea = typeof formData.surface === 'string' 
    ? parseFloat(formData.surface || '0') 
    : formData.surface || 0;
  
  // Calculate price per square meter
  const pricePerSqm = surfaceArea > 0 ? totalAmount / surfaceArea : 0;
  
  // Handle sharing the estimation
  const handleShareEstimation = () => {
    // Sharing logic would go here
    alert('Fonctionnalité de partage en cours de développement');
  };
  
  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <Card className="border-none shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl text-center flex justify-center items-center gap-2">
            <Home className="h-6 w-6 text-progineer-gold" />
            Estimation de votre projet
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 mb-6 text-center">
            <div className="text-sm text-gray-600 mb-1">Estimation totale</div>
            <div className="text-3xl font-bold text-blue-700 mb-2">{formatCurrency(totalAmount)}</div>
            <div className="text-sm text-gray-500">
              Prix au m²: <span className="font-medium">{formatCurrency(pricePerSqm)}/m²</span>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview" className="text-xs">
                <DollarSign className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Aperçu</span>
              </TabsTrigger>
              <TabsTrigger value="breakdown" className="text-xs">
                <BarChart className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Détail</span>
              </TabsTrigger>
              <TabsTrigger value="timeline" className="text-xs">
                <Clock className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Calendrier</span>
              </TabsTrigger>
              <TabsTrigger value="export" className="text-xs">
                <List className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Export</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <EstimationOverview 
                formData={formData} 
                totalAmount={totalAmount}
                pricePerSqm={pricePerSqm}
              />
            </TabsContent>
            
            <TabsContent value="breakdown" className="mt-0">
              <EstimationBreakdown 
                categories={categoriesAmounts} 
                formData={formData}
              />
            </TabsContent>
            
            <TabsContent value="timeline" className="mt-0">
              {typeof estimationResult === 'object' && estimationResult?.timeline ? (
                <EstimationTimeline timeline={estimationResult.timeline} />
              ) : (
                <div className="text-center py-6 text-gray-500">
                  Le calendrier n'est pas disponible pour cette estimation
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="export" className="mt-0">
              <EstimationPDFExport 
                formData={formData}
                estimation={estimationResult}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Modifier l'estimation
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleShareEstimation}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Partager
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResultsForm;
