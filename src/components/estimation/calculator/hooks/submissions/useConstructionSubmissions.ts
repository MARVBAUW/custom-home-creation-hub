
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';

export const useConstructionSubmissions = () => {
  // Function to handle construction details submission
  const handleConstructionDetailsSubmit = (data: any) => {
    return {
      constructionType: data.constructionType,
      constructionStyle: data.constructionStyle,
      levels: ensureNumber(data.levels),
      surface: ensureNumber(data.surface),
      basement: data.basement === 'true' || data.basement === true,
      garage: data.garage === 'true' || data.garage === true,
      bedrooms: ensureNumber(data.bedrooms),
      bathrooms: ensureNumber(data.bathrooms),
    };
  };

  // Function to handle terrain details submission
  const handleTerrainSubmit = (data: any) => {
    return {
      terrainType: data.terrainType,
      terrainSurface: ensureNumber(data.terrainSurface),
      landPrice: ensureNumber(data.landPrice),
    };
  };

  // Function to handle gros œuvre submission
  const handleGrosOeuvreSubmit = (data: any) => {
    return {
      wallType: data.wallType,
      foundationType: data.foundationType,
    };
  };

  // Function to handle charpente submission
  const handleCharpenteSubmit = (data: { roofType: string }) => {
    return {
      roofType: data.roofType,
    };
  };

  // Function to handle combles submission
  const handleComblesSubmit = (data: { atticType: string }) => {
    return {
      atticType: data.atticType,
    };
  };

  return {
    handleConstructionDetailsSubmit,
    handleTerrainSubmit,
    handleGrosOeuvreSubmit,
    handleCharpenteSubmit,
    handleComblesSubmit,
  };
};
