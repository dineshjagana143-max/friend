import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';
import { musicEngine } from '../utils/audioSynthesizer';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(musicEngine.getCurrentTrack());

  useEffect(() => {
    // Restore preference
    const savedVol = localStorage.getItem('bestiverse_music_vol');
    if (savedVol !== null) {
      const v = parseFloat(savedVol);
      setVolume(v);
      musicEngine.setVolume(v);
    }
  }, []);

  const handleTogglePlay = () => {
    const playing = musicEngine.togglePlay();
    setIsPlaying(playing);
    setCurrentTrack(musicEngine.getCurrentTrack());
  };

  const handleToggleMute = () => {
    const muted = musicEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(false);
    musicEngine.isMuted = false;
    musicEngine.setVolume(v);
    localStorage.setItem('bestiverse_music_vol', v.toString());
  };

  const handleNext = () => {
    musicEngine.nextTrack();
    setCurrentTrack(musicEngine.getCurrentTrack());
  };

  const handlePrev = () => {
    musicEngine.prevTrack();
    setCurrentTrack(musicEngine.getCurrentTrack());
  };

  return (
    <div className="music-bar" role="region" aria-label="Persistent Background Music Player">
      <div className="music-track-info">
        <div className="music-album-art">
          <Music size={20} color="#fff" />
        </div>
        <div className="track-text">
          <h4>{currentTrack.title}</h4>
          <p>{currentTrack.artist}</p>
        </div>
      </div>

      <div className="music-controls">
        <button
          onClick={handlePrev}
          className="btn-icon"
          title="Previous Track"
          aria-label="Previous Track"
        >
          <SkipBack size={18} />
        </button>

        <button
          onClick={handleTogglePlay}
          className="play-main-btn"
          title={isPlaying ? 'Pause Lo-Fi Vibes' : 'Play Background Lo-Fi Music'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
        </button>

        <button
          onClick={handleNext}
          className="btn-icon"
          title="Next Track"
          aria-label="Next Track"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div className="volume-container">
        <button
          onClick={handleToggleMute}
          className="btn-icon"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="volume-slider"
          aria-label="Music volume"
        />
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: '32px' }}>
          {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
        </span>
      </div>
    </div>
  );
}
