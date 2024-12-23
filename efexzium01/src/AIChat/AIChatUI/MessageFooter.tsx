import React, { useState } from 'react';

interface MessageFooterProps {
  message: {
    text: string;
    sender: string;
    role: 'user' | 'assistant' | 'system';
    model: string;
  };
  selectedModel: string;
  aiModels: string[];
  onModelChange: (model: string) => void;
  onDelete: () => void;
  onLikeToggle: ((liked: boolean | null) => void) | null;
  showLikeDislike: boolean;
}

const MessageFooter: React.FC<MessageFooterProps> = ({
  message,
  selectedModel,
  aiModels,
  onModelChange,
  onDelete,
  onLikeToggle,
  showLikeDislike
}) => {
  const [copied, setCopied] = useState(false);
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getShortModelName = (fullName: string): string => {
    let shortName = fullName.split('/').pop() || fullName;
    shortName = shortName.replace(/:free$/, '');
    shortName = shortName
      .replace(/instruct/i, '')
      .replace(/[-_]+/g, ' ')
      .trim()
      .replace(/\s+/g, '-');
    return shortName;
  };

  const handleLikeToggle = (newLiked: boolean | null) => {
    if (onLikeToggle) {
      setLiked(newLiked);
      onLikeToggle(newLiked);
    }
  };

  return (
    <div className="message-footer">
      <div className="message-actions">
        {message.sender === 'user' && (
          <select 
            value={selectedModel}
            onChange={(e) => onModelChange(e.target.value)}
            onFocus={() => setIsSelectActive(true)}
            onBlur={() => setIsSelectActive(false)}
            className={`model-dropdown ${isSelectActive ? 'active' : ''}`}
          >
            {aiModels.map((model) => (
              <option key={model} value={model}>
                {getShortModelName(model)}
              </option>
            ))}
          </select>
        )}
        {showLikeDislike && onLikeToggle && (
          <>
            <button 
              onClick={() => handleLikeToggle(liked === true ? null : true)}
              className={`icon-button ${liked === true ? 'active' : ''}`} 
              title="Like"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked === true ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
            </button>
            <button 
              onClick={() => handleLikeToggle(liked === false ? null : false)}
              className={`icon-button ${liked === false ? 'active' : ''}`} 
              title="Dislike"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked === false ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
              </svg>
            </button>
          </>
        )}
        <button onClick={copyToClipboard} className="icon-button" title="Copy message content">
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          )}
        </button>
        <button onClick={onDelete} className="icon-button" title="Delete message">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageFooter;