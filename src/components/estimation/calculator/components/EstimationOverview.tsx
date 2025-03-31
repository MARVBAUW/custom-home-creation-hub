
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from '@/lib/utils';
import { FormData } from '../types';
import { Home, Map, Ruler, Tag } from 'lucide-react';

interface EstimationOverviewProps {
  formData: FormData;
  totalAmount: number;
  pricePerSqm: number;
}

const EstimationOverview: React.FC<EstimationOverviewProps> = ({ 
  formData, 
  totalAmount, 
  pricePerSqm 
}) => {
  // Format project details
  const projectType = formData.projectType || 'construction';
  const surface = formData.surface 
    ? (typeof formData.surface === 'string' ? parseFloat(formData.surface) : formData.surface) 
    : 0;
  const location = formData.city || 'Non spécifié';
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Home className="mr-2 h-5 w-5 text-blue-500" />
          Aperçu de votre projet
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start">
            <div className="rounded-full bg-blue-100 p-2 mr-3">
              <Tag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Type de projet</div>
              <div className="font-medium capitalize">{projectType}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="rounded-full bg-blue-100 p-2 mr-3">
              <Ruler className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Surface</div>
              <div className="font-medium">{surface} m²</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="rounded-full bg-blue-100 p-2 mr-3">
              <Map className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Localisation</div>
              <div className="font-medium">{location}</div>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="rounded-full bg-blue-100 p-2 mr-3">
              <Tag className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Prix au m²</div>
              <div className="font-medium">{formatCurrency(pricePerSqm)}/m²</div>
            </div>
          </div>
        </div>
        
        <div className="text-center p-4 bg-blue-100 rounded-lg">
          <div className="text-sm text-blue-700 mb-1">Estimation totale de votre projet</div>
          <div className="text-3xl font-bold text-blue-800">{formatCurrency(totalAmount)}</div>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-3">Ce qui est inclus dans cette estimation</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span>Tous les coûts de construction (gros œuvre, second œuvre, lots techniques)</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span>Honoraires d'architecte et bureaux d'études</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span>Frais administratifs et assurances</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span>TVA et taxes diverses</span>
            </li>
          </ul>
          
          <div className="text-sm text-gray-500 mt-4">
            <p>Cette estimation est basée sur les informations que vous avez fournies et représente une approximation réaliste des coûts. Pour une estimation plus précise, nous vous recommandons de prendre rendez-vous avec un de nos experts.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EstimationOverview;
