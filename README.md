# GreenQR

Ein modernes QR-Code Generator Tool, entwickelt mit React, TypeScript und Tailwind CSS.


## Features

- QR-Code Generierung mit anpassbaren Optionen
- Mehrsprachige Unterstützung (i18n)
- Moderne Benutzeroberfläche mit Tailwind CSS
- Farbauswahl für QR-Codes
- Responsive Design

## Technologien

- React 18
- TypeScript
- Vite
- Tailwind CSS
- i18next für Internationalisierung
- qrcode.react für QR-Code Generierung
- react-colorful für Farbauswahl

## Installation

1. Klone das Repository:
```bash
git clone [repository-url]
```

2. Installiere die Abhängigkeiten:
```bash
npm install
```

3. Starte den Entwicklungsserver:
```bash
npm run dev
```

## Nutzungsanleitung

### QR-Code erstellen
1. Geben Sie den gewünschten Text oder die URL in das Eingabefeld ein
2. Wählen Sie die gewünschte Größe des QR-Codes aus
3. Passen Sie die Fehlerkorrektur an (empfohlen: M oder H für bessere Lesbarkeit)
4. Wählen Sie die gewünschte Farbe für den QR-Code
5. Optional: Fügen Sie ein Logo hinzu
   - Klicken Sie auf "Logo hinzufügen"
   - Wählen Sie ein Bild aus (max. 1MB)
   - Passen Sie die Größe und Position des Logos an
6. Klicken Sie auf "QR-Code generieren"

### QR-Code herunterladen
1. Nach der Generierung erscheint der "Download" Button
2. Klicken Sie auf den Button, um den QR-Code als PNG-Datei zu speichern
3. Der QR-Code wird automatisch mit dem Namen "greenqr-code.png" heruntergeladen

### Tipps für optimale QR-Codes
- Verwenden Sie helle Hintergründe für dunkle QR-Codes und umgekehrt
- Testen Sie den QR-Code nach der Generierung mit einem Smartphone
- Bei Logos: Wählen Sie ein einfaches, kontrastreiches Bild
- Die Fehlerkorrektur "H" bietet den besten Schutz gegen Beschädigungen

## Bekannte Probleme

### Opera Browser
- Bei der Verwendung des Dateiauswahl-Dialogs (z.B. für Logos) muss das Bild zweimal angeklickt werden
- Dies ist ein bekanntes Problem mit dem Opera Browser und betrifft nur den Dateiauswahl-Dialog
- Workaround: Einfach das gewünschte Bild zweimal anklicken

## Verfügbare Skripte

- `npm run dev` - Startet den Entwicklungsserver
- `npm run build` - Erstellt einen Produktions-Build
- `npm run preview` - Vorschau des Produktions-Builds
- `npm run lint` - Führt ESLint aus

## Projektstruktur

```
├── src/              # Quellcode
├── dist/             # Build-Ausgabe
├── public/           # Statische Dateien
├── index.html        # Haupt-HTML-Datei
├── vite.config.ts    # Vite Konfiguration
├── tailwind.config.js # Tailwind CSS Konfiguration
└── package.json      # Projekt-Abhängigkeiten und Skripte
```

## Entwicklung

Das Projekt verwendet:
- Vite als Build-Tool
- ESLint für Code-Qualität
- TypeScript für Typsicherheit
- Tailwind CSS für Styling

## Lizenz

[Lizenz-Informationen hier einfügen] 