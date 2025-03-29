
import { DTU } from '../../dtu/types';
import { menuiseriesDTUs } from './menuiseries';
import { grosOeuvreDTUs } from './grosOeuvre';
import { fondationsDTUs } from './fondations';
import { facadeDTUs } from './facade';
import { plomberieDTUs } from './plomberie';
import { electriciteDTUs } from './electricite';
import { assainissementDTUs } from './assainissement';
import { isolationDTUs } from './isolation';
import { revetementsDTUs } from './revetements';
import { toitureDTUs } from './toiture';
import { incendieDTUs } from './incendie';
import { accessibiliteDTUs } from './accessibilite';
import { urbanismeDTUs } from './urbanisme';
import { thermiqueDTUs } from './thermique';
import { acoustiqueDTUs } from './acoustique';

// Export all DTUs combined
export const dtuRecaps: DTU[] = [
  ...menuiseriesDTUs,
  ...grosOeuvreDTUs,
  ...fondationsDTUs,
  ...facadeDTUs,
  ...plomberieDTUs,
  ...electriciteDTUs,
  ...assainissementDTUs,
  ...isolationDTUs,
  ...revetementsDTUs,
  ...toitureDTUs,
  ...incendieDTUs,
  ...accessibiliteDTUs,
  ...urbanismeDTUs,
  ...thermiqueDTUs,
  ...acoustiqueDTUs
];
