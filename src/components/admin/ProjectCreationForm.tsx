
import React from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetails, ProjectPhase } from '@/types/project';
import ProjectGeneralForm from './forms/ProjectGeneralForm';
import ProjectPhaseForm from './forms/ProjectPhaseForm';
import ProjectDateForm from './forms/ProjectDateForm';
import ProjectTeamForm from './forms/ProjectTeamForm';
import ProjectExecutionForm from './forms/ProjectExecutionForm';
import ProjectTechnicalForm from './forms/ProjectTechnicalForm';

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
              <TabsList className="mb-6 grid grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="general">Générales</TabsTrigger>
                <TabsTrigger value="phases">Phases</TabsTrigger>
                <TabsTrigger value="dates">Dates</TabsTrigger>
                <TabsTrigger value="team">Équipe</TabsTrigger>
                <TabsTrigger value="execution">Exécution</TabsTrigger>
                <TabsTrigger value="technical">Technique</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <ProjectGeneralForm />
              </TabsContent>
              
              <TabsContent value="phases">
                <ProjectPhaseForm />
              </TabsContent>
              
              <TabsContent value="dates">
                <ProjectDateForm />
              </TabsContent>
              
              <TabsContent value="team">
                <ProjectTeamForm />
              </TabsContent>
              
              <TabsContent value="execution">
                <ProjectExecutionForm />
              </TabsContent>
              
              <TabsContent value="technical">
                <ProjectTechnicalForm />
              </TabsContent>
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
