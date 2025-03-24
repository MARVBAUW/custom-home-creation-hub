
import React from 'react';
import { FormData } from '../calculator/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Package } from 'lucide-react';

// Définir l'interface pour les montants par corps d'état
interface CategoryAmount {
  category: string;
  amount: number;
  details?: string;
}

interface EstimationSummaryReportProps {
  formData: FormData;
  estimationResult: number | null;
  categoriesAmounts: CategoryAmount[];
}

const EstimationSummaryReport: React.FC<EstimationSummaryReportProps> = ({
  formData,
  estimationResult,
  categoriesAmounts
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  // Calculer le pourcentage de chaque corps d'état par rapport au total
  const calculatePercentage = (amount: number) => {
    if (!estimationResult || estimationResult === 0) return 0;
    return Math.round((amount / estimationResult) * 100);
  };

  return (
    <Card className="w-full border shadow-sm">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <Package className="h-5 w-5 text-progineer-gold" />
          Récapitulatif de l'estimation
        </CardTitle>
        <CardDescription>
          Détail des montants par corps d'état pour votre projet {formData.projectType}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Montant total estimé</h3>
            <p className="text-2xl font-bold text-progineer-gold">
              {estimationResult ? formatPrice(estimationResult) : '---'}
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <ScrollArea className="h-[320px] pr-4">
            <div className="space-y-4">
              {categoriesAmounts.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium">{category.category}</h4>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(category.amount)}</p>
                      <p className="text-xs text-muted-foreground">
                        {calculatePercentage(category.amount)}% du total
                      </p>
                    </div>
                  </div>
                  {category.details && (
                    <p className="text-sm text-muted-foreground mt-1 ml-6">
                      {category.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        <div className="bg-gray-50 p-4 border-t text-sm text-muted-foreground">
          <p>
            * Prix approximatif TTC hors terrain, frais de notaire, étude géotechnique, 
            honoraires de maîtrise d'œuvre, taxe d'aménagement, taxe archéologique, 
            assurance dommage ouvrage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationSummaryReport;
