
import React from 'react';
import { Button } from "@/components/ui/button";

interface ProfileTabContentProps {
  client: { 
    projectDescription: string 
  };
}

const ProfileTabContent: React.FC<ProfileTabContentProps> = ({ client }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Description du projet</h3>
        <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
          <p className="text-sm text-gray-700">{client.projectDescription}</p>
        </div>
      </div>
      
      <div className="pt-4">
        <h3 className="text-lg font-medium mb-3">Notes internes</h3>
        <textarea 
          className="w-full min-h-[120px] p-3 text-sm border border-gray-200 rounded-md focus:ring-2 focus:ring-khaki-500 focus:border-transparent outline-none"
          placeholder="Ajoutez des notes internes sur ce client ici..."
        />
        <div className="mt-2 flex justify-end">
          <Button size="sm" className="bg-khaki-600 hover:bg-khaki-700">
            Enregistrer les notes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabContent;
