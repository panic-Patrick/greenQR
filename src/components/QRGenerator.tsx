import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
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
import { QRStyleSelector, QRBodyShape, QREyeFrameShape, QREyeBallShape } from './QRStyleSelector';
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
  titleType: 'none',
  department: '',
  alternativeName: '',
  notes: '',
  phones: [''],
  emails: [''],
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

const DEFAULT_LOGO_URL = '/sunflower.svg';

export const QRGenerator: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  // Form state
  const [qrType, setQrType] = useState<QRType>('url');
  const [url, setUrl] = useState('');
  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>(initialWiFiConfig);
  const [vcardConfig, setVcardConfig] = useState<VCardConfig>(initialVCardConfig);
  const [emailConfig, setEmailConfig] = useState<EmailConfig>(initialEmailConfig);
  const [color, setColor] = useState('#000000');
  const [iconColor, setIconColor] = useState('#000000');
  const [iconSvg, setIconSvg] = useState<string | null>(null);
  const [iconLabel, setIconLabel] = useState<string | null>(null);
  const [bodyShape, setBodyShape] = useState<QRBodyShape>('square');
  const [eyeFrameShape, setEyeFrameShape] = useState<QREyeFrameShape>('square');
  const [eyeBallShape, setEyeBallShape] = useState<QREyeBallShape>('square');
  const [showLogo, setShowLogo] = useState(true);
  const [coloredIconSvg, setColoredIconSvg] = useState<string | null>(null);
  
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
    if (iconSvg && !isValidImageFile(new File([iconSvg], 'icon.svg', { type: 'image/svg+xml' }))) {
      newErrors.logo = t('validation.invalidFileType');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [qrType, url, wifiConfig, vcardConfig, emailConfig, color, iconSvg, t]);

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

  // Hilfsfunktion: SVG-Icon-Logo erkennen und neu generieren
  const regenerateSvgIconLogo = (newColor: string) => {
    if (!iconSvg) return;
    if (iconSvg.startsWith('<svg')) {
      // Versuche, das SVG zu parsen und die fill-Farbe zu ersetzen
      const updatedSvg = iconSvg.replace(/fill='[^']*'/g, `fill='${newColor}'`);
      setIconSvg(updatedSvg);
    }
  };

  // Icon-Farbe ändern: Wenn SVG-Logo, dann neu generieren
  const handleIconColorChange = (newColor: string) => {
    setIconColor(newColor);
    regenerateSvgIconLogo(newColor);
  };

  const handleIconSelect = (icon: { svgText: string; label: string } | null) => {
    if (icon) {
      setIconSvg(icon.svgText);
      setIconLabel(icon.label);
      setErrors(prev => ({ ...prev, logo: undefined }));
    } else {
      setIconSvg(null);
      setIconLabel(null);
      setErrors(prev => ({ ...prev, logo: undefined }));
    }
  };

  // Update coloredIconSvg whenever iconSvg or iconColor changes
  React.useEffect(() => {
    if (iconSvg) {
      let colored = iconSvg.replace(/fill="[^"]*"/g, `fill="${iconColor}"`);
      if (!colored.includes('fill=')) {
        colored = colored.replace(/<svg/, `<svg fill="${iconColor}"`);
      }
      colored = colored.replace(/<path/g, `<path fill="${iconColor}"`);
      setColoredIconSvg(colored);
    } else {
      setColoredIconSvg(null);
    }
  }, [iconSvg, iconColor]);

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
              <LanguageSwitcher aria-label="Sprache ändern" />
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
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()} role="form" aria-label="QR Code Einstellungen">
              {/* QR Type Selector */}
              <QRTypeSelector
                selectedType={qrType}
                onTypeChange={handleTypeChange}
                aria-label="QR Code Typ auswählen"
              />

              {/* Dynamic Form */}
              {renderForm()}

              {/* Logo Upload */}
              <div>
                <FileUpload
                  onIconSelect={handleIconSelect}
                  selectedFile={null}
                  label={t('form.logoLabel')}
                  error={errors.logo}
                  iconColor={iconColor}
                  aria-label="Logo hochladen"
                />
                <button
                  type="button"
                  onClick={() => setShowLogo((v) => !v)}
                  className={`mt-2 w-full px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 ${showLogo ? 'bg-green-100 text-green-800 border-green-300 hover:bg-green-200' : 'bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200'}`}
                  aria-pressed={showLogo}
                  aria-label={showLogo ? t('upload.removeImage') : t('form.logoLabel')}
                >
                  {showLogo ? t('upload.removeImage') : t('form.logoLabel')}
                </button>
              </div>

              {/* QR Style Selector */}
              <QRStyleSelector
                bodyShape={bodyShape}
                onBodyShapeChange={setBodyShape}
                eyeFrameShape={eyeFrameShape}
                onEyeFrameShapeChange={setEyeFrameShape}
                eyeBallShape={eyeBallShape}
                onEyeBallShapeChange={setEyeBallShape}
                aria-label="QR Code Stil auswählen"
              />

              {/* Color Picker nebeneinander */}
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <ColorPicker
                    color={color}
                    onChange={handleColorChange}
                    label={t('form.colorLabel')}
                    error={errors.color}
                    aria-label="QR Code Farbe auswählen"
                  />
                </div>
                <div className="flex-1">
                  <ColorPicker
                    color={iconColor}
                    onChange={handleIconColorChange}
                    label={t('form.logoLabel') + ' (Icon-Farbe)'}
                    dropdownDirection="up"
                    aria-label="Icon Farbe auswählen"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="space-y-6">
              <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-lg shadow-lg p-6 border border-emerald-200 dark:border-emerald-800 backdrop-blur-sm">
                <QRCodePreview
                  value={debouncedQrValue}
                  color={debouncedColor}
                  iconSvg={showLogo ? coloredIconSvg : null}
                  defaultLogoUrl={showLogo ? DEFAULT_LOGO_URL : undefined}
                  size={256}
                  isGenerating={isGenerating}
                  bodyShape={bodyShape}
                  eyeFrameShape={eyeFrameShape}
                  eyeBallShape={eyeBallShape}
                  aria-label="QR Code Vorschau"
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
    </div>
  );
};