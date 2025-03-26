
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import PlatrerieForm from '../../FormSteps/PlatrerieForm';
import MenuiseriesIntForm from '../../FormSteps/MenuiseriesIntForm';
import CarrelageForm from '../../FormSteps/CarrelageForm';
import ParquetForm from '../../FormSteps/ParquetForm';
import PeintureForm from '../../FormSteps/PeintureForm';
import { FormData } from '../../types';

// Registry for interior steps (steps 17-21)
export const createInteriorStepRegistry = (
  formData: FormData,
  onPlatrerieSubmit: (data: { plasteringType: string }) => void,
  onMenuiseriesIntSubmit: (data: any) => void,
  onCarrelageSubmit: (data: any) => void,
  onParquetSubmit: (data: any) => void,
  onPeintureSubmit: (data: any) => void,
  goToPreviousStep: () => void
): StepComponentRegistry => {
  return {
    17: (props: FormStepProps) => (
      <PlatrerieForm
        defaultValues={{
          plasteringType: formData.plasteringType,
        }}
        onSubmit={onPlatrerieSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    18: (props: FormStepProps) => (
      <MenuiseriesIntForm
        defaultValues={{
          doorType: formData.doorType,
          interiorFittings: formData.interiorFittings,
        }}
        onSubmit={onMenuiseriesIntSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    19: (props: FormStepProps) => (
      <CarrelageForm
        defaultValues={{
          floorTileType: formData.floorTileType,
          wallTileType: formData.wallTileType,
          floorTilePercentage: formData.floorTilePercentage,
        }}
        onSubmit={onCarrelageSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    20: (props: FormStepProps) => (
      <ParquetForm
        defaultValues={{
          parquetType: formData.parquetType,
          parquetPercentage: formData.parquetPercentage,
          softFloorType: formData.softFloorType,
          softFloorPercentage: formData.softFloorPercentage,
        }}
        onSubmit={onParquetSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    21: (props: FormStepProps) => (
      <PeintureForm
        defaultValues={{
          basicPaintPercentage: formData.basicPaintPercentage,
          decorativePaintPercentage: formData.decorativePaintPercentage,
          wallpaperPercentage: formData.wallpaperPercentage,
          woodCladPercentage: formData.woodCladPercentage,
          stoneCladPercentage: formData.stoneCladPercentage,
        }}
        onSubmit={onPeintureSubmit}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
