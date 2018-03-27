/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.symbol = {};

window.es6Example.symbol.code = `const tiger = Symbol('cat');
const lion = Symbol('cat');

console.log(tiger === lion);
console.log(tiger == lion);`;

window.es6Example.symbol.display = "Symbols";
