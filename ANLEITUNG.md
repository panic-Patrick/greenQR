# Anleitung zur Anpassung des QR-Code-Generators für andere Ortsverbände

Diese Anleitung erklärt, welche Schritte notwendig sind, um diesen QR-Code-Generator für einen anderen Ortsverband oder eine andere Organisation anzupassen.

## Inhaltsverzeichnis
1.  [Logo austauschen](#1-logo-austauschen)
2.  [Impressum und Datenschutz anpassen](#2-impressum-und-datenschutz-anpassen)
3.  [Analytics-Tracking entfernen oder ersetzen](#3-analytics-tracking-entfernen-oder-ersetzen)
4.  [Texte anpassen](#4-texte-anpassen)
5.  [Lokalen Webserver starten](#5-lokalen-webserver-starten)

---

### 1. Logo austauschen

Das Standard-Logo (die Sonnenblume) wird an mehreren Stellen verwendet. Um es zu ersetzen, müsst ihr die folgenden Dateien austauschen:

-   **Favicon (Browser-Tab-Icon):**
    -   Datei: `public/sunflower.svg`
    -   Ersetzt diese Datei mit eurem eigenen Logo im SVG-Format. Behaltet den Dateinamen bei oder passt den Link in der `index.html` an.

-   **Standard-Logo im Generator:**
    -   Datei: `src/assets/Sonnenblume.svg`
    -   Ersetzt auch diese Datei mit eurem Logo. Sie wird als Standard-Logo im QR-Code verwendet.

---

### 2. Impressum und Datenschutz anpassen

Dies ist ein sehr wichtiger Schritt, um die rechtlichen Anforderungen zu erfüllen. Die Daten für das Impressum und die Datenschutzerklärung sind fest im Code hinterlegt und müssen von euch angepasst werden.

-   **Impressum:**
    -   Datei: `src/components/ImprintModal.tsx`
    -   Öffnet diese Datei und ersetzt die Platzhalter-Daten (Adresse, Vertreter, Kontakt etc.) mit den Informationen eures Ortsverbandes.

-   **Datenschutzerklärung:**
    -   Datei: `src/components/PrivacyModal.tsx`
    -   Prüft und aktualisiert die Inhalte dieser Datei. Besonders wichtig sind die Abschnitte zu externen Diensten wie:
        -   **Hosting:** Wenn ihr einen anderen Hoster als Strato verwendet.
    -   Die Kontaktdaten des Verantwortlichen werden aus dem Impressum übernommen. Stellt also sicher, dass das Impressum korrekt ist.

---

### 3. Analytics-Tracking entfernen oder ersetzen

In der `index.html` ist ein Tracking-Skript für eine Web-Analytics-Software eingebunden.

-   **Datei:** `index.html`
-   Sucht nach der folgenden Zeile und entfernt sie, oder ersetzt sie durch euer eigenes Analytics-Skript:
    ```html
    <script defer src="https://analytics.kaempf.dev/script.js" data-website-id="5d61e5dc-e562-471d-a6f6-b932c8cdf1b0"></script>
    ```

---

### 4. Texte anpassen

Falls ihr das Standard-Logo ersetzt habt, solltet ihr auch den Text für die "Zurücksetzen"-Funktion des Logos anpassen.

-   **Dateien:**
    -   `src/i18n/locales/de.json` (für Deutsch)
    -   `src/i18n/locales/en.json` (für Englisch)

-   Sucht in beiden Dateien nach dem Schlüssel `"resetToSunflower"` und ändert den Wert (z.B. `"Reset to Sunflower"`) zu etwas, das zu eurem neuen Logo passt (z.B. `"Reset to MyLogo"`).

---

### 5. Lokalen Webserver starten

Um eure Änderungen zu testen, könnt ihr einen lokalen Entwicklungsserver starten.

1.  Stellt sicher, dass ihr [Node.js](https://nodejs.org/) installiert habt.
2.  Öffnet ein Terminal im Projektverzeichnis.
3.  Installiert die Projektabhängigkeiten mit dem Befehl:
    ```bash
    npm install
    ```
4.  Startet den Entwicklungsserver:
    ```bash
    npm run dev
    ```
5.  Öffnet euren Browser und geht zu der Adresse, die im Terminal angezeigt wird (normalerweise `http://localhost:5173`).

Jetzt könnt ihr eure angepasste Version des QR-Code-Generators sehen. 