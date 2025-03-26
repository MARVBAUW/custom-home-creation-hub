
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProjectDetails } from '@/types/project';

const team = [
  { id: 'projectManager', label: 'Chef de projet' },
  { id: 'technicalDirector', label: 'Directeur technique' },
  { id: 'draftsman', label: 'Dessinateur' },
  { id: 'workSupervisor', label: 'Conducteur de travaux' },
  { id: 'adminAssistant', label: 'Assistant admin' },
  { id: 'divisionDirector', label: 'Directeur de pôle' }
];

const ProjectTeamForm = () => {
  const { control } = useFormContext<ProjectDetails>();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Personnes Allouées au Projet</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((member) => (
          <FormField
            key={member.id}
            control={control}
            name={`team.${member.id}` as any}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{member.label}</FormLabel>
                <FormControl>
                  <Input placeholder={`Nom du ${member.label.toLowerCase()}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTeamForm;
