import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Datenschutzerklärung</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-300">
          <p>Stand: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h3 className="text-xl font-semibold mb-2">1. Datenschutz auf einen Blick</h3>
            <p>Diese Anwendung wird auf Netlify gehostet und verarbeitet keine personenbezogenen Daten. Alle Datenverarbeitung findet ausschließlich in Ihrem Browser statt.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">2. Hosting</h3>
            <p>Diese Website wird auf Netlify gehostet. Netlify erhebt automatisch technische Daten wie IP-Adressen, die für die Bereitstellung der Website notwendig sind. Weitere Informationen finden Sie in der Datenschutzerklärung von Netlify.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">3. Lokale Datenverarbeitung</h3>
            <p>Alle von Ihnen eingegebenen Daten (URLs, Texte, Bilder) werden ausschließlich in Ihrem Browser verarbeitet. Es erfolgt keine Speicherung oder Übermittlung dieser Daten an externe Server.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">4. Cookies</h3>
            <p>Diese Anwendung verwendet keine Cookies.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">5. Ihre Rechte</h3>
            <p>Da keine personenbezogenen Daten gespeichert werden, fallen keine besonderen Datenschutzrechte an. Sie können die Anwendung jederzeit verlassen, ohne dass Daten zurückbleiben.</p>
          </section>
        </div>
      </div>
    </div>
  );
}; 