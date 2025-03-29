
import React, { useState } from 'react';
import { urbanismeDTUs } from './data/dtu/urbanisme';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, Map, Clock, Ruler, BuildingIcon } from 'lucide-react';

export const UrbanismeRecapSection = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    filteredDTUs 
  } = useDTUSearch(urbanismeDTUs);
  
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [urbanismeTab, setUrbanismeTab] = useState("plu");
  
  const handleDTUClick = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
        <h3 className="text-green-800 font-medium flex items-center gap-2 mb-2">
          <BuildingIcon className="h-5 w-5" />
          Réglementation Urbanisme
        </h3>
        <p className="text-green-700 text-sm">
          Cette section présente les réglementations d'urbanisme, les règles des PLU, les autorisations 
          d'urbanisme et les règles de prospect et implantation.
        </p>
      </div>

      <SearchAndFilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />
      
      <Tabs value={urbanismeTab} onValueChange={setUrbanismeTab} className="mt-6">
        <TabsList className="mb-6 bg-green-50">
          <TabsTrigger value="plu" className="data-[state=active]:bg-white">
            <Map className="h-4 w-4 mr-2" />
            <span>PLU</span>
          </TabsTrigger>
          <TabsTrigger value="autorisations" className="data-[state=active]:bg-white">
            <FileText className="h-4 w-4 mr-2" />
            <span>Autorisations</span>
          </TabsTrigger>
          <TabsTrigger value="implantation" className="data-[state=active]:bg-white">
            <Ruler className="h-4 w-4 mr-2" />
            <span>Implantation</span>
          </TabsTrigger>
          <TabsTrigger value="delais" className="data-[state=active]:bg-white">
            <Clock className="h-4 w-4 mr-2" />
            <span>Délais</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plu" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('urbanisme-1'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="autorisations" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('urbanisme-2'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="implantation" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('urbanisme-3'))} 
            onViewDetails={handleDTUClick} 
            searchTerm={searchTerm}
          />
        </TabsContent>

        <TabsContent value="delais" className="space-y-6">
          <DTUGridList 
            dtus={filteredDTUs.filter(dtu => dtu.id.includes('urbanisme-4'))} 
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
