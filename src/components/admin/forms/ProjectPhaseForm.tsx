
import React from 'react';
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { ProjectDetails, ProjectPhase } from '@/types/project';

const phases: { id: ProjectPhase; label: string }[] = [
  { id: 'feasibility', label: 'FAISABILITÉ' },
  { id: 'dce', label: 'DCE' },
  { id: 'act', label: 'ACT' },
  { id: 'exe', label: 'EXE' },
  { id: 'reception', label: 'RÉCEPTION' },
  { id: 'delivery', label: 'LIVRAISON' }
];

const ProjectPhaseForm = () => {
  const { control, setValue, watch } = useFormContext<ProjectDetails>();
  const automaticDates = watch('automaticDates');
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Phases du Projet</h2>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="text-sm font-medium text-gray-600 mb-3">SÉLECTIONNEZ LES PHASES CONCERNÉES PAR LE PROJET</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {phases.map((phase) => (
            <FormField
              key={phase.id}
              control={control}
              name={`phases.${phase.id}`}
              render={({ field }) => (
                <FormItem className="flex items-start space-x-2">
                  <FormControl>
                    <Checkbox 
                      id={`phase-${phase.id}`} 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <Label htmlFor={`phase-${phase.id}`} className="text-sm">
                    {phase.label}
                  </Label>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md">
        <FormField
          control={control}
          name="automaticDates"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <Label htmlFor="automatic-dates">
                  DÉFINIR LES DATES DES DIFFÉRENTES PHASES DE PROJET DE MANIÈRE AUTOMATIQUE ?
                </Label>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProjectPhaseForm;
