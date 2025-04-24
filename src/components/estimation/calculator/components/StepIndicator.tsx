
import React from 'react';
import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex items-center">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep === index
                  ? "bg-blue-600 text-white"
                  : index < currentStep
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-400"
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "h-0.5 w-12",
                  index < currentStep
                    ? "bg-blue-600"
                    : "bg-gray-200"
                )}
              />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
