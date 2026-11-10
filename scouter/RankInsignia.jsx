/* global React */
function RankInsignia({ cert, lang }) {
  return (
    <div className="rank" onMouseEnter={() => window.SCOUTER_SFX?.play('hover')}>
      <div className="badge"><span>{cert.abbreviation || cert[`name_${lang}`].split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()}</span></div>
      <div className="info">
        <div className="year">{cert.year}</div>
        <div className="name">{cert[`name_${lang}`]}</div>
        <div className="org">◆ {cert.organization}</div>
      </div>
    </div>
  );
}

function ContactBeacon({ contact, lang }) {
  const sfx = () => window.SCOUTER_SFX?.play('hover');
  return (
    <section className="beacon">
      <div className="beacon-id">
        <span className="dot crimson blinker" style={{ display: 'inline-block', marginRight: 8, verticalAlign: 'middle' }} />
        [ INCOMING TRANSMISSION REQUEST ]
      </div>
      <h2>{lang === 'fr' ? 'OUVRIR LE CANAL' : 'OPEN CHANNEL'}</h2>
      <p>{contact[`message_${lang}`]}</p>
      <div className="btn-row">
        <a className="btn primary" href={contact.linkedin_url} target="_blank" rel="noopener noreferrer" onMouseEnter={sfx}>UPLINK · LINKEDIN</a>
        <a className="btn" href={contact.malt_url} target="_blank" rel="noopener noreferrer" onMouseEnter={sfx}>UPLINK · MALT</a>
      </div>
    </section>
  );
}

window.RankInsignia = RankInsignia;
window.ContactBeacon = ContactBeacon;
