/* global window */
window.es6Example = window.es6Example || {};
window.es6Example.promise = {};

window.es6Example.promise.code = `var oneOrTwo = function (num) {
  return new Promise(function (resolve, reject) {
    if (num === 1) {
      setTimeout(function () {
        resolve("It's one!");
      }, num * 1000);
    } else if (num === 2) {
      setTimeout(function () {
        resolve("It's two!");
      }, num * 1000);
    } else {
      reject("It's something unexpected.");
    }
  });
};

var answerTeller = function (num) {
  return oneOrTwo(num)
    .then(function (answer) {
      console.log('Success: ' + answer);
    })
    .catch(function (message) {
      console.log('Fail: ' + message);
    });
};

// Logs "Success: It's one!" after 1 second
answerTeller(1);

// Logs "Success: It's two!" after 2 seconds
answerTeller(2);

// Logs "Fail: It's something unexpected." right away
answerTeller(3);

// Logs "It's one!" and "It's two!" after 2 seconds
Promise.all([
  oneOrTwo(1),
  oneOrTwo(2)])
.then(function (results) {
  console.log(results[0]);
  console.log(results[1]);
});
`;

window.es6Example.promise.display = "Promises";
