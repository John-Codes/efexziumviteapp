import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, FileText, Film, Music } from 'lucide-react';
import './MessageInput.css';

interface MessageInputProps {
  onMessageSent: (message: string) => void;
  onFileSelected: (file: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onMessageSent, onFileSelected }) => {
  const [message, setMessage] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedFileType, setSelectedFileType] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    adjustTextareaHeight();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [message]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 20), window.innerHeight * 0.3);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onMessageSent(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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

  const fileTypes = [
    { type: 'Image', icon: Image, accept: 'image/*' },
    { type: 'Document', icon: FileText, accept: '.pdf,.doc,.docx,.txt' },
    { type: 'Video', icon: Film, accept: 'video/*' },
    { type: 'Audio', icon: Music, accept: 'audio/*' },
  ];

  return (
    <div className="message-input-wrapper">
      <div className="message-input-container">
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
        <textarea
          ref={textareaRef}
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button className="button" onClick={handleSend}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;