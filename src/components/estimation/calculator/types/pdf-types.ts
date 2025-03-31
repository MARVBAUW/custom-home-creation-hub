
import { jsPDF } from 'jspdf';
import { UserOptions } from 'jspdf-autotable';

// Extended jsPDF type to include autoTable and other custom properties
export interface JsPDFInternal {
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
  setPage: (pageNumber: number) => jsPDF;
}

// Extended jsPDF class with autoTable method
export interface ExtendedJsPDF extends jsPDF {
  autoTable: (options: UserOptions) => ExtendedJsPDF;
  internal: JsPDFInternal;
  getNumberOfPages: () => number;
}

// PDF generation options
export interface PDFGenerationOptions {
  includeTerrainPrice?: boolean;
  includeTimeline?: boolean;
  includeDetailedBreakdown?: boolean;
  clientInfo?: boolean;
  companyLogo?: boolean;
  fileName?: string;
}

// PDF document section
export interface PDFSection {
  title: string;
  content: Array<{
    label: string;
    value: string | number;
  }>;
}
