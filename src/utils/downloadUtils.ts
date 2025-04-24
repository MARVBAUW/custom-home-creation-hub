
import { useToast } from '@/hooks/use-toast';

export interface DownloadOptions {
  showToast?: boolean;
  fileName?: string;
}

export const handleFileDownload = async (
  url: string, 
  title: string,
  options: DownloadOptions = {}
) => {
  try {
    // For direct file URLs
    if (url.startsWith('http') || url.startsWith('/')) {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = options.fileName || title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      return true;
    }
    return false;
  } catch (error) {
    console.error('Download error:', error);
    return false;
  }
};

export const previewFile = (url: string): void => {
  if (!url) return;
  
  // For PDF files, open in new tab
  if (url.toLowerCase().endsWith('.pdf')) {
    window.open(url, '_blank');
    return;
  }
  
  // For other file types, try to download
  handleFileDownload(url, 'preview');
};
