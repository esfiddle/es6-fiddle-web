const $ = {
  getElement(el) {
    return document.querySelector(el);
  },

  getElementFrom(from, el) {
    return from.querySelector(el);
  },

  createElement(el) {
    return document.createElement(el);
  },

  addClass(el, classToAdd) {
    return el.classList.add(classToAdd);
  },

  removeClass(el, classToRemove) {
    return el.classList.remove(classToRemove);
  },

  addStyleTo(el, prop, value) {
    el.style[prop] = value; // eslint-disable-line
  },
};

module.exports = $;
