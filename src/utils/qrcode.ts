export const downloadQRCode = (canvas: HTMLCanvasElement, filename: string = 'qrcode.png'): void => {
  try {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw new Error('Failed to download QR code');
  }
};

export const createImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      // Ensure the image is fully loaded before resolving
      if (img.complete) {
        URL.revokeObjectURL(url);
        resolve(img);
      } else {
        img.onload = () => {
          URL.revokeObjectURL(url);
          resolve(img);
        };
      }
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    // Set crossOrigin to anonymous to handle CORS issues
    img.crossOrigin = 'anonymous';
    img.src = url;
  });
};