
import { FormData } from '../../types';
import { ensureNumber } from '../../utils/typeConversions';

export const useInteriorSubmissions = () => {
  // Function to handle platrerie submission
  const handlePlatrerieSubmit = (data: any) => {
    return {
      plasteringType: data.plasteringType,
      interiorFittings: data.interiorFittings || 'standard'
    };
  };

  // Function to handle menuiseries intérieures submission
  const handleMenuiseriesIntSubmit = (data: any) => {
    return {
      doorType: data.doorType,
      interiorDoorsType: data.interiorDoorsType,
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
  const handleParquetSubmit = (data: any) => {
    return {
      parquetType: data.parquetType,
      parquetPercentage: ensureNumber(data.parquetPercentage),
      softFloorType: data.softFloorType,
      softFloorPercentage: ensureNumber(data.softFloorPercentage),
      parquetSurface: ensureNumber(data.parquetSurface),
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
