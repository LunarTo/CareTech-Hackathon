//Only file we need for inputting the lab report 
//Step 1

//Optional (make pdf into csv)

//Parse CSV

//importing things we need to parse
const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Readable } = require('stream');

//Init app
const app = express();
app.use(cors());
app.use(express.json());

const results = [];
const upload = multer({storage: multer.memoryStorage()});

function convertTypes(row) {
  const newRow = {};

  for (let key in row) {
    const value = row[key].trim();

    //changes string to number to compare the values later
    if (value !== "" && !isNaN(value)) {
      newRow[key] = Number(value);
    } else {
      newRow[key] = value;
    }
  }

  return newRow;
}

function analyzeResults(data){
  const analysis = [];

  const wbc = data.find(r => r.Test === "WBC");
  if (wbc) {
    let status = "normal";
    if (wbc.Value > 11) status = "above normal";
    else if (wbc.Value < 4) status = "below normal";
    analysis.push({ test: "WBC", value: wbc.Value, status });
  }

  const rbc = data.find(r => r.Test === "RBC");
  if (rbc){
    let status = "normal";
    if (rbc.Value > 6) status = "above normal";
    else if (rbc.Value < 4) status = "below normal";
    analysis.push({ test: "RBC", value: rbc.Value, status });
  } 

  const hb = data.find(r => r.Test === "Hgb");
  if (hb){
    let status = "normal";
    if (hb.Value > 17) status = "above normal";
    else if (hb.Value < 13) status = "below normal";
    analysis.push({ test: "Hgb", value: hb.Value, status });
  }
  
  const hct = data.find(r => r.Test === "Hct");
  if (hct){
    let status = "normal";
    if (hct.Value > 53) status = "above normal";
    else if (hct.Value < 41) status = "below normal";
    analysis.push({ test: "Hct", value: hct.Value, status });
  } 

  const mcv = data.find(r => r.Test === "MCV");
  if (mcv){
    let status = "normal";
    if (mcv.Value > 100) status = "above normal";
    else if (mcv.Value < 80) status = "below normal";
    analysis.push({ test: "MCV", value: mcv.Value, status });
  } 

  return analysis;
}

app.get('/api/lab-results', (req, res) =>{
  res.json({success: true, data: results});
});

app.get('/api/lab-results/analysis', (req, res) => {
  const analysis = analyzeResults(results);
  res.json({success: true, analysis});
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  const results = [];
  const bufferStream = Readable.from(req.file.buffer.toString());
  bufferStream
    .pipe(csv())
    .on('data', (row) => {
      results.push(convertTypes(row));
    })
    .on('end', () => {
      const analysis = analyzeResults(results);
      res.json({ success: true, data: results, analysis });
    })
    .on('error', (err) => {
      res.status(500).json({ success: false, error: err.message });
    });
});

//reads the csv file, and compares the data with healthcare standards
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (row) => {
    results.push(convertTypes(row));
  })
  .on('end', () => {
    fs.writeFileSync(
      'data.json',
      JSON.stringify(results, null, 2)
    );
    console.log('Converting to numbers');

    
    const wbc = results.find(r => r.Test === "WBC");

        if(wbc){
        if (wbc.Value > 11) {
        console.log("WBC is above normal");
        } else if (wbc.Value < 4) {
        console.log("WBC is below normal");
        } else {
        console.log("WBC is normal");
        }
    }

    app.listen(3000, () => {
      console.log('Server running on port 3000 - ready to accept requests');
    });
  });

/*
important things to look for are blood pressure, White blood cells and what they mean
*/



