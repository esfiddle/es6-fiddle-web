/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.rest = {};

window.es6Example.rest.code = `function format(str, ...args) {
  return str.replace(/\\{\\s*(\\d+)\\s*\\}/g, function(m, n) {
    return args[n];
  });
}

let msg = format(
  'The {0}st arg is a string, the {1} are {2}.',
  1,
  'rest',
  'unknown'
);

console.log(msg);`;

window.es6Example.rest.display = "Rest Parameters";
