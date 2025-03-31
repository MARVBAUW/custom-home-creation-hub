
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Home, Building, ArrowRightIcon, ArrowLeftIcon } from 'lucide-react';
import { FormData } from '../types';

interface ProjectDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [projectType, setProjectType] = React.useState<string>(formData.projectType || '');
  const [surface, setSurface] = React.useState<string | number>(formData.surface || '');
  const [city, setCity] = React.useState<string>(formData.city || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      projectType,
      surface: typeof surface === 'string' ? parseFloat(surface) || 0 : surface,
      city
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Détails du projet</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Project Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Type de projet</Label>
            <RadioGroup 
              value={projectType} 
              onValueChange={setProjectType}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="construction" id="construction" />
                <Label htmlFor="construction" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Home className="h-4 w-4 text-blue-500" />
                  <div>
                    <p>Construction neuve</p>
                    <p className="text-sm text-gray-500">Projet de construction nouvelle</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="renovation" id="renovation" />
                <Label htmlFor="renovation" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Building className="h-4 w-4 text-amber-500" />
                  <div>
                    <p>Rénovation</p>
                    <p className="text-sm text-gray-500">Rénovation d'un bien existant</p>
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="extension" id="extension" />
                <Label htmlFor="extension" className="flex flex-1 items-center gap-2 cursor-pointer">
                  <Home className="h-4 w-4 text-green-500" />
                  <div>
                    <p>Extension</p>
                    <p className="text-sm text-gray-500">Agrandissement d'un bien existant</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Surface */}
          <div className="space-y-2">
            <Label htmlFor="surface" className="text-base font-medium">Surface du projet (m²)</Label>
            <Input
              id="surface"
              type="number"
              min="1"
              value={surface}
              onChange={(e) => setSurface(e.target.value)}
              placeholder="Ex: 120"
              className="w-full"
            />
          </div>
          
          {/* City */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-base font-medium">Ville du projet</Label>
            <Input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ex: Marseille"
              className="w-full"
            />
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={goToPreviousStep}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Précédent
            </Button>
            
            <Button 
              type="submit"
              className="flex items-center gap-2"
            >
              Suivant
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectDetailsStep;
