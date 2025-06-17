import React, { useRef, useEffect, useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { downloadQRCode } from '../utils/qrcode';
import { ToggleSwitch } from './ToggleSwitch';
import { QRBodyShape, QREyeFrameShape, QREyeBallShape } from './QRStyleSelector';
import QRCodeStyling from 'qr-code-styling';

interface QRCodePreviewProps {
  value: string;
  color: string;
  iconSvg: string | null;
  size: number;
  isGenerating: boolean;
  bodyShape: QRBodyShape;
  eyeFrameShape: QREyeFrameShape;
  eyeBallShape: QREyeBallShape;
  defaultLogoUrl?: string;
}

function mapEyeFrameShape(shape: QREyeFrameShape): any {
  // Allowed: 'square', 'extra-rounded', 'dot', 'classy', 'classy-rounded'
  switch (shape) {
    case 'square':
    case 'extra-rounded':
    case 'dot':
    case 'classy':
    case 'classy-rounded':
      return shape;
    // Map unsupported to closest
    case 'circle':
      return 'dot';
    case 'frame13':
    case 'frame14':
    case 'frame15':
      return 'square';
    default:
      return 'square';
  }
}

function mapEyeBallShape(shape: QREyeBallShape): any {
  // Allowed: 'dot', 'square', 'extra-rounded', 'classy', 'classy-rounded'
  switch (shape) {
    case 'dot':
    case 'square':
    case 'extra-rounded':
    case 'classy':
    case 'classy-rounded':
      return shape;
    // Map unsupported to closest
    case 'circle':
      return 'dot';
    case 'ball13':
    case 'ball14':
    case 'ball15':
      return 'dot';
    default:
      return 'square';
  }
}

export const QRCodePreview: React.FC<QRCodePreviewProps> = ({
  value,
  color,
  iconSvg,
  size,
  isGenerating,
  bodyShape,
  eyeFrameShape,
  eyeBallShape,
  defaultLogoUrl
}) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<any>(null);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [exportFormat, setExportFormat] = useState<'png' | 'svg'>('png');

  useEffect(() => {
    if (!containerRef.current) return;
    let isMounted = true;
    const createQRCode = (image: string | undefined) => {
      if (!isMounted) return;
      qrCodeRef.current = new QRCodeStyling({
        width: size,
        height: size,
        data: value,
        type: 'svg',
        dotsOptions: {
          color: color,
          type: bodyShape,
        },
        cornersSquareOptions: {
          type: mapEyeFrameShape(eyeFrameShape),
        },
        cornersDotOptions: {
          type: mapEyeBallShape(eyeBallShape),
        },
        image,
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 2,
        },
        qrOptions: {
          errorCorrectionLevel: 'H',
        },
      });
      containerRef.current.innerHTML = '';
      qrCodeRef.current.append(containerRef.current);
    };
    if (iconSvg) {
      // Prüfen, ob es sich um eine Base64-Bild-URL handelt
      if (iconSvg.startsWith('data:image/')) {
        createQRCode(iconSvg);
      } else {
        // SVG-String als Data-URL
        const svgBase64 = btoa(unescape(encodeURIComponent(iconSvg)));
        const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;
        createQRCode(dataUrl);
      }
    } else if (defaultLogoUrl) {
      createQRCode(window.location.origin + defaultLogoUrl);
    } else {
      createQRCode(undefined);
    }
    return () => { isMounted = false; };
  }, [value, color, size, bodyShape, eyeFrameShape, eyeBallShape, iconSvg, defaultLogoUrl]);

  const handleDownload = async () => {
    if (!qrCodeRef.current) return;
    setDownloadStatus('downloading');
    try {
      const timestamp = new Date().toISOString().slice(0, 10);
      await qrCodeRef.current.download({ name: `qrcode-${timestamp}`, extension: exportFormat });
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
        return `${exportFormat.toUpperCase()} ${t('preview.download')}`;
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-200 dark:border-gray-700" role="status" aria-label="Empty QR Code">
        <div className="w-64 h-64 mx-auto bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {t('preview.emptyPlaceholder')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700" role="region" aria-label="QR Code Preview">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        {t('preview.title')}
      </h3>
      <div 
        ref={containerRef}
        className="relative aspect-square w-full max-w-[256px] mx-auto mb-4 bg-white rounded-lg overflow-hidden"
        role="img"
        aria-label={`QR Code for ${value}`}
        style={{ minHeight: size, minWidth: size }}
      >
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900" role="status" aria-label="Generating QR Code">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" aria-hidden="true" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('preview.generating')}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {/* Format Selection */}
        <div className="flex justify-center">
          <ToggleSwitch
            isOn={exportFormat === 'svg'}
            onToggle={() => setExportFormat(exportFormat === 'png' ? 'svg' : 'png')}
            leftLabel="PNG"
            rightLabel="SVG"
          />
        </div>
        {/* Download Button */}
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
    </div>
  );
};