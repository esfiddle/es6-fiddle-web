/* global localStorage document window XMLHttpRequest */
import "whatwg-fetch";
import layoutFunctions from "./layoutFunctions";
import snackbar from "./snackbar";
import $ from "./helpers";

const clickEvents = {
  darkModeClick(disableDarkMode, enableDarkMode, fiddle) {
    let darkMode = localStorage.getItem("es6fiddleDarkMode") === "true";
    const darkModeTheme = "monokai";
    if (darkMode === true) {
      darkMode = false;
      disableDarkMode();
      localStorage.setItem("es6fiddleDarkMode", false);
    } else {
      darkMode = true;
      enableDarkMode();

      // When switching to dark mode, set the theme
      $.getElement(".change-theme").value = darkModeTheme; // eslint-disable-line
      fiddle.setOption("theme", darkModeTheme);
      localStorage.setItem("theme", darkModeTheme);

      localStorage.setItem("es6fiddleDarkMode", true);
    }
  },

  starFiddle(data) {
    const starIcon = $.getElement(".fa-star-o");
    if (!data.message) {
      starIcon.classList.remove("fa-star-o");
      starIcon.classList.add("fa-star");
      snackbar.showSnackbar("Your fiddle has been favorited");
    } else {
      snackbar.showSnackbar(data.message);
    }
  },

  privateFiddle(data) {
    const privateIcon = $.getElement(".fa-globe");
    if (!data.message) {
      privateIcon.classList.remove("fa-globe");
      privateIcon.classList.add("fa-lock");
      privateIcon.parentElement.setAttribute("data-balloon", "Private Fiddle");
      snackbar.showSnackbar("This fiddle is now private!");
    } else {
      snackbar.showSnackbar(data.message);
    }
  },

  exportAsGist(fiddle) {
    const code = fiddle.getValue(),
      pathArr = window.location.pathname.split("/"),
      fiddleID = pathArr[1].length > 1 ? pathArr[1] : -1;

    if (code.length) {
      fetch(`/gist/${fiddleID}`, {
        credentials: "same-origin",
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          value: code
        })
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.message) {
            throw new Error(data.message);
          }
          snackbar.showSnackbar(
            "Gist created! View at https://gists.github.com"
          );
        })
        .catch(err => {
          snackbar.showSnackbar(err.message);
        });
    } else {
      snackbar.showSnackbar(
        "You don't appear to have any code or its not saved."
      );
    }
  },

  saveBtn(fiddle) {
    const code = fiddle.getValue(),
      pathArr = window.location.pathname.split("/");
    if (code) {
      fetch("/save", {
        credentials: "same-origin",
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          fiddle: pathArr[1].length > 1 ? pathArr[1] : -1,
          value: code,
          libraries: window.loadedLibraries
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data.saved) {
            window.location.href = `/${data.fiddle}/`;
          }
        });
    } else {
      snackbar.showSnackbar("You don't appear to have any code");
    }
  },

  // Enable dark mode by adding the .dark class
  // to the body, which then enables dark mode specific styling
  enableDarkMode() {
    $.getElement("body").classList.add("dark");
    layoutFunctions.setResultsColors("#FFF", "#333");
  },

  disableDarkMode() {
    $.getElement("body").classList.remove("dark");
    layoutFunctions.setResultsColors("#666", "#EEE");
  }
};

module.exports = clickEvents;
