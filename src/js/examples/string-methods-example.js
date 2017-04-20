/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.stringMethods = {};

window.es6Example.stringMethods.code =
`let coolString = 'Hello World';
const secretMessage = '123jeffrey456';

coolString += '!'.repeat(3);

if (coolString.startsWith('Hello')) {
  console.log('String is a greeting.');
}

if (coolString.endsWith('!!!')) {
  console.log(coolString);
  console.log('Speaker is quite excited');
}

if (secretMessage.includes('jeffrey')) {
  console.log('Message is for Jeffrey');
}`;

window.es6Example.stringMethods.onStart =
`
console.log('String Methods');
console.log('Examples of new String methods such as startsWith, endsWith and includes');
`;

window.es6Example.stringMethods.display = 'String Methods';
