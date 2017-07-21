/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.iterator = {};

window.es6Example.iterator.code =
`//new for-of loop allows iteration over built-in iterables like arrays
let array = [1, 2, 3, 4, 5];
let sum = 0;

for (let v of array) {
  sum += v;
}

console.log("1 + 2 + 3 + 4 + 5 =", sum);

//for-of loop works on arrays, strings, maps, sets, and other built-in iterables
for (var char of "TEST") {
    console.log(char);
}

//can break, continue, and return from for-of loops
for (let v of ["A", "B", "", "D"]) {
    if (v.length === 0) break;
    console.log(v);
}

//new Array.from can convert two kinds of values into an array, making them iterable
let arrayLike = { 0: "one", 1: "two", length: 2 };
let newArray = Array.from(arrayLike);
for (let v of newArray) {
    console.log(v);
}`;

window.es6Example.iterator.onStart =
`
console.log('Iterators');
console.log('Iterators provides a way to iterate through an array or object and perform actions on each individual element.');
`;

window.es6Example.iterator.display = 'Iterators';
