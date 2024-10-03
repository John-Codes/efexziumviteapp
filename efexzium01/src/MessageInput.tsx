import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Image, FileText, Film, Music } from 'lucide-react';
import './MessageInput.css';

const OPENROUTER_API_KEY = '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';
const YOUR_SITE_URL = 'https://your-site-url.com'; // Replace with your actual site URL
const YOUR_SITE_NAME = 'Your Site Name'; // Replace with your actual site name

const MessageInput = ({ onMessageSent }: { onMessageSent: (message: string) => void }) => {
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileType, setSelectedFileType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

   
    if (textarea ) {
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

  const handleSend = async () => {
    if (message.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "HTTP-Referer": YOUR_SITE_URL,
            "X-Title": YOUR_SITE_NAME,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "model": "openai/gpt-3.5-turbo",
            "messages": [
              {
                "role": "user",
                "content": message
              }
            ]
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Log the entire response for debugging

        if (!data || !data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error('Unexpected API response format');
        }

        const aiResponse = data.choices[0].message.content;

        // Call the onMessageSent function with both the user's message and the AI's response
        onMessageSent(message, 'user');
        onMessageSent(aiResponse, 'ai');

        setMessage('');
        if (selectedFile) {
          handleUpload();
        }
      } catch (error) {
        console.error('Error sending message:', error);
        // Handle error (e.g., show an error message to the user)
        onMessageSent(`Error: ${error.message}`, 'system');
      } finally {
        setIsLoading(false);
      }
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
      // Here you would typically implement the actual file upload logic
      // For now, we'll just simulate it with a console log
      onMessageSent(`File uploaded: ${selectedFile.name}`, 'system');
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
          disabled={isLoading}
        />
        <button className="button" onClick={handleSend} disabled={isLoading}>
          {isLoading ? 'Sending...' : <Send />}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;