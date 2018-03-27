/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.generator = {};

window.es6Example.generator.code = `function* range(start, end, step) {
  while (start < end) {
    yield start;
    start += step;
  }
}

for (let i of range(0, 10, 2)) {
  console.log(i);
}`;

window.es6Example.generator.display = "Generators";
