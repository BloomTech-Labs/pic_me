import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StripeProvider } from 'react-stripe-elements';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import reducer from '../reducers';

// Common Components
import Navigation from './Navigation';

// Gatekeeper HOC
import Gatekeeper from './Gatekeeper';

// Views for Authentication
import SignUp from './SignUp';
import Login from './Login';
import Logout from './Logout';

// Photo Views
// import Upload from "./Upload";		 /* working uploads */
import MyUploads from './MyUploads'; /* just for testing purposes */

// General Views
import Landing from './Landing';
import Settings from './Settings';
import Billings from './Billings';
import ForgotPassword from './Forgotpassword';
import Feature from './Feature';
import Mobil from './Mobil';

// Views for Picture
// Will need to figure out how to reconcile dropzone w/multers3 storage
import Upload from './Upload';

const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<StripeProvider apiKey="pk_test_0srJ0Qu3Z68ZEAsuJnLERMWr">
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
								<Route exact path="/picture_upload" component={Upload} />
								<Route exact path="/picture_my_uploads" component={MyUploads} />
								<Route exact path="/logout" component={Logout} />
								<Route
									exact
									path="/forgotpassword"
									component={ForgotPassword}
								/>
								<Route exact path="/feature" component={Gatekeeper(Feature)} />
								<Route
									exact
									path="/picture_upload"
									component={Gatekeeper(Upload)}
								/>
							</Switch>
						</div>
					</Router>
				</StripeProvider>
			</Provider>
		);
	}
}

export default App;
