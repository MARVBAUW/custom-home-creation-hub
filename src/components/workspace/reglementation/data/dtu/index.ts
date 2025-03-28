
import { DTU } from '../../dtu/types';
import { grosOeuvreDTUs } from './grosOeuvre';
import { revetementsDTUs } from './revetements';
import { isolationDTUs } from './isolation';
import { menuiseriesDTUs } from './menuiseries';

// Combine all DTU data from different categories
export const dtuRecaps: DTU[] = [
  ...grosOeuvreDTUs,
  ...revetementsDTUs,
  ...isolationDTUs,
  ...menuiseriesDTUs
];
