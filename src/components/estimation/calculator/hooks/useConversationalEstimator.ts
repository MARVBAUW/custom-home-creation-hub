
import { useState, useCallback } from 'react';
import { FormData, ConversationState } from '../types/formTypes';
import { ensureNumber } from '../utils/typeConversions';

const useConversationalEstimator = () => {
  // Initialize form data state
  const [formData, setFormData] = useState<FormData>({
    projectType: 'renovation', // Default value
    surface: 0,
    location: '',
    constructionType: '',
    bedrooms: 0,
    bathrooms: 0,
    city: '',
  });
  
  // Initialize conversation state
  const [conversationState, setConversationState] = useState<ConversationState>({
    currentStep: 'initial',
    askedQuestions: [],
    completedFields: [],
    formProgress: 0,
    messages: [], // Initialize empty messages array
  });
  
  // Function to update form data
  const updateFormData = useCallback((newData: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  }, []);
  
  // Function to calculate estimation
  const calculateEstimation = useCallback(() => {
    // Basic calculation logic
    const surface = ensureNumber(formData.surface);
    const baseRate = formData.constructionType === 'neuf' ? 1500 : 1200;
    const estimatedCost = surface * baseRate;
    
    // Update form data with calculated cost
    updateFormData({
      montantT: estimatedCost
    });
    
    // Return the calculation
    return estimatedCost;
  }, [formData, updateFormData]);
  
  // Function to reset form data
  const resetFormData = useCallback(() => {
    setFormData({
      projectType: 'renovation',
      surface: 0,
      location: '',
      constructionType: '',
      bedrooms: 0,
      bathrooms: 0,
      city: '',
    });
    
    setConversationState({
      currentStep: 'initial',
      askedQuestions: [],
      completedFields: [],
      formProgress: 0,
      messages: [],
    });
  }, []);
  
  return {
    formData,
    conversationState,
    updateFormData,
    calculateEstimation,
    resetFormData,
    setConversationState
  };
};

export default useConversationalEstimator;
