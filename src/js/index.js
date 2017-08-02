import 'whatwg-fetch';
import codemirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import analytics from './analytics';
import redirectTraffic from './redirect-traffic';
import layoutFunctions from './layoutFunctions';
import clickEvents from './clickEvents';
import drag from './drag';
import logger from './logger';
import examples from './add-examples';
import $ from './helpers';
import share from './share';
import snackbar from './snackbar';

const codeWrapper = $.getElement('.code-wrapper'),
  fiddleWrapper = $.getElement('.fiddle-wrapper'),
  themeChanger = $.getElement('.change-theme'),
  iDoc = $.getElement('.result').contentDocument,
  iHead = iDoc.getElementsByTagName('head')[0],
  babel = $.createElement('script'),
  savedTheme = localStorage.getItem('theme'),
  pathAr = location.pathname.split('/'),
  fiddleId = pathAr[pathAr.length - 2],
  embedded = pathAr[1] === 'embed',
  startFiddle = $.getElement('.star');

let fiddle = null,
  userInput = null,
  bootstrap = null;

analytics.start();
redirectTraffic.register();

window.embedded = embedded;
window.exampleSelector = $.getElement('.examples');
examples.addExamples();

// check to see if the share button should be shown
if (fiddleId && !embedded) {
  const shareEl = $.getElement('.share');
  $.addStyleTo(startFiddle, 'display', 'block');
  if (shareEl) { share.shareFiddle(fiddleId); }
} else {
  $.addStyleTo(startFiddle, 'display', 'none');
}

// handle the embedded buttons
if (embedded) {
  const es6Btn = $.getElement('.es6-click-btn');
  const consoleBtn = $.getElement('.console-click-btn');
  $.getElement('.edit-at-es6').href = document.location.href.replace('/embed', '');

  es6Btn.onclick = () => {
    $.getElement('.fiddle').addStyle('display', 'block');
    $.getElement('.result-wrapper').addStyle('display', 'none');
    $.addClass(es6Btn, 'selected');
    $.removeClass(consoleBtn, 'selected');
  };

  consoleBtn.onclick = () => {
    $.getElement('.fiddle').addStyle('display', 'none');
    $.getElement('.result-wrapper').addStyle('display', 'block');
    $.removeClass(es6Btn, 'selected');
    $.addClass(consoleBtn, 'selected');
  };
}

// Change the layout of the page based on the type clicked.
// Save this layout choice in localStorage
// By default this will be vertical
$.getElement('.vertical').onclick = () => {
  layoutFunctions.setVerticalStyle(codeWrapper);
  layoutFunctions.saveLayoutOption('vertical');
};

// Onclick of the horizontal button then make the page visually horizontal
// And save the layout option clicked (in this case horizontal) to localstorage
$.getElement('.horizontal').onclick = () => {
  layoutFunctions.setHorizontalStyle(codeWrapper);
  layoutFunctions.saveLayoutOption('horizontal');
};

// add the fiddle area
fiddle = codemirror($.getElement('.fiddle'), {
  lineNumbers: !embedded,
  readOnly: embedded ? 'nocursor' : false,
  theme: savedTheme || 'default',
});
fiddle.focus();

// If the user has previously selected to use the horizontal layout then load that
if (localStorage.getItem('es6fiddleLayout') === 'horizontal') {
  layoutFunctions.setHorizontalStyle(codeWrapper);
  // Otherwise make the page the default vertical style
} else {
  layoutFunctions.setVerticalStyle(codeWrapper);
}

// If the user has previously enabled dark mode then open in dark mode
if (localStorage.getItem('es6fiddleDarkMode') === 'true') {
  clickEvents.enableDarkMode();
} else {
  clickEvents.disableDarkMode();
}

// When the dark mode button is clicked, toggle the dark mode setting
$.getElement('.dark-mode').onclick = () => {
  clickEvents.darkModeClick(clickEvents.disableDarkMode, clickEvents.enableDarkMode, fiddle);
};

// Set the saved theme in the theme changer dropdown
if (savedTheme) {
  themeChanger.value = savedTheme;
}

// add the logger script to the iframe
logger.start();

// Add line number to all console.log() statements
function calculateLineNumber(fiddleValue) {
  const lines = fiddleValue.split(/\n/);
  let newLines = '';
  newLines = lines.map((line, index) => {
    const consReg = /(console\.log\()(.*)/;
    //  separate console.log from original string and split it in to
    // "console.log(" and ")"
    const clgLines = line.match(consReg);
    if (clgLines) {
      // Add line no: to console.log and join it with rest of the original line.
      // return line.slice(0, clgLines.index) + clgLines[1] + `'${index+1}: ' + ` +clgLines[2];
      return `${line.slice(0, clgLines.index) + clgLines[1]}'${index + 1}: ' + ${clgLines[2]}`;
    }
    return line;
  });
  return newLines.join('\n');
}

//  wait for babel to load
babel.onload = () => {
  const runFiddle = () => {
    if (userInput) { // clean up the old code
      iHead.removeChild(userInput);
    }
    if (bootstrap) { // clean up the old code
      iHead.removeChild(bootstrap);
    }

    // create new script elements for the bootstrap and user input
    userInput = $.createElement('script');
    bootstrap = $.createElement('script');

    // user input needs to be a 'text/babel' script for babel
    userInput.setAttribute('type', 'text/babel');
    $.addClass(userInput, 'babel-text');

    // set the new script code
    // Warp in try and catch to display error on console panel..
    // calculateLineNumber is called to Add line numbers to console.log for console panel.
    userInput.innerHTML = `try {${calculateLineNumber(fiddle.getValue())}} catch(e) { console.log(e.message); }`;
    bootstrap.innerHTML = (
                    'document.body.innerHTML = \'\';\n' +
                    'babel.run(document.querySelector(".babel-text").innerHTML);\n'
                  );

    // append the new scripts
    iHead.appendChild(userInput);
    iHead.appendChild(bootstrap);
  };

  const getFiddle = (data) => {
    if (data.fiddle) {
      if (data.value) {
        fiddle.setValue(data.value);
      } else {
        fiddle.setValue('* Sorry, but I could not load your code right now. *');
      }
      if (data.isPrivate) {
        const privateIcon = $.getElement('.fa-globe');
        privateIcon.classList.remove('fa-globe');
        privateIcon.classList.add('fa-lock');
        privateIcon.parentElement.setAttribute('data-balloon', 'Private Fiddle');
      }
    } else {
      $.addStyleTo(startFiddle, 'display', 'none');
      fiddle.setValue(data.message);
    }

    if (embedded) { // go ahead and run the code
      runFiddle();
    }
  };

  if (fiddleId) { // load up the saved code
    fetch(`/fiddles/${fiddleId}`, {
      credentials: 'same-origin',
    })
    .then(resp => resp.json())
    .then(data => getFiddle(data));
  }

  if (!embedded) {
    // run the input
    $.getElement('.run').onclick = runFiddle;

    // lint the result
    $.getElement('.lint').onclick = () => {
      let lintLog;
      const lint = JSHINT(fiddle.getValue(), {
        esnext: true,
        devel: true,
        browser: true,
      });

      // clean up the old lint log script
      if (lintLog) {
        iHead.removeChild(lintLog);
      }

      // make a new lint log script
      lintLog = $.createElement('script');
      lintLog.innerHTML = 'document.body.innerHTML = \'\';\n';

                // remove the line error class from all lines
      fiddle.eachLine((line) => {
        fiddle.removeLineClass(line, 'background', 'line-error');
      });

      if (!lint) {
        JSHINT.errors.forEach((err) => {
          fiddle.addLineClass(err.line - 1, 'background', 'line-error');
          lintLog.innerHTML += `console.log('Line ' + ${err.line} + ':', '${err.reason.replace(/'/g, '\\\'')}')\n`;
        });
      } else {
        lintLog.innerHTML += 'console.log(\'Awesome! Your code is lint free!\');';
      }

      iHead.appendChild(lintLog);
    };

      // save the code
    document.querySelector('.save').onclick = () => clickEvents.saveBtn(fiddle);

    // star the code
    $.getElement('.star').onclick = () => {
      const pathArr = window.location.pathname.split('/'),
        fiddleID = pathArr[1].length > 1 ? pathArr[1] : -1;
      if (fiddleID !== -1) {
        fetch(`/star/${fiddleID}`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
        .then(resp => resp.json())
        .then(data => clickEvents.starFiddle(data));
      }
    };

    // Make fiddle private
    $.getElement('.private').onclick = () => {
      const pathArr = window.location.pathname.split('/'),
        fiddleID = pathArr[1].length > 1 ? pathArr[1] : -1;
      if (fiddleID !== -1) {
        fetch(`/private/${fiddleID}`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
        .then(resp => resp.json())
        .then(data => clickEvents.privateFiddle(data));
      } else {
        snackbar.showSnackbar('You don\'t appear to have any code or its not saved.');
      }
    };

    themeChanger.onchange = () => {
      const theme = themeChanger.options[themeChanger.selectedIndex].textContent;
      fiddle.setOption('theme', theme);
      localStorage.setItem('theme', theme);
    };

    // load the selected code
    window.exampleSelector.onchange = () => {
      if (window.exampleSelector.value) {
        let code = 'Example Can Not Be Found';

        if (window.es6Example[window.exampleSelector.value]) {
          ({ code } = window.es6Example[window.exampleSelector.value]);
        } else if (window.es7Example[window.exampleSelector.value]) {
          ({ code } = window.es7Example[window.exampleSelector.value]);
        }

        fiddle.setValue(code);
      }
    };
  }
};


// Add dragging funcionality

fiddleWrapper.addEventListener('click', function init() {
  fiddleWrapper.removeEventListener('click', init, false);
  $.getElement('.resizer').addEventListener('mousedown', drag.initDrag, false);
}, false);

// add babel to the iframe
babel.src = '/lib/babel/babel.min.js';
iHead.appendChild(babel);
