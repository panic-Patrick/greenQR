import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

export type QRBodyShape = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type QREyeFrameShape = 'square' | 'circle' | 'extra-rounded' | 'classy' | 'classy-rounded' | 'dot';
export type QREyeBallShape = 'square' | 'circle' | 'extra-rounded' | 'classy' | 'classy-rounded' | 'dot';

interface QRStyleSelectorProps {
  bodyShape: QRBodyShape;
  onBodyShapeChange: (shape: QRBodyShape) => void;
  eyeFrameShape: QREyeFrameShape;
  onEyeFrameShapeChange: (shape: QREyeFrameShape) => void;
  eyeBallShape: QREyeBallShape;
  onEyeBallShapeChange: (shape: QREyeBallShape) => void;
}

const getRadius = (bodyShape: QRBodyShape) => {
  if (bodyShape === 'extra-rounded') return 12;
  if (bodyShape === 'rounded') return 6;
  return 0;
};

// Realistic SVG icons for each style
const bodyShapeIcons: Record<QRBodyShape, JSX.Element> = {
  square: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <rect x="4" y="4" width="28" height="28" fill="#fff" rx="0" />
    </svg>
  ),
  dots: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      {[...Array(5)].map((_, i) =>
        [...Array(5)].map((_, j) => (
          <circle key={i + '-' + j} cx={7 + j * 6} cy={7 + i * 6} r="2.2" fill="#fff" />
        ))
      )}
    </svg>
  ),
  rounded: (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <rect x="4" y="4" width="28" height="28" fill="#fff" rx="7" />
    </svg>
  ),
  'extra-rounded': (
    <svg width="36" height="36" viewBox="0 0 36 36">
      <rect x="4" y="4" width="28" height="28" fill="#fff" rx="14" />
    </svg>
  ),
  classy: (
    <svg width="36" height="36" viewBox="0 0 57 63">
      <g>
        <path style={{opacity:1}} fill="#fff" d="M 3.5,6.5 C 18.8156,7.80829 34.1489,8.97496 49.5,10C 50.6667,11.1667 51.8333,12.3333 53,13.5C 53.4999,27.8295 53.6666,42.1628 53.5,56.5C 39.496,56.6666 25.496,56.4999 11.5,56C 9.95118,54.786 8.78451,53.286 8,51.5C 6.33434,36.511 4.83434,21.511 3.5,6.5 Z"/>
      </g>
    </svg>
  ),
  'classy-rounded': (
    <svg width="36" height="36" viewBox="0 0 57 63">
      <g>
        <path style={{opacity:1}} fill="#fff" d="M 10,6.5 Q 31,8 49.5,10 Q 50.6667,11.1667 51.8333,12.3333 53,13.5 53.4999,27.8295 53.6666,42.1628 53.5,56.5 39.496,56.6666 25.496,56.4999 15,56 11.5,56 Q 6.5,56 6.5,51 Q 6.5,44 6.5,13 Q 6.5,6.5 10,6.5 Z"/>
      </g>
    </svg>
  ),
};
const eyeFrameShapeIcons = (bodyShape: QRBodyShape): Record<QREyeFrameShape, JSX.Element> => {
  const rx = getRadius(bodyShape);
  return {
    square: (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <rect x="6" y="6" width="24" height="24" fill="none" stroke="#fff" strokeWidth="4" rx={rx} />
      </svg>
    ),
    circle: (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="12" fill="none" stroke="#fff" strokeWidth="4" />
      </svg>
    ),
    'extra-rounded': (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <rect x="6" y="6" width="24" height="24" fill="none" stroke="#fff" strokeWidth="4" rx={12} />
      </svg>
    ),
    classy: (
      <svg width="36" height="36" viewBox="0 0 73 67">
        <g>
          <path style={{opacity:1}} fill="#fff" d="M 64.5,5.5 C 64.6666,19.504 64.4999,33.504 64,47.5C 62.8529,52.7959 60.0196,56.7959 55.5,59.5C 53.8211,59.8923 52.1545,60.3923 50.5,61C 36.504,61.4999 22.504,61.6666 8.5,61.5C 8.23244,46.4712 8.56578,31.4712 9.5,16.5C 10.9063,16.0269 11.573,15.0269 11.5,13.5C 13.1667,11.1667 15.1667,9.16667 17.5,7.5C 19.1789,7.10767 20.8455,6.60767 22.5,6C 36.496,5.50009 50.496,5.33343 64.5,5.5 Z"/>
          <path style={{opacity:1}} fill="#374151" d="M 55.5,46.5 C 54.4007,49.9321 52.0674,51.9321 48.5,52.5C 38.1667,52.5 27.8333,52.5 17.5,52.5C 17.21,41.1159 17.5433,29.7825 18.5,18.5C 19.1667,17.1667 20.1667,16.1667 21.5,15.5C 32.7825,14.5433 44.1159,14.21 55.5,14.5C 55.5,25.1667 55.5,35.8333 55.5,46.5 Z"/>
        </g>
      </svg>
    ),
    'classy-rounded': (
      <svg width="36" height="36" viewBox="0 0 73 67">
        <g>
          <path style={{opacity:1}} fill="#fff" d="M 64.5,5.5 C 64.6666,19.504 64.4999,33.504 64,47.5C 62.8529,52.7959 60.0196,56.7959 55.5,59.5C 53.8211,59.8923 52.1545,60.3923 50.5,61C 36.504,61.4999 22.504,61.6666 8.5,61.5C 8.23244,46.4712 8.56578,31.4712 9.5,16.5C 10.9063,16.0269 11.573,15.0269 11.5,13.5C 13.1667,11.1667 15.1667,9.16667 17.5,7.5C 19.1789,7.10767 20.8455,6.60767 22.5,6C 36.496,5.50009 50.496,5.33343 64.5,5.5 Z"/>
          <path style={{opacity:1}} fill="#374151" d="M 55.5,46.5 C 54.4007,49.9321 52.0674,51.9321 48.5,52.5C 38.1667,52.5 27.8333,52.5 17.5,52.5C 17.21,41.1159 17.5433,29.7825 18.5,18.5C 19.1667,17.1667 20.1667,16.1667 21.5,15.5C 32.7825,14.5433 44.1159,14.21 55.5,14.5C 55.5,25.1667 55.5,35.8333 55.5,46.5 Z"/>
        </g>
      </svg>
    ),
    dot: (
      <svg width="36" height="36" viewBox="0 0 36 36">
        {[...Array(4)].map((_, i) =>
          <circle key={i} cx={10 + i * 5} cy={10} r="2" fill="#fff" />
        )}
        {[...Array(4)].map((_, i) =>
          <circle key={i + 4} cx={10} cy={10 + i * 5} r="2" fill="#fff" />
        )}
        {[...Array(4)].map((_, i) =>
          <circle key={i + 8} cx={26} cy={10 + i * 5} r="2" fill="#fff" />
        )}
        {[...Array(4)].map((_, i) =>
          <circle key={i + 12} cx={10 + i * 5} cy={26} r="2" fill="#fff" />
        )}
      </svg>
    ),
  };
};
const eyeBallShapeIcons = (bodyShape: QRBodyShape): Record<QREyeBallShape, JSX.Element> => {
  const rx = getRadius(bodyShape);
  return {
    square: (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <rect x="12" y="12" width="12" height="12" fill="#fff" rx={rx} />
      </svg>
    ),
    circle: (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="8" fill="#fff" />
      </svg>
    ),
    'extra-rounded': (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <rect x="12" y="12" width="12" height="12" fill="#fff" rx={12} />
      </svg>
    ),
    classy: (
      <svg width="36" height="36" viewBox="0 0 73 67">
        <g>
          <path style={{opacity:1}} fill="#fff" d="M 64.5,5.5 C 64.6666,19.504 64.4999,33.504 64,47.5C 62.8529,52.7959 60.0196,56.7959 55.5,59.5C 53.8211,59.8923 52.1545,60.3923 50.5,61C 36.504,61.4999 22.504,61.6666 8.5,61.5C 8.23244,46.4712 8.56578,31.4712 9.5,16.5C 10.9063,16.0269 11.573,15.0269 11.5,13.5C 13.1667,11.1667 15.1667,9.16667 17.5,7.5C 19.1789,7.10767 20.8455,6.60767 22.5,6C 36.496,5.50009 50.496,5.33343 64.5,5.5 Z"/>
        </g>
      </svg>
    ),
    'classy-rounded': (
      <svg width="36" height="36" viewBox="0 0 73 67">
      <g>
        <path style={{opacity:1}} fill="#fff" d="M 64.5,5.5 C 64.6666,19.504 64.4999,33.504 64,47.5C 62.8529,52.7959 60.0196,56.7959 55.5,59.5C 53.8211,59.8923 52.1545,60.3923 50.5,61C 36.504,61.4999 22.504,61.6666 8.5,61.5C 8.23244,46.4712 8.56578,31.4712 9.5,16.5C 10.9063,16.0269 11.573,15.0269 11.5,13.5C 13.1667,11.1667 15.1667,9.16667 17.5,7.5C 19.1789,7.10767 20.8455,6.60767 22.5,6C 36.496,5.50009 50.496,5.33343 64.5,5.5 Z"/>
      </g>
    </svg>
    ),
    dot: (
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="8" fill="none" stroke="#fff" strokeWidth="3" />
      </svg>
    ),
  };
};

const bodyShapeLabels: Record<QRBodyShape, string> = {
  square: 'Quadratisch',
  dots: 'Punkte',
  rounded: 'Abgerundet',
  'extra-rounded': 'Extra Rund',
  classy: 'Klassisch',
  'classy-rounded': 'Klassisch Rund',
};
const eyeFrameShapeLabels: Record<QREyeFrameShape, string> = {
  square: 'Quadratisch',
  circle: 'Rund',
  'extra-rounded': 'Extra Rund',
  classy: 'Klassisch',
  'classy-rounded': 'Klassisch Rund',
  dot: 'Punkte',
};
const eyeBallShapeLabels: Record<QREyeBallShape, string> = {
  square: 'Quadratisch',
  circle: 'Rund',
  'extra-rounded': 'Extra Rund',
  classy: 'Klassisch',
  'classy-rounded': 'Klassisch Rund',
  dot: 'Punkte',
};

export const QRStyleSelector: React.FC<QRStyleSelectorProps> = ({
  bodyShape,
  onBodyShapeChange,
  eyeFrameShape,
  onEyeFrameShapeChange,
  eyeBallShape,
  onEyeBallShapeChange
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const bodyShapes: QRBodyShape[] = ['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'];
  const eyeFrameShapes: QREyeFrameShape[] = ['square', 'circle', 'extra-rounded', 'classy', 'classy-rounded', 'dot'];
  const eyeBallShapes: QREyeBallShape[] = ['square', 'circle', 'extra-rounded', 'classy', 'classy-rounded', 'dot'];

  return (
    <div className="mb-6">
      <details 
        className="group"
        open={isOpen}
        onToggle={(e) => setIsOpen(e.currentTarget.open)}
      >
        <summary className="flex items-center justify-between cursor-pointer list-none p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
          <span className="text-sm font-medium text-gray-200">QR-Code Styling</span>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </summary>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Körperform</label>
            <div className="grid grid-cols-6 gap-2 bg-gray-900 p-2 rounded-lg">
              {bodyShapes.map(id => (
                <button
                  key={id}
                  type="button"
                  title={bodyShapeLabels[id]}
                  onClick={() => onBodyShapeChange(id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition border-2 ${bodyShape === id ? 'border-green-400 bg-gray-800' : 'border-transparent bg-gray-700 hover:border-green-600'} focus:outline-none`}
                  aria-label={bodyShapeLabels[id]}
                >
                  {bodyShapeIcons[id]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Augenrahmen</label>
            <div className="grid grid-cols-5 gap-2 bg-gray-900 p-2 rounded-lg">
              {eyeFrameShapes.map(id => (
                <button
                  key={id}
                  type="button"
                  title={eyeFrameShapeLabels[id]}
                  onClick={() => onEyeFrameShapeChange(id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition border-2 ${eyeFrameShape === id ? 'border-green-400 bg-gray-800' : 'border-transparent bg-gray-700 hover:border-green-600'} focus:outline-none`}
                  aria-label={eyeFrameShapeLabels[id]}
                >
                  {eyeFrameShapeIcons(bodyShape)[id]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Augeninneres</label>
            <div className="grid grid-cols-6 gap-2 bg-gray-900 p-2 rounded-lg">
              {eyeBallShapes.map(id => (
                <button
                  key={id}
                  type="button"
                  title={eyeBallShapeLabels[id]}
                  onClick={() => onEyeBallShapeChange(id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition border-2 ${eyeBallShape === id ? 'border-green-400 bg-gray-800' : 'border-transparent bg-gray-700 hover:border-green-600'} focus:outline-none`}
                  aria-label={eyeBallShapeLabels[id]}
                >
                  {eyeBallShapeIcons(bodyShape)[id]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}; 