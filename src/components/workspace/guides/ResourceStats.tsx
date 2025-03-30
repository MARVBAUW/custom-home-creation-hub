
import React from 'react';
import { FileText, Video, BookOpen } from 'lucide-react';
import { GuideDocument } from './types';

interface ResourceStatsProps {
  guides: GuideDocument[];
}

export const ResourceStats: React.FC<ResourceStatsProps> = ({ guides }) => {
  const pdfCount = guides.filter(g => g.type === 'pdf').length;
  const videoCount = guides.filter(g => g.type === 'video').length;
  const textCount = guides.filter(g => g.type === 'text').length;
  
  const stats = [
    { icon: FileText, label: 'Documents PDF', count: pdfCount, color: 'bg-blue-50 text-blue-600' },
    { icon: Video, label: 'Vidéos tutorielles', count: videoCount, color: 'bg-red-50 text-red-600' },
    { icon: BookOpen, label: 'Guides textuels', count: textCount, color: 'bg-khaki-50 text-khaki-600' },
  ];

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-4 rounded-lg border border-gray-200 flex items-center"
        >
          <div className={`p-3 rounded-md mr-4 ${stat.color}`}>
            <stat.icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-semibold">{stat.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
