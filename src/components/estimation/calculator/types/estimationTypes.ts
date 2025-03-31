
export interface EstimationResponseData {
  constructionCosts: {
    structuralWork: number;
    finishingWork: number;
    technicalLots: number;
    externalWorks: number;
    total: number;
  };
  fees: {
    architect: number;
    technicalStudies: number;
    other: number;
    total: number;
  };
  otherCosts: {
    insurance: number;
    taxes: number;
    contingency: number;
    total: number;
  };
  totalAmount: number;
  timeline: {
    design: number;
    permits: number;
    bidding: number;
    construction: number;
    total: number;
  };
}
