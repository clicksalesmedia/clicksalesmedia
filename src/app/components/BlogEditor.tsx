'use client';

import { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';

// Define props interface
interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  modules?: any;
  id?: string;
  className?: string;
  dir?: string;
}

export default function BlogEditor({
  value,
  onChange,
  placeholder = 'Write something...',
  modules,
  id,
  className = '',
  dir,
}: BlogEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [Editor, setEditor] = useState<any>(null);
  
  // Default modules configuration
  const defaultModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['blockquote', 'code-block'],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'direction': 'rtl'}],
      [{'color': []}, {'background': []}],
      [{'font': []}],
      [{'align': []}],
      ['link', 'image'],
      ['clean']
    ],
  };

  // Load the editor component client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('react-quill').then((mod) => {
        setEditor(() => mod.default);
        setIsMounted(true);
      });
    }
  }, []);

  if (!isMounted) {
    // Return a placeholder while loading
    return (
      <div 
        className={`quill-editor-placeholder ${className}`}
        style={{ minHeight: '200px', border: '1px solid #ccc', borderRadius: '0.375rem' }}
      >
        Loading editor...
      </div>
    );
  }

  // Only render the actual editor when it's loaded and we're on the client
  return (
    <div className={`quill-editor-wrapper ${className}`}>
      {Editor && (
        <Editor
          id={id}
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules || defaultModules}
          style={{ direction: dir }}
        />
      )}
    </div>
  );
} 