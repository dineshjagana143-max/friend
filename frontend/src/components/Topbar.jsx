import React from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, Moon, Sun, Globe, Bell, Heart } from 'lucide-react';
import { supportedLanguages } from '../i18n/translations';

export default function Topbar({
  currentTab,
  setMobileOpen,
  theme,
  toggleTheme,
  showNotification
}) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    const selected = supportedLanguages.find(l => l.code === newLang);
    showNotification(`Language switched to ${selected ? selected.nativeName : newLang} 🌍`);
  };

  const getPageHeading = () => {
    switch (currentTab) {
      case 'home': return t('nav.home');
      case 'games': return t('nav.games');
      case 'chat': return t('nav.chat');
      case 'dailyShare': return t('nav.dailyShare');
      case 'diary': return t('nav.diary');
      case 'memories': return t('nav.memories');
      case 'calls': return t('nav.calls');
      case 'achievements': return t('nav.achievements');
      case 'settings': return t('nav.settings');
      default: return 'BestieVerse';
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="page-title">{getPageHeading()}</h1>
      </div>

      <div className="topbar-right">
        {/* Language Quick Selector */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Globe size={18} style={{ position: 'absolute', left: '10px', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
          <select
            value={i18n.language}
            onChange={handleLanguageChange}
            style={{
              padding: '0.45rem 0.85rem 0.45rem 2rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="btn-icon"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} color="#8b5cf6" />}
        </button>

        {/* Bestie Online Status */}
        <div className="bestie-status-pill" title="Synchronized with your bestie space">
          <span className="status-dot"></span>
          <span>Bestie Online</span>
        </div>
      </div>
    </header>
  );
}
