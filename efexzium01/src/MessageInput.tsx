import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, FileText, Film, Music } from 'lucide-react';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState('');
  const textareaRef = useRef(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
    if (selectedFile) {
      handleUpload();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log('File selected:', file.name);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile.name);
      console.log('File type:', selectedFileType);
      console.log('File MIME type:', selectedFile.type);
      console.log('File size:', selectedFile.size, 'bytes');
      setSelectedFile(null);
      setSelectedFileType('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = (fileType) => {
    setSelectedFileType(fileType);
    fileInputRef.current.click();
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
        <style jsx>{`
          .message-input-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 0.5rem 0.5rem 0.75rem;
            z-index: 1000;
          }
          .message-input-container {
            display: flex;
            align-items: center;
            padding: 0.375rem;
            background-color: rgba(10, 25, 41, 0.8);
            border-radius: 0.75rem;
            border: 1px solid #1e3a5f;
            backdrop-filter: blur(10px);
            margin: 0 0.25rem;
          }
          .message-input {
            flex-grow: 1;
            padding: 6px 0.375rem;
            border: none;
            background-color: transparent;
            color: #fff;
            font-size: 0.875rem;
            resize: none;
            overflow-y: auto;
            min-height: 20px;
            max-height: 30vh;
            line-height: 1.2;
          }
          .message-input:focus {
            outline: none;
          }
          .message-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          .button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
            color: #ffffff;
            transition: color 0.2s, transform 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            min-width: 32px;
            min-height: 32px;
            border-radius: 50%;
          }
          .button:hover {
            color: #a5c3f3;
            transform: scale(1.1);
          }
          .button svg {
            width: 20px;
            height: 20px;
          }
          .upload-menu-container {
            position: relative;
            margin-right: 0.375rem;
          }
          .upload-menu {
            position: absolute;
            bottom: 100%;
            left: 0;
            background-color: rgba(15, 35, 57, 0.9);
            border-radius: 0.5rem;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            overflow: hidden;
            width: 120px;
            margin-bottom: 0.25rem;
            backdrop-filter: blur(10px);
          }
          .upload-option {
            display: flex;
            align-items: center;
            padding: 0.35rem 0.7rem;
            color: #fff;
            cursor: pointer;
            transition: background-color 0.2s;
            font-size: 0.8rem;
          }
          .upload-option:hover {
            background-color: rgba(30, 58, 95, 0.8);
          }
          .upload-option svg {
            margin-right: 0.5rem;
            width: 14px;
            height: 14px;
          }
          .file-input {
            display: none;
          }
          @media (min-width: 640px) {
            .message-input-wrapper {
              padding: 0.75rem 0.75rem 1rem;
            }
            .message-input-container {
              padding: 0.5rem;
              margin: 0 0.5rem;
            }
            .message-input {
              font-size: 1rem;
              padding: 7px 0.5rem;
            }
            .button {
              width: 36px;
              height: 36px;
              min-width: 36px;
              min-height: 36px;
            }
            .button svg {
              width: 22px;
              height: 22px;
            }
            .upload-menu-container {
              margin-right: 0.5rem;
            }
            .upload-menu {
              width: 150px;
              margin-bottom: 0.5rem;
            }
            .upload-option {
              padding: 0.5rem 1rem;
              font-size: 1rem;
            }
            .upload-option svg {
              width: 18px;
              height: 18px;
            }
          }
        `}</style>
        <div className="upload-menu-container" ref={menuRef}>
          <button className="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Paperclip />
          </button>
          {isMenuOpen && (
            <div className="upload-menu">
              {fileTypes.map(({ type, icon: Icon, accept }) => (
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