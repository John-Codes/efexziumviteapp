// UploadButton.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Image, FileText, Film, Music } from 'lucide-react';

interface UploadButtonProps {
  onFileSelected: (file: File) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ onFileSelected }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedFileType, setSelectedFileType] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileTypes = [
    { type: 'Image', icon: Image, accept: 'image/*' },
    { type: 'Document', icon: FileText, accept: '.pdf,.doc,.docx,.txt' },
    { type: 'Video', icon: Film, accept: 'video/*' },
    { type: 'Audio', icon: Music, accept: 'audio/*' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      onFileSelected(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = (fileType: string) => {
    setSelectedFileType(fileType);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="upload-menu-container" ref={menuRef}>
      <button className="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Paperclip />
      </button>
      {isMenuOpen && (
        <div className="upload-menu">
          {fileTypes.map(({ type, icon: Icon }) => (
            <div key={type} className="upload-option" onClick={() => triggerFileInput(type)}>
              <Icon />
              {type}
            </div>
          ))}
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        className="file-input"
        onChange={handleFileChange}
        accept={fileTypes.find(ft => ft.type === selectedFileType)?.accept || ''}
      />
    </div>
  );
};

export default UploadButton;