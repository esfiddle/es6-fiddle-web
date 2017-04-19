/* global window */
window.es7Example = window.es7Example || {};
window.es7Example.exponentiation = {};

window.es7Example.exponentiation.code =
`let square = 3 ** 2;
console.log(square);

let num = 3;
num **= 2;
console.log(num);
`;

window.es7Example.exponentiation.onStart =
`
console.log('Exponentiation Operator');
console.log('Exponentiation Operator is similar to Math.pow() such that the base is on the left side and exponent on the right side.');
`;

window.es7Example.exponentiation.display = 'Exponentiation Operator';
