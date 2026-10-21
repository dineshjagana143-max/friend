import React from 'react';
import { Trophy, Star, Flame, Award, Heart, Shield, CheckCircle } from 'lucide-react';

const badges = [
  {
    id: 'first_win',
    title: 'Tic-Tac-Toe Prodigy ❌⭕',
    desc: 'Win your first game in BestieVerse.',
    unlocked: true,
    icon: '🏆',
    xp: '+100 XP'
  },
  {
    id: 'diary_starter',
    title: 'Private Reflector 📔',
    desc: 'Save your first reflection entry into IndexedDB.',
    unlocked: true,
    icon: '📝',
    xp: '+150 XP'
  },
  {
    id: 'streak_7',
    title: 'Week of Joy 🔥',
    desc: 'Maintain a 7-day friendship streak together.',
    unlocked: true,
    icon: '🔥',
    xp: '+300 XP'
  },
  {
    id: 'polyglot',
    title: 'World Explorer 🌍',
    desc: 'Explore BestieVerse in any of the 17 supported languages.',
    unlocked: true,
    icon: '🌐',
    xp: '+200 XP'
  },
  {
    id: 'scrapbooker',
    title: 'Memory Keeper 📸',
    desc: 'Save 3 precious photos to the Friendship Scrapbook.',
    unlocked: false,
    icon: '📷',
    xp: '+250 XP'
  },
  {
    id: 'game_master',
    title: 'Grandmaster Bestie ♟️',
    desc: 'Play 10 multiplayer rounds with your best friend.',
    unlocked: false,
    icon: '👑',
    xp: '+500 XP'
  }
];

export default function AchievementsPage() {
  const currentXP = 750;
  const nextLevelXP = 1000;
  const level = 4;
  const progressPercent = Math.min(100, Math.round((currentXP / nextLevelXP) * 100));

  return (
    <div className="page-content">
      {/* Header Level Card */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(255, 94, 151, 0.2))',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.8rem',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)'
              }}
            >
              ⭐
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h2 style={{ fontSize: '1.6rem', margin: 0 }}>Level {level} Duo</h2>
                <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '12px', background: 'rgba(245,158,11,0.2)', color: '#d97706', fontWeight: 700 }}>
                  Soul Besties
                </span>
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {currentXP} / {nextLevelXP} XP towards Level {level + 1}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', textAlign: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--primary-pink)', margin: 0 }}>28</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>DAY STREAK</span>
            </div>
            <div>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--secondary-purple)', margin: 0 }}>4</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700 }}>BADGES</span>
            </div>
          </div>
        </div>

        {/* XP Progress Bar */}
        <div style={{ width: '100%', height: '12px', background: 'rgba(0,0,0,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #f59e0b, #ff5e97)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.4s ease'
            }}
          />
        </div>
      </div>

      {/* Badges Grid */}
      <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>Unlockable Badges & Milestones 🏅</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {badges.map((b) => (
          <div
            key={b.id}
            className="glass-card"
            style={{
              opacity: b.unlocked ? 1 : 0.65,
              border: b.unlocked ? '1px solid var(--border-color)' : '1px dashed var(--border-color)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem'
            }}
          >
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '16px',
                background: b.unlocked ? 'linear-gradient(135deg, rgba(255,94,151,0.2), rgba(139,92,246,0.2))' : 'rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                flexShrink: 0
              }}
            >
              {b.icon}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0 }}>{b.title}</h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-pink)' }}>
                  {b.xp}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem', lineHeight: 1.4 }}>
                {b.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', fontWeight: 700, color: b.unlocked ? 'var(--emerald)' : 'var(--text-muted)' }}>
                {b.unlocked ? <CheckCircle size={14} /> : <Award size={14} />}
                <span>{b.unlocked ? 'Unlocked & Active' : 'Locked'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
