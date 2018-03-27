/* global document */
import $ from "./helpers";

const snackbar = {
  showSnackbar(message) {
    const snackbarEl = document.querySelector(".snackbar");
    snackbarEl.innerHTML = message;
    $.addClass(snackbarEl, "show");
    setTimeout(() => {
      $.removeClass(snackbarEl, "show");
    }, 3000);
  }
};

module.exports = snackbar;
