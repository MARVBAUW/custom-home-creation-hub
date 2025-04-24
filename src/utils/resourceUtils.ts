
/**
 * Utilities for managing downloadable resources across the site
 */

export interface ResourceMetadata {
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSizeKb?: number;
  category?: string;
  keywords?: string[];
  datePublished?: string;
}

/**
 * Generate a sitemap entry for a downloadable resource
 * @param resource The resource metadata
 * @returns XML string for the sitemap entry
 */
export const generateSitemapEntry = (resource: ResourceMetadata): string => {
  const domain = window.location.origin;
  const fileUrl = resource.fileUrl.startsWith('http') ? resource.fileUrl : `${domain}${resource.fileUrl}`;
  const lastModDate = resource.datePublished || new Date().toISOString();
  
  return `
  <url>
    <loc>${fileUrl}</loc>
    <lastmod>${lastModDate.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
};

/**
 * Track a resource download (for analytics, could be expanded)
 * @param resource The downloaded resource
 */
export const trackResourceDownload = (resource: ResourceMetadata): void => {
  // This could be expanded to send analytics data
  console.log(`Resource downloaded: ${resource.title}`);
  
  // Could be integrated with Google Analytics or other tracking
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const dataLayer = (window as any).dataLayer || [];
    dataLayer.push({
      event: 'resource_download',
      resource_name: resource.title,
      resource_type: resource.fileType,
      resource_category: resource.category
    });
  }
};

/**
 * Get the appropriate MIME type for a file based on extension
 * @param fileUrl The file URL or path
 * @returns The MIME type string
 */
export const getMimeType = (fileUrl: string): string => {
  if (fileUrl.endsWith('.pdf')) return 'application/pdf';
  if (fileUrl.endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (fileUrl.endsWith('.xlsx')) return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  if (fileUrl.endsWith('.zip')) return 'application/zip';
  if (fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg')) return 'image/jpeg';
  if (fileUrl.endsWith('.png')) return 'image/png';
  return 'application/octet-stream'; // Default
};

/**
 * Format file size for display
 * @param sizeInKb File size in kilobytes
 * @returns Formatted string (e.g., "1.2 MB")
 */
export const formatFileSize = (sizeInKb?: number): string => {
  if (!sizeInKb) return 'Taille inconnue';
  
  if (sizeInKb < 1024) {
    return `${sizeInKb} Ko`;
  } else {
    const sizeMb = (sizeInKb / 1024).toFixed(1);
    return `${sizeMb} Mo`;
  }
};

/**
 * Check if a file exists and is accessible
 * @param url The file URL to check
 * @returns Promise resolving to boolean indicating if file exists
 */
export const checkFileExists = async (url: string): Promise<boolean> => {
  if (url.startsWith('http')) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }
  
  // For local files (not ideal in browser, but we'll do our best)
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Generate a landing page URL for a document
 * @param title Document title 
 * @param category Document category
 * @returns SEO-friendly URL string
 */
export const generateDocumentLandingUrl = (title: string, category: string = 'documents'): string => {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .trim();
    
  return `/workspace/resources/${category}/${slug}`;
};
