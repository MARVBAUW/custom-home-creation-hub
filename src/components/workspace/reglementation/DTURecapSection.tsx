
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Book, Search, Clock, ArrowUpRight, Info, ListCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import { Badge } from "@/components/ui/badge";
import { dtuRecaps } from './data/dtuRecapData';

interface DTURecap {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdate: string;
  rules: {
    title: string;
    content: string;
    type: 'standard' | 'warning' | 'tip';
  }[];
  sections: {
    title: string;
    content: string;
  }[];
}

export const DTURecapSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('tous');
  const [selectedDTU, setSelectedDTU] = useState<DTURecap | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // Catégories uniques des DTU
  const categories = ['tous', ...Array.from(new Set(dtuRecaps.map(dtu => dtu.category)))];
  
  // Filtrage des DTU en fonction des critères
  const filteredDTUs = dtuRecaps.filter(dtu => {
    // Filtre par catégorie
    if (categoryFilter !== 'tous' && dtu.category !== categoryFilter) {
      return false;
    }
    
    // Filtre par terme de recherche
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        dtu.title.toLowerCase().includes(search) ||
        dtu.description.toLowerCase().includes(search)
      );
    }
    
    return true;
  });
  
  const handleDTUClick = (dtu: DTURecap) => {
    setSelectedDTU(dtu);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Barre de recherche */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Rechercher un DTU..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Filtre par catégorie */}
        <div className="w-full md:w-1/3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrer par catégorie" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'tous' ? 'Toutes les catégories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Liste des DTU */}
      {filteredDTUs.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <Search className="h-10 w-10 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">Aucun DTU trouvé</h3>
          <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDTUs.map((dtu) => (
            <Card key={dtu.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-khaki-50 pb-4">
                <div className="flex justify-between items-start">
                  <Badge className="bg-khaki-100 text-khaki-800">
                    {dtu.category}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>MàJ: {dtu.lastUpdate}</span>
                  </div>
                </div>
                <CardTitle className="flex items-center mt-2">
                  <Book className="h-5 w-5 mr-2 text-khaki-600" />
                  {dtu.title}
                </CardTitle>
                <CardDescription>{dtu.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="text-sm font-medium flex items-center mb-2">
                  <ListCheck className="h-4 w-4 mr-1 text-khaki-600" />
                  Aperçu des règles clés:
                </h4>
                <ul className="space-y-1.5 text-sm">
                  {dtu.rules.slice(0, 2).map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-khaki-600 mr-1.5">•</span>
                      <span className="text-gray-700">{rule.title}</span>
                    </li>
                  ))}
                  {dtu.rules.length > 2 && (
                    <li className="text-sm text-khaki-600 italic">
                      + {dtu.rules.length - 2} autres règles...
                    </li>
                  )}
                </ul>
              </CardContent>
              <CardFooter className="pt-2 pb-4">
                <Button 
                  variant="outline" 
                  className="w-full text-khaki-600 border-khaki-200"
                  onClick={() => handleDTUClick(dtu)}
                >
                  Voir la fiche complète
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {/* Dialog de détail du DTU */}
      {selectedDTU && (
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2 text-sm text-khaki-600 mb-1">
                <Book className="h-4 w-4" />
                <span>{selectedDTU.category}</span>
                <span className="text-gray-400">•</span>
                <span>Mise à jour: {selectedDTU.lastUpdate}</span>
              </div>
              <DialogTitle className="text-2xl">{selectedDTU.title}</DialogTitle>
              <DialogDescription className="text-base">{selectedDTU.description}</DialogDescription>
            </DialogHeader>
            
            <div className="mt-6 space-y-6">
              {/* Règles empiriques */}
              <div>
                <h3 className="text-lg font-semibold flex items-center mb-4">
                  <ListCheck className="h-5 w-5 mr-2 text-khaki-600" />
                  Règles empiriques essentielles
                </h3>
                <div className="space-y-4">
                  {selectedDTU.rules.map((rule, idx) => {
                    let Icon = Info;
                    let bgColor = "bg-blue-50";
                    let textColor = "text-blue-800";
                    
                    if (rule.type === 'warning') {
                      Icon = AlertTriangle;
                      bgColor = "bg-amber-50";
                      textColor = "text-amber-800";
                    } else if (rule.type === 'tip') {
                      Icon = HelpCircle;
                      bgColor = "bg-green-50";
                      textColor = "text-green-800";
                    }
                    
                    return (
                      <div key={idx} className={`p-3 rounded-md ${bgColor} flex`}>
                        <Icon className={`h-5 w-5 ${textColor} mt-0.5 mr-3 flex-shrink-0`} />
                        <div>
                          <h4 className={`font-medium ${textColor}`}>{rule.title}</h4>
                          <p className="mt-1 text-gray-700">{rule.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Sections détaillées */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Informations détaillées</h3>
                <div className="space-y-4">
                  {selectedDTU.sections.map((section, idx) => (
                    <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                      <h4 className="font-medium text-khaki-800 mb-2">{section.title}</h4>
                      <p className="text-gray-700">{section.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
