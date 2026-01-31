// Simple sound manager using Web Audio API
class SoundManager {
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Play a simple beep sound
  private playTone(frequency: number, duration: number, volume: number = 0.3) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Phase 1: Gentle notification
  playPhase1Sound() {
    this.playTone(800, 0.15, 0.2);
  }

  // Phase 2: Urgent beeping
  playPhase2Sound() {
    this.playTone(1200, 0.1, 0.3);
    setTimeout(() => this.playTone(1200, 0.1, 0.3), 100);
    setTimeout(() => this.playTone(1200, 0.1, 0.3), 200);
  }

  // Phase 3: Dissonant/creepy
  playPhase3Sound() {
    this.playTone(400, 0.2, 0.25);
    setTimeout(() => this.playTone(666, 0.3, 0.25), 100);
    setTimeout(() => this.playTone(333, 0.25, 0.25), 200);
  }

  // Ending sound
  playEndingSound() {
    // Descending scale
    const notes = [1000, 900, 800, 700, 600, 500, 400];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.3, 0.2), i * 150);
    });
  }

  playWarningSound(phase: number) {
    if (phase === 1) this.playPhase1Sound();
    else if (phase === 2) this.playPhase2Sound();
    else this.playPhase3Sound();
  }
}

export const soundManager = new SoundManager();
