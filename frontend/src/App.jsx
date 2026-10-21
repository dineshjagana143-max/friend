import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MusicPlayer from './components/MusicPlayer';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import ChatPage from './pages/ChatPage';
import DailySharePage from './pages/DailySharePage';
import DiaryPage from './pages/DiaryPage';
import MemoriesPage from './pages/MemoriesPage';
import CallsPage from './pages/CallsPage';
import AchievementsPage from './pages/AchievementsPage';
import SettingsPage from './pages/SettingsPage';
import { initDB } from './utils/db';
import { Heart } from 'lucide-react';

export default function App() {
  const { t, i18n } = useTranslation();
  const [currentTab, setCurrentTab] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('bestiverse_theme') || 'light');
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize DB and theme on mount
  useEffect(() => {
    initDB().catch(console.error);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('bestiverse_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    showNotification(`Switched to ${newTheme === 'dark' ? 'Cosmic Dark' : 'Sweet Light'} Mode 🌸`);
  };

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Render current active page
  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'home':
        return <HomePage setCurrentTab={setCurrentTab} showNotification={showNotification} />;
      case 'games':
        return <GamesPage showNotification={showNotification} />;
      case 'chat':
        return <ChatPage setCurrentTab={setCurrentTab} showNotification={showNotification} />;
      case 'dailyShare':
        return <DailySharePage showNotification={showNotification} />;
      case 'diary':
        return <DiaryPage showNotification={showNotification} />;
      case 'memories':
        return <MemoriesPage showNotification={showNotification} />;
      case 'calls':
        return <CallsPage showNotification={showNotification} />;
      case 'achievements':
        return <AchievementsPage />;
      case 'settings':
        return (
          <SettingsPage
            theme={theme}
            toggleTheme={toggleTheme}
            showNotification={showNotification}
          />
        );
      default:
        return <HomePage setCurrentTab={setCurrentTab} showNotification={showNotification} />;
    }
  };

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Wrapper */}
      <div className="main-wrapper">
        <Topbar
          currentTab={currentTab}
          setMobileOpen={setMobileOpen}
          theme={theme}
          toggleTheme={toggleTheme}
          showNotification={showNotification}
        />

        {/* Dynamic Page Content */}
        <main>{renderCurrentPage()}</main>

        {/* Persistent Background Music Bar */}
        <MusicPlayer />
      </div>

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="toast-container" role="status" aria-live="polite">
          <div className="toast">
            <Heart size={18} color="var(--primary-pink)" fill="var(--primary-pink)" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
