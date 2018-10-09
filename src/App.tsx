import * as React from 'react';

import {
	Route,
	Router,
	Switch
} from 'react-router-dom';

import createHistory from "history/createBrowserHistory";
const history = createHistory();

import Editor from './components/Editor/Editor';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Landing from './components/Landing/Landing';
import NotFound from './components/NotFound/NotFound';

// Styles
import './App.css';

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
						<main className="main">
							<Switch>
								<Route exact={true} path="/" component={Landing} />
								<Route path="/editor" component={Editor} />
								<Route component={NotFound} />
							</Switch>
						</main>
					<Footer />
				</>
			</Router>
		);
	}
}

export default App;
