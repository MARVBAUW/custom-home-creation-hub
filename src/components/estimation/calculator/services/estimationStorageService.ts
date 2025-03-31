
import { FormData } from '../types';
import { Json } from '../types/json';
import { supabase } from '@/lib/supabase';

// Function to save an estimation to local storage
export const saveEstimationToLocalStorage = (formData: FormData, estimationAmount: number) => {
  const data = {
    formData,
    estimationAmount,
    createdAt: new Date().toISOString(),
  };
  
  localStorage.setItem('saved_estimation', JSON.stringify(data));
  return true;
};

// Function to load estimation from local storage
export const loadEstimationFromLocalStorage = () => {
  const savedData = localStorage.getItem('saved_estimation');
  if (!savedData) return null;
  
  try {
    return JSON.parse(savedData);
  } catch (error) {
    console.error('Error parsing saved estimation:', error);
    return null;
  }
};

// Function to clear estimation from local storage
export const clearEstimationFromLocalStorage = () => {
  localStorage.removeItem('saved_estimation');
  return true;
};

// Function to save estimation to Supabase database
export const saveEstimationToDatabase = async (
  userId: string,
  formData: FormData,
  estimationAmount: number
) => {
  try {
    const projectType = formData.projectType || 'Non spécifié';
    const surface = formData.surface || 'Non spécifié';
    const location = formData.city || 'Non spécifiée';
    
    // Title is generated from the project data
    const title = `${projectType} - ${surface}m² - ${location}`;
    
    // Define content object that matches Json type
    const content: Json = {
      formData: JSON.parse(JSON.stringify(formData)) as Json, // Serialize and parse to ensure it matches Json type
      estimationAmount,
      createdAt: new Date().toISOString(),
      projectType,
      surface,
      location
    };
    
    const { data, error } = await supabase
      .from('simulations')
      .insert({
        user_id: userId,
        title,
        type: 'calculator',
        is_temporary: false,
        content
      });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving estimation to database:', error);
    throw error;
  }
};

// Function to load user's estimations from database
export const loadUserEstimations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('simulations')
      .select('*')
      .eq('user_id', userId)
      .eq('type', 'calculator')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error loading user estimations:', error);
    throw error;
  }
};
