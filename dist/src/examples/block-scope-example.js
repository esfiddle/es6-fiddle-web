'use strict';

window.es6Example.blockScope = {};

window.es6Example.blockScope.code = ['var x = 0;', '', 'for (let i = 0; i < 10; i++) {', '    x += 10;', '}', '', 'try {', '\tconsole.log(i);', '} catch(e) {', '\tconsole.log(', '\t\t\'i does not exist here!\'', '\t);', '}', ''].join('\n');

window.es6Example.blockScope.display = 'Block Scope';
