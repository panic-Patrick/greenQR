import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Palette, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isValidHexColor } from '../utils/validation';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  label: string;
  error?: string;
  dropdownDirection?: 'up' | 'down';
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  label,
  error,
  dropdownDirection = 'up',
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
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Color Picker Modal */}
          <div
            ref={pickerRef}
            className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
              sm:absolute sm:left-0 ${dropdownDirection === 'down' ? 'sm:top-full sm:mt-2 sm:bottom-auto' : 'sm:bottom-full sm:mb-2 sm:top-auto'} sm:transform-none
              p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
              rounded-lg shadow-lg z-50 w-[280px] sm:w-auto`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('form.selectColor')}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Close color picker"
              >
                <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            {/* Farbpalette */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { name: 'black', color: '#000000' },
                { name: 'white', color: '#FFFFFF' },
                { name: 'primary-600', color: '#008939' },
                { name: 'secondary-600', color: '#005437' },
                { name: 'grashalm-600', color: '#8ABD24' },
                { name: 'himmel-600', color: '#0BA1DD' },
                { name: 'neutral-600', color: '#F5F1E9' },
                { name: 'sun-600', color: '#FFF17A' },
              ].map((swatch) => (
                <button
                  key={swatch.name}
                  type="button"
                  className="w-7 h-7 rounded border-2 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  style={{ backgroundColor: swatch.color }}
                  onClick={() => onChange(swatch.color)}
                  aria-label={swatch.name}
                >
                  {color.toLowerCase() === swatch.color.toLowerCase() && (
                    <span className="block w-full h-full rounded ring-2 ring-green-500" />
                  )}
                </button>
              ))}
            </div>
            <HexColorPicker
              color={color}
              onChange={onChange}
            />
          </div>
        </>
      )}
    </div>
  );
};