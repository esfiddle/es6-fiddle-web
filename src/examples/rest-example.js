window.es6Example.rest = {};

window.es6Example.rest.code = [
    'function format(str, ...args) {',
    '\treturn str.replace(/\\{\\s*(\\d+)\\s*\\}/g, function(m, n) {',
    '\t\treturn args[n];',
    '\t});',
    '}',
    '',
    'let msg = format(',
    '\t\'The {0}st arg is a string, the {1} are {2}.\',',
    '\t1,',
    '\t\'rest\',',
    '\t\'unknown\'',
    ');',
    '',
    'console.log(msg);',
    ''
].join('\n');

window.es6Example.rest.display = 'Rest Parameters';
