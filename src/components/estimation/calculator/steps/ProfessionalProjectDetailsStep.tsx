
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { FormData } from '../types';
import { format } from 'date-fns';
import { dateLocale } from '@/lib/date-utils';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [activity, setActivity] = React.useState<string>(formData.activity || '');
  const [projectType, setProjectType] = React.useState<string>(formData.projectType || '');
  const [startDate, setStartDate] = React.useState<Date | undefined>(
    formData.startDate ? new Date(formData.startDate) : undefined
  );
  const [endDate, setEndDate] = React.useState<Date | undefined>(
    formData.endDate ? new Date(formData.endDate) : undefined
  );

  const handleSubmit = () => {
    updateFormData({ 
      activity,
      projectType,
      startDate: startDate ? startDate.toISOString() : undefined,
      endDate: endDate ? endDate.toISOString() : undefined
    });
    
    goToNextStep();
  };

  const isComplete = activity && projectType && startDate && endDate;

  return (
    <div className={`space-y-6 transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0 opacity-100' : '-translate-x-0 opacity-100'
    }`}>
      <h2 className="text-xl font-semibold mb-4">Informations sur votre projet</h2>
      
      {/* Activity Selection */}
      <div className="space-y-3">
        <Label className="text-base font-medium">
          Quel est votre activité ? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup 
          value={activity} 
          onValueChange={setActivity}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activity === 'bureaux' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setActivity('bureaux')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="bureaux" id="bureaux" className="mr-2" />
              <Label htmlFor="bureaux">Bureaux</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activity === 'commerce' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setActivity('commerce')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="commerce" id="commerce" className="mr-2" />
              <Label htmlFor="commerce">Commerce</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activity === 'hotellerie' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setActivity('hotellerie')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="hotellerie" id="hotellerie" className="mr-2" />
              <Label htmlFor="hotellerie">Hotellerie</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activity === 'restauration' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setActivity('restauration')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="restauration" id="restauration" className="mr-2" />
              <Label htmlFor="restauration">Restauration</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activity === 'industrie' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setActivity('industrie')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="industrie" id="industrie" className="mr-2" />
              <Label htmlFor="industrie">Industrie</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${activity === 'investisseur' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setActivity('investisseur')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="investisseur" id="investisseur" className="mr-2" />
              <Label htmlFor="investisseur">Investisseur immobilier</Label>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      {/* Project Type */}
      <div className="space-y-3 mt-6">
        <Label className="text-base font-medium">
          Quel type de projet ? <span className="text-red-500">*</span>
        </Label>
        <RadioGroup 
          value={projectType} 
          onValueChange={setProjectType}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'construction' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('construction')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="construction" id="pro-construction" className="mr-2" />
              <Label htmlFor="pro-construction">Construction</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'renovation' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('renovation')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="renovation" id="pro-renovation" className="mr-2" />
              <Label htmlFor="pro-renovation">Rénovation</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'extension' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('extension')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="extension" id="pro-extension" className="mr-2" />
              <Label htmlFor="pro-extension">Extension</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'optimization' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('optimization')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="optimization" id="pro-optimization" className="mr-2" />
              <Label htmlFor="pro-optimization">Optimisation</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'division' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('division')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="division" id="pro-division" className="mr-2" />
              <Label htmlFor="pro-division">Division</Label>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'design' ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => setProjectType('design')}
          >
            <CardContent className="pt-4 pb-4 flex items-center">
              <RadioGroupItem value="design" id="pro-design" className="mr-2" />
              <Label htmlFor="pro-design">Design d'espace / décoration</Label>
            </CardContent>
          </Card>
        </RadioGroup>
      </div>
      
      {/* Date Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-2">
          <Label className="text-base font-medium">
            Quand souhaitez-vous réaliser le projet ? <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP", { locale: dateLocale }) : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                locale={dateLocale}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label className="text-base font-medium">
            Date de fin souhaitée ? <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP", { locale: dateLocale }) : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                locale={dateLocale}
                initialFocus
                disabled={(date) => startDate ? date < startDate : false}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-6">
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
          onClick={handleSubmit}
          disabled={!isComplete}
          className="flex items-center gap-2"
        >
          Poursuivre
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalProjectDetailsStep;
