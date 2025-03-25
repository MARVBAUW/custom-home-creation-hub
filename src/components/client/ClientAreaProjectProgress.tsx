
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

// Sample project data
const projectStages = [
  { id: 1, name: 'Conception', status: 'completed', date: '15/03/2023', progress: 100 },
  { id: 2, name: 'Dépôt de permis', status: 'completed', date: '10/04/2023', progress: 100 },
  { id: 3, name: 'Obtention du permis', status: 'completed', date: '15/06/2023', progress: 100 },
  { id: 4, name: 'Préparation chantier', status: 'in-progress', date: '05/07/2023', progress: 70 },
  { id: 5, name: 'Gros œuvre', status: 'upcoming', date: 'Prévu 20/08/2023', progress: 0 },
  { id: 6, name: 'Second œuvre', status: 'upcoming', date: 'Prévu 05/10/2023', progress: 0 },
  { id: 7, name: 'Finitions', status: 'upcoming', date: 'Prévu 20/11/2023', progress: 0 },
  { id: 8, name: 'Livraison', status: 'upcoming', date: 'Prévu 15/12/2023', progress: 0 },
];

const ClientAreaProjectProgress = () => {
  // Calculate overall progress
  const completedStages = projectStages.filter(stage => stage.status === 'completed').length;
  const totalStages = projectStages.length;
  const overallProgress = Math.round((completedStages / totalStages) * 100);
  
  // Find current stage
  const currentStage = projectStages.find(stage => stage.status === 'in-progress');
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Avancement du projet
            </CardTitle>
            <CardDescription>
              État actuel et prochaines étapes de votre projet
            </CardDescription>
          </div>
          <Link to="/workspace/client-area/projects">
            <Button variant="ghost" size="sm" className="text-khaki-600 hover:text-khaki-800 hover:bg-khaki-50">
              Détails complets
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Avancement global</div>
            <div className="text-sm">{overallProgress}%</div>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
        
        {currentStage && (
          <div className="bg-khaki-50 border border-khaki-100 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="font-medium text-gray-800">Étape en cours : {currentStage.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Début: {currentStage.date} • Progression: {currentStage.progress}%
                </p>
                <div className="mt-3">
                  <Progress value={currentStage.progress} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Dernières étapes complétées</h3>
          
          {projectStages
            .filter(stage => stage.status === 'completed')
            .slice(-2)
            .map(stage => (
              <div key={stage.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-3">
                  <div className="font-medium">{stage.name}</div>
                  <div className="text-xs text-gray-500">Terminé le {stage.date}</div>
                </div>
              </div>
            ))
          }
          
          <h3 className="text-sm font-medium text-gray-700 pt-2">Prochaines étapes</h3>
          
          {projectStages
            .filter(stage => stage.status === 'upcoming')
            .slice(0, 2)
            .map(stage => (
              <div key={stage.id} className="flex items-center p-3 border border-gray-100 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {projectStages.findIndex(s => s.id === stage.id) + 1}
                  </span>
                </div>
                <div className="ml-3">
                  <div className="font-medium">{stage.name}</div>
                  <div className="text-xs text-gray-500">{stage.date}</div>
                </div>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientAreaProjectProgress;
