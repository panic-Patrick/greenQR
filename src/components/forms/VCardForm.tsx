import React from 'react';
import { useTranslation } from 'react-i18next';
import { VCardConfig } from '../../types/qr';

interface VCardFormProps {
  config: VCardConfig;
  onChange: (config: VCardConfig) => void;
  errors: Partial<Record<keyof VCardConfig, string>>;
}

export const VCardForm: React.FC<VCardFormProps> = ({ config, onChange, errors }) => {
  const { t } = useTranslation();

  const handleChange = (field: keyof VCardConfig, value: string) => {
    onChange({ ...config, [field]: value });
  };

  const inputClass = (field: keyof VCardConfig) => `
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
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="vcard-firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.firstName')} *
          </label>
          <input
            type="text"
            id="vcard-firstName"
            value={config.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder={t('form.vcard.firstNamePlaceholder')}
            className={inputClass('firstName')}
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label 
            htmlFor="vcard-lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.lastName')} *
          </label>
          <input
            type="text"
            id="vcard-lastName"
            value={config.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder={t('form.vcard.lastNamePlaceholder')}
            className={inputClass('lastName')}
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* Organization & Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="vcard-organization"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.organization')}
          </label>
          <input
            type="text"
            id="vcard-organization"
            value={config.organization}
            onChange={(e) => handleChange('organization', e.target.value)}
            placeholder={t('form.vcard.organizationPlaceholder')}
            className={inputClass('organization')}
          />
        </div>

        <div>
          <label 
            htmlFor="vcard-title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.title')}
          </label>
          <input
            type="text"
            id="vcard-title"
            value={config.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder={t('form.vcard.titlePlaceholder')}
            className={inputClass('title')}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label 
            htmlFor="vcard-phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.phone')}
          </label>
          <input
            type="tel"
            id="vcard-phone"
            value={config.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder={t('form.vcard.phonePlaceholder')}
            className={inputClass('phone')}
          />
        </div>

        <div>
          <label 
            htmlFor="vcard-email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.email')}
          </label>
          <input
            type="email"
            id="vcard-email"
            value={config.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={t('form.vcard.emailPlaceholder')}
            className={inputClass('email')}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Website */}
      <div>
        <label 
          htmlFor="vcard-website"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.vcard.website')}
        </label>
        <input
          type="url"
          id="vcard-website"
          value={config.website}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder={t('form.vcard.websitePlaceholder')}
          className={inputClass('website')}
          aria-invalid={!!errors.website}
        />
        {errors.website && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.website}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label 
          htmlFor="vcard-address"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.vcard.address')}
        </label>
        <input
          type="text"
          id="vcard-address"
          value={config.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder={t('form.vcard.addressPlaceholder')}
          className={inputClass('address')}
        />
      </div>

      {/* City, State, ZIP, Country */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label 
            htmlFor="vcard-city"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.city')}
          </label>
          <input
            type="text"
            id="vcard-city"
            value={config.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder={t('form.vcard.cityPlaceholder')}
            className={inputClass('city')}
          />
        </div>

        <div>
          <label 
            htmlFor="vcard-state"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.state')}
          </label>
          <input
            type="text"
            id="vcard-state"
            value={config.state}
            onChange={(e) => handleChange('state', e.target.value)}
            placeholder={t('form.vcard.statePlaceholder')}
            className={inputClass('state')}
          />
        </div>

        <div>
          <label 
            htmlFor="vcard-zip"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.zip')}
          </label>
          <input
            type="text"
            id="vcard-zip"
            value={config.zip}
            onChange={(e) => handleChange('zip', e.target.value)}
            placeholder={t('form.vcard.zipPlaceholder')}
            className={inputClass('zip')}
          />
        </div>

        <div>
          <label 
            htmlFor="vcard-country"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.country')}
          </label>
          <input
            type="text"
            id="vcard-country"
            value={config.country}
            onChange={(e) => handleChange('country', e.target.value)}
            placeholder={t('form.vcard.countryPlaceholder')}
            className={inputClass('country')}
          />
        </div>
      </div>
    </div>
  );
};