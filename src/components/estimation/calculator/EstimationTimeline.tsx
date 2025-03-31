
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from 'lucide-react';

interface EstimationTimelineProps {
  timeline: {
    design: number;
    permits: number;
    bidding: number;
    construction: number;
    total: number;
  };
}

const EstimationTimeline: React.FC<EstimationTimelineProps> = ({ timeline }) => {
  const phases = [
    { key: 'design', name: 'Conception et études', duration: timeline.design },
    { key: 'permits', name: 'Autorisations administratives', duration: timeline.permits },
    { key: 'bidding', name: 'Consultation des entreprises', duration: timeline.bidding },
    { key: 'construction', name: 'Travaux', duration: timeline.construction }
  ];
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Clock className="h-5 w-5 mr-2 text-khaki-600" />
          <h3 className="text-lg font-medium">Planning prévisionnel</h3>
        </div>
        
        <div className="space-y-4">
          <div className="relative pt-4">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-khaki-200"></div>
            {phases.map((phase, index) => (
              <div key={phase.key} className="ml-12 relative mb-6">
                <div className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-khaki-600 text-white flex items-center justify-center">
                  {index + 1}
                </div>
                <h4 className="font-medium">{phase.name}</h4>
                <p className="text-gray-600">{phase.duration} mois</p>
              </div>
            ))}
          </div>
          
          <div className="bg-khaki-50 p-4 rounded-lg">
            <p className="font-medium">Durée totale estimée: {timeline.total} mois</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationTimeline;
