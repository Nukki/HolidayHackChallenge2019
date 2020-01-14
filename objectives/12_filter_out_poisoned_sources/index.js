const fs = require('fs');

const raw = fs.readFileSync(__dirname + '/http.log');
const arr = JSON.parse(raw);
const xss = new Set();
const lfi  = new Set();
const sqli = new Set();
const shell = new Set();
const pivot = new Set();
const userAgentsInQuestion = new Set();
const hostsInQuestion = new Set();

// get definitely bad IPs
arr.forEach(entry => {
  if (entry.uri.includes('<script>')) {
    xss.add(entry['id.orig_h']);
    userAgentsInQuestion.add(entry.user_agent);
  }
  if (entry.host.includes('<script>')) {
    xss.add(entry['id.orig_h']);
  }
  if (entry.uri.includes('etc/')) {
    lfi.add(entry['id.orig_h']);
    userAgentsInQuestion.add(entry.user_agent);
  }
  if (entry.uri.includes('SELECT')) {
    sqli.add(entry['id.orig_h']);
    userAgentsInQuestion.add(entry.user_agent);
  }
  if (entry.user_agent.includes('SELECT') || entry.username.includes('\' or')) {
    sqli.add(entry['id.orig_h']);
  }
  if (entry.user_agent.includes('() { :; };') ) {
    shell.add(entry['id.orig_h']);
    hostsInQuestion.add(entry.host);
  }
});

const defBad = new Set([...xss, ...lfi, ...sqli, ...shell]);
arr.forEach(entry => {
  if (!defBad.has(entry['id.orig_h']) && (userAgentsInQuestion.has(entry.user_agent) || hostsInQuestion.has(entry.host)))
    pivot.add(entry['id.orig_h']);
})

const final = [...defBad, ...pivot];
console.log(`Found:
${xss.size} xss
${lfi.size} lfi
${sqli.size} sqli
${shell.size} shellshock
${pivot.size} from pivoting
${final.length} total`)
console.log(final.join(','));
