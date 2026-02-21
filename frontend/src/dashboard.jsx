import { useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

// ─── Sample CBC Data ──────────────────────────────────────────────────────────
const SAMPLE_CBC = {
  patientName: "Sarah Johnson",
  date: "February 21, 2026",
  summary:
    "Your blood work looks generally healthy — most values are within normal range, with slightly low iron levels worth monitoring.",
  panels: [
    { id: "rbc", label: "Red Blood Cells",  icon: "🔴", value: 4.5,  unit: "M/µL", min: 4.2,  max: 5.4,  description: "Red blood cells carry oxygen from your lungs to every part of your body. Your count is healthy." },
    { id: "wbc", label: "White Blood Cells", icon: "⚪", value: 7.2,  unit: "K/µL", min: 4.5,  max: 11.0, description: "White blood cells are your immune system's soldiers. Your level shows a strong, balanced immune response." },
    { id: "hgb", label: "Hemoglobin",        icon: "🩸", value: 11.8, unit: "g/dL", min: 12.0, max: 16.0, description: "Hemoglobin carries oxygen in red blood cells. Yours is slightly low — this may explain mild fatigue." },
    { id: "hct", label: "Hematocrit",        icon: "💧", value: 38,   unit: "%",    min: 37,   max: 47,   description: "Hematocrit measures the proportion of your blood made up of red cells. You're within the normal range." },
    { id: "plt", label: "Platelets",         icon: "🟡", value: 210,  unit: "K/µL", min: 150,  max: 400,  description: "Platelets help your blood clot to stop bleeding. Your count is comfortably within the healthy range." },
    { id: "mcv", label: "MCV",               icon: "🔵", value: 79,   unit: "fL",   min: 80,   max: 100,  description: "MCV measures the average size of your red blood cells. Slightly small cells can be an early indicator of iron deficiency." },
  ],
};

// ─── Theme tokens ─────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg:              "#0b0e18",
    bgGradient:      "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(99,102,241,0.11), transparent)",
    surface:         "rgba(255,255,255,0.03)",
    surfaceBorder:   "rgba(255,255,255,0.07)",
    cardBg:          "rgba(255,255,255,0.03)",
    cardBorder:      "rgba(255,255,255,0.07)",
    text:            "#ffffff",
    textMuted:       "rgba(255,255,255,0.38)",
    textSubtle:      "rgba(255,255,255,0.22)",
    textBody:        "rgba(255,255,255,0.6)",
    divider:         "rgba(255,255,255,0.07)",
    tooltipBg:       "#151929",
    tooltipBorder:   "rgba(255,255,255,0.1)",
    gaugeBg:         "rgba(255,255,255,0.07)",
    thumbBorder:     "#0b0e18",
    bannerBg:        "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(52,211,153,0.07))",
    bannerBorder:    "rgba(99,102,241,0.22)",
    toggleBg:        "rgba(255,255,255,0.07)",
    toggleBorder:    "rgba(255,255,255,0.12)",
    toggleTrack:     "rgba(99,102,241,0.5)",
    toggleThumb:     "#818cf8",
    radialBg:        "rgba(255,255,255,0.03)",
    shadow:          "none",
  },
  light: {
    bg:              "#f0f4f9",
    bgGradient:      "radial-gradient(ellipse 90% 55% at 50% -10%, rgba(99,102,241,0.07), transparent)",
    surface:         "#ffffff",
    surfaceBorder:   "rgba(0,0,0,0.08)",
    cardBg:          "#ffffff",
    cardBorder:      "rgba(0,0,0,0.09)",
    text:            "#0f1117",
    textMuted:       "rgba(0,0,0,0.42)",
    textSubtle:      "rgba(0,0,0,0.28)",
    textBody:        "rgba(0,0,0,0.62)",
    divider:         "rgba(0,0,0,0.07)",
    tooltipBg:       "#ffffff",
    tooltipBorder:   "rgba(0,0,0,0.1)",
    gaugeBg:         "rgba(0,0,0,0.08)",
    thumbBorder:     "#f0f4f9",
    bannerBg:        "linear-gradient(135deg, rgba(99,102,241,0.07), rgba(22,163,74,0.05))",
    bannerBorder:    "rgba(99,102,241,0.16)",
    toggleBg:        "rgba(0,0,0,0.06)",
    toggleBorder:    "rgba(0,0,0,0.1)",
    toggleTrack:     "rgba(0,0,0,0.15)",
    toggleThumb:     "#ffffff",
    radialBg:        "rgba(0,0,0,0.03)",
    shadow:          "0 1px 4px rgba(0,0,0,0.06)",
  },
};

// ─── Status colors ────────────────────────────────────────────────────────────
const STATUS = {
  normal: { color: "#16a34a", label: "Normal" },
  low:    { color: "#ea580c", label: "Low"    },
  high:   { color: "#db2777", label: "High"   },
};

function getStatus(v, min, max) {
  if (v < min) return "low";
  if (v > max) return "high";
  return "normal";
}

function getPercent(v, min, max) {
  const lo = min * 0.7, hi = max * 1.3;
  return Math.min(100, Math.max(0, ((v - lo) / (hi - lo)) * 100));
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────
function ThemeToggle({ isDark, onToggle, t }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: "flex", alignItems: "center", gap: 9,
        background: t.toggleBg, border: `1px solid ${t.toggleBorder}`,
        borderRadius: 30, padding: "8px 16px", cursor: "pointer",
        transition: "all 0.25s", fontFamily: "'DM Sans', sans-serif",
        fontSize: 13, color: t.text, fontWeight: 500,
      }}
    >
      <div style={{
        position: "relative", width: 36, height: 20, borderRadius: 10,
        background: isDark ? "rgba(99,102,241,0.55)" : t.toggleTrack,
        transition: "background 0.3s", flexShrink: 0,
      }}>
        <div style={{
          position: "absolute", top: 3,
          left: isDark ? 19 : 3,
          width: 14, height: 14, borderRadius: "50%",
          background: t.toggleThumb,
          boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
          transition: "left 0.25s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
      <span>{isDark ? "🌙 Dark" : "☀️ Light"}</span>
    </button>
  );
}

// ─── Gauge Bar ────────────────────────────────────────────────────────────────
function GaugeBar({ value, min, max, status, t }) {
  const pct  = getPercent(value, min, max);
  const ns   = getPercent(min, min, max);
  const ne   = getPercent(max, min, max);
  const col  = STATUS[status].color;
  return (
    <div style={{ position: "relative", height: 8, borderRadius: 8, background: t.gaugeBg, margin: "14px 0 6px", overflow: "visible" }}>
      <div style={{ position: "absolute", left: `${ns}%`, width: `${ne - ns}%`, height: "100%", background: "rgba(22,163,74,0.14)", borderRadius: 8 }} />
      <div style={{ position: "absolute", left: 0, width: `${pct}%`, height: "100%", background: `linear-gradient(90deg,${col}55,${col})`, borderRadius: 8, transition: "width 1s cubic-bezier(.4,0,.2,1)" }} />
      <div style={{ position: "absolute", left: `calc(${pct}% - 7px)`, top: -4, width: 14, height: 14, borderRadius: "50%", background: col, boxShadow: `0 0 8px ${col}88`, border: `2px solid ${t.thumbBorder}`, transition: "left 1s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}

// ─── Panel Card ───────────────────────────────────────────────────────────────
function PanelCard({ panel, isSelected, onClick, t }) {
  const status = getStatus(panel.value, panel.min, panel.max);
  const col    = STATUS[status].color;
  const lbl    = STATUS[status].label;
  return (
    <div onClick={onClick} style={{
      background: isSelected ? col + "0e" : t.cardBg,
      border: `1.5px solid ${isSelected ? col : t.cardBorder}`,
      borderRadius: 20, padding: "22px 22px 18px", cursor: "pointer",
      transition: "all 0.25s", position: "relative", overflow: "hidden",
      boxShadow: isSelected ? `0 4px 24px ${col}18` : t.shadow,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
        <div>
          <div style={{ fontSize: 20, marginBottom: 8 }}>{panel.icon}</div>
          <div style={{ fontSize: 11, color: t.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            {panel.label}
          </div>
          <div style={{ marginTop: 5, display: "flex", alignItems: "baseline", gap: 5 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: t.text, fontFamily: "'Sora', sans-serif", letterSpacing: "-0.03em" }}>{panel.value}</span>
            <span style={{ fontSize: 12, color: t.textMuted, fontFamily: "'DM Sans', sans-serif" }}>{panel.unit}</span>
          </div>
        </div>
        <div style={{ background: col + "18", color: col, border: `1px solid ${col}33`, borderRadius: 30, padding: "3px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap" }}>
          {lbl}
        </div>
      </div>

      <GaugeBar value={panel.value} min={panel.min} max={panel.max} status={status} t={t} />

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: t.textSubtle, fontFamily: "'DM Sans', sans-serif" }}>
        <span>↓ {panel.min}</span>
        <span style={{ color: t.textMuted }}>Normal range</span>
        <span>↑ {panel.max}</span>
      </div>

      {isSelected && (
        <p style={{ marginTop: 14, paddingTop: 13, borderTop: `1px solid ${t.divider}`, fontSize: 13, color: t.textBody, lineHeight: 1.65, fontFamily: "'DM Sans', sans-serif", marginBottom: 0 }}>
          {panel.description}
        </p>
      )}
    </div>
  );
}

// ─── Radial Overview ──────────────────────────────────────────────────────────
function RadialOverview({ panels, t }) {
  const data = panels.map((p) => ({
    name:  p.label,
    value: Math.round(getPercent(p.value, p.min, p.max)),
    fill:  STATUS[getStatus(p.value, p.min, p.max)].color,
  }));
  return (
    <div style={{ height: 220, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="28%" outerRadius="92%" data={data} startAngle={200} endAngle={-20}>
          <RadialBar dataKey="value" cornerRadius={5} background={{ fill: t.radialBg }} />
          <Tooltip
            contentStyle={{ background: t.tooltipBg, border: `1px solid ${t.tooltipBorder}`, borderRadius: 12, color: t.text, fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}
            formatter={(v, _, props) => [`${props.payload.name}: ${v}% of range`]}
            labelFormatter={() => ""}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
        <div style={{ fontSize: 10, color: t.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>CBC</div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function CBCDashboard({ cbc = SAMPLE_CBC }) {
  const [selected, setSelected] = useState(null);
  const [isDark,   setIsDark]   = useState(true);
  const t = THEMES[isDark ? "dark" : "light"];

  const normalCount = cbc.panels.filter((p) => getStatus(p.value, p.min, p.max) === "normal").length;
  const total       = cbc.panels.length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${t.bg} !important; transition: background 0.35s; }
        .cbc-cards  { display: grid; grid-template-columns: repeat(2, 1fr); gap: 13px; }
        .cbc-layout { display: grid; grid-template-columns: 230px 1fr; gap: 20px; align-items: start; }
        @media (max-width: 740px) {
          .cbc-layout { grid-template-columns: 1fr !important; }
          .cbc-cards  { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: t.bg,
        backgroundImage: t.bgGradient,
        padding: "44px 24px 70px",
        maxWidth: 1000,
        margin: "0 auto",
        transition: "background 0.35s, color 0.35s",
        fontFamily: "'DM Sans', sans-serif",
        color: t.text,
      }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 30, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#16a34a", boxShadow: "0 0 8px #16a34a88" }} />
              <span style={{ fontSize: 11, color: t.textMuted, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                Complete Blood Count Report
              </span>
            </div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: "clamp(24px,5vw,36px)", fontWeight: 700, letterSpacing: "-0.03em", color: t.text, lineHeight: 1.1 }}>
              {cbc.patientName}
            </h1>
            <p style={{ marginTop: 5, fontSize: 13, color: t.textMuted }}>{cbc.date}</p>
          </div>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} t={t} />
        </div>

        {/* ── Summary Banner ── */}
        <div style={{ background: t.bannerBg, border: `1px solid ${t.bannerBorder}`, borderRadius: 20, padding: "22px 26px", marginBottom: 28, display: "flex", alignItems: "flex-start", gap: 18 }}>
          <div style={{ fontSize: 32, flexShrink: 0, marginTop: 2 }}>
            {normalCount === total ? "✅" : normalCount >= Math.ceil(total * 0.7) ? "🟡" : "⚠️"}
          </div>
          <div>
            <p style={{ fontSize: "clamp(14px,2.2vw,17px)", fontWeight: 500, lineHeight: 1.6, color: t.text, marginBottom: 10 }}>
              {cbc.summary}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, background: "rgba(22,163,74,0.1)", color: "#16a34a", border: "1px solid rgba(22,163,74,0.2)", borderRadius: 20, padding: "2px 10px" }}>
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

        {/* ── Main Layout ── */}
        <div className="cbc-layout">

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Radial chart */}
            <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 20, padding: "18px 16px 14px", boxShadow: t.shadow }}>
              <p style={{ fontSize: 11, color: t.textMuted, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 2 }}>At a Glance</p>
              <RadialOverview panels={cbc.panels} t={t} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                {cbc.panels.map((p) => {
                  const s = getStatus(p.value, p.min, p.max);
                  const c = STATUS[s].color;
                  return (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: t.textBody, padding: "5px 0", borderBottom: `1px solid ${t.divider}` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: c, flexShrink: 0 }} />
                        {p.label}
                      </div>
                      <span style={{ color: c, fontWeight: 600, fontFamily: "'Sora', sans-serif" }}>
                        {p.value} <span style={{ fontWeight: 400, fontSize: 11, color: t.textMuted }}>{p.unit}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div style={{ background: t.surface, border: `1px solid ${t.surfaceBorder}`, borderRadius: 16, padding: "14px 16px", boxShadow: t.shadow }}>
              <p style={{ fontSize: 11, color: t.textMuted, letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 10 }}>Legend</p>
              {Object.entries(STATUS).map(([key, cfg]) => (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: cfg.color }} />
                  <span style={{ fontSize: 12, color: t.textBody, textTransform: "capitalize" }}>{cfg.label}</span>
                </div>
              ))}
              <p style={{ fontSize: 11, color: t.textSubtle, marginTop: 10, lineHeight: 1.6 }}>
                Tap any card to learn more about that marker.
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="cbc-cards">
            {cbc.panels.map((p) => (
              <PanelCard
                key={p.id}
                panel={p}
                isSelected={selected === p.id}
                onClick={() => setSelected(selected === p.id ? null : p.id)}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <p style={{ marginTop: 40, textAlign: "center", fontSize: 12, color: t.textSubtle, lineHeight: 1.7 }}>
          This report is for informational purposes only. Always consult your healthcare provider for medical advice.
        </p>
      </div>
    </>
  );
}