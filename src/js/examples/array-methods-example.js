/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.arrayMethods = {};

window.es6Example.arrayMethods.code =
`// Static Methods
const alphabet = Array.from('abcdefghijklmnopqrstuvwxyz');
const sevenArray = Array.of(7);

console.log(alphabet);
console.log(sevenArray, ' is not ', Array(7));

// Iteration
const entriesIterator = alphabet.entries();
const keysIterator = alphabet.keys();
const valuesIterator = alphabet.values();

console.log(entriesIterator.next().value, entriesIterator.next().value, entriesIterator.next().value);
console.log(keysIterator.next().value, keysIterator.next().value, keysIterator.next().value);
console.log(valuesIterator.next().value, valuesIterator.next().value, valuesIterator.next().value);

// Search
const numbers = [1, 2, 3, 4, 5];
const found = numbers.find(x => x > 3);
const foundIndex = numbers.findIndex(x => x > 3);

console.log(found);
console.log(foundIndex);

// Modification
const copiedArray = ['a', 'b', 'c', 'd'];
copiedArray.copyWithin(2, 0, 2);
const greetingArray = ['hello', 'hi', 'hey'];
greetingArray.fill(7);

console.log(copiedArray);
console.log(greetingArray);`;

window.es6Example.arrayMethods.onStart =
`
console.log('Array Methods');
console.log('Examples of new array methods in ES6 such as from, of, next and find.');
`;

window.es6Example.arrayMethods.display = 'Array Methods';
