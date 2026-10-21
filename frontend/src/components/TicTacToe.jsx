import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw, Trophy, Users, Bot, Info, ArrowLeft } from 'lucide-react';
import Confetti from './Confetti';

export default function TicTacToe({ onBack, showNotification }) {
  const { t } = useTranslation();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('pvp'); // 'pvp' or 'ai'
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });
  const [winningLine, setWinningLine] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRules, setShowRules] = useState(false);

  // Winning combinations
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  const checkWinner = (currentBoard) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return { winner: currentBoard[a], line: lines[i] };
      }
    }
    if (currentBoard.every((cell) => cell !== null)) {
      return { winner: 'Draw', line: null };
    }
    return null;
  };

  const currentResult = checkWinner(board);

  // Handle cell click
  const handleClick = (index) => {
    if (board[index] || currentResult) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result);
    } else {
      setIsXNext(!isXNext);
    }
  };

  // AI turn
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !currentResult) {
      const timer = setTimeout(() => {
        makeAiMove();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isXNext, gameMode, board]);

  const makeAiMove = () => {
    // 1. Can AI win on this turn?
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const copy = [...board];
        copy[i] = 'O';
        const res = checkWinner(copy);
        if (res && res.winner === 'O') {
          finalizeMove(i, 'O');
          return;
        }
      }
    }

    // 2. Can Player X win next? Block them!
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        const copy = [...board];
        copy[i] = 'X';
        const res = checkWinner(copy);
        if (res && res.winner === 'X') {
          finalizeMove(i, 'O');
          return;
        }
      }
    }

    // 3. Take center if open
    if (!board[4]) {
      finalizeMove(4, 'O');
      return;
    }

    // 4. Take random available spot
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length > 0) {
      const randomSpot = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      finalizeMove(randomSpot, 'O');
    }
  };

  const finalizeMove = (index, symbol) => {
    const newBoard = [...board];
    newBoard[index] = symbol;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      handleGameEnd(result);
    } else {
      setIsXNext(true);
    }
  };

  const handleGameEnd = (result) => {
    if (result.winner === 'Draw') {
      setScores((prev) => ({ ...prev, draws: prev.draws + 1 }));
      showNotification("It's a draw! Both besties are geniuses! 🎉");
    } else {
      setWinningLine(result.line);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);

      if (result.winner === 'X') {
        setScores((prev) => ({ ...prev, x: prev.x + 1 }));
        showNotification("Player X wins the round! 💖🎉");
      } else {
        setScores((prev) => ({ ...prev, o: prev.o + 1 }));
        showNotification(gameMode === 'ai' ? "Bestie AI takes this one! 🤖" : "Player O wins! 🌟");
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
    setShowConfetti(false);
  };

  const resetAllScores = () => {
    resetGame();
    setScores({ x: 0, o: 0, draws: 0 });
    showNotification('Scoreboard has been reset!');
  };

  return (
    <div>
      <Confetti active={showConfetti} />

      {/* Header & Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button onClick={onBack} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
          <ArrowLeft size={18} />
          <span>Back to Library</span>
        </button>

        <button
          onClick={() => setShowRules(!showRules)}
          className="btn-secondary"
          style={{ padding: '0.5rem 1rem' }}
        >
          <Info size={18} />
          <span>Instructions</span>
        </button>
      </div>

      {/* Instructions dropdown */}
      {showRules && (
        <div className="glass-card" style={{ marginBottom: '1.5rem', background: 'rgba(255,94,151,0.06)' }}>
          <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>How to Play Tic-Tac-Toe 🎯</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <li>Player X and Player O take turns placing their mark in an empty square on a 3x3 grid.</li>
            <li>The first player to get 3 marks in a row (horizontal, vertical, or diagonal) wins!</li>
            <li>If all 9 squares are full and neither player has 3 in a row, it is a friendly draw.</li>
            <li>Switch between "vs Bestie" (pass and play) or "vs AI" mode anytime!</li>
          </ul>
        </div>
      )}

      {/* Game Mode Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
        <button
          onClick={() => { setGameMode('pvp'); resetGame(); }}
          className={gameMode === 'pvp' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.6rem 1.25rem' }}
        >
          <Users size={18} />
          <span>{t('games.vsFriend')}</span>
        </button>
        <button
          onClick={() => { setGameMode('ai'); resetGame(); }}
          className={gameMode === 'ai' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '0.6rem 1.25rem' }}
        >
          <Bot size={18} />
          <span>{t('games.vsAi')}</span>
        </button>
      </div>

      {/* Scoreboard Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', maxWidth: '480px', margin: '0 auto 1.75rem' }}>
        <div
          className="glass-card"
          style={{
            textAlign: 'center',
            padding: '1rem',
            borderBottom: isXNext && !currentResult ? '3px solid var(--primary-pink)' : '1px solid var(--border-color)'
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>PLAYER X</span>
          <h4 style={{ fontSize: '1.6rem', color: 'var(--primary-pink)', margin: '0.2rem 0' }}>{scores.x}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Bestie 1</span>
        </div>

        <div className="glass-card" style={{ textAlign: 'center', padding: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>DRAWS</span>
          <h4 style={{ fontSize: '1.6rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>{scores.draws}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Ties</span>
        </div>

        <div
          className="glass-card"
          style={{
            textAlign: 'center',
            padding: '1rem',
            borderBottom: !isXNext && !currentResult ? '3px solid var(--secondary-purple)' : '1px solid var(--border-color)'
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>PLAYER O</span>
          <h4 style={{ fontSize: '1.6rem', color: 'var(--secondary-purple)', margin: '0.2rem 0' }}>{scores.o}</h4>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {gameMode === 'ai' ? 'Smart AI' : 'Bestie 2'}
          </span>
        </div>
      </div>

      {/* Turn or Winner Banner */}
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {currentResult ? (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.6rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              background: currentResult.winner === 'Draw' ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 94, 151, 0.18)',
              border: '1px solid var(--border-color)',
              fontWeight: 800,
              fontSize: '1.1rem'
            }}
          >
            <Trophy size={20} color="var(--primary-pink)" />
            <span>
              {currentResult.winner === 'Draw'
                ? t('games.drawGame')
                : `${t('games.winnerIs')} Player ${currentResult.winner}! 💖🎉`}
            </span>
          </div>
        ) : (
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: isXNext ? 'var(--primary-pink)' : 'var(--secondary-purple)' }}>
            {isXNext ? '❌ ' + t('games.turnX') : '⭕ ' + t('games.turnO')}
          </div>
        )}
      </div>

      {/* 3x3 Game Board Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          maxWidth: '380px',
          margin: '0 auto 2rem'
        }}
      >
        {board.map((cell, index) => {
          const isWinningCell = winningLine && winningLine.includes(index);
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !!currentResult || (gameMode === 'ai' && !isXNext)}
              style={{
                width: '100%',
                aspectRatio: '1 / 1',
                borderRadius: 'var(--radius-md)',
                background: isWinningCell
                  ? 'linear-gradient(135deg, rgba(255, 94, 151, 0.4), rgba(139, 92, 246, 0.4))'
                  : 'var(--bg-card)',
                border: isWinningCell ? '3px solid var(--primary-pink)' : '1px solid var(--border-color)',
                fontSize: '2.8rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                color: cell === 'X' ? 'var(--primary-pink)' : 'var(--secondary-purple)',
                cursor: cell || currentResult ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isWinningCell ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
                transition: 'all var(--transition-fast)'
              }}
            >
              {cell}
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={resetGame} className="btn-primary">
          <RotateCcw size={18} />
          <span>{t('games.restart')}</span>
        </button>
        <button onClick={resetAllScores} className="btn-secondary">
          <span>Reset Scoreboard</span>
        </button>
      </div>
    </div>
  );
}
