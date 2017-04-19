/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.map = {};

window.es6Example.map.code =
`let x = new Map([[1, 'is a number key']]);
let today = new Date()

//anything can be a key
x.set(today.toString(), 111)
x.set(today, 222);
x.delete(today.toString());

console.log('The map contains', x.size, 'elements.');
console.log('The map has a today Date key:', x.has(today));
console.log('The map has a today string key:', x.has(today.toString()));

//values and keys
x.forEach((value, key, map) => console.log(value, key, map));

//iterable
for (let value of x) {
  console.log(value);
}

//iterable values
for (let value of x.values()) {
  console.log(value);
}

//iterable keys
for (let value of x.keys()) {
  console.log(value);
}

//iterable entries (key, value)
for (let value of x.entries()) {
  console.log(value);
}`;

window.es6Example.map.onStart =
`
console.log('Map');
console.log('Map is an iterable object that stores key-value pairs. Methods like get, set, delete, and more are provided.');
`;

window.es6Example.map.display = 'Map';
