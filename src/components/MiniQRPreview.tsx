import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRBodyShape, QREyeFrameShape, QREyeBallShape } from '../types/qr';

interface MiniQRPreviewProps {
  bodyShape: QRBodyShape;
  eyeFrameShape: QREyeFrameShape;
  eyeBallShape: QREyeBallShape;
  size?: number;
}

export const MiniQRPreview: React.FC<MiniQRPreviewProps> = ({
  bodyShape,
  eyeFrameShape,
  eyeBallShape,
  size = 36
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const qrRef = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (qrRef.current) {
      qrRef.current.update({
        data: 'A',
        width: size,
        height: size,
        dotsOptions: { color: '#fff', type: bodyShape },
        backgroundOptions: { color: 'transparent' },
        cornersSquareOptions: { type: eyeFrameShape, color: '#fff' },
        cornersDotOptions: { type: eyeBallShape, color: '#fff' },
        image: undefined,
      });
    } else {
      qrRef.current = new QRCodeStyling({
        width: size,
        height: size,
        data: 'A',
        type: 'svg',
        dotsOptions: { color: '#fff', type: bodyShape },
        backgroundOptions: { color: 'transparent' },
        cornersSquareOptions: { type: eyeFrameShape, color: '#fff' },
        cornersDotOptions: { type: eyeBallShape, color: '#fff' },
        qrOptions: { errorCorrectionLevel: 'H' },
      });
    }
    ref.current.innerHTML = '';
    qrRef.current.append(ref.current);
  }, [bodyShape, eyeFrameShape, eyeBallShape, size]);

  return (
    <div
      ref={ref}
      style={{ width: size, height: size, display: 'inline-block', background: 'transparent' }}
      aria-hidden="true"
    />
  );
}; 