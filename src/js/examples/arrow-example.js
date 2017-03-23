/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.arrow = {};

window.es6Example.arrow.code =
`
let square = x => x * x;
let add = (a, b) => a + b;
let pi = () => 3.1415;

console.log(square(5));
console.log(add(3, 4));
console.log(pi());`;

window.es6Example.arrow.onStart =
`
console.log('Example: Arrow Functions');
console.log('Description: This example code is designed to show how to use arrow functions in es6.  There are a few different syntax that can be used.');
`;

window.es6Example.arrow.display = 'Arrow Functions';
