import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface MonthGoalSettingsProps {
  monthGoalsActive: boolean;
  setMonthGoalsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GoalData {
  goal: string;
  startDate: string;
  totalRemainingDays: number;
}

const MonthGoalSettings: React.FC<MonthGoalSettingsProps> = ({ monthGoalsActive, setMonthGoalsActive }) => {
  const { t } = useTranslation();
  const [monthGoal, setMonthGoal] = useState('');
  const [savedGoalData, setSavedGoalData] = useState<GoalData | null>(null);

  const parseCSVGoal = (): GoalData => {
    const csvData = localStorage.getItem('monthlyGoalCSV');
    if (csvData) {
      const [goal, startDate, totalRemainingDays] = csvData.split(',');
      return { goal, startDate, totalRemainingDays: parseInt(totalRemainingDays, 10) };
    }
    return { goal: '', startDate: '', totalRemainingDays: 0 };
  };

  const updateTotalRemainingDays = () => {
    let monthlyGoalData = parseCSVGoal();
    if (monthlyGoalData.startDate) {
      const startDate = new Date(monthlyGoalData.startDate);
      const currentDate = new Date();
      const daysPassed = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      monthlyGoalData.totalRemainingDays = Math.max(30 - daysPassed, 0);
      
      // Update CSV
      const csvData = `${monthlyGoalData.goal},${monthlyGoalData.startDate},${monthlyGoalData.totalRemainingDays}`;
      localStorage.setItem('monthlyGoalCSV', csvData);
      setSavedGoalData(monthlyGoalData);
    }
  };

  useEffect(() => {
    const goalData = parseCSVGoal();
    if (goalData.goal) {
      setSavedGoalData(goalData);
      setMonthGoal(goalData.goal);
    }
    updateTotalRemainingDays();

    const intervalId = setInterval(updateTotalRemainingDays, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSaveGoal = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const csvData = `${monthGoal},${currentDate},30`;
    localStorage.setItem('monthlyGoalCSV', csvData);
    updateTotalRemainingDays();
    alert(t('monthGoals.goalSaved', { goal: monthGoal, date: currentDate }));
  };

  return (
    <div className="setting-card">
      <h2 className="setting-title">{t('monthGoals.title')}</h2>
      <div className="setting-content">
        <span className="setting-label">{t('monthGoals.activate')}</span>
        <p className="setting-status">
          {t('monthGoals.status', { status: monthGoalsActive ? t('monthGoals.active') : t('monthGoals.inactive') })}
        </p>
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
            placeholder={t('monthGoals.enterGoal')}
            value={monthGoal}
            onChange={(e) => setMonthGoal(e.target.value)}
            rows={3}
          />
          <button className="save-button" onClick={handleSaveGoal}>{t('monthGoals.saveGoal')}</button>
        </div>
      )}
      {savedGoalData && (
        <div className="saved-goal-info">
          <p className="saved-goal">{t('monthGoals.currentGoal')}: {savedGoalData.goal}</p>
          <p className="goal-start-date">{t('monthGoals.startedOn')}: {savedGoalData.startDate}</p>
          <p className="days-left">{t('monthGoals.daysLeft')}: {savedGoalData.totalRemainingDays}</p>
        </div>
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