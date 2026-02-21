import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileLabel = useMemo(() => {
    if (!selectedFile) {
      return 'No CSV file selected';
    }

    return selectedFile.name;
  }, [selectedFile]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <h1 id="simple-cbc-title">Simple CBC</h1>
      </header>

      <section className="content-area" aria-labelledby="simple-cbc-title">
        <div className="upload-card">
          <p className="subtitle">
            Upload a complete blood count (CBC) CSV file to get started.
          </p>

          <label className="file-picker" htmlFor="cbc-file-input">
            <span>Select CSV File</span>
            <input
              id="cbc-file-input"
              type="file"
              accept=".csv,text/csv"
              onChange={handleFileChange}
            />
          </label>

          <p className="file-name" aria-live="polite">
            {fileLabel}
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
