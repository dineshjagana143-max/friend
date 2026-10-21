import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Gamepad2,
  BookHeart,
  MessageCircleHeart,
  Camera,
  PhoneCall,
  Flame,
  Quote,
  RefreshCw,
  Heart,
  Smile,
  ArrowRight
} from 'lucide-react';

const quotes = [
  "A true friend is the greatest of all blessings and the rarest of treasures.",
  "Walking with a friend in the dark is better than walking alone in the light.",
  "Best friends are the people who make your problems their problems, just so you don't have to go through them alone.",
  "Friendship is born at that moment when one person says to another: 'What! You too? I thought I was the only one.'",
  "There is nothing on this earth more to be prized than true friendship."
];

export default function HomePage({ setCurrentTab, showNotification }) {
  const { t } = useTranslation();
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [selectedMood, setSelectedMood] = useState('🥰');

  const userName = localStorage.getItem('bestiverse_user_name') || 'Dinesh';
  const bestieName = localStorage.getItem('bestiverse_bestie_name') || 'Bestie';

  const handleNextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
    showNotification('New friendship quote loaded! ✨');
  };

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    localStorage.setItem('bestiverse_today_mood', mood);
    showNotification(`Mood updated to ${mood} today!`);
  };

  return (
    <div className="page-content">
      {/* Hero Header */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 94, 151, 0.22) 0%, rgba(139, 92, 246, 0.25) 50%, rgba(56, 189, 248, 0.18) 100%)',
          border: '1px solid rgba(255, 94, 151, 0.35)',
          padding: '2.5rem 2rem',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.3)', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', marginBottom: '1rem', backdropFilter: 'blur(8px)' }}>
            <Sparkles size={16} color="#ff5e97" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary-pink)' }}>
              Welcome to BestieVerse
            </span>
          </div>

          <h1 style={{ fontSize: '2.3rem', marginBottom: '0.5rem', lineHeight: 1.2 }}>
            Welcome back, {userName} & {bestieName}! 💖
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '650px', marginBottom: '1.75rem' }}>
            {t('home.welcomeSubtitle')}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentTab('games')}
              className="btn-primary"
            >
              <Gamepad2 size={18} />
              {t('home.startPlaying')}
            </button>
            <button
              onClick={() => setCurrentTab('diary')}
              className="btn-secondary"
            >
              <BookHeart size={18} />
              {t('home.writeDiary')}
            </button>
          </div>
        </div>

        {/* Decorative Floating Emojis */}
        <div style={{ position: 'absolute', right: '2rem', top: '2rem', fontSize: '5rem', opacity: 0.25, pointerEvents: 'none' }}>
          ✨👭🌸
        </div>
      </div>

      {/* Stats & Daily Widgets Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Friendship Streak Card */}
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Flame size={32} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800 }}>28</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('home.daysActive')}</span>
            </div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', margin: 0 }}>
              {t('home.friendshipStreak')} 🔥 Keep shining!
            </p>
          </div>
        </div>

        {/* Today's Mood Check */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              Today's Bestie Mood
            </span>
            <Smile size={18} color="var(--primary-pink)" />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
            {['🥰', '🌸', '💭', '🥺', '⚡', '😴'].map((mood) => (
              <button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                style={{
                  fontSize: '1.5rem',
                  padding: '0.35rem 0.5rem',
                  borderRadius: '12px',
                  background: selectedMood === mood ? 'rgba(255, 94, 151, 0.25)' : 'transparent',
                  border: selectedMood === mood ? '2px solid var(--primary-pink)' : '1px solid transparent',
                  cursor: 'pointer',
                  transform: selectedMood === mood ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.18s ease'
                }}
                title={`Set mood: ${mood}`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Card */}
      <div className="glass-card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary-pink)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Quote size={20} color="var(--primary-pink)" />
            <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t('home.dailyQuoteTitle')}</span>
          </div>
          <button
            onClick={handleNextQuote}
            className="btn-icon"
            style={{ width: '32px', height: '32px' }}
            title="Next quote"
          >
            <RefreshCw size={14} />
          </button>
        </div>
        <p style={{ fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--text-primary)', margin: 0 }}>
          {quotes[quoteIndex]}
        </p>
      </div>

      {/* Quick Jump Action Cards */}
      <h2 style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>Explore BestieVerse 🚀</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {[
          {
            id: 'games',
            title: 'Play Games',
            desc: 'Tic-Tac-Toe playable now, plus 19 more board & card games.',
            icon: Gamepad2,
            color: 'linear-gradient(135deg, #ff5e97, #f43f5e)',
            badge: 'Playable Now'
          },
          {
            id: 'diary',
            title: 'Private Diary',
            desc: '5 daily questions, moods, and reflections stored in IndexedDB.',
            icon: BookHeart,
            color: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
            badge: 'IndexedDB'
          },
          {
            id: 'dailyShare',
            title: 'Daily Share & Think',
            desc: 'Answer today’s 5 questions and share with privacy controls.',
            icon: Sparkles,
            color: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
          },
          {
            id: 'memories',
            title: 'Friendship Memories',
            desc: 'Your visual scrapbook of unforgettable bestie moments.',
            icon: Camera,
            color: 'linear-gradient(135deg, #10b981, #059669)'
          },
          {
            id: 'chat',
            title: 'Chat & Messages',
            desc: 'Secret messaging room with emojis, voice, and media.',
            icon: MessageCircleHeart,
            color: 'linear-gradient(135deg, #ec4899, #8b5cf6)'
          },
          {
            id: 'calls',
            title: 'Voice & Video Calls',
            desc: 'Call your best friend with crystal-clear WebRTC audio & video.',
            icon: PhoneCall,
            color: 'linear-gradient(135deg, #f59e0b, #d97706)'
          }
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => setCurrentTab(card.id)}
              className="glass-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: card.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  {card.badge && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        background: 'rgba(255,94,151,0.15)',
                        color: 'var(--primary-pink)',
                        fontWeight: 700
                      }}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {card.desc}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--primary-pink)',
                  marginTop: '1.25rem'
                }}
              >
                <span>Open</span>
                <ArrowRight size={15} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
