
import React from 'react';
import { SimulationManager as RefactoredSimulationManager } from './simulation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Calculator } from 'lucide-react';

// Import calculator components
import TaxCalculator from '../calculators/TaxCalculator';
import RentabilityCalculator from '../calculators/rentability/RentabilityCalculator';
import SurfaceCalculator from '../calculators/surface/SurfaceCalculator';
import BorrowingCapacityCalculator from '../calculators/BorrowingCapacityCalculator';
import LoanComparatorCalculator from '../calculators/LoanComparatorCalculator';
import YieldCalculator from '../calculators/YieldCalculator';
import AcousticCalculator from '../calculators/AcousticCalculator';
import EurocodesCalculator from '../calculators/EurocodesCalculator';
import TechnicalAuditCalculator from '../calculators/TechnicalAuditCalculator';

const SimulationManager = () => {
  const { toast } = useToast();
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);

  const handleCalculatorSelect = (calculatorType: string) => {
    setActiveCalculator(calculatorType);
  };

  const renderCalculator = () => {
    switch (activeCalculator) {
      case 'tax':
        return <TaxCalculator />;
      case 'rentability':
        return <RentabilityCalculator />;
      case 'surface':
        return <SurfaceCalculator />;
      case 'borrowing':
        return <BorrowingCapacityCalculator />;
      case 'loan':
        return <LoanComparatorCalculator />;
      case 'yield':
        return <YieldCalculator />;
      case 'acoustic':
        return <AcousticCalculator />;
      case 'eurocodes':
        return <EurocodesCalculator />;
      case 'audit':
        return <TechnicalAuditCalculator />;
      default:
        return <RefactoredSimulationManager />;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Mes simulations</TabsTrigger>
          <TabsTrigger value="calculators">Calculateurs</TabsTrigger>
          {activeCalculator && (
            <TabsTrigger value="calculator">
              Calculateur actif
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="list">
          <RefactoredSimulationManager />
        </TabsContent>
        
        <TabsContent value="calculators">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CalculatorCard 
              title="Surface habitable" 
              description="Calculez précisément la surface habitable selon les normes en vigueur"
              onClick={() => handleCalculatorSelect('surface')}
              icon="surface"
            />
            <CalculatorCard 
              title="Rentabilité locative" 
              description="Analysez la rentabilité de votre investissement locatif"
              onClick={() => handleCalculatorSelect('rentability')}
              icon="rentability"
            />
            <CalculatorCard 
              title="Frais de notaire" 
              description="Estimez les frais de notaire pour votre acquisition immobilière"
              onClick={() => handleCalculatorSelect('tax')}
              icon="tax"
            />
            <CalculatorCard 
              title="Capacité d'emprunt" 
              description="Estimez votre capacité d'emprunt selon vos revenus"
              onClick={() => handleCalculatorSelect('borrowing')}
              icon="borrowing"
            />
            <CalculatorCard 
              title="Comparateur de prêts" 
              description="Comparez différentes offres de prêts immobiliers"
              onClick={() => handleCalculatorSelect('loan')}
              icon="loan"
            />
            <CalculatorCard 
              title="Rendement brut/net" 
              description="Calculez le rendement brut et net de votre investissement"
              onClick={() => handleCalculatorSelect('yield')}
              icon="yield"
            />
            <CalculatorCard 
              title="Acoustique" 
              description="Estimez les performances acoustiques d'un bâtiment"
              onClick={() => handleCalculatorSelect('acoustic')}
              icon="acoustic"
            />
            <CalculatorCard 
              title="Eurocodes Thermique" 
              description="Calculs thermiques, hygrométrie, point de rosée et DPE"
              onClick={() => handleCalculatorSelect('eurocodes')}
              icon="eurocodes"
            />
            <CalculatorCard 
              title="Audit technique" 
              description="Réalisez un audit technique complet de votre bâtiment"
              onClick={() => handleCalculatorSelect('audit')}
              icon="audit"
            />
          </div>
        </TabsContent>
        
        <TabsContent value="calculator">
          {activeCalculator && (
            <div className="space-y-4">
              <button 
                onClick={() => setActiveCalculator(null)}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                ← Retour aux calculateurs
              </button>
              {renderCalculator()}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for calculator cards
const CalculatorCard = ({ 
  title, 
  description, 
  onClick, 
  icon 
}: { 
  title: string; 
  description: string; 
  onClick: () => void; 
  icon: string;
}) => {
  // Different icons based on calculator type
  const getIcon = () => {
    switch (icon) {
      case 'surface':
        return <span className="text-blue-500">📏</span>;
      case 'rentability':
        return <span className="text-green-500">💰</span>;
      case 'tax':
        return <span className="text-red-500">📝</span>;
      case 'borrowing':
        return <span className="text-purple-500">🏦</span>;
      case 'loan':
        return <span className="text-orange-500">📊</span>;
      case 'yield':
        return <span className="text-yellow-500">📈</span>;
      case 'acoustic':
        return <span className="text-indigo-500">🔊</span>;
      case 'eurocodes':
        return <span className="text-teal-500">🌡️</span>;
      case 'audit':
        return <span className="text-pink-500">🔍</span>;
      default:
        return <Calculator className="h-5 w-5 text-khaki-600" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            {getIcon()}
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default SimulationManager;
