import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Plus, 
  Image, 
  FileText, 
  Mic, 
  Video,
  Camera,
  Scan,
  FileCog
} from 'lucide-react';
import './MessageInput.css';

interface MenuOption {
  icon: React.ReactNode;
  label: string;
  action: () => void;
}

interface MessageInputProps {
  onMessageSent: (message: string) => void;
  onFileSelected: (file: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onMessageSent }) => {
  const [isUploadMenuOpen, setIsUploadMenuOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUploadMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const adjustTextareaHeight = () => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      const newHeight = Math.min(Math.max(textarea.scrollHeight, 20), window.innerHeight * 0.3);
      textarea.style.height = `${newHeight}px`;
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onMessageSent(message);
      setMessage('');
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMenuItemClick = (optionName: string): void => {
    console.log(`Clicked: ${optionName}`);
    setIsUploadMenuOpen(false);
  };

  const menuOptions: MenuOption[] = [
    {
      icon: <FileText />,
      label: 'Document',
      action: () => handleMenuItemClick('Document')
    },
    {
      icon: <Image />,
      label: 'Photos & Videos',
      action: () => handleMenuItemClick('Photos & Videos')
    },
    {
      icon: <Camera />,
      label: 'Camera',
      action: () => handleMenuItemClick('Camera')
    },
    {
      icon: <Scan />,
      label: 'Scan',
      action: () => handleMenuItemClick('Scan')
    },
    {
      icon: <Mic />,
      label: 'Record Audio',
      action: () => handleMenuItemClick('Record Audio')
    },
    {
      icon: <Video />,
      label: 'Record Video',
      action: () => handleMenuItemClick('Record Video')
    },
    {
      icon: <FileCog />,
      label: 'Browse Files',
      action: () => handleMenuItemClick('Browse Files')
    }
  ];

  return (
    <div className="message-input-wrapper">
      <div className="message-input-container">
        <div className="upload-menu-container" ref={menuRef}>
          <button 
            className="button"
            onClick={() => setIsUploadMenuOpen(!isUploadMenuOpen)}
            type="button"
          >
            <Plus />
          </button>
          {isUploadMenuOpen && (
            <div className="upload-menu">
              {menuOptions.map((option, index) => (
                <React.Fragment key={option.label}>
                  {index === 4 && <div className="upload-option divider" />}
                  <div className="upload-option" onClick={option.action}>
                    {option.icon}
                    {option.label}
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        
        <textarea
          ref={textAreaRef}
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          spellCheck="false"
        />
        
        <button 
          className="button"
          onClick={handleSend}
          disabled={!message.trim()}
          type="button"
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;