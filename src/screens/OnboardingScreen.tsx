import { Shield, ClipboardList, TriangleAlert, ChevronRight } from "lucide-react";
import LaportLogo from "../components/LaportLogo";

interface Props {
  onStart: () => void;
}

function StatusBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 20px 8px" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
          <rect x="0" y="6" width="3" height="6" rx="1" opacity="0.5" />
          <rect x="4.5" y="4" width="3" height="8" rx="1" opacity="0.7" />
          <rect x="9" y="2" width="3" height="10" rx="1" opacity="0.85" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.75" y="0.75" width="22" height="11.5" rx="2.5" stroke="white" strokeWidth="1.3" opacity="0.7" />
          <rect x="2.25" y="2.25" width="15" height="8.5" rx="1.5" fill="white" />
          <path d="M23.75 4.75v3.5c1-.45 1.5-1.05 1.5-1.75s-.5-1.3-1.5-1.75z" fill="white" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

/* Floating icon bubble */
function Bubble({
  top, left, right, icon, bgOpacity = 0.18, iconSize = 30,
}: {
  top?: number; left?: number; right?: number;
  icon: React.ReactNode; bgOpacity?: number; iconSize?: number;
}) {
  const sz = iconSize + 44;
  return (
    <div style={{
      position: "absolute", top, left, right,
      width: sz, height: sz, borderRadius: "50%",
      background: `rgba(255,255,255,${bgOpacity})`,
      border: "1.5px solid rgba(255,255,255,0.3)",
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
      backdropFilter: "blur(4px)",
    }}>
      {icon}
    </div>
  );
}

export default function OnboardingScreen({ onStart }: Props) {
  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      background: "#F97316", fontFamily: "'Inter', sans-serif",
      overflow: "hidden",
    }}>
      <StatusBar />

      {/* ── Decorative visual area ── */}
      <div style={{ position: "relative", height: 310, flexShrink: 0 }}>
        {/* Large ambient blobs */}
        <div style={{
          position: "absolute", width: 300, height: 300, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)", top: -100, left: -80,
        }} />
        <div style={{
          position: "absolute", width: 220, height: 220, borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", top: 60, right: -90,
        }} />
        <div style={{
          position: "absolute", width: 140, height: 140, borderRadius: "50%",
          background: "rgba(255,255,255,0.07)", bottom: -20, left: 80,
        }} />

        {/* SVG connector lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 390 310">
          {/* top-center to bottom-left */}
          <line x1="195" y1="80" x2="95" y2="215" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 4" />
          {/* top-center to bottom-right */}
          <line x1="195" y1="80" x2="295" y2="215" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 4" />
          {/* bottom-left to bottom-right */}
          <line x1="95" y1="215" x2="295" y2="215" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" strokeDasharray="4 4" />
        </svg>

        {/* Top center — Shield */}
        <Bubble
          top={30} left={195 - 37}
          icon={<Shield size={30} color="#F97316" strokeWidth={1.75} />}
        />

        {/* Bottom left — Clipboard */}
        <Bubble
          top={175} left={55}
          icon={<ClipboardList size={30} color="#F97316" strokeWidth={1.75} />}
        />

        {/* Bottom right — Warning */}
        <Bubble
          top={175} right={55}
          icon={<TriangleAlert size={30} color="#F97316" strokeWidth={1.75} />}
        />

        {/* Small accent dots */}
        <div style={{ position: "absolute", width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.25)", top: 55, right: 60 }} />
        <div style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.2)", top: 150, left: 40 }} />
        <div style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: "rgba(255,255,255,0.2)", bottom: 30, right: 110 }} />
      </div>

      {/* ── Content area ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px 28px 36px" }}>
        {/* Logo */}
        <div style={{ marginBottom: 20 }}>
          <LaportLogo size={28} variant="light" showText={true} />
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 30, fontWeight: 800, color: "#ffffff",
          lineHeight: 1.2, letterSpacing: "-0.02em",
          margin: "0 0 12px",
        }}>
          Laporan HSE<br />Lebih Mudah &<br />Terorganisir
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 14, color: "rgba(255,255,255,0.78)",
          lineHeight: 1.65, margin: "0 0 auto",
          fontWeight: 400,
        }}>
          Pantau keselamatan kerja harian Anda secara real-time dari genggaman tangan.
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          style={{
            marginTop: 32,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            background: "#ffffff",
            color: "#F97316",
            border: "none",
            borderRadius: 14,
            height: 56, width: "100%",
            fontSize: 15, fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,0,0,0.14)",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.01em",
            transition: "transform 0.12s, box-shadow 0.12s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.02)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
        >
          Mulai Sekarang
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "#F97316",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ChevronRight size={16} color="white" strokeWidth={2.5} />
          </div>
        </button>
      </div>
    </div>
  );
}
