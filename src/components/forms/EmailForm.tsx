import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmailConfig } from '../../types/qr';

interface EmailFormProps {
  config: EmailConfig;
  onChange: (config: EmailConfig) => void;
  errors: Partial<Record<keyof EmailConfig, string>>;
}

export const EmailForm: React.FC<EmailFormProps> = ({ config, onChange, errors }) => {
  const { t } = useTranslation();

  const handleChange = (field: keyof EmailConfig, value: string) => {
    onChange({ ...config, [field]: value });
  };

  const inputClass = (field: keyof EmailConfig) => `
    w-full px-4 py-3 border rounded-lg
    focus:ring-2 focus:ring-green-500 focus:border-green-500
    transition-all duration-200
    ${errors[field] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
    bg-white dark:bg-gray-800
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
  `;

  return (
    <div className="space-y-4">
      {/* To Email */}
      <div>
        <label 
          htmlFor="email-to"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.email.to')} *
        </label>
        <input
          type="email"
          id="email-to"
          value={config.to}
          onChange={(e) => handleChange('to', e.target.value)}
          placeholder={t('form.email.toPlaceholder')}
          className={inputClass('to')}
          aria-invalid={!!errors.to}
        />
        {errors.to && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.to}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label 
          htmlFor="email-subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.email.subject')}
        </label>
        <input
          type="text"
          id="email-subject"
          value={config.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          placeholder={t('form.email.subjectPlaceholder')}
          className={inputClass('subject')}
        />
      </div>

      {/* Body */}
      <div>
        <label 
          htmlFor="email-body"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.email.body')}
        </label>
        <textarea
          id="email-body"
          value={config.body}
          onChange={(e) => handleChange('body', e.target.value)}
          placeholder={t('form.email.bodyPlaceholder')}
          rows={4}
          className={inputClass('body')}
        />
      </div>
    </div>
  );
};