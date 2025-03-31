
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Define the jsPDF extensions for TypeScript
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: UserOptions) => jsPDF;
    internal: JsPDFInternal;
  }
}

// Define UserOptions for autoTable
export interface UserOptions {
  head?: any[][];
  body?: any[][];
  foot?: any[][];
  startY?: number;
  margin?: any;
  pageBreak?: 'auto' | 'avoid';
  rowPageBreak?: 'auto' | 'avoid';
  tableWidth?: 'auto' | 'wrap' | number;
  showHead?: 'everyPage' | 'firstPage' | 'never';
  showFoot?: 'everyPage' | 'lastPage' | 'never';
  tableLineWidth?: number;
  tableLineColor?: number | string;
  theme?: 'striped' | 'grid' | 'plain';
  styles?: Styles;
  headStyles?: Styles;
  bodyStyles?: Styles;
  footStyles?: Styles;
  alternateRowStyles?: Styles;
  columnStyles?: {
    [key: number]: Styles;
  };
  didParseCell?: (data: CellHookData) => void;
  willDrawCell?: (data: CellHookData) => void;
  didDrawCell?: (data: CellHookData) => void;
  didDrawPage?: (data: HookData) => void;
  previous?: any;
}

// Define AutoTable types
interface Styles {
  lineColor?: number | string;
  lineWidth?: number;
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  fillColor?: number | string;
  textColor?: number | string;
  halign?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
  fontSize?: number;
  cellPadding?: number;
  cellWidth?: 'auto' | 'wrap' | number;
  fontFamily?: string;
  overflow?: 'linebreak' | 'ellipsize' | 'visible' | 'hidden';
  minCellHeight?: number;
  minCellWidth?: number;
}

interface CellHookData {
  table: any;
  cell: any;
  row: any;
  column: any;
  section: string;
  cursor: any;
  doc: any;
  previous?: any;
}

interface HookData {
  table: any;
  cursor: any;
  doc: any;
  pageNumber: number;
  pageCount: number;
  previous?: any;
}

// Define jsPDF internal structure
interface JsPDFInternal {
  events: any;
  scaleFactor: number;
  pageSize: {
    width: number;
    getWidth: () => number;
    height: number;
    getHeight: () => number;
  };
  pages: number[];
  getEncryptor: (objectId: number) => (data: string) => string;
  getNumberOfPages: () => number;
  fonts: any;
  getFont: any;
  getFontList: any;
  addFont: any;
  Helvetica: string;
  HelveticaBold: string;
  HelveticaOblique: string;
  HelveticaBoldOblique: string;
  Courier: string;
  CourierBold: string;
  CourierOblique: string;
  CourierBoldOblique: string;
  Times: string;
  TimesBold: string;
  TimesOblique: string;
  TimesBoldOblique: string;
  registeredFonts: any[];
  line: any;
  lines: any;
  rect: any;
  triangle: any;
  _isFillTransparent: boolean;
  _isStrokeTransparent: boolean;
  page: number;
  [key: string]: any;
}

// Define AutoTable interface
interface AutoTable {
  previous?: any;
  (options: UserOptions): jsPDF;
}
