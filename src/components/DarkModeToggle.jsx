import React from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <button
      className="dark-mode-toggle"
      onClick={onToggle}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Light mode' : 'Dark mode'}
    >
      <span className="toggle-icon" aria-hidden="true">
        {isDarkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
};

export default React.memo(DarkModeToggle);

