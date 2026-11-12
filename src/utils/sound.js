class CuteArcadeSoundManager {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type = 'square', duration = 0.08, gainVal = 0.07) {
    if (this.muted) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio autoplay handled
    }
  }

  // 1. Page Hit: Bright ascending 3-note chime
  hit() {
    this.playTone(523.25, 'triangle', 0.09, 0.08); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.1, 0.08), 50); // E5
    setTimeout(() => this.playTone(783.99, 'square', 0.14, 0.07), 100); // G5
  }

  // 2. Page Fault: Descending arcade buzz
  fault() {
    this.playTone(310.0, 'sawtooth', 0.1, 0.06);
    setTimeout(() => this.playTone(210.0, 'sawtooth', 0.15, 0.06), 65);
  }

  // 3. Button Click / Stepper Pop
  pop() {
    this.playTone(587.33, 'sine', 0.04, 0.06);
    setTimeout(() => this.playTone(880.0, 'sine', 0.05, 0.05), 30);
  }

  // 4. Tab Navigation Switch
  tab() {
    this.playTone(440.0, 'triangle', 0.06, 0.05);
    setTimeout(() => this.playTone(659.25, 'sine', 0.08, 0.05), 45);
  }

  // 5. Presets Loading Chirp
  preset() {
    this.playTone(392.0, 'square', 0.05, 0.05);
    setTimeout(() => this.playTone(523.25, 'square', 0.06, 0.05), 40);
    setTimeout(() => this.playTone(659.25, 'triangle', 0.08, 0.05), 80);
  }

  // 6. Thrashing Slider Drag Tick
  slider() {
    this.playTone(320.0, 'triangle', 0.03, 0.04);
  }

  // 7. Reset Rewind Swoosh
  reset() {
    this.playTone(700.0, 'sawtooth', 0.05, 0.04);
    setTimeout(() => this.playTone(500.0, 'sawtooth', 0.05, 0.04), 40);
    setTimeout(() => this.playTone(300.0, 'sawtooth', 0.07, 0.04), 80);
  }

  // 8. End of Run Celebration Fanfare
  victory() {
    const sequence = [
      { f: 440, d: 0.1 },
      { f: 554.37, d: 0.1 },
      { f: 659.25, d: 0.1 },
      { f: 880, d: 0.25 },
    ];
    sequence.forEach((note, idx) => {
      setTimeout(() => this.playTone(note.f, 'triangle', note.d, 0.08), idx * 80);
    });
  }
}

export const sfx = new CuteArcadeSoundManager();