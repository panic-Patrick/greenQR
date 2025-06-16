import React from 'react';
import { useTranslation } from 'react-i18next';

interface URLFormProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const URLForm: React.FC<URLFormProps> = ({ value, onChange, error }) => {
  const { t } = useTranslation();

  return (
    <div role="group" aria-labelledby="url-label">
      <label 
        id="url-label"
        htmlFor="url"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {t('form.urlLabel')}
      </label>
      <input
        type="url"
        id="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('form.urlPlaceholder')}
        className={`
          w-full px-4 py-3 border rounded-lg
          focus:ring-2 focus:ring-green-500 focus:border-green-500
          transition-all duration-200
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          placeholder-gray-500 dark:placeholder-gray-400
        `}
        aria-invalid={!!error}
        aria-describedby={error ? 'url-error' : undefined}
        required
      />
      {error && (
        <p id="url-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};