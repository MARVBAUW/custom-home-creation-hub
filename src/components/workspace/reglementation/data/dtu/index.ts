
import { DTU } from '../../dtu/types';
import { grosOeuvreDTUs } from './grosOeuvre';
import { revetementsDTUs } from './revetements';
import { isolationDTUs } from './isolation';
import { menuiseriesDTUs } from './menuiseries';
import { plomberieDTUs } from './plomberie';
import { electriciteDTUs } from './electricite';
import { toitureDTUs } from './toiture';
import { fondationsDTUs } from './fondations';
import { facadeDTUs } from './facade';
import { assainissementDTUs } from './assainissement';
import { incendieDTUs } from './incendie';
import { accessibiliteDTUs } from './accessibilite';
import { urbanismeDTUs } from './urbanisme';

// Combine all DTU data from different categories
export const dtuRecaps: DTU[] = [
  ...grosOeuvreDTUs,
  ...revetementsDTUs,
  ...isolationDTUs,
  ...menuiseriesDTUs,
  ...plomberieDTUs,
  ...electriciteDTUs,
  ...toitureDTUs,
  ...fondationsDTUs,
  ...facadeDTUs,
  ...assainissementDTUs,
  ...incendieDTUs,
  ...accessibiliteDTUs,
  ...urbanismeDTUs
];
