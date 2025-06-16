import React, { useRef, useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { downloadQRCode } from '../utils/qrcode';

interface QRCodePreviewProps {
  value: string;
  color: string;
  logoFile: File | null;
  size: number;
  isGenerating: boolean;
}

export const QRCodePreview: React.FC<QRCodePreviewProps> = ({
  value,
  color,
  logoFile,
  size,
  isGenerating
}) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoImageSrc, setLogoImageSrc] = useState<string | undefined>(undefined);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setLogoImageSrc(e.target.result);
        }
      };
      reader.readAsDataURL(logoFile);
    } else {
      setLogoImageSrc(undefined);
    }
  }, [logoFile]);

  const handleDownload = async () => {
    if (!containerRef.current) return;
    const canvas = containerRef.current.querySelector('canvas');
    if (!canvas) return;
    setDownloadStatus('downloading');
    try {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadQRCode(canvas, `qrcode-${timestamp}.png`);
      setDownloadStatus('success');
      setTimeout(() => setDownloadStatus('idle'), 2000);
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('error');
      setTimeout(() => setDownloadStatus('idle'), 3000);
    }
  };

  const getDownloadButtonText = () => {
    switch (downloadStatus) {
      case 'downloading':
        return 'Downloading...';
      case 'success':
        return t('preview.downloadSuccess');
      case 'error':
        return t('preview.downloadError');
      default:
        return t('preview.download');
    }
  };

  const getDownloadButtonClass = () => {
    switch (downloadStatus) {
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'error':
        return 'bg-red-600 hover:bg-red-700 text-white';
      default:
        return 'bg-green-700 hover:bg-green-800 text-white';
    }
  };

  if (!value.trim()) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700">
        <div className="w-64 h-64 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Enter text to generate QR code
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {t('preview.title')}
      </h3>
      
      <div 
        ref={containerRef}
        className="relative aspect-square w-full max-w-[256px] mx-auto mb-4 bg-white rounded-lg overflow-hidden"
      >
        {isGenerating ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('preview.generating')}
              </p>
            </div>
          </div>
        ) : !value.trim() ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <p className="text-base text-gray-400 dark:text-gray-300 text-center">
              {t('preview.emptyPlaceholder')}
            </p>
          </div>
        ) : (
          <QRCodeCanvas
            value={value}
            size={size}
            fgColor={color}
            imageSettings={logoImageSrc ? {
              src: logoImageSrc,
              height: size * 0.2,
              width: size * 0.2,
              excavate: true
            } : undefined}
            className="w-full h-full"
          />
        )}
      </div>
      
      <button
        onClick={handleDownload}
        disabled={!value.trim() || isGenerating || downloadStatus === 'downloading'}
        className={`
          w-full px-6 py-3 rounded-lg font-medium
          flex items-center justify-center space-x-2
          transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          ${getDownloadButtonClass()}
        `}
        aria-label={t('preview.downloadButton')}
      >
        {downloadStatus === 'downloading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        <span>{getDownloadButtonText()}</span>
      </button>
    </div>
  );
};