
import { DTU } from '../../../dtu/types';
import { erpDTUs } from './erp';
import { logementDTUs } from './logement';
import { parkingDTUs } from './parking';
import { erpFichesDTUs } from './erp-fiches';
import { buildingClassificationsDTUs } from './building-classifications';
import { desenfumageDTUs } from './desenfumage';
import { incendieSystemsDTUs } from './systems';

// Export all incendie DTUs combined
export const incendieDTUs: DTU[] = [
  ...buildingClassificationsDTUs,
  ...desenfumageDTUs,
  ...incendieSystemsDTUs,
  ...erpDTUs,
  ...erpFichesDTUs,
  ...logementDTUs,
  ...parkingDTUs
];
