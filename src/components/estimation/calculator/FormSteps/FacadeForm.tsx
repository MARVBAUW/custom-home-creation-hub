import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const FacadeForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues = {}
}) => {
  // Initialize state with form data or defaults
  const [stonePercentage, setStonePercentage] = React.useState<number>(
    defaultValues.stonePercentage || formData.stonePercentage || 0
  );
  const [plasterPercentage, setPlasterPercentage] = React.useState<number>(
    defaultValues.plasterPercentage || formData.plasterPercentage || 70
  );
  const [brickPercentage, setBrickPercentage] = React.useState<number>(
    defaultValues.brickPercentage || formData.brickPercentage || 0
  );
  const [metalCladdingPercentage, setMetalCladdingPercentage] = React.useState<number>(
    defaultValues.metalCladdingPercentage || formData.metalCladdingPercentage || 0
  );
  const [woodCladdingPercentage, setWoodCladdingPercentage] = React.useState<number>(
    defaultValues.woodCladdingPercentage || formData.woodCladdingPercentage || 30
  );
  const [stoneCladdingPercentage, setStoneCladdingPercentage] = React.useState<number>(
    defaultValues.stoneCladdingPercentage || formData.stoneCladdingPercentage || 0
  );

  // Calculate total percentage
  const totalPercentage = stonePercentage + plasterPercentage + brickPercentage + 
                          metalCladdingPercentage + woodCladdingPercentage + stoneCladdingPercentage;

  // Handle form submission
  const handleSubmit = () => {
    const data = {
      stonePercentage,
      plasterPercentage,
      brickPercentage,
      metalCladdingPercentage,
      woodCladdingPercentage,
      stoneCladdingPercentage
    };
    
    if (defaultValues.onSubmit) {
      defaultValues.onSubmit(data);
    } else {
      updateFormData(data);
    }
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-4">Revêtements de façade</h3>
          <p className="text-gray-500 mb-6">
            Indiquez la répartition approximative des différents matériaux pour votre façade (total: {totalPercentage}%)
          </p>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 pb-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="plaster-percentage">Enduit</Label>
                      <span className="text-sm font-medium">{plasterPercentage}%</span>
                    </div>
                    <Slider
                      id="plaster-percentage"
                      min={0}
                      max={100}
                      step={5}
                      value={[plasterPercentage]}
                      onValueChange={(value) => setPlasterPercentage(value[0])}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="stone-percentage">Pierre</Label>
                      <span className="text-sm font-medium">{stonePercentage}%</span>
                    </div>
                    <Slider
                      id="stone-percentage"
                      min={0}
                      max={100}
                      step={5}
                      value={[stonePercentage]}
                      onValueChange={(value) => setStonePercentage(value[0])}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="brick-percentage">Briques</Label>
                      <span className="text-sm font-medium">{brickPercentage}%</span>
                    </div>
                    <Slider
                      id="brick-percentage"
                      min={0}
                      max={100}
                      step={5}
                      value={[brickPercentage]}
                      onValueChange={(value) => setBrickPercentage(value[0])}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="wood-cladding-percentage">Bardage bois</Label>
                      <span className="text-sm font-medium">{woodCladdingPercentage}%</span>
                    </div>
                    <Slider
                      id="wood-cladding-percentage"
                      min={0}
                      max={100}
                      step={5}
                      value={[woodCladdingPercentage]}
                      onValueChange={(value) => setWoodCladdingPercentage(value[0])}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="metal-cladding-percentage">Bardage métallique</Label>
                      <span className="text-sm font-medium">{metalCladdingPercentage}%</span>
                    </div>
                    <Slider
                      id="metal-cladding-percentage"
                      min={0}
                      max={100}
                      step={5}
                      value={[metalCladdingPercentage]}
                      onValueChange={(value) => setMetalCladdingPercentage(value[0])}
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="stone-cladding-percentage">Parement pierre</Label>
                      <span className="text-sm font-medium">{stoneCladdingPercentage}%</span>
                    </div>
                    <Slider
                      id="stone-cladding-percentage"
                      min={0}
                      max={100}
                      step={5}
                      value={[stoneCladdingPercentage]}
                      onValueChange={(value) => setStoneCladdingPercentage(value[0])}
                    />
                  </div>
                </div>
                
                {totalPercentage !== 100 && (
                  <div className={`mt-4 p-2 text-sm rounded ${
                    totalPercentage > 100 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {totalPercentage > 100 
                      ? `Le total dépasse 100% (${totalPercentage}%). Veuillez ajuster les valeurs.` 
                      : `Le total est inférieur à 100% (${totalPercentage}%). Vous pouvez continuer ou ajuster les valeurs.`}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={totalPercentage > 100}
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacadeForm;
