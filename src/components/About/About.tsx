import * as React from 'react';

import './About.css';

export default class About extends React.Component {
	public render() {
		return (
      <div className="about">
        <h1>Why ESFiddle?</h1>
        <p>
          ES6 - or ECMAScript 2015 - is the latest JavaScript specification.
          It includes exciting features like arrow functions and a new class syntax.
          With ESFiddle, trying out these awesome features in the browser couldn't be easier. Our vision is to help programmers transition to ES6 by providing a reliable testing environment, along with a rich library of example code.
        </p>
        <p className="tip">
          Learn more about <a href="http://es6-features.org/#ExpressionBodies" target="_blank">ES6</a>, or read this <a href="https://webapplog.com/es6/" target="_blank">article</a> if you're not sure where to start.
        </p>
	  	  <h1>Contributing</h1>
	         <p>
            Let's work together towards a better ES6 environment on the web. Whether you're a beginner or a programming guru, we welcome your help. Follow the steps <a href="https://github.com/esfiddle/esfiddle/blob/develop/docs/CONTRIBUTE.md" target="_blank">here</a> to get setup.
           </p>
		  	   <p className="tip">
            View the project on <a href="https://github.com/esfiddle/esfiddle" target="_blank">GitHub</a>.
           </p>
	  	     <h1>Found a bug?</h1>
           <p>
            We're always working on improving ESFiddle. Please read the <a href="https://github.com/esfiddle/esfiddle/blob/develop/docs/REPORTBUG.md" target="_blank">How to Report a Bug</a> article and follow the guidelines.
           </p>
        </div>
    );
	}
}
