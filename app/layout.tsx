"use client";
import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, createContext } from 'react';
import { useRouter } from 'next/navigation';

// Define a File type for better type safety
export interface File {
  name: string;
  label: string;
  content: string;
}

const initialFiles: File[] = [
  { name: 'index.ts', label: 'index.ts', content: `export const hello = () => {\n  console.log('Hello, world!');\n};` },
  { name: 'app.tsx', label: 'app.tsx', content: `import React from 'react';\n\nexport default function App() {\n  return <div>App Component</div>;\n}` },
  { name: 'readme.md', label: 'README.md', content: `# VS Code Mock\n\nThis is a mock README file for the VS Code-like UI demo.` },
  
];

export const FilesContext = createContext<{
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  updateFileContent: (name: string, content: string) => void;
}>({
  files: initialFiles,
  setFiles: () => {},
  updateFileContent: () => {},
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [files, setFiles] = useState(initialFiles);
  const [showInput, setShowInput] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const handleAddFile = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newFileName.trim();
    if (!trimmed || files.some(f => f.name === trimmed)) return;
    setFiles([...files, { name: trimmed, label: trimmed, content: '' }]);
    setShowInput(false);
    setNewFileName('');
    router.push(`/file/${trimmed}`);
  };

  const updateFileContent = (name: string, content: string) => {
    setFiles(fls => fls.map(f => f.name === name ? { ...f, content } : f));
  };

  return (
    <html lang="en" className="dark">
      <body className="bg-vscodeMain text-white min-h-screen">
        <FilesContext.Provider value={{ files, setFiles, updateFileContent }}>
          <div className="flex flex-col h-screen font-mono bg-vscodeMain">
            {/* Top bar */}
            <header className="h-9 bg-gradient-to-r from-vscodeSidebar to-vscodeSidebar text-gray-200 flex items-center pl-4 font-semibold text-[15px] border-b border-[#222] shadow-md relative z-30">
              {/* Window controls */}
              <div className="flex gap-1.5 mr-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] border border-[#222] mt-0.5 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] border border-[#222] mt-0.5 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] border border-[#222] mt-0.5 inline-block" />
              </div>
              <span className="text-[#3794ff] mr-2 text-lg">●</span> VS Code Mock
            </header>
            <div className="flex flex-1 min-h-0 overflow-hidden">
              {/* Sidebar */}
              <aside className="bg-vscodeSidebar text-gray-200 flex flex-col border-r border-[#222] shadow-md w-60 min-w-[15rem] max-w-[15rem] h-full overflow-y-auto md:static md:flex md:relative">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[#222] font-bold tracking-wider text-xs bg-vscodeSidebar text-gray-400 select-none">
                  <span>EXPLORER</span>
                  <button onClick={() => setShowInput(true)} className="bg-none border-none text-[#3794ff] text-lg cursor-pointer p-0 ml-2 leading-none" title="New File">＋</button>
                </div>
                {showInput && (
                  <form onSubmit={handleAddFile} className="flex items-center gap-2 px-4 py-2 bg-vscodeSidebar border-b border-[#222]">
                    <input
                      autoFocus
                      value={newFileName}
                      onChange={e => setNewFileName(e.target.value)}
                      placeholder="newfile.ts"
                      className="flex-1 bg-vscodeMain text-white border border-gray-700 rounded px-2 py-1 text-sm focus:outline-none"
                      onBlur={() => setShowInput(false)}
                    />
                    <button type="submit" className="bg-[#3794ff] text-white border-none rounded px-2 py-1 font-semibold cursor-pointer text-sm">Add</button>
                  </form>
                )}
                <ul className="list-none m-0 p-0 flex-1 bg-gradient-to-b from-vscodeSidebar to-vscodeMain overflow-y-auto">
                  {files.map((file) => {
                    const isActive = pathname === `/file/${file.name}`;
                    let iconText = 'TXT', iconBg = '#444', iconColor = '#fff', iconBorder = '#222';
                    if (file.name.endsWith('.ts')) { iconText = 'TS'; iconBg = '#3178c6'; iconColor = '#fff'; iconBorder = '#205080'; }
                    else if (file.name.endsWith('.tsx')) { iconText = 'TSX'; iconBg = '#42b883'; iconColor = '#fff'; iconBorder = '#2a7d5a'; }
                    else if (file.name.endsWith('.md')) { iconText = 'MD'; iconBg = '#f9c846'; iconColor = '#222'; iconBorder = '#b89c2a'; }
                    else if (file.name.endsWith('.json')) { iconText = 'JSON'; iconBg = '#cb3837'; iconColor = '#fff'; iconBorder = '#8a2322'; }
                    return (
                      <li
                        key={file.name}
                        className={`group mb-2 rounded-lg flex items-center px-0 py-0 cursor-pointer`}
                      >
                        <Link href={`/file/${file.name}`} className={`flex items-center flex-1 px-3 py-2 ${
                          isActive
                            ? 'bg-[#232f3e] border-l-4 border-[#3794ff] shadow text-white font-bold'
                            : 'hover:bg-[#23272e] hover:scale-[1.03] transition-all'
                        } rounded-lg`}>
                          <span
                            className="inline-flex items-center justify-center min-w-[2.2rem] h-7 rounded-md shadow-sm border font-bold mr-3 text-xs transition-all"
                            style={{
                              background: iconBg,
                              color: iconColor,
                              borderColor: iconBorder,
                              boxShadow: '0 1px 4px #0002',
                            }}
                          >
                            {iconText}
                          </span>
                          <span className="truncate text-[15px] transition-colors duration-150 flex-1">
                            {file.label}
                          </span>
                        </Link>
                        <button
                          onClick={() => setFiles(files.filter(f => f.name !== file.name))}
                          className="ml-2 text-gray-400 hover:text-red-400 text-lg font-bold px-1 rounded transition-colors duration-150 focus:outline-none"
                          title="Delete file"
                        >
                          ×
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>
              {/* Main area */}
              <main className="flex-1 bg-vscodeMain text-gray-200 flex flex-col items-stretch min-h-0 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </FilesContext.Provider>
      </body>
    </html>
  );
}
