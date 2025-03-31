
import { FormData } from '../types/formTypes';
import { toBoolean, toOuiNon, toNumber, convertToType } from './montantUtils';

// Utility function to adapt data between different form interfaces
export const adaptFormData = (
    sourceData: any, 
    targetInterface: 'estimation' | 'form' = 'form'
): any => {
    // Create a copy of the source data
    const adaptedData = { ...sourceData };
    
    // Convert types based on the target interface
    if (targetInterface === 'form') {
        // Converting from API/estimation data to form data
        if (typeof adaptedData.terassementsViabilisation === 'boolean') {
            adaptedData.terassementsViabilisation = toOuiNon(adaptedData.terassementsViabilisation);
        }
        
        if (typeof adaptedData.retraitTerre === 'boolean') {
            adaptedData.retraitTerre = toOuiNon(adaptedData.retraitTerre);
        }
        
        // Convert numeric values to strings if needed
        if (typeof adaptedData.surface === 'number') {
            adaptedData.surface = String(adaptedData.surface);
        }
        
        // Convert other fields as needed
        // ... add other conversions as required
        
    } else {
        // Converting from form data to API/estimation data
        if (typeof adaptedData.terassementsViabilisation === 'string') {
            adaptedData.terassementsViabilisation = toBoolean(adaptedData.terassementsViabilisation);
        }
        
        if (typeof adaptedData.retraitTerre === 'string') {
            adaptedData.retraitTerre = toBoolean(adaptedData.retraitTerre);
        }
        
        // Convert string values to numbers if needed
        if (typeof adaptedData.surface === 'string') {
            adaptedData.surface = parseFloat(adaptedData.surface) || 0;
        }
        
        // Convert other fields as needed
        // ... add other conversions as required
    }
    
    return adaptedData;
};

// Type adapter function to handle updates between different form types
export const createTypeAdaptingUpdater = (updateFunction: (data: Partial<FormData>) => void) => {
    return (data: any) => {
        // Create a copy of the data with adapted types
        const adaptedData: Partial<FormData> = {};
        
        // Process each field to ensure types match FormData expectations
        Object.keys(data).forEach(key => {
            const value = data[key];
            
            // Special handling for boolean/string conversions
            if (key === 'terassementsViabilisation' || key === 'retraitTerre') {
                if (typeof value === 'string' && (value === 'OUI' || value === 'NON')) {
                    adaptedData[key] = value === 'OUI';
                } else if (typeof value === 'boolean') {
                    adaptedData[key] = value;
                }
            }
            // Handle numeric conversions
            else if (
                key === 'surface' ||
                key === 'budget' ||
                key === 'niveaux' ||
                key === 'chambres'
            ) {
                if (typeof value === 'string') {
                    adaptedData[key] = parseFloat(value) || 0;
                } else if (typeof value === 'number') {
                    adaptedData[key] = value;
                }
            }
            // For all other fields, pass the value as is
            else {
                adaptedData[key] = value;
            }
        });
        
        // Call the original update function with the adapted data
        updateFunction(adaptedData);
    };
};

// Utility function for stringifying nested objects/arrays for display
export const stringifyForDisplay = (value: any): string => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
};

// Function to sanitize form data before submission
export const sanitizeFormData = (formData: any): any => {
    const sanitized = { ...formData };
    
    // Convert string numbers to actual numbers
    Object.keys(sanitized).forEach(key => {
        const value = sanitized[key];
        
        if (typeof value === 'string' && !isNaN(Number(value))) {
            // Check if it's a numeric string
            sanitized[key] = Number(value);
        }
        else if (value === 'OUI') {
            sanitized[key] = true;
        }
        else if (value === 'NON') {
            sanitized[key] = false;
        }
    });
    
    return sanitized;
};
