const fs = require('fs');
const { exec, execSync } = require('child_process');

const detectPasswordSpray = () => {
  const buffer = fs.readFileSync(`${__dirname}/security.json`);
  let logs = JSON.parse(buffer);
  const explicit = new Map();
  const failed = new Map();
  let totalExpl = 0;
  let totalFail = 0;

  logs.forEach(elem => {
    if (elem.EventData) {
      const name = elem.EventData.TargetUserName;

      if (elem.System.EventID['$'] === 4648) {
        if (explicit.has(name)) explicit.set(name, 1 + explicit.get(name));
        else explicit.set(name, 1);
        totalExpl++;
      }

      if (elem.System.EventID['$'] === 4625) {
        if (failed.has(name)) failed.set(name, 1 + failed.get(name));
        else failed.set(name, 1);
        totalFail++;
      }

    }
  });

  console.log(explicit);
  console.log('Total explicit logons: ', totalExpl);
  console.log(failed);
  console.log('Total failed logons: ', totalFail);
}



execSync('pip3 install --user xmljson python-evtx');
const cmd = 'python3 evtx2json.py process_files -f Security.evtx';
exec(cmd, detectPasswordSpray);
