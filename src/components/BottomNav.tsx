import { Home as HomeIcon, ClipboardList, User } from "lucide-react";

export type MainTab = "home" | "history" | "profile";

interface Props {
  active: MainTab;
  onChange: (tab: MainTab) => void;
}

const TABS: { id: MainTab; label: string; Icon: React.ElementType }[] = [
  { id: "home",    label: "Beranda", Icon: HomeIcon     },
  { id: "history", label: "Riwayat", Icon: ClipboardList },
  { id: "profile", label: "Profil",  Icon: User          },
];

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: "var(--background)",
      borderTop: "1px solid var(--border)",
      padding: "10px 8px 22px",
      display: "flex",
      zIndex: 40,
    }}>
      {TABS.map(t => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "6px 4px", background: "none", border: "none", cursor: "pointer",
              borderRadius: "var(--radius)",
              transition: "background 0.12s",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <t.Icon
              size={22}
              strokeWidth={isActive ? 2.25 : 1.75}
              color={isActive ? "var(--orange)" : "var(--muted-foreground)"}
            />
            <span style={{
              fontSize: 10, fontWeight: isActive ? 600 : 500,
              color: isActive ? "var(--orange)" : "var(--muted-foreground)",
            }}>
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
