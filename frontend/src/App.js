import LandingPage from "./LandingPage";
import Dashboard from "./dashboard";
import LoadingPage from "./loading";
import "./App.css";

export default function App() {
  return (
    <div className="app-split-view">
      <div className="landing-section">
        <LandingPage />
      </div>
      <div className="loading">
        <LoadingPage />
      </div>
      <div className="dashboard-section">
        <Dashboard />
      </div>
    </div>
  );
}
