import $ from './helpers';

const examples = {
  addExamples() {
    if (!window.embedded) {
      const el = $.getElement('.examples');
      let example;
      for (example in window.es6Example) { //eslint-disable-line
        if (Object.prototype.hasOwnProperty.call(window.es6Example, example)) {
          el.innerHTML +=
            `<option value="${example}">${window.es6Example[example].display}</option>`;
        }
      }

      el.innerHTML += '<option disabled>ES2016 (ES7) Examples</option>';

      for (example in window.es7Example) { //eslint-disable-line
        if (Object.prototype.hasOwnProperty.call(window.es7Example, example)) {
          el.innerHTML +=
              `<option value="${example}">${window.es7Example[example].display}</option>`;
        }
      }

      el.innerHTML += '<option disabled>ES2017 (ES8) Examples</option>';

			for (example in window.es8Example) { //eslint-disable-line
        if (Object.prototype.hasOwnProperty.call(window.es8Example, example)) {
          el.innerHTML +=
              `<option value="${example}">${window.es8Example[example].display}</option>`;
        }
      }
    }
    return undefined;
  },
};

module.exports = examples;
