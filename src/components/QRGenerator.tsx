import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Moon, Sun } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { useDarkMode } from '../hooks/useDarkMode';
import { 
  isValidUrl, 
  isValidHexColor, 
  isValidImageFile,
  validateWiFiConfig,
  validateVCardConfig,
  validateEmailConfig
} from '../utils/validation';
import { generateWiFiString, generateVCardString, generateEmailString } from '../utils/qrGenerators';
import { QRType, QRConfig, WiFiConfig, VCardConfig, EmailConfig } from '../types/qr';
import { QRTypeSelector } from './QRTypeSelector';
import { URLForm } from './forms/URLForm';
import { WiFiForm } from './forms/WiFiForm';
import { VCardForm } from './forms/VCardForm';
import { EmailForm } from './forms/EmailForm';
import { ColorPicker } from './ColorPicker';
import { FileUpload } from './FileUpload';
import { QRCodePreview } from './QRCodePreview';
import LanguageSwitcher from './LanguageSwitcher';

const initialWiFiConfig: WiFiConfig = {
  ssid: '',
  password: '',
  security: 'WPA',
  hidden: false
};

const initialVCardConfig: VCardConfig = {
  firstName: '',
  lastName: '',
  organization: '',
  title: '',
  phone: '',
  email: '',
  website: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: ''
};

const initialEmailConfig: EmailConfig = {
  to: '',
  subject: '',
  body: ''
};

export const QRGenerator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useDarkMode();
  
  // Form state
  const [qrType, setQrType] = useState<QRType>('url');
  const [url, setUrl] = useState('');
  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>(initialWiFiConfig);
  const [vcardConfig, setVcardConfig] = useState<VCardConfig>(initialVCardConfig);
  const [emailConfig, setEmailConfig] = useState<EmailConfig>(initialEmailConfig);
  const [color, setColor] = useState('#000000');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  
  // Validation state
  const [errors, setErrors] = useState<{
    url?: string;
    color?: string;
    logo?: string;
    wifi?: Record<string, string>;
    vcard?: Record<string, string>;
    email?: Record<string, string>;
  }>({});
  
  // Generate QR value based on type
  const qrValue = useMemo(() => {
    switch (qrType) {
      case 'url':
        return url;
      case 'wifi':
        return generateWiFiString(wifiConfig);
      case 'vcard':
        return generateVCardString(vcardConfig);
      case 'email':
        return generateEmailString(emailConfig);
      default:
        return '';
    }
  }, [qrType, url, wifiConfig, vcardConfig, emailConfig]);
  
  // Debounced values for performance
  const debouncedQrValue = useDebounce(qrValue, 300);
  const debouncedColor = useDebounce(color, 300);
  
  const isGenerating = useMemo(() => {
    return debouncedQrValue !== qrValue || debouncedColor !== color;
  }, [qrValue, debouncedQrValue, color, debouncedColor]);

  // Validation
  const validateForm = useCallback(() => {
    const newErrors: typeof errors = {};
    
    // Validate based on QR type
    switch (qrType) {
      case 'url':
        if (!url.trim()) {
          newErrors.url = t('validation.required');
        } else if (url.startsWith('http') && !isValidUrl(url)) {
          newErrors.url = t('validation.invalidUrl');
        }
        break;
      case 'wifi':
        newErrors.wifi = validateWiFiConfig(wifiConfig);
        break;
      case 'vcard':
        newErrors.vcard = validateVCardConfig(vcardConfig);
        break;
      case 'email':
        newErrors.email = validateEmailConfig(emailConfig);
        break;
    }
    
    // Validate color
    if (!isValidHexColor(color)) {
      newErrors.color = t('validation.invalidHex');
    }
    
    // Validate logo
    if (logoFile && !isValidImageFile(logoFile)) {
      newErrors.logo = t('validation.invalidFileType');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [qrType, url, wifiConfig, vcardConfig, emailConfig, color, logoFile, t]);

  // Handlers
  const handleTypeChange = (type: QRType) => {
    setQrType(type);
    setErrors({});
  };

  const handleUrlChange = (value: string) => {
    setUrl(value);
  };

  const handleWifiChange = (config: WiFiConfig) => {
    setWifiConfig(config);
  };

  const handleVcardChange = (config: VCardConfig) => {
    setVcardConfig(config);
  };

  const handleEmailChange = (config: EmailConfig) => {
    setEmailConfig(config);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleLogoSelect = (file: File | null) => {
    if (file) {
      // Create a new File object to ensure we have a fresh instance
      const newFile = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified,
      });
      
      if (isValidImageFile(newFile)) {
        setLogoFile(newFile);
        setErrors(prev => ({ ...prev, logo: undefined }));
      } else {
        setLogoFile(null);
        setErrors(prev => ({ ...prev, logo: t('form.logoError') }));
      }
    } else {
      setLogoFile(null);
      setErrors(prev => ({ ...prev, logo: undefined }));
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  const renderForm = () => {
    switch (qrType) {
      case 'url':
        return (
          <URLForm
            value={url}
            onChange={handleUrlChange}
            error={errors.url}
          />
        );
      case 'wifi':
        return (
          <WiFiForm
            config={wifiConfig}
            onChange={handleWifiChange}
            errors={errors.wifi || {}}
          />
        );
      case 'vcard':
        return (
          <VCardForm
            config={vcardConfig}
            onChange={handleVcardChange}
            errors={errors.vcard || {}}
          />
        );
      case 'email':
        return (
          <EmailForm
            config={emailConfig}
            onChange={handleEmailChange}
            errors={errors.email || {}}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div /> {/* Spacer */}
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {t('title')}
            </h1>
            <div className="flex space-x-2">
              <LanguageSwitcher />
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-lg shadow-lg p-6 border border-emerald-200 dark:border-emerald-800 backdrop-blur-sm">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              {/* QR Type Selector */}
              <QRTypeSelector
                selectedType={qrType}
                onTypeChange={handleTypeChange}
              />

              {/* Dynamic Form */}
              {renderForm()}

              {/* Logo Upload */}
              <FileUpload
                onFileSelect={handleLogoSelect}
                selectedFile={logoFile}
                label={t('form.logoLabel')}
                error={errors.logo}
              />

              {/* Color Picker */}
              <ColorPicker
                color={color}
                onChange={handleColorChange}
                label={t('form.colorLabel')}
                error={errors.color}
              />
            </form>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-lg shadow-lg p-6 border border-emerald-200 dark:border-emerald-800 backdrop-blur-sm">
              <QRCodePreview
                value={debouncedQrValue}
                color={debouncedColor}
                logoFile={logoFile}
                size={256}
                isGenerating={isGenerating}
              />
            </div>

            {/* Quick Info */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-4">
              <h4 className="font-medium text-emerald-900 dark:text-emerald-100 mb-2">
                {qrType === 'wifi' && t('tips.wifi.title')}
                {qrType === 'vcard' && t('tips.vcard.title')}
                {qrType === 'email' && t('tips.email.title')}
                {qrType === 'url' && t('tips.url.title')}
              </h4>
              <ul className="text-sm text-emerald-800 dark:text-emerald-200 space-y-1">
                {qrType === 'wifi' && (
                  <>
                    {(t('tips.wifi.items', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </>
                )}
                {qrType === 'vcard' && (
                  <>
                    {(t('tips.vcard.items', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </>
                )}
                {qrType === 'email' && (
                  <>
                    {(t('tips.email.items', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </>
                )}
                {qrType === 'url' && (
                  <>
                    {(t('tips.url.items', { returnObjects: true }) as string[]).map((tip: string, index: number) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};