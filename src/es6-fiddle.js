(function() {
    var fiddle = null,
        body = document.querySelector('body'),
        runBtn = document.querySelector('.run'),
        lintBtn = document.querySelector('.lint'),
        saveBtn = document.querySelector('.save'),
        vertBtn = document.querySelector('.vertical'),
        horzBtn = document.querySelector('.horizontal'),
        darkModeBtn = document.querySelector('.dark-mode'),
        savedLayout = localStorage.getItem('es6fiddleLayout'),
        codeWrapper = document.querySelector('.code-wrapper'),
        fieldWrapperClass = '.fiddle-wrapper',
        fiddleWrapper = document.querySelector(fieldWrapperClass),
        darkMode = localStorage.getItem('es6fiddleDarkMode') == 'true',
        themeChanger = document.querySelector('.change-theme'),
        iDoc = document.querySelector('.result').contentDocument,
        iHead = iDoc.getElementsByTagName('head')[0],
        babel = document.createElement('script'),
        logger = document.createElement('script'),
        style = document.createElement('style'),
        lintLog = null,
        userInput = null,
        savedTheme = localStorage.getItem('theme'),
        darkModeTheme = 'monokai',
        pathArr = location.pathname.split('/'),
        fiddleId = pathArr[pathArr.length - 2],
        embedded = pathArr[1] === 'embed',
        resizer = document.querySelector('.resizer'),
        documentElement = document.documentElement,
        startX,
        startY,
        startWidth,
        startHeight,
        bootstrap = null,
        share,
        src,
        iframe,
        embed,
        link,
        twitter,
        es6Btn,
        consoleBtn,
        editLink;

    //set the global examples object
    window.es6Example = {};
    window.embedded = embedded;
    window.es7ExamplesEnabled = true;
    window.es7Example = {};
    window.exampleSelector = document.querySelector('.examples');

    //check to see if the share button should be shown
    if (fiddleId && !embedded) {
        share = document.querySelector('.share');
        src = document.location.protocol + '//' + document.location.host + '/embed/' + fiddleId + '/';
        iframe = '<iframe width="100%" height="300" frameborder="0" allowfullscreen src="' + src + '"></iframe>';

        if (share) {
            embed = share.querySelector('#share-embed');
            link = share.querySelector('#share-link');
            twitter = share.querySelector('.tweet');

            share.style.display = 'inline-block';
            link.value = document.location.href;
            embed.value = iframe;
            link.onclick = link.select;
            embed.onclick = embed.select;
            twitter.href = 'http://twitter.com/home?status=ES6%20fiddle:%20' + document.location.href;
        }
    }

    //handle the embedded buttons
    if (embedded) {
        es6Btn = document.querySelector('.es6-click-btn');
        consoleBtn = document.querySelector('.console-click-btn');
        editLink = document.querySelector('.edit-at-es6');

        editLink.href = document.location.href.replace('/embed', '');

        es6Btn.onclick = function() {
            document.querySelector('.fiddle').style.display = 'block';
            document.querySelector('.result-wrapper').style.display = 'none';
            es6Btn.className += ' selected';
            consoleBtn.className = consoleBtn.className.replace(' selected', '');
        };

        consoleBtn.onclick = function() {
            document.querySelector('.fiddle').style.display = 'none';
            document.querySelector('.result-wrapper').style.display = 'block';
            es6Btn.className = es6Btn.className.replace(' selected', '');
            consoleBtn.className += ' selected';
        };
    }

    // Change the layout of the page based on the type clicked.
    // Save this layout choice in localStorage
    // By default this will be vertical
    vertBtn.onclick = function() {
        setVerticalStyle();
        saveLayoutOption('vertical');
        fiddleWrapper.removeAttribute('style');
        startX = fiddleWrapper.clientX;
        startY = fiddleWrapper.clientY;
    };

    // Onclick of the horizontal button then make the page visually horizontal
    // And save the layout option clicked (in this case horizontal) to localstorage
    horzBtn.onclick = function() {
        setHorizontalStyle();
        saveLayoutOption('horizontal');
        fiddleWrapper.removeAttribute('style');
        startX = fiddleWrapper.clientX;
        startY = fiddleWrapper.clientY;
    };

    // When the dark mode button is clicked, toggle the dark mode setting
    darkModeBtn.onclick = function() {
        if (darkMode === true) {
            darkMode = false;
            disableDarkMode();
            localStorage.setItem('es6fiddleDarkMode', false);
        } else {
            darkMode = true;
            enableDarkMode();

            // When switching to dark mode, set the theme
            themeChanger.value = darkModeTheme;
            fiddle.setOption('theme', darkModeTheme);
            localStorage.setItem('theme', darkModeTheme);

            localStorage.setItem('es6fiddleDarkMode', true);
        }
    };

    // Save the layout option specified to localStorage
    // Pass in a string either "vertical" or "horizontal" to save the layout
    function saveLayoutOption(layoutType) {
        localStorage.setItem('es6fiddleLayout', layoutType);
    }

    // A method to change the width of the results and fiddle containers
    // Setting the width to 100% will make the fiddle box be on top and the results below
    function setHorizontalStyle() {
        codeWrapper.classList.add('column');
    }

    // Called when we want to make the page back to its default vertical style
    // This will make the page have the fiddle on the left and the results on the right
    function setVerticalStyle() {
        codeWrapper.classList.remove('column');
    }

    // Enable dark mode by adding the .dark class to the body, which then enables dark mode specific styling
    function enableDarkMode() {
        body.classList.add('dark');
        setResultsColors('#FFF', '#333');
    }

    // Disable dark mode by removing the .dark class from the body
    function disableDarkMode() {
        body.classList.remove('dark');
        setResultsColors('#666', '#EEE');
    }

    // Sets the styling for the results box with the given text and border color
    function setResultsColors(textColor, borderColor) {
        style.innerHTML =
            'body{font-family:monospace;padding:10px;color:' + textColor + '; transition:color 0.5s;}\n' +
            'div{border-bottom:1px solid ' + borderColor + ';padding: 2px 0; transition:bottom-border 0.5s;}';
    }

    //add the fiddle area
    fiddle = window.CodeMirror(document.querySelector('.fiddle'), {
        lineNumbers: !embedded,
        readOnly: embedded ? 'nocursor' : false,
        theme: savedTheme || 'default'
    });
    fiddle.focus();

    // If the user has previously selected to use the horizontal layout then load that
    if (savedLayout === 'horizontal') {
        setHorizontalStyle();
    // Otherwise make the page the default vertical style
    } else {
        setVerticalStyle();
    }

    // If the user has previously enabled dark mode then open in dark mode
    if (darkMode) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Set the saved theme in the theme changer dropdown
    if (savedTheme) {
        themeChanger.value = savedTheme;
    }

    //add the logger script to the iframe
    logger.innerHTML =
        'window.console.log = (function() {\n' +
        '\tvar escaped = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\\\"": "&quot;", "\'": "&#39", "/": "&#x2F;"};\n' +
        '\tvar escapeHTML = function(str) {\n' +
        '\t\treturn String(str).replace(/[&<>"\'\/]/g, function (s) {\n' +
        '\t\t\t\treturn escaped[s];\n' +
        '\t\t});\n' +
        '\t};' +
        '\tvar log = console.log;\n' +
        '\treturn function() {\n' +
        '\t\tlog.apply(window.console, arguments);\n' +
        '\t\tdocument.body.innerHTML +=\n' +
        '\t\t\t"<div>" + \n' +
        '\t\t\t\tescapeHTML(Array.prototype.slice.call(arguments).join(" ")) + \n' +
        '\t\t\t"</div>";\n' +
        '\t};\n' +
        '})();\n\n' +
        'window.console.error = (function() {\n' +
        '\tvar err = console.error;\n' +
        '\treturn function() {\n' +
        '\t\terr.apply(window.console, arguments);\n' +
        '\t\tdocument.body.innerHTML +=\n' +
        '\t\t\t"<div>" + \n' +
        '\t\t\t\tArray.prototype.slice.call(arguments).join(" ") + \n' +
        '\t\t"</div>";\n' +
        '\t};\n' +
        '})();\n\n';
    iHead.appendChild(logger);

    iHead.appendChild(style);

    //wait for babel to load
    babel.onload = function() {
        var loadReq = new XMLHttpRequest(),
            loadResp,
            runFiddle = function() {
                if (userInput) { //clean up the old code
                    iHead.removeChild(userInput);
                }
                if (bootstrap) { //clean up the old code
                    iHead.removeChild(bootstrap);
                }

                //create new script elements for the bootstrap and user input
                userInput = document.createElement('script');
                bootstrap = document.createElement('script');

                //user input needs to be a 'text/babel' script for babel
                userInput.setAttribute('type', 'text/babel');
                userInput.className = 'babel-text';

                //set the new script code
                var inputWithTryCatch = 'try {' + fiddle.getValue() + '} catch(e) { console.log(e.message); }';
                userInput.innerHTML = inputWithTryCatch;
                bootstrap.innerHTML = (
                    'document.body.innerHTML = \'\';\n' +
                    'babel.run(document.querySelector(".babel-text").innerHTML);\n'
                );

                //append the new scripts
                iHead.appendChild(userInput);
                iHead.appendChild(bootstrap);
            };

        if (fiddleId) { //load up the saved code
            loadReq.open('GET', '/fiddles/' + fiddleId, true);
            loadReq.send();
            loadReq.onload = function() {
                loadResp = JSON.parse(this.response);
                if (this.status >= 200 && this.status < 400) {
                    if (loadResp.value) {
                        fiddle.setValue(loadResp.value);
                    } else {
                        fiddle.setValue('\/* Sorry, but I could not load your code right now. *\/');
                    }
                } else if (this.status === 404 ){
                    fiddle.setValue(loadResp.message);
                }

                if (embedded) { //go ahead and run the code
                    runFiddle();
                }
            };
        }

        if (!embedded) {

            //run the input
            runBtn.onclick = runFiddle;

            //lint the result
            lintBtn.onclick = function() {
                var lint = window.JSHINT(fiddle.getValue(), {
                    esnext: true,
                    devel: true,
                    browser: true
                });

                //clean up the old lint log script
                if (lintLog) {
                    iHead.removeChild(lintLog);
                }

                //make a new lint log script
                lintLog = document.createElement('script');
                lintLog.innerHTML = 'document.body.innerHTML = \'\';\n';

                //remove the line error class from all lines
                fiddle.eachLine(function(line) {
                    fiddle.removeLineClass(line, 'background', 'line-error');
                });

                if (!lint) {
                    window.JSHINT.errors.forEach(function(err) {
                        fiddle.addLineClass(err.line - 1, 'background', 'line-error');
                        lintLog.innerHTML +=
                            'console.log(\'Line \' + ' +
                            err.line +
                            ' + \':\', \'' +
                            err.reason.replace(/'/g, '\\\'') + '\')\n';
                    });
                } else {
                    lintLog.innerHTML += 'console.log(\'Your code is lint free!\');';
                }

                iHead.appendChild(lintLog);
            };

            //save the code
            saveBtn.onclick = function() {
                var code = fiddle.getValue(),
                    saveReq = new XMLHttpRequest(),
                    pathArr = window.location.pathname.split('/'),
                    resp;
                if (code) {
                    saveReq.open('POST', '/save', true);
                    saveReq.setRequestHeader('Content-type','application/json');
                    saveReq.onload = function() {
                        if (this.status >= 200 && this.status < 400) {
                            resp = JSON.parse(this.response);
                            window.location.href = '/' + resp.fiddle + '/';
                        }
                    };
                    saveReq.send(JSON.stringify({
                        fiddle: pathArr[1].length > 1 ? pathArr[1] : - 1,
                        value: fiddle.getValue()
                    }));
                }
            };

            themeChanger.onchange = function() {
                var theme = themeChanger.options[themeChanger.selectedIndex].textContent;
                fiddle.setOption('theme', theme);
                localStorage.setItem('theme', theme);
            };

            //load the selected code
            window.exampleSelector.onchange = function() {
                if (window.exampleSelector.value) {
                    var code = 'Example Can Not Be Found';

                    if (window.es6Example[window.exampleSelector.value]) {
                        code = window.es6Example[window.exampleSelector.value].code;
                    } else if (window.es7Example[window.exampleSelector.value]) {
                        code = window.es7Example[window.exampleSelector.value].code;
                    }

                    fiddle.setValue(code);
                }
            };
        }
    };

    // Add dragging funcionality

    fiddleWrapper.addEventListener('click', function init() {
        fiddleWrapper.removeEventListener('click', init, false);
        resizer.addEventListener('mousedown', initDrag, false);
    }, false);

    function initDrag(e) {
        startX = e.clientX;
        startWidth = parseInt(document.defaultView.getComputedStyle(fiddleWrapper).width, 10);
        startY = e.clientY;
        startHeight = parseInt(document.defaultView.getComputedStyle(fiddleWrapper).height, 10);
        documentElement.addEventListener('mousemove', doDrag, false);
        documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
        var layout = localStorage.getItem('es6fiddleLayout');
        if (layout === 'horizontal') {
            fiddleWrapper.style.flexBasis = startHeight + e.clientY - startY + 'px';
        } else {
            fiddleWrapper.style.flexBasis = startWidth + e.clientX - startX + 'px';
        }
    }

    function stopDrag() {
        documentElement.removeEventListener('mousemove', doDrag, false);
        documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    //add babel to the iframe
    babel.src = '/lib/babel/babel.min.js';
    iHead.appendChild(babel);
})();
