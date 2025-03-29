
import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import PlatrerieForm from '../../FormSteps/PlatrerieForm';
import MenuiseriesIntForm from '../../FormSteps/MenuiseriesIntForm';
import CarrelageForm from '../../FormSteps/CarrelageForm';
import ParquetForm from '../../FormSteps/ParquetForm';
import PeintureForm from '../../FormSteps/PeintureForm';
import { FormData } from '../../types';
import {
  PlatrerieFormProps,
  MenuiseriesIntFormProps,
  CarrelageFormProps,
  ParquetFormProps,
  PeintureFormProps
} from '../../types/formTypes';

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
        formData={formData}
        updateFormData={(data) => onPlatrerieSubmit({
          plasteringType: data.plasteringType || ''
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          plasteringType: formData.plasteringType || ''
        }}
      />
    ),
    18: (props: FormStepProps) => (
      <MenuiseriesIntForm
        formData={formData}
        updateFormData={(data) => onMenuiseriesIntSubmit({
          doorType: data.doorType || '',
          interiorFittings: Array.isArray(data.interiorFittings) ? data.interiorFittings : []
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          doorType: formData.doorType || '',
          interiorFittings: formData.interiorFittings || []
        }}
      />
    ),
    19: (props: FormStepProps) => (
      <CarrelageForm
        formData={formData}
        updateFormData={(data) => onCarrelageSubmit({
          floorTileType: data.floorTileType || '',
          wallTileType: data.wallTileType || '',
          floorTilePercentage: data.floorTilePercentage !== undefined ? Number(data.floorTilePercentage) : 0
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          floorTileType: formData.floorTileType || '',
          wallTileType: formData.wallTileType || '',
          floorTilePercentage: formData.floorTilePercentage?.toString() || '0'
        }}
      />
    ),
    20: (props: FormStepProps) => (
      <ParquetForm
        formData={formData}
        updateFormData={(data) => onParquetSubmit({
          parquetType: data.parquetType || '',
          parquetPercentage: data.parquetPercentage !== undefined ? Number(data.parquetPercentage) : 0,
          softFloorType: data.softFloorType || '',
          softFloorPercentage: data.softFloorPercentage !== undefined ? Number(data.softFloorPercentage) : 0
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          floorTilePercentage: formData.floorTilePercentage?.toString() || '0',
          parquetPercentage: formData.parquetPercentage?.toString() || '0',
          softFloorPercentage: formData.softFloorPercentage?.toString() || '0',
          parquetType: formData.parquetType || '',
          softFloorType: formData.softFloorType || ''
        }}
      />
    ),
    21: (props: FormStepProps) => (
      <PeintureForm
        formData={formData}
        updateFormData={(data) => onPeintureSubmit({
          basicPaintPercentage: data.basicPaintPercentage !== undefined ? Number(data.basicPaintPercentage) : 0,
          decorativePaintPercentage: data.decorativePaintPercentage !== undefined ? Number(data.decorativePaintPercentage) : 0,
          wallpaperPercentage: data.wallpaperPercentage !== undefined ? Number(data.wallpaperPercentage) : 0,
          woodCladPercentage: data.woodCladPercentage !== undefined ? Number(data.woodCladPercentage) : 0,
          stoneCladPercentage: data.stoneCladPercentage !== undefined ? Number(data.stoneCladPercentage) : 0
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
        defaultValues={{
          basicPaintPercentage: formData.basicPaintPercentage?.toString() || '0',
          decorativePaintPercentage: formData.decorativePaintPercentage?.toString() || '0',
          wallpaperPercentage: formData.wallpaperPercentage?.toString() || '0',
          woodCladPercentage: formData.woodCladPercentage?.toString() || '0',
          stoneCladPercentage: formData.stoneCladPercentage?.toString() || '0'
        }}
      />
    ),
  };
};
