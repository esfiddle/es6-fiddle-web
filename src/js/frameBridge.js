/**
 * bridge module to conveniently pass messages
 * back and forth between the main window and the sandbox
 */

import $ from "./helpers";

class FrameBridge {
  constructor(selector) {
    this.sandbox = $.getElement(selector).contentWindow;

    // register to receive load notification from child
    window.addEventListener("message", this._childLoaded.bind(this));

    // buffer all calls to this.send until iframe signals that it has loaded
    /* eslint-disable */
    this.send = (function(orig, that) {
      const buffer = [];

      function sendProxy(...args) {
        buffer.push(args);
      }

      sendProxy.restore = function() {
        for (let i = 0; i < buffer.length; i++) {
          orig(...buffer[i]);
        }

        // after all the calls restore the original function
        that.send = orig;
      };

      return sendProxy;
    })(this.send.bind(this), this);
    /* eslint-enable */
  }

  /**
   * Called when the current window receives a message from the iframe
   * @param event {MessageEvent}
   * @private
   */
  _childLoaded(event) {
    if (event.source === this.sandbox) {
      if (event.data.LOADED) {
        // the iframe has loaded
        // fire all the pending messages in the buffer
        this.send.restore();
      }
    }
  }

  /**
   * Send a message to the Sandbox
   * @param type
   * @param data Can be any message payload that you want to send, no type checking is performed
   */
  send(type, data) {
    // Todo: Maybe we should replace the wildcard with some fixed origin
    this.sandbox.postMessage({ type, data }, "*");
  }
}

// export a Singleton instance since there should only be one channel for communication
module.exports = new FrameBridge(".result");
