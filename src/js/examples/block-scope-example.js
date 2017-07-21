/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.blockScope = {};

window.es6Example.blockScope.code =
`var x = 0;

for (let i = 0; i < 10; i++) {
    x += 10;
}

try {
  console.log(i);
} catch(e) {
  console.log(
    'i does not exist here!'
  );
}
`;

window.es6Example.blockScope.onStart =
`
console.log('Block Scope');
console.log('Block Scoping was introduced in ES6 with declaration such as let and const.  Both let and const are block scoped meaning that if they are declared inside a block (I.E inside for loop, if block, etc), it is only accessible inside the block.');
`;

window.es6Example.blockScope.display = 'Block Scope';
