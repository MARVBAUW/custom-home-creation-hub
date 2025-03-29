
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ConversationalForm from './ConversationalForm';

const EstimationCalculator: React.FC = () => {
  return (
    <Card className="shadow-sm border-0">
      <CardContent className="p-0 sm:p-2">
        <div className="relative">
          {/* Un seul composant de formulaire */}
          <ConversationalForm />
        </div>
      </CardContent>
    </Card>
  );
};

export default EstimationCalculator;
