
import React from 'react';
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectDetails } from '@/types/project';

const ProjectGeneralForm = () => {
  const { control } = useFormContext<ProjectDetails>();
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-4">Informations Générales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du projet</FormLabel>
              <FormControl>
                <Input placeholder="Nouvelle résidence Marseille" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="fileNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de dossier</FormLabel>
              <FormControl>
                <Input placeholder="PRG-2023-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="workAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant de travaux</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="150000" 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="projectOwner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maître d'ouvrage</FormLabel>
              <FormControl>
                <Input placeholder="Dupont Immobilier" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Typologie de projet</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type de projet" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="residential">Résidentiel</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="industrial">Industriel</SelectItem>
                  <SelectItem value="public">Établissement public</SelectItem>
                  <SelectItem value="mixed">Mixte</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="adminAuthorization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Autorisation administrative</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez l'autorisation" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="building_permit">Permis de construire</SelectItem>
                  <SelectItem value="prior_declaration">Déclaration préalable</SelectItem>
                  <SelectItem value="demolition_permit">Permis de démolir</SelectItem>
                  <SelectItem value="development_permit">Permis d'aménager</SelectItem>
                  <SelectItem value="none">Aucune</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProjectGeneralForm;
