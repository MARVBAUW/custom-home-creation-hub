
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, FileText, UserPlus, DollarSign, ChevronLeft, 
  PenSquare, FileSpreadsheet, ClipboardList, GanttChart,
  Building, MapPin, Briefcase, Clock, User
} from "lucide-react";

// Import the project tabs
import ProjectGeneralForm from '../forms/ProjectGeneralForm';
import ProjectPhaseForm from '../forms/ProjectPhaseForm';
import ProjectDateForm from '../forms/ProjectDateForm';
import ProjectTeamForm from '../forms/ProjectTeamForm';
import ProjectExecutionForm from '../forms/ProjectExecutionForm';
import ProjectTechnicalForm from '../forms/ProjectTechnicalForm';

// Mock project data for demonstration
const mockProject = {
  id: "1",
  projectName: "Villa Méditerranée",
  fileNumber: "PRJ-2023-001",
  clientName: "Jean Dupont",
  clientEmail: "jean.dupont@example.com",
  clientPhone: "06 12 34 56 78",
  clientAssigned: true,
  createdAt: "2023-06-15",
  projectType: "residential",
  location: "Marseille, PACA",
  workAmount: "450000",
  budget: "450 000 €",
  status: "active",
  progress: 65,
  projectOwner: "SCI Les Oliviers",
  adminAuthorization: "building_permit",
  phases: {
    feasibility: true,
    dce: true,
    act: true,
    exe: true,
    reception: false,
    delivery: false
  },
  dates: {
    global: {
      startDate: "2023-06-20",
      endDate: "2024-05-15"
    },
    feasibility: {
      startDate: "2023-06-20",
      endDate: "2023-07-20"
    },
    dce: {
      startDate: "2023-07-25",
      endDate: "2023-09-10"
    },
    act: {
      startDate: "2023-09-15",
      endDate: "2023-10-15"
    },
    exe: {
      startDate: "2023-10-20",
      endDate: "2024-04-20"
    }
  },
  team: {
    projectManager: "Sophie Martin",
    technicalDirector: "Philippe Durand",
    draftsman: "Lucas Bernard",
    workSupervisor: "Emma Dubois"
  }
};

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState("general");
  
  // In a real app, fetch project details based on projectId
  const project = mockProject;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" asChild className="h-9">
            <Link to="/workspace/client-area/admin/projects">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{project.projectName}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>{project.fileNumber}</span>
              <Badge className="bg-green-100 text-green-800 ml-2">
                En cours
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {!project.clientAssigned ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9"
              asChild
            >
              <Link to={`/workspace/client-area/admin/projects/${projectId}/assign-client`}>
                <UserPlus className="h-4 w-4 mr-2" />
                Assigner un client
              </Link>
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9"
              asChild
            >
              <Link to={`/workspace/client-area/admin/client/${projectId}`}>
                <User className="h-4 w-4 mr-2" />
                Voir le client
              </Link>
            </Button>
          )}
          
          <Button 
            size="sm" 
            className="h-9 bg-khaki-600 hover:bg-khaki-700 text-white"
            asChild
          >
            <Link to={`/workspace/client-area/admin/projects/${projectId}/estimate`}>
              <DollarSign className="h-4 w-4 mr-2" />
              Gérer le devis
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-gray-200">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-lg">Détails du projet</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Client</h3>
                {project.clientAssigned ? (
                  <div className="text-sm">
                    <div className="font-medium">{project.clientName}</div>
                    <div className="text-gray-600">{project.clientEmail}</div>
                    <div className="text-gray-600">{project.clientPhone}</div>
                  </div>
                ) : (
                  <div className="flex items-center text-amber-600 text-sm">
                    <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                    Non assigné
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500 flex items-center">
                    <Building className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
                    Type
                  </div>
                  <div>{project.projectType === 'residential' ? 'Résidentiel' : project.projectType}</div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500 flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
                    Localisation
                  </div>
                  <div>{project.location}</div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500 flex items-center">
                    <DollarSign className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
                    Budget
                  </div>
                  <div>{project.budget}</div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500 flex items-center">
                    <Briefcase className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
                    Maître d'ouvrage
                  </div>
                  <div>{project.projectOwner}</div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="text-gray-500 flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1.5 text-khaki-600" />
                    Créé le
                  </div>
                  <div>{formatDate(project.createdAt)}</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Dates clés</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600">Début</div>
                    <div>{formatDate(project.dates.global.startDate)}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-600">Fin prévue</div>
                    <div>{formatDate(project.dates.global.endDate)}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Progression</h3>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-gray-600">Avancement global</div>
                    <div className="text-xs font-medium">{project.progress}%</div>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-khaki-500 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-gray-200">
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-lg">Outils rapides</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm" 
                asChild
              >
                <Link to={`/workspace/client-area/admin/projects/${projectId}/estimate`}>
                  <DollarSign className="h-4 w-4 mr-2 text-khaki-600" />
                  Devis d'honoraires
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm" 
                asChild
              >
                <Link to={`/workspace/client-area/admin/projects/${projectId}/budget`}>
                  <FileSpreadsheet className="h-4 w-4 mr-2 text-khaki-600" />
                  Estimatif TCE
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm" 
                asChild
              >
                <Link to={`/workspace/client-area/admin/projects/${projectId}/reports`}>
                  <ClipboardList className="h-4 w-4 mr-2 text-khaki-600" />
                  Comptes rendus
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm" 
                asChild
              >
                <Link to={`/workspace/client-area/admin/projects/${projectId}/planning`}>
                  <GanttChart className="h-4 w-4 mr-2 text-khaki-600" />
                  Planning Gantt
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-sm" 
                asChild
              >
                <Link to={`/workspace/client-area/admin/projects/${projectId}/documents`}>
                  <FileText className="h-4 w-4 mr-2 text-khaki-600" />
                  CCTP / CDPGF
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100 pb-0">
              <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-0 w-full justify-start">
                  <TabsTrigger value="general" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <PenSquare className="h-3.5 w-3.5 mr-1.5" />
                    Général
                  </TabsTrigger>
                  <TabsTrigger value="phases" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <ClipboardList className="h-3.5 w-3.5 mr-1.5" />
                    Phases
                  </TabsTrigger>
                  <TabsTrigger value="dates" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                    Dates
                  </TabsTrigger>
                  <TabsTrigger value="team" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    Équipe
                  </TabsTrigger>
                  <TabsTrigger value="execution" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <Building className="h-3.5 w-3.5 mr-1.5" />
                    Exécution
                  </TabsTrigger>
                  <TabsTrigger value="technical" className="data-[state=active]:bg-khaki-50 data-[state=active]:text-khaki-900">
                    <FileText className="h-3.5 w-3.5 mr-1.5" />
                    Technique
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent className="p-6">
              <TabsContent value="general" className="m-0">
                <ProjectGeneralForm />
              </TabsContent>
              <TabsContent value="phases" className="m-0">
                <ProjectPhaseForm />
              </TabsContent>
              <TabsContent value="dates" className="m-0">
                <ProjectDateForm />
              </TabsContent>
              <TabsContent value="team" className="m-0">
                <ProjectTeamForm />
              </TabsContent>
              <TabsContent value="execution" className="m-0">
                <ProjectExecutionForm />
              </TabsContent>
              <TabsContent value="technical" className="m-0">
                <ProjectTechnicalForm />
              </TabsContent>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
