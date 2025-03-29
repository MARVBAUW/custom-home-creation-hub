
import React, { useState } from 'react';
import { accessibiliteDTUs } from './data/dtu/accessibilite';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building, Home, Store, School, Wheelchair } from 'lucide-react';

export const AccessibiliteRecapSection = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    filteredDTUs 
  } = useDTUSearch(accessibiliteDTUs);
  
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [accessibiliteTab, setAccessibiliteTab] = useState("erp");
  
  const handleDTUClick = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <h3 className="text-blue-800 font-medium flex items-center gap-2 mb-2">
          <Wheelchair className="h-5 w-5" />
          Réglementation Accessibilité
        </h3>
        <p className="text-blue-700 text-sm">
          Cette section présente les normes d'accessibilité applicables aux différents types de bâtiments.
          Consultez les règles à respecter pour garantir l'accessibilité aux personnes à mobilité réduite.
        </p>
      </div>

      <SearchAndFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      
      <Tabs value={accessibiliteTab} onValueChange={setAccessibiliteTab} className="mt-6">
        <TabsList className="mb-6 bg-blue-50">
          <TabsTrigger value="erp" className="data-[state=active]:bg-white">
            <Store className="h-4 w-4 mr-2" />
            <span>ERP</span>
          </TabsTrigger>
          <TabsTrigger value="logement" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            <span>Logement</span>
          </TabsTrigger>
          <TabsTrigger value="etablissements" className="data-[state=active]:bg-white">
            <School className="h-4 w-4 mr-2" />
            <span>Établissements spécifiques</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="erp" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('erp'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="logement" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('logement'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="etablissements" className="space-y-6">
          <p className="text-center text-gray-500 my-12">
            Cette section est en cours de développement.
            Elle contiendra les règles d'accessibilité pour les établissements spécifiques.
          </p>
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
