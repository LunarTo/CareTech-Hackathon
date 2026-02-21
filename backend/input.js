//Only file we need for inputting the lab report 
//Step 1

//Optional (make pdf into csv)

//Parse CSV

//importing things we need to parse
const fs = require('fs');
const csv = require('csv-parser');

const results = [];

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

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

function analyzeResults(data){
  const analysis = [];

  const wbc = data.find(r => r.Test === "WBC");
  if (wbc) {
    let status = "normal";
    if (wbc.Value > 11) status = "above normal";
    else if (wbc.Value < 4) status = "below normal";
    analysis.push({ test: "WBC", value: wbc.Value, status });
  }

  //Add more test check later

  return analysis;
}

app.get('/api/lab-results', (req, res) =>{
  res.json({success: true, data: results});
})

app.get('/api/lab-results/analysis', (req, res) => {
  const analysis = analyzeResults(results);
  res.json({success: true, analysis});
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



