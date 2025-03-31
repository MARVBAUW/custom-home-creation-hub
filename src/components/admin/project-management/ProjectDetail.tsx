
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Calendar, Users, FileText, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProjectTools from './ProjectTools';
import ProjectPhases from './ProjectPhases';

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (projectId) {
      loadProject();
    }
  }, [projectId]);

  const loadProject = async () => {
    setLoading(true);
    try {
      // Charger les détails du projet depuis Supabase
      const { data, error } = await supabase
        .from('admin_projects')
        .select(`
          *,
          profiles(*)
        `)
        .eq('id', projectId)
        .single();
      
      if (error) {
        throw error;
      }
      
      setProject(data);
    } catch (error) {
      console.error('Erreur lors du chargement du projet:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les détails du projet.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-khaki-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Projet non trouvé</h3>
            <p className="text-gray-500">
              Le projet demandé n'existe pas ou vous n'avez pas les permissions nécessaires pour y accéder.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Entête du projet */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">{project.project_title}</CardTitle>
              <p className="text-gray-500 mt-1">
                {project.project_type === 'residential' ? 'Résidentiel' : 
                 project.project_type === 'commercial' ? 'Commercial' : 
                 project.project_type === 'industrial' ? 'Industriel' : 'Autre'}
                {' • '}
                {project.construction_type === 'new' ? 'Construction neuve' : 
                 project.construction_type === 'renovation' ? 'Rénovation' : 
                 project.construction_type === 'extension' ? 'Extension' : 'Autre'}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm font-medium mr-2">Client:</span>
                <span className="text-sm text-gray-600">
                  {project.profiles?.full_name || 'Non attribué'}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <ProjectTools projectId={projectId || ''} />
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Contenu du projet */}
      <Tabs defaultValue="phases" className="space-y-6">
        <TabsList className="bg-white border border-gray-200 p-1">
          <TabsTrigger value="phases" className="data-[state=active]:bg-khaki-50">
            <Calendar className="h-4 w-4 mr-2" />
            Planning
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-khaki-50">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-khaki-50">
            <Users className="h-4 w-4 mr-2" />
            Équipe
          </TabsTrigger>
          <TabsTrigger value="partners" className="data-[state=active]:bg-khaki-50">
            <Building className="h-4 w-4 mr-2" />
            Partenaires
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-khaki-50">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="phases">
          <ProjectPhases projectId={projectId || ''} />
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documents du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Fonctionnalité de gestion des documents en cours de développement.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Équipe du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Fonctionnalité de gestion d'équipe en cours de développement.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <CardTitle>Partenaires du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Fonctionnalité de gestion des partenaires en cours de développement.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres du projet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Fonctionnalité de paramétrage du projet en cours de développement.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetail;
