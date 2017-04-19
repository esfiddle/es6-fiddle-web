'use strict';

window.es6Example.generator = {};

window.es6Example.generator.code = ['function* range(start, end, step) {', '\twhile (start < end) {', '\t\tyield start;', '\t\tstart += step;', '\t}', '}', '', 'for (let i of range(0, 10, 2)) {', '\tconsole.log(i);', '}', ''].join('\n');

window.es6Example.generator.display = 'Generators';
