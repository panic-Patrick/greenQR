import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { isValidImageFile, formatFileSize } from '../utils/validation';
import { faInstagram, faFacebook, faXTwitter, faLinkedin, faWhatsapp, faTiktok, faYoutube, faTelegram, faMastodon, faPinterest, faReddit, faSnapchat, faDiscord, faTwitch, faGithub, faDribbble, faSlack, faSpotify, faMedium, faVimeo, faSteam, faStackOverflow, faSoundcloud, faStrava, faMeetup, faTumblr, faWeibo, faXing, faVk } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faWifi, faUser, faGlobe, faPhone, faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { ColorPicker } from './ColorPicker';
import heartIcon from '../assets/icons/heart.svg';
import starIcon from '../assets/icons/star.svg';
import phoneIcon from '../assets/icons/phone.svg';
import globeIcon from '../assets/icons/globe.svg';
import userIcon from '../assets/icons/user.svg';
import wifiIcon from '../assets/icons/wifi.svg';
import envelopeIcon from '../assets/icons/envelope.svg';
import vkIcon from '../assets/icons/vk.svg';
import xingIcon from '../assets/icons/xing.svg';
import weiboIcon from '../assets/icons/weibo.svg';
import tumblrIcon from '../assets/icons/tumblr.svg';
import meetupIcon from '../assets/icons/meetup.svg';
import stravaIcon from '../assets/icons/strava.svg';
import soundcloudIcon from '../assets/icons/soundcloud.svg';
import stackOverflowIcon from '../assets/icons/stack-overflow.svg';
import steamIcon from '../assets/icons/steam.svg';
import vimeoIcon from '../assets/icons/vimeo.svg';
import mediumIcon from '../assets/icons/medium.svg';
import spotifyIcon from '../assets/icons/spotify.svg';
import slackIcon from '../assets/icons/slack.svg';
import dribbbleIcon from '../assets/icons/dribbble.svg';
import bitbucketIcon from '../assets/icons/bitbucket.svg';
import gitAltIcon from '../assets/icons/git-alt.svg';
import gitkrakenIcon from '../assets/icons/gitkraken.svg';
import gitlabIcon from '../assets/icons/gitlab.svg';
import githubIcon from '../assets/icons/github.svg';
import twitchIcon from '../assets/icons/twitch.svg';
import discordIcon from '../assets/icons/discord.svg';
import snapchatIcon from '../assets/icons/snapchat.svg';
import redditIcon from '../assets/icons/reddit.svg';
import pinterestIcon from '../assets/icons/pinterest.svg';
import mastodonIcon from '../assets/icons/mastodon.svg';
import telegramIcon from '../assets/icons/telegram.svg';
import youtubeIcon from '../assets/icons/youtube.svg';
import tiktokIcon from '../assets/icons/tiktok.svg';
import whatsappIcon from '../assets/icons/whatsapp.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';
import xTwitterIcon from '../assets/icons/x-twitter.svg';
import facebookIcon from '../assets/icons/facebook.svg';
import instagramIcon from '../assets/icons/instagram.svg';

interface FileUploadProps {
  onIconSelect: (icon: { svgText: string; label: string } | null) => void;
  selectedFile: File | null;
  label: string;
  error?: string;
  iconColor?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onIconSelect,
  selectedFile,
  label,
  error,
  iconColor = '#000000',
}) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [iconModalOpen, setIconModalOpen] = useState(false);
  const svgStringToFile = (svgString: string, fileName = 'icon.svg') => {
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    return new File([blob], fileName, { type: 'image/svg+xml' });
  };
  const [selectedIcon, setSelectedIcon] = useState<{ svgText: string; label: string } | null>(null);

  const iconOptions = [
    { icon: instagramIcon, label: 'Instagram' },
    { icon: facebookIcon, label: 'Facebook' },
    { icon: xTwitterIcon, label: 'X' },
    { icon: linkedinIcon, label: 'LinkedIn' },
    { icon: whatsappIcon, label: 'WhatsApp' },
    { icon: tiktokIcon, label: 'TikTok' },
    { icon: youtubeIcon, label: 'YouTube' },
    { icon: telegramIcon, label: 'Telegram' },
    { icon: mastodonIcon, label: 'Mastodon' },
    { icon: pinterestIcon, label: 'Pinterest' },
    { icon: redditIcon, label: 'Reddit' },
    { icon: snapchatIcon, label: 'Snapchat' },
    { icon: discordIcon, label: 'Discord' },
    { icon: twitchIcon, label: 'Twitch' },
    { icon: githubIcon, label: 'GitHub' },
    { icon: dribbbleIcon, label: 'Dribbble' },
    { icon: slackIcon, label: 'Slack' },
    { icon: spotifyIcon, label: 'Spotify' },
    { icon: mediumIcon, label: 'Medium' },
    { icon: vimeoIcon, label: 'Vimeo' },
    { icon: steamIcon, label: 'Steam' },
    { icon: stackOverflowIcon, label: 'Stack Overflow' },
    { icon: soundcloudIcon, label: 'SoundCloud' },
    { icon: stravaIcon, label: 'Strava' },
    { icon: meetupIcon, label: 'Meetup' },
    { icon: tumblrIcon, label: 'Tumblr' },
    { icon: weiboIcon, label: 'Weibo' },
    { icon: xingIcon, label: 'Xing' },
    { icon: vkIcon, label: 'VK' },
    { icon: envelopeIcon, label: 'Mail' },
    { icon: wifiIcon, label: 'WLAN' },
    { icon: userIcon, label: 'User' },
    { icon: globeIcon, label: 'Globe' },
    { icon: phoneIcon, label: 'Phone' },
    { icon: starIcon, label: 'Star' },
    { icon: heartIcon, label: 'Heart' },
  ];

  const handleFile = (file: File | undefined) => {
    if (file) {
      // SVGs erlauben
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (validTypes.includes(file.type) && file.size <= maxSize) {
        onIconSelect(file);
      } else {
        onIconSelect(null);
        alert('Die Datei ist kein gültiges Bild (PNG, JPG, JPEG, SVG) oder zu groß!');
      }
    } else {
      onIconSelect(null);
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
    onIconSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleIconSelect = async (icon: any) => {
    // SVG-Datei als Text laden
    const response = await fetch(icon.icon);
    const svgText = await response.text();
    onIconSelect({ svgText, label: icon.label });
    setIconModalOpen(false);
    setSelectedIcon({ svgText, label: icon.label });
  };

  const handleIconColorChange = (color: string) => {
    if (selectedIcon) {
      onIconSelect({ svgText: selectedIcon.svgText, label: selectedIcon.label });
    }
  };

  return (
    <div role="group" aria-labelledby="file-upload-label">
      <label 
        id="file-upload-label"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        {label}
      </label>
      
      <button
        type="button"
        className="mb-2 w-full px-3 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100"
        onClick={() => setIconModalOpen(true)}
      >
        {t('form.logoLabel')} (Icon wählen)
      </button>
      
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
        aria-label={t('upload.clickToUpload')}
        aria-describedby={error ? 'file-error' : undefined}
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
          accept="image/png,image/jpeg,image/jpg,image/svg+xml"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-describedby={error ? 'file-error' : undefined}
          aria-label={t('upload.clickToUpload')}
        />
        
        <div className="space-y-2">
          <div className="flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-green-600 dark:text-green-400">
              {t('upload.clickToUpload')}
            </span>
            <span className="block">{t('upload.or')}</span>
            <span className="font-medium">
              {t('upload.dragAndDrop')}
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {t('upload.fileTypes')}
          </p>
        </div>
      </div>
      
      {error && (
        <p id="file-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
      
      {selectedFile && (
        <div className="mt-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {selectedFile.name}
            </span>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            aria-label={t('upload.removeImage')}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      
      {iconModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-300 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Icon auswählen</h2>
              <button onClick={() => setIconModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-label="Schließen"><X size={24} /></button>
            </div>
            <div className="grid grid-cols-5 gap-4 mb-4">
              {iconOptions.map((opt, idx) => (
                <button
                  key={opt.label}
                  className="flex flex-col items-center justify-center p-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 focus:outline-none min-h-[60px]"
                  onClick={() => handleIconSelect(opt)}
                  aria-label={opt.label}
                >
                  <img src={opt.icon} alt={opt.label} className="w-8 h-8 mx-auto" />
                  <span className="mt-1 text-xs text-gray-700 dark:text-gray-300 text-center w-full block">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setIconModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600">Abbrechen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};