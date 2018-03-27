import $ from "./helpers";
import log from "./partials/log";

const logger = {
  start() {
    const iDoc = $.getElement(".result").contentDocument,
      iHead = iDoc.getElementsByTagName("head")[0],
      script = $.createElement("script");

    script.innerHTML = log;

    iHead.appendChild(script);
  }
};

module.exports = logger;
