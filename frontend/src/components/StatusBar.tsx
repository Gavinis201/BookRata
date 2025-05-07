import React from 'react';
import './StatusBar.css';

type StatusBarProps = {
  currentStep: number;
};

const StatusBar: React.FC<StatusBarProps> = ({ currentStep }) => {
  const getWidth = () => {
    switch (currentStep) {
      case 1: return '33%';
      case 2: return '66%';
      case 3: return '100%';
      default: return '0%';
    }
  };

  return (
    <div className="status-bar-container">
      <div className="status-bar-fill" style={{ width: getWidth() }}></div>
    </div>
  );
};

export default StatusBar;
