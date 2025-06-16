import React, { Suspense } from 'react';
import { QRGenerator } from './components/QRGenerator';
import { Loader2 } from 'lucide-react';
import './i18n/config';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-4" />
      <p className="text-gray-600 dark:text-gray-400">Loading QR Generator...</p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QRGenerator />
    </Suspense>
  );
}

export default App;