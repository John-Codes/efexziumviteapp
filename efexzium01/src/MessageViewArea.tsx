import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Components } from 'react-markdown';
import MessageFooter from './MessageFooter';
import './MessageView.css';

interface ChatMessage {
  text: string;
  sender: string;
  role: 'user' | 'assistant' | 'system';
  model: string;
}

interface MessageViewAreaProps {
  messages: ChatMessage[];
  aiModels: string[];
  selectedModel: string;
  onModelChange: (model: string) => void;
  onDeleteMessage: (index: number) => void;
}

interface MessageFooterProps {
  message: ChatMessage;
  selectedModel: string;
  aiModels: string[];
  onModelChange: (model: string) => void;
  onDelete: () => void;
  onLikeToggle: ((liked: boolean | null) => void) | null;  // Changed to accept null
  showLikeDislike: boolean;
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
  message: ChatMessage; 
  onDelete: () => void;
  onLikeToggle: (liked: boolean | null) => void;
  aiModels: string[];
  onModelChange: (model: string) => void;
  selectedModel: string;
}> = ({ message, onDelete, onLikeToggle, aiModels, onModelChange, selectedModel }) => {
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
      <MessageFooter
        message={message}
        selectedModel={selectedModel}
        aiModels={aiModels}
        onModelChange={onModelChange}
        onDelete={onDelete}
        onLikeToggle={message.sender !== 'user' ? onLikeToggle : null}
        showLikeDislike={message.sender !== 'user'}
      />
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