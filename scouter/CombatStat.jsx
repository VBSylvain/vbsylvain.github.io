/* global React */
const { useEffect: useEffectCS, useRef: useRefCS } = React;

function CombatStat({ skill, lang, idx, battleMode, toPowerLevel }) {
  const fillRef = useRefCS(null);
  useEffectCS(() => {
    const t = setTimeout(() => {
      if (fillRef.current) fillRef.current.style.width = `${skill.score}%`;
    }, 200 + idx * 60);
    return () => clearTimeout(t);
  }, [skill.score, idx]);

  const isHot = skill.score >= 85;
  const display = battleMode ? toPowerLevel(skill[`skill_${lang}`] + skill.score) : skill.score * 100;
  return (
    <div className="combat-stat" onMouseEnter={() => window.SCOUTER_SFX?.play('hover')}>
      <div className="name">[ {String(idx + 1).padStart(2, '0')} ] {skill[`skill_${lang}`]}</div>
      <div className="bar">
        <div ref={fillRef} className={"fill " + (isHot ? 'hot' : '')} style={{ width: '0%' }} />
      </div>
      <div className={"pct " + (isHot ? 'hot' : '')}>{display}</div>
    </div>
  );
}

window.CombatStat = CombatStat;
