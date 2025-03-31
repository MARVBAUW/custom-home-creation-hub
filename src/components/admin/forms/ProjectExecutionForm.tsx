
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectDetails } from '@/types/project';

const ProjectExecutionForm = () => {
  const { control } = useFormContext<ProjectDetails>();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Informations Liées à l'Exécution</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="execution.weeklyVisits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nb visite hebdo du conduc</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="2" 
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseInt(e.target.value) : undefined;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="execution.projectDistance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distance du projet</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="25" 
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.value ? parseInt(e.target.value) : undefined;
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="execution.meetingDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jour de réunion</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value as string || undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un jour" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="monday">Lundi</SelectItem>
                  <SelectItem value="tuesday">Mardi</SelectItem>
                  <SelectItem value="wednesday">Mercredi</SelectItem>
                  <SelectItem value="thursday">Jeudi</SelectItem>
                  <SelectItem value="friday">Vendredi</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="execution.securityCommission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commission de sécurité</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Détails de la commission" 
                  value={field.value || ''} 
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="execution.controlOffice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bureau de contrôle</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nom du bureau de contrôle" 
                  value={field.value || ''} 
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="execution.spsCoordinator"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Coordinateur SPS</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Nom du coordinateur SPS" 
                  value={field.value || ''} 
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProjectExecutionForm;
