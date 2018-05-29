import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StripeProvider } from 'react-stripe-elements';
import thunk from 'redux-thunk';
import reducer from '../reducers';

// Common Components
import Navigation from './Navigation';

// Views for Authentication
import SignUp from './SignUp';
import Login from './Login';

// General Views
import Landing from './Landing';
import Settings from './Settings';
import Billings from './Billings';

const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StripeProvider apiKey="pk_test_12345">
          <Router>
            <div>
              <Navigation />
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/billing" component={Billings} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Router>
        </StripeProvider>
      </Provider>
    );
  }
}

export default App;
