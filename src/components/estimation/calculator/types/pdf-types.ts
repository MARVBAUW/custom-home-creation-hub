
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

// Extend the jsPDF typing to include autoTable plugin
declare global {
  namespace jspdf {
    interface jsPDF {
      autoTable: AutoTableInstance;
      internal: JsPDFInternal;
    }
  }
}

// Export to match the previous interface but with corrected types
export interface AutoTable {
  previous?: any;
  (options: UserOptions): any;
}
