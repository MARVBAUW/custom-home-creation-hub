
// Fonction pour calculer l'estimation
export const calculateEstimation = (formData: any): number => {
  // Prix de base par mètre carré selon le type de projet
  let basePrice = 0;
  const surface = parseInt(formData.surface) || 0;
  
  // Base price per square meter depending on project type
  switch (formData.projectType) {
    case "construction":
      basePrice = 2000;
      break;
    case "renovation":
      basePrice = 1200;
      break;
    case "extension":
      basePrice = 1800;
      break;
    case "division":
      basePrice = 1500;
      break;
    default:
      basePrice = 1000;
  }
  
  // Multiplicateurs basés sur le type de terrain
  let terrainMultiplier = 1;
  if (formData.terrainType.includes("rocky")) terrainMultiplier *= 1.2;
  if (formData.terrainType.includes("clayey")) terrainMultiplier *= 1.1;
  if (formData.terrainType.includes("sloped")) terrainMultiplier *= 1.15;

  // Multiplicateurs basés sur le type de mur
  let wallMultiplier = 1;
  switch (formData.wallType) {
    case "brick":
      wallMultiplier = 1.1;
      break;
    case "concrete":
      wallMultiplier = 1.05;
      break;
    case "stone":
      wallMultiplier = 1.3;
      break;
    case "cinder":
      wallMultiplier = 1;
      break;
    case "porotherm":
      wallMultiplier = 1.2;
      break;
    case "cellularConcrete":
      wallMultiplier = 1.15;
      break;
  }

  // Multiplicateurs basés sur le type de toit
  let roofMultiplier = 1;
  switch (formData.roofType) {
    case "accessibleTerrace":
      roofMultiplier = 1.2;
      break;
    case "inaccessibleTerrace":
      roofMultiplier = 1.1;
      break;
    case "industrialFrame":
      roofMultiplier = 1;
      break;
    case "traditionalFrame":
      roofMultiplier = 1.15;
      break;
  }

  // Multiplicateurs basés sur le type d'isolation
  let insulationMultiplier = 1;
  switch (formData.insulationType) {
    case "basic":
      insulationMultiplier = 1;
      break;
    case "performance":
      insulationMultiplier = 1.1;
      break;
    case "ultraPerformance":
      insulationMultiplier = 1.2;
      break;
  }

  // Multiplicateurs basés sur le type d'installation électrique
  let electricalMultiplier = 1;
  switch (formData.electricalType) {
    case "basic":
      electricalMultiplier = 1;
      break;
    case "advanced":
      electricalMultiplier = 1.1;
      break;
    case "highEnd":
      electricalMultiplier = 1.2;
      break;
    case "highEndWithDomotics":
      electricalMultiplier = 1.3;
      break;
  }

  // Calcul du prix final
  const totalMultiplier = terrainMultiplier * wallMultiplier * roofMultiplier * insulationMultiplier * electricalMultiplier;
  const finalPrice = Math.round(basePrice * surface * totalMultiplier);
  
  return finalPrice;
};
