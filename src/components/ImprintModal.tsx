import { X } from 'lucide-react';

interface ImprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImprintModal = ({ isOpen, onClose }: ImprintModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="imprint-title"
    >
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 id="imprint-title" className="text-2xl font-bold text-white">Impressum</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
            aria-label="Impressum schließen"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <section aria-labelledby="imprint-address">
            <h3 id="imprint-address" className="text-xl font-semibold mb-3 text-white">Angaben gemäß § 5 TMG</h3>
            <p className="mb-4">
              Bündnis 90/Die Grünen Kirchhundem<br />
              57399 Kirchhundem
            </p>
          </section>

          <section aria-labelledby="imprint-represented">
            <h3 id="imprint-represented" className="text-xl font-semibold mb-3 text-white">Vertreten durch</h3>
            <p className="mb-4">Mike Warnecke (Fraktionsvorsitzender)</p>
          </section>

          <section aria-labelledby="imprint-contact">
            <h3 id="imprint-contact" className="text-xl font-semibold mb-3 text-white">Kontakt</h3>
            <p className="mb-4">Email: <a href="mailto:info@gruene-kirchhundem.de" className="text-blue-400 hover:text-blue-300 underline">info@gruene-kirchhundem.de</a></p>
          </section>

          <section aria-labelledby="imprint-responsible">
            <h3 id="imprint-responsible" className="text-xl font-semibold mb-3 text-white">Redaktionell verantwortlich</h3>
            <p className="mb-4">
              Patrick Kämpf<br />
              Email: <a href="mailto:patrick@kaempf.nrw" className="text-blue-400 hover:text-blue-300 underline">patrick@kaempf.nrw</a><br />
              57399 Kirchhundem
            </p>
          </section>

          <section aria-labelledby="imprint-party">
            <h3 id="imprint-party" className="text-xl font-semibold mb-3 text-white">Hinweis zur Partei</h3>
            <p className="mb-4">
              Diese Website wird betrieben von der Fraktion Bündnis 90/Die Grünen im Gemeinderat Kirchhundem. Die Inhalte stellen die Positionen und Aktivitäten der Fraktion in Kirchhundem dar.
            </p>
          </section>

          <section aria-labelledby="imprint-hosting">
            <h3 id="imprint-hosting" className="text-xl font-semibold mb-3 text-white">Hosting und technische Dienstleister</h3>
            <p className="mb-4">Diese Website wird gehostet bei:</p>
            
            <p className="mb-4">
              <strong>Strato AG</strong><br />
              Pascalstraße 10, 10587 Berlin, Deutschland
            </p>
            
            <p className="mb-4">
              Strato ist ein deutscher Hosting-Anbieter, der unsere Website bereitstellt. Weitere Informationen zu Strato finden Sie unter: <a href="https://www.strato.de" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.strato.de</a>
            </p>
            
            <p className="mb-4">
              Für das Kontaktformular nutzen wir den Dienst "Formspree" der Formspree Inc. Dabei werden die über das Formular übermittelten Daten sicher verarbeitet und an uns weitergeleitet.
            </p>
            
            <p className="mb-4">
              Zum Schutz vor Spam verwenden wir hCaptcha, einen Dienst der Intuition Machines, Inc. hCaptcha ist ein datenschutzfreundlicher Captcha-Dienst, der in Deutschland betrieben wird.
            </p>
          </section>

          <section aria-labelledby="imprint-dispute">
            <h3 id="imprint-dispute" className="text-xl font-semibold mb-3 text-white">Streitschlichtung</h3>
            <p className="mb-4">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>
            </p>
            
            <p className="mb-4">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            
            <p className="mb-4">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}; 