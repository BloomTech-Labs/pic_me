import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StripeProvider } from 'react-stripe-elements';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from '../reducers';

// Common Components
import Navigation from './Navigation';

// Gatekeeper HOC
import Gatekeeper from './Gatekeeper';

// Views for Authentication
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';

// General Views
import Landing from './Landing';
import Settings from './Settings';
import Billings from './Billings';
import ForgotPassword from './Forgotpassword';
import Feature from './Feature';
import Mobil from './Mobil';

const store = createStore(reducer, applyMiddleware(logger, thunk));

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<StripeProvider apiKey={process.env.REACT_APP_STRIPE_API}>
					<Router>
						<div className="App">
							<Navigation />
							<Switch>
								<Route exact path="/" component={Landing} />
								<Route exact path="/billing" component={Gatekeeper(Billings)} />
								<Route exact path="/mobil" component={Mobil} />
								<Route
									exact
									path="/settings"
									component={Gatekeeper(Settings)}
								/>
								<Route exact path="/signup" component={SignUp} />
								<Route exact path="/login" component={Login} />
								<Route exact path="/logout" component={Logout} />
								<Route
									exact
									path="/forgotpassword"
									component={ForgotPassword}
								/>
								<Route exact path="/feature" component={Gatekeeper(Feature)} />
							</Switch>
						</div>
					</Router>
				</StripeProvider>
			</Provider>
		);
	}
}

export default App;
