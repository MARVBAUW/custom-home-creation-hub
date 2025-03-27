
export interface InvestmentData {
  purchasePrice: number;
  notaryFees: number;
  renovationCost: number;
  furnitureCost: number;
  propertyTax: number;
  managementFees: number;
  condoFees: number;
  insurance: number;
  maintenanceProvision: number;
  vacancyRate: number;
  unpaidRate: number;
  rentalIncome: number;
  propertyAppreciation: number;
  loanAmount: number;
  loanRate: number;
  loanDuration: number;
  loanInsuranceRate: number;
  area: number;
  fiscalOption: 'real' | 'micro' | 'lmnp' | 'furnished';
  includeAmortization: boolean;
  propertyAge: number;
  rentalCharges: number;
  projectName: string;
  location: string;
  propertyType: string;
}

export interface InvestmentResults {
  cashFlow: number;
  grossYield: number;
  netYield: number;
  roi: number;
  monthlyPayment: number;
  totalInvestment: number;
  amortizationPeriod: number;
  cashOnCash: number;
  irr10Years: number;
  totalMonthlyExpenses: number;
  monthlyCashFlow: number;
  initialInvestment: number;
}

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28554', '#C694D7'];
