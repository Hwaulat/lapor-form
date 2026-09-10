interface Props {
  size?: number;
  variant?: "light" | "dark"; // light = white icon+text, dark = orange icon+text
  showText?: boolean;
}

export default function LaportLogo({ size = 32, variant = "dark", showText = true }: Props) {
  const iconColor  = variant === "light" ? "#ffffff" : "#F97316";
  const checkColor = variant === "light" ? "#F97316" : "#ffffff";
  const textColor  = variant === "light" ? "#ffffff" : "#0c0c0c";

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.3 }}>
      {/* Shield icon */}
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield body */}
        <path
          d="M16 2L4 7.2V14.4C4 20.8 9.3 26.5 16 28.4C22.7 26.5 28 20.8 28 14.4V7.2L16 2Z"
          fill={iconColor}
        />
        {/* Inner document lines — suggest a form/report */}
        <rect x="10" y="11" width="7" height="1.5" rx="0.75" fill={checkColor} opacity="0.85" />
        <rect x="10" y="14.5" width="10" height="1.5" rx="0.75" fill={checkColor} opacity="0.85" />
        <rect x="10" y="18" width="5" height="1.5" rx="0.75" fill={checkColor} opacity="0.85" />
        {/* Checkmark overlay */}
        <path
          d="M10.5 15.5L13.5 18.5L21.5 10"
          stroke={checkColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0"
        />
      </svg>

      {/* Wordmark */}
      {showText && (
        <span style={{
          fontSize: size * 0.625,
          fontWeight: 800,
          color: textColor,
          letterSpacing: "-0.02em",
          fontFamily: "'Inter', sans-serif",
          lineHeight: 1,
        }}>
          LAP<span style={{ color: iconColor, fontWeight: 800 }}>ORT</span>
        </span>
      )}
    </div>
  );
}
