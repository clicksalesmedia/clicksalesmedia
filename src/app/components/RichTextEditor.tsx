'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { useEffect, useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
  dir?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write something...',
  id,
  className = '',
  dir = 'ltr',
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  const editorId = id || `editor-${Math.random().toString(36).substring(2, 9)}`;
  
  // Create the editor with StarterKit
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment: dir === 'rtl' ? 'right' : 'left',
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl p-4 focus:outline-none max-w-none text-black',
        dir,
        id: editorId,
      },
    },
  });

  // Set up initial content when editor is ready
  useEffect(() => {
    if (editor && value && !editor.isEmpty && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  // Set up mounting state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle RTL/LTR based on dir prop
  useEffect(() => {
    if (editor && dir) {
      editor.setOptions({
        editorProps: {
          attributes: {
            dir,
            id: editorId,
          },
        },
      });
      
      // Update text alignment based on direction
      editor.commands.unsetTextAlign();
      if (dir === 'rtl') {
        editor.commands.setTextAlign('right');
      } else {
        editor.commands.setTextAlign('left');
      }
    }
  }, [editor, dir, editorId]);

  if (!isMounted) {
    return (
      <div 
        className={`editor-placeholder ${className}`}
        style={{ minHeight: '200px', border: '1px solid #ccc', borderRadius: '0.375rem', padding: '1rem' }}
      >
        Loading editor...
      </div>
    );
  }

  return (
    <div className={`rich-text-editor ${className}`} data-dir={dir}>
      <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
        <div className="border-b border-gray-300 bg-gray-100 p-2 flex flex-wrap gap-1">
          {editor && (
            <>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-1 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Bold"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-1 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Italic"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-1 rounded ${editor.isActive('strike') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Strike"
              >
                <s>S</s>
              </button>
              <select
                onChange={(e) => {
                  if (e.target.value === 'p') {
                    editor.chain().focus().setParagraph().run();
                  } else {
                    editor.chain().focus().toggleHeading({ level: parseInt(e.target.value) as 1|2|3|4|5|6 }).run();
                  }
                }}
                className="p-1 rounded border border-gray-300"
                value={
                  editor.isActive('heading', { level: 1 }) ? '1' :
                  editor.isActive('heading', { level: 2 }) ? '2' :
                  editor.isActive('heading', { level: 3 }) ? '3' :
                  editor.isActive('heading', { level: 4 }) ? '4' :
                  editor.isActive('heading', { level: 5 }) ? '5' :
                  editor.isActive('heading', { level: 6 }) ? '6' : 'p'
                }
              >
                <option value="p">Paragraph</option>
                <option value="1">Heading 1</option>
                <option value="2">Heading 2</option>
                <option value="3">Heading 3</option>
                <option value="4">Heading 4</option>
                <option value="5">Heading 5</option>
                <option value="6">Heading 6</option>
              </select>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-1 rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Bullet List"
              >
                • List
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-1 rounded ${editor.isActive('orderedList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Ordered List"
              >
                1. List
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-1 rounded ${editor.isActive('blockquote') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Blockquote"
              >
                &quot;&quot;
              </button>
              <div className="border-r border-gray-300 mx-1 h-6"></div>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`p-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Align Left"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`p-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Align Center"
              >
                ↔
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`p-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
                title="Align Right"
              >
                →
              </button>
            </>
          )}
        </div>
        
        <EditorContent editor={editor} className="min-h-[200px] text-black" />
      </div>
    </div>
  );
} 