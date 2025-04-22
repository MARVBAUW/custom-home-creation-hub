
import { ensureNumber } from './typeConversions';

/**
 * Calculate roof covering renovation cost
 * @param type Roof type
 * @param area Roof area in m²
 * @returns Cost in euros
 */
export const calculateRoofCoveringRenovCost = (type: string, area: number): number => {
  const baseRate = type === 'tuiles' ? 120 : 
                  type === 'ardoise' ? 150 : 
                  type === 'zinc' ? 180 : 
                  type === 'toit-terrasse' ? 200 : 
                  100; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate roof frame renovation cost
 * @param type Roof type
 * @param area Roof area in m²
 * @returns Cost in euros
 */
export const calculateRoofFrameRenovCost = (type: string, area: number): number => {
  const baseRate = type === 'bois' ? 200 : 
                  type === 'metal' ? 250 : 
                  type === 'mixte' ? 230 : 
                  180; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate façade renovation cost
 * @param facadeType Facade type
 * @param area Facade area in m²
 * @returns Cost in euros
 */
export const calculateFacadeRenovCost = (facadeType: string, area: number): number => {
  const baseRate = facadeType === 'enduit' ? 80 : 
                  facadeType === 'pierre' ? 140 : 
                  facadeType === 'brique' ? 110 : 
                  facadeType === 'bois' ? 120 : 
                  90; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate grosses-oeuvres renovation cost
 * @param type Type of work
 * @param area Area in m²
 * @returns Cost in euros
 */
export const calculateGrosOeuvreRenovCost = (type: string, area: number): number => {
  const baseRate = type === 'mur-porteur' ? 350 : 
                  type === 'fondation' ? 450 : 
                  type === 'dalle' ? 200 : 
                  300; // default rate
  
  return baseRate * ensureNumber(area);
};

/**
 * Calculate electrical installation cost
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateElectricalCost = (surface: number): number => {
  return 85 * ensureNumber(surface);
};

/**
 * Calculate plumbing installation cost
 * @param bathroomCount Number of bathrooms
 * @param kitchenCount Number of kitchens
 * @returns Cost in euros
 */
export const calculatePlumbingCost = (bathroomCount: number, kitchenCount: number): number => {
  return (3500 * ensureNumber(bathroomCount)) + (2000 * ensureNumber(kitchenCount));
};

/**
 * Calculate heating system cost
 * @param type Heating system type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateHeatingCost = (type: string, surface: number): number => {
  const baseRate = type === 'gaz' ? 100 : 
                  type === 'electrique' ? 80 : 
                  type === 'pompe-chaleur' ? 150 : 
                  type === 'chauffage-solaire' ? 200 : 
                  120; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate roof cost
 * @param type Roof type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateRoofCost = (type: string, surface: number): number => {
  const baseRate = type === 'tuiles' ? 150 : 
                  type === 'ardoise' ? 200 : 
                  type === 'zinc' ? 180 : 
                  type === 'toit-terrasse' ? 220 : 
                  160; // default rate
  
  return baseRate * ensureNumber(surface);
};

/**
 * Calculate tile flooring cost
 * @param type Tile type
 * @param surface Surface in m²
 * @returns Cost in euros
 */
export const calculateTileFlooringCost = (type: string, surface: number): number => {
  const baseRate = type === 'ceramique' ? 80 : 
                  type === 'gres' ? 100 : 
                  type === 'pierre' ? 150 : 
                  type === 'marbre' ? 200 : 
                  90; // default rate
  
  return baseRate * ensureNumber(surface);
};
