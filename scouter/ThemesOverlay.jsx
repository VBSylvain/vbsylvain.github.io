/* global React */
const THEMES = [
  { id: 'standard', name: 'STANDARD', sub: 'Glass / Mesh', badge: 'BASE', disabled: false, route: '../index.html' },
  { id: 'scouter', name: 'SCOUTER', sub: 'DBZ / Battle HUD', badge: 'ACTIVE', disabled: false, active: true },
  { id: 'pizzeria', name: 'PIZZERIA', sub: 'Folded menu dossier', badge: 'NEW', disabled: false, route: '../index.html' },
  { id: '90s', name: "90's WEB", sub: 'Geocities revival', badge: 'NEW', disabled: false, route: '../index.html' },
  { id: 'naruto', name: 'NARUTO', sub: 'Coming Soon', badge: 'SOON', disabled: true },
  { id: 'wwe', name: 'WWE', sub: 'Coming Soon', badge: 'SOON', disabled: true }
];

function ThemesOverlay({ lang, onClose, onPick }) {
  return (
    <div className="themes-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="themes-panel">
        <button className="themes-close" onClick={onClose} aria-label="Close">x</button>
        <h3>{lang === 'fr' ? 'Choisir un theme' : 'Choose a theme'}</h3>
        <div className="sub">[ 6 PROFILES DETECTED / 4 ACTIVE / 2 INCOMING ]</div>
        <div className="themes-grid">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={'theme-card ' + (t.active ? 'active ' : '') + (t.disabled ? 'disabled' : '')}
              disabled={t.disabled}
              onClick={() => onPick(t)}
              onMouseEnter={() => window.SCOUTER_SFX?.play('hover')}
            >
              <span>{t.name}</span>
              <span style={{ fontSize: 9, opacity: 0.7, letterSpacing: '0.18em' }}>{t.sub}</span>
              <span className="badge">{t.badge}</span>
            </button>
          ))}
        </div>
        <div style={{ marginTop: 'var(--sp-5)', fontFamily: 'var(--font-readout)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--fg-muted)', textTransform: 'uppercase' }}>
          {lang === 'fr'
            ? 'Les profils actifs ouvrent leur experience correspondante. SCOUTER est le theme actif ici.'
            : 'Active profiles open their matching experience. SCOUTER is the active theme here.'}
        </div>
      </div>
    </div>
  );
}

window.ThemesOverlay = ThemesOverlay;
