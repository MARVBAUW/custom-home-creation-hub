
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Type guard function to check if a value is a valid Json type
export function isJson(value: any): value is Json {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    value === null
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.every(item => isJson(item));
  }

  if (typeof value === 'object' && value !== null) {
    return Object.values(value).every(v => v === undefined || isJson(v));
  }

  return false;
}

// Function to safely convert an object to Json
export function toJson(obj: any): Json {
  return JSON.parse(JSON.stringify(obj));
}
