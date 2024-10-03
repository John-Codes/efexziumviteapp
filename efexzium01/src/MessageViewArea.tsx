import React, { useState, useEffect } from 'react';
import './MessageView.css'; // Import the new CSS file
import MessageInput from './MessageInput'; // Import the MessageInput component


// Message Type definition
interface MessageType {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  liked: boolean | null;
}

// Message Component
const Message: React.FC<{ 
  message: MessageType; 
  onDelete: (id: number) => void;
  onLikeToggle: (id: number, liked: boolean | null) => void;
}> = ({ message, onDelete, onLikeToggle }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="message-item">
      <div className="message-sender">{message.sender}</div>
      <div className="message-text">{message.text}</div>
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
interface MessageViewAreaProps<T> {
  messages: T[];
}
interface Message {
  text: string;
  sender: string;
}

// MessageViewArea Component
const MessageViewArea: React.FC<MessageViewAreaProps<Message>> = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    // Simulating fetching messages
    const fetchedMessages: MessageType[] = [
      { id: 1, text: "Hello there!", sender: "User1", timestamp: "10:00 AM", liked: null },
      { id: 2, text: "Hi! How are you?", sender: "User2", timestamp: "10:01 AM", liked: null },
      { id: 3, text: "I'm doing great, thanks for asking!", sender: "User1", timestamp: "10:02 AM", liked: null },
      { id: 4, text: "That's wonderful to hear!", sender: "User2", timestamp: "10:03 AM", liked: null },
      { id: 5, text: "How's your project coming along?", sender: "User1", timestamp: "10:04 AM", liked: null },
    ];
    setMessages(fetchedMessages);
  }, []);

  const handleDelete = (id: number) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const handleLikeToggle = (id: number, liked: boolean | null) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, liked: message.liked === liked ? null : liked } : message
    ));
  };

  const handleNewMessage = (text: string, sender: string) => {
    const newMessage: MessageType = {
      id: messages.length + 1,
      text,
      sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      liked: null
    };
    setMessages([...messages, newMessage]);
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
        </div>
      </div>
      <MessageInput onMessageSent={handleNewMessage} />
    </div>
  );
};

export default MessageViewArea;