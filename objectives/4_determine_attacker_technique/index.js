const fs = require('fs');

const buffer = fs.readFileSync(`${__dirname}/sysmon-data.json`);
let logs = JSON.parse(buffer);

let lsass = logs.filter(elem => JSON.stringify(elem).includes('lsass'));
console.log(lsass);

logs.forEach(elem => {
  if (elem.ppid === lsass[0].pid)
    console.log('Cmd input: ', elem.command_line);
})
