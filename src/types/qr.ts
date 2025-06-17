export type QRType = 'url' | 'wifi' | 'vcard' | 'email';
export type QRPointStyle = 'square' | 'circle';
export type QRBodyShape = 'square' | 'dots' | 'rounded' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type QREyeFrameShape = 'square' | 'circle' | 'extra-rounded' | 'classy' | 'classy-rounded';
export type QREyeBallShape = 'square' | 'circle' | 'extra-rounded' | 'classy' | 'classy-rounded' | 'dot';

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
  titleType: 'mr' | 'mrs' | 'ms' | 'dr' | 'prof' | 'none';
  department: string;
  alternativeName: string;
  notes: string;
  phones: string[];
  emails: string[];
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
  pointStyle: QRPointStyle;
}