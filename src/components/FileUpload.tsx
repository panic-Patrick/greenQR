import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isValidImageFile, formatFileSize } from '../utils/validation';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  label: string;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  selectedFile,
  label,
  error
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = (file: File | undefined) => {
    console.log('handleFile aufgerufen mit:', file);
    if (file) {
      if (isValidImageFile(file)) {
        onFileSelect(file);
      } else {
        onFileSelect(null);
        alert('Die Datei ist kein gültiges Bild oder zu groß!');
      }
    } else {
      onFileSelect(null);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('handleFileChange aufgerufen mit:', file);
    if (file) {
      handleFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const clearFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center
          transition-all duration-200 cursor-pointer
          ${dragActive ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-600'}
          ${error ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
          hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20
          focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload image file"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileInputRef.current?.click();
          }
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-describedby={error ? 'file-error' : undefined}
        />
        
        {selectedFile ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <ImageIcon className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {selectedFile.name}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-8 h-8 text-gray-400 mx-auto" />
            <div className="text-sm">
              <p className="text-gray-600 dark:text-gray-400">
                <span className="font-medium text-green-600 hover:text-green-500">
                  {t('upload.clickToUpload')}
                </span>{' '}
                {t('upload.dragAndDrop')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('upload.fileTypes')}
              </p>
            </div>
          </div>
        )}
      </div>
      
      {selectedFile && (
        <button
          type="button"
          onClick={clearFile}
          className="mt-3 w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          aria-label={t('upload.removeImage')}
        >
          {t('upload.removeImage')}
        </button>
      )}
      
      {error && (
        <p id="file-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};