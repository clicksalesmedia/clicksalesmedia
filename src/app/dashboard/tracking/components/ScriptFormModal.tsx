'use client';

import { useRef, useEffect } from 'react';
import ScriptForm, { TrackingScript } from './ScriptForm';
import { FaTimes } from 'react-icons/fa';

interface ScriptFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  script: TrackingScript | null;
  onSave: (script: Partial<TrackingScript>) => void;
  title: string;
}

export default function ScriptFormModal({ 
  isOpen, 
  onClose, 
  script, 
  onSave,
  title
}: ScriptFormModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSave = (scriptData: Partial<TrackingScript>) => {
    onSave(scriptData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75"></div>
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div 
          ref={modalRef}
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
        >
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <FaTimes className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div>
            <div className="mt-3 sm:mt-0">
              <h3 className="text-xl font-semibold leading-6 text-gray-900 mb-4">
                {title}
              </h3>
              <div className="mt-2">
                <ScriptForm 
                  script={script} 
                  onSave={handleSave} 
                  onCancel={onClose} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 