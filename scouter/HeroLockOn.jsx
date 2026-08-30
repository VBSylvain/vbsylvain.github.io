/* global React */
function HeroLockOn({ identity, heroStats, lang, battleMode, onToggleBattle, toPowerLevel }) {
  const isHot = (val) => /^[+\-−]?\d+/.test(val) && parseInt(val.replace(/\D/g, ''), 10) >= 40;
  const sfx = () => window.SCOUTER_SFX?.play('hover');

  return (
    <div className="hero-grid">
      <div className="hero-text">
        <div className="preamble">
          <span className="dot blinker" />
          <span>SCAN INITIATED · TARGET ACQUIRED</span>
          <span style={{ color: 'var(--fg-deemph)' }}>·</span>
          <span>{lang === 'fr' ? 'ANALYSE EN COURS' : 'ANALYZING'}</span>
        </div>

        <h1 className="name">
          {identity.first_name}<span className="sep"> · </span>{identity.last_name}
        </h1>

        <div className="role">{identity[`role_${lang}`]}</div>

        <p className="tagline">{identity[`tagline_${lang}`]}</p>

        <div className="btn-row">
          {/* 🛡️ Security: Added rel="noopener noreferrer" to prevent reverse tabnabbing */}
          <a className="btn primary" href="https://www.linkedin.com/in/vbsylvain" target="_blank" rel="noopener noreferrer" onMouseEnter={sfx}>
            UPLINK · LINKEDIN
          </a>
          <a className="btn" href="https://www.malt.fr/profile/sylvainvizzinibruyas" target="_blank" rel="noopener noreferrer" onMouseEnter={sfx}>
            UPLINK · MALT
          </a>
        </div>

        <button
          className={"battle-toggle " + (battleMode ? 'on' : '')}
          onClick={onToggleBattle}
          onMouseEnter={sfx}
          title={lang === 'fr' ? 'Easter egg : convertir en niveaux de puissance' : 'Easter egg: convert to power levels'}
        >
          {battleMode
            ? (lang === 'fr' ? '◉ MODE COMBAT ACTIVÉ — CLIQUEZ POUR REVENIR' : '◉ BATTLE MODE ACTIVE — CLICK TO REVERT')
            : (lang === 'fr' ? '◎ ENGAGER LE MODE COMBAT — LIRE LES NIVEAUX DE PUISSANCE' : '◎ ENGAGE BATTLE MODE — READ POWER LEVELS')}
        </button>
      </div>

      <div className="hero-stats-grid">
        {heroStats.map((s, i) => {
          const value = battleMode ? toPowerLevel(s.value) : s.value;
          const hot = battleMode || isHot(s.value);
          return (
            <div className="stat-cell" key={i} onMouseEnter={sfx}>
              <div className="stat-id">[ STAT.{String(i + 1).padStart(2, '0')} {battleMode ? '· POWER' : ''} ]</div>
              <div className={"stat-val " + (hot ? 'hot' : '')}>{value}</div>
              <div className="stat-lbl">{battleMode ? (lang === 'fr' ? 'NIVEAU DE PUISSANCE' : 'POWER LEVEL') : s[`label_${lang}`]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

window.HeroLockOn = HeroLockOn;
