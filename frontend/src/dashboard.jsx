import { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from "recharts";

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
};

// ─── Status colors ────────────────────────────────────────────────────────────
const STATUS = {
  normal: { color: "#16a34a", label: "Normal" },
  low: { color: "#ea580c", label: "Low" },
  high: { color: "#db2777", label: "High" },
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
      </div>
      <span>{isDark ? "🌙 Dark" : "☀️ Light"}</span>
    </button>
  );
}

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
    </div>
  );
}

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
        </div>
      </div>

      <GaugeBar value={panel.value} min={panel.min} max={panel.max} status={status} t={t} />

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: t.textSubtle, fontFamily: "'DM Sans', sans-serif" }}>
        <span>↓ {panel.min}</span>
        <span style={{ color: t.textMuted }}>Normal range</span>
        <span>↑ {panel.max}</span>
      </div>

      {isSelected && (
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
          {panel.description}
        </p>
      )}
    </div>
  );
}

function RadialOverview({ panels, t }) {
  const data = panels.map((p) => ({
    name: p.label,
    value: Math.round(getPercent(p.value, p.min, p.max)),
    fill: STATUS[getStatus(p.value, p.min, p.max)].color,
  }));

  return (
    <div style={{ height: 220, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="28%" outerRadius="92%" data={data} startAngle={200} endAngle={-20}>
          <RadialBar dataKey="value" cornerRadius={5} background={{ fill: t.radialBg }} />
          <Tooltip
            contentStyle={{
              background: t.tooltipBg,
              border: `1px solid ${t.tooltipBorder}`,
              borderRadius: 12,
              color: t.text,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
            }}
            formatter={(v, _, props) => [`${props.payload.name}: ${v}% of range`]}
            labelFormatter={() => ""}
          />
        </RadialBarChart>
      </ResponsiveContainer>
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
      </div>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────
export default function CBCDashboard() {
  const [cbc, setCbc] = useState({ patientName: "Loading...", date: "", summary: "", panels: [] });
  const [selected, setSelected] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(true);

  const t = THEMES[isDark ? "dark" : "light"];

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
