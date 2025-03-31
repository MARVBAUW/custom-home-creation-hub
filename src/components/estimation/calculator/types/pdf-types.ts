
// Define proper types for jsPDF with AutoTable
import { UserOptions } from 'jspdf-autotable';

export interface PubSub {
  publish: (eventName: string, ...args: any[]) => void;
  subscribe: (eventName: string, callback: (...args: any[]) => void) => void;
  unsubscribe: (eventName: string, callback: (...args: any[]) => void) => void;
}

export interface PageSize {
  width: number;
  getWidth: () => number;
  height: number;
  getHeight: () => number;
}

export interface JsPDFInternal {
  events: PubSub;
  scaleFactor: number;
  pageSize: PageSize;
  pages: number[];
  getNumberOfPages: () => number;
  getEncryptor: (objectId: number) => (data: string) => string;
  [key: string]: any;
}

// Define a proper interface for autoTable
export interface AutoTableInstance {
  previous?: any;
  (options: UserOptions): any;
}

// Define the jsPDF interface
export interface JSPDF {
  autoTable: AutoTableInstance;
  internal: JsPDFInternal;
  // Add other jsPDF methods here as needed
  text: (text: string, x: number, y: number, options?: any) => JSPDF;
  line: (x1: number, y1: number, x2: number, y2: number, style?: any) => JSPDF;
  addPage: () => JSPDF;
  setFontSize: (size: number) => JSPDF;
  setFont: (fontName: string, fontStyle?: string) => JSPDF;
  setTextColor: (r: number, g: number, b: number) => JSPDF;
  // ...add other methods as needed
}

// Extend the global jspdf namespace
declare global {
  namespace jspdf {
    interface jsPDF extends JSPDF {}
  }
}

// Export to match the previous interface but with corrected types
export interface AutoTable {
  previous?: any;
  (options: UserOptions): any;
}
