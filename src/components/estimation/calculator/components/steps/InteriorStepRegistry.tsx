import React from 'react';
import { StepComponentRegistry, FormStepProps } from './StepComponents';
import PlatrerieForm from '../../FormSteps/PlatrerieForm';
import MenuiseriesIntForm from '../../FormSteps/MenuiseriesIntForm';
import CarrelageForm from '../../FormSteps/CarrelageForm';
import ParquetForm from '../../FormSteps/ParquetForm';
import PeintureForm from '../../FormSteps/PeintureForm';
import { EstimationFormData } from '../../types/formTypes';

export const createInteriorStepRegistry = (
  formData: EstimationFormData,
  onPlatrerieSubmit: (data: any) => void,
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
          plasteringType: data.plasteringType || '',
          interiorFittings: data.interiorFittings || 'standard'
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    18: (props: FormStepProps) => (
      <MenuiseriesIntForm
        formData={formData}
        updateFormData={(data) => onMenuiseriesIntSubmit({
          doorType: data.doorType || '',
          interiorDoorsType: data.interiorDoorsType || '',
          hasMoldings: data.hasMoldings || false,
          hasCustomFurniture: data.hasCustomFurniture || false
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    19: (props: FormStepProps) => (
      <CarrelageForm
        formData={formData}
        updateFormData={(data) => onCarrelageSubmit({
          floorTileType: data.floorTileType || '',
          wallTileType: data.wallTileType || '',
          floorTilePercentage: data.floorTilePercentage || 0,
          floorTileArea: data.floorTileArea || 0
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    20: (props: FormStepProps) => (
      <ParquetForm
        formData={formData}
        updateFormData={(data) => onParquetSubmit({
          parquetType: data.parquetType || '',
          parquetArea: data.parquetArea || 0,
          softFloorType: data.softFloorType || '',
          softFloorArea: data.softFloorArea || 0
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
    21: (props: FormStepProps) => (
      <PeintureForm
        formData={formData}
        updateFormData={(data) => onPeintureSubmit({
          paintType: data.paintType || '',
          basicPaintPercentage: data.basicPaintPercentage || 0,
          decorativePaintPercentage: data.decorativePaintPercentage || 0,
          wallpaperPercentage: data.wallpaperPercentage || 0
        })}
        goToNextStep={() => {}}
        goToPreviousStep={goToPreviousStep}
        animationDirection={props.animationDirection}
      />
    ),
  };
};
