
import { jsPDF } from 'jspdf';

// Define the types for jspdf-autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => any;
  }
}

export {};
