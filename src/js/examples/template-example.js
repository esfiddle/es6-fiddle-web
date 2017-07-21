/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.template = {};

window.es6Example.template.code =
`let person = {name: 'John Smith'};
let intro = \`My name is \${person.name}.\`;

console.log(intro);`;

window.es6Example.template.onStart =
`
console.log('Template Literals');
console.log('Template Literals provides a way to insert JavaScript expressions into a string.');
`;

window.es6Example.template.display = 'Template Literals';
