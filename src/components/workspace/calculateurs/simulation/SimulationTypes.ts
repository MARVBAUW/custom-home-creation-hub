
// Type definitions for simulation components
export interface Simulation {
  id?: string;
  title: string;
  type: 'calculator' | 'simulation' | 'note' | string; // Allowing string for compatibility
  content: any;
  created_at?: string;
  updated_at?: string;
  is_temporary: boolean;
}

// Function to validate and convert the type
export const validateSimulationType = (type: string): 'calculator' | 'simulation' | 'note' => {
  if (type === 'calculator' || type === 'simulation' || type === 'note') {
    return type as 'calculator' | 'simulation' | 'note';
  }
  // Default value if the type isn't recognized
  return 'calculator';
};
