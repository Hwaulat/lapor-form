import { useState, useEffect } from "react";
import HomeScreen from "./screens/HomeScreen";
import FormWizard from "./screens/FormWizard";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BottomNav, { MainTab } from "./components/BottomNav";
import NotificationScreen from "./screens/NotificationScreen";
import { FormType, FORMS_CONFIG } from "./data/forms";

export interface Submission {
  formType: FormType;
  date: string;
  completedAt: string;
  answers: Record<string, string>;
}

type AppScreen = "onboarding" | "login" | "main" | "form" | "notifications";

interface FormScreen {
  formType: FormType;
  date: string;
}

const TODAY     = "2026-09-08";
const YESTERDAY = "2026-09-07";

const INITIAL_SUBMISSIONS: Submission[] = [
  { formType: "bos_v2",   date: TODAY,      completedAt: "2026-09-08T07:30:00", answers: {} },
  { formType: "nearmiss", date: TODAY,      completedAt: "2026-09-08T08:15:00", answers: {} },
  { formType: "bos_v2",   date: YESTERDAY,  completedAt: "2026-09-07T07:45:00", answers: {} },
  { formType: "nearmiss", date: YESTERDAY,  completedAt: "2026-09-07T08:30:00", answers: {} },
  { formType: "qrp",      date: YESTERDAY,  completedAt: "2026-09-07T09:00:00", answers: {} },
];

export default function App() {
  const [appScreen, setAppScreen]     = useState<AppScreen>("onboarding");
  const [mainTab, setMainTab]         = useState<MainTab>("home");
  const [formScreen, setFormScreen]   = useState<FormScreen | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>(INITIAL_SUBMISSIONS);

  const DESIGN_W = 390;
  const DESIGN_H = 844;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calc = () => {
      const pad = 16;
      const s = Math.min(
        (window.innerWidth  - pad) / DESIGN_W,
        (window.innerHeight - pad) / DESIGN_H,
        1,
      );
      setScale(s);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const handleOpenForm = (formType: FormType, date: string) => {
    setFormScreen({ formType, date });
    setAppScreen("form");
  };

  const handleSubmitForm = (formType: FormType, date: string, answers: Record<string, string>) => {
    setSubmissions(prev => [...prev, { formType, date, completedAt: new Date().toISOString(), answers }]);
    setAppScreen("main");
    setFormScreen(null);
  };

  const handleBackFromForm = () => {
    setAppScreen("main");
    setFormScreen(null);
  };

  const handleLogout = () => {
    setAppScreen("onboarding");
    setMainTab("home");
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(145deg, #f0eeea 0%, #e8e6e1 100%)",
        overflow: "hidden",
      }}
    >
      {/* Scaled wrapper — takes up exactly the scaled footprint in the flex layout */}
      <div style={{ width: DESIGN_W * scale, height: DESIGN_H * scale, flexShrink: 0, position: "relative" }}>
      {/* Phone shell at design resolution, scaled down to fit */}
      <div
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          background: "#d1cfc9",
          borderRadius: 56,
          padding: 3,
          boxShadow: [
            "0 0 0 1px rgba(255,255,255,0.6) inset",
            "0 24px 80px rgba(0,0,0,0.18)",
            "0 4px 16px rgba(0,0,0,0.08)",
          ].join(", "),
          position: "absolute",
          top: 0, left: 0,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Side buttons */}
        {[{ left: -3, top: 130, h: 32 }, { left: -3, top: 178, h: 62 }, { left: -3, top: 252, h: 62 }].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: b.left, top: b.top, width: 3, height: b.h, background: "#b0ada7", borderRadius: "2px 0 0 2px" }} />
        ))}
        <div style={{ position: "absolute", right: -3, top: 170, width: 3, height: 92, background: "#b0ada7", borderRadius: "0 2px 2px 0" }} />

        {/* Screen bezel */}
        <div
          className="no-scrollbar"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 53,
            background: "#ffffff",
            overflow: "hidden",
            position: "relative",
          }}
        >

          {/* App content */}
          <div className="absolute inset-0 overflow-hidden" style={{ display: "flex", flexDirection: "column" }}>

            {/* Onboarding */}
            {appScreen === "onboarding" && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <OnboardingScreen onStart={() => setAppScreen("login")} />
              </div>
            )}

            {/* Notifications */}
            {appScreen === "notifications" && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <NotificationScreen onBack={() => setAppScreen("main")} />
              </div>
            )}

            {/* Login */}
            {appScreen === "login" && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <LoginScreen onLogin={() => { setAppScreen("main"); setMainTab("home"); }} />
              </div>
            )}

            {/* Form wizard */}
            {appScreen === "form" && formScreen && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <FormWizard
                  formConfig={FORMS_CONFIG.find(f => f.id === formScreen.formType)!}
                  date={formScreen.date}
                  onSubmit={handleSubmitForm}
                  onBack={handleBackFromForm}
                />
              </div>
            )}

            {/* Main — home / history / profile with shared bottom nav */}
            {appScreen === "main" && (
              <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                {/* Scrollable content area above the nav */}
                <div className="absolute inset-0 overflow-y-auto no-scrollbar" style={{ paddingBottom: 72 }}>
                  {mainTab === "home" && (
                    <HomeScreen
                      submissions={submissions}
                      today={TODAY}
                      onOpenForm={handleOpenForm}
                      onNotifications={() => setAppScreen("notifications")}
                    />
                  )}
                  {mainTab === "history" && (
                    <HistoryScreen
                      submissions={submissions}
                      today={TODAY}
                    />
                  )}
                  {mainTab === "profile" && (
                    <ProfileScreen
                      submissions={submissions}
                      today={TODAY}
                      onLogout={handleLogout}
                    />
                  )}
                </div>

                {/* Shared bottom nav */}
                <BottomNav active={mainTab} onChange={setMainTab} />
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
