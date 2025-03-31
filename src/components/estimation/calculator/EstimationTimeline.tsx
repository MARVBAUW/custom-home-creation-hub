
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { EstimationTimeline as TimelineType } from './types';

interface EstimationTimelineProps {
  timeline: TimelineType;
}

const EstimationTimeline: React.FC<EstimationTimelineProps> = ({ timeline }) => {
  const totalMonths = timeline.total;
  
  // Calculate percentage of each phase
  const getPhaseWidth = (months: number) => {
    return `${(months / totalMonths) * 100}%`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Calendrier prévisionnel</h3>
          
          <div className="space-y-4">
            {/* Timeline visualization */}
            <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
              <div 
                className="absolute h-full bg-khaki-200 border-r border-white" 
                style={{ width: getPhaseWidth(timeline.design) }}
              >
                <div className="flex items-center justify-center h-full text-xs font-medium text-khaki-800">
                  Conception
                </div>
              </div>
              <div 
                className="absolute h-full bg-khaki-300 border-r border-white" 
                style={{ 
                  width: getPhaseWidth(timeline.permits), 
                  left: getPhaseWidth(timeline.design) 
                }}
              >
                <div className="flex items-center justify-center h-full text-xs font-medium text-khaki-800">
                  Autorisations
                </div>
              </div>
              <div 
                className="absolute h-full bg-khaki-400 border-r border-white" 
                style={{ 
                  width: getPhaseWidth(timeline.bidding), 
                  left: `calc(${getPhaseWidth(timeline.design)} + ${getPhaseWidth(timeline.permits)})` 
                }}
              >
                <div className="flex items-center justify-center h-full text-xs font-medium text-white">
                  Consultation
                </div>
              </div>
              <div 
                className="absolute h-full bg-khaki-600" 
                style={{ 
                  width: getPhaseWidth(timeline.construction), 
                  left: `calc(${getPhaseWidth(timeline.design)} + ${getPhaseWidth(timeline.permits)} + ${getPhaseWidth(timeline.bidding)})` 
                }}
              >
                <div className="flex items-center justify-center h-full text-xs font-medium text-white">
                  Travaux
                </div>
              </div>
            </div>
            
            {/* Detailed phases */}
            <div className="space-y-2">
              <div className="flex justify-between border-b pb-2">
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-khaki-200 rounded-sm mr-2"></div>
                  Conception et études
                </span>
                <span className="font-medium">{timeline.design} mois</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-khaki-300 rounded-sm mr-2"></div>
                  Autorisations administratives
                </span>
                <span className="font-medium">{timeline.permits} mois</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-khaki-400 rounded-sm mr-2"></div>
                  Consultation des entreprises
                </span>
                <span className="font-medium">{timeline.bidding} mois</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-khaki-600 rounded-sm mr-2"></div>
                  Travaux
                </span>
                <span className="font-medium">{timeline.construction} mois</span>
              </div>
              <div className="flex justify-between pt-1 font-semibold">
                <span>Durée totale du projet</span>
                <span>{timeline.total} mois</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-3">À savoir sur les délais</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Les délais indiqués sont estimatifs et peuvent varier selon la complexité du projet.</li>
            <li>Les délais administratifs peuvent être plus longs selon la commune et les spécificités locales.</li>
            <li>La phase de travaux peut être allongée par des intempéries ou des découvertes imprévues.</li>
            <li>Progineer vous accompagne tout au long du projet pour optimiser les délais.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimationTimeline;
