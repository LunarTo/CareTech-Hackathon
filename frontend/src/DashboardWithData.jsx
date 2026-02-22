import { useState, useEffect } from "react";
import Dashboard from "./dashboard";
import LoadingPage from "./loading";

const API_BASE = "http://localhost:3001";

export default function DashboardWithData() {
  const [loading, setLoading] = useState(true);
  const [cbc, setCbc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/cbc`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status === 404 ? "No lab results yet. Upload a CSV on the landing page." : "Failed to load results");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && data.success && data.cbc) {
          setCbc(data.cbc);
        } else if (!cancelled) {
          setError("Invalid response from server.");
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Could not reach the server. Is the backend running on port 3001?");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <LoadingPage />;
  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "'DM Sans', sans-serif",
        background: "#f7f3ee",
        color: "#0f1117",
      }}>
        <p style={{ marginBottom: 16, textAlign: "center" }}>{error}</p>
        <a href="/landing" style={{ color: "#2a9d8f", fontWeight: 600 }}>Go to landing page to upload a CSV</a>
      </div>
    );
  }
  return <Dashboard cbc={cbc} />;
}
