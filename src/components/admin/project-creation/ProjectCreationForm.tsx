
import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Tabs } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetails } from '@/types/project';
import ProjectFormTabs from './ProjectFormTabs';
import { 
  GeneralTabContent, 
  PhasesTabContent, 
  DatesTabContent, 
  TeamTabContent, 
  ExecutionTabContent, 
  TechnicalTabContent 
} from './TabContents';

const defaultValues: ProjectDetails = {
  projectName: "",
  fileNumber: "",
  workAmount: "",
  projectOwner: "",
  projectType: "residential",
  adminAuthorization: "building_permit",
  automaticDates: true,
  dates: {
    global: {
      startDate: "",
      endDate: ""
    }
  },
  phases: {
    feasibility: false,
    dce: false,
    act: false,
    exe: false,
    reception: false,
    delivery: false
  },
  team: {},
  execution: {},
  technicalOffices: {},
  trades: {}
};

const ProjectCreationForm = () => {
  const methods = useForm<ProjectDetails>({
    defaultValues
  });

  const onSubmit = (data: ProjectDetails) => {
    console.log("Form submitted", data);
    
    toast({
      title: "Projet créé avec succès",
      description: `Le projet ${data.projectName} a été créé.`,
    });
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <ProjectFormTabs />
              
              <GeneralTabContent />
              <PhasesTabContent />
              <DatesTabContent />
              <TeamTabContent />
              <ExecutionTabContent />
              <TechnicalTabContent />
            </Tabs>
            
            <div className="flex justify-end pt-6">
              <Button 
                type="submit" 
                className="bg-khaki-600 hover:bg-khaki-700 text-white"
              >
                Valider la saisie et enregistrer
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ProjectCreationForm;
