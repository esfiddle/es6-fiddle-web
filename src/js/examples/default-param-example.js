/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.defaultParam = {};

window.es6Example.defaultParam.code =
`var sayMsg = (msg='This is a default message.') => console.log(msg);

sayMsg();
sayMsg('This is a different message!');
`;

window.es6Example.defaultParam.onStart =
`
console.log('Default Parameters');
console.log('Default parameters are supported by defining a function with an already existing parameter.  The default parameter provided will be overriden if the function is called with a parameter.');
`;

window.es6Example.defaultParam.display = 'Default Parameters';
