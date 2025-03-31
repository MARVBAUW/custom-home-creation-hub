
import { incendieDTUs } from "./incendie";
import { accessibiliteDTUs } from "./accessibilite";
import { acoustiqueDTUs } from "./acoustique";
import { thermiqueDTUs } from "./thermique";
import { dtuDTUs } from "./dtu-list";
import { urbanismeDTUs } from "./urbanisme";
import { eurocodeDTUs } from "./eurocode";
import { hygrometrieDTUs } from "./hygrometrie";
import { ratingClassificationsDTUs } from "./ratings";

export const allDTUs = [
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

// Also export DTU recaps for backward compatibility
export const dtuRecaps = allDTUs;
