
/**
 * Utilities for handling file downloads
 */
import { ResourceMetadata, trackResourceDownload } from './resourceUtils';

/**
 * Handle file download with error tracking
 * @param fileUrl URL of the file to download
 * @param title Title of the document (for tracking)
 * @returns Promise resolving to true if successful
 */
export const handleFileDownload = async (fileUrl: string, title: string): Promise<boolean> => {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error('Download failed');
    }
    
    // Create filename from title or extract from URL
    const filename = fileUrl.split('/').pop() || `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Track the download
    trackResourceDownload({
      title,
      description: 'Document téléchargé depuis l\'espace ressources',
      fileUrl,
      fileType: fileUrl.split('.').pop() || 'unknown'
    });
    
    return true;
  } catch (error) {
    console.error('Error downloading file:', error);
    return false;
  }
};

/**
 * Open a file preview in a new tab or window
 * @param fileUrl URL of the file to preview
 */
export const previewFile = (fileUrl: string): void => {
  window.open(fileUrl, '_blank');
};

/**
 * Format file size for display
 * @param bytes File size in bytes
 * @returns Formatted string (e.g., "1.2 MB")
 */
export const formatFileSize = (bytes?: number): string => {
  if (!bytes) return 'Taille inconnue';
  
  const kb = bytes / 1024;
  
  if (kb < 1024) {
    return `${kb.toFixed(1)} Ko`;
  } else {
    const mb = kb / 1024;
    return `${mb.toFixed(1)} Mo`;
  }
};
