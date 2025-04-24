
import React from 'react';

/**
 * Props for validating the SEO implementation on a page
 */
interface SEOValidationProps {
  title: string;
  description: string;
  h1Text: string;
  url: string;
  schemaType: string;
  hasSchema: boolean;
}

/**
 * Component to validate SEO implementation (meant for development only)
 */
const SEOValidation: React.FC<SEOValidationProps> = ({
  title,
  description,
  h1Text,
  url,
  schemaType,
  hasSchema
}) => {
  // Only run in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  // Validate SEO elements
  const issues: string[] = [];
  
  if (!title || title.length < 10) {
    issues.push('Title too short (should be at least 10 characters)');
  }
  
  if (title && title.length > 70) {
    issues.push('Title too long (should be under 70 characters)');
  }
  
  if (!description || description.length < 50) {
    issues.push('Meta description too short (should be at least 50 characters)');
  }
  
  if (description && description.length > 160) {
    issues.push('Meta description too long (should be under 160 characters)');
  }
  
  if (!h1Text) {
    issues.push('Missing H1 tag text');
  }
  
  if (!hasSchema) {
    issues.push('Missing schema.org structured data');
  }
  
  // If no issues, don't render anything
  if (issues.length === 0) {
    return null;
  }
  
  // Only visible during development
  return (
    <div className="fixed bottom-0 right-0 bg-red-100 p-4 max-w-md z-50 border-l border-t border-red-300">
      <h3 className="font-bold text-red-600 text-sm mb-2">SEO Issues on {url}</h3>
      <ul className="list-disc list-inside text-xs text-red-700">
        {issues.map((issue, index) => (
          <li key={index}>{issue}</li>
        ))}
      </ul>
      <div className="text-xs text-gray-600 mt-2">
        This notice only appears in development mode
      </div>
    </div>
  );
};

export default SEOValidation;
