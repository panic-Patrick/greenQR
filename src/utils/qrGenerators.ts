import { WiFiConfig, VCardConfig, EmailConfig } from '../types/qr';

const escapeVCard = (text: string | undefined): string => {
  if (!text) return '';
  return text.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
};

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
  
  const titleMap = {
    'mr': 'Herr',
    'mrs': 'Frau',
    'ms': 'Frau',
    'dr': 'Dr.',
    'prof': 'Prof.',
    'none': ''
  };
  const honorificPrefix = titleMap[titleType] || '';
  const fullName = `${honorificPrefix} ${firstName} ${lastName}`.trim().replace(/\s+/g, ' ');

  let vcard = 'BEGIN:VCARD\n';
  vcard += 'VERSION:3.0\n';
  
  const charset = ';CHARSET=UTF-8';

  vcard += `N${charset}:${escapeVCard(lastName)};${escapeVCard(firstName)};;${escapeVCard(honorificPrefix)};\n`;
  vcard += `FN${charset}:${escapeVCard(fullName)}\n`;
  
  if (organization || department) {
    vcard += `ORG${charset}:${escapeVCard(organization || '')}${department ? ';' + escapeVCard(department) : ''}\n`;
  }

  if (title) vcard += `TITLE${charset}:${escapeVCard(title)}\n`;
  if (alternativeName) vcard += `NICKNAME${charset}:${escapeVCard(alternativeName)}\n`;
  
  phones.forEach(phone => {
    if (phone.trim()) {
      vcard += `TEL;TYPE=HOME,VOICE:${escapeVCard(phone)}\n`;
    }
  });
  
  emails.forEach(email => {
    if (email.trim()) {
      vcard += `EMAIL;TYPE=INTERNET:${email}\n`;
    }
  });
  
  if (website) {
    let formattedUrl = website;
    if (!/^https?:\/\//i.test(website)) {
      formattedUrl = `https://${website}`;
    }
    vcard += `URL:${formattedUrl}\n`;
  }
  
  if (address || city || state || zip || country) {
    vcard += `ADR${charset};TYPE=HOME:;;${escapeVCard(address)};${escapeVCard(city)};${escapeVCard(state)};${escapeVCard(zip)};${escapeVCard(country)}\n`;
  }
  
  if (notes) vcard += `NOTE${charset}:${escapeVCard(notes)}\n`;
  
  vcard += `REV:${new Date().toISOString()}\n`;
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