/* global window */
window.es8Example = window.es8Example || {};
window.es8Example.strpadding = {};

window.es8Example.strpadding.code =
`const string = 'esfiddle';

// Pad the string to reach the desired length
// By default it pads the string with spaces

// In our case the string is 8 characters long
// So we need to pad start 10 to add 2 spaces to the front

console.log(string.padStart(5)); // => Nothing happens because our string is already > 5 characters
console.log(string.padStart(10)); // => Returns 'esfiddle' with 2 spaces at the front

// You can also customize the string pad character
console.log(string.padStart(20, 'tada!'));

// The reverse method padEnd works the same way as pad start
// But pads the end of the string

console.log(string.padEnd(10)); // => Will return the string with 2 spaces at the end this time.`;

window.es8Example.strpadding.display = 'String Padding';
