
export function calculateFees(constructionCost: number) {
  // Calculate different fee components
  const architectFees = constructionCost * 0.08;
  const engineeringFees = constructionCost * 0.03;
  const projectManagement = constructionCost * 0.05;
  const permits = constructionCost * 0.02;
  const insurance = constructionCost * 0.02;
  const contingency = constructionCost * 0.05;
  const taxes = constructionCost * 0.03;
  
  // Total fees
  const totalFees = architectFees + engineeringFees + projectManagement + 
                    permits + insurance + contingency + taxes;
  
  return {
    architect: architectFees,
    engineeringFees,
    architectFees,
    projectManagement,
    permits,
    insurance,
    contingency,
    taxes,
    total: totalFees
  };
}
