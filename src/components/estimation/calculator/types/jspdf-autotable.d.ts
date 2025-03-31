
// Declaration file for jspdf-autotable

import { jsPDF } from 'jspdf';

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: UserOptions) => void;
    lastAutoTable: {
      finalY: number;
    };
  }
}

export interface UserOptions {
  head?: any[][];
  body?: any[][];
  foot?: any[][];
  startY?: number;
  margin?: Margin;
  pageBreak?: 'auto' | 'avoid' | 'always';
  rowPageBreak?: 'auto' | 'avoid';
  tableWidth?: 'auto' | 'wrap' | number;
  showHead?: 'everyPage' | 'firstPage' | 'never';
  showFoot?: 'everyPage' | 'lastPage' | 'never';
  tableLineWidth?: number;
  tableLineColor?: number[] | false;
  tableId?: any;
  theme?: 'striped' | 'grid' | 'plain';
  styles?: Styles;
  headStyles?: Styles;
  bodyStyles?: Styles;
  footStyles?: Styles;
  alternateRowStyles?: Styles;
  columnStyles?: {
    [key: string]: Styles;
  };
  didParseCell?: (data: CellHookData) => void;
  willDrawCell?: (data: CellHookData) => void;
  didDrawCell?: (data: CellHookData) => void;
  didDrawPage?: (data: HookData) => void;
}

interface Styles {
  font?: string;
  fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic';
  overflow?: 'linebreak' | 'ellipsize' | 'visible' | 'hidden';
  fillColor?: number[] | false;
  textColor?: number[] | false;
  halign?: 'left' | 'center' | 'right' | 'justify';
  valign?: 'top' | 'middle' | 'bottom';
  fontSize?: number;
  cellPadding?: number;
  lineColor?: number[] | false;
  lineWidth?: number;
  cellWidth?: 'auto' | 'wrap' | number;
  minCellHeight?: number;
}

interface Margin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface CellHookData {
  table: UserOptions;
  cell: CellDefinition;
  row: RowDefinition;
  column: ColumnDefinition;
  section: 'head' | 'body' | 'foot';
  pageNumber: number;
  isHtmlCell: boolean;
  styles: Styles;
  doc: jsPDF;
  cursor: {
    x: number;
    y: number;
  };
}

interface HookData {
  table: UserOptions;
  doc: jsPDF;
  cursor: {
    x: number;
    y: number;
  };
  pageCount: number;
  pageNumber: number;
  settings: any;
}

interface RowDefinition {
  raw: any;
  index: number;
  cells: {
    [key: string]: CellDefinition;
  };
  height: number;
  maxCellHeight: number;
  spansMultiplePages: boolean;
}

interface ColumnDefinition {
  raw: any;
  index: number;
  dataKey: string | number;
  width: number;
}

interface CellDefinition {
  raw: any;
  styles: Styles;
  text: string[];
  rowSpan: number;
  colSpan: number;
  width: number;
  height: number;
  contentWidth: number;
  contentHeight: number;
  x: number;
  y: number;
}

export default function(doc: jsPDF): {
  autoTable: (options: UserOptions) => void;
};
