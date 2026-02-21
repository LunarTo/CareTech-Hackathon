import { useEffect, useState } from "react";
import "./loading.css";

const LogoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
  </svg>
);

const STEPS = [
  "Generating dashboard",
];

export default function LoadingPage() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep >= STEPS.length - 1) return;
    const id = setTimeout(() => setActiveStep((s) => s + 1), 1400);
    return () => clearTimeout(id);
  }, [activeStep]);

  return (
    <div className="loading-root">

      {/* Header */}
      <header className="loading-header">
        <div className="loading-logo">
          <div className="loading-logo-icon"><LogoIcon /></div>
          <div className="loading-logo-text">Simple <span>CBC</span></div>
        </div>
        <div className="loading-header-badge">For Nurses &amp; Patients</div>
      </header>

      {/* Body */}
      <div className="loading-body">

        {/* Dual-ring spinner */}
        <div className="loading-spinner-wrap">
          <div className="loading-ring loading-ring-outer" />
          <div className="loading-ring loading-ring-inner" />
          <div className="loading-icon-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
        </div>

        <div>
          <h1 className="loading-title">Analysing your results</h1>
          <p className="loading-subtitle">
            This usually takes just a moment. Your blood work data is being processed.
          </p>
        </div>

        {/* Step pills */}
        <div className="loading-steps">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`loading-step${i === activeStep ? " active" : i < activeStep ? " done" : ""}`}
            >
              <span className="loading-step-dot" />
              {label}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
