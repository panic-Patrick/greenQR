import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff } from 'lucide-react';
import { WiFiConfig } from '../../types/qr';

interface WiFiFormProps {
  config: WiFiConfig;
  onChange: (config: WiFiConfig) => void;
  errors: Partial<Record<keyof WiFiConfig, string>>;
}

export const WiFiForm: React.FC<WiFiFormProps> = ({ config, onChange, errors }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (field: keyof WiFiConfig, value: string | boolean) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="space-y-4">
      {/* SSID */}
      <div>
        <label 
          htmlFor="wifi-ssid"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.wifi.ssid')} *
        </label>
        <input
          type="text"
          id="wifi-ssid"
          value={config.ssid}
          onChange={(e) => handleChange('ssid', e.target.value)}
          placeholder={t('form.wifi.ssidPlaceholder')}
          className={`
            w-full px-4 py-3 border rounded-lg
            focus:ring-2 focus:ring-green-500 focus:border-green-500
            transition-all duration-200
            ${errors.ssid ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            placeholder-gray-500 dark:placeholder-gray-400
          `}
          aria-invalid={!!errors.ssid}
        />
        {errors.ssid && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.ssid}</p>
        )}
      </div>

      {/* Security Type */}
      <div>
        <label 
          htmlFor="wifi-security"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.wifi.security')}
        </label>
        <select
          id="wifi-security"
          value={config.security}
          onChange={(e) => handleChange('security', e.target.value as WiFiConfig['security'])}
          className="
            w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg
            focus:ring-2 focus:ring-green-500 focus:border-green-500
            transition-all duration-200
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
          "
        >
          <option value="WPA">{t('form.wifi.wpa')}</option>
          <option value="WEP">{t('form.wifi.wep')}</option>
          <option value="nopass">{t('form.wifi.nopass')}</option>
        </select>
      </div>

      {/* Password */}
      {config.security !== 'nopass' && (
        <div>
          <label 
            htmlFor="wifi-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.wifi.password')} *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="wifi-password"
              value={config.password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder={t('form.wifi.passwordPlaceholder')}
              className={`
                w-full px-4 py-3 pr-12 border rounded-lg
                focus:ring-2 focus:ring-green-500 focus:border-green-500
                transition-all duration-200
                ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-white
                placeholder-gray-500 dark:placeholder-gray-400
              `}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
          )}
        </div>
      )}

      {/* Hidden Network */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="wifi-hidden"
          checked={config.hidden}
          onChange={(e) => handleChange('hidden', e.target.checked)}
          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label 
          htmlFor="wifi-hidden"
          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t('form.wifi.hidden')}
        </label>
      </div>
    </div>
  );
};