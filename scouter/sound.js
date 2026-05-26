// Lightweight Web Audio cockpit sounds — no library, no assets.
// All beeps are short oscillator burts at canonical 80s console tones.

(function () {
  let ctx = null;
  let enabled = (localStorage.getItem('scouter-sound') ?? '1') === '1';

  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch (e) { return null; }
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone({ freq = 880, dur = 0.08, type = 'square', vol = 0.05, slide = 0, delay = 0 }) {
    if (!enabled) return;
    const c = getCtx();
    if (!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  const SFX = {
    beep:      () => tone({ freq: 1320, dur: 0.05, type: 'square', vol: 0.05 }),
    hover:     () => tone({ freq: 880,  dur: 0.04, type: 'triangle', vol: 0.03 }),
    click:     () => { tone({ freq: 1760, dur: 0.05, type: 'square', vol: 0.06 }); tone({ freq: 880, dur: 0.05, type: 'square', vol: 0.04, delay: 0.05 }); },
    next:      () => { tone({ freq: 660, dur: 0.06, type: 'sawtooth', vol: 0.05, slide: 600 }); tone({ freq: 1260, dur: 0.08, type: 'square', vol: 0.04, delay: 0.06 }); },
    prev:      () => { tone({ freq: 1260, dur: 0.06, type: 'sawtooth', vol: 0.05, slide: -600 }); tone({ freq: 660, dur: 0.08, type: 'square', vol: 0.04, delay: 0.06 }); },
    powerup:   () => { for (let i = 0; i < 6; i++) tone({ freq: 440 + i * 220, dur: 0.07, type: 'square', vol: 0.05, delay: i * 0.06 }); },
    powerdown: () => { for (let i = 0; i < 5; i++) tone({ freq: 1320 - i * 220, dur: 0.07, type: 'square', vol: 0.04, delay: i * 0.05 }); },
    alert:     () => { tone({ freq: 2200, dur: 0.05, type: 'square', vol: 0.06 }); tone({ freq: 2200, dur: 0.05, type: 'square', vol: 0.06, delay: 0.1 }); },
    boot:      () => { for (let i = 0; i < 8; i++) tone({ freq: 220 + Math.random() * 880, dur: 0.04, type: 'triangle', vol: 0.025, delay: i * 0.08 }); },
    chirp:     () => tone({ freq: 1760, dur: 0.06, type: 'square', vol: 0.04, slide: 1200 })
  };

  window.SCOUTER_SFX = {
    play: (name) => { try { SFX[name] && SFX[name](); } catch (e) {} },
    enabled: () => enabled,
    set: (v) => { enabled = !!v; localStorage.setItem('scouter-sound', enabled ? '1' : '0'); }
  };
})();
