window.es6Example.defaultParam = {};

window.es6Example.defaultParam.code = [
    'function sayMsg(msg=\'This is a default message.\') {',
    '\tconsole.log(msg);',
    '}',
    '',
    'sayMsg();',
    'sayMsg(\'This is a different message!\');',
    ''
].join('\n');

window.es6Example.defaultParam.display = 'Default Parameters';
