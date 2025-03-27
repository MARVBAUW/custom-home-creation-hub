
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  FileText, 
  FileSpreadsheet, 
  ClipboardList, 
  GanttChart,
  DollarSign,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectToolsProps {
  projectId: string;
}

const ProjectTools: React.FC<ProjectToolsProps> = ({ projectId }) => {
  return (
    <Card className="border-gray-200">
      <CardHeader className="pb-3 border-b border-gray-100">
        <CardTitle className="text-lg">Outils du projet</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <Button 
          variant="outline" 
          className="w-full justify-between text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/estimate`}>
            <div className="flex items-center">
              <Calculator className="h-4 w-4 mr-2 text-khaki-600" />
              Estimation des travaux
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Link>
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-between text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/fees`}>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-khaki-600" />
              Devis d'honoraires
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Link>
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-between text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/budget`}>
            <div className="flex items-center">
              <FileSpreadsheet className="h-4 w-4 mr-2 text-khaki-600" />
              Estimatif TCE
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Link>
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-between text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/cctp`}>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-2 text-khaki-600" />
              CCTP
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Link>
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-between text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/dpgf`}>
            <div className="flex items-center">
              <ClipboardList className="h-4 w-4 mr-2 text-khaki-600" />
              DPGF
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Link>
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-between text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/planning`}>
            <div className="flex items-center">
              <GanttChart className="h-4 w-4 mr-2 text-khaki-600" />
              Planning Gantt
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectTools;
