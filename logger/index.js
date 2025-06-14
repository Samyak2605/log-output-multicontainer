const fs = require('fs');
const path = '/usr/logs/output.log';
const { v4: uuidv4 } = require('uuid');

const id = uuidv4();

setInterval(() => {
  const log = `${new Date().toISOString()}: ${id}\n`;
  fs.appendFileSync(path, log);
}, 5000);
