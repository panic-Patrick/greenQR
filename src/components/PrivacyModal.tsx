import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
    >
      <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 id="privacy-title" className="text-2xl font-bold text-white">Datenschutzerklärung</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
            aria-label="Datenschutzerklärung schließen"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>
        
        <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
          <p className="text-gray-400">Stand: {new Date().toLocaleDateString()}</p>
          
          <section aria-labelledby="privacy-overview">
            <h3 id="privacy-overview" className="text-xl font-semibold mb-3 text-white">1. Datenschutz auf einen Blick</h3>
            
            <h4 className="text-lg font-medium mb-2 text-white">Allgemeine Hinweise</h4>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </p>

            <h4 className="text-lg font-medium mb-2 text-white">Datenerfassung auf dieser Website</h4>
            
            <h5 className="font-medium mb-2 text-white">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h5>
            <p className="mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h5 className="font-medium mb-2 text-white">Wie erfassen wir Ihre Daten?</h5>
            <p className="mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in das Kontaktformular eingeben.
            </p>
            <p className="mb-4">
              Andere Daten werden automatisch durch unsere IT-Systeme erfasst, wenn Sie die Website besuchen. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>

            <h5 className="font-medium mb-2 text-white">Wofür nutzen wir Ihre Daten?</h5>
            <p className="mb-4">
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>

            <h5 className="font-medium mb-2 text-white">Welche Rechte haben Sie bezüglich Ihrer Daten?</h5>
            <p className="mb-4">
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
            </p>
          </section>

          <section aria-labelledby="privacy-hosting">
            <h3 id="privacy-hosting" className="text-xl font-semibold mb-3 text-white">2. Hosting</h3>
            <p className="mb-4">Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
            
            <h4 className="text-lg font-medium mb-2 text-white">Strato AG</h4>
            <p className="mb-4">
              Diese Website wird bei der Strato AG gehostet. Anbieter ist die Strato AG, Pascalstraße 10, 10587 Berlin, Deutschland (nachfolgend "Strato").
            </p>
            <p className="mb-4">
              Strato ist ein deutscher Hosting-Anbieter mit Sitz in Berlin. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern von Strato in Deutschland gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>
            <p className="mb-4">
              Das Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Besuchern (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p className="mb-4">
              Strato wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen. Alle Server befinden sich in Deutschland und unterliegen deutschem Datenschutzrecht.
            </p>
            <p className="mb-4">
              Wir haben mit Strato einen Auftragsverarbeitungsvertrag (AVV) geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass Strato die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.
            </p>
            <p className="mb-4">
              Weitere Informationen zur Datenverarbeitung durch Strato finden Sie in der Datenschutzerklärung von Strato: <a href="https://www.strato.de/datenschutz/" className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">https://www.strato.de/datenschutz/</a>
            </p>
          </section>

          <section aria-labelledby="privacy-general">
            <h3 id="privacy-general" className="text-xl font-semibold mb-3 text-white">3. Allgemeine Hinweise und Pflichtinformationen</h3>
            <h4 className="text-lg font-medium mb-2 text-white">Datenschutz</h4>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p className="mb-4">
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>
          </section>

          <section aria-labelledby="privacy-data-collection">
            <h3 id="privacy-data-collection" className="text-xl font-semibold mb-3 text-white">4. Datenerfassung auf dieser Website</h3>
            <h4 className="text-lg font-medium mb-2 text-white">Cookies und lokale Speicherung</h4>
            <p className="mb-4">
              Unsere Internetseiten verwenden so genannte "Cookies" und lokale Speichertechnologien. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
            </p>

            <h5 className="font-medium mb-2 text-white">Technisch notwendige Cookies und lokale Speicherung</h5>
            <p className="mb-4">Wir verwenden folgende technisch notwendige Speichertechnologien:</p>
            <ul className="list-disc list-inside mb-4 space-y-1 ml-4">
              <li>Spracheinstellung: Speichert Ihre gewählte Sprache (Deutsch/Englisch) im lokalen Speicher Ihres Browsers</li>
              <li>Design-Modus: Speichert Ihre Präferenz für hellen oder dunklen Modus im lokalen Speicher</li>
              <li>Session-Cookies: Technisch erforderliche Cookies für die Bereitstellung der Website</li>
            </ul>
            <p className="mb-4">
              Diese Cookies und Speichertechnologien sind für die ordnungsgemäße Funktion der Website erforderlich und können nicht deaktiviert werden. Die Rechtsgrundlage für diese Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der technischen Bereitstellung der Website).
            </p>
            <p className="mb-4">
              Die im lokalen Speicher gespeicherten Daten verbleiben auf Ihrem Gerät, bis Sie diese selbst löschen oder Ihren Browser-Cache leeren. Sie werden nicht an uns oder Dritte übertragen.
            </p>
          </section>

          <section aria-labelledby="privacy-plugins">
            <h3 id="privacy-plugins" className="text-xl font-semibold mb-3 text-white">5. Plugins und Tools</h3>
            <h4 className="text-lg font-medium mb-2 text-white">Lokale Schriftarten</h4>
            <p className="mb-4">
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten lokale Schriftarten, die auf unserem Server gespeichert sind. Es werden keine externen Schriftarten von Drittanbietern geladen, wodurch keine Daten an externe Server übertragen werden.
            </p>
            <p className="mb-4">
              Die Verwendung lokaler Schriftarten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Website unter Wahrung des Datenschutzes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}; 