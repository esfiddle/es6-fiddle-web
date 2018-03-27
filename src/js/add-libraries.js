import $ from "./helpers";

const librariesList = [
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.5/angular.min.js",
    display: "Angular"
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js",
    display: "Backbone",
    dependency: ["Underscore"]
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js",
    display: "Bootstrap 3",
    dependency: ["jQuery"]
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/js/bootstrap.min.js",
    display: "Bootstrap 4",
    dependency: ["jQuery", "Popper"]
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/d3/4.9.1/d3.min.js",
    display: "D3"
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/ember.js/2.13.3/ember.min.js",
    display: "Ember"
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.4.1/js/foundation.min.js",
    display: "Foundation",
    dependency: ["jQuery"]
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js",
    display: "GreenSock TweenMax"
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.0.10/handlebars.min.js",
    display: "Handlebars"
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",
    display: "jQuery"
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js",
    display: "jQuery UI",
    dependency: ["jQuery"]
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash.min.js",
    display: "Lodash"
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js",
    display: "Modernizr"
  },
  {
    url: "https://cdn.polyfill.io/v2/polyfill.min.js",
    display: "Polyfill.io"
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/polymer/0.5.6/polymer.min.js",
    display: "Polymer"
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react.min.js",
    display: "React"
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/react/15.6.1/react-dom.min.js",
    display: "React DOM",
    dependency: ["React"]
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/snap.svg/0.5.1/snap.svg-min.js",
    display: "Snap.svg"
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js",
    display: "Three"
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js",
    display: "Underscore"
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min.js",
    display: "Vue"
  },
  {
    url: "https://cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js",
    display: "Zepto"
  },
  {
    url: "https://cdn.zingchart.com/zingchart.min.js",
    display: "ZingChart"
  },
  {
    url:
      "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.5/umd/popper.js",
    display: "Popper"
  }
];

const libraries = {
  addLibraries() {
    const el = $.getElement(".libraries");
    const length = librariesList.length;
    for (let index = 0; index < length; index += 1) {
      const library = librariesList[index];
      el.innerHTML += `<option value="${library.url}" data-display="${
        library.display
      }">${library.display}</option>`;
    }
  },

  getLibraryDependencyUrls(selectedIndex) {
    const dependency = librariesList[selectedIndex - 1].dependency;
    if (dependency) {
      return librariesList
        .filter(library => dependency.indexOf(library.display) !== -1)
        .map(library => library.url);
    }
    return null;
  },

  getDisplayNameFromURL(urls) {
    return librariesList
      .filter(library => urls.indexOf(library.url) !== -1)
      .map(library => library.display);
  }
};

module.exports = libraries;
