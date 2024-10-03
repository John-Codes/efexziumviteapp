import { useState } from 'react';
import MessageViewArea from "./MessageViewArea";
import MessageInput from "./MessageInput";
import InterstellarBackground from './InterstellarBackground';

interface Message {
  text: string;
  sender: string;
}

function MainChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);

  const OPENROUTER_API_KEY = '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';
  const YOUR_SITE_URL = 'https://your-site-url.com'; // Replace with your actual site URL
  const YOUR_SITE_NAME = 'Your Site Name'; // Replace with your actual site name

  const handleMessageSent = async (newMessage: string) => {
    setMessages(prevMessages => [...prevMessages, { text: newMessage, sender: 'user' }]);

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
          "model": "meta-llama/llama-3.2-3b-instruct:free",
          "messages": [
            {
              "role": "user",
              "content": newMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      setMessages(prevMessages => [...prevMessages, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { text: 'An error occurred while processing your request.', sender: 'bot' }]);
    }
  };

  return (
    <div className="main-chat-container">
      <InterstellarBackground />
      <main className="chat-content">
        <MessageViewArea messages={messages} />
        <MessageInput onMessageSent={handleMessageSent} onFileSelected={() => {}} />
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