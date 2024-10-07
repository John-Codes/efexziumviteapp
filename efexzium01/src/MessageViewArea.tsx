import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Components } from 'react-markdown';
import './MessageView.css';

interface Message {
  text: string;
  sender: string;
}

interface MessageType extends Message {
  id: number;
  timestamp: string;
  liked: boolean | null;
}

interface MessageViewAreaProps {
  messages: Message[];
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
  message: MessageType; 
  onDelete: (id: number) => void;
  onLikeToggle: (id: number, liked: boolean | null) => void;
}> = ({ message, onDelete, onLikeToggle }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
      <div className="message-sender">{message.sender}</div>
      <div className="message-text">
        <ReactMarkdown components={components}>
          {message.text}
        </ReactMarkdown>
      </div>
      <div className="message-footer">
        <div className="message-timestamp">{message.timestamp}</div>
        <div className="message-actions">
          <button 
            onClick={() => onLikeToggle(message.id, true)} 
            className={`icon-button ${message.liked === true ? 'active' : ''}`} 
            title="Like"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={message.liked === true ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
          </button>
          <button 
            onClick={() => onLikeToggle(message.id, false)} 
            className={`icon-button ${message.liked === false ? 'active' : ''}`} 
            title="Dislike"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={message.liked === false ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <button onClick={() => onDelete(message.id)} className="icon-button" title="Delete message">
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

const MessageViewArea: React.FC<MessageViewAreaProps> = ({ messages: propMessages }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const convertedMessages: MessageType[] = propMessages.map((msg, index) => ({
      ...msg,
      id: index + 1,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      liked: null
    }));
    setMessages(convertedMessages);
  }, [propMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
  };

  const handleLikeToggle = (id: number, liked: boolean | null) => {
    setMessages(prevMessages => prevMessages.map(message => 
      message.id === id ? { ...message, liked: message.liked === liked ? null : liked } : message
    ));
  };

  return (
    <div className="message-view-container">
      <div className="message-view-area">
        <div className="message-list">
          {messages.map((message) => (
            <Message 
              key={message.id} 
              message={message} 
              onDelete={handleDelete}
              onLikeToggle={handleLikeToggle}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default MessageViewArea;