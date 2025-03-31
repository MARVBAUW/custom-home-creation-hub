
import React, { useState } from 'react';
import { allDTUs } from './data/dtu';
import { SearchAndFilterBar } from './dtu/SearchAndFilterBar';
import { DTUGridList } from './dtu/DTUGridList';
import { DTUDetailDialog } from './dtu/DTUDetailDialog';
import { useDTUSearch } from './dtu/useDTUSearch';
import { DTU } from './dtu/types';
import { DTUSelectionManager } from './dtu/DTUSelectionManager';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const DTURecapSection = () => {
  const [allDtus, setAllDtus] = useState<DTU[]>(allDTUs.map(dtu => ({ ...dtu, selected: false })));
  
  const { 
    searchTerm, 
    setSearchTerm, 
    categoryFilter, 
    setCategoryFilter, 
    categories, 
    filteredDTUs: filteredDtusResult 
  } = useDTUSearch(allDtus);
  
  const [selectedDTU, setSelectedDTU] = useState<DTU | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  
  const handleDTUClick = (dtu: DTU) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  const handleDTUSelection = (dtu: DTU, selected: boolean) => {
    setAllDtus(allDtus.map(d => 
      d.id === dtu.id ? { ...d, selected } : d
    ));
  };

  const toggleSelectionMode = (checked: boolean) => {
    setSelectionMode(checked);
    if (!checked) {
      // Désactiver toutes les sélections si on quitte le mode sélection
      setAllDtus(allDtus.map(dtu => ({ ...dtu, selected: false })));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <SearchAndFilterBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={categories}
        />
        
        <div className="flex items-center space-x-2 self-end">
          <Switch 
            id="selection-mode" 
            checked={selectionMode} 
            onCheckedChange={toggleSelectionMode}
          />
          <Label htmlFor="selection-mode">Mode sélection</Label>
        </div>
      </div>
      
      {selectionMode && (
        <DTUSelectionManager 
          dtus={allDtus} 
          setDtus={setAllDtus} 
        />
      )}
      
      <DTUGridList 
        dtus={filteredDtusResult} 
        onViewDetails={handleDTUClick}
        onSelectDTU={handleDTUSelection}
        searchTerm={searchTerm}
        selectionMode={selectionMode}
      />
      
      <DTUDetailDialog 
        dtu={selectedDTU} 
        isOpen={isDetailOpen} 
        onOpenChange={setIsDetailOpen} 
        searchTerm={searchTerm}
      />
    </div>
  );
};
