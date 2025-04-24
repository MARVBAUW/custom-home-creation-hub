
import React, { useState } from 'react';
import { hygrometrieDTUs } from './data/dtu/hygrometrie';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calculator, Droplets, FileText, BarChart } from 'lucide-react';

const HygrometrieRecapSection = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    filteredDTUs 
  } = useDTUSearch(hygrometrieDTUs);
  
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [hygrometrieTab, setHygrometrieTab] = useState("general");
  
  const handleDTUClick = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h3 className="text-blue-800 font-medium flex items-center gap-2 mb-2">
          <Droplets className="h-5 w-5" />
          Réglementation Hygrométrie
        </h3>
        <p className="text-blue-700 text-sm">
          Cette section présente les normes d'hygrométrie, le point de rosée, les risques de condensation
          et les recommandations pour la gestion de l'humidité dans les constructions.
        </p>
      </div>

      <SearchAndFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      
      <Tabs value={hygrometrieTab} onValueChange={setHygrometrieTab} className="mt-6">
        <TabsList className="mb-6 bg-blue-50">
          <TabsTrigger value="general" className="data-[state=active]:bg-white">
            <FileText className="h-4 w-4 mr-2" />
            <span>Principes généraux</span>
          </TabsTrigger>
          <TabsTrigger value="condensation" className="data-[state=active]:bg-white">
            <Droplets className="h-4 w-4 mr-2" />
            <span>Condensation</span>
          </TabsTrigger>
          <TabsTrigger value="ventilation" className="data-[state=active]:bg-white">
            <BarChart className="h-4 w-4 mr-2" />
            <span>Ventilation</span>
          </TabsTrigger>
          <TabsTrigger value="calculateurs" className="data-[state=active]:bg-white">
            <Calculator className="h-4 w-4 mr-2" />
            <span>Calculateurs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => !dtu.id.includes('-condensation') && !dtu.id.includes('-ventilation'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="condensation" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('-condensation'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="ventilation" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('-ventilation'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>
        
        <TabsContent value="calculateurs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm">
              <h3 className="text-lg font-medium mb-4 text-blue-800">Calculateur de point de rosée</h3>
              <p className="text-gray-600 mb-4">Déterminez la température de condensation en fonction de la température ambiante et de l'humidité relative.</p>
              <div className="text-center">
                <Button variant="outline" className="mt-2">Accéder au calculateur</Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border border-blue-100 shadow-sm">
              <h3 className="text-lg font-medium mb-4 text-blue-800">Calculateur de transfert de vapeur</h3>
              <p className="text-gray-600 mb-4">Évaluez les risques de condensation dans les parois selon les matériaux et conditions climatiques.</p>
              <div className="text-center">
                <Button variant="outline" className="mt-2">Accéder au calculateur</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <DTUDetailDialog 
        dtu={selectedDTU} 
        isOpen={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default HygrometrieRecapSection;
