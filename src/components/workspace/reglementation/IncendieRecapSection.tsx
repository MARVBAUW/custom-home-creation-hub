
import React, { useState } from 'react';
import { incendieDTUs } from './data/dtu/incendie';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Building, Home, ParkingCircle, Flame, FileText, AlertTriangle, Gauge, Fire, Scale } from 'lucide-react';

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
  const [incendieTab, setIncendieTab] = useState("general");
  
  const handleDTUClick = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  // Filter DTUs by subcategory
  const generalDTUs = filteredDTUs.filter(dtu => !dtu.category.includes("ERP") && !dtu.category.includes("Logement") && !dtu.category.includes("Parking") && !dtu.category.includes("Classification") && !dtu.category.includes("Désenfumage") && !dtu.category.includes("Systèmes"));
  const erpDTUs = filteredDTUs.filter(dtu => dtu.category.includes("ERP"));
  const logementDTUs = filteredDTUs.filter(dtu => dtu.category.includes("Logement"));
  const parkingDTUs = filteredDTUs.filter(dtu => dtu.category.includes("Parking"));
  const classificationDTUs = filteredDTUs.filter(dtu => dtu.category.includes("Classification"));
  const desenfumageDTUs = filteredDTUs.filter(dtu => dtu.category.includes("Désenfumage"));
  const systemesDTUs = filteredDTUs.filter(dtu => dtu.category.includes("Systèmes"));

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-6">
        <h3 className="text-amber-800 font-medium flex items-center gap-2 mb-2">
          <Flame className="h-5 w-5" />
          Réglementation Sécurité Incendie
        </h3>
        <p className="text-amber-700 text-sm">
          Cette section rassemble toutes les réglementations incendie pour différents types de bâtiments.
          Consultez les règles spécifiques pour les ERP, logements, parkings, systèmes de désenfumage et moyens de secours.
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
        <TabsList className="mb-6 bg-amber-50 flex flex-wrap gap-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-white">
            <FileText className="h-4 w-4 mr-2" />
            <span>Principes généraux</span>
          </TabsTrigger>
          <TabsTrigger value="classifications" className="data-[state=active]:bg-white">
            <Scale className="h-4 w-4 mr-2" />
            <span>Classifications</span>
          </TabsTrigger>
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
          <TabsTrigger value="desenfumage" className="data-[state=active]:bg-white">
            <Gauge className="h-4 w-4 mr-2" />
            <span>Désenfumage</span>
          </TabsTrigger>
          <TabsTrigger value="systemes" className="data-[state=active]:bg-white">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>Systèmes de sécurité</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <DTUGridList 
            dtus={generalDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="classifications" className="space-y-6">
          <DTUGridList 
            dtus={classificationDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

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

        <TabsContent value="desenfumage" className="space-y-6">
          <DTUGridList 
            dtus={desenfumageDTUs} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="systemes" className="space-y-6">
          <DTUGridList 
            dtus={systemesDTUs} 
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
