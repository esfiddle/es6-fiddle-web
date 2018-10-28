import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../../App';
import About from './About';

it('renders <Header /> without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App><About /></App>, div);
	ReactDOM.unmountComponentAtNode(div);
});
