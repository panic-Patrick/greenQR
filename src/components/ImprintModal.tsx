import { X } from 'lucide-react';

interface ImprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImprintModal = ({ isOpen, onClose }: ImprintModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Impressum</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-4 text-gray-300">
          <section>
            <h3 className="text-xl font-semibold mb-2">Angaben gemäß § 5 TMG</h3>
            <p>Patrick Kämpf<br />
            Mühlenweg 2<br />
            57399 Kirchhundem</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Kontakt</h3>
            <p>E-Mail: info@kaempf.nrw</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
            <p>Patrick Kämpf<br />
            Mühlenweg 2<br />
            57399 Kirchhundem</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Haftungsausschluss</h3>
            <h4 className="text-lg font-semibold mb-2">Haftung für Inhalte</h4>
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
            
            <h4 className="text-lg font-semibold mb-2 mt-4">Haftung für Links</h4>
            <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-2">Urheberrecht</h3>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
          </section>
        </div>
      </div>
    </div>
  );
}; 