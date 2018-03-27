import * as $ from "./helpers";

let startX, startWidth, startY, startHeight;
const fiddleWrapper = $.getElement(".fiddle-wrapper");
const drag = {
  doDrag(e) {
    const layout = localStorage.getItem("es6fiddleLayout");
    if (layout === "horizontal") {
      fiddleWrapper.style.flexBasis = `${startHeight + e.clientY - startY}px`;
    } else {
      fiddleWrapper.style.flexBasis = `${startWidth + e.clientX - startX}px`;
    }
  },

  stopDrag() {
    document.documentElement.removeEventListener(
      "mousemove",
      this.doDrag,
      false
    );
    document.documentElement.removeEventListener(
      "mouseup",
      this.stopDrag,
      false
    );
  },

  initDrag(e) {
    startX = e.clientX;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(fiddleWrapper).width,
      10
    );
    startY = e.clientY;
    startHeight = parseInt(
      document.defaultView.getComputedStyle(fiddleWrapper).height,
      10
    );
    document.documentElement.addEventListener("mousemove", this.doDrag, false);
    document.documentElement.addEventListener("mouseup", this.stopDrag, false);
  }
};

module.exports = drag;
