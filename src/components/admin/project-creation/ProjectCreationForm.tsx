import React, { useState } from 'react';
import { useForm, FormProvider } from "react-hook-form";
import { Tabs } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectDetails } from '@/types/project';
import { useNavigate } from 'react-router-dom';
import ProjectFormTabs from './ProjectFormTabs';
import { 
  GeneralTabContent, 
  PhasesTabContent, 
  DatesTabContent, 
  TeamTabContent, 
  ExecutionTabContent, 
  TechnicalTabContent 
} from './TabContents';
import { saveProject } from '@/utils/projectStorage';

const defaultValues: ProjectDetails = {
  id: "",
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
  trades: {},
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  description: ""
};

const ProjectCreationForm = () => {
  const methods = useForm<ProjectDetails>({
    defaultValues
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ProjectDetails) => {
    console.log("Form submitted", data);
    setIsSubmitting(true);
    
    try {
      // Save project using projectStorage utility
      const projectId = await saveProject(data);
      
      toast({
        title: "Projet créé avec succès",
        description: `Le projet ${data.projectName} a été créé.`,
      });
      
      // Redirect to projects list
      setTimeout(() => {
        navigate('/workspace/client-area/admin/projects');
      }, 1000);
    } catch (error) {
      console.error("Error saving project:", error);
      toast({
        title: "Erreur lors de la création du projet",
        description: "Une erreur est survenue lors de l'enregistrement du projet.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enregistrement en cours...' : 'Valider la saisie et enregistrer'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default ProjectCreationForm;
