
// Type definitions for jsPDF and jspdf-autotable
import jsPDF from 'jspdf';

// Fix PDFGenerationOptions interface
export interface PDFGenerationOptions {
  includeDetails?: boolean;
  includeLogo?: boolean;
  includeContactInfo?: boolean;
  includeBreakdown?: boolean;
  includeTerrainPrice?: boolean;
  includeTimeline?: boolean;
  includeDetailedBreakdown?: boolean;
  clientInfo?: boolean;
  companyLogo?: boolean;
  fileName?: string;
}

// Extend the jsPDF internal type
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF & {
      lastAutoTable: {
        finalY: number;
      };
    };
    internal: {
      getNumberOfPages: () => number;
      events: any;
      scaleFactor: number;
      pageSize: {
        width: number;
        getWidth: () => number;
        height: number;
        getHeight: () => number;
      };
      pages: number[];
      getEncryptor(objectId: number): (data: string) => string;
    };
  }
}

// Export enhanced jsPDF type
export type EnhancedJsPDF = jsPDF;
