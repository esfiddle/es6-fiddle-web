/* global localStorage document */
import frameBridge from "./frameBridge";
import MESSAGES from "./sandbox/keys";

const layoutFunctions = {
  // Save the layout option specified to localStorage
  // Pass in a string either "vertical" or "horizontal" to save the layout
  saveLayoutOption(layoutType) {
    localStorage.setItem("es6fiddleLayout", layoutType);
  },

  // A method to change the width of the results and fiddle containers
  // Setting the width to 100% will make the fiddle box be on top and the results below
  setHorizontalStyle(codeWrapper) {
    codeWrapper.classList.add("column");
  },

  // Called when we want to make the page back to its default vertical style
  // This will make the page have the fiddle on the left and the results on the right
  setVerticalStyle(codeWrapper) {
    codeWrapper.classList.remove("column");
  },

  // Sets the styling for the results box with the given text and border color
  /* eslint-disable */
  setResultsColors(textColor, borderColor) {
    frameBridge.send(MESSAGES.UPDATE_VIEW, { textColor, borderColor });
  }
};

module.exports = layoutFunctions;
