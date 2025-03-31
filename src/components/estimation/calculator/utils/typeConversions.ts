
import React from 'react';

/**
 * Converts a value to a number
 */
export function ensureNumber(value: any): number {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  
  if (typeof value === 'string') {
    // Remove currency symbols, commas, etc.
    const cleanValue = value.replace(/[^0-9.-]+/g, '');
    return parseFloat(cleanValue) || 0;
  }
  
  return 0;
}

/**
 * Converts a value to a boolean
 */
export function ensureBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (!value) return false;
  
  if (typeof value === 'string') {
    const lowercaseValue = value.toLowerCase().trim();
    return lowercaseValue === 'true' || 
           lowercaseValue === 'yes' || 
           lowercaseValue === 'oui' || 
           lowercaseValue === '1';
  }
  
  return Boolean(value);
}

/**
 * Converts a value to a string
 */
export function ensureString(value: any): string {
  if (typeof value === 'string') return value;
  if (!value && value !== 0) return '';
  
  return String(value);
}

/**
 * Converts a value to an array
 */
export function ensureArray<T>(value: any): T[] {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  
  return [value] as T[];
}

/**
 * Convert a string percentage to a decimal value
 */
export function percentageToDecimal(value: string | number): number {
  if (typeof value === 'number') return value / 100;
  
  // Remove % symbol if present
  const cleanValue = value.replace('%', '');
  return parseFloat(cleanValue) / 100 || 0;
}

/**
 * Safely render any value as a React node
 */
export function safeRenderValue(value: any): React.ReactNode {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (
    typeof value === 'string' || 
    typeof value === 'number' || 
    typeof value === 'boolean'
  ) {
    return String(value);
  }
  
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  
  if (typeof value === 'object') {
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    return JSON.stringify(value);
  }
  
  return '';
}
