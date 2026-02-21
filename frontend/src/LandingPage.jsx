import { useState, useRef, useCallback } from "react";
import "./LandingPage.css";

const UploadIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="12" y1="18" x2="12" y2="12"/>
    <polyline points="9 15 12 12 15 15"/>
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);

const features = [
  "Interactive Charts",
  "Plain-English Explanations",
  "Normal Range Indicators",
  "Printable Summary",
  "No Account Required",
];

export default function LandingPage() {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState({ msg: "", type: "" });
  const fileInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file) return;
    if (!file.name.endsWith(".csv")) {
      setStatus({ msg: "⚠ Please upload a .csv file.", type: "error" });
      return;
    }
    setStatus({ msg: `✓ "${file.name}" ready — generating dashboard…`, type: "success" });
    // TODO: pass file to dashboard generation logic
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragActive(true); };
  const onDragLeave = () => setDragActive(false);
  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };
  const onInputChange = (e) => handleFile(e.target.files[0]);

  return (
    <div className="cbc-root">

      {/* Header */}
      <header className="cbc-header">
        <div className="cbc-logo">
          <div className="cbc-logo-icon"><LogoIcon /></div>
          <div className="cbc-logo-text">Simple <span>CBC</span></div>
        </div>
        <div className="cbc-header-badge">For Nurses &amp; Patients</div>
      </header>

      {/* Hero */}
      <section className="cbc-hero">
        <div className="cbc-eyebrow">Blood Work, Simplified</div>
        <h1>Understand your <em>lab results</em> at a glance</h1>
        <p>
          Upload a CBC report and instantly generate a clear, visual dashboard —
          designed to help patients truly understand what their blood work means.
        </p>
      </section>

      {/* Upload */}
      <div className="cbc-upload-section">
        <div
          className={`cbc-drop-zone${dragActive ? " active" : ""}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="cbc-upload-icon-wrap"><UploadIcon /></div>
          <div className="cbc-drop-title">Drop your CBC file here</div>
          <div className="cbc-drop-sub">
            Drag &amp; drop your CSV export, or click below<br />to browse from your device.
          </div>
          <button
            className="cbc-upload-btn"
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >
            <ArrowUpIcon /> Choose CSV File
          </button>
          <div className="cbc-divider">or drag and drop</div>
          <div className="cbc-file-hint">Accepts .csv files &nbsp;·&nbsp; HIPAA-conscious design</div>
        </div>

        <div className={`cbc-status ${status.type}`}>{status.msg}</div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          className="cbc-hidden-input"
          onChange={onInputChange}
        />
      </div>

      {/* Feature pills */}
      <div className="cbc-features">
        {features.map((f) => (
          <div className="cbc-pill" key={f}>
            <span className="cbc-pill-dot" />
            {f}
          </div>
        ))}
      </div>

    </div>
  );
}
