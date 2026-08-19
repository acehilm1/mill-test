type SVGProps = { className?: string };

/**
 * Inline SVG of the headset. Generated art avoids any external image dependency
 * so SSR and first paint never wait on network or asset generation.
 */
export function VRHeadsetSVG({ className }: SVGProps) {
  return (
    <svg
      role="img"
      aria-label="Millwright Vision Pro headset"
      viewBox="0 0 600 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="chassis" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3d" />
          <stop offset="50%" stopColor="#1c1c1e" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </linearGradient>
        <linearGradient id="lens" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#0a0a0c" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#000" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0a84ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0a84ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow */}
      <ellipse cx="300" cy="200" rx="260" ry="60" fill="url(#glow)" />

      {/* main chassis */}
      <rect x="80" y="80" width="440" height="180" rx="56" fill="url(#chassis)" />
      <rect
        x="80"
        y="80"
        width="440"
        height="180"
        rx="56"
        fill="none"
        stroke="#4a4a4d"
        strokeWidth="1.5"
      />

      {/* visor (glass) */}
      <rect x="120" y="110" width="360" height="120" rx="40" fill="url(#lens)" />
      <rect
        x="120"
        y="110"
        width="360"
        height="120"
        rx="40"
        fill="none"
        stroke="#1f1f22"
        strokeWidth="1"
      />

      {/* highlight reflection */}
      <path
        d="M 140 130 Q 200 110 320 120"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* left lens detail */}
      <circle cx="220" cy="170" r="34" fill="#000" opacity="0.85" />
      <circle cx="220" cy="170" r="34" fill="url(#lens)" opacity="0.7" />
      <circle cx="208" cy="158" r="6" fill="#fff" opacity="0.45" />

      {/* right lens detail */}
      <circle cx="380" cy="170" r="34" fill="#000" opacity="0.85" />
      <circle cx="380" cy="170" r="34" fill="url(#lens)" opacity="0.7" />
      <circle cx="368" cy="158" r="6" fill="#fff" opacity="0.45" />

      {/* bridge sensors */}
      <rect x="290" y="160" width="20" height="14" rx="3" fill="#1f1f22" />
      <circle cx="300" cy="167" r="2.5" fill="#0a84ff" />

      {/* strap hints */}
      <path
        d="M 80 170 Q 40 170 40 200"
        stroke="#1c1c1e"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 520 170 Q 560 170 560 200"
        stroke="#1c1c1e"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}