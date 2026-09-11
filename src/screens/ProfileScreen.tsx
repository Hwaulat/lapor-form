import { useState } from "react";
import {
  User, Bell, Globe, Info, LogOut, ChevronRight,
  ClipboardList, TrendingUp, CalendarCheck, Shield,
  Lock, Star, ChevronLeft
} from "lucide-react";
import { Submission } from "../App";
import LaportLogo from "../components/LaportLogo";

interface Props {
  submissions: Submission[];
  today: string;
  onLogout: () => void;
}

const MENU: {
  section: string;
  items: { id?: string; icon: React.ElementType; label: string; sublabel?: string; danger?: boolean; action?: string }[];
}[] = [
  {
    section: "Akun",
    items: [
      { id: "personal_info", icon: User,          label: "Informasi Pribadi",   sublabel: "Nama, NIK, Jabatan" },
      { id: "security",      icon: Lock,          label: "Keamanan",             sublabel: "Password & PIN" },
    ],
  },
  {
    section: "Preferensi",
    items: [
      { id: "notifications", icon: Bell,          label: "Notifikasi",           sublabel: "Pengingat laporan harian" },
    ],
  },
  {
    section: "Lainnya",
    items: [
      { id: "about",         icon: Info,          label: "Tentang LAPORT",       sublabel: "Versi 1.0.0" },
      { id: "review",        icon: Star,          label: "Beri Ulasan",          sublabel: "Di Play Store / App Store" },
    ],
  },
];

/* ── Sub Views ────────────────────────────────────── */

function SubViewHeader({ title, onBack }: { title: string, onBack: () => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px 14px", borderBottom: "1px solid #e5e5e5", background: "#fff" }}>
      <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 10, background: "#f5f5f5", border: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.15s" }}>
        <ChevronLeft size={18} color="#737373" strokeWidth={2} />
      </button>
      <h1 style={{ fontSize: 16, fontWeight: 700, color: "#0c0c0c", margin: 0 }}>{title}</h1>
    </div>
  );
}

function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button onClick={() => setOn(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? "#10B981" : "#e5e5e5", position: "relative", border: "none", cursor: "pointer", transition: "background 0.2s" }}>
      <div style={{ width: 20, height: 20, borderRadius: 10, background: "#fff", position: "absolute", top: 2, left: on ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

function PersonalInfoView({ onBack }: { onBack: () => void }) {
  const Input = ({ label, value, readOnly = false }: any) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#737373", marginBottom: 6 }}>{label}</label>
      <input type="text" defaultValue={value} readOnly={readOnly} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #e5e5e5", background: readOnly ? "#f9f9f9" : "#fff", color: readOnly ? "#737373" : "#0c0c0c", fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", transition: "border-color 0.15s" }} onFocus={(e) => { if (!readOnly) e.target.style.borderColor = "#F97316"; }} onBlur={(e) => { e.target.style.borderColor = "#e5e5e5"; }} />
    </div>
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#f9f9f9", fontFamily: "'Inter', sans-serif" }}>
      <SubViewHeader title="Informasi Pribadi" onBack={onBack} />
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#F97316", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(249,115,22,0.3)", position: "relative" }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>AS</span>
            <div style={{ position: "absolute", bottom: -2, right: -2, width: 28, height: 28, borderRadius: "50%", background: "#fff", border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <User size={14} color="#F97316" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        <Input label="Nama Lengkap" value="Ahmad Suryadi" />
        <Input label="NIK" value="MDZ-2024-1087" readOnly />
        <Input label="Jabatan" value="Operator Produksi" readOnly />
        <Input label="Email" value="ahmad.suryadi@example.com" />
        <Input label="No. Telepon" value="+62 812-3456-7890" />
      </div>
      <div style={{ padding: "16px 20px 24px", background: "#fff", borderTop: "1px solid #e5e5e5" }}>
        <button style={{ width: "100%", padding: "14px 0", borderRadius: 12, background: "#F97316", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 4px rgba(249,115,22,0.3)" }}>Simpan Perubahan</button>
      </div>
    </div>
  );
}

function SecurityView({ onBack }: { onBack: () => void }) {
  const Input = ({ label, type = "password" }: any) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#737373", marginBottom: 6 }}>{label}</label>
      <input type={type} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #e5e5e5", background: "#fff", color: "#0c0c0c", fontSize: 14, fontFamily: "'Inter', sans-serif", outline: "none", transition: "border-color 0.15s" }} onFocus={(e) => e.target.style.borderColor = "#F97316"} onBlur={(e) => e.target.style.borderColor = "#e5e5e5"} />
    </div>
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#f9f9f9", fontFamily: "'Inter', sans-serif" }}>
      <SubViewHeader title="Keamanan" onBack={onBack} />
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: 20 }}>
        <h2 style={{ fontSize: 14, fontWeight: 700, color: "#0c0c0c", marginBottom: 16 }}>Ubah Password</h2>
        <Input label="Password Saat Ini" />
        <Input label="Password Baru" />
        <Input label="Konfirmasi Password Baru" />
        <button style={{ width: "100%", padding: "12px 0", borderRadius: 10, background: "#F97316", border: "none", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 32 }}>Perbarui Password</button>


      </div>
    </div>
  );
}

function NotificationsView({ onBack }: { onBack: () => void }) {
  const SettingItem = ({ title, desc, initial }: any) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", borderBottom: "1px solid #e5e5e5" }}>
      <div style={{ paddingRight: 16 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "#0c0c0c", margin: 0 }}>{title}</p>
        <p style={{ fontSize: 12, color: "#737373", margin: "4px 0 0", lineHeight: 1.4 }}>{desc}</p>
      </div>
      <Toggle initial={initial} />
    </div>
  );

  return (
    <div className="flex flex-col h-full" style={{ background: "#f9f9f9", fontFamily: "'Inter', sans-serif" }}>
      <SubViewHeader title="Notifikasi" onBack={onBack} />
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "0 20px" }}>
        <SettingItem title="Notifikasi Push" desc="Terima notifikasi di layar kunci dan banner saat aplikasi ditutup." initial={true} />
        <SettingItem title="Pengingat Laporan Harian" desc="Notifikasi setiap pukul 16:00 jika Anda belum mengirim laporan BOS." initial={true} />
        <SettingItem title="Pengingat Laporan Mingguan" desc="Rangkuman aktivitas pelaporan Anda pada akhir pekan." initial={false} />
        <SettingItem title="Pembaruan Aplikasi" desc="Pemberitahuan tentang fitur baru dan jadwal pemeliharaan sistem." initial={true} />
      </div>
    </div>
  );
}


/* ── Main Component ───────────────────────────────── */

export default function ProfileScreen({ submissions, today, onLogout }: Props) {
  const [activeView, setActiveView] = useState<string | null>(null);

  if (activeView === "personal_info") return <PersonalInfoView onBack={() => setActiveView(null)} />;
  if (activeView === "security") return <SecurityView onBack={() => setActiveView(null)} />;
  if (activeView === "notifications") return <NotificationsView onBack={() => setActiveView(null)} />;

  /* Stats */
  const totalAll = submissions.length;

  const t = new Date(today);
  const totalMonth = submissions.filter(s => {
    const d = new Date(s.date);
    return d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  }).length;

  const uniqueDates = new Set(submissions.map(s => s.date)).size;

  const stats = [
    { label: "Total\nLaporan",    value: totalAll,   icon: ClipboardList,  color: "#F97316" },
    { label: "Bulan\nIni",        value: totalMonth, icon: TrendingUp,     color: "#8B5CF6" },
    { label: "Hari\nAktif",       value: uniqueDates,icon: CalendarCheck,  color: "#10B981" },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: "#f9f9f9", fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "14px 20px 20px" }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0c0c0c", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
          Profil
        </h1>

        {/* User card */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          background: "#fff7ed", border: "1px solid #fed7aa",
          borderRadius: 14, padding: "14px 16px", cursor: "pointer"
        }} onClick={() => setActiveView("personal_info")}>
          {/* Avatar */}
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "#F97316",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(249,115,22,0.3)",
          }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>AS</span>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#0c0c0c", margin: "0 0 2px" }}>Ahmad Suryadi</p>
            <p style={{ fontSize: 12, color: "#737373", margin: "0 0 4px" }}>NIK: MDZ-2024-1087</p>
            <span style={{
              fontSize: 11, fontWeight: 500, color: "#92400e",
              background: "#fff", border: "1px solid #fed7aa",
              borderRadius: 6, padding: "2px 8px",
            }}>
              Operator Produksi
            </span>
          </div>

          {/* Edit */}
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "rgba(249,115,22,0.12)", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <User size={16} color="#F97316" strokeWidth={1.75} />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "16px 16px 16px" }}>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                flex: 1, background: "#fff", border: "1px solid #e5e5e5",
                borderRadius: 12, padding: "12px 10px", textAlign: "center",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${s.color}12`, margin: "0 auto 8px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <s.icon size={16} color={s.color} strokeWidth={1.75} />
              </div>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#0c0c0c", margin: "0 0 2px", lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontSize: 10, color: "#737373", margin: 0, whiteSpace: "pre-line", lineHeight: 1.4 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Department badge */}
        <div style={{
          background: "#fff", border: "1px solid #e5e5e5",
          borderRadius: 12, padding: "12px 14px", marginBottom: 20,
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: "#fff7ed", border: "1px solid #fed7aa",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Shield size={18} color="#F97316" strokeWidth={1.75} />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#0c0c0c", margin: 0 }}>Divisi Manufacturing</p>
            <p style={{ fontSize: 11, color: "#737373", margin: "2px 0 0" }}>PT Mondelez Indonesia · Bergabung Jan 2024</p>
          </div>
        </div>

        {/* Menu sections */}
        {MENU.map(section => (
          <div key={section.section} style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#737373", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px 4px" }}>
              {section.section}
            </p>
            <div style={{
              background: "#fff", border: "1px solid #e5e5e5",
              borderRadius: 12, overflow: "hidden",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}>
              {section.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => item.id && setActiveView(item.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    width: "100%", padding: "13px 14px",
                    background: "transparent", border: "none",
                    borderBottom: idx < section.items.length - 1 ? "1px solid #f5f5f5" : "none",
                    cursor: item.id ? "pointer" : "default", textAlign: "left",
                    fontFamily: "'Inter', sans-serif",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={e => { if(item.id) e.currentTarget.style.background = "#f9f9f9"; }}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                    background: "#f5f5f5",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <item.icon size={16} color="#737373" strokeWidth={1.75} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#0c0c0c", margin: 0 }}>{item.label}</p>
                    {item.sublabel && (
                      <p style={{ fontSize: 11, color: "#737373", margin: "1px 0 0" }}>{item.sublabel}</p>
                    )}
                  </div>
                  <ChevronRight size={15} color="#a3a3a3" strokeWidth={2} />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={onLogout}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            width: "100%", padding: "13px 0",
            background: "#fff", border: "1px solid #fecaca",
            borderRadius: 12, cursor: "pointer",
            fontSize: 14, fontWeight: 600, color: "#ef4444",
            fontFamily: "'Inter', sans-serif",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            transition: "background 0.12s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
          onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
        >
          <LogOut size={16} strokeWidth={2} />
          Keluar dari Akun
        </button>

        {/* App brand footer */}
        <div style={{ textAlign: "center", marginTop: 24, paddingBottom: 8 }}>
          <LaportLogo size={18} variant="dark" showText={true} />
          <p style={{ fontSize: 11, color: "#a3a3a3", marginTop: 4 }}>Versi 1.0.0 · © 2026 LAPORT</p>
        </div>
      </div>
    </div>
  );
}
