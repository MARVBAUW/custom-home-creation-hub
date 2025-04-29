
import React from 'react';

interface FilePreviewTableProps {
  sampleData: string[][];
}

const FilePreviewTable: React.FC<FilePreviewTableProps> = ({ sampleData }) => {
  if (!sampleData || sampleData.length === 0) {
    return <div className="p-4 text-gray-500 text-center">Aucune donnée disponible pour l'aperçu</div>;
  }

  // Extract headers (first row) and data (remaining rows)
  const headers = sampleData[0];
  const data = sampleData.slice(1);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td 
                  key={cellIndex} 
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilePreviewTable;
