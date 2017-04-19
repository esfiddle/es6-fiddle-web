'use strict';

window.es6Example.promise = {};

window.es6Example.promise.code = ['var longFn = function() {', '\treturn new Promise(function(res, rej) {', '\t\tsetTimeout(res, 1000);', '\t});', '};', '', 'var coolFn = function() {', '\tconsole.log(\'cool\');', '};', '', '// logs cool after 1 second', 'longFn().then(coolFn);'].join('\n');

window.es6Example.promise.display = 'Promises';
