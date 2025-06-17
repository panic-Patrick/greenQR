import React from 'react';
import { useTranslation } from 'react-i18next';
import { VCardConfig } from '../../types/qr';
import { Plus, X } from 'lucide-react';

interface VCardFormProps {
  config: VCardConfig;
  onChange: (config: VCardConfig) => void;
  errors: Partial<Record<keyof VCardConfig, string>>;
}

export const VCardForm: React.FC<VCardFormProps> = ({ config, onChange, errors }) => {
  const { t } = useTranslation();

  const handleChange = (field: keyof VCardConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const handleAddPhone = () => {
    onChange({ ...config, phones: [...config.phones, ''] });
  };

  const handleRemovePhone = (index: number) => {
    const newPhones = [...config.phones];
    newPhones.splice(index, 1);
    onChange({ ...config, phones: newPhones });
  };

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...config.phones];
    newPhones[index] = value;
    onChange({ ...config, phones: newPhones });
  };

  const handleAddEmail = () => {
    onChange({ ...config, emails: [...config.emails, ''] });
  };

  const handleRemoveEmail = (index: number) => {
    const newEmails = [...config.emails];
    newEmails.splice(index, 1);
    onChange({ ...config, emails: newEmails });
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...config.emails];
    newEmails[index] = value;
    onChange({ ...config, emails: newEmails });
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
            {t('form.vcard.firstName')}
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
            {t('form.vcard.lastName')}
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

      {/* Title Type */}
      <div>
        <label 
          htmlFor="vcard-titleType"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.vcard.titleType')}
        </label>
        <select
          id="vcard-titleType"
          value={config.titleType}
          onChange={(e) => handleChange('titleType', e.target.value)}
          className={inputClass('titleType')}
        >
          <option value="none">{t('form.vcard.titleTypeNone')}</option>
          <option value="mr">{t('form.vcard.titleTypeMr')}</option>
          <option value="mrs">{t('form.vcard.titleTypeMrs')}</option>
          <option value="ms">{t('form.vcard.titleTypeMs')}</option>
          <option value="dr">{t('form.vcard.titleTypeDr')}</option>
          <option value="prof">{t('form.vcard.titleTypeProf')}</option>
        </select>
      </div>

      {/* Organization & Department */}
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
            htmlFor="vcard-department"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {t('form.vcard.department')}
          </label>
          <input
            type="text"
            id="vcard-department"
            value={config.department}
            onChange={(e) => handleChange('department', e.target.value)}
            placeholder={t('form.vcard.departmentPlaceholder')}
            className={inputClass('department')}
          />
        </div>
      </div>

      {/* Job Title */}
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

      {/* Alternative Name */}
      <div>
        <label 
          htmlFor="vcard-alternativeName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.vcard.alternativeName')}
        </label>
        <input
          type="text"
          id="vcard-alternativeName"
          value={config.alternativeName}
          onChange={(e) => handleChange('alternativeName', e.target.value)}
          placeholder={t('form.vcard.alternativeNamePlaceholder')}
          className={inputClass('alternativeName')}
        />
      </div>

      {/* Notes */}
      <div>
        <label 
          htmlFor="vcard-notes"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {t('form.vcard.notes')}
        </label>
        <textarea
          id="vcard-notes"
          value={config.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          placeholder={t('form.vcard.notesPlaceholder')}
          rows={3}
          className={inputClass('notes')}
        />
      </div>

      {/* Phone Numbers */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('form.vcard.phone')}
          </label>
          <button
            type="button"
            onClick={handleAddPhone}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
          >
            <Plus className="w-4 h-4 mr-1" />
            {t('form.vcard.addPhone')}
          </button>
        </div>
        {config.phones.map((phone, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
              placeholder={t('form.vcard.phonePlaceholder')}
              className={inputClass('phones')}
            />
            <button
              type="button"
              onClick={() => handleRemovePhone(index)}
              className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {/* Email Addresses */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('form.vcard.email')}
          </label>
          <button
            type="button"
            onClick={handleAddEmail}
            className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
          >
            <Plus className="w-4 h-4 mr-1" />
            {t('form.vcard.addEmail')}
          </button>
        </div>
        {config.emails.map((email, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="email"
              value={email}
              onChange={(e) => handleEmailChange(index, e.target.value)}
              placeholder={t('form.vcard.emailPlaceholder')}
              className={inputClass('emails')}
            />
            <button
              type="button"
              onClick={() => handleRemoveEmail(index)}
              className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
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