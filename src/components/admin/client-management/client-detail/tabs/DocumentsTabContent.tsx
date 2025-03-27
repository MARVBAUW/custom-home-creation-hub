
import React from 'react';
import { Button } from "@/components/ui/button";

const DocumentsTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Documents</h3>
        <div className="bg-gray-50 p-6 rounded-md border border-dashed border-gray-200 text-center">
          <h4 className="font-medium mb-2">Aucun document</h4>
          <p className="text-sm text-gray-500 mb-4">Ce client n'a pas encore de documents associés.</p>
          <Button className="bg-khaki-600 hover:bg-khaki-700">
            Ajouter un document
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTabContent;
