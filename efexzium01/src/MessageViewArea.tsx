import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Components } from 'react-markdown';
import './MessageView.css';

interface Message {
  text: string;
  sender: string;
  role: 'user' | 'assistant';
  model: string;
}

interface MessageViewAreaProps {
  messages: Message[];
  aiModels: string[];
  selectedModel: string;
  onModelChange: (model: string) => void;
  onDeleteMessage: (index: number) => void;
}

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button onClick={copyToClipboard} className="copy-button">
      {isCopied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const CodeBlock: React.FC<{language: string | undefined, value: string}> = ({language, value}) => {
  return (
    <div className="code-block-wrapper">
      <CopyButton text={value} />
      <SyntaxHighlighter style={atomDark} language={language} PreTag="div">
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

const Message: React.FC<{ 
  message: Message; 
  onDelete: () => void;
  onLikeToggle: (liked: boolean | null) => void;
  aiModels: string[];
  onModelChange: (model: string) => void;
  selectedModel: string;
}> = ({ message, onDelete, onLikeToggle, aiModels, onModelChange, selectedModel }) => {
  const [copied, setCopied] = useState(false);
  const [isSelectActive, setIsSelectActive] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getShortModelName = (fullName: string) => {
    return fullName.split('/').pop() || fullName;
  };

  const components: Components = {
    code({ node, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return match ? (
        <CodeBlock
          language={match[1]}
          value={String(children).replace(/\n$/, '')}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
    li(props) {
      return (
        <>
          <li {...props} />
          <br />
        </>
      );
    }
  };

  return (
    <div className="message-item">
      <div className="message-sender">
        {message.sender === 'user' ? 'User' : getShortModelName(message.model)}
      </div>
      <div className="message-text">
        <ReactMarkdown components={components}>
          {message.text}
        </ReactMarkdown>
      </div>
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
          <button 
            onClick={() => {
              setLiked(liked === true ? null : true);
              onLikeToggle(liked === true ? null : true);
            }} 
            className={`icon-button ${liked === true ? 'active' : ''}`} 
            title="Like"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked === true ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
          </button>
          <button 
            onClick={() => {
              setLiked(liked === false ? null : false);
              onLikeToggle(liked === false ? null : false);
            }} 
            className={`icon-button ${liked === false ? 'active' : ''}`} 
            title="Dislike"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={liked === false ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path>
            </svg>
          </button>
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
    </div>
  );
};

const MessageViewArea: React.FC<MessageViewAreaProps> = ({ 
  messages, 
  aiModels, 
  selectedModel, 
  onModelChange,
  onDeleteMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLikeToggle = (index: number, liked: boolean | null) => {
    // Implement like toggle functionality if needed
    console.log(`Toggle like for message at index ${index}: ${liked}`);
  };

  return (
    <div className="message-view-container">
      <div className="message-view-area">
        <div className="message-list">
          {messages.map((message, index) => (
            <Message 
              key={index} 
              message={message} 
              onDelete={() => onDeleteMessage(index)}
              onLikeToggle={(liked) => handleLikeToggle(index, liked)}
              aiModels={aiModels}
              onModelChange={onModelChange}
              selectedModel={selectedModel}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageViewArea;