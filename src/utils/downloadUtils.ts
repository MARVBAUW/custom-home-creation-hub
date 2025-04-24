
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
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf,application/octet-stream'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Get the content type from the response
      const contentType = response.headers.get('content-type');
      
      // Check if we received a PDF or binary file
      if (!contentType || (!contentType.includes('application/pdf') && !contentType.includes('octet-stream'))) {
        console.warn('Unexpected content type:', contentType);
      }
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = options.fileName || title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
      
      // Append link to body
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      
      return true;
    }
    
    // URL not supported
    console.error('Unsupported URL format');
    return false;
    
  } catch (error) {
    console.error('Download error:', error);
    return false;
  }
};

export const previewFile = (url: string): void => {
  if (!url) {
    console.error('No URL provided for preview');
    return;
  }
  
  // For PDF files, open in new tab with proper headers
  if (url.toLowerCase().endsWith('.pdf')) {
    // Create a temporary link with specific attributes for PDF viewing
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    
    // Set specific headers to ensure proper PDF handling
    if (url.startsWith('/')) {
      link.setAttribute('type', 'application/pdf');
    }
    
    // Trigger click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }
  
  // For other file types, try to download
  handleFileDownload(url, 'preview');
};
