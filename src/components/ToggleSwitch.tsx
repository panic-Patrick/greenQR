import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  leftLabel: string;
  rightLabel: string;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onToggle,
  leftLabel,
  rightLabel
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <span className={`text-sm ${!isOn ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
        {leftLabel}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={onToggle}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          ${isOn ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white
            transition-transform duration-200 ease-in-out
            ${isOn ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      <span className={`text-sm ${isOn ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
        {rightLabel}
      </span>
    </div>
  );
}; 