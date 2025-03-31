
import { DTU } from '../../dtu/types';
import { incendieDTUs } from './incendie';
import { accessibiliteDTUs } from './accessibilite';
import { acoustiqueDTUs } from './acoustique';
import { thermiqueDTUs } from './thermique';
import { dtuDTUs } from './dtu-list';
import { urbanismeDTUs } from './urbanisme';
import { eurocodeDTUs } from './eurocode';
import { hygrometrieDTUs } from './hygrometrie';
import { ratingClassificationsDTUs } from './ratings';

// Combine all DTUs from different categories
export const allDTUs: DTU[] = [
  ...dtuDTUs,
  ...incendieDTUs,
  ...accessibiliteDTUs, 
  ...acoustiqueDTUs,
  ...thermiqueDTUs,
  ...urbanismeDTUs,
  ...eurocodeDTUs,
  ...hygrometrieDTUs,
  ...ratingClassificationsDTUs
];
