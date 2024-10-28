import React, { useState } from 'react';
import NotificationSettings from './NotificationSettings';
import MonthGoalSettings from './MonthGoalSettings';
import TodoListSettings from './TodoListSettings';
import AISearchSettings from './AISearchSettings';
import DenseStarryBackground from '../../Backgrounds/DenseStarryBackground';

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [monthGoalsActive, setMonthGoalsActive] = useState(false);
  const [todoListActive, setTodoListActive] = useState(false);
  const [aiSearchActive, setAISearchActive] = useState(false);

  return (
    <>
      <DenseStarryBackground />
      <div className="settings-container">
        <div className="content">
          <h1 className="main-title">Settings</h1>
          <div className="settings-flex">
            <div className="settings-item">
              <NotificationSettings notifications={notifications} setNotifications={setNotifications} />
            </div>
            <div className="settings-item">
              <MonthGoalSettings monthGoalsActive={monthGoalsActive} setMonthGoalsActive={setMonthGoalsActive} />
            </div>
            <div className="settings-item">
              <TodoListSettings todoListActive={todoListActive} setTodoListActive={setTodoListActive} />
            </div>
            <div className="settings-item">
              <AISearchSettings aiSearchActive={aiSearchActive} setAISearchActive={setAISearchActive} />
            </div>
          </div>
        </div>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap');
          
          .settings-container {
            
            min-height: 100vh;
            width: 100%;
            color: #ffffff;
            font-family: 'Gotham', 'Montserrat', sans-serif;
            background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding: 1rem;
            box-sizing: border-box;
          }

          .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: 1200px;
          }
          
          .main-title {
          margin-top:8rem;
            font-size: 2rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 2rem;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          }
          
          .settings-flex {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            gap: 1.5rem;
          }
          
          .settings-item {
            width: 100%;
            max-width: 400px;
            display: flex;
            justify-content: center;
          }
          
          @media (min-width: 768px) {
            .settings-container {
              align-items: center;
              padding: 2rem;
            }
            
            .main-title {
              font-size: 3rem;
              letter-spacing: 0.15em;
              margin-bottom: 3rem;
            }
            
            .settings-flex {
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: center;
              gap: 2rem;
            }
            
            .settings-item {
              flex: 1 1 300px;
              max-width: 400px;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default SettingsPage;