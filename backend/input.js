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
  });

/*
important things to look for are blood pressure, White blood cells and what they mean
*/



//Step2