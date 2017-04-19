window.es6Example.internationalization = {};

window.es6Example.internationalization.code =
`let l10nDE = new Intl.Collator("de"); // German
let l10nSV = new Intl.Collator("sv"); // Sweden
/* Language sensitive string comparison using Collator */
// German 'ä' sorts with a
// Swedish 'ä' sorts after z
console.log(l10nDE.compare('ä','z'));// negative value
console.log(l10nSV.compare('ä','z'));// positive value
console.log(['ä','a','z'].sort(l10nDE.compare)); // ['a','ä','z']
console.log(['ä','a','z'].sort(l10nSV.compare)); // ["a", "z", "ä"]

/* Date Time Format */
let l10nUS = new Intl.DateTimeFormat("en-US"); // English - US
let l10nGB = new Intl.DateTimeFormat("en-GB"); // English - GB
let l10nEG = new Intl.DateTimeFormat("ar-EG"); // Arabic
let date = new Date(Date.UTC(2016, 1, 19, 19, 19, 19));

console.log(l10nUS.format(date)); // US follows month/day/year format
console.log(l10nGB.format(date)); // GB follows day/month/year format
console.log(l10nEG.format(date)); // Arabic uses thier own arabic digits

/* Number Format */
let l10nDEnum = new Intl.NumberFormat('de-DE');
let l10nINnum = new Intl.NumberFormat('en-IN');
let number = 9876532.10;
//German number system uses periods for thousands and comma for decimal
console.log(l10nDEnum.format(number));
// Indian number system uses thousands,lakhs,crores as separators
console.log(l10nINnum.format(number));

// Currency formatting
let l10nUSD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
let l10nJPY = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });

console.log(l10nUSD.format(number)); // Number formatted with $ symbol
console.log(l10nJPY.format(number)); // Japan drops sub unit
`;

window.es6Example.internationalization.onStart =
`
console.log('Internationalization and Localization');
console.log('Internationalization API is provided in ES6 by using the Intl object. It provides language sensitive string comparison, number formatting, and date and time formatting.');
`;

window.es6Example.internationalization.display = 'Internationalization and Localization';
