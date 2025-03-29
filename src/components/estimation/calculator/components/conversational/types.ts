
export type MessageType = 'system' | 'user';

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  options?: string[];
}

export interface ConversationalProps {
  onClientTypeSubmit: (data: { clientType: string }) => void;
  onProfessionalProjectSubmit: (data: any) => void;
  onIndividualProjectSubmit: (data: { projectType: string }) => void;
  onEstimationTypeSubmit: (data: any) => void;
  onConstructionDetailsSubmit: (data: any) => void;
  onTerrainSubmit: (data: { terrainType: string }) => void;
  onGrosOeuvreSubmit: (data: { wallType: string }) => void;
  onCharpenteSubmit: (data: { roofType: string }) => void;
  onComblesSubmit: (data: { atticType: string }) => void;
  onCouvertureSubmit: (data: { roofingType: string }) => void;
  onIsolationSubmit: (data: { insulationType: string }) => void;
  onFacadeSubmit: (data: any) => void;
  onMenuiseriesExtSubmit: (data: any) => void;
  onElectriciteSubmit: (data: { electricalType: string }) => void;
  onPlomberieSubmit: (data: { plumbingType: string }) => void;
  onChauffageSubmit: (data: any) => void;
  onPlatrerieSubmit: (data: { plasteringType: string }) => void;
  onMenuiseriesIntSubmit: (data: any) => void;
  onCarrelageSubmit: (data: any) => void;
  onParquetSubmit: (data: any) => void;
  onPeintureSubmit: (data: any) => void;
  onEnergiesRenouvelablesSubmit: (data: any) => void;
  onSolutionsEnvironSubmit: (data: any) => void;
  onAmenagementPaysagerSubmit: (data: any) => void;
  onOptionsSubmit: (data: any) => void;
  onCuisineSubmit: (data: any) => void;
  onSalleDeBainSubmit: (data: any) => void;
  onDemolitionSubmit: (data: any) => void;
  onGrosOeuvreRenovSubmit: (data: any) => void;
  onCharpenteRenovSubmit: (data: any) => void;
  onCouvertureRenovSubmit: (data: any) => void;
  onFacadeRenovSubmit: (data: any) => void;
  onContactSubmit: (data: any) => void;
  formData: any;
  step: number;
  onStepChange?: (step: number) => void;
}
