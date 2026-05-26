/* global React */
function LensOverlay() {
  return (
    <div className="lens">
      <svg viewBox="0 0 1920 1080" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id="lens-tint-grad" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#5cd6ff" stopOpacity="0" />
            <stop offset="55%" stopColor="#5cd6ff" stopOpacity="0.04" />
            <stop offset="90%" stopColor="#020410" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
          </radialGradient>
          <linearGradient id="rim-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#9fdbff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#5cd6ff" stopOpacity="1" />
            <stop offset="100%" stopColor="#1f8ed0" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* the tinted "glass" — full viewport */}
        <rect x="0" y="0" width="1920" height="1080" fill="url(#lens-tint-grad)" />

        {/* the curved lens rim — a fat asymmetric oval inset by ~30px,
            this is the *inside* edge of the scouter lens */}
        <path
          d="M 30 90
             Q 960 0 1890 90
             L 1890 990
             Q 960 1080 30 990
             Z"
          fill="none" stroke="url(#rim-grad)" strokeWidth="3"
          style={{ filter: 'drop-shadow(0 0 10px rgba(76, 211, 255, 0.6))' }}
        />

        {/* outer hairline */}
        <path
          d="M 18 70
             Q 960 -16 1902 70
             L 1902 1010
             Q 960 1096 18 1010
             Z"
          fill="none" stroke="#4cd3ff" strokeWidth="1" opacity="0.4"
        />

        {/* lens reflection — diagonal sheen */}
        <path
          d="M 100 120 L 540 60 L 720 90 L 280 150 Z"
          fill="#9fdbff" opacity="0.06"
        />

        {/* small registration marks along the rim */}
        {[200, 480, 760, 1160, 1440, 1720].map((x) => (
          <g key={x}>
            <line x1={x} y1="40" x2={x} y2="56" stroke="#5cd6ff" strokeWidth="1" opacity="0.6" />
            <line x1={x} y1="1024" x2={x} y2="1040" stroke="#5cd6ff" strokeWidth="1" opacity="0.6" />
          </g>
        ))}
      </svg>
    </div>
  );
}

window.LensOverlay = LensOverlay;
