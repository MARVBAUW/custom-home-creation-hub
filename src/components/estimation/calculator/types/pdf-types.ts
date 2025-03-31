
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

export interface AutoTable {
  previous?: any;
  (options: UserOptions): any;
}

// Extend the jsPDF typing to include autoTable plugin
declare module 'jspdf' {
  interface jsPDF {
    autoTable: AutoTable;
    internal: JsPDFInternal;
  }
}
