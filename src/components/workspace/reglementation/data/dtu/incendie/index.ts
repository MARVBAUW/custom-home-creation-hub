
import { DTU } from '../../../dtu/types';
import { erpDTUs } from './erp';
import { logementDTUs } from './logement';
import { parkingDTUs } from './parking';

// Export all incendie DTUs combined
export const incendieDTUs: DTU[] = [
  ...erpDTUs,
  ...logementDTUs,
  ...parkingDTUs
];
