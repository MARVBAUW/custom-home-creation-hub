import React from 'react';
import { BaseFormProps } from '../types/formTypes';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Store, Briefcase, Factory, Buildings, Tool } from 'lucide-react';
import { useForm } from 'react-hook-form';

const ProfessionalProjectForm: React.FC<BaseFormProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep,
  animationDirection,
  defaultValues,
  onSubmit
}) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: defaultValues || {
      activity: formData.activity || '',
      projectType: formData.projectType || 'commercial',
      startDate: formData.startDate || '',
      endDate: formData.endDate || '',
    }
  });

  const projectType = watch('projectType');

  const handleProjectTypeChange = (value: string) => {
    setValue('projectType', value);
  };

  const handleFormSubmit = (data: any) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      updateFormData(data);
      goToNextStep();
    }
  };

  return (
    <div className={`transform transition-all duration-300 ${
      animationDirection === 'forward' ? 'translate-x-0' : '-translate-x-0'
    }`}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="activity">Activité de l'entreprise</Label>
            <Input
              id="activity"
              placeholder="Ex: Commerce, bureau, industriel..."
              {...register("activity", { required: "L'activité est requise" })}
            />
            {errors.activity && (
              <p className="text-sm text-red-500">{errors.activity.message?.toString()}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Type de projet</Label>
            <RadioGroup 
              value={projectType} 
              onValueChange={handleProjectTypeChange}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2"
            >
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'commercial' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => handleProjectTypeChange('commercial')}
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <Store className="h-10 w-10 text-blue-500 mb-3" />
                  <RadioGroupItem value="commercial" id="type-commercial" className="sr-only" />
                  <Label htmlFor="type-commercial" className="font-medium">Local commercial</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'offices' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => handleProjectTypeChange('offices')}
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <Briefcase className="h-10 w-10 text-blue-500 mb-3" />
                  <RadioGroupItem value="offices" id="type-offices" className="sr-only" />
                  <Label htmlFor="type-offices" className="font-medium">Bureaux</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'industrial' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => handleProjectTypeChange('industrial')}
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <Factory className="h-10 w-10 text-blue-500 mb-3" />
                  <RadioGroupItem value="industrial" id="type-industrial" className="sr-only" />
                  <Label htmlFor="type-industrial" className="font-medium">Bâtiment industriel</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'residential' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => handleProjectTypeChange('residential')}
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <Buildings className="h-10 w-10 text-blue-500 mb-3" />
                  <RadioGroupItem value="residential" id="type-residential" className="sr-only" />
                  <Label htmlFor="type-residential" className="font-medium">Ensemble résidentiel</Label>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all hover:shadow-md ${projectType === 'renovation_pro' ? 'border-blue-500 bg-blue-50' : ''}`}
                onClick={() => handleProjectTypeChange('renovation_pro')}
              >
                <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                  <Tool className="h-10 w-10 text-blue-500 mb-3" />
                  <RadioGroupItem value="renovation_pro" id="type-renovation" className="sr-only" />
                  <Label htmlFor="type-renovation" className="font-medium">Rénovation professionnelle</Label>
                </CardContent>
              </Card>
            </RadioGroup>
            <input type="hidden" {...register("projectType", { required: true })} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début souhaitée</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin souhaitée</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
              />
            </div>
          </div>
        </div>

        <CardFooter className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={goToPreviousStep}>
            Précédent
          </Button>
          <Button type="submit">
            Continuer
          </Button>
        </CardFooter>
      </form>
    </div>
  );
};

export default ProfessionalProjectForm;
