
import React from 'react';
import { FormData } from './types';
import DetailedEstimationReport from './DetailedEstimationReport';

interface CategoryAmount {
  category: string;
  amount: number;
  details?: string;
}

interface EstimationSummaryReportProps {
  formData: FormData;
  estimationResult: number | null;
  categoriesAmounts: CategoryAmount[];
}

const EstimationSummaryReport: React.FC<EstimationSummaryReportProps> = ({
  formData,
  estimationResult,
  categoriesAmounts
}) => {
  return (
    <DetailedEstimationReport
      formData={formData}
      estimationResult={estimationResult}
      categoriesAmounts={categoriesAmounts}
    />
  );
};

export default EstimationSummaryReport;
