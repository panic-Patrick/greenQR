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
      <span 
        className={`absolute left-3 text-xs font-medium transition-all duration-700 ease-in-out ${
          i18n.language === 'de' ? 'opacity-100 text-gray-900 dark:text-white' : 'opacity-40 text-gray-500 dark:text-gray-400'
        }`}
        aria-hidden="true"
      >
        DE
      </span>
      
      {/* EN Text */}
      <span 
        className={`absolute right-3 text-xs font-medium transition-all duration-700 ease-in-out ${
          i18n.language === 'en' ? 'opacity-100 text-gray-900 dark:text-white' : 'opacity-40 text-gray-500 dark:text-gray-400'
        }`}
        aria-hidden="true"
      >
        EN
      </span>
      
      {/* Switch Knob */}
      <div 
        className={`absolute h-6 w-6 bg-white rounded-full transition-all duration-700 ease-in-out transform ${
          i18n.language === 'en' ? 'translate-x-12' : 'translate-x-2'
        }`}
        style={{
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        aria-hidden="true"
      />
    </div>
  );
};

export default LanguageSwitcher; 