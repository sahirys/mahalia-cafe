// Ilustración del vaso para llevar. Reemplaza a la foto hasta tener fotos reales.
export default function CupIllustration({ sleeve, fill, foam }) {
  const labelColor = sleeve === "#A9C9E8" ? "#011C40" : "#FFFFFF";
  return (
    <svg viewBox="0 0 120 130" aria-hidden="true">
      <ellipse cx="60" cy="122" rx="34" ry="5" fill="#011C40" opacity=".12" />
      <path d="M26 30 L36 118 Q37 121 40 121 L80 121 Q83 121 84 118 L94 30 Z" fill="#FFFFFF" stroke="#3E2723" strokeWidth="2" />
      <ellipse cx="60" cy="31" rx="31" ry="6" fill={fill} />
      {foam && <ellipse cx="60" cy="31" rx="30" ry="5" fill={foam} />}
      <path d="M31 62 L89 62 L85 96 L35 96 Z" fill={sleeve} />
      <text x="60" y="84" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="700" fontSize="14" fill={labelColor}>
        M·IA
      </text>
      <rect x="20" y="20" width="80" height="11" rx="5" fill="#3E2723" />
      <rect x="40" y="14" width="40" height="8" rx="4" fill="#3E2723" />
    </svg>
  );
}
