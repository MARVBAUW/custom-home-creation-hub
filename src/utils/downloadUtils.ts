
import { useToast } from '@/hooks/use-toast';

export interface DownloadOptions {
  showToast?: boolean;
  fileName?: string;
  responseType?: 'blob' | 'arraybuffer' | 'json' | 'text';
  contentType?: string;
  onProgress?: (progress: number) => void;
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
          'Accept': options.contentType || 'application/pdf,application/octet-stream,application/vnd.openxmlformats-officedocument.*'
        }
      });
      
      if (!response.ok) {
        const errorText = `HTTP error! status: ${response.status}`;
        console.error(errorText);
        return { success: false, error: errorText };
      }
      
      // Get the content type from the response
      const contentType = response.headers.get('content-type');
      
      // Check if we received an expected file type
      if (!contentType) {
        console.warn('No content type received from server');
      } else if (!contentType.includes('application/pdf') && 
                !contentType.includes('octet-stream') && 
                !contentType.includes('application/vnd.openxmlformats')) {
        console.warn('Unexpected content type:', contentType);
      }
      
      try {
        // Try the modern way first
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = options.fileName || title.replace(/\s+/g, '-').toLowerCase() + determineExtension(contentType);
        
        // Append link to body
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
        
        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
        
        return { success: true };
      } catch (blobError) {
        console.warn('Blob download failed, trying alternative method:', blobError);
        
        // Fallback to direct download for browsers that don't support blob
        const link = document.createElement('a');
        link.href = url;
        link.download = options.fileName || title.replace(/\s+/g, '-').toLowerCase() + '.pdf';
        link.target = '_blank';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        return { success: true };
      }
    }
    
    // URL not supported
    console.error('Unsupported URL format');
    return { success: false, error: 'Unsupported URL format' };
    
  } catch (error) {
    console.error('Download error:', error);
    return { success: false, error: String(error) };
  }
};

// Helper function to determine file extension from content type
const determineExtension = (contentType: string | null): string => {
  if (!contentType) return '.pdf';
  
  if (contentType.includes('application/pdf')) {
    return '.pdf';
  } else if (contentType.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
    return '.docx';
  } else if (contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    return '.xlsx';
  } else if (contentType.includes('application/vnd.openxmlformats-officedocument.presentationml.presentation')) {
    return '.pptx';
  } else if (contentType.includes('image/jpeg')) {
    return '.jpg';
  } else if (contentType.includes('image/png')) {
    return '.png';
  } else if (contentType.includes('text/plain')) {
    return '.txt';
  }
  
  return '.pdf'; // Default extension
};

export const previewFile = (url: string): void => {
  if (!url) {
    console.error('No URL provided for preview');
    return;
  }
  
  // For PDF files, open in new tab with proper headers
  if (url.toLowerCase().endsWith('.pdf') || url.toLowerCase().includes('pdf')) {
    try {
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
    } catch (error) {
      console.error('Error previewing PDF:', error);
      // Fallback - try to download instead
      handleFileDownload(url, 'preview');
    }
    return;
  }
  
  // For other file types, try to download
  handleFileDownload(url, 'preview');
};
