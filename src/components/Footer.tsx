import { useState } from 'react';
import { PrivacyModal } from './PrivacyModal';
import { ImprintModal } from './ImprintModal';

export const Footer = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isImprintOpen, setIsImprintOpen] = useState(false);

  return (
    <footer className="w-full py-4 mt-8 border-t border-gray-700" role="contentinfo">
      <div className="container mx-auto px-4">
        <nav className="flex justify-center space-x-6 text-sm text-gray-400" aria-label="Footer Navigation">
          <button
            onClick={() => setIsPrivacyOpen(true)}
            className="hover:text-gray-200 transition-colors"
            aria-label="Datenschutzerklärung öffnen"
          >
            Datenschutz
          </button>
          <button
            onClick={() => setIsImprintOpen(true)}
            className="hover:text-gray-200 transition-colors"
            aria-label="Impressum öffnen"
          >
            Impressum
          </button>
        </nav>
        <p className="text-center text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} Patrick Kämpf
        </p>
      </div>

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
      <ImprintModal
        isOpen={isImprintOpen}
        onClose={() => setIsImprintOpen(false)}
      />
    </footer>
  );
}; 