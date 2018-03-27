/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.spread = {};

window.es6Example.spread.code = `function add(a, b) {
  return a + b;
}

let nums = [5, 4];

console.log(add(...nums));`;

window.es6Example.spread.display = "Spread Operator";
