
export interface PDFGenerationOptions {
  includeBreakdown?: boolean;
  includeContactInfo?: boolean;
  includeTimeline?: boolean;
  includeBankReport?: boolean;
  includeHeader?: boolean;
  includeFooter?: boolean;
  includeDetails?: boolean;
  includeLogo?: boolean;
  includeTerrainPrice?: boolean;
  clientInfo?: boolean;
  companyLogo?: boolean;
  logo?: string;
  companyName?: string;
  companyAddress?: string;
  companyContact?: string;
  fileName?: string;
}

export interface PDFReportData {
  title: string;
  subtitle?: string;
  date: string;
  reference?: string;
  client?: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  project: {
    type: string;
    location: string;
    surface: number;
    constructionType: string;
    description?: string;
  };
  costs: {
    category: string;
    name: string;
    amount: number;
    percentage?: number;
  }[];
  summary: {
    subtotal: number;
    taxes: number;
    total: number;
  };
  options?: {
    includeVAT: boolean;
    showDetails: boolean;
    currency: string;
  };
}
