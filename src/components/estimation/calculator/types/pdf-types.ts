
// Type definitions for jsPDF and jspdf-autotable
import jsPDF from 'jspdf';
import { UserOptions } from 'jspdf-autotable';

// Export PDFGenerationOptions interface
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

// Extend the jsPDF internal type with proper typing
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF & {
      lastAutoTable: {
        finalY: number;
      };
    };
    internal: {
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
      getNumberOfPages: () => number;
    };
  }
}

// Export enhanced jsPDF type
export type EnhancedJsPDF = jsPDF;
