import React from 'react';
import HamburgerMenu from "./HamburguerMenu";
import MessageViewArea from "./MessageViewArea";
import MessageInput from './MessageInput';

function App() {
  return (
    <div className="app-container">
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
          
          .app-container {
            min-height: 100vh;
            width: 100%;
            background-color: #111827;
            color: #93c5fd;
            display: flex;
            flex-direction: column;
          }

          header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 1rem;
          }

          main {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
        `}
      </style>
      <header>
        <HamburgerMenu header="efexzium" />
      </header>
      <main>
        <MessageViewArea />
        <MessageInput/>
      </main>
    </div>
  );
}

export default App;