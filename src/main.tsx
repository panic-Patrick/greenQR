import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import i18n from './i18n/config';

// Ensure dark mode is set
document.documentElement.classList.add('dark');

// Update HTML lang attribute and meta tags when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  
  // Update meta tags based on language
  const metaDescription = document.querySelector('meta[name="description"]');
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  const title = document.querySelector('title');
  
  if (lng === 'de') {
    if (metaDescription) {
      metaDescription.setAttribute('content', 'GreenQR - Professioneller QR-Code Generator mit benutzerdefinierten Logos, Farben und Dark Mode Unterstützung');
    }
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'QR-Code, Generator, benutzerdefiniertes Logo, Farben, Download, professionell');
    }
    if (title) {
      title.textContent = 'GreenQR - Erstellen Sie schöne QR-Codes';
    }
  } else {
    if (metaDescription) {
      metaDescription.setAttribute('content', 'GreenQR - Professional QR Code Generator with custom logos, colors, and dark mode support');
    }
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'QR code, generator, custom logo, colors, download, professional');
    }
    if (title) {
      title.textContent = 'GreenQR - Create Beautiful QR Codes';
    }
  }
});

// Set initial language and meta tags
document.documentElement.lang = i18n.language;
const initialLng = i18n.language;
const metaDescription = document.querySelector('meta[name="description"]');
const metaKeywords = document.querySelector('meta[name="keywords"]');
const title = document.querySelector('title');

if (initialLng === 'de') {
  if (metaDescription) {
    metaDescription.setAttribute('content', 'GreenQR - Professioneller QR-Code Generator mit benutzerdefinierten Logos, Farben und Dark Mode Unterstützung');
  }
  if (metaKeywords) {
    metaKeywords.setAttribute('content', 'QR-Code, Generator, benutzerdefiniertes Logo, Farben, Download, professionell');
  }
  if (title) {
    title.textContent = 'GreenQR - Erstellen Sie schöne QR-Codes';
  }
} else {
  if (metaDescription) {
    metaDescription.setAttribute('content', 'GreenQR - Professional QR Code Generator with custom logos, colors, and dark mode support');
  }
  if (metaKeywords) {
    metaKeywords.setAttribute('content', 'QR code, generator, custom logo, colors, download, professional');
  }
  if (title) {
    title.textContent = 'GreenQR - Create Beautiful QR Codes';
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
