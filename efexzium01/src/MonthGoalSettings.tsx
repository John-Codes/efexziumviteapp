import React, { useState, useEffect } from 'react';

interface MonthGoalSettingsProps {
  monthGoalsActive: boolean;
  setMonthGoalsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const MonthGoalSettings: React.FC<MonthGoalSettingsProps> = ({ monthGoalsActive, setMonthGoalsActive }) => {
  const [monthGoal, setMonthGoal] = useState('');
  const [savedGoal, setSavedGoal] = useState('');

  useEffect(() => {
    const savedGoalFromStorage = localStorage.getItem('monthGoal');
    if (savedGoalFromStorage) {
      setSavedGoal(savedGoalFromStorage);
      setMonthGoal(savedGoalFromStorage);
    }
  }, []);

  const handleSaveGoal = () => {
    setSavedGoal(monthGoal);
    localStorage.setItem('monthGoal', monthGoal);
    alert('Goal saved: ' + monthGoal);
  };

  return (
    <div className="setting-card">
      <h2 className="setting-title">Month Goals</h2>
      <div className="setting-content">
        <span className="setting-label">Activate Month Goals</span>
        <p className="setting-status">Month Goals are {monthGoalsActive ? 'ACTIVE' : 'INACTIVE'}</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={monthGoalsActive}
            onChange={() => setMonthGoalsActive(!monthGoalsActive)}
          />
          <span className="slider"></span>
        </label>
      </div>
      {monthGoalsActive && (
        <div className="goal-input-container">
          <textarea
            className="text-input"
            placeholder="Enter your month goal"
            value={monthGoal}
            onChange={(e) => setMonthGoal(e.target.value)}
            rows={3}
          />
          <button className="save-button" onClick={handleSaveGoal}>Save Goal</button>
        </div>
      )}
      {savedGoal && (
        <p className="saved-goal">Current Goal: {savedGoal}</p>
      )}

      <style>{`
        .setting-card {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          color: #ffffff;
          font-family: 'Gotham', 'Montserrat', sans-serif;
          max-width: 400px;
          margin: 0 auto;
        }

        .setting-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
        }

        .setting-title {
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .setting-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .setting-label {
          font-size: 1rem;
        }

        .setting-status {
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.8;
        }

        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
          border-radius: 34px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #2196F3;
        }

        input:checked + .slider:before {
          transform: translateX(26px);
        }

        .goal-input-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          width: 100%;
        }

        .text-input {
          width: 80%;
          padding: 0.5rem;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 5px;
          color: white;
          resize: vertical;
          min-height: 80px;
        }

        .save-button {
          width: 80%;
          padding: 0.5rem 1rem;
          background-color: #2196F3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .save-button:hover {
          background-color: #1976D2;
        }

        .saved-goal {
          margin-top: 1rem;
          font-style: italic;
          opacity: 0.8;
          text-align: center;
          width: 80%;
        }

        @media (max-width: 768px) {
          .setting-card {
            padding: 1rem;
          }

          .setting-title {
            font-size: 1.2rem;
          }

          .setting-label {
            font-size: 0.9rem;
          }

          .setting-status {
            font-size: 0.9rem;
          }

          .switch {
            width: 50px;
            height: 28px;
          }

          .slider:before {
            height: 22px;
            width: 22px;
            left: 3px;
            bottom: 3px;
          }

          input:checked + .slider:before {
            transform: translateX(22px);
          }

          .text-input,
          .save-button,
          .saved-goal {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
};

export default MonthGoalSettings;