
import { PubSub } from 'jspdf';

// For extending jsPDF with autoTable
interface AutoTableConfig {
  startY?: number;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
  styles?: { cellPadding?: number; fontSize?: number; font?: string; textColor?: string; fillColor?: string };
  headStyles?: { fillColor?: string; textColor?: string; fontStyle?: string; halign?: string };
  bodyStyles?: { fillColor?: string; textColor?: string; fontStyle?: string; halign?: string };
  alternateRowStyles?: { fillColor?: string };
  columnStyles?: { [key: string]: { cellWidth?: number; halign?: string; fontStyle?: string } };
  head?: Array<Array<any>>;
  body?: Array<Array<any>>;
  foot?: Array<Array<any>>;
  didDrawPage?: (data: any) => void;
  didParseCell?: (data: any) => void;
  willDrawCell?: (data: any) => void;
  didDrawCell?: (data: any) => void;
  theme?: 'striped' | 'grid' | 'plain';
  tableWidth?: string | number;
  showHead?: 'everyPage' | 'firstPage' | 'never';
  showFoot?: 'everyPage' | 'lastPage' | 'never';
}

interface AutoTable {
  (options: AutoTableConfig): any;
  previous: (options: any) => any;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: AutoTable;
    internal: {
      [key: string]: any;
      getNumberOfPages: () => number;
    };
  }
}

export {};
