// Backend: reads CSV (file or upload), serves CBC data for dashboard
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Readable } = require('stream');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory: file-loaded results + last upload (so GET /api/cbc can return latest)
let results = [];
let lastUploadedResults = null;

const upload = multer({ storage: multer.memoryStorage() });

function convertTypes(row) {
  const newRow = {};
  for (let key in row) {
    const value = String(row[key] ?? '').trim();
    if (value !== '' && !isNaN(value)) {
      newRow[key] = Number(value);
    } else {
      newRow[key] = value;
    }
  }
  return newRow;
}

// Map CSV Test names to dashboard panel ids (and normal ranges)
const CBC_MAP = {
  RBC:   { id: 'rbc', label: 'Red Blood Cells',  icon: '🔴', unit: 'M/µL', min: 4.2,  max: 5.4,  descNormal: 'Red blood cells carry oxygen. Your count is healthy.', descLow: 'Red blood cell count is low.', descHigh: 'Red blood cell count is high.' },
  WBC:   { id: 'wbc', label: 'White Blood Cells', icon: '⚪', unit: 'K/µL', min: 4.5,  max: 11.0, descNormal: 'White blood cells are your immune system\'s soldiers. Your level shows a strong, balanced immune response.', descLow: 'White blood cell count is low.', descHigh: 'White blood cell count is high.' },
  Hgb:   { id: 'hgb', label: 'Hemoglobin',        icon: '🩸', unit: 'g/dL', min: 12.0, max: 16.0, descNormal: 'Hemoglobin carries oxygen in red blood cells. You\'re within the normal range.', descLow: 'Hemoglobin is slightly low — this may explain mild fatigue.', descHigh: 'Hemoglobin is above normal range.' },
  Hct:   { id: 'hct', label: 'Hematocrit',        icon: '💧', unit: '%',    min: 37,   max: 47,   descNormal: 'Hematocrit measures the proportion of your blood made up of red cells. You\'re within the normal range.', descLow: 'Hematocrit is below normal.', descHigh: 'Hematocrit is above normal.' },
  Plt:   { id: 'plt', label: 'Platelets',         icon: '🟡', unit: 'K/µL', min: 150,  max: 400,  descNormal: 'Platelets help your blood clot. Your count is comfortably within the healthy range.', descLow: 'Platelet count is low.', descHigh: 'Platelet count is high.' },
  MCV:   { id: 'mcv', label: 'MCV',               icon: '🔵', unit: 'fL',   min: 80,   max: 100,  descNormal: 'MCV measures the average size of your red blood cells. You\'re within the normal range.', descLow: 'Slightly small cells can be an early indicator of iron deficiency.', descHigh: 'MCV is above normal range.' },
};

function getDescription(meta, value) {
  if (value < meta.min) return meta.descLow;
  if (value > meta.max) return meta.descHigh;
  return meta.descNormal;
}

function rawToCBC(data) {
  const panels = [];
  for (const [testName, meta] of Object.entries(CBC_MAP)) {
    const row = data.find((r) => r.Test === testName);
    if (!row || typeof row.Value !== 'number') continue;
    panels.push({
      id: meta.id,
      label: meta.label,
      icon: meta.icon,
      value: row.Value,
      unit: meta.unit,
      min: meta.min,
      max: meta.max,
      description: getDescription(meta, row.Value),
    });
  }
  const normalCount = panels.filter((p) => p.value >= p.min && p.value <= p.max).length;
  const total = panels.length;
  let summary = 'Your blood work looks generally healthy — most values are within normal range.';
  if (normalCount < total) {
    summary = `Your blood work shows ${normalCount} of ${total} values in normal range. ${total - normalCount} ${total - normalCount === 1 ? 'value needs' : 'values need'} attention.`;
  }
  return {
    patientName: 'Lab Report',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    summary,
    panels,
  };
}

function analyzeResults(data) {
  const analysis = [];
  const wbc = data.find((r) => r.Test === 'WBC');
  if (wbc) {
    let status = 'normal';
    if (wbc.Value > 11) status = 'above normal';
    else if (wbc.Value < 4) status = 'below normal';
    analysis.push({ test: 'WBC', value: wbc.Value, status });
  }
  const rbc = data.find((r) => r.Test === 'RBC');
  if (rbc) {
    let status = 'normal';
    if (rbc.Value > 6) status = 'above normal';
    else if (rbc.Value < 4) status = 'below normal';
    analysis.push({ test: 'RBC', value: rbc.Value, status });
  }
  const hb = data.find((r) => r.Test === 'Hgb');
  if (hb) {
    let status = 'normal';
    if (hb.Value > 17) status = 'above normal';
    else if (hb.Value < 13) status = 'below normal';
    analysis.push({ test: 'Hgb', value: hb.Value, status });
  }
  const hct = data.find((r) => r.Test === 'Hct');
  if (hct) {
    let status = 'normal';
    if (hct.Value > 53) status = 'above normal';
    else if (hct.Value < 41) status = 'below normal';
    analysis.push({ test: 'Hct', value: hct.Value, status });
  }
  const mcv = data.find((r) => r.Test === 'MCV');
  if (mcv) {
    let status = 'normal';
    if (mcv.Value > 100) status = 'above normal';
    else if (mcv.Value < 80) status = 'below normal';
    analysis.push({ test: 'MCV', value: mcv.Value, status });
  }
  return analysis;
}

// GET /api/cbc — dashboard-ready CBC (from last upload or file-loaded data)
app.get('/api/cbc', (req, res) => {
  const data = lastUploadedResults && lastUploadedResults.length > 0 ? lastUploadedResults : results;
  if (!data || data.length === 0) {
    return res.status(404).json({ success: false, error: 'No lab results available. Upload a CSV or add data.csv.' });
  }
  res.json({ success: true, cbc: rawToCBC(data) });
});

app.get('/api/lab-results', (req, res) => {
  const data = lastUploadedResults && lastUploadedResults.length > 0 ? lastUploadedResults : results;
  res.json({ success: true, data });
});

app.get('/api/lab-results/analysis', (req, res) => {
  const data = lastUploadedResults && lastUploadedResults.length > 0 ? lastUploadedResults : results;
  res.json({ success: true, analysis: analyzeResults(data) });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  const parsed = [];
  const bufferStream = Readable.from(req.file.buffer.toString());
  bufferStream
    .pipe(csv())
    .on('data', (row) => parsed.push(convertTypes(row)))
    .on('end', () => {
      lastUploadedResults = parsed;
      const analysis = analyzeResults(parsed);
      res.json({ success: true, data: parsed, analysis, cbc: rawToCBC(parsed) });
    })
    .on('error', (err) => {
      res.status(500).json({ success: false, error: err.message });
    });
});

function loadDataCsv(cb) {
  const csvPath = path.join(__dirname, 'data.csv');
  if (!fs.existsSync(csvPath)) {
    return cb();
  }
  const out = [];
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => out.push(convertTypes(row)))
    .on('end', () => {
      results = out;
      console.log('Loaded data.csv:', out.length, 'rows');
      cb();
    })
    .on('error', (err) => {
      console.warn('data.csv read error:', err.message);
      cb();
    });
}

loadDataCsv(() => {
  app.listen(PORT, () => {
    console.log('Backend running on http://localhost:' + PORT + ' - ready to accept requests');
  });
});
