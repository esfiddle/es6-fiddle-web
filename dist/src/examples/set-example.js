'use strict';

window.es6Example.set = {};

window.es6Example.set.code = ['let x = new Set([1, 2, 3, 4, 4, 4, 5]);', '', 'x.add(6);', 'x.delete(2);', '', 'console.log(\'The set contains\', x.size, \'elements.\');', 'console.log(\'The set has 1:\', x.has(1));', 'console.log(\'The set has 8:\', x.has(8));', '', '//values and keys are the same in a set', 'x.forEach((value, key, set) => console.log(value, key, set));', '', '//iterable', 'for (let value of x) {', '  console.log(value);', '}', '', '//iterable values', 'for (let value of x.values()) {', '  console.log(value);', '}', '', '//iterable keys', 'for (let value of x.keys()) {', '  console.log(value);', '}', '', '//iterable entries (key, value)', 'for (let value of x.entries()) {', '  console.log(value);', '}'].join('\n');

window.es6Example.set.display = 'Set';
