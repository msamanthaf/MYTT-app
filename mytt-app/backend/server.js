const express = require('express');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json()); 


app.post('/process-data', (req) => {
    const data = req.body; 

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    
    const filePath = path.join(__dirname, 'output.csv');

    
    fs.writeFile(filePath, csv, (err) => {
        if (err) {
            console.error('Error writing to CSV:', err);
            return res.status(500).send('Error writing to CSV');
        }
        res.send('Data has been saved to CSV!');
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
