
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BarChart, RotateCcw, Save } from 'lucide-react';

interface RentabilityHeaderProps {
  resetCalculator: () => void;
  saveToLocalStorage: () => void;
}

const RentabilityHeader: React.FC<RentabilityHeaderProps> = ({ 
  resetCalculator, 
  saveToLocalStorage 
}) => {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-khaki-600" />
            Calculateur de rentabilité locative
          </CardTitle>
          <CardDescription>
            Analysez la rentabilité de votre investissement immobilier
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={resetCalculator}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Réinitialiser le calculateur</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={saveToLocalStorage}>
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sauvegarder le projet</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </CardHeader>
  );
};

export default RentabilityHeader;
