/* global React, ReactDOM, ScouterChrome, HeroLockOn, PowerLevelCard, CombatStat, FieldReport, RankInsignia, ContactBeacon, LensOverlay */
const { useState: useS, useEffect: useE, useMemo: useM, useCallback: useCB, useRef: useR } = React;

const STR = {
  fr: {
    section_hero: '00 / CIBLE',
    section_results: '01 / PUISSANCE',
    section_skills: '02 / STATS DE COMBAT',
    section_timeline: '03 / RAPPORTS DE TERRAIN',
    section_certs: '04 / INSIGNES DE RANG',
    section_contact: '05 / CONTACT',
    title_results: 'PUISSANCE · IMPACT',
    title_skills: 'STATS DE COMBAT',
    title_timeline: 'RAPPORTS DE TERRAIN',
    title_certs: 'INSIGNES DE RANG',
    title_contact: 'BALISE DE CONTACT',
    boot: ['INITIALISATION SCOUTER MK-IV…', 'CALIBRAGE LENTILLE PHOSPHORE…', 'TRIANGULATION CIBLE…', 'CIBLE : SYLVAIN VIZZINI', 'NIVEAU DE PUISSANCE : > 9000', 'PRÊT.'],
    next: 'SUIVANT', prev: 'PRÉCÉDENT',
    detected: 'DÉTECTÉ',
    records: 'ENREGISTREMENTS'
  },
  en: {
    section_hero: '00 / TARGET',
    section_results: '01 / POWER',
    section_skills: '02 / COMBAT STATS',
    section_timeline: '03 / FIELD REPORTS',
    section_certs: '04 / RANK INSIGNIA',
    section_contact: '05 / CONTACT',
    title_results: 'POWER · IMPACT',
    title_skills: 'COMBAT STATS',
    title_timeline: 'FIELD REPORTS',
    title_certs: 'RANK INSIGNIA',
    title_contact: 'CONTACT BEACON',
    boot: ['BOOTING SCOUTER MK-IV…', 'CALIBRATING PHOSPHOR LENS…', 'TRIANGULATING TARGET…', 'TARGET: SYLVAIN VIZZINI', 'POWER LEVEL: > 9000', 'READY.'],
    next: 'NEXT', prev: 'PREV',
    detected: 'DETECTED',
    records: 'RECORDS'
  }
};

// Deterministic fake power-level for any input. Rounded to nearest 100.
function toPowerLevel(seed) {
  const s = String(seed);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h * 31) + s.charCodeAt(i)) | 0;
  const n = 4500 + (Math.abs(h) % 15500);
  return (Math.round(n / 100) * 100).toLocaleString();
}

function BootScreen({ lang, onDone }) {
  const [step, setStep] = useS(0);
  const [out, setOut] = useS(false);
  const lines = STR[lang].boot;
  useE(() => {
    window.SCOUTER_SFX?.play('boot');
    if (step < lines.length) {
      const t = setTimeout(() => { setStep(step + 1); window.SCOUTER_SFX?.play('beep'); }, 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setOut(true); window.SCOUTER_SFX?.play('chirp'); setTimeout(onDone, 400); }, 500);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, lines.length]);

  return (
    <div className={"bootscreen " + (out ? 'dismissed' : '')}>
      <div className="lines">
        <img className="crest" src="../assets/sv-saiyan-crest.svg" alt="" />
        {lines.slice(0, step).map((l, i) => (
          <div className="line" key={i}>
            <span className="ok">[ OK ]</span>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavArrow({ direction, label, sublabel, onDone }) {
  useE(() => {
    const t = setTimeout(onDone, 720);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className={"nav-arrow " + direction}>
      <div className="chevron" />
      <div className="lbl">
        <span className="small">{sublabel}</span>
        <span className="big">{label}</span>
      </div>
    </div>
  );
}

function App() {
  const [lang, setLang] = useS(() => localStorage.getItem('scouter-lang') || 'fr');
  const [data, setData] = useS(null);
  const [booted, setBooted] = useS(false);
  const [sectionIdx, setSectionIdx] = useS(0);
  const [arrow, setArrow] = useS(null);
  const [battleMode, setBattleMode] = useS(false);
  const [soundOn, setSoundOn] = useS(() => window.SCOUTER_SFX?.enabled() ?? true);
  const [themesOpen, setThemesOpen] = useS(false);
  const swipingRef = useR(false);

  useE(() => { fetch('../career.json').then(r => r.json()).then(setData); }, []);
  useE(() => { localStorage.setItem('scouter-lang', lang); }, [lang]);

  const sortedExp = useM(() => data ? [...data.experiences]
    .sort((a, b) => new Date(b.start_date || '1900') - new Date(a.start_date || '1900')) : [], [data]);
  const sortedSkills = useM(() => data ? [...data.skills].sort((a, b) => b.score - a.score) : [], [data]);

  const t = STR[lang];
  const sectionTitles = [t.section_hero, t.section_results, t.section_skills, t.section_timeline, t.section_certs, t.section_contact];
  const sectionCount = sectionTitles.length;

  const goTo = useCB((i, dir) => {
    if (i < 0 || i >= sectionCount) return;
    if (i === sectionIdx) return;
    const direction = dir || (i > sectionIdx ? 'right' : 'left');
    const labelTitle = [
      lang === 'fr' ? 'CIBLE' : 'TARGET',
      t.title_results, t.title_skills, t.title_timeline, t.title_certs, t.title_contact
    ][i];
    window.SCOUTER_SFX?.play(direction === 'right' ? 'next' : 'prev');
    setArrow({ direction, label: labelTitle, sublabel: `[ ${direction === 'right' ? t.next : t.prev} ] · ${t.detected}` });
    setSectionIdx(i);
  }, [sectionIdx, sectionCount, lang, t]);

  const next = useCB(() => goTo(sectionIdx + 1, 'right'), [sectionIdx, goTo]);
  const prev = useCB(() => goTo(sectionIdx - 1, 'left'), [sectionIdx, goTo]);

  useE(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'b' || e.key === 'B') toggleBattle();
      else if (e.key === 'l' || e.key === 'L') setLang(l => l === 'fr' ? 'en' : 'fr');
      else if (e.key === 't' || e.key === 'T') setThemesOpen(v => !v);
      else if (e.key === 'Escape') setThemesOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, prev]);

  const toggleBattle = useCB(() => {
    setBattleMode(b => {
      window.SCOUTER_SFX?.play(b ? 'powerdown' : 'powerup');
      return !b;
    });
  }, []);

  const toggleSound = useCB(() => {
    const newVal = !soundOn;
    window.SCOUTER_SFX?.set(newVal);
    setSoundOn(newVal);
    if (newVal) window.SCOUTER_SFX?.play('chirp');
  }, [soundOn]);

  if (!data) return null;

  return (
    <React.Fragment>
      {!booted && <BootScreen lang={lang} onDone={() => setBooted(true)} />}

      <LensOverlay />
      <div className="lens-aberration" />
      <div className="scanlines" />
      <div className="scan-beam" />

      <ScouterChrome
        lang={lang}
        sectionIdx={sectionIdx}
        sectionCount={sectionCount}
        sectionTitles={sectionTitles}
        onJump={(i) => goTo(i)}
        soundOn={soundOn}
        onSoundToggle={toggleSound}
        battleMode={battleMode}
        onToggleLang={() => { window.SCOUTER_SFX?.play('click'); setLang(l => l === 'fr' ? 'en' : 'fr'); }}
        onOpenThemes={() => { window.SCOUTER_SFX?.play('chirp'); setThemesOpen(true); }}
      />

      {themesOpen && (
        <ThemesOverlay
          lang={lang}
          onClose={() => { window.SCOUTER_SFX?.play('click'); setThemesOpen(false); }}
          onPick={(t) => {
            window.SCOUTER_SFX?.play('click');
            if (t.active) { setThemesOpen(false); return; }
            if (t.route) {
              localStorage.setItem('portfolio-theme', t.id);
              window.location.href = t.route;
              return;
            }
            setThemesOpen(false);
          }}
        />
      )}

      <button className="nav-btn prev" onClick={prev} disabled={sectionIdx === 0} aria-label="Previous">◀</button>
      <button className="nav-btn next" onClick={next} disabled={sectionIdx === sectionCount - 1} aria-label="Next">▶</button>

      <div className="deck" style={{ transform: `translateX(-${sectionIdx * 100}vw)` }}>

        {/* 00 — Hero */}
        <section className="panel">
          <HeroLockOn
            identity={data.identity}
            heroStats={data.hero_stats}
            lang={lang}
            battleMode={battleMode}
            toPowerLevel={toPowerLevel}
            onToggleBattle={toggleBattle}
          />
        </section>

        {/* 01 — Results */}
        <section className="panel">
          <header className="panel-head">
            <span className="idx">{t.section_results}</span>
            <h2 className="title">{t.title_results}</h2>
            <span className="meta">{data.metrics.length} {t.records}</span>
          </header>
          {battleMode && (
            <div className="alert-banner">
              <span className="dot crimson blinker" />
              <span className="msg">{lang === 'fr' ? 'NIVEAUX DE PUISSANCE DÉTECTÉS · > 9000' : 'POWER LEVELS DETECTED · > 9000'}</span>
              <span className="num">◉◉◉</span>
            </div>
          )}
          <div className="power-grid">
            {data.metrics.map((m, i) => (
              <PowerLevelCard key={i} metric={m} lang={lang} idx={i} battleMode={battleMode} toPowerLevel={toPowerLevel} />
            ))}
          </div>
        </section>

        {/* 02 — Skills */}
        <section className="panel">
          <header className="panel-head">
            <span className="idx">{t.section_skills}</span>
            <h2 className="title">{t.title_skills}</h2>
            <span className="meta">{sortedSkills.length} {t.records}</span>
          </header>
          <div>
            {sortedSkills.map((s, i) => (
              <CombatStat key={i} skill={s} lang={lang} idx={i} battleMode={battleMode} toPowerLevel={toPowerLevel} />
            ))}
          </div>
        </section>

        {/* 03 — Field Reports */}
        <section className="panel">
          <header className="panel-head">
            <span className="idx">{t.section_timeline}</span>
            <h2 className="title">{t.title_timeline}</h2>
            <span className="meta">{sortedExp.length} {t.records}</span>
          </header>
          <div>
            {sortedExp.map((e, i) => <FieldReport key={e.id} exp={e} lang={lang} idx={i} />)}
          </div>
        </section>

        {/* 04 — Certs */}
        <section className="panel">
          <header className="panel-head">
            <span className="idx">{t.section_certs}</span>
            <h2 className="title">{t.title_certs}</h2>
            <span className="meta">{data.certifications.length} {t.records}</span>
          </header>
          <div className="rank-grid">
            {data.certifications.map((c, i) => <RankInsignia key={i} cert={c} lang={lang} />)}
          </div>
        </section>

        {/* 05 — Contact */}
        <section className="panel">
          <header className="panel-head">
            <span className="idx">{t.section_contact}</span>
            <h2 className="title">{t.title_contact}</h2>
          </header>
          <ContactBeacon contact={data.contact} lang={lang} />
        </section>
      </div>

      {arrow && (
        <NavArrow
          direction={arrow.direction}
          label={arrow.label}
          sublabel={arrow.sublabel}
          onDone={() => setArrow(null)}
        />
      )}

      {/* keyboard hint, bottom-right */}
      <div style={{
        position: 'fixed', bottom: 16, right: 30, zIndex: 39,
        fontFamily: 'var(--font-readout)', fontSize: 10,
        letterSpacing: '0.22em', color: 'var(--fg-muted)',
        textTransform: 'uppercase', pointerEvents: 'none'
      }}>
        ◀ ▶ keys · B = battle · L = lang · T = themes
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
