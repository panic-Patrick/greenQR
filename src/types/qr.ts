export type QRType = 'url' | 'wifi' | 'vcard' | 'email';

export interface WiFiConfig {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardConfig {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface EmailConfig {
  to: string;
  subject: string;
  body: string;
}

export interface QRConfig {
  type: QRType;
  url: string;
  wifi: WiFiConfig;
  vcard: VCardConfig;
  email: EmailConfig;
  color: string;
  logoFile: File | null;
}