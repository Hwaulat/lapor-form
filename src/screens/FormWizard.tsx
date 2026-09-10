import { useState, useEffect } from "react";
import {
  ChevronLeft, ChevronDown, Calendar, Plus, Minus,
  Loader2, CheckCircle2,
  Eye, ClipboardEdit, TriangleAlert, Search, ShieldAlert,
} from "lucide-react";
import { FormConfig, FormField, FormType } from "../data/forms";

interface Props {
  formConfig: FormConfig;
  date: string;
  onSubmit: (ft: FormType, date: string, answers: Record<string, string>) => void;
  onBack: () => void;
}

const MONTH_SHORT = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const fmt = (s: string) => { const d = new Date(s); return `${d.getDate()} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`; };

const FORM_ICONS: Record<FormType, React.ElementType> = {
  bos_v2: Eye, bos_v3: ClipboardEdit, nearmiss: TriangleAlert,
  qrp: Search, kondisi_tidak_aman: ShieldAlert,
};

/* ── shadcn-style tokens ──────────────────────────── */
const T = {
  bg:      "var(--background)",
  fg:      "var(--foreground)",
  card:    "var(--card)",
  muted:   "var(--muted)",
  mutedFg: "var(--muted-foreground)",
  border:  "var(--border)",
  input:   "var(--input)",
  secondary: "var(--secondary)",
  radius:  "var(--radius)",
  orange:  "var(--orange)",
  orange50:"var(--orange-50)",
  orange200:"var(--orange-200)",
};

/* ── Reusable input base style ────────────────────── */
const inputBase = (focused: boolean, color: string): React.CSSProperties => ({
  width: "100%", padding: "10px 13px",
  background: T.bg,
  border: `1px solid ${focused ? color : T.border}`,
  borderRadius: "calc(var(--radius) - 2px)",
  fontSize: 14, color: T.fg,
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxShadow: focused ? `0 0 0 3px ${color}22` : "none",
  boxSizing: "border-box" as const,
});

/* ── Field renderer ───────────────────────────────── */
function FieldInput({ field, value, onChange, color }: {
  field: FormField; value: string; onChange: (v: string) => void; color: string;
}) {
  const [focused, setFocus] = useState(false);
  const fo = () => setFocus(true);
  const fb = () => setFocus(false);

  if (field.type === "radio") {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        {field.options?.map(opt => {
          const sel = value === opt.value;
          return (
            <button
              key={opt.value} type="button" onClick={() => onChange(opt.value)}
              style={{
                flex: 1, padding: "12px 10px",
                borderRadius: "calc(var(--radius) - 2px)",
                border: `1.5px solid ${sel ? color : T.border}`,
                background: sel ? `${color}0f` : T.bg,
                cursor: "pointer", textAlign: "center",
                transition: "all 0.15s",
                boxShadow: sel ? `0 0 0 3px ${color}18` : "none",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 3 }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 8,
                  border: `2px solid ${sel ? color : T.border}`,
                  background: sel ? color : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}>
                  {sel && <div style={{ width: 5, height: 5, borderRadius: 3, background: "#fff" }} />}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: sel ? color : T.fg }}>{opt.labelId}</span>
              </div>
              <span style={{ fontSize: 11, color: T.mutedFg }}>{opt.labelEn}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (field.type === "number") {
    const n = parseInt(value || "0");
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          type="button" onClick={() => onChange(String(Math.max(0, n - 1)))}
          style={{
            width: 38, height: 38, borderRadius: "calc(var(--radius) - 2px)",
            background: T.secondary, border: `1px solid ${T.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "background 0.12s",
          }}
        >
          <Minus size={16} color={T.mutedFg} strokeWidth={2} />
        </button>
        <input
          type="number" min={0} value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="0"
          style={{ ...inputBase(focused, color), textAlign: "center", fontWeight: 700, fontSize: 16 }}
          onFocus={fo} onBlur={fb}
        />
        <button
          type="button" onClick={() => onChange(String(n + 1))}
          style={{
            width: 38, height: 38, borderRadius: "calc(var(--radius) - 2px)",
            background: `${color}12`, border: `1px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "background 0.12s",
          }}
        >
          <Plus size={16} color={color} strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  if (field.type === "text") {
    return (
      <input
        type="text" value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Masukkan jawaban..."
        style={inputBase(focused, color)}
        onFocus={fo} onBlur={fb}
      />
    );
  }

  if (field.type === "date") {
    return (
      <div style={{ position: "relative" }}>
        <input
          type="date" value={value} max="2026-09-08"
          onChange={e => onChange(e.target.value)}
          style={{ ...inputBase(focused, color), paddingLeft: 13 }}
          onFocus={fo} onBlur={fb}
        />
        <Calendar
          size={15} color={T.mutedFg} strokeWidth={1.75}
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        />
      </div>
    );
  }

  if (field.type === "dropdown") {
    return (
      <div style={{ position: "relative" }}>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ ...inputBase(focused, color), paddingRight: 36, appearance: "none", cursor: "pointer" }}
          onFocus={fo} onBlur={fb}
        >
          <option value="">— Pilih / Select —</option>
          {field.options?.map(o => <option key={o.value} value={o.value}>{o.labelId}</option>)}
        </select>
        <ChevronDown
          size={15} color={T.mutedFg} strokeWidth={2}
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
        />
      </div>
    );
  }

  if (field.type === "textarea") {
    const max = field.maxLength ?? 500;
    const pct = value.length / max;
    return (
      <div>
        <textarea
          value={value} maxLength={max} rows={4}
          onChange={e => onChange(e.target.value)}
          placeholder="Tuliskan detail di sini..."
          style={{ ...inputBase(focused, color), resize: "none", lineHeight: 1.65 }}
          onFocus={fo} onBlur={fb}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <div style={{ flex: 1, height: 3, background: T.secondary, borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 2, transition: "width 0.2s, background 0.2s",
              width: `${pct * 100}%`,
              background: pct > 0.9 ? "#ef4444" : pct > 0.7 ? "#f59e0b" : color,
            }} />
          </div>
          <span style={{ fontSize: 11, color: pct > 0.9 ? "#ef4444" : T.mutedFg, fontWeight: 500 }}>
            {value.length}/{max}
          </span>
        </div>
      </div>
    );
  }

  return null;
}

/* ── Bilingual label ──────────────────────────────── */
function BiLabel({ id, en }: { id: string; en: string }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: T.fg, lineHeight: 1.4 }}>{id}</p>
      <p style={{ fontSize: 11, color: T.mutedFg, marginTop: 2, fontStyle: "italic" }}>{en}</p>
    </div>
  );
}

/* ── Status bar ───────────────────────────────────── */
function StatusBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "44px 20px 6px", background: T.bg }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: T.fg }}>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={T.fg}>
          <rect x="0"    y="6"   width="3" height="6"  rx="1" opacity="0.3"/>
          <rect x="4.5"  y="4"   width="3" height="8"  rx="1" opacity="0.55"/>
          <rect x="9"    y="2"   width="3" height="10" rx="1" opacity="0.8"/>
          <rect x="13.5" y="0"   width="3" height="12" rx="1"/>
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.75" y="0.75" width="22" height="11.5" rx="2.5" stroke={T.fg} strokeWidth="1.3" opacity="0.8"/>
          <rect x="2.25" y="2.25" width="15" height="8.5"  rx="1.5" fill={T.fg}/>
          <path d="M23.75 4.75v3.5c1-.45 1.5-1.05 1.5-1.75s-.5-1.3-1.5-1.75z" fill={T.fg} opacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────── */
export default function FormWizard({ formConfig, date, onSubmit, onBack }: Props) {
  const [step, setStep]         = useState(0);
  const [answers, setAnswers]   = useState<Record<string, string>>({});
  const [submitting, setSub]    = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess]   = useState(false);

  const currentStep = formConfig.steps[step];
  const isLast      = step === formConfig.steps.length - 1;
  const FormIcon    = FORM_ICONS[formConfig.id];

  const handleChange = (id: string, val: string) => {
    setAnswers(p => ({ ...p, [id]: val }));
  };

  const handleNext = () => {
    isLast ? doSubmit() : setStep(p => p + 1);
  };

  const handleBack = () => {
    if (step === 0) { onBack(); return; }
    setStep(p => p - 1);
  };

  const doSubmit = async () => {
    setSub(true); setProgress(0);
    const iv = setInterval(() => setProgress(p => p >= 82 ? (clearInterval(iv), 82) : p + 16), 140);
    await new Promise(r => setTimeout(r, 1300));
    clearInterval(iv); setProgress(100);
    await new Promise(r => setTimeout(r, 280));
    setSub(false); setSuccess(true);
    await new Promise(r => setTimeout(r, 2200));
    onSubmit(formConfig.id, date, answers);
  };

  useEffect(() => {
    setStep(0); setAnswers({}); setSuccess(false); setSub(false);
  }, [formConfig.id]);

  /* ── Success screen ──────────────────────────────── */
  if (success) {
    return (
      <div style={{
        height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: T.bg, fontFamily: "'Inter', sans-serif",
        padding: "32px 24px", textAlign: "center",
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "#f0fdf4", border: "1.5px solid #bbf7d0",
          display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 20,
          boxShadow: "0 4px 24px rgba(22,163,74,0.12)",
        }}>
          <CheckCircle2 size={34} color="#16a34a" strokeWidth={1.75} />
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: T.fg, marginBottom: 4 }}>Laporan Terkirim!</h2>
        <p style={{ fontSize: 13, color: T.mutedFg, marginBottom: 20 }}>Report submitted successfully</p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: T.card, border: `1px solid ${T.border}`,
          borderRadius: T.radius, padding: "10px 16px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: "calc(var(--radius) - 2px)",
            background: `${formConfig.color}15`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FormIcon size={16} color={formConfig.color} strokeWidth={1.75} />
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: T.fg }}>{formConfig.nameId}</p>
            <p style={{ fontSize: 11, color: T.mutedFg }}>{fmt(date)}</p>
          </div>
        </div>
        <p style={{ fontSize: 11, color: T.mutedFg, marginTop: 24, opacity: 0.6 }}>
          Kembali ke beranda...
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: T.bg, fontFamily: "'Inter', sans-serif" }}>
      <StatusBar />

      {/* ── Toolbar ───────────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "8px 16px 14px",
        borderBottom: `1px solid ${T.border}`,
      }}>
        <button
          onClick={handleBack}
          style={{
            width: 34, height: 34, borderRadius: "var(--radius)",
            background: T.secondary, border: `1px solid ${T.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0, transition: "background 0.12s",
          }}
        >
          <ChevronLeft size={18} color={T.mutedFg} strokeWidth={2} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: T.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {formConfig.nameId}
          </p>
          <p style={{ fontSize: 11, color: T.mutedFg, marginTop: 1 }}>{fmt(date)}</p>
        </div>
        <div style={{
          width: 34, height: 34, borderRadius: "var(--radius)", flexShrink: 0,
          background: `${formConfig.color}12`, border: `1px solid ${formConfig.color}28`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <FormIcon size={17} color={formConfig.color} strokeWidth={1.75} />
        </div>
      </div>

      {/* ── Step progress ─────────────────────────────── */}
      <div style={{ padding: "14px 16px 10px" }}>
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          {formConfig.steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? formConfig.color : T.secondary,
              border: `1px solid ${i <= step ? formConfig.color : T.border}`,
              transition: "background 0.3s",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: T.mutedFg, fontWeight: 500 }}>
            Tahap {step + 1} dari {formConfig.steps.length}
          </span>
          <span style={{ fontSize: 11, color: T.mutedFg, opacity: 0.7 }}>
            Step {step + 1} of {formConfig.steps.length}
          </span>
        </div>
        <p style={{ fontSize: 16, fontWeight: 700, color: T.fg, lineHeight: 1.3 }}>{currentStep.titleId}</p>
        <p style={{ fontSize: 11, color: T.mutedFg, marginTop: 2, fontStyle: "italic" }}>{currentStep.titleEn}</p>
      </div>

      {/* ── Separator ─────────────────────────────────── */}
      <div style={{ height: 1, background: T.border, margin: "0 16px" }} />

      {/* ── Fields ────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "14px 16px 8px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {currentStep.fields.map(field => (
            <div
              key={field.id}
              style={{
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: T.radius, padding: "14px 14px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              <BiLabel id={field.labelId} en={field.labelEn} />
              <FieldInput
                field={field}
                value={answers[field.id] || ""}
                onChange={v => handleChange(field.id, v)}
                color={formConfig.color}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Action button ─────────────────────────────── */}
      <div style={{
        padding: "12px 16px 28px",
        borderTop: `1px solid ${T.border}`,
        background: T.bg,
      }}>
        <button
            onClick={handleNext}
            disabled={submitting}
            style={{
              width: "100%", padding: "13px 0",
              borderRadius: T.radius,
              background: formConfig.color,
              border: "none",
              fontSize: 14, fontWeight: 600, color: "#ffffff",
              cursor: submitting ? "default" : "pointer",
              fontFamily: "'Inter', sans-serif",
              position: "relative", overflow: "hidden",
              opacity: submitting ? 0.85 : 1,
              boxShadow: `0 1px 3px ${formConfig.color}40, 0 1px 2px ${formConfig.color}20`,
              transition: "opacity 0.15s, box-shadow 0.15s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            {/* Submit progress overlay */}
            {submitting && (
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0,
                background: "rgba(255,255,255,0.18)",
                width: `${progress}%`, transition: "width 0.2s",
                borderRadius: T.radius,
              }} />
            )}
            <span style={{ position: "relative", display: "flex", alignItems: "center", gap: 8 }}>
              {submitting
                ? <><Loader2 size={16} strokeWidth={2.5} style={{ animation: "spin 1s linear infinite" }} /> Mengirim Laporan...</>
                : isLast
                  ? "Submit Laporan · Submit Report"
                  : "Lanjut · Next"
              }
            </span>
          </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
