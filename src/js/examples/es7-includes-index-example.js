/* global window */
window.es7Example = window.es7Example || {};
window.es7Example.arrayIndex = {};

window.es7Example.arrayIndex.code =
`let array = ["a", "b", "c", ,"e", NaN];

//array includes with fromIndex argument, no argument is equivalent to 0
console.log(array.includes("a", 0));
console.log(array.includes("a", 1));

//negative is used as the offset from end of array
console.log(array.includes("a", -6));
console.log(array.includes("a", -5));

//treats missing array elements as undefined
console.log(array.includes(undefined, 3));
console.log(array.includes(undefined, 4));

//able to detect NaN array elements
console.log(array.includes(NaN));`;

window.es7Example.arrayIndex.onStart =
`
console.log('Array Includes: Search from Index');
console.log('Array has an includes method can also search at a particular index for the element.');
`;

window.es7Example.arrayIndex.display = 'Array Includes: Search from Index';
