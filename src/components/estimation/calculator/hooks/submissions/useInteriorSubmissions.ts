
import { FormData } from '../../types';

export const useInteriorSubmissions = (
  updateFormData: (data: Partial<FormData>) => void,
  goToNextStep: () => void
) => {
  // Soumission du formulaire de plâtrerie
  const onPlatrerieSubmit = (data: {
    plasteringType: string;
  }) => {
    updateFormData({
      plasteringType: data.plasteringType,
    });
    goToNextStep(); // Passer à l'étape menuiseries intérieures (18)
  };

  // Soumission du formulaire de menuiseries intérieures
  const onMenuiseriesIntSubmit = (data: {
    doorType: string;
    interiorFittings: string[];
  }) => {
    updateFormData({
      doorType: data.doorType,
      interiorFittings: data.interiorFittings,
    });
    goToNextStep(); // Passer à l'étape carrelage (19)
  };

  // Soumission du formulaire de carrelage
  const onCarrelageSubmit = (data: {
    floorTileType: string;
    wallTileType: string;
    floorTilePercentage: string;
  }) => {
    updateFormData({
      floorTileType: data.floorTileType,
      wallTileType: data.wallTileType,
      floorTilePercentage: Number(data.floorTilePercentage),
    });
    goToNextStep(); // Passer à l'étape parquet (20)
  };

  // Soumission du formulaire de parquet
  const onParquetSubmit = (data: {
    parquetType: string;
    parquetPercentage: string;
    softFloorType: string;
    softFloorPercentage: string;
  }) => {
    updateFormData({
      parquetType: data.parquetType,
      parquetPercentage: Number(data.parquetPercentage),
      softFloorType: data.softFloorType,
      softFloorPercentage: Number(data.softFloorPercentage),
    });
    goToNextStep(); // Passer à l'étape peinture (21)
  };

  // Soumission du formulaire de peinture
  const onPeintureSubmit = (data: {
    basicPaintPercentage: string;
    decorativePaintPercentage: string;
    wallpaperPercentage: string;
    woodCladPercentage: string;
    stoneCladPercentage: string;
  }) => {
    updateFormData({
      basicPaintPercentage: Number(data.basicPaintPercentage),
      decorativePaintPercentage: Number(data.decorativePaintPercentage),
      wallpaperPercentage: Number(data.wallpaperPercentage),
      woodCladPercentage: Number(data.woodCladPercentage),
      stoneCladPercentage: Number(data.stoneCladPercentage),
    });
    goToNextStep(); // Passer à l'étape cuisines (22)
  };

  return {
    onPlatrerieSubmit,
    onMenuiseriesIntSubmit,
    onCarrelageSubmit,
    onParquetSubmit,
    onPeintureSubmit
  };
};
