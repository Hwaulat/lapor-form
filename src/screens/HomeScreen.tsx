import {
  Bell,
  ChevronRight,
  Shield,
  Eye,
  ClipboardEdit,
  TriangleAlert,
  Search,
  ShieldAlert,
  ClipboardList,
} from "lucide-react";
import { FormType, FORMS_CONFIG } from "../data/forms";
import { Submission } from "../App";

interface Props {
  submissions: Submission[];
  today: string;
  onOpenForm: (ft: FormType, date: string) => void;
  onNotifications: () => void;
}

const MONTH_LONG = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const DAY_LONG   = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

const FORM_ICONS: Record<FormType, React.ElementType> = {
  bos_v2:             Eye,
  bos_v3:             ClipboardEdit,
  nearmiss:           TriangleAlert,
  qrp:                Search,
  kondisi_tidak_aman: ShieldAlert,
};

const FORM_DESC: Record<FormType, string> = {
  bos_v2:             "Observasi perilaku keselamatan versi 2",
  bos_v3:             "Observasi perilaku keselamatan versi 3",
  nearmiss:           "Pelaporan kejadian hampir celaka",
  qrp:                "Respon cepat temuan lapangan",
  kondisi_tidak_aman: "Pelaporan kondisi lingkungan tidak aman",
};

function StatusBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "44px 20px 6px", background: "var(--background)" }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", letterSpacing: "0.01em" }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="#0c0c0c">
          <rect x="0"   y="6" width="3" height="6"  rx="1" opacity="0.3"/>
          <rect x="4.5" y="4" width="3" height="8"  rx="1" opacity="0.55"/>
          <rect x="9"   y="2" width="3" height="10" rx="1" opacity="0.8"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1"/>
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.75" y="0.75" width="22" height="11.5" rx="2.5" stroke="#0c0c0c" strokeWidth="1.3" opacity="0.8"/>
          <rect x="2.25" y="2.25" width="15" height="8.5" rx="1.5" fill="#0c0c0c"/>
          <path d="M23.75 4.75v3.5c1-.45 1.5-1.05 1.5-1.75s-.5-1.3-1.5-1.75z" fill="#0c0c0c" opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

export default function HomeScreen({ submissions, today, onOpenForm, onNotifications }: Props) {
  const d         = new Date(today);
  const dateLabel = `${DAY_LONG[d.getDay()]}, ${d.getDate()} ${MONTH_LONG[d.getMonth()]} ${d.getFullYear()}`;

  const todayCount = submissions.filter(s => s.date === today).length;

  return (
    <div className="flex flex-col h-full" style={{ background: "#f9f9f9", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: "var(--background)" }}>
        <StatusBar />

        {/* Header */}
        <div style={{ padding: "4px 20px 16px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "var(--radius)",
                background: "var(--orange-50)", border: "1px solid var(--orange-200)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Shield size={20} color="var(--orange)" strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--foreground)", lineHeight: 1.2 }}>
                  Ahmad Suryadi
                </p>
                <p style={{ fontSize: 12, color: "var(--muted-foreground)", marginTop: 1 }}>
                  {dateLabel}
                </p>
              </div>
            </div>

            <button
              onClick={onNotifications}
              style={{
                position: "relative", width: 38, height: 38, borderRadius: "var(--radius)",
                background: "var(--secondary)", border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}
            >
              <Bell size={17} color="var(--muted-foreground)" strokeWidth={1.75} />
              <span style={{
                position: "absolute", top: -4, right: -4,
                width: 16, height: 16, borderRadius: 8,
                background: "var(--orange)", color: "#fff",
                fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid var(--background)",
              }}>3</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "16px 16px 24px" }}>

        {/* Summary card — same style as form cards */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          background: "#fff", border: "1px solid #e5e5e5",
          borderRadius: 14, padding: "14px 14px", marginBottom: 18,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: "#F9731614",
            border: "1.5px solid #F9731630",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ClipboardList size={22} color="#F97316" strokeWidth={1.75} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#0c0c0c", margin: "0 0 3px", lineHeight: 1.2 }}>
              Laporan hari ini
            </p>
            <p style={{ fontSize: 11, color: "#737373", margin: 0 }}>
              {todayCount === 0
                ? "Belum ada laporan yang diisi hari ini"
                : `${todayCount} laporan sudah dikirim hari ini`}
            </p>
          </div>
          {todayCount > 0 && (
            <span style={{
              fontSize: 22, fontWeight: 700, color: "#F97316", lineHeight: 1, flexShrink: 0,
            }}>
              {todayCount}
            </span>
          )}
        </div>

        {/* Section label */}
        <p style={{
          fontSize: 11, fontWeight: 600, color: "#737373",
          letterSpacing: "0.06em", textTransform: "uppercase",
          margin: "0 0 10px 4px",
        }}>
          Pilih Formulir
        </p>

        {/* Form cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FORMS_CONFIG.map(form => {
            const Icon = FORM_ICONS[form.id];
            return (
              <button
                key={form.id}
                onClick={() => onOpenForm(form.id, today)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: "#fff",
                  border: "1px solid #e5e5e5",
                  borderRadius: 14,
                  padding: "14px 14px",
                  cursor: "pointer", textAlign: "left", width: "100%",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  fontFamily: "'Inter', sans-serif",
                  transition: "box-shadow 0.15s, border-color 0.15s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 14px ${form.color}22`;
                  (e.currentTarget as HTMLElement).style.borderColor = `${form.color}55`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#e5e5e5";
                }}
              >
                {/* Icon */}
                <div style={{
                  width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                  background: `${form.color}14`,
                  border: `1.5px solid ${form.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon size={22} color={form.color} strokeWidth={1.75} />
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0c0c0c", margin: "0 0 3px", lineHeight: 1.2 }}>
                    {form.nameId}
                  </p>
                  <p style={{ fontSize: 11, color: "#737373", margin: "0 0 5px" }}>
                    {form.nameEn}
                  </p>
                  <p style={{ fontSize: 11, color: "#a3a3a3", margin: 0, lineHeight: 1.4 }}>
                    {FORM_DESC[form.id]}
                  </p>
                </div>

                {/* Arrow */}
                <div style={{
                  width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                  background: `${form.color}10`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <ChevronRight size={16} color={form.color} strokeWidth={2.5} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
