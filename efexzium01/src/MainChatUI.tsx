import React, { useState } from 'react';
import MessageViewArea from "./MessageViewArea";
import MessageInput from "./MessageInput";
import InterstellarBackground from './InterStellarBackground';

interface Message {
  text: string;
  sender: string;
}
function MainChatUI() {
  
  const [messages, setMessages] = useState<Message[]>([]);

  const handleMessageSent = async (newMessage: string) => {
    setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error('Error parsing JSON:', e);
        throw new Error('Invalid JSON response');
      }

      setMessages(prevMessages => [...prevMessages, { text: data.reply, sender: 'bot' }]);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        setMessages(prevMessages => [...prevMessages, { text: `Error: ${error.message}`, sender: 'bot' }]);
      } else {
        console.error('Unknown error occurred');
        setMessages(prevMessages => [...prevMessages, { text: 'An unknown error occurred', sender: 'bot' }]);
      }
    }
  };

  
  return (
    <div className="main-chat-container">
      <InterstellarBackground />
      <main className="chat-content">
        <MessageViewArea messages={messages} />
        <MessageInput onMessageSent={handleMessageSent} />
      </main>
      <style>{`
        .main-chat-container {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .chat-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 20px;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

export default MainChatUI;