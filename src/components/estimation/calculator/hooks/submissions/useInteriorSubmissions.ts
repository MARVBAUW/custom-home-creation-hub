
import { FormData } from '../../types';

export const useInteriorSubmissions = (updateFormData: (data: Partial<FormData>) => void) => {
  // Gestion de la soumission du formulaire de plâtrerie
  const handlePlatrerieSubmit = (data: { plasteringType: string }) => {
    updateFormData({
      plasteringType: data.plasteringType,
    });
  };

  // Gestion de la soumission du formulaire de menuiseries intérieures
  const handleMenuiseriesIntSubmit = (data: {
    interiorDoorsType: string;
    doorType: string;
  }) => {
    updateFormData({
      interiorDoorsType: data.interiorDoorsType,
      doorType: data.doorType,
      interiorFittings: data.interiorDoorsType === 'custom' ? 'custom' : 'standard',
    });
  };

  // Gestion de la soumission du formulaire de carrelage
  const handleCarrelageSubmit = (data: {
    floorTileType: string;
    wallTileType: string;
    floorTilePercentage: string | number;
  }) => {
    updateFormData({
      floorTileType: data.floorTileType,
      wallTileType: data.wallTileType,
      floorTilePercentage: data.floorTilePercentage,
    });
  };

  // Gestion de la soumission du formulaire de parquet
  const handleParquetSubmit = (data: {
    parquetType: string;
    softFloorType: string;
    parquetPercentage: string | number;
    softFloorPercentage: string | number;
  }) => {
    updateFormData({
      parquetType: data.parquetType,
      softFloorType: data.softFloorType,
      parquetPercentage: data.parquetPercentage,
      softFloorPercentage: data.softFloorPercentage,
    });
  };

  // Gestion de la soumission du formulaire de peinture
  const handlePeintureSubmit = (data: {
    paintType: string;
    basicPaintPercentage: string | number;
    decorativePaintPercentage: string | number;
    wallpaperPercentage: string | number;
    woodCladPercentage: string | number;
    stoneCladPercentage: string | number;
  }) => {
    updateFormData({
      paintType: data.paintType,
      basicPaintPercentage: data.basicPaintPercentage,
      decorativePaintPercentage: data.decorativePaintPercentage,
      wallpaperPercentage: data.wallpaperPercentage,
      woodCladPercentage: data.woodCladPercentage,
      stoneCladPercentage: data.stoneCladPercentage,
    });
  };

  return {
    handlePlatrerieSubmit,
    handleMenuiseriesIntSubmit,
    handleCarrelageSubmit,
    handleParquetSubmit,
    handlePeintureSubmit,
  };
};
