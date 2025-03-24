
import { useState } from 'react';
import { FormData } from '../types';

export const useEstimationForm = () => {
  // Données du formulaire
  const [formData, setFormData] = useState<FormData>({
    clientType: "",
    activity: "",
    projectType: "",
    startDate: "",
    endDate: "",
    estimationType: "",
    termsAccepted: false,
    surface: "",
    levels: "",
    units: "",
    terrainType: [],
    wallType: "",
    roofType: "",
    atticType: "",
    roofingType: "",
    insulationType: "",
    stonePercentage: "0",
    plasterPercentage: "0",
    brickPercentage: "0",
    metalCladdingPercentage: "0",
    woodCladdingPercentage: "0",
    stoneCladdingPercentage: "0",
    windowType: "",
    electricalType: "",
    plumbingType: "",
    heatingType: "",
    hasAirConditioning: "",
    plasteringType: "",
    doorType: "",
    interiorFittings: [],
    floorTileType: "",
    wallTileType: "",
    floorTilePercentage: "0",
    parquetType: "",
    parquetPercentage: "0",
    softFloorType: "",
    softFloorPercentage: "0",
    basicPaintPercentage: "0",
    decorativePaintPercentage: "0",
    wallpaperPercentage: "0",
    woodCladPercentage: "0",
    stoneCladPercentage: "0",
    energyType: "",
    solutionType: "",
    landscapeLevel: "",
    fencingLength: "0",
    gateLength: "0",
    terraceArea: "0",
    landscapeArea: "0",
    carport: "none",
    pool: "none",
    poolArea: "0",
    poolHeating: "no",
    jacuzzi: "none",
    jacuzziArea: "0",
    kitchenType: "",
    bathroomType: "",
    bathroomCount: "0",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  // Mise à jour des données du formulaire
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  return {
    formData,
    updateFormData
  };
};
