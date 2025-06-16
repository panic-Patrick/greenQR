import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'de' ? 'en' : 'de');
  };

  return (
    <div 
      onClick={toggleLanguage}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleLanguage();
        }
      }}
      role="switch"
      aria-checked={i18n.language === 'en'}
      tabIndex={0}
      aria-label={i18n.language === 'en' ? "Zu Deutsch wechseln" : "Switch to English"}
      className={`relative h-8 w-20 flex items-center rounded-full cursor-pointer transition-all duration-700 ease-in-out ${
        i18n.language === 'en' 
          ? 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700' 
          : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
      }`}
      style={{
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      {/* DE Text */}
      <span className={`absolute left-3 text-xs font-medium transition-all duration-700 ease-in-out ${
        i18n.language === 'de' ? 'opacity-100 text-gray-900 dark:text-white' : 'opacity-40 text-gray-500 dark:text-gray-400'
      }`}>
        DE
      </span>
      
      {/* EN Text */}
      <span className={`absolute right-3 text-xs font-medium transition-all duration-700 ease-in-out ${
        i18n.language === 'en' ? 'opacity-100 text-gray-900 dark:text-white' : 'opacity-40 text-gray-500 dark:text-gray-400'
      }`}>
        EN
      </span>
      
      {/* Switch Knob */}
      <div
        style={{
          transform: i18n.language === 'en' ? 'translateX(48px)' : 'translateX(4px)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transition: 'transform 100ms ease-in-out, background-color 700ms ease-in-out, border-color 700ms ease-in-out'
        }}
        className={`absolute h-7 w-7 rounded-full flex items-center justify-center ${
          i18n.language === 'en' 
            ? 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600' 
            : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
        }`}
        aria-hidden="true"
      >
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 transition-all duration-100 ease-in-out transform">
          {i18n.language === 'en' ? 'EN' : 'DE'}
        </span>
      </div>
    </div>
  );
};

export default LanguageSwitcher; 