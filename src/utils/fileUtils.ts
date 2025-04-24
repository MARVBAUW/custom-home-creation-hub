
export const checkFileAccessibility = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const isFileTypeSupported = (fileType: string): boolean => {
  const supportedTypes = ['pdf', 'jpg', 'jpeg', 'png', 'gif'];
  return supportedTypes.includes(fileType.toLowerCase());
};
