import * as React from 'react';

import {
	Route,
	Router,
	Switch
} from 'react-router-dom';

import createHistory from "history/createBrowserHistory";
const history = createHistory();

import About from './components/About/About';
import Editor from './components/Editor/Editor';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import NotFound from './components/NotFound/NotFound';

interface IAppState {
	user?: object
}

class App extends React.Component<{}, IAppState> {
	public constructor(props: {}) {
		super(props);
		this.state = {
			user: undefined,
		};
	}
	public componentDidMount() {
		history.listen((location, action) => {
			console.log('Change!') // tslint:disable-line
			// requestAnimationFrame(() => this.onScroll());
		})
	}
	public render() {
		return (
			<Router history={history}>
				<>
					<Header />
					<Switch>
						<Route exact={true} path="/" component={Landing} />
						<Route path="/about" component={About} />
						<Route path="/editor" component={Editor} />
						<Route component={NotFound} />
					</Switch>
					<Footer />
				</>
			</Router>
		);
	}
}

export default App;
