
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FileMacroWarningProps {
  macroNote: string;
}

const FileMacroWarning: React.FC<FileMacroWarningProps> = ({ macroNote }) => {
  if (!macroNote) return null;
  
  return (
    <div className="p-4 border-t border-gray-200">
      <Alert className="bg-amber-50 border-amber-200">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-700 text-sm">
          {macroNote}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default FileMacroWarning;
