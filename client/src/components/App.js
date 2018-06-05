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

// Photo Views
import Upload from './picture/Upload';
import Browse from './picture/Browse';
import MyUploads from './picture/MyUploads';
import MyCollection from './picture/MyCollection';

// General Views
import Landing from './Landing';
import Settings from './Settings';
import Billings from './Billings';
import ForgotPassword from './Forgotpassword';
import Feature from './Feature';
import Mobil from './Mobil';
import Bread from "./Bread";

const store = createStore(reducer, applyMiddleware(logger, thunk));

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<StripeProvider apiKey="pk_test_0srJ0Qu3Z68ZEAsuJnLERMWr">
					<Router>
						<div className="App">
							<Navigation />
							<Bread />
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
								<Route
									exact
									path="/picture_my_uploads"
									component={Gatekeeper(MyUploads)}
								/>
								<Route exact path="/picture_browse" component={Browse} />
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
								<Route
									exact
									path="/picture_browse"
									component={Gatekeeper(Browse)}
								/>
								<Route
									exact
									path="/picture_my_uploads"
									component={Gatekeeper(MyUploads)}
								/>
								<Route
									exact
									path="/picture_my_collection"
									component={Gatekeeper(MyCollection)}
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
