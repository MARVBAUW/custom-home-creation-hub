
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, CheckCircle2 } from 'lucide-react';

interface TimelineItem {
  phase: string;
  duration: number;
  description: string;
}

interface EstimationTimelineProps {
  timeline: {
    design?: number;
    permits?: number;
    bidding?: number;
    construction?: number;
    total?: number;
  };
}

const EstimationTimeline: React.FC<EstimationTimelineProps> = ({ timeline }) => {
  // Create timeline items from timeline data
  const timelineItems: TimelineItem[] = [
    {
      phase: 'Conception et études',
      duration: timeline.design || 2,
      description: 'Phase de conception architecturale et études techniques préalables'
    },
    {
      phase: 'Autorisations administratives',
      duration: timeline.permits || 3,
      description: 'Dépôt et instruction du permis de construire, autorisations diverses'
    },
    {
      phase: 'Consultation des entreprises',
      duration: timeline.bidding || 2,
      description: 'Sélection des entreprises, négociations et signature des contrats'
    },
    {
      phase: 'Réalisation des travaux',
      duration: timeline.construction || 9,
      description: 'Exécution des travaux jusqu'à la réception'
    }
  ];

  const totalDuration = timeline.total || timelineItems.reduce((sum, item) => sum + item.duration, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Planning prévisionnel</h3>
        <div className="text-sm text-gray-500 flex items-center">
          <CalendarIcon className="h-4 w-4 mr-1" />
          Durée totale: <span className="font-medium ml-1">{totalDuration} mois</span>
        </div>
      </div>

      <div className="space-y-4">
        {timelineItems.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-medium">{index + 1}</span>
                  </div>
                </div>
                <div className="ml-4 flex-grow">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.phase}</h4>
                    <span className="text-sm bg-blue-50 px-2 py-0.5 rounded text-blue-700">
                      {item.duration} mois
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>* Ce planning est indicatif et peut varier selon la complexité du projet et les contraintes administratives locales.</p>
        <p className="flex items-center mt-2">
          <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
          Votre projet pourrait être achevé d'ici {new Date().getFullYear() + Math.ceil(totalDuration / 12)}, selon le démarrage effectif.
        </p>
      </div>
    </div>
  );
};

export default EstimationTimeline;
