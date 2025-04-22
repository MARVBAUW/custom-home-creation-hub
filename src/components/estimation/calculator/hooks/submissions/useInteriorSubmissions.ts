
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';
import { 
  calculateParquetCost, 
  calculateSoftFloorCost,
  calculatePlasteringCost,
  calculateInteriorCarpenteryCost
} from '../../utils/montantUtils';

export const useInteriorSubmissions = () => {
  // Function to handle platrerie submission
  const handlePlatrerieSubmit = (data: any, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    const additionalCost = calculatePlasteringCost(
      surface,
      data.plasteringType
    );
    
    return {
      plasteringType: data.plasteringType,
      interiorFittings: data.interiorFittings || 'standard',
      montantT: ensureNumber(formData.montantT, 0) + additionalCost
    };
  };

  // Function to handle menuiseries intérieures submission
  const handleMenuiseriesIntSubmit = (data: any, formData: FormData) => {
    // Ensure doorCount exists or use a default value of 0
    const doorCount = formData.doorCount !== undefined ? ensureNumber(formData.doorCount, 0) : 0;
    const additionalCost = calculateInteriorCarpenteryCost(
      data.doorType,
      doorCount
    );
    
    return {
      doorType: data.doorType,
      interiorDoorsType: data.interiorDoorsType,
      hasMoldings: data.hasMoldings || false,
      hasCustomFurniture: data.hasCustomFurniture || false,
      montantT: ensureNumber(formData.montantT, 0) + additionalCost
    };
  };

  // Function to handle carrelage submission
  const handleCarrelageSubmit = (data: any) => {
    return {
      floorTileType: data.floorTileType,
      wallTileType: data.wallTileType,
      floorTilePercentage: ensureNumber(data.floorTilePercentage),
      tileSurface: ensureNumber(data.tileSurface),
    };
  };

  // Function to handle parquet submission
  const handleParquetSubmit = (data: any, formData: FormData) => {
    const surface = ensureNumber(formData.surface, 0);
    let additionalCost = 0;
    
    if (data.parquetType && data.parquetType !== 'none') {
      additionalCost += calculateParquetCost(data.parquetType, ensureNumber(data.parquetArea, 0));
    }
    
    if (data.softFloorType && data.softFloorType !== 'none') {
      additionalCost += calculateSoftFloorCost(data.softFloorType, ensureNumber(data.softFloorArea, 0));
    }
    
    return {
      parquetType: data.parquetType,
      parquetPercentage: ensureNumber(data.parquetPercentage),
      softFloorType: data.softFloorType,
      softFloorPercentage: ensureNumber(data.softFloorPercentage),
      parquetSurface: ensureNumber(data.parquetSurface),
      parquetArea: ensureNumber(data.parquetArea, 0),
      softFloorArea: ensureNumber(data.softFloorArea, 0),
      montantT: ensureNumber(formData.montantT, 0) + additionalCost
    };
  };

  // Function to handle peinture submission
  const handlePeintureSubmit = (data: any) => {
    return {
      paintType: data.paintType,
      basicPaintPercentage: ensureNumber(data.basicPaintPercentage),
      decorativePaintPercentage: ensureNumber(data.decorativePaintPercentage),
      wallpaperPercentage: ensureNumber(data.wallpaperPercentage),
      paintSurface: ensureNumber(data.paintSurface),
    };
  };

  return {
    handlePlatrerieSubmit,
    handleMenuiseriesIntSubmit,
    handleCarrelageSubmit,
    handleParquetSubmit,
    handlePeintureSubmit,
  };
};
