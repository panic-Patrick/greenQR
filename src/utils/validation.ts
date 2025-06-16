export const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const maxSize = 2 * 1024 * 1024; // 2MB
  
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
    errors.ssid = 'SSID is required';
  }
  
  if (config.security !== 'nopass' && !config.password?.trim()) {
    errors.password = 'Password is required for secured networks';
  }
  
  return errors;
};

export const validateVCardConfig = (config: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!config.firstName?.trim() && !config.lastName?.trim()) {
    errors.firstName = 'At least first name or last name is required';
    errors.lastName = 'At least first name or last name is required';
  }
  
  if (config.email && !isValidEmail(config.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (config.website && !isValidUrl(config.website)) {
    errors.website = 'Please enter a valid website URL';
  }
  
  return errors;
};

export const validateEmailConfig = (config: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!config.to?.trim()) {
    errors.to = 'Recipient email is required';
  } else if (!isValidEmail(config.to)) {
    errors.to = 'Please enter a valid email address';
  }
  
  return errors;
};