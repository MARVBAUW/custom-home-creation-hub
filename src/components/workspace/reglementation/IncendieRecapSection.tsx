
import React, { useState } from 'react';
import { incendieDTUs } from './data/dtu/incendie';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building, Home, ParkingCircle, Flame } from 'lucide-react';

export const IncendieRecapSection = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    filteredDTUs 
  } = useDTUSearch(incendieDTUs);
  
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [incendieTab, setIncendieTab] = useState("erp");
  
  const handleDTUClick = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  // Filter DTUs by subcategory
  const erpDTUs = filteredDTUs.filter(dtu => dtu.category.includes("ERP"));
  const logementDTUs = filteredDTUs.filter(dtu => dtu.category.includes("Logement"));
  const parkingDTUs = filteredDTUs.filter(dtu => dtu.category.includes("Parking"));

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
        <h3 className="text-amber-800 font-medium flex items-center gap-2 mb-2">
          <Flame className="h-5 w-5" />
          Réglementation Sécurité Incendie
        </h3>
        <p className="text-amber-700 text-sm">
          Cette section rassemble toutes les réglementations incendie pour différents types de bâtiments.
          Consultez les règles spécifiques pour les ERP, logements et parkings.
        </p>
      </div>

      <SearchAndFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      <Tabs value={incendieTab} onValueChange={setIncendieTab} className="mt-6">
        <TabsList className="mb-6 bg-amber-50">
          <TabsTrigger value="erp" className="data-[state=active]:bg-white">
            <Building className="h-4 w-4 mr-2" />
            <span>ERP</span>
          </TabsTrigger>
          <TabsTrigger value="logement" className="data-[state=active]:bg-white">
            <Home className="h-4 w-4 mr-2" />
            <span>Logement</span>
          </TabsTrigger>
          <TabsTrigger value="parking" className="data-[state=active]:bg-white">
            <ParkingCircle className="h-4 w-4 mr-2" />
            <span>Parking</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="erp" className="space-y-6">
          <DTUGridList 
            dtus={erpDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="logement" className="space-y-6">
          <DTUGridList 
            dtus={logementDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="parking" className="space-y-6">
          <DTUGridList 
            dtus={parkingDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
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
