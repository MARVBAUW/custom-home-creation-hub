
// Type definitions for jsPDF and jspdf-autotable
import jsPDF from 'jspdf';

// Extend the jsPDF internal type
declare module 'jspdf' {
  interface jsPDF {
    // Add getNumberOfPages method
    internal: {
      getNumberOfPages: () => number;
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
    };
    // Add autoTable method
    autoTable: (options: any) => any & {
      previous: {
        finalY: number;
      };
    };
  }
}

// Export enhanced jsPDF type
export type EnhancedJsPDF = jsPDF;
