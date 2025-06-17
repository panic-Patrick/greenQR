import { WiFiConfig, VCardConfig, EmailConfig } from '../types/qr';

export const generateWiFiString = (config: WiFiConfig): string => {
  const { ssid, password, security, hidden } = config;
  
  if (!ssid.trim()) return '';
  
  const escapedSSID = ssid.replace(/[\\;,":]/g, '\\$&');
  const escapedPassword = password.replace(/[\\;,":]/g, '\\$&');
  
  return `WIFI:T:${security};S:${escapedSSID};P:${escapedPassword};H:${hidden ? 'true' : 'false'};;`;
};

export const generateVCardString = (config: VCardConfig): string => {
  const {
    firstName,
    lastName,
    organization,
    title,
    titleType,
    department,
    alternativeName,
    notes,
    phones,
    emails,
    website,
    address,
    city,
    state,
    zip,
    country
  } = config;
  
  const fullName = `${firstName} ${lastName}`.trim();
  const formattedAddress = [address, city, state, zip, country]
    .filter(Boolean)
    .join(', ');
  
  let vcard = 'BEGIN:VCARD\n';
  vcard += 'VERSION:3.0\n';
  
  // Add title if selected
  if (titleType !== 'none') {
    const titleMap = {
      'mr': 'Herr',
      'mrs': 'Frau',
      'ms': 'Frau',
      'dr': 'Dr.',
      'prof': 'Prof.'
    };
    vcard += `TITLE:${titleMap[titleType]}\n`;
  }
  
  vcard += `FN:${fullName}\n`;
  vcard += `N:${lastName};${firstName};;;\n`;
  
  if (organization) vcard += `ORG:${organization}\n`;
  if (department) vcard += `ORG:${organization};${department}\n`;
  if (title) vcard += `TITLE:${title}\n`;
  if (alternativeName) vcard += `NICKNAME:${alternativeName}\n`;
  if (notes) vcard += `NOTE:${notes}\n`;
  
  // Add all phone numbers
  phones.forEach(phone => {
    if (phone.trim()) {
      vcard += `TEL:${phone}\n`;
    }
  });
  
  // Add all email addresses
  emails.forEach(email => {
    if (email.trim()) {
      vcard += `EMAIL:${email}\n`;
    }
  });
  
  if (website) vcard += `URL:${website}\n`;
  if (formattedAddress) vcard += `ADR:;;${formattedAddress};;;;\n`;
  
  vcard += 'END:VCARD';
  
  return vcard;
};

export const generateEmailString = (config: EmailConfig): string => {
  const { to, subject, body } = config;
  
  if (!to.trim()) return '';
  
  const params = new URLSearchParams();
  if (subject) params.append('subject', subject);
  if (body) params.append('body', body);
  
  const queryString = params.toString();
  return `mailto:${to}${queryString ? '?' + queryString : ''}`;
};