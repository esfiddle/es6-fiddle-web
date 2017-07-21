/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.spread = {};

window.es6Example.spread.code =
`function add(a, b) {
  return a + b;
}

let nums = [5, 4];

console.log(add(...nums));`;

window.es6Example.spread.onStart =
`
console.log('Spread Operator');
console.log('Spread Operator allows us to break an iterable object into individual elements.');
`;

window.es6Example.spread.display = 'Spread Operator';
