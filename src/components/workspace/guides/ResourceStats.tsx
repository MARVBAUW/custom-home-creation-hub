
import React from 'react';
import { FileText, Video, Calendar } from 'lucide-react';
import { GuideDocument } from './types';
import { Card, CardContent } from "@/components/ui/card";

interface ResourceStatsProps {
  guides: GuideDocument[];
}

export const ResourceStats: React.FC<ResourceStatsProps> = ({ guides }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="p-3 rounded-full bg-khaki-100 mr-4">
            <FileText className="h-6 w-6 text-khaki-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{guides.filter(g => g.type === 'pdf').length}</p>
            <p className="text-sm text-gray-500">Guides PDF</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="p-3 rounded-full bg-red-100 mr-4">
            <Video className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">{guides.filter(g => g.type === 'video').length}</p>
            <p className="text-sm text-gray-500">Tutoriels vidéo</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 mr-4">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold">
              {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
            </p>
            <p className="text-sm text-gray-500">Dernière mise à jour</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
