
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import ProjectsList from './project-management/ProjectsList';
import { loadAllProjects } from '@/utils/projectStorage';
import { ProjectDetails } from '@/types/project';

const AdminProjects = () => {
  const [projects, setProjects] = useState<ProjectDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const allProjects = await loadAllProjects();
        setProjects(allProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les projets",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, [toast]);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <ProjectsList 
            isLoading={isLoading}
            initialProjects={projects}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProjects;
