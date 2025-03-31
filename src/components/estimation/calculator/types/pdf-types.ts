
import { jsPDF } from 'jspdf';

// Define AutoTable type
export interface AutoTableSettings {
  startY?: number;
  head?: any[][];
  body?: any[][];
  foot?: any[][];
  styles?: any;
  headStyles?: any;
  bodyStyles?: any;
  footStyles?: any;
  alternateRowStyles?: any;
  columnStyles?: any;
  margin?: any;
  theme?: string;
  tableWidth?: string | number;
  showHead?: 'everyPage' | 'firstPage' | 'never';
  showFoot?: 'everyPage' | 'lastPage' | 'never';
  tableLineWidth?: number;
  tableLineColor?: number | string;
  pageBreak?: 'auto' | 'avoid';
  rowPageBreak?: 'auto' | 'avoid';
  horizontalPageBreak?: boolean;
  horizontalPageBreakRepeat?: number | string;
  didDrawPage?: (data: any) => void;
  didDrawCell?: (data: any) => void;
  willDrawCell?: (data: any) => void;
  didParseCell?: (data: any) => void;
  [key: string]: any;
}

// Extend AutoTable with previous property
export interface AutoTable {
  (options: AutoTableSettings): any;
  previous: {
    finalY: number;
    pageNumber: number;
  };
}

// Define the types for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: AutoTable;
    internal: {
      getNumberOfPages: () => number;
      [key: string]: any;
    };
  }
}

export {};
