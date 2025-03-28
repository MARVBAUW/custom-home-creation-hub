
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface BusinessLoadingStateProps {
  className?: string;
}

const BusinessLoadingState: React.FC<BusinessLoadingStateProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-md p-4 space-y-4 ${className}`}>
      <Skeleton className="h-5 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
};

export default BusinessLoadingState;
