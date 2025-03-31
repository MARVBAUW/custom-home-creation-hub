
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  company: string;
}

export const useProfileData = (user: User | null) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    company: '',
  });

  // Load user data when user object changes
  useEffect(() => {
    if (user) {
      setProfileData({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.user_metadata?.address || '',
        company: user.user_metadata?.company || '',
      });
    }
  }, [user]);

  const updateProfile = (data: ProfileData) => {
    // Here we would implement the profile update logic using Supabase
    // For now, just update the local state
    setProfileData(data);
  };

  return { profileData, updateProfile };
};
