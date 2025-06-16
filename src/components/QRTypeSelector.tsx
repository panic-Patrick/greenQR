import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Wifi, User, Mail } from 'lucide-react';
import { QRType } from '../types/qr';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onTypeChange: (type: QRType) => void;
}

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  const { t } = useTranslation();

  const types = [
    { id: 'url' as QRType, icon: Link, label: t('types.url') },
    { id: 'wifi' as QRType, icon: Wifi, label: t('types.wifi') },
    { id: 'vcard' as QRType, icon: User, label: t('types.vcard') },
    { id: 'email' as QRType, icon: Mail, label: t('types.email') },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        {t('form.typeLabel')}
      </label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {types.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onTypeChange(id)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200
              ${selectedType === id
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-900/10'
              }
              focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            `}
          >
            <Icon className="w-6 h-6 mb-2" />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};