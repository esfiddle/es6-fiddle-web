/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.destructure = {};

window.es6Example.destructure.code =
`let [one, two] = [1, 2];
let {three, four} = {three: 3, four:  4};

console.log(one, two, three, four);
`;

window.es6Example.destructure.onStart =
`
console.log('Destructured Assignment');
console.log('Destruction assignment makes it possible to extract data from arrays and objects.');
`;

window.es6Example.destructure.display = 'Destructured Assignment';
