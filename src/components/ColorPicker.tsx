import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isValidHexColor } from '../utils/validation';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
  error?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
  error
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(color);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(color);
  }, [color]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (isValidHexColor(value)) {
      onChange(value);
    }
  };

  const handleInputBlur = () => {
    if (!isValidHexColor(inputValue)) {
      setInputValue(color);
    }
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onBlur={handleInputBlur}
            placeholder={t('form.colorPlaceholder')}
            className={`
              w-full px-4 py-3 pr-12 border rounded-lg
              focus:ring-2 focus:ring-green-500 focus:border-green-500
              transition-all duration-200
              ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              bg-white dark:bg-gray-800
              text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400
            `}
            aria-invalid={!!error}
            aria-describedby={error ? 'color-error' : undefined}
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
            style={{ backgroundColor: isValidHexColor(inputValue) ? inputValue : '#ffffff' }}
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            tabIndex={0}
            aria-label="Open color picker"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsOpen(!isOpen);
              }
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="
            px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
            bg-white dark:bg-gray-800
            text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-700
            focus:ring-2 focus:ring-green-500 focus:border-green-500
            transition-all duration-200
          "
          aria-label="Toggle color picker"
        >
          <Palette className="w-5 h-5" />
        </button>
      </div>
      
      {error && (
        <p id="color-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {isOpen && (
        <div
          ref={pickerRef}
          className="absolute top-full left-0 mt-2 p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-50"
        >
          <HexColorPicker
            color={color}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  );
};