const express = require('express');
const fs = require('fs');
const app = express();

const LOG_FILE = '/usr/logs/output.log';

app.get('/logs', (req, res) => {
  fs.readFile(LOG_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Cannot read logs.');
    res.type('text/plain').send(data);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Reader listening on port ${PORT}`);
});
