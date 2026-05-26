/* global React */
function PowerLevelCard({ metric, lang, idx, battleMode, toPowerLevel }) {
  const value = battleMode ? toPowerLevel(metric.value) : metric.value;
  const numeric = parseInt(metric.value.replace(/[^\d]/g, ''), 10) || 0;
  const isHot = metric.is_overflow || numeric >= 40;
  const cls = battleMode ? 'battle' : (isHot ? 'hot' : '');
  return (
    <article className="power-card" onMouseEnter={() => window.SCOUTER_SFX?.play('hover')}>
      <div className="pc-head">
        <div className="pc-id">[ POWER · {String(idx + 1).padStart(3, '0')} ]</div>
        <img className="reticle" src="../assets/reticle.svg" alt="" />
      </div>
      <div className={"pc-val " + cls}>{value}</div>
      <div className="pc-lbl">{battleMode ? (lang === 'fr' ? 'NIVEAU DE PUISSANCE DÉTECTÉ' : 'POWER LEVEL DETECTED') : metric[`label_${lang}`]}</div>
      <p className="pc-desc">{metric[`description_${lang}`]}</p>
      <div className="pc-src">{metric[`source_${lang}`]}</div>
    </article>
  );
}

window.PowerLevelCard = PowerLevelCard;
