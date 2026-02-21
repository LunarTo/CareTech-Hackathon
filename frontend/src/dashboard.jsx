import { useState } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

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
};

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS = {
  normal: { color: T.teal,  bg: T.tealFaint,           label: "Normal" },
  low:    { color: "#ea580c", bg: "rgba(234,88,12,0.08)",  label: "Low"    },
  high:   { color: "#db2777", bg: "rgba(219,39,119,0.08)", label: "High"   },
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
      </div>
      <div style={{ fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: T.mid, background: T.bg, border: `1px solid ${T.border}`, padding: "5px 13px", borderRadius: 20 }}>
        For Nurses &amp; Patients
      </div>
    </header>
  );
}

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
    </div>
  );
}

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
        </div>
      </div>

      <GaugeBar value={panel.value} min={panel.min} max={panel.max} status={status} />

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: T.subtle }}>
        <span>↓ {panel.min}</span>
        <span style={{ color: T.mid }}>Normal range</span>
        <span>↑ {panel.max}</span>
      </div>

      {isSelected && (
        <p style={{ marginTop: 14, paddingTop: 13, borderTop: `1px solid ${T.border}`, fontSize: 13, color: T.mid, lineHeight: 1.65, marginBottom: 0 }}>
          {panel.description}
        </p>
      )}
    </div>
  );
}

// ─── Radial Overview ──────────────────────────────────────────────────────────
function RadialOverview({ panels }) {
  const data = panels.map((p) => ({
    name:  p.label,
    value: Math.round(getPercent(p.value, p.min, p.max)),
    fill:  STATUS[getStatus(p.value, p.min, p.max)].color,
  }));
  return (
    <div style={{ height: 220, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="28%" outerRadius="92%" data={data} startAngle={200} endAngle={-20}>
          <RadialBar dataKey="value" cornerRadius={5} background={{ fill: "rgba(0,0,0,0.04)" }} />
          <Tooltip
            contentStyle={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 12, color: T.ink, fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}
            formatter={(v, _, props) => [`${props.payload.name}: ${v}% of range`]}
            labelFormatter={() => ""}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
        <div style={{ fontSize: 10, color: T.mid, letterSpacing: "0.1em", textTransform: "uppercase" }}>CBC</div>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function CBCDashboard({ cbc = SAMPLE_CBC }) {
  const [selected, setSelected] = useState(null);

  const normalCount = cbc.panels.filter((p) => getStatus(p.value, p.min, p.max) === "normal").length;
  const total       = cbc.panels.length;

  return (
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
      </div>
    </>
  );
}