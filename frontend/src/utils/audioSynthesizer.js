// Web Audio API procedural music engine
// Generates copyright-free, smooth, aesthetic ambient lo-fi / upbeat tunes reliably

class MusicEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.5;
    this.isMuted = false;
    this.currentTrackIndex = 0;
    this.timerId = null;
    this.masterGain = null;

    this.tracks = [
      {
        id: 'lofi_chill',
        title: '🌸 Bestie Chill Lo-Fi',
        artist: 'BestieVerse Soundscape',
        bpm: 72,
        scale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], // C Major pentatonic
        chords: [
          [261.63, 329.63, 392.00, 493.88], // Cmaj7
          [220.00, 261.63, 329.63, 392.00], // Am7
          [174.61, 220.00, 261.63, 329.63], // Fmaj7
          [196.00, 246.94, 293.66, 349.23]  // G7
        ]
      },
      {
        id: 'sweet_dreams',
        title: '✨ Cosmic Friendship',
        artist: 'Starlight Dreamer',
        bpm: 84,
        scale: [293.66, 329.63, 369.99, 440.00, 493.88, 587.33], // D Major
        chords: [
          [293.66, 369.99, 440.00, 554.37], // Dmaj7
          [246.94, 293.66, 369.99, 440.00], // Bm7
          [196.00, 246.94, 293.66, 369.99], // Gmaj7
          [220.00, 277.18, 329.63, 440.00]  // A
        ]
      },
      {
        id: 'midnight_secrets',
        title: '🌙 Midnight Whispers',
        artist: 'Cozy Night Moods',
        bpm: 65,
        scale: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00], // A minor
        chords: [
          [220.00, 261.63, 329.63, 392.00], // Am7
          [174.61, 220.00, 261.63, 329.63], // Fmaj7
          [130.81, 164.81, 196.00, 246.94], // C
          [164.81, 196.00, 246.94, 293.66]  // Em7
        ]
      },
      {
        id: 'sunny_cafeteria',
        title: '☕ Warm Coffee & Smiles',
        artist: 'Morning Sunshine',
        bpm: 90,
        scale: [261.63, 329.63, 349.23, 392.00, 440.00, 523.25],
        chords: [
          [174.61, 220.00, 261.63, 329.63], // Fmaj7
          [196.00, 246.94, 293.66, 349.23], // G
          [164.81, 196.00, 246.94, 293.66], // Em7
          [220.00, 261.63, 329.63, 392.00]  // Am7
        ]
      }
    ];

    this.step = 0;
    this.chordStep = 0;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play() {
    this.ensureContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.scheduleNextTick();
  }

  pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      const target = this.isMuted ? 0 : this.volume * 0.35;
      this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.05);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.setVolume(this.volume);
    return this.isMuted;
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.step = 0;
    this.chordStep = 0;
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.step = 0;
    this.chordStep = 0;
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  scheduleNextTick() {
    if (!this.isPlaying) return;

    const track = this.getCurrentTrack();
    const intervalMs = (60 / track.bpm) * 500; // eighth notes

    this.playBeat(track);

    this.timerId = setTimeout(() => {
      this.scheduleNextTick();
    }, intervalMs);
  }

  playBeat(track) {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Every 4 steps change or strum chord
    if (this.step % 4 === 0) {
      const chords = track.chords;
      const currentChord = chords[this.chordStep % chords.length];
      this.chordStep++;

      // Play soft warm pad / chord
      currentChord.forEach((freq, idx) => {
        this.playPadNote(freq, now + idx * 0.04, 1.8);
      });
    }

    // Melodic pentatonic sparkle note
    if (Math.random() > 0.35) {
      const scale = track.scale;
      const note = scale[Math.floor(Math.random() * scale.length)];
      this.playMelodyNote(note * (Math.random() > 0.5 ? 2 : 1), now + 0.02, 0.6);
    }

    // Soft lo-fi kick / tick
    if (this.step % 2 === 0) {
      this.playKick(now);
    }

    this.step++;
  }

  playPadNote(freq, startTime, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.06, startTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playMelodyNote(freq, startTime, duration) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  playKick(startTime) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.frequency.setValueAtTime(110, startTime);
    osc.frequency.exponentialRampToValueAtTime(40, startTime + 0.12);

    gain.gain.setValueAtTime(0.05, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + 0.15);
  }
}

export const musicEngine = new MusicEngine();
