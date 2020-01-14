
const ocrApiKey = 'your api key here';
const answers = new Array(10).fill(0);
const fillAnswers = () => {
  answers.forEach((an, i) => {
    if (an) {
      const input = document.querySelector(`.c${i + 1} > input`);
      const event = new Event('input', { bubbles: true });
      input.value = an;
      input.dispatchEvent(event);
      document.querySelector(`.c${i + 1} > button`).click();
    }
  });
};

// ------------------------------------- Lock 1 --------- and seed -------------
let seed;
const leVar = Object.keys(window).filter(el => el.match(/_0x/)).filter(el => window[el] instanceof Array);
const leArray = window[leVar[0]];
const deobfuscated = leArray.map(el => atob(el));
deobfuscated.forEach(el => {
  if (el.match(/^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/)) seed = el;
  if (el.match(/%c.*[A-Z0-9]{8}/)) answers[0] = el.split('%c')[2].trim();
});
// ------------------------------------- Lock 3 --------------------------------
fetch(`https://api.ocr.space/parse/imageurl?apikey=${ocrApiKey}&url=https://sleighworkshopdoor.elfu.org/images/${seed}.png`)
    .then(res => res.json())
    .then(data => {
      let parsedText = data.ParsedResults[0].ParsedText;
      answers[2] = parsedText.replace('0', 'O').replace('@', '0');
      fillAnswers();
    });
// ------------------------------------- Lock 2 --------------------------------
answers[1] = $('strong').innerText;
// ------------------------------------- Lock 4 --------------------------------
answers[3] = localStorage['🛢️🛢️🛢️'];
// ------------------------------------- Lock 5 --------------------------------
answers[4] = document.title.slice(-8);
// ------------------------------------- Lock 6 --------------------------------
const perspective = [];
perspective.push($('.ZADFCDIV').innerText);
perspective.push($('.GMSXHBQH').innerText);
perspective.push($('.RPSMZXMY').innerText);
perspective.push($('.IDOIJIKV').innerText);
perspective.push($('.KXTBRPTJ').innerText);
perspective.push($('.AJGXPXJV').innerText);
perspective.push($('.ZWYRBISO').innerText);
perspective.push($('.KPVVBGSG').innerText);
answers[5] = perspective.join('');
// ------------------------------------- Lock 7 --------------------------------
answers[6] = $('style').innerText.split("'")[1];
// ------------------------------------- Lock 8 --------------------------------
answers[7] = getEventListeners($('.eggs')).spoil[0].listener.toString().split("'")[1];
// ------------------------------------- Lock 9 --------------------------------
let activeBois = '';
let rules = document.styleSheets[0].rules;
for (let item of rules) {
  if (item.selectorText && item.selectorText.includes('span.chakra:nth-child')) {
    if (item.style.content) activeBois += item.style.content;
  }
  if (item.selectorText && item.selectorText.includes('.locks > li > .lock::after')) {
    item.style.transitionDuration = '0s';
  }
}
answers[8] = activeBois.split('"').join('');
// ------------------------------------- Lock 10 -------------------------------
$('.cover').remove();
let macaroni = document.createElement('div');
macaroni.setAttribute('class', 'component macaroni');
macaroni.setAttribute('data-code', 'A33');
let swab = document.createElement('div');
swab.setAttribute('class', 'component swab');
swab.setAttribute('data-code', 'J39');
let gnome = document.createElement('div');
gnome.setAttribute('class', 'component gnome');
gnome.setAttribute('data-code', 'XJ0');
$('.c10').appendChild(macaroni);
$('.c10').appendChild(swab);
$('.c10').appendChild(gnome);
answers[9] = 'kd29xj37';
