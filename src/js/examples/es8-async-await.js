/* global window */
window.es8Example = window.es8Example || {};
window.es8Example.asyncAwait = {};

window.es8Example.asyncAwait.code = `/* 
Async and Await
*/

function fetchMeat() {
  const url = 'https://baconipsum.com/api/?type=meat-and-filler';
  return fetch(url).then(res => res.json());
}

function napTime(duration) {
  // Returning a custom Promise. Because await requires it.
  return new Promise((resolve) => {
    setTimeout(() => resolve('Times Up! ⏰'), duration);
  });
}


/*
 After ES6 and ES7 came ES8. This specification introduced two features, async functions and await operator. 
 Asynchronous functions, along with await.
 finally made working with asynchronous code and promises much easier. They marked the end of callback hell.
 Using .then with async-await is anti -pattern as its again tend to make multiple .then call back hell (.then Pyramid issue)
*/
async function getFood() {
  console.log("Blast off 🚀");

  try {
    const bacon = await fetchMeat();
    console.log(bacon, "bacon from the await-ed api");
  } catch (err) {
    console.error(
      `Darn! cant get it right now...please try after sometime or call us at youknowitserror@baconfactor.com with this error ${err}`
    );
  } finally {
    console.log("finally the i got the bacon 🥓");
  }
  // napTime returns a promise after given duration.
  try {
    const napTimeResponse = await napTime(1000);
    console.log(napTimeResponse);
    console.log("Await for me 👋");
  } catch (err) {
    console.error(
      `Woah, not good, please call us why you are not allowed to take a 🛌 with this error - ${err}`
    );
  }
}


getFood();

`;

window.es8Example.asyncAwait.display = 'Async and Await';
