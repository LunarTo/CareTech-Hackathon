import { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

<<<<<<< HEAD
// ─── Sample CBC Data ──────────────────────────────────────────────────────────
const SAMPLE_CBC = {
  patientName: "Sarah Johnson",
  date: "February 21, 2026",
  summary:
    "Your blood work looks generally healthy — most values are within normal range, with slightly low iron levels worth monitoring.",
  panels: [
    { id: "rbc", label: "Red Blood Cells",   icon: "🔴", value: 4.5,  unit: "M/µL", min: 4.2,  max: 5.4,  description: "Red blood cells carry oxygen from your lungs to every part of your body. Your count is healthy." },
    { id: "wbc", label: "White Blood Cells", icon: "⚪", value: 7.2,  unit: "K/µL", min: 4.5,  max: 11.0, description: "White blood cells are your immune system's soldiers. Your level shows a strong, balanced immune response." },
    { id: "hgb", label: "Hemoglobin",        icon: "🩸", value: 11.8, unit: "g/dL", min: 12.0, max: 16.0, description: "Hemoglobin carries oxygen in red blood cells. Yours is slightly low — this may explain mild fatigue." },
    { id: "hct", label: "Hematocrit",        icon: "💧", value: 38,   unit: "%",    min: 37,   max: 47,   description: "Hematocrit measures the proportion of your blood made up of red cells. You're within the normal range." },
    { id: "plt", label: "Platelets",         icon: "🟡", value: 210,  unit: "K/µL", min: 150,  max: 400,  description: "Platelets help your blood clot to stop bleeding. Your count is comfortably within the healthy range." },
    { id: "mcv", label: "MCV",               icon: "🔵", value: 79,   unit: "fL",   min: 80,   max: 100,  description: "MCV measures the average size of your red blood cells. Slightly small cells can be an early indicator of iron deficiency." },
  ],
};

// ─── Design tokens ────────────────────────────────────────────────────────────
const T = {
  bg:           "#f7f3ee",
  surface:      "#ffffff",
  border:       "#d8d0c8",
  teal:         "#2a9d8f",
  tealLight:    "#4dbfb3",
  tealFaint:    "#e8f7f6",
  coral:        "#e76f51",
  ink:          "#1a1a2e",
  mid:          "#5a5a7a",
  subtle:       "#9090aa",
=======
// ─── Theme tokens ─────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#0b0e18",
    bgGradient: "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(99,102,241,0.11), transparent)",
    surface: "rgba(255,255,255,0.03)",
    surfaceBorder: "rgba(255,255,255,0.07)",
    cardBg: "rgba(255,255,255,0.03)",
    cardBorder: "rgba(255,255,255,0.07)",
    text: "#ffffff",
    textMuted: "rgba(255,255,255,0.38)",
    textSubtle: "rgba(255,255,255,0.22)",
    textBody: "rgba(255,255,255,0.6)",
    divider: "rgba(255,255,255,0.07)",
    tooltipBg: "#151929",
    tooltipBorder: "rgba(255,255,255,0.1)",
    gaugeBg: "rgba(255,255,255,0.07)",
    thumbBorder: "#0b0e18",
    bannerBg: "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(52,211,153,0.07))",
    bannerBorder: "rgba(99,102,241,0.22)",
    toggleBg: "rgba(255,255,255,0.07)",
    toggleBorder: "rgba(255,255,255,0.12)",
    toggleTrack: "rgba(99,102,241,0.5)",
    toggleThumb: "#818cf8",
    radialBg: "rgba(255,255,255,0.03)",
    shadow: "none",
  },
  light: {
    bg: "#f0f4f9",
    bgGradient: "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(99,102,241,0.07), transparent)",
    surface: "#ffffff",
    surfaceBorder: "rgba(0,0,0,0.08)",
    cardBg: "#ffffff",
    cardBorder: "rgba(0,0,0,0.09)",
    text: "#0f1117",
    textMuted: "rgba(0,0,0,0.42)",
    textSubtle: "rgba(0,0,0,0.28)",
    textBody: "rgba(0,0,0,0.62)",
    divider: "rgba(0,0,0,0.07)",
    tooltipBg: "#ffffff",
    tooltipBorder: "rgba(0,0,0,0.1)",
    gaugeBg: "rgba(0,0,0,0.08)",
    thumbBorder: "#f0f4f9",
    bannerBg: "linear-gradient(135deg, rgba(99,102,241,0.07), rgba(22,163,74,0.05))",
    bannerBorder: "rgba(99,102,241,0.16)",
    toggleBg: "rgba(0,0,0,0.06)",
    toggleBorder: "rgba(0,0,0,0.1)",
    toggleTrack: "rgba(0,0,0,0.15)",
    toggleThumb: "#ffffff",
    radialBg: "rgba(0,0,0,0.03)",
    shadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
};

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS = {
<<<<<<< HEAD
  normal: { color: T.teal,  bg: T.tealFaint,           label: "Normal" },
  low:    { color: "#ea580c", bg: "rgba(234,88,12,0.08)",  label: "Low"    },
  high:   { color: "#db2777", bg: "rgba(219,39,119,0.08)", label: "High"   },
=======
  normal: { color: "#16a34a", label: "Normal" },
  low: { color: "#ea580c", label: "Low" },
  high: { color: "#db2777", label: "High" },
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getStatus(v, min, max) {
  if (v < min) return "low";
  if (v > max) return "high";
  return "normal";
}

function getPercent(v, min, max) {
  const lo = min * 0.7,
    hi = max * 1.3;
  return Math.min(100, Math.max(0, ((v - lo) / (hi - lo)) * 100));
}

<<<<<<< HEAD
// ─── Logo ─────────────────────────────────────────────────────────────────────
const LogoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);

// ─── Header ───────────────────────────────────────────────────────────────────
function SiteHeader() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", height: 62,
      background: "rgba(253,250,247,0.9)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 34, height: 34, background: T.teal, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LogoIcon />
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.02em", color: T.ink }}>
          Simple <span style={{ color: T.teal }}>CBC</span>
        </div>
=======
// ─── Dynamic panel helpers ────────────────────────────────────────────────────
function getUnit(test) {
  const units = {
    rbc: "M/µL",
    wbc: "K/µL",
    hgb: "g/dL",
    hct: "%",
    plt: "K/µL",
    mcv: "fL",
  };
  return units[test.toLowerCase()] || "";
}

function getMin(test) {
  const mins = { rbc: 4.2, wbc: 4.5, hgb: 12.0, hct: 37, plt: 150, mcv: 80 };
  return mins[test.toLowerCase()] ?? 0;
}

function getMax(test) {
  const maxs = { rbc: 5.4, wbc: 11.0, hgb: 16.0, hct: 47, plt: 400, mcv: 100 };
  return maxs[test.toLowerCase()] ?? 100;
}

function getDescription(test) {
  const desc = {
    rbc: "Red blood cells carry oxygen from your lungs to every part of your body.",
    wbc: "White blood cells are your immune system's soldiers.",
    hgb: "Hemoglobin carries oxygen in red blood cells.",
    hct: "Hematocrit measures the proportion of your blood made up of red cells.",
    plt: "Platelets help your blood clot to stop bleeding.",
    mcv: "MCV measures the average size of your red blood cells.",
  };
  return desc[test.toLowerCase()] ?? "";
}

// ─── Components ───────────────────────────────────────────────────────────────
function ThemeToggle({ isDark, onToggle, t }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        background: t.toggleBg,
        border: `1px solid ${t.toggleBorder}`,
        borderRadius: 30,
        padding: "8px 16px",
        cursor: "pointer",
        transition: "all 0.25s",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 13,
        color: t.text,
        fontWeight: 500,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 36,
          height: 20,
          borderRadius: 10,
          background: isDark ? "rgba(99,102,241,0.55)" : t.toggleTrack,
          transition: "background 0.3s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: isDark ? 19 : 3,
            width: 14,
            height: 14,
            borderRadius: "50%",
            background: t.toggleThumb,
            boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
            transition: "left 0.25s cubic-bezier(.4,0,.2,1)",
          }}
        />
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
      </div>
      <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.mid, background: T.bg, border: `1px solid ${T.border}`, padding: "5px 13px", borderRadius: 20 }}>
        For Nurses &amp; Patients
      </div>
    </header>
  );
}

<<<<<<< HEAD
// ─── Gauge Bar ────────────────────────────────────────────────────────────────
function GaugeBar({ value, min, max, status }) {
  const pct = getPercent(value, min, max);
  const ns  = getPercent(min, min, max);
  const ne  = getPercent(max, min, max);
  const col = STATUS[status].color;
  return (
    <div style={{ position: "relative", height: 8, borderRadius: 8, background: "rgba(0,0,0,0.08)", margin: "14px 0 6px", overflow: "visible" }}>
      <div style={{ position: "absolute", left: `${ns}%`, width: `${ne - ns}%`, height: "100%", background: `${T.teal}22`, borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: "100%", background: `linear-gradient(90deg,${col}66,${col})`, borderRadius: 8, transition: "width 1s cubic-bezier(.4,0,.2,1)" }} />
      <div style={{ position: "absolute", left: `calc(${pct}% - 7px)`, top: -4, width: 14, height: 14, borderRadius: "50%", background: col, boxShadow: `0 0 8px ${col}66`, border: `2px solid #fff`, transition: "left 1s cubic-bezier(.4,0,.2,1)" }} />
=======
function GaugeBar({ value, min, max, status, t }) {
  const pct = getPercent(value, min, max);
  const ns = getPercent(min, min, max);
  const ne = getPercent(max, min, max);
  const col = STATUS[status].color;
  return (
    <div
      style={{
        position: "relative",
        height: 8,
        borderRadius: 8,
        background: t.gaugeBg,
        margin: "14px 0 6px",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: `${ns}%`,
          width: `${ne - ns}%`,
          height: "100%",
          background: "rgba(22,163,74,0.14)",
          borderRadius: 8,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          width: `${pct}%`,
          height: "100%",
          background: `linear-gradient(90deg,${col}55,${col})`,
          borderRadius: 8,
          transition: "width 1s cubic-bezier(.4,0,.2,1)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `calc(${pct}% - 7px)`,
          top: -4,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: col,
          boxShadow: `0 0 8px ${col}88`,
          border: `2px solid ${t.thumbBorder}`,
          transition: "left 1s cubic-bezier(.4,0,.2,1)",
        }}
      />
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
    </div>
  );
}

<<<<<<< HEAD
// ─── Panel Card ───────────────────────────────────────────────────────────────
function PanelCard({ panel, isSelected, onClick }) {
  const status = getStatus(panel.value, panel.min, panel.max);
  const { color, bg, label } = STATUS[status];
  return (
    <div onClick={onClick} style={{
      background: isSelected ? bg : T.surface,
      border: `1.5px solid ${isSelected ? color : T.border}`,
      borderRadius: 20, padding: "22px 22px 18px", cursor: "pointer",
      transition: "all 0.25s",
      boxShadow: isSelected ? `0 4px 20px ${color}22` : "0 2px 8px rgba(26,26,46,0.05)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div>
          <div style={{ fontSize: 20, marginBottom: 8 }}>{panel.icon}</div>
          <div style={{ fontSize: 11, color: T.mid, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            {panel.label}
          </div>
          <div style={{ marginTop: 5, display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: T.ink, fontFamily: "'Playfair Display', serif", letterSpacing: "-0.02em" }}>{panel.value}</span>
            <span style={{ fontSize: 12, color: T.mid }}>{panel.unit}</span>
          </div>
        </div>
        <div style={{ background: color + "18", color, border: `1px solid ${color}33`, borderRadius: 30, padding: "3px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          {label}
=======
function PanelCard({ panel, isSelected, onClick, t }) {
  const status = getStatus(panel.value, panel.min, panel.max);
  const col = STATUS[status].color;
  const lbl = STATUS[status].label;

  return (
    <div
      onClick={onClick}
      style={{
        background: isSelected ? col + "0e" : t.cardBg,
        border: `1.5px solid ${isSelected ? col : t.cardBorder}`,
        borderRadius: 20,
        padding: "22px 22px 18px",
        cursor: "pointer",
        transition: "all 0.25s",
        position: "relative",
        overflow: "hidden",
        boxShadow: isSelected ? `0 4px 24px ${col}18` : t.shadow,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div>
          <div style={{ fontSize: 20, marginBottom: 8 }}>{panel.icon}</div>
          <div
            style={{
              fontSize: 11,
              color: t.textMuted,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {panel.label}
          </div>
          <div style={{ marginTop: 5, display: "flex", alignItems: "baseline", gap: 5 }}>
            <span
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: t.text,
                fontFamily: "'Sora', sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              {panel.value}
            </span>
            <span style={{ fontSize: 12, color: t.textMuted, fontFamily: "'DM Sans', sans-serif" }}>
              {panel.unit}
            </span>
          </div>
        </div>
        <div
          style={{
            background: col + "18",
            color: col,
            border: `1px solid ${col}33`,
            borderRadius: 30,
            padding: "3px 12px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          {lbl}
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
        </div>
      </div>

      <GaugeBar value={panel.value} min={panel.min} max={panel.max} status={status} />

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.subtle }}>
        <span>↓ {panel.min}</span>
        <span style={{ color: T.mid }}>Normal range</span>
        <span>↑ {panel.max}</span>
      </div>

      {isSelected && (
<<<<<<< HEAD
        <p style={{ marginTop: 14, paddingTop: 13, borderTop: `1px solid ${T.border}`, fontSize: 13, color: T.mid, lineHeight: 1.65, marginBottom: 0 }}>
=======
        <p
          style={{
            marginTop: 14,
            paddingTop: 13,
            borderTop: `1px solid ${t.divider}`,
            fontSize: 13,
            color: t.textBody,
            lineHeight: 1.65,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 0,
          }}
        >
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
          {panel.description}
        </p>
      )}
    </div>
  );
}

<<<<<<< HEAD
// ─── Radial Overview ──────────────────────────────────────────────────────────
function RadialOverview({ panels }) {
=======
function RadialOverview({ panels, t }) {
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
  const data = panels.map((p) => ({
    name: p.label,
    value: Math.round(getPercent(p.value, p.min, p.max)),
    fill: STATUS[getStatus(p.value, p.min, p.max)].color,
  }));

  return (
    <div style={{ height: 220, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="28%" outerRadius="92%" data={data} startAngle={200} endAngle={-20}>
          <RadialBar dataKey="value" cornerRadius={5} background={{ fill: "rgba(0,0,0,0.04)" }} />
          <Tooltip
<<<<<<< HEAD
            contentStyle={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, color: T.ink, fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}
=======
            contentStyle={{
              background: t.tooltipBg,
              border: `1px solid ${t.tooltipBorder}`,
              borderRadius: 12,
              color: t.text,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
            }}
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
            formatter={(v, _, props) => [`${props.payload.name}: ${v}% of range`]}
            labelFormatter={() => ""}
          />
        </RadialBarChart>
      </ResponsiveContainer>
<<<<<<< HEAD
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
        <div style={{ fontSize: 10, color: T.mid, letterSpacing: "0.1em", textTransform: "uppercase" }}>CBC</div>
=======
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
          CBC
        </div>
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────
export default function CBCDashboard() {
  const [cbc, setCbc] = useState({ patientName: "Loading...", date: "", summary: "", panels: [] });
  const [selected, setSelected] = useState(null);
<<<<<<< HEAD
=======
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(true);

  const t = THEMES[isDark ? "dark" : "light"];
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24

  useEffect(() => {
    async function fetchCBC() {
      try {
        const res = await fetch("http://localhost:3000/api/lab-results/analysis");
        const data = await res.json();
        if (data.success) {
          const panels = data.analysis.map((item) => ({
            id: item.test.toLowerCase(),
            label: item.test,
            icon: "⚪",
            value: item.value,
            unit: getUnit(item.test),
            min: getMin(item.test),
            max: getMax(item.test),
            description: getDescription(item.test),
          }));

          setCbc({
            patientName: "John Doe",
            date: new Date().toLocaleDateString(),
            summary: "CBC report generated from your latest lab results.",
            panels,
          });
        }
      } catch (err) {
        console.error("Failed to fetch CBC data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCBC();
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: t.text, background: t.bg }}>
        Loading CBC report...
      </div>
    );
  }

  const normalCount = cbc.panels.filter((p) => getStatus(p.value, p.min, p.max) === "normal").length;
  const total = cbc.panels.length;

  return (
<<<<<<< HEAD
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f7f3ee !important; }
        .cbc-cards  { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; }
        .cbc-layout { display: grid; grid-template-columns: 230px 1fr; gap: 20px; align-items: start; }
        @media (max-width: 740px) {
          .cbc-layout { grid-template-columns: 1fr !important; }
          .cbc-cards  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <SiteHeader />

      <div style={{
        minHeight: "calc(100vh - 62px)",
        background: T.bg,
        padding: "40px 24px 70px",
        maxWidth: 1000,
        margin: "0 auto",
        fontFamily: "'DM Sans', sans-serif",
        color: T.ink,
      }}>

        {/* Patient info */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.teal }} />
            <span style={{ fontSize: 11, color: T.mid, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Complete Blood Count Report
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700, letterSpacing: "-0.02em", color: T.ink, lineHeight: 1.1 }}>
            {cbc.patientName}
          </h1>
          <p style={{ marginTop: 5, fontSize: 13, color: T.mid }}>{cbc.date}</p>
        </div>

        {/* Summary banner */}
        <div style={{
          background: T.tealFaint,
          border: `1px solid ${T.tealLight}44`,
          borderRadius: 20, padding: "22px 26px", marginBottom: 28,
          display: "flex", alignItems: "flex-start", gap: 18,
        }}>
          <div style={{ fontSize: 32, flexShrink: 0, marginTop: 2 }}>
            {normalCount === total ? "✅" : normalCount >= Math.ceil(total * 0.7) ? "🟡" : "⚠️"}
          </div>
          <div>
            <p style={{ fontSize: "clamp(14px,2.2vw,17px)", fontWeight: 400, lineHeight: 1.65, color: T.ink, marginBottom: 10 }}>
              {cbc.summary}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, background: `${T.teal}18`, color: T.teal, border: `1px solid ${T.teal}33`, borderRadius: 20, padding: "2px 10px" }}>
                {normalCount} normal
              </span>
              {total - normalCount > 0 && (
                <span style={{ fontSize: 12, background: "rgba(234,88,12,0.1)", color: "#ea580c", border: "1px solid rgba(234,88,12,0.2)", borderRadius: 20, padding: "2px 10px" }}>
                  {total - normalCount} needs attention
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="cbc-layout">

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 20, padding: "18px 16px 14px", boxShadow: "0 2px 8px rgba(26,26,46,0.05)" }}>
              <p style={{ fontSize: 11, color: T.mid, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 2 }}>At a Glance</p>
              <RadialOverview panels={cbc.panels} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {cbc.panels.map((p) => {
                  const s = getStatus(p.value, p.min, p.max);
                  const c = STATUS[s].color;
                  return (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: T.mid, padding: "5px 0", borderBottom: `1px solid ${T.border}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: c, flexShrink: 0 }} />
                        {p.label}
                      </div>
                      <span style={{ color: c, fontWeight: 600 }}>
                        {p.value} <span style={{ fontWeight: 400, fontSize: 11, color: T.subtle }}>{p.unit}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 16, padding: "14px 16px", boxShadow: "0 2px 8px rgba(26,26,46,0.05)" }}>
              <p style={{ fontSize: 11, color: T.mid, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 10 }}>Legend</p>
              {Object.entries(STATUS).map(([key, cfg]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: cfg.color }} />
                  <span style={{ fontSize: 12, color: T.mid, textTransform: "capitalize" }}>{cfg.label}</span>
                </div>
              ))}
              <p style={{ fontSize: 11, color: T.subtle, marginTop: 10, lineHeight: 1.6 }}>
                Tap any card to learn more about that marker.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="cbc-cards">
            {cbc.panels.map((p) => (
              <PanelCard
                key={p.id}
                panel={p}
                isSelected={selected === p.id}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
              />
            ))}
          </div>
        </div>

        <p style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: T.subtle, lineHeight: 1.7 }}>
          This report is for informational purposes only. Always consult your healthcare provider for medical advice.
        </p>
=======
    <div style={{ minHeight: "100vh", background: t.bg, backgroundImage: t.bgGradient, padding: "44px 24px 70px", maxWidth: 1000, margin: "0 auto", transition: "background 0.35s, color 0.35s", fontFamily: "'DM Sans', sans-serif", color: t.text }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 30, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 8px #16a34a88" }} />
            <span style={{ fontSize: 11, color: t.textMuted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Complete Blood Count Report</span>
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", color: t.text, lineHeight: 1.1 }}>
            {cbc.patientName}
          </h1>
          <p style={{ marginTop: 5, fontSize: 13, color: t.textMuted }}>{cbc.date}</p>
        </div>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} t={t} />
>>>>>>> 5bd4d349edc2d40cd076e266803a38cb52446d24
      </div>

      {/* Summary Banner */}
      <div style={{ background: t.bannerBg, border: `1px solid ${t.bannerBorder}`, borderRadius: 20, padding: "22px 30px", marginBottom: 44 }}>
        <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.55, color: t.textBody }}>{cbc.summary}</div>
      </div>

      {/* Radial Overview */}
      <RadialOverview panels={cbc.panels} t={t} />

      {/* Panels Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, marginTop: 30 }}>
        {cbc.panels.map((panel) => (
          <PanelCard key={panel.id} panel={panel} isSelected={selected === panel.id} onClick={() => setSelected(panel.id)} t={t} />
        ))}
      </div>

      {/* Normal / Total */}
      <div style={{ marginTop: 32, fontSize: 13, color: t.textBody }}>
        {normalCount} of {total} tests within normal range
      </div>
    </div>
  );
}
