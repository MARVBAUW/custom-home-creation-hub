
import { FormData } from '../types';

export const useFormSubmissions = (
  formData: FormData, 
  updateFormData: (data: Partial<FormData>) => void,
  setStep: (step: number) => void,
  goToNextStep: () => void,
  finalizeEstimation: () => void
) => {
  // Fonction pour gérer le passage à l'étape suivante après mise à jour des données
  const handleSubmitAndContinue = (data: Partial<FormData>) => {
    updateFormData(data);
    goToNextStep();
  };

  // Soumission du formulaire de type de client
  const onClientTypeSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission pour projets professionnels
  const onProfessionalProjectSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission pour projets particuliers
  const onIndividualProjectSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission pour le type d'estimation
  const onEstimationTypeSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des détails de construction
  const onConstructionDetailsSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur le terrain
  const onTerrainSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur le gros œuvre
  const onGrosOeuvreSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la charpente
  const onCharpenteSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur les combles
  const onComblesSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la couverture
  const onCouvertureSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur l'isolation
  const onIsolationSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la façade
  const onFacadeSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur les menuiseries extérieures
  const onMenuiseriesExtSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur l'électricité
  const onElectriciteSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la plomberie
  const onPlomberieSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur le chauffage
  const onChauffageSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la plâtrerie
  const onPlatrerieSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur les menuiseries intérieures
  const onMenuiseriesIntSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur le carrelage
  const onCarrelageSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur le parquet
  const onParquetSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la peinture
  const onPeintureSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur les énergies renouvelables
  const onEnergiesRenouvelablesSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur les solutions environnementales
  const onSolutionsEnvironSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur l'aménagement paysager
  const onAmenagementPaysagerSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur les options
  const onOptionsSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la cuisine
  const onCuisineSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la salle de bain
  const onSalleDeBainSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la démolition
  const onDemolitionSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur le gros œuvre en rénovation
  const onGrosOeuvreRenovSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la charpente en rénovation
  const onCharpenteRenovSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la couverture en rénovation
  const onCouvertureRenovSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission des informations sur la façade en rénovation
  const onFacadeRenovSubmit = (data: Partial<FormData>) => {
    handleSubmitAndContinue(data);
  };

  // Soumission du formulaire de contact et finalisation de l'estimation
  const onContactSubmit = (data: Partial<FormData>) => {
    updateFormData(data);
    finalizeEstimation();
    setStep(19); // Aller à l'étape des résultats
  };

  return {
    onClientTypeSubmit,
    onProfessionalProjectSubmit,
    onIndividualProjectSubmit,
    onEstimationTypeSubmit,
    onConstructionDetailsSubmit,
    onTerrainSubmit,
    onGrosOeuvreSubmit,
    onCharpenteSubmit,
    onComblesSubmit,
    onCouvertureSubmit,
    onIsolationSubmit,
    onFacadeSubmit,
    onMenuiseriesExtSubmit,
    onElectriciteSubmit,
    onPlomberieSubmit,
    onChauffageSubmit,
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit,
    onEnergiesRenouvelablesSubmit,
    onSolutionsEnvironSubmit,
    onAmenagementPaysagerSubmit,
    onOptionsSubmit,
    onCuisineSubmit,
    onSalleDeBainSubmit,
    onDemolitionSubmit,
    onGrosOeuvreRenovSubmit,
    onCharpenteRenovSubmit,
    onCouvertureRenovSubmit,
    onFacadeRenovSubmit,
    onContactSubmit
  };
};
