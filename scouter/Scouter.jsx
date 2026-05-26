/* global React */
const { useState: useScS, useEffect: useScE } = React;

// 4 gauges along the bottom arc; dip follows the lens bottom curve
const ARC_GAUGES = (battleMode, tele) => [
  { id: 'ki',    label: 'KI · LV',  v: tele.a, cls: '' },
  { id: 'bio',   label: 'BIO·SIG',  v: tele.b, cls: 'violet' },
  { id: 'lock',  label: 'LOCK',     v: tele.c, cls: '' },
  { id: 'mode',  label: battleMode ? 'BATTLE' : 'SCAN', v: battleMode ? '◉' : '◎', cls: battleMode ? 'alert' : '' }
];

function ScouterChrome({ lang, sectionIdx, sectionCount, sectionTitles, onJump, soundOn, onSoundToggle, battleMode, onToggleLang, onOpenThemes }) {
  const [time, setTime] = useScS(() => new Date());
  useScE(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(time.getHours()).padStart(2, '0');
  const mm = String(time.getMinutes()).padStart(2, '0');
  const ss = String(time.getSeconds()).padStart(2, '0');

  const [tele, setTele] = useScS({ a: 1240, b: 9.4, c: 0.82 });
  useScE(() => {
    const id = setInterval(() => {
      setTele({
        a: 1000 + Math.floor(Math.random() * 800),
        b: (8 + Math.random() * 2).toFixed(1),
        c: (0.7 + Math.random() * 0.3).toFixed(2)
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);

  // Each gauge dip follows sin(π*x) so it hugs the bottom-lens curve.
  // 4 gauges → x ∈ {0, 0.33, 0.67, 1}.  Max dip ~28px.
  const gauges = ARC_GAUGES(battleMode, tele);

  return (
    <div className="chrome">
      <div className="chrome-bar top">
        <span className="dot blinker" />
        <span>SCOUTER MK·IV</span>
        <span className="sep">·</span>
        <span>TGT: <strong style={{ color: 'var(--hud-amber)' }}>SYLVAIN.V</strong></span>
        <span className="sep">·</span>
        <span>SECTOR: BILIEU·ISÈRE</span>

        <span className="grow" />

        <div className="section-indicator" title="Jump to section">
          {sectionTitles.map((t, i) => (
            <div
              key={i}
              className={"si " + (i === sectionIdx ? 'active' : '')}
              onClick={() => onJump(i)}
              title={t}
            />
          ))}
        </div>

        <span className="sep">·</span>
        <a className="bar-btn" href="../index.html#landing-screen" title="Back to themes">
          ◀ BACK
        </a>
        <button className="bar-btn violet" onClick={onOpenThemes} title="Switch theme">
          ◆ THEMES
        </button>
        <button className="bar-btn" onClick={onToggleLang} title="Switch language (L)">
          {lang === 'fr' ? 'FR ▸ EN' : 'EN ▸ FR'}
        </button>
        <button className="bar-btn" onClick={onSoundToggle} title="Toggle sound">
          <span className={"dot " + (soundOn ? '' : 'crimson')} />
          {soundOn ? 'SFX' : 'MUTE'}
        </button>
        <span className="sep">·</span>
        <span style={{ color: 'var(--hud-amber)' }}>{hh}:{mm}:{ss}</span>
      </div>

      {/* Arc of gauges along the bottom lens curve */}
      <div className="gauge-arc">
        {gauges.map((g, i) => {
          const x = i / (gauges.length - 1);
          const dip = Math.sin(Math.PI * x) * 28;
          return (
            <div key={g.id} className="gauge-wrap" style={{ '--dip': `${dip}px` }}>
              <div className={"gauge " + g.cls}>
                <div>{g.label}</div>
                <div className="v">{g.v}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="chrome-bar bot">
        <span className="dot amber blinker-slow" />
        <span>UPLINK STABLE</span>
        <span className="sep">·</span>
        <span>15Y RECORD</span>
        <span className="sep">·</span>
        <span>PSM I · PSPO I · 6σ YB</span>

        <span className="grow" />

        <span style={{ color: battleMode ? 'var(--hud-crimson)' : 'var(--hud-violet)' }}>
          {battleMode ? '◉ BATTLE MODE · POWER LVL > 9000' : '◎ STANDARD READOUT MODE'}
        </span>
        <span className="sep">·</span>
        <span>{lang.toUpperCase()}</span>
        <span className="sep">·</span>
        <span>EOF</span>
      </div>
    </div>
  );
}

window.ScouterChrome = ScouterChrome;
