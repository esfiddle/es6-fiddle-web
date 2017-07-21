/* global window */
window.es7Example = window.es7Example || {};
window.es7Example.arrayIncludes = {};

window.es7Example.arrayIncludes.code =
`let array = ["a", "b", "c"];
console.log(array.includes("a"));`;

window.es7Example.arrayIncludes.onStart =
`
console.log('Array Includes');
console.log('Array includes() method determines if an array includes a certain element.');
`;

window.es7Example.arrayIncludes.display = 'Array Includes';
