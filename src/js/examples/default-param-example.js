/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.defaultParam = {};

window.es6Example.defaultParam.code = `var sayMsg = (msg='This is a default message.') => console.log(msg);

sayMsg();
sayMsg('This is a different message!');
`;

window.es6Example.defaultParam.display = "Default Parameters";
