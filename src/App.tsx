import React, { Suspense } from 'react';
import { QRGenerator } from './components/QRGenerator';
import { Loader2 } from 'lucide-react';
import { Footer } from './components/Footer';
import './i18n/config';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center" role="status" aria-label="QR Generator wird geladen">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" aria-hidden="true" />
      <p className="text-gray-400">QR Generator wird geladen...</p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="min-h-screen flex flex-col bg-gray-900" role="application" aria-label="GreenQR Anwendung">
        <header className="sr-only">
          <h1>GreenQR - QR Code Generator</h1>
          <nav aria-label="Hauptnavigation">
            <ul>
              <li><a href="#main-content">Zum Hauptinhalt</a></li>
            </ul>
          </nav>
        </header>
        <main id="main-content" className="flex-grow" role="main" aria-label="QR Code Generator Hauptbereich">
          <QRGenerator />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;