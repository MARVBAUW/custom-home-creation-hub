
import { useToast } from "@/components/ui/use-toast";
import { FormData } from '../types';
import { useClientInfoSubmissions } from './submissions/useClientInfoSubmissions';
import { useConstructionSubmissions } from './submissions/useConstructionSubmissions';
import { useEnvelopeSubmissions } from './submissions/useEnvelopeSubmissions';
import { useTechnicalSubmissions } from './submissions/useTechnicalSubmissions';
import { useInteriorSubmissions } from './submissions/useInteriorSubmissions';
import { useSpecialFeaturesSubmissions } from './submissions/useSpecialFeaturesSubmissions';
import { useRoomsSubmissions } from './submissions/useRoomsSubmissions';
import { useRenovationSubmissions } from './submissions/useRenovationSubmissions';

export const useFormSubmissions = (
  formData: FormData, 
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void,
  goToNextStep: () => void,
  finalizeEstimation: () => void
) => {
  const { toast } = useToast();

  // Initialiser les hooks de soumission spécifiques
  const clientInfoSubmissions = useClientInfoSubmissions(updateFormData, setStep);
  const constructionSubmissions = useConstructionSubmissions(updateFormData, goToNextStep);
  const envelopeSubmissions = useEnvelopeSubmissions(updateFormData, goToNextStep);
  const technicalSubmissions = useTechnicalSubmissions(updateFormData, goToNextStep);
  const interiorSubmissions = useInteriorSubmissions(updateFormData, goToNextStep);
  const specialFeaturesSubmissions = useSpecialFeaturesSubmissions(formData, updateFormData, setStep);
  const roomsSubmissions = useRoomsSubmissions(updateFormData, setStep);
  const renovationSubmissions = useRenovationSubmissions(updateFormData, goToNextStep);

  // Soumission du formulaire de coordonnées et calcul de l'estimation
  const onContactSubmit = (data: { 
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }) => {
    clientInfoSubmissions.onContactSubmit(data);
    
    // Calculer l'estimation
    finalizeEstimation();
  };

  return {
    // Client info submissions
    onClientTypeSubmit: clientInfoSubmissions.onClientTypeSubmit,
    onProfessionalProjectSubmit: clientInfoSubmissions.onProfessionalProjectSubmit,
    onIndividualProjectSubmit: clientInfoSubmissions.onIndividualProjectSubmit,
    onEstimationTypeSubmit: clientInfoSubmissions.onEstimationTypeSubmit,
    
    // Construction submissions
    onConstructionDetailsSubmit: constructionSubmissions.onConstructionDetailsSubmit,
    onTerrainSubmit: constructionSubmissions.onTerrainSubmit,
    onGrosOeuvreSubmit: constructionSubmissions.onGrosOeuvreSubmit,
    onCharpenteSubmit: constructionSubmissions.onCharpenteSubmit,
    onComblesSubmit: constructionSubmissions.onComblesSubmit,
    
    // Envelope submissions
    onCouvertureSubmit: envelopeSubmissions.onCouvertureSubmit,
    onIsolationSubmit: envelopeSubmissions.onIsolationSubmit,
    onFacadeSubmit: envelopeSubmissions.onFacadeSubmit,
    onMenuiseriesExtSubmit: envelopeSubmissions.onMenuiseriesExtSubmit,
    
    // Technical submissions
    onElectriciteSubmit: technicalSubmissions.onElectriciteSubmit,
    onPlomberieSubmit: technicalSubmissions.onPlomberieSubmit,
    onChauffageSubmit: technicalSubmissions.onChauffageSubmit,
    
    // Interior submissions
    onPlatrerieSubmit: interiorSubmissions.onPlatrerieSubmit,
    onMenuiseriesIntSubmit: interiorSubmissions.onMenuiseriesIntSubmit,
    onCarrelageSubmit: interiorSubmissions.onCarrelageSubmit,
    onParquetSubmit: interiorSubmissions.onParquetSubmit,
    onPeintureSubmit: interiorSubmissions.onPeintureSubmit,
    
    // Special features submissions
    onEnergiesRenouvelablesSubmit: specialFeaturesSubmissions.onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit: specialFeaturesSubmissions.onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit: specialFeaturesSubmissions.onAmenagementPaysagerSubmit,
    onOptionsSubmit: specialFeaturesSubmissions.onOptionsSubmit,
    
    // Rooms submissions
    onCuisineSubmit: roomsSubmissions.onCuisineSubmit,
    onSalleDeBainSubmit: roomsSubmissions.onSalleDeBainSubmit,
    
    // Renovation submissions
    onDemolitionSubmit: renovationSubmissions.onDemolitionSubmit,
    onGrosOeuvreRenovSubmit: renovationSubmissions.onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit: renovationSubmissions.onCharpenteRenovSubmit,
    onCouvertureRenovSubmit: renovationSubmissions.onCouvertureRenovSubmit,
    onFacadeRenovSubmit: renovationSubmissions.onFacadeRenovSubmit,
    
    // Contact submission (custom implementation with finalization)
    onContactSubmit
  };
};
