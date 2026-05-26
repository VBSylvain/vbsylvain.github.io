/* global React */
function FieldReport({ exp, lang, idx }) {
  const start = exp.start_date ? new Date(exp.start_date) : null;
  const end = exp.current ? null : (exp.end_date ? new Date(exp.end_date) : null);
  const fmt = (d) => d ? d.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'short', year: 'numeric' }).toUpperCase() : '—';
  const present = lang === 'fr' ? 'PRÉSENT' : 'PRESENT';

  return (
    <article className={"report " + (exp.current ? 'current' : '')} onMouseEnter={() => window.SCOUTER_SFX?.play('hover')}>
      <div className="head">
        <div>
          <div className="id">
            [ FIELD REPORT · {String(idx + 1).padStart(3, '0')} ·{' '}
            {exp.current ? <span className="blinker">ACTIVE</span> : 'ARCHIVED'} ]
          </div>
          <h3 className="role">{exp[`role_${lang}`]}</h3>
          <div className="company">{exp.company || '— PERSONAL OPS —'}</div>
          <div className="meta">
            {fmt(start)} — {exp.current ? present : fmt(end)}
            {' · '}
            {exp[`location_${lang}`]}
          </div>
        </div>
        <img className="reticle" src="../assets/reticle.svg" alt="" />
      </div>
      <p className="desc">{exp[`description_${lang}`]}</p>
      <div className="tags">
        {exp.tags.slice(0, 8).map((t) => <span className="tag" key={t}>#{t}</span>)}
      </div>
    </article>
  );
}

window.FieldReport = FieldReport;
