
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, ArrowLeftIcon } from 'lucide-react';
import { FormData } from '../types';
import { fr } from 'date-fns/locale';

interface ProfessionalProjectDetailsStepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  animationDirection: string;
}

const ProfessionalProjectDetailsStep: React.FC<ProfessionalProjectDetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection
}) => {
  const [activity, setActivity] = useState<string>(formData.activity || '');
  const [projectType, setProjectType] = useState<string>(formData.projectType || '');
  const [startDate, setStartDate] = useState<Date | undefined>(
    formData.startDate ? new Date(formData.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    formData.endDate ? new Date(formData.endDate) : undefined
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateFormData({
      activity,
      projectType,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined
    });
    
    goToNextStep();
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Informations sur votre projet</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Activity Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Quel est votre activité ? *</Label>
            <RadioGroup 
              value={activity} 
              onValueChange={setActivity}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="bureaux" id="bureaux" />
                <Label htmlFor="bureaux" className="cursor-pointer">Bureaux</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="commerce" id="commerce" />
                <Label htmlFor="commerce" className="cursor-pointer">Commerce</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="hotellerie" id="hotellerie" />
                <Label htmlFor="hotellerie" className="cursor-pointer">Hotellerie</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="restauration" id="restauration" />
                <Label htmlFor="restauration" className="cursor-pointer">Restauration</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="industrie" id="industrie" />
                <Label htmlFor="industrie" className="cursor-pointer">Industrie</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="investisseur" id="investisseur" />
                <Label htmlFor="investisseur" className="cursor-pointer">Investisseur immobilier</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Project Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Quel type de projet ? *</Label>
            <RadioGroup 
              value={projectType} 
              onValueChange={setProjectType}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="construction" id="pro-construction" />
                <Label htmlFor="pro-construction" className="cursor-pointer">Construction</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="renovation" id="pro-renovation" />
                <Label htmlFor="pro-renovation" className="cursor-pointer">Rénovation</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="extension" id="pro-extension" />
                <Label htmlFor="pro-extension" className="cursor-pointer">Extension</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="optimization" id="pro-optimization" />
                <Label htmlFor="pro-optimization" className="cursor-pointer">Optimisation</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="division" id="pro-division" />
                <Label htmlFor="pro-division" className="cursor-pointer">Division</Label>
              </div>
              
              <div className="flex items-center space-x-2 rounded-md border p-4">
                <RadioGroupItem value="design" id="pro-design" />
                <Label htmlFor="pro-design" className="cursor-pointer">Design d'espace / décoration</Label>
              </div>
            </RadioGroup>
          </div>
          
          {/* Date Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-base font-medium">Quand souhaitez-vous réaliser le projet ? *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                    id="startDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    locale={fr}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-base font-medium">Date de fin souhaité ? *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                    id="endDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy", { locale: fr }) : "Sélectionner une date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    locale={fr}
                    disabled={date => !startDate || date < startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
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
              Retour
            </Button>
            
            <Button 
              type="submit"
              disabled={!activity || !projectType || !startDate || !endDate}
              className="px-6"
            >
              Poursuivre
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalProjectDetailsStep;
