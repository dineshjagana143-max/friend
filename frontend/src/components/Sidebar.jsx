import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Home,
  Gamepad2,
  MessageCircleHeart,
  Sparkles,
  BookHeart,
  Camera,
  PhoneCall,
  Trophy,
  Settings,
  X,
  HeartHandshake
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, mobileOpen, setMobileOpen }) {
  const { t } = useTranslation();

  const navItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'games', label: t('nav.games'), icon: Gamepad2, badge: 'Playable' },
    { id: 'chat', label: t('nav.chat'), icon: MessageCircleHeart },
    { id: 'dailyShare', label: t('nav.dailyShare'), icon: Sparkles },
    { id: 'diary', label: t('nav.diary'), icon: BookHeart, badge: 'IndexedDB' },
    { id: 'memories', label: t('nav.memories'), icon: Camera },
    { id: 'calls', label: t('nav.calls'), icon: PhoneCall },
    { id: 'achievements', label: t('nav.achievements'), icon: Trophy },
    { id: 'settings', label: t('nav.settings'), icon: Settings }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 99
          }}
        />
      )}

      <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="sidebar-brand">
            <div className="brand-icon-wrapper">
              <HeartHandshake size={24} />
            </div>
            <div>
              <span className="brand-title">BestieVerse</span>
              <span style={{ fontSize: '1.1rem', marginLeft: '4px' }}>💖</span>
            </div>
          </div>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="btn-icon"
              style={{ display: 'flex' }}
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileOpen(false);
                }}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 7px',
                      borderRadius: '12px',
                      background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,94,151,0.15)',
                      color: isActive ? '#fff' : 'var(--primary-pink)',
                      fontWeight: 700
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bestie Duo Status Card */}
        <div
          style={{
            marginTop: 'auto',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, rgba(255,94,151,0.12), rgba(139,92,246,0.12))',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <div style={{ fontSize: '1.8rem' }}>👭</div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 700, margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              Dinesh & Bestie
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
              Connected & Synchronized
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
