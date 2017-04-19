/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.promise = {};

window.es6Example.promise.code =
`var longFn = function() {
  return new Promise(function(res, rej) {
    setTimeout(res, 1000);
  });
};

var coolFn = function() {
  console.log('cool');
};

// logs cool after 1 second
longFn().then(coolFn);`;

window.es6Example.promise.onStart =
`
console.log('Promises');
console.log('Promises are often used for asynchronous computations. This can be done by creating a new Promise object and calling the then() method. The method then() will execute once the function inside the Promise object is finished executing.');
`;

window.es6Example.promise.display = 'Promises';
