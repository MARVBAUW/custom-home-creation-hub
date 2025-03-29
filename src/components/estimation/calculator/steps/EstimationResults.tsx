
import React from 'react';
import { FormData } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Download, Mail, ChevronLeft, FileText, Share2 } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";

interface EstimationResultsProps {
  estimation: number | null;
  formData: FormData;
  goToPreviousStep: () => void;
  updateFormData?: (data: Partial<FormData>) => void;
  goToNextStep?: () => void;
  isLoading?: boolean;
}

const EstimationResults: React.FC<EstimationResultsProps> = ({ 
  estimation, 
  formData,
  goToPreviousStep,
  updateFormData,
  goToNextStep,
  isLoading = false
}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57', '#83a6ed', '#8dd1e1'];
  
  // Générer des catégories basées sur l'estimation
  const generateCategories = () => {
    if (!estimation) return [];
    
    return [
      { category: 'Terrain', amount: Math.round(estimation * 0.25) },
      { category: 'Gros œuvre', amount: Math.round(estimation * 0.30) },
      { category: 'Second œuvre', amount: Math.round(estimation * 0.20) },
      { category: 'Finitions', amount: Math.round(estimation * 0.15) },
      { category: 'Frais annexes', amount: Math.round(estimation * 0.10) },
    ];
  };
  
  const categories = generateCategories();
  
  const handleDownloadPDF = () => {
    // Implémenter la génération de PDF
    console.log('Téléchargement du rapport en PDF');
  };
  
  const handleSendEmail = () => {
    // Implémenter l'envoi par email
    console.log('Envoi du rapport par email');
  };
  
  const handleShare = () => {
    // Implémenter le partage
    console.log('Partage du rapport');
  };

  return (
    <div className="space-y-8">
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-blue-700 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Résultat de votre estimation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            {isLoading ? (
              <div className="flex flex-col items-center space-y-2">
                <Skeleton className="h-8 w-3/4 bg-blue-200 rounded mb-2"></Skeleton>
                <Skeleton className="h-6 w-1/2 bg-blue-100 rounded"></Skeleton>
              </div>
            ) : !estimation ? (
              <div className="text-gray-500">
                <p>Impossible de calculer l'estimation. Veuillez vérifier vos données.</p>
              </div>
            ) : (
              <>
                <h2 className="text-4xl font-bold text-blue-800">
                  {estimation.toLocaleString('fr-FR')} €
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Estimation approximative TTC
                </p>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ventilation par poste</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col space-y-2 h-[300px] justify-center items-center">
                <Skeleton className="h-4 w-full bg-gray-200 rounded"></Skeleton>
                <Skeleton className="h-4 w-5/6 bg-gray-200 rounded"></Skeleton>
                <Skeleton className="h-4 w-4/6 bg-gray-200 rounded"></Skeleton>
                <Skeleton className="h-4 w-3/6 bg-gray-200 rounded"></Skeleton>
                <Skeleton className="h-4 w-2/6 bg-gray-200 rounded"></Skeleton>
              </div>
            ) : categories.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Données insuffisantes pour générer le graphique
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      nameKey="category"
                    >
                      {categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Détail par catégorie</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col space-y-2 h-[300px] justify-center items-center">
                <Skeleton className="h-4 w-full bg-gray-200 rounded"></Skeleton>
                <Skeleton className="h-4 w-5/6 bg-gray-200 rounded"></Skeleton>
                <Skeleton className="h-4 w-4/6 bg-gray-200 rounded"></Skeleton>
                <Skeleton className="h-4 w-3/6 bg-gray-200 rounded"></Skeleton>
                <Skeleton className="h-4 w-2/6 bg-gray-200 rounded"></Skeleton>
              </div>
            ) : categories.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Données insuffisantes pour générer le graphique
              </div>
            ) : (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={categories}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString('fr-FR')} €`} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Récapitulatif du projet</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <div key={index}>
                  <Skeleton className="h-4 w-3/4 bg-gray-200 rounded mb-1"></Skeleton>
                  <Skeleton className="h-4 w-1/2 bg-gray-100 rounded"></Skeleton>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Type de projet</h4>
                <p className="text-sm">{formData.projectType === 'construction' ? 'Construction neuve' : formData.projectType === 'renovation' ? 'Rénovation' : 'Extension'}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Surface</h4>
                <p className="text-sm">{formData.surface} m²</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Localisation</h4>
                <p className="text-sm">{formData.city || 'Non spécifié'}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Chambres</h4>
                <p className="text-sm">{formData.bedrooms || 'Non spécifié'}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Salles de bain</h4>
                <p className="text-sm">{formData.bathrooms || 'Non spécifié'}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-1">Type de construction</h4>
                <p className="text-sm">{formData.constructionType === 'traditional' ? 'Traditionnelle' : formData.constructionType === 'contemporary' ? 'Contemporaine' : 'Écologique'}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={goToPreviousStep}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> 
          Revenir aux informations
        </Button>
        
        <div className="flex flex-wrap justify-end gap-3">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleDownloadPDF}
            disabled={isLoading || !estimation}
          >
            <Download className="h-4 w-4 mr-2" />
            Télécharger PDF
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleSendEmail}
            disabled={isLoading || !estimation}
          >
            <Mail className="h-4 w-4 mr-2" />
            Recevoir par email
          </Button>
          
          <Button
            className="flex items-center bg-blue-600 hover:bg-blue-700"
            onClick={handleShare}
            disabled={isLoading || !estimation}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>
      
      <div className="text-center text-sm text-gray-500 italic">
        * Cette estimation est fournie à titre indicatif et pourra être affinée lors d'un rendez-vous avec nos experts.
      </div>
    </div>
  );
};

export default EstimationResults;
