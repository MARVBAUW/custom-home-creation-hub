
import React from 'react';
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { ProjectDetails } from '@/types/project';

const trades = [
  { id: 'go', label: 'GO' },
  { id: 'vrd', label: 'VRD' },
  { id: 'framework', label: 'CHARPENTE' },
  { id: 'cladding', label: 'BARDAGE' },
  { id: 'roofing', label: 'COUVERTURE' },
  { id: 'joinery', label: 'MENUISERIE' },
  { id: 'locksmithing', label: 'SERRURERIE' },
  { id: 'flooring', label: 'DALLAGE' },
  { id: 'isothermal', label: 'ISOTHERME' },
  { id: 'plastering', label: 'PLATRERIE' },
  { id: 'painting', label: 'PEINTURE' },
  { id: 'demolition', label: 'DEMOLITION' },
  { id: 'plumbing', label: 'PLOMBERIE' },
  { id: 'foodCold', label: 'FROID ALIMENTAIRE' },
  { id: 'cvc', label: 'CVC' },
  { id: 'arrangement', label: 'AMENAGEMENT' },
  { id: 'sprinklage', label: 'SPRINKLAGE' },
  { id: 'ria', label: 'RIA' },
  { id: 'ssi', label: 'SSI' },
  { id: 'electricity', label: 'ELECTRICITE' },
  { id: 'interiorJoinery', label: 'MENUISERIE INTERIEUR' },
  { id: 'sectionalDoor', label: 'PORTE SECTIONNELLE' },
  { id: 'levelingDock', label: 'QUAI NIVELEUR' },
  { id: 'fastDoor', label: 'PORTE RAPIDE' },
  { id: 'specialFoundations', label: 'FONDATION SPECIALES' },
  { id: 'automaticDoor', label: 'PORTE AUTOMATIQUE' },
  { id: 'flexibleFloor', label: 'SOL SOUPLE' },
  { id: 'tiling', label: 'CARRELAGE' },
  { id: 'metalwork', label: 'METALLERIE' },
  { id: 'railings', label: 'GARDE-CORPS' },
  { id: 'elevator', label: 'ASCENSEUR' },
  { id: 'acoustics', label: 'ACOUSTIQUE' },
  { id: 'facades', label: 'FACADES' },
  { id: 'greenSpaces', label: 'ESPACES VERTS' },
  { id: 'security', label: 'SECURITE' },
  { id: 'signage', label: 'SIGNALISATION' },
  { id: 'movableFurniture', label: 'MOBILIER' },
  { id: 'kitchenEquipment', label: 'EQUIPEMENT CUISINE' },
  { id: 'audioVisual', label: 'AUDIOVISUEL' },
  { id: 'industrialEquipment', label: 'EQUIPEMENT INDUSTRIEL' },
  { id: 'cleaningEquipment', label: 'EQUIPEMENT NETTOYAGE' },
  { id: 'wasteManagement', label: 'GESTION DECHETS' },
  { id: 'waterTreatment', label: 'TRAITEMENT EAU' },
  { id: 'telecommunications', label: 'TELECOMMUNICATION' },
];

const TradesSection = () => {
  const { setValue, watch } = useFormContext<ProjectDetails>();
  const selectedTrades = watch('trades');
  
  const handleTradeChange = (trade: string, checked: boolean) => {
    setValue(`trades.${trade}`, checked, { shouldDirty: true });
  };
  
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <h3 className="text-sm font-medium text-gray-600 mb-3">SÉLECTIONNEZ LES CORPS D'ÉTAT CONCERNÉS PAR LE DOSSIER</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {trades.map((trade) => (
          <div key={trade.id} className="flex items-start space-x-2">
            <Checkbox 
              id={`trade-${trade.id}`} 
              checked={selectedTrades?.[trade.id] || false}
              onCheckedChange={(checked) => handleTradeChange(trade.id, Boolean(checked))}
            />
            <Label htmlFor={`trade-${trade.id}`} className="text-sm">{trade.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesSection;
