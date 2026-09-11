import { useState } from "react";
import { CheckCircle2, SlidersHorizontal } from "lucide-react";
import { FormType, FORMS_CONFIG } from "../data/forms";
import {
  Eye, ClipboardEdit, TriangleAlert, Search, ShieldAlert, ChevronLeft
} from "lucide-react";
import { Submission } from "../App";

interface Props {
  submissions: Submission[];
  today: string;
}

const FORM_ICONS: Record<FormType, React.ElementType> = {
  bos_v2: Eye, bos_v3: ClipboardEdit, nearmiss: TriangleAlert,
  qrp: Search, kondisi_tidak_aman: ShieldAlert,
};

const MONTH_LONG  = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
const MONTH_SHORT = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
const DAY_LONG    = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];

function dateLabel(date: string, today: string): string {
  if (date === today) return "Hari Ini";
  const yDate = new Date(today);
  yDate.setDate(yDate.getDate() - 1);
  if (date === yDate.toISOString().split("T")[0]) return "Kemarin";
  const d = new Date(date);
  return `${DAY_LONG[d.getDay()]}, ${d.getDate()} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

function fmtTime(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

function groupByDate(subs: Submission[]): [string, Submission[]][] {
  const map = new Map<string, Submission[]>();
  for (const s of subs) {
    if (!map.has(s.date)) map.set(s.date, []);
    map.get(s.date)!.push(s);
  }
  return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
}

type FilterType = FormType | "all";

const FILTERS: { id: FilterType; label: string }[] = [
  { id: "all",                label: "Semua" },
  { id: "bos_v2",             label: "BOS V2" },
  { id: "bos_v3",             label: "BOS V3" },
  { id: "nearmiss",           label: "Nearmiss" },
  { id: "qrp",                label: "QRP" },
  { id: "kondisi_tidak_aman", label: "Tdk Aman" },
];

function SubmissionDetailView({ submission, onBack, today }: { submission: Submission; onBack: () => void; today: string }) {
  const formCfg = FORMS_CONFIG.find(c => c.id === submission.formType)!;
  const Icon = FORM_ICONS[submission.formType];

  return (
    <div className="flex flex-col h-full" style={{ background: "#f9f9f9", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px 14px", borderBottom: "1px solid #e5e5e5", background: "#fff" }}>
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: 10, background: "#f5f5f5", border: "1px solid #e5e5e5", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.15s" }}>
          <ChevronLeft size={18} color="#737373" strokeWidth={2} />
        </button>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: "#0c0c0c", margin: 0 }}>Detail Laporan</h1>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "16px 16px 24px" }}>
        {/* Info Card */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          background: "#fff", border: "1px solid #e5e5e5",
          borderRadius: 14, padding: "16px", marginBottom: 24,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: `${formCfg.color}15`,
            border: `1px solid ${formCfg.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon size={22} color={formCfg.color} strokeWidth={1.75} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#0c0c0c", margin: "0 0 2px" }}>{formCfg.nameId}</p>
            <p style={{ fontSize: 12, color: "#737373", margin: "0 0 6px" }}>{fmtTime(submission.completedAt)} · {dateLabel(submission.date, today)}</p>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 11, fontWeight: 600, color: "#15803d",
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: 6, padding: "2px 8px",
            }}>
              <CheckCircle2 size={12} strokeWidth={2.5} /> Selesai
            </span>
          </div>
        </div>

        {/* Answers */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {formCfg.steps.map(step => (
            <div key={step.id} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
              <div style={{ background: "#f5f5f5", padding: "12px 16px", borderBottom: "1px solid #e5e5e5" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#0c0c0c", margin: 0 }}>{step.titleId}</p>
              </div>
              <div style={{ padding: "0 16px" }}>
                {step.fields.map((field, idx) => {
                  let val = submission.answers[field.id];
                  if (field.type === "dropdown" && val && field.options) {
                    const opt = field.options.find(o => o.value === val);
                    if (opt) val = opt.labelId;
                  }
                  
                  return (
                    <div key={field.id} style={{ padding: "12px 0", borderBottom: idx < step.fields.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                      <p style={{ fontSize: 12, color: "#737373", margin: "0 0 4px", fontWeight: 500, lineHeight: 1.4 }}>{field.labelId}</p>
                      <p style={{ fontSize: 14, color: val ? "#0c0c0c" : "#a3a3a3", margin: 0, fontWeight: 600, whiteSpace: "pre-wrap" }}>
                        {val || "-"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HistoryScreen({ submissions, today }: Props) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedSub, setSelectedSub] = useState<Submission | null>(null);

  if (selectedSub) {
    return <SubmissionDetailView submission={selectedSub} onBack={() => setSelectedSub(null)} today={today} />;
  }

  const filtered  = filter === "all" ? submissions : submissions.filter(s => s.formType === filter);
  const grouped   = groupByDate(filtered);

  const totalThisMonth = submissions.filter(s => {
    const d = new Date(s.date);
    const t = new Date(today);
    return d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear();
  }).length;

  return (
    <div className="flex flex-col h-full no-scrollbar" style={{ background: "#f9f9f9", fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "14px 20px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0c0c0c", margin: 0, letterSpacing: "-0.02em" }}>
              Riwayat Laporan
            </h1>
            <p style={{ fontSize: 12, color: "#737373", margin: "2px 0 0", fontWeight: 500 }}>
              {submissions.length} laporan total · {totalThisMonth} bulan ini
            </p>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "#f5f5f5", border: "1px solid #e5e5e5",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <SlidersHorizontal size={16} color="#737373" strokeWidth={1.75} />
          </div>
        </div>

        {/* Filter chips */}
        <div className="no-scrollbar" style={{ display: "flex", gap: 6, marginTop: 12, overflowX: "auto", paddingBottom: 2 }}>
          {FILTERS.map(f => {
            const active = filter === f.id;
            const formCfg = f.id !== "all" ? FORMS_CONFIG.find(c => c.id === f.id) : null;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  flexShrink: 0, padding: "5px 12px",
                  borderRadius: 9999,
                  border: `1.5px solid ${active ? "#F97316" : "#e5e5e5"}`,
                  background: active ? "#fff7ed" : "#fff",
                  color: active ? "#F97316" : "#737373",
                  fontSize: 12, fontWeight: active ? 600 : 500,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 5,
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.12s",
                  whiteSpace: "nowrap",
                }}
              >
                {formCfg && (
                  <span style={{ fontSize: 12 }}>{formCfg.icon}</span>
                )}
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "12px 16px 16px" }}>
        {grouped.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "#f5f5f5", margin: "0 auto 14px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ClipboardEdit size={24} color="#a3a3a3" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0c0c0c" }}>Belum ada laporan</p>
            <p style={{ fontSize: 12, color: "#737373", marginTop: 4 }}>
              {filter !== "all" ? "Tidak ada laporan untuk filter ini" : "Mulai isi laporan EHS pertama Anda"}
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {grouped.map(([date, subs]) => (
              <div key={date}>
                {/* Date header */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#737373", letterSpacing: "0.02em" }}>
                    {dateLabel(date, today)}
                  </span>
                  <div style={{ flex: 1, height: 1, background: "#e5e5e5" }} />
                  <span style={{
                    fontSize: 11, color: "#F97316", fontWeight: 600,
                    background: "#fff7ed", border: "1px solid #fed7aa",
                    borderRadius: 6, padding: "1px 7px",
                  }}>
                    {subs.length} laporan
                  </span>
                </div>

                {/* Submission items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {subs.map((sub, i) => {
                    const form = FORMS_CONFIG.find(f => f.id === sub.formType)!;
                    const Icon = FORM_ICONS[sub.formType];
                    return (
                      <div
                        key={i}
                        onClick={() => setSelectedSub(sub)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          background: "#fff", border: "1px solid #e5e5e5",
                          borderRadius: 12, padding: "12px 14px",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                          cursor: "pointer",
                        }}
                      >
                        {/* Icon */}
                        <div style={{
                          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                          background: `${form.color}12`,
                          border: `1px solid ${form.color}25`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Icon size={18} color={form.color} strokeWidth={1.75} />
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "#0c0c0c", margin: "0 0 2px" }}>
                            {form.nameId}
                          </p>
                          <p style={{ fontSize: 11, color: "#737373", margin: 0 }}>
                            {form.nameEn} · {fmtTime(sub.completedAt)}
                          </p>
                        </div>

                        {/* Status */}
                        <span style={{
                          display: "inline-flex", alignItems: "center", gap: 4,
                          fontSize: 11, fontWeight: 500, color: "#15803d",
                          background: "#f0fdf4", border: "1px solid #bbf7d0",
                          borderRadius: 9999, padding: "3px 9px", flexShrink: 0,
                        }}>
                          <CheckCircle2 size={11} strokeWidth={2.5} />
                          Selesai
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// re-export for use in HistoryScreen's internal mapping
export { MONTH_LONG, MONTH_SHORT, DAY_LONG };
