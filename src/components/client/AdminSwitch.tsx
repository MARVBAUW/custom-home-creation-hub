import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminSwitchProps {
  isAdminMode: boolean;
  onToggle: (checked: boolean) => void;
}

const AdminSwitch = ({ isAdminMode, onToggle }: AdminSwitchProps) => {
  const { user } = useAuth();
  
  // For debugging
  console.log("AdminSwitch - User data:", user);
  console.log("AdminSwitch - Is admin?", user?.user_metadata?.is_admin);
  
  // Check if the user is an administrator (for testing purposes, showing for all users)
  // In production, uncomment the line below and remove the test override
  // const isAdmin = user?.user_metadata?.is_admin === true;
  const isAdmin = true; // Temporarily show for all users for testing
  
  // If the user isn't admin, don't render the switch
  if (!isAdmin) return null;
  
  return (
    <div className="flex items-center space-x-3 bg-white rounded-lg px-3 py-2 border border-gray-200 shadow-sm">
      <Shield className={`h-4 w-4 ${isAdminMode ? 'text-red-500' : 'text-gray-400'}`} />
      <div className="flex items-center space-x-2">
        <Switch 
          id="admin-mode" 
          checked={isAdminMode}
          onCheckedChange={onToggle}
          className={isAdminMode ? 'bg-red-500' : ''}
        />
        <Label htmlFor="admin-mode" className="text-sm font-medium">
          {isAdminMode ? 'Mode administrateur' : 'Mode client'}
        </Label>
      </div>
    </div>
  );
};

export default AdminSwitch;
