
import { FormData } from './formTypes';

export interface EstimationFormData extends FormData {
  // Additional fields specific to estimation form
  projectType: string;
  surface: number;
  location: string;
  constructionType?: string;
  bedrooms?: number;
  bathrooms?: number;
  budget?: number;
  city?: string;
}
