const fs = require('fs').promises;
const csv = require('csv-parser');


const processCSV = async (csvFile: any) => {
    const resultArray: any = [];

    // Define your conditions for each column here
    const processRow = (row: any) => {
        const branchCode = row['branchCode'];
        const branchName = row['branchName'];
        
        const branch = { 
            branchName,
            branchCode,
        };
      
        resultArray.push(branch);
    }

    const fileStream = await fs.createReadStream(csvFile);
    fileStream.pipe(csv()).on('data', (row: any) => {
        processRow(row);
    });

    await new Promise((resolve) => {
        fileStream.on('end', resolve);
    });

    console.log(resultArray);
}

export default processCSV

// Replace 'your_csv_file.csv' with the path to your CSV file
// processCSV('../data/branch.csv');
