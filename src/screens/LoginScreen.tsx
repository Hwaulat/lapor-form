import { useState } from "react";
import { Eye, EyeOff, IdCard, Lock, ChevronRight } from "lucide-react";
import LaportLogo from "../components/LaportLogo";

interface Props {
  onLogin: () => void;
}

function StatusBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 20px 8px", background: "#fff" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#0c0c0c" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#0c0c0c">
          <rect x="0" y="6" width="3" height="6" rx="1" opacity="0.3" />
          <rect x="4.5" y="4" width="3" height="8" rx="1" opacity="0.55" />
          <rect x="9" y="2" width="3" height="10" rx="1" opacity="0.8" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.75" y="0.75" width="22" height="11.5" rx="2.5" stroke="#0c0c0c" strokeWidth="1.3" opacity="0.8" />
          <rect x="2.25" y="2.25" width="15" height="8.5" rx="1.5" fill="#0c0c0c" />
          <path d="M23.75 4.75v3.5c1-.45 1.5-1.05 1.5-1.75s-.5-1.3-1.5-1.75z" fill="#0c0c0c" opacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

export default function LoginScreen({ onLogin }: Props) {
  const [nik,       setNik]        = useState("");
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [nikFocus,   setNikFocus]   = useState(false);
  const [passFocus,  setPassFocus]  = useState(false);

  const inputStyle = (focused: boolean): React.CSSProperties => ({
    width: "100%", height: 48, padding: "0 44px 0 44px",
    background: "#fff",
    border: `1.5px solid ${focused ? "#F97316" : "#e5e5e5"}`,
    borderRadius: 10,
    fontSize: 14, color: "#0c0c0c",
    outline: "none",
    boxShadow: focused ? "0 0 0 3px rgba(249,115,22,0.12)" : "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box" as const,
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <StatusBar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "0 28px 36px", overflowY: "auto" }} className="no-scrollbar">

        {/* Logo block */}
        <div style={{ textAlign: "center", paddingTop: 36, paddingBottom: 32 }}>
          {/* Icon */}
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: "#fff7ed", border: "1.5px solid #fed7aa",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            boxShadow: "0 4px 16px rgba(249,115,22,0.12)",
          }}>
            <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
              <path d="M16 2L4 7.2V14.4C4 20.8 9.3 26.5 16 28.4C22.7 26.5 28 20.8 28 14.4V7.2L16 2Z" fill="#F97316" />
              <rect x="10" y="11" width="7" height="1.5" rx="0.75" fill="white" opacity="0.85" />
              <rect x="10" y="14.5" width="10" height="1.5" rx="0.75" fill="white" opacity="0.85" />
              <rect x="10" y="18" width="5" height="1.5" rx="0.75" fill="white" opacity="0.85" />
            </svg>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0c0c0c", margin: "0 0 4px", letterSpacing: "-0.02em" }}>
            LAP<span style={{ color: "#F97316" }}>ORT</span>
          </h1>
          <p style={{ fontSize: 13, color: "#737373", margin: 0 }}>EHS Safety Reporting</p>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0c0c0c", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            Selamat Datang
          </h2>
          <p style={{ fontSize: 14, color: "#737373", margin: 0, lineHeight: 1.5 }}>
            Masuk ke akun Anda untuk melaporkan observasi EHS
          </p>
        </div>

        {/* NIK field */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0c0c0c", display: "block", marginBottom: 6 }}>
            NIK Karyawan
          </label>
          <div style={{ position: "relative" }}>
            <IdCard size={16} color="#737373" strokeWidth={1.75}
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
            <input
              type="text" value={nik}
              onChange={e => setNik(e.target.value)}
              placeholder="MDZ-2024-XXXX"
              style={inputStyle(nikFocus)}
              onFocus={() => setNikFocus(true)}
              onBlur={() => setNikFocus(false)}
            />
          </div>
        </div>

        {/* Password field */}
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#0c0c0c", display: "block", marginBottom: 6 }}>
            Password
          </label>
          <div style={{ position: "relative" }}>
            <Lock size={16} color="#737373" strokeWidth={1.75}
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            />
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle(passFocus)}
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
            />
            <button
              type="button"
              onClick={() => setShowPass(v => !v)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: 4,
              }}
            >
              {showPass
                ? <EyeOff size={16} color="#737373" strokeWidth={1.75} />
                : <Eye     size={16} color="#737373" strokeWidth={1.75} />
              }
            </button>
          </div>
        </div>

        {/* Forgot */}
        <div style={{ textAlign: "right", marginBottom: 28 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#F97316", fontWeight: 600, fontFamily: "'Inter', sans-serif" }}>
            Lupa Password?
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={onLogin}
          style={{
            width: "100%", height: 52,
            background: "#F97316", border: "none",
            borderRadius: 12,
            fontSize: 15, fontWeight: 700, color: "#fff",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 4px 16px rgba(249,115,22,0.35)",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.01em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.92")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Masuk
          <ChevronRight size={18} strokeWidth={2.5} />
        </button>

        {/* Guest hint */}
        <div style={{
          marginTop: 16,
          padding: "10px 14px",
          background: "#fff7ed",
          border: "1px solid #fed7aa",
          borderRadius: 10,
          display: "flex", alignItems: "flex-start", gap: 8,
        }}>
          <span style={{ fontSize: 13 }}>💡</span>
          <p style={{ fontSize: 12, color: "#92400e", margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
            Untuk demo: klik <strong>Masuk</strong> langsung tanpa mengisi NIK/password.
          </p>
        </div>

        {/* Register link */}
        <p style={{ textAlign: "center", fontSize: 13, color: "#737373", marginTop: 24, marginBottom: 0 }}>
          Belum punya akun?{" "}
          <button style={{ background: "none", border: "none", color: "#F97316", fontWeight: 600, cursor: "pointer", fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
            Daftar Sekarang
          </button>
        </p>
      </div>
    </div>
  );
}
