import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Gamepad2, Play, Users, Wifi, Sparkles } from 'lucide-react';
import TicTacToe from '../components/TicTacToe';

const gamesList = [
  {
    id: 'tictactoe',
    title: 'Tic-Tac-Toe ❌⭕',
    category: 'Board Games',
    desc: 'The classic 3x3 strategy game. Play vs Bestie or challenge the smart AI with scoreboard & confetti!',
    mode: 'both',
    modeLabel: 'Local & AI Playable',
    status: 'playable',
    icon: '❌⭕',
    bg: 'linear-gradient(135deg, #ff5e97, #8b5cf6)'
  },
  {
    id: 'ludo',
    title: 'Ludo Star 🎲',
    category: 'Board Games',
    desc: 'Roll the dice and race your 4 tokens to home. Room codes and online turns support.',
    mode: 'both',
    modeLabel: 'Local & Online Multiplayer',
    status: 'stage2',
    icon: '🎲',
    bg: 'linear-gradient(135deg, #f59e0b, #ef4444)'
  },
  {
    id: 'carrom',
    title: 'Bestie Carrom ⚪🔴',
    category: 'Board Games',
    desc: 'Realistic physics, striker angles, and queen cover mechanics for two best friends.',
    mode: 'both',
    modeLabel: 'Local & Online Multiplayer',
    status: 'stage2',
    icon: '⚪',
    bg: 'linear-gradient(135deg, #10b981, #059669)'
  },
  {
    id: 'chess',
    title: 'Royal Chess ♟️',
    category: 'Board Games',
    desc: 'Deep intellectual battles with move validation, check/checkmate alerts, and timers.',
    mode: 'both',
    modeLabel: 'Local & Online Multiplayer',
    status: 'stage2',
    icon: '♟️',
    bg: 'linear-gradient(135deg, #6366f1, #3b82f6)'
  },
  {
    id: 'checkers',
    title: 'Checkers / Draughts 🏁',
    category: 'Board Games',
    desc: 'Diagonal jumps, king crowning, and fast tactical gameplay.',
    mode: 'both',
    modeLabel: 'Local & Online Multiplayer',
    status: 'stage2',
    icon: '🏁',
    bg: 'linear-gradient(135deg, #ec4899, #f43f5e)'
  },
  {
    id: 'snakes',
    title: 'Snakes & Ladders 🐍',
    category: 'Board Games',
    desc: 'Climb high ladders, avoid slippery snakes, and laugh together to the 100th square.',
    mode: 'both',
    modeLabel: 'Local & Online Multiplayer',
    status: 'stage2',
    icon: '🐍',
    bg: 'linear-gradient(135deg, #14b8a6, #0d9488)'
  },
  {
    id: 'connect4',
    title: 'Connect Four 🟡🔴',
    category: 'Board Games',
    desc: 'Drop chips into the 7x6 vertical grid and line up 4 of your color to win.',
    mode: 'both',
    modeLabel: 'Local & Online Multiplayer',
    status: 'stage2',
    icon: '🟡',
    bg: 'linear-gradient(135deg, #eab308, #ca8a04)'
  },
  {
    id: 'battleship',
    title: 'Naval Battleship 🚢',
    category: 'Board Games',
    desc: 'Place your fleet secretly and call coordinates to sink your bestie’s warships.',
    mode: 'online',
    modeLabel: 'Online Multiplayer',
    status: 'stage2',
    icon: '🚢',
    bg: 'linear-gradient(135deg, #0284c7, #0369a1)'
  },
  {
    id: 'memory',
    title: 'Memory Card Match 🧠',
    category: 'Casual',
    desc: 'Flip bestie-themed cards to find matching pairs before the countdown timer ends.',
    mode: 'local',
    modeLabel: 'Local & Solo',
    status: 'stage2',
    icon: '🧠',
    bg: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  },
  {
    id: 'rps',
    title: 'Rock Paper Scissors ✂️',
    category: 'Casual',
    desc: 'Fast best-of-5 rounds with suspenseful countdown reveals and special friend modifiers.',
    mode: 'both',
    modeLabel: 'Local & Online',
    status: 'stage2',
    icon: '✊',
    bg: 'linear-gradient(135deg, #f97316, #ea580c)'
  },
  {
    id: 'uno',
    title: 'UNO-Style Duo Deck 🃏',
    category: 'Card Games',
    desc: 'Color matches, reverse, skip, draw-4 wild cards, and shout Bestie-UNO!',
    mode: 'online',
    modeLabel: 'Online Multiplayer',
    status: 'stage2',
    icon: '🃏',
    bg: 'linear-gradient(135deg, #ef4444, #b91c1c)'
  },
  {
    id: 'gofish',
    title: 'Go Fish 🐟',
    category: 'Card Games',
    desc: 'Ask your best friend for ranks: "Do you have any Queens?" or Go Fish!',
    mode: 'both',
    modeLabel: 'Local & Online',
    status: 'stage2',
    icon: '🐟',
    bg: 'linear-gradient(135deg, #06b6d4, #0891b2)'
  },
  {
    id: 'crazy8',
    title: 'Crazy Eights 🎱',
    category: 'Card Games',
    desc: 'Shed cards on the discard pile and use wild 8s to shift the suit.',
    mode: 'both',
    modeLabel: 'Local & Online',
    status: 'stage2',
    icon: '🎱',
    bg: 'linear-gradient(135deg, #475569, #334155)'
  },
  {
    id: 'truthordare',
    title: 'Truth or Dare 💖',
    category: 'Party & Social',
    desc: 'Curated heartwarming, silly, and funny friendship truths and hilarious dares.',
    mode: 'local',
    modeLabel: 'Local Party',
    status: 'stage2',
    icon: '🤫',
    bg: 'linear-gradient(135deg, #ec4899, #be185d)'
  },
  {
    id: 'wouldyourather',
    title: 'Would You Rather? 🤔',
    category: 'Party & Social',
    desc: 'Dilemma choices! See if you and your bestie pick the exact same answers.',
    mode: 'both',
    modeLabel: 'Local & Online',
    status: 'stage2',
    icon: '🤔',
    bg: 'linear-gradient(135deg, #a855f7, #9333ea)'
  },
  {
    id: 'bestiequiz',
    title: 'Ultimate Bestie Quiz 👑',
    category: 'Party & Social',
    desc: 'Who knows who better? Create custom friendship trivia and guess the answers.',
    mode: 'both',
    modeLabel: 'Local & Online',
    status: 'stage2',
    icon: '👑',
    bg: 'linear-gradient(135deg, #e11d48, #be123c)'
  },
  {
    id: 'wordguess',
    title: 'Bestie Wordle 🔤',
    category: 'Casual',
    desc: 'Guess 5-letter friendship and secret words in 6 attempts with colored hints.',
    mode: 'both',
    modeLabel: 'Local & Solo',
    status: 'stage2',
    icon: '🔤',
    bg: 'linear-gradient(135deg, #10b981, #047857)'
  },
  {
    id: 'numberguess',
    title: 'Secret Number Clues 🔢',
    category: 'Casual',
    desc: 'Guess the hidden number with warm/cold hints and fewer steps bonus score.',
    mode: 'both',
    modeLabel: 'Local & Solo',
    status: 'stage2',
    icon: '🔢',
    bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
  },
  {
    id: 'puzzle',
    title: 'Bestie Photo Sliding Puzzle 🧩',
    category: 'Puzzles & Arcade',
    desc: 'Slide memory tiles to reassemble unforgettable photos together.',
    mode: 'local',
    modeLabel: 'Local & Solo',
    status: 'stage2',
    icon: '🧩',
    bg: 'linear-gradient(135deg, #8b5cf6, #4f46e5)'
  },
  {
    id: 'arcade',
    title: 'Retro Bestie Runner 🕹️',
    category: 'Puzzles & Arcade',
    desc: 'Dodge obstacles and collect friendship stars together in a vibrant arcade runner.',
    mode: 'local',
    modeLabel: 'Local & Solo',
    status: 'stage2',
    icon: '🕹️',
    bg: 'linear-gradient(135deg, #f43f5e, #e11d48)'
  }
];

export default function GamesPage({ showNotification }) {
  const { t } = useTranslation();
  const [activeGame, setActiveGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Board Games', 'Card Games', 'Party & Social', 'Casual', 'Puzzles & Arcade'];

  const filteredGames = gamesList.filter((g) => {
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    const matchesSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          g.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (activeGame === 'tictactoe') {
    return (
      <div className="page-content">
        <TicTacToe
          onBack={() => setActiveGame(null)}
          showNotification={showNotification}
        />
      </div>
    );
  }

  return (
    <div className="page-content">
      {/* Header Banner */}
      <div
        className="glass-card"
        style={{
          background: 'linear-gradient(135deg, rgba(255,94,151,0.18), rgba(139,92,246,0.18))',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gamepad2 size={28} color="var(--primary-pink)" />
          <h2 style={{ fontSize: '1.6rem', margin: 0 }}>{t('games.title')}</h2>
        </div>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          {t('games.subtitle')} Play Tic-Tac-Toe now, and unlock 19 more thrilling games in Stage 2!
        </p>

        {/* Search Bar & Categories */}
        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder={t('games.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 1rem 0.65rem 2.4rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '0.4rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                border: selectedCategory === cat ? '1px solid var(--primary-pink)' : '1px solid var(--border-color)',
                background: selectedCategory === cat ? 'linear-gradient(135deg, var(--primary-pink), var(--secondary-purple))' : 'var(--bg-card)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {filteredGames.map((game) => {
          const isPlayable = game.status === 'playable';
          return (
            <div
              key={game.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: isPlayable ? '2px solid var(--primary-pink)' : '1px solid var(--border-color)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: game.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
                    }}
                  >
                    {game.icon}
                  </div>

                  {/* Mode & Status Badges */}
                  <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: isPlayable ? 'rgba(16, 185, 129, 0.18)' : 'rgba(139, 92, 246, 0.15)',
                        color: isPlayable ? 'var(--emerald)' : 'var(--secondary-purple)',
                        fontWeight: 700
                      }}
                    >
                      {isPlayable ? '🟢 Ready to Play' : '⏳ Stage 2 Scheduled'}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {game.modeLabel}
                    </span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{game.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {game.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                {isPlayable ? (
                  <button
                    onClick={() => setActiveGame(game.id)}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Play size={18} />
                    <span>{t('games.ticTacToeTitle')} - Play Now</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', opacity: 0.65, cursor: 'not-allowed' }}
                    title="Will be implemented in Stage 2 as per plan"
                  >
                    <span>Stage 2 Next</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
