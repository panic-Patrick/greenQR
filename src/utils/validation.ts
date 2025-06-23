export const isValidUrl = (url: string): boolean => {
  if (!url.trim()) {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch (_) {
    try {
      new URL(`https://${url}`);
      return true;
    } catch (e) {
      return false;
    }
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidHexColor = (hex: string): boolean => {
  const hexRegex = /^#[0-9a-fA-F]{6}$/;
  return hexRegex.test(hex);
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  return validTypes.includes(file.type) && file.size <= maxSize;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const validateWiFiConfig = (config: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!config.ssid?.trim()) {
    errors.ssid = 'validation.wifi.ssidRequired';
  }
  
  if (config.security !== 'nopass' && !config.password?.trim()) {
    errors.password = 'validation.wifi.passwordRequired';
  }
  
  return errors;
};

export const validateVCardConfig = (config: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Validate emails if any are provided
  if (config.emails?.length > 0) {
    config.emails.forEach((email: string, index: number) => {
      if (email && !isValidEmail(email)) {
        errors[`emails.${index}`] = 'validation.vcard.invalidEmail';
      }
    });
  }
  
  // Validate website if provided
  if (config.website && !isValidUrl(config.website)) {
    errors.website = 'validation.vcard.invalidWebsite';
  }
  
  return errors;
};

export const validateEmailConfig = (config: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!config.to?.trim()) {
    errors.to = 'validation.email.recipientRequired';
  } else if (!isValidEmail(config.to)) {
    errors.to = 'validation.email.invalidRecipient';
  }
  
  return errors;
};