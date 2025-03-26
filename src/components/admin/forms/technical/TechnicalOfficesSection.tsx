
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { ProjectDetails } from '@/types/project';

const technicalOffices = [
  { id: 'structure', label: 'BE STRUCTURE' },
  { id: 'vrd', label: 'BE VRD' },
  { id: 'elect', label: 'BE ELECT' },
  { id: 'cold', label: 'BE FROID' },
  { id: 'cvc', label: 'BE CVC' },
  { id: 'thermal', label: 'BE THERMIQUE' },
  { id: 'geotech', label: 'BE GEOTECH' },
  { id: 'hydro', label: 'BE HYDRO' },
  { id: 'smokeExtraction', label: 'BE DESENFUMAGE' },
  { id: 'method', label: 'BE METHODE' },
  { id: 'acoustics', label: 'BE ACOUSTIQUE' },
  { id: 'security', label: 'BE SECURITE' },
  { id: 'telecom', label: 'BE TELECOM' },
  { id: 'environment', label: 'BE ENVIRONNEMENT' },
];

const TechnicalOfficesSection = () => {
  const { setValue, watch } = useFormContext<ProjectDetails>();
  const selectedTechnicalOffices = watch('technicalOffices');
  
  const handleTechnicalOfficeChange = (office: string, checked: boolean) => {
    setValue(`technicalOffices.${office}`, checked, { shouldDirty: true });
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-sm font-medium text-gray-600 mb-3">SÉLECTIONNEZ LES BET ENGAGÉS SUR LE DOSSIER</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {technicalOffices.map((office) => (
          <div key={office.id} className="flex items-start space-x-2">
            <Checkbox 
              id={`be-${office.id}`} 
              checked={selectedTechnicalOffices?.[office.id] || false}
              onCheckedChange={(checked) => handleTechnicalOfficeChange(office.id, Boolean(checked))}
            />
            <Label htmlFor={`be-${office.id}`} className="text-sm">{office.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalOfficesSection;
