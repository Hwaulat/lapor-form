import { useState } from "react";
import {
  ArrowLeft, Bell, CheckCircle2, TriangleAlert,
  ClipboardList, Clock, Star, Info, BellOff,
} from "lucide-react";

interface Props {
  onBack: () => void;
}

interface Notif {
  id: string;
  type: "reminder" | "incomplete" | "achievement" | "info" | "warning";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL: Notif[] = [
  {
    id: "1", type: "warning", read: false,
    title: "Laporan Belum Lengkap",
    body: "Anda belum mengisi 3 laporan untuk tanggal kemarin (7 Sep). Segera selesaikan.",
    time: "2 jam lalu",
  },
  {
    id: "2", type: "reminder", read: false,
    title: "Pengingat Laporan Harian",
    body: "Hari ini Anda baru mengisi 2 dari 5 laporan EHS. Jangan lupa sisanya!",
    time: "4 jam lalu",
  },
  {
    id: "3", type: "achievement", read: false,
    title: "Pencapaian Baru! 🎉",
    body: "Selamat! Anda berhasil mengisi 5/5 laporan selama 3 hari berturut-turut.",
    time: "1 hari lalu",
  },
  {
    id: "4", type: "info", read: true,
    title: "Pembaruan Formulir QRP",
    body: "Formulir Quick Response Point telah diperbarui. Harap perhatikan kolom baru pada langkah 2.",
    time: "2 hari lalu",
  },
  {
    id: "5", type: "reminder", read: true,
    title: "Pengingat Laporan Harian",
    body: "Jangan lupa mengisi laporan EHS Anda hari ini sebelum jam 17:00.",
    time: "3 hari lalu",
  },
  {
    id: "6", type: "incomplete", read: true,
    title: "Laporan Nearmiss Tertunda",
    body: "Laporan Nearmiss tanggal 5 Sep belum diselesaikan. Klik untuk mengisi sekarang.",
    time: "4 hari lalu",
  },
  {
    id: "7", type: "achievement", read: true,
    title: "7 Hari Aktif Berturut-turut",
    body: "Anda telah aktif mengisi laporan selama 7 hari berturut-turut. Pertahankan!",
    time: "5 hari lalu",
  },
];

const TYPE_META: Record<Notif["type"], { icon: React.ElementType; bg: string; iconColor: string; border: string }> = {
  reminder:    { icon: Clock,         bg: "#eff6ff", iconColor: "#3b82f6", border: "#bfdbfe" },
  incomplete:  { icon: ClipboardList, bg: "#fff7ed", iconColor: "#F97316", border: "#fed7aa" },
  achievement: { icon: Star,          bg: "#fefce8", iconColor: "#eab308", border: "#fef08a" },
  info:        { icon: Info,          bg: "#f0fdf4", iconColor: "#22c55e", border: "#bbf7d0" },
  warning:     { icon: TriangleAlert, bg: "#fef2f2", iconColor: "#ef4444", border: "#fecaca" },
};

export default function NotificationScreen({ onBack }: Props) {
  const [notifs, setNotifs] = useState<Notif[]>(INITIAL);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead    = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="flex flex-col h-full" style={{ background: "#f9f9f9", fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e5e5", padding: "48px 20px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <button
            onClick={onBack}
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "#f5f5f5", border: "1px solid #e5e5e5",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", flexShrink: 0,
            }}
          >
            <ArrowLeft size={18} color="#0c0c0c" strokeWidth={2} />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: "#0c0c0c", margin: 0, letterSpacing: "-0.02em" }}>
              Notifikasi
            </h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 600, color: "#F97316",
                fontFamily: "'Inter', sans-serif", padding: 0,
              }}
            >
              Tandai semua
            </button>
          )}
        </div>

        {/* Summary chips */}
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: unreadCount > 0 ? "#fff7ed" : "#f5f5f5",
            border: `1px solid ${unreadCount > 0 ? "#fed7aa" : "#e5e5e5"}`,
            borderRadius: 9999, padding: "5px 12px",
          }}>
            <Bell size={13} color={unreadCount > 0 ? "#F97316" : "#737373"} strokeWidth={2} />
            <span style={{ fontSize: 12, fontWeight: 600, color: unreadCount > 0 ? "#F97316" : "#737373" }}>
              {unreadCount > 0 ? `${unreadCount} belum dibaca` : "Semua sudah dibaca"}
            </span>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "#f5f5f5", border: "1px solid #e5e5e5",
            borderRadius: 9999, padding: "5px 12px",
          }}>
            <CheckCircle2 size={13} color="#737373" strokeWidth={2} />
            <span style={{ fontSize: 12, fontWeight: 500, color: "#737373" }}>
              {notifs.length} total
            </span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "12px 16px 24px" }}>

        {notifs.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "#f5f5f5", margin: "0 auto 14px",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <BellOff size={26} color="#a3a3a3" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0c0c0c" }}>Belum ada notifikasi</p>
            <p style={{ fontSize: 12, color: "#737373", marginTop: 4 }}>Notifikasi baru akan muncul di sini</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Unread section */}
            {notifs.some(n => !n.read) && (
              <>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#737373", letterSpacing: "0.06em", textTransform: "uppercase", margin: "4px 0 4px 4px" }}>
                  Belum Dibaca
                </p>
                {notifs.filter(n => !n.read).map(n => (
                  <NotifCard key={n.id} notif={n} onRead={markRead} />
                ))}
                {notifs.some(n => n.read) && (
                  <div style={{ height: 1, background: "#e5e5e5", margin: "8px 0" }} />
                )}
              </>
            )}

            {/* Read section */}
            {notifs.some(n => n.read) && (
              <>
                <p style={{ fontSize: 11, fontWeight: 600, color: "#737373", letterSpacing: "0.06em", textTransform: "uppercase", margin: "4px 0 4px 4px" }}>
                  Sudah Dibaca
                </p>
                {notifs.filter(n => n.read).map(n => (
                  <NotifCard key={n.id} notif={n} onRead={markRead} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function NotifCard({ notif, onRead }: { notif: Notif; onRead: (id: string) => void }) {
  const meta = TYPE_META[notif.type];

  return (
    <button
      onClick={() => onRead(notif.id)}
      style={{
        display: "flex", alignItems: "flex-start", gap: 12,
        background: notif.read ? "#fff" : "#fffbf7",
        border: `1px solid ${notif.read ? "#e5e5e5" : "#fed7aa"}`,
        borderRadius: 14, padding: "13px 14px",
        boxShadow: notif.read ? "0 1px 2px rgba(0,0,0,0.04)" : "0 2px 8px rgba(249,115,22,0.08)",
        cursor: "pointer", textAlign: "left", width: "100%",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.15s",
        position: "relative",
      }}
    >
      {/* Icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 12, flexShrink: 0,
        background: meta.bg, border: `1px solid ${meta.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <meta.icon size={18} color={meta.iconColor} strokeWidth={1.75} />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 6, marginBottom: 3 }}>
          <p style={{
            fontSize: 13, fontWeight: notif.read ? 600 : 700,
            color: "#0c0c0c", margin: 0, lineHeight: 1.3,
          }}>
            {notif.title}
          </p>
          <span style={{ fontSize: 10, color: "#a3a3a3", flexShrink: 0, paddingTop: 1 }}>{notif.time}</span>
        </div>
        <p style={{ fontSize: 12, color: "#737373", margin: 0, lineHeight: 1.55 }}>
          {notif.body}
        </p>
      </div>

      {/* Unread dot */}
      {!notif.read && (
        <div style={{
          position: "absolute", top: 14, right: 14,
          width: 8, height: 8, borderRadius: "50%",
          background: "#F97316",
        }} />
      )}
    </button>
  );
}
