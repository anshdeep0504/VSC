"use client";
import React, { useContext, useEffect } from 'react';
import { FilesContext } from '../../layout';

export default function FilePage({ params }: { params: Promise<{ file: string }> }) {
  const resolvedParams = React.use(params);
  const { files, setFiles, updateFileContent } = useContext(FilesContext);
  if (!resolvedParams) return <div className="text-gray-400 p-8">Loading...</div>;
  // Case-insensitive file lookup
  let file = files.find(f => f.name.toLowerCase() === resolvedParams.file.toLowerCase());

  // If file does not exist, create it in context on first render
  useEffect(() => {
    if (!file && resolvedParams.file) {
      setFiles([...files, { name: resolvedParams.file, label: resolvedParams.file, content: '' }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.file, files.length]);

  // Always get the latest file from context
  file = files.find(f => f.name.toLowerCase() === resolvedParams.file.toLowerCase());

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (file) {
      updateFileContent(file.name, e.target.value);
    }
  };

  return (
    <div key={resolvedParams.file} className="w-full flex justify-center items-start py-8 px-2 min-h-[calc(100vh-2.5rem)]">
      <div className="w-full max-w-2xl bg-[#23272e] rounded-2xl shadow-2xl p-6 md:p-8 flex flex-col items-stretch">
        <div className="font-bold text-lg md:text-xl mb-4 text-[#4fc3f7] tracking-wide drop-shadow-md">
          {file ? file.label : resolvedParams.file}
        </div>
        <textarea
          value={file ? file.content : ''}
          onChange={handleChange}
          className="w-full min-h-[220px] bg-[#1e1e1e] text-[#d4d4d4] border border-[#333] rounded-lg font-mono text-base md:text-[15px] p-4 shadow focus:outline-none resize-y transition-all duration-150"
          placeholder="Start typing to create this file..."
        />
      </div>
    </div>
  );
} 