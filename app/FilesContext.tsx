import React, { createContext } from 'react';

// Define a File type for better type safety
export interface File {
  name: string;
  label: string;
  content: string;
}

export const FilesContext = createContext<{
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  updateFileContent: (name: string, content: string) => void;
}>({
  files: [],
  setFiles: () => {},
  updateFileContent: () => {},
}); 