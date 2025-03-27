
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  FileText, 
  FileSpreadsheet, 
  ClipboardList, 
  GanttChart,
  DollarSign 
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
          className="w-full justify-start text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/estimate`}>
            <Calculator className="h-4 w-4 mr-2 text-khaki-600" />
            Estimation des travaux
          </Link>
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-start text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/fees`}>
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
          <Link to={`/workspace/client-area/admin/projects/${projectId}/cctp`}>
            <FileText className="h-4 w-4 mr-2 text-khaki-600" />
            CCTP
          </Link>
        </Button>

        <Button 
          variant="outline" 
          className="w-full justify-start text-sm" 
          asChild
        >
          <Link to={`/workspace/client-area/admin/projects/${projectId}/dpgf`}>
            <ClipboardList className="h-4 w-4 mr-2 text-khaki-600" />
            DPGF
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
      </CardContent>
    </Card>
  );
};

export default ProjectTools;
