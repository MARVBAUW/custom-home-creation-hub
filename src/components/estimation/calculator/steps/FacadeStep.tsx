
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { FormData } from '../types';
import { 
  calculateDetailedFacadeCost,
  calculateNewMontantT
} from '../utils/montantUtils';
import FacadeOptions, { FacadeOption } from './facade/FacadeOptions';
import PercentageIndicator from './facade/PercentageIndicator';
import { ensureNumber } from '../utils/typeConversions';

interface FacadeStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const FacadeStep: React.FC<FacadeStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [selectedFacades, setSelectedFacades] = useState<string[]>([]);
  const [stonePercentage, setStonePercentage] = useState<string>(formData.stonePercentage?.toString() || '0');
  const [plasterPercentage, setPlasterPercentage] = useState<string>(formData.plasterPercentage?.toString() || '0');
  const [brickPercentage, setBrickPercentage] = useState<string>(formData.brickPercentage?.toString() || '0');
  const [metalCladdingPercentage, setMetalCladdingPercentage] = useState<string>(formData.metalCladdingPercentage?.toString() || '0');
  const [woodCladdingPercentage, setWoodCladdingPercentage] = useState<string>(formData.woodCladdingPercentage?.toString() || '0');
  const [stoneCladdingPercentage, setStoneCladdingPercentage] = useState<string>(formData.stoneCladdingPercentage?.toString() || '0');
  const [totalPercentage, setTotalPercentage] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const facadeOptions: FacadeOption[] = [
    {
      id: 'pierre',
      label: 'Pierre nue',
      image: 'https://storage.tally.so/37123883-d433-48b2-876c-07b6c94edf49/CAUSSE-BEIGE-NUANCE-PDC14.jpg',
      percentage: stonePercentage,
      setPercentage: setStonePercentage,
    },
    {
      id: 'enduit',
      label: 'Enduit',
      image: 'https://storage.tally.so/24c780b0-4d68-4fcd-b532-7ce875336243/telecharger-6-.jpg',
      percentage: plasterPercentage,
      setPercentage: setPlasterPercentage,
    },
    {
      id: 'brique',
      label: 'Brique',
      image: 'https://storage.tally.so/91cc1e41-c3ed-43ff-ac2a-844410bb03a3/f9603eac22a9b56431e028f84d372db0.jpg',
      percentage: brickPercentage,
      setPercentage: setBrickPercentage,
    },
    {
      id: 'bardageMetal',
      label: 'Bardage métallique',
      image: 'https://storage.tally.so/1c52325e-6481-4609-9828-8c21aed781ba/nettoyage-bardage.jpg',
      percentage: metalCladdingPercentage,
      setPercentage: setMetalCladdingPercentage,
    },
    {
      id: 'bardageBois',
      label: 'Bardage bois',
      image: 'https://storage.tally.so/daf60556-0c23-449b-9c48-93c575c29571/b46141e05a7f311427c245c34828bb78.jpg',
      percentage: woodCladdingPercentage,
      setPercentage: setWoodCladdingPercentage,
    },
    {
      id: 'bardagePierre',
      label: 'Bardage pierre',
      image: 'https://storage.tally.so/a23bd194-7aa2-4ad4-acf6-ce5c25f1e10b/Photo-facade-pierres-naturelles-64-MEDIATEQUE-MOURENX-vetisol.jpg',
      percentage: stoneCladdingPercentage,
      setPercentage: setStoneCladdingPercentage,
    },
  ];

  // Initialize selected facades based on formData
  useEffect(() => {
    const selected: string[] = [];
    if (formData.stonePercentage && Number(formData.stonePercentage) > 0) selected.push('pierre');
    if (formData.plasterPercentage && Number(formData.plasterPercentage) > 0) selected.push('enduit');
    if (formData.brickPercentage && Number(formData.brickPercentage) > 0) selected.push('brique');
    if (formData.metalCladdingPercentage && Number(formData.metalCladdingPercentage) > 0) selected.push('bardageMetal');
    if (formData.woodCladdingPercentage && Number(formData.woodCladdingPercentage) > 0) selected.push('bardageBois');
    if (formData.stoneCladdingPercentage && Number(formData.stoneCladdingPercentage) > 0) selected.push('bardagePierre');
    
    setSelectedFacades(selected);
  }, [formData]);

  // Calculate total percentage
  useEffect(() => {
    const total = 
      (selectedFacades.includes('pierre') ? Number(stonePercentage) : 0) +
      (selectedFacades.includes('enduit') ? Number(plasterPercentage) : 0) +
      (selectedFacades.includes('brique') ? Number(brickPercentage) : 0) +
      (selectedFacades.includes('bardageMetal') ? Number(metalCladdingPercentage) : 0) +
      (selectedFacades.includes('bardageBois') ? Number(woodCladdingPercentage) : 0) +
      (selectedFacades.includes('bardagePierre') ? Number(stoneCladdingPercentage) : 0);
    
    setTotalPercentage(total);
    
    if (total > 100) {
      setError('La somme des pourcentages ne peut pas dépasser 100%.');
    } else {
      setError('');
    }
  }, [
    selectedFacades,
    stonePercentage,
    plasterPercentage,
    brickPercentage,
    metalCladdingPercentage,
    woodCladdingPercentage,
    stoneCladdingPercentage
  ]);

  const handleFacadeToggle = (facadeId: string) => {
    setSelectedFacades(prev => {
      if (prev.includes(facadeId)) {
        return prev.filter(id => id !== facadeId);
      } else {
        return [...prev, facadeId];
      }
    });
  };

  const handleSubmit = () => {
    if (totalPercentage > 100) {
      setError('La somme des pourcentages ne peut pas dépasser 100%.');
      return;
    }
    
    // Calculate facade cost
    const facadeCost = calculateDetailedFacadeCost(
      formData,
      selectedFacades.includes('pierre') ? stonePercentage : '0',
      selectedFacades.includes('enduit') ? plasterPercentage : '0',
      selectedFacades.includes('brique') ? brickPercentage : '0',
      selectedFacades.includes('bardageMetal') ? metalCladdingPercentage : '0',
      selectedFacades.includes('bardageBois') ? woodCladdingPercentage : '0',
      selectedFacades.includes('bardagePierre') ? stoneCladdingPercentage : '0'
    );
    
    // Calculate new total
    const newMontantT = calculateNewMontantT(
      ensureNumber(formData.montantT), 
      facadeCost
    );
    
    // Update form data
    updateFormData({
      stonePercentage: Number(selectedFacades.includes('pierre') ? stonePercentage : '0'),
      plasterPercentage: Number(selectedFacades.includes('enduit') ? plasterPercentage : '0'),
      brickPercentage: Number(selectedFacades.includes('brique') ? brickPercentage : '0'),
      metalCladdingPercentage: Number(selectedFacades.includes('bardageMetal') ? metalCladdingPercentage : '0'),
      woodCladdingPercentage: Number(selectedFacades.includes('bardageBois') ? woodCladdingPercentage : '0'),
      stoneCladdingPercentage: Number(selectedFacades.includes('bardagePierre') ? stoneCladdingPercentage : '0'),
      montantT: newMontantT
    });
    
    // Go to next step
    goToNextStep();
  };

  return (
    <Card className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Façades</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-sm text-gray-500 mb-3">
          Sélectionnez les types de façade et indiquez leur pourcentage. La somme doit être égale à 100%.
        </div>
        
        <FacadeOptions 
          options={facadeOptions}
          selectedFacades={selectedFacades}
          onFacadeToggle={handleFacadeToggle}
        />
        
        <PercentageIndicator 
          totalPercentage={totalPercentage}
          error={error}
        />
        
        <div className="bg-gray-100 p-3 rounded-md text-center text-lg font-semibold">
          Total travaux : {formData.montantT ? formData.montantT.toLocaleString() : 0} €/HT
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          
          <Button 
            onClick={handleSubmit}
            disabled={selectedFacades.length > 0 && totalPercentage > 100}
            className="flex items-center gap-2"
          >
            Suivant
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacadeStep;
