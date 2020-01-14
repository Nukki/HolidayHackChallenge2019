const fs = require('fs');
const { exec } = require('child_process');
const axios = require('axios');
const chalk = require('chalk');
const crypto = require("crypto");

const linearCongruentialGenerator = (seed) => {
  let theSeed = seed;
  const randomFunction = () => {
    theSeed = (214013 * theSeed + 2531011) & 0x7fffffff;
    return theSeed >> 16;
  };
  return randomFunction;
}

const generateKey = (seed) => {
  let rando = linearCongruentialGenerator(seed);
  let key = [];
  for (let i = 0; i < 8; i++) {
    key.push(rando());
  }
  return Buffer.from(key).toString('hex');
}

const decrypt = (key) => {
  let k = Buffer.from(key, 'hex');
  let iv = Buffer.from('0000000000000000', 'hex');
  let encrypted = fs.readFileSync(__dirname + '/ElfUResearchLabsSuperSledOMaticQuickStartGuideV1.2.pdf.enc')
  let decipher = crypto.createDecipheriv("DES-CBC", k, iv);
  let decrypted = decipher.update(encrypted);
  try {
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    if (decrypted.toString().substring(0, 4) === '%PDF') {
      fs.writeFileSync(__dirname + '/decrypted/doc.pdf', decrypted);
      console.log(chalk.green(`Key: ${key} Decryption success!`));
    }
    // otherwise decrypted is not a valid PDF
  } catch(err) {
    // failed decrypting a block, printing this err makes a lot of noise
  }
}

const decryptSlow = (key) => {
  let date = new Date(seed*1000).toGMTString();
  axios.post('http://elfscrow.elfu.org/api/store', key)
   .then(response => {
      const uuid = response.data;
      const cmd = `wine ~/.wine/drive_c/elfscrow.exe --decrypt --id=${uuid} ElfUResearchLabsSuperSledOMaticQuickStartGuideV1.2.pdf.enc  decrypted2/${key}.pdf --insecure `;
      exec(cmd, (err, stdout, stderr) => {
        // any output goes to stderr with wine
        stderr && stderr.includes('decrypted') && console.log(chalk.blue(`${date} Key: ${key}`) ,chalk.green(' -- Success!!!!!!!'));
        stderr && stderr.includes('wrong') && console.log(chalk.blue(`${date} Key: ${key}`),chalk.red(' -- Not Decrypted'));
      });
   })
   .catch(error => console.log(chalk.magenta(error.message)));
}

const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

const brute = () => {
  const begin = Date.UTC(2019, 11, 6, 19) / 1000
  const end = Date.UTC(2019, 11, 6, 21) / 1000
  for (let seed = begin; seed <= end; seed++) {
    // await delay().then(() => decryptSlow(generateKey(seed)));
    decrypt(generateKey(seed));
  }
}
console.time(brute);
brute();
console.timeEnd(brute);
