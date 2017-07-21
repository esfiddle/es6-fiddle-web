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
console.log('Arrow Functions');
console.log('Arrow Functions is a new syntax for defining functions. There are a few key difference when using arrow functions.  Such as the binding of keyword this, implicit returns, etc.');
`;

window.es6Example.arrow.display = 'Arrow Functions';
