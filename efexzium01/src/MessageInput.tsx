import React, { useState, useRef, useEffect } from 'react';
import SendButton from './SendButton';
import UploadButton from './UploadButton';
import './MessageInput.css';

interface MessageInputProps {
  onMessageSent: (message: string) => void;
  onFileSelected: (file: File) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onMessageSent, onFileSelected }) => {
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
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
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input-wrapper">
      <div className="message-input-container">
        <UploadButton onFileSelected={onFileSelected} />
        <textarea
          ref={textareaRef}
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          spellCheck="false" // Add this line
        />
        <SendButton onClick={handleSend} />
      </div>
    </div>
  );
};

export default MessageInput;