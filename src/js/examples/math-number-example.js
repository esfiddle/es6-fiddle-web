/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.mathNumber = {};

window.es6Example.mathNumber.code =
`//can specify integers in binary and octal
console.log("0b10 = ", 0b10);
console.log("0o10 = ", 0o10);

//new Number properties
console.log("Epsilon = ", Number.EPSILON);
console.log(Number.isInteger(1.5));
console.log(Number.isInteger(1));
console.log(isNaN("NaN"));
console.log(Number.isNaN("NaN"));

//new Math methods for returning sign and removing decimal fraction
console.log(Math.sign(-5));
console.log(Math.sign(5));

console.log(Math.trunc(5.5));

//new Math methods for computing log to base 10 and calculating Pythagoras’ theorem
console.log("Base 10 logarithm of 1000 = ", Math.log10(1000));
console.log("Hypotenuse of 6 and 8 = ", Math.hypot(6, 8));
`;

window.es6Example.mathNumber.onStart =
`
console.log('Math and Number features');
console.log('Examples of new Math and Number methods such as isInteger, isNaN, sign, and trunc.')
`;

window.es6Example.mathNumber.display = 'Math and Number features';
