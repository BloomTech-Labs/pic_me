import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StripeProvider } from 'react-stripe-elements';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// Common Components
import Navigation from "./Navigation";

// Views for Authentication
import SignUp from "./SignUp";
import Login from "./Login";
import Logout from "./Logout";

// General Views
import Landing from './Landing';
import Settings from './Settings';
import Billings from './Billings';
import ForgotPassword from "./Forgotpassword";
import Feature from "./Feature";

const store = createStore(reducer, applyMiddleware(thunk));

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
                <Route exact path="/billing" component={Billings} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/forgotpassword" component={ForgotPassword} />
                <Route exact path="/feature" component={Feature} />
              </Switch>
            </div>
          </Router>
        </StripeProvider>
      </Provider>
    );
  }
}

export default App;
