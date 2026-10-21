import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Settings,
  Moon,
  Sun,
  Globe,
  User,
  Heart,
  Database,
  Download,
  Upload,
  Trash2,
  Rocket,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { supportedLanguages } from '../i18n/translations';
import { exportLocalData, importLocalData } from '../utils/db';

export default function SettingsPage({
  theme,
  toggleTheme,
  showNotification
}) {
  const { t, i18n } = useTranslation();

  const [userName, setUserName] = useState(localStorage.getItem('bestiverse_user_name') || 'Dinesh');
  const [bestieName, setBestieName] = useState(localStorage.getItem('bestiverse_bestie_name') || 'Bestie');

  const handleSaveNames = (e) => {
    e.preventDefault();
    localStorage.setItem('bestiverse_user_name', userName.trim());
    localStorage.setItem('bestiverse_bestie_name', bestieName.trim());
    showNotification('Bestie duo names updated! 💖');
  };

  const handleLanguageSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    const selected = supportedLanguages.find(l => l.code === langCode);
    showNotification(`Switched language to ${selected.nativeName}! 🌍`);
  };

  const handleExport = async () => {
    try {
      const data = await exportLocalData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `bestiverse_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showNotification('Full BestieVerse backup downloaded! 📦');
    } catch (e) {
      showNotification('Export failed.');
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        await importLocalData(parsed);
        showNotification('Backup restored! Reloading application... 🎉');
        setTimeout(() => window.location.reload(), 1000);
      } catch (err) {
        showNotification('Failed to parse backup JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="page-content">
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(255, 94, 151, 0.18))',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
          <Settings size={28} color="var(--primary-pink)" />
          <h2 style={{ fontSize: '1.6rem', margin: 0 }}>{t('settings.title')}</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Customize your themes, duo names, language preferences across 17 languages, and private local data.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Appearance Card */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {theme === 'dark' ? <Moon size={20} color="#8b5cf6" /> : <Sun size={20} color="#f59e0b" />}
            <span>{t('settings.appearance')}</span>
          </h3>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => { if (theme !== 'light') toggleTheme(); }}
              className={theme === 'light' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.75rem 1.5rem' }}
            >
              <Sun size={18} />
              <span>{t('settings.lightMode')}</span>
            </button>
            <button
              onClick={() => { if (theme !== 'dark') toggleTheme(); }}
              className={theme === 'dark' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '0.75rem 1.5rem' }}
            >
              <Moon size={18} />
              <span>{t('settings.darkMode')}</span>
            </button>
          </div>
        </div>

        {/* Duo Profiles Customization */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={20} color="var(--primary-pink)" />
            <span>{t('settings.profileCustomization')}</span>
          </h3>

          <form onSubmit={handleSaveNames} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                {t('settings.yourName')}
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                {t('settings.bestieName')}
              </label>
              <input
                type="text"
                value={bestieName}
                onChange={(e) => setBestieName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <button type="submit" className="btn-primary" style={{ height: '42px', width: '100%', justifyContent: 'center' }}>
                Save Names
              </button>
            </div>
          </form>
        </div>

        {/* 17 Languages Selection Grid */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.2rem', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={20} color="var(--accent-blue)" />
              <span>{t('settings.language')}</span>
            </h3>
            <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-blue)', fontWeight: 700 }}>
              17 Languages & RTL Supported
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {supportedLanguages.map((lang) => {
              const isSelected = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--primary-pink)' : '1px solid var(--border-color)',
                    background: isSelected ? 'linear-gradient(135deg, rgba(255,94,151,0.15), rgba(139,92,246,0.15))' : 'var(--bg-card)',
                    color: isSelected ? 'var(--primary-pink)' : 'var(--text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 700 }}>{lang.nativeName}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {lang.name} {lang.dir === 'rtl' ? '(RTL)' : ''}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Data Storage & Privacy */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={20} color="var(--emerald)" />
            <span>{t('settings.dataStorage')}</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            {t('settings.storageNotice')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={handleExport} className="btn-secondary">
              <Download size={18} />
              <span>Export Full JSON Backup</span>
            </button>

            <label className="btn-secondary" style={{ cursor: 'pointer', margin: 0 }}>
              <Upload size={18} />
              <span>Restore from Backup</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {/* Deployment Readiness Card */}
        <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.12), rgba(16, 185, 129, 0.12))' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Rocket size={20} color="var(--accent-blue)" />
            <span>Deployment Architecture & Readiness</span>
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            BestieVerse is structured with separate frontend and backend directories for production:
          </p>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li><strong>Frontend:</strong> React + Vite app ready to deploy on Vercel, Netlify, or Render Static Sites.</li>
            <li><strong>Backend:</strong> Node.js + Express + Socket.IO server ready for Render Web Service or Railway.</li>
            <li><strong>Local Storage:</strong> Browser IndexedDB handles private journaling with zero cloud risk.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
