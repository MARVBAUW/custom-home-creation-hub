
import { jsPDF } from 'jspdf';

// Define a type for the internal property that's compatible with both uses
interface PDFInternal {
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
  getNumberOfPages?: () => number;
}

// Extended jsPDF with additional methods used in our application
export interface EnhancedJsPDF extends jsPDF {
  autoTable: (options: any) => any;
  internal: PDFInternal;
  setTextColor: (r: number, g: number, b: number) => any;
  setFontSize: (size: number) => any;
  text: (text: string, x: number, y: number, options?: any) => any;
  setPage: (pageNumber: number) => any;
  line: (x1: number, y1: number, x2: number, y2: number) => any;
  rect: (x: number, y: number, w: number, h: number, style: string) => any;
  addImage: (imageData: any, format: string, x: number, y: number, width: number, height: number) => any;
}

// Options for PDF Generation
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
