# 🌻 GreenQR - QR Code Generator

Ein moderner, benutzerfreundlicher QR-Code Generator mit umfangreichen Anpassungsmöglichkeiten und mehrsprachiger Unterstützung.

![GreenQR](https://img.shields.io/badge/GreenQR-QR%20Generator-green)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.1.3-purple)

## ✨ Features

### 🎯 QR-Code Typen
- **URL/Text**: Erstellen Sie QR-Codes für Websites, Links oder beliebigen Text
- **WLAN**: Generieren Sie QR-Codes für WLAN-Netzwerke mit automatischer Konfiguration
- **Kontakt (vCard)**: Erstellen Sie QR-Codes mit vollständigen Kontaktinformationen
- **E-Mail**: Generieren Sie QR-Codes für vorgefertigte E-Mail-Nachrichten

### 🎨 Design & Anpassung
- **Farbanpassung**: Wählen Sie beliebige Farben für Ihren QR-Code
- **Logo-Integration**: Fügen Sie Ihr eigenes Logo oder Icon in die Mitte des QR-Codes ein
- **Vordefinierte Icons**: Große Auswahl an Social Media und anderen Icons
- **SVG-Unterstützung**: Laden Sie eigene SVG-Dateien hoch
- **Logo-Farbanpassung**: Passen Sie die Farbe Ihres Logos individuell an

### 🔧 QR-Code Styling
- **Body-Shapes**: 6 verschiedene Formen für QR-Code-Elemente
  - Quadratisch
  - Punkte
  - Abgerundet
  - Extra Rund
  - Klassisch
  - Klassisch Rund
- **Eye Frame Shapes**: 6 verschiedene Rahmen-Formen für die Eckpunkte
- **Eye Ball Shapes**: 6 verschiedene Innen-Formen für die Eckpunkte

### 🌐 Mehrsprachigkeit
- **Deutsch** (Standard)
- **Englisch**
- **Sprachumschaltung**: Einfacher Wechsel zwischen Sprachen

### 📱 Benutzerfreundlichkeit
- **Live-Vorschau**: Sofortige Anzeige der Änderungen
- **Drag & Drop**: Einfaches Hochladen von Logos per Drag & Drop
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **Dunkler Modus**: Angenehme Darstellung bei wenig Licht
- **Barrierefreiheit**: Vollständige Accessibility-Unterstützung

### 🔒 Datenschutz & Sicherheit
- **Lokale Verarbeitung**: Alle Daten werden lokal verarbeitet
- **Keine Server-Speicherung**: Ihre Daten verlassen nie Ihr Gerät
- **Datenschutzerklärung**: Transparente Informationen zur Datenverarbeitung
- **Impressum**: Rechtliche Informationen verfügbar

## 🚀 Installation & Setup

### Voraussetzungen
- Node.js >= 24.0.0
- npm oder yarn

### Installation
```bash
# Repository klonen
git clone [repository-url]
cd QR_code

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für Produktion bauen
npm run build

# Vorschau der Produktionsversion
npm run preview
```

## 📋 Verwendung

### 1. QR-Code Typ auswählen
Wählen Sie zwischen URL/Text, WLAN, Kontakt oder E-Mail.

### 2. Daten eingeben
Je nach gewähltem Typ:
- **URL/Text**: Geben Sie die URL oder den Text ein
- **WLAN**: Netzwerkname, Sicherheitstyp und Passwort
- **Kontakt**: Vollständige Kontaktinformationen
- **E-Mail**: Empfänger, Betreff und Nachricht

### 3. Design anpassen
- Wählen Sie eine Farbe für den QR-Code
- Fügen Sie optional ein Logo hinzu
- Passen Sie die QR-Code-Formen an
- Wählen Sie verschiedene Stile für Eckpunkte

### 4. QR-Code herunterladen
Klicken Sie auf "QR-Code als PNG herunterladen" um den fertigen QR-Code zu speichern.

## 🛠️ Technische Details

### Verwendete Technologien
- **Frontend**: React 18.2.0 mit TypeScript
- **Build Tool**: Vite 5.1.3
- **Styling**: Tailwind CSS 3.4.1
- **QR-Code Generation**: qrcode.react 3.1.0, qr-code-styling 1.9.2
- **Internationalisierung**: i18next 23.8.2
- **Icons**: Lucide React, FontAwesome
- **Color Picker**: react-colorful 5.6.1

### Projektstruktur
```
src/
├── components/          # React-Komponenten
│   ├── forms/          # Formulare für verschiedene QR-Typen
│   ├── QRGenerator.tsx # Hauptkomponente
│   ├── QRCodePreview.tsx # QR-Code Vorschau
│   └── ...
├── hooks/              # Custom React Hooks
├── i18n/               # Internationalisierung
├── types/              # TypeScript Typdefinitionen
├── utils/              # Hilfsfunktionen
└── assets/             # Statische Assets
```

### Wichtige Komponenten
- `QRGenerator`: Hauptkomponente mit allen Funktionen
- `QRTypeSelector`: Auswahl des QR-Code Typs
- `QRStyleSelector`: Anpassung der QR-Code Formen
- `ColorPicker`: Farbauswahl
- `FileUpload`: Logo-Upload
- `QRCodePreview`: Live-Vorschau

## 🎯 QR-Code Typen im Detail

### URL/Text QR-Code
- Unterstützt beliebige URLs und Text
- Automatische URL-Validierung
- Optimiert für verschiedene URL-Längen

### WLAN QR-Code
- **Sicherheitstypen**: WPA/WPA2, WEP, Kein Passwort
- **Versteckte Netzwerke**: Unterstützung für versteckte WLAN-Netze
- **Automatische Konfiguration**: Kompatibel mit allen modernen Geräten

### Kontakt (vCard) QR-Code
- **Persönliche Daten**: Name, Organisation, Titel
- **Kontaktdaten**: Telefon, E-Mail, Website
- **Adressdaten**: Vollständige Adressinformationen
- **Mehrere Kontakte**: Mehrere Telefonnummern und E-Mail-Adressen
- **Anreden**: Herr, Frau, Dr., Prof. etc.

### E-Mail QR-Code
- **Vorgefertigte E-Mails**: Empfänger, Betreff und Nachricht
- **Sofortiges Öffnen**: Direktes Öffnen des E-Mail-Clients
- **Verschiedene E-Mail-Clients**: Kompatibel mit allen gängigen Clients

## 🎨 Design-Features

### Farbanpassung
- Hex-Farben-Unterstützung
- Farbvorschau in Echtzeit
- Kontrastoptimierung für bessere Lesbarkeit

### Logo-Integration
- **Unterstützte Formate**: PNG, JPG, JPEG, SVG
- **Maximale Größe**: 10MB
- **Automatische Skalierung**: Optimale Größe für QR-Code
- **Farbanpassung**: Individuelle Logo-Farben

### QR-Code Styling
- **6 Body-Shapes**: Verschiedene Formen für QR-Code-Elemente
- **6 Eye Frame Shapes**: Rahmen-Formen für Eckpunkte
- **6 Eye Ball Shapes**: Innen-Formen für Eckpunkte
- **Kombinierbar**: Alle Stile können beliebig kombiniert werden

## 🌍 Internationalisierung

### Unterstützte Sprachen
- **Deutsch** (Standard)
- **Englisch**

### Lokalisierte Inhalte
- Alle UI-Texte
- Validierungsmeldungen
- Hilfetexte und Tipps
- Formular-Labels und Platzhalter

## 📱 Responsive Design

### Unterstützte Geräte
- **Desktop**: Optimiert für große Bildschirme
- **Tablet**: Angepasst für mittlere Bildschirme
- **Mobile**: Touch-optimiert für Smartphones

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Datenschutz & Sicherheit

### Datenschutz-Features
- **Lokale Verarbeitung**: Keine Datenübertragung an Server
- **Keine Cookies**: Keine Tracking-Cookies
- **Keine Analytics**: Keine Nutzerverfolgung
- **Transparenz**: Vollständige Datenschutzerklärung

### Sicherheitsmaßnahmen
- **Input-Validierung**: Alle Eingaben werden validiert
- **Datei-Validierung**: Sichere Datei-Uploads
- **XSS-Schutz**: Schutz vor Cross-Site-Scripting
- **CSRF-Schutz**: Schutz vor Cross-Site-Request-Forgery

## 🚀 Performance

### Optimierungen
- **Debouncing**: Verzögerte QR-Code-Generierung für bessere Performance
- **Lazy Loading**: Komponenten werden bei Bedarf geladen
- **Memoization**: React.memo für optimierte Re-Renders
- **Code Splitting**: Automatische Code-Aufteilung

### Browser-Unterstützung
- **Chrome**: >= 90
- **Firefox**: >= 88
- **Safari**: >= 14
- **Edge**: >= 90

## 🤝 Beitragen

### Entwicklung
1. Fork des Repositories
2. Feature-Branch erstellen (`git checkout -b feature/AmazingFeature`)
3. Änderungen committen (`git commit -m 'Add some AmazingFeature'`)
4. Branch pushen (`git push origin feature/AmazingFeature`)
5. Pull Request erstellen

### Bug Reports
Bitte erstellen Sie ein Issue mit:
- Beschreibung des Problems
- Schritte zur Reproduktion
- Erwartetes vs. tatsächliches Verhalten
- Browser und Betriebssystem

## 📄 Lizenz

Dieses Projekt ist unter der GPLv3-Lizenz lizenziert. Siehe die `LICENSE`-Datei für weitere Details.

## 🙏 Danksagungen

- [qrcode.react](https://github.com/zpao/qrcode.react) für die QR-Code-Generierung
- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) für das Styling
- [Lucide React](https://lucide.dev/) für die Icons
- [Tailwind CSS](https://tailwindcss.com/) für das Styling-Framework

## 📞 Support

Bei Fragen oder Problemen:
- Erstellen Sie ein Issue auf GitHub
- Kontaktieren Sie uns über das Impressum

---

**GreenQR** - Erstellen Sie schöne QR-Codes mit benutzerdefinierten Logos und Farben 🌻 