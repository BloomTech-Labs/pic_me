import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Common Components
import Navigation from './Navigation';

// Views for Authentication
import SignUp from './SignUp';
import SignIn from './SignIn';

// General Views
import Landing from './Landing';
import Settings from './Settings';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navigation />
                    <hr/>
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/settings" component={Settings} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/signin" component={SignIn} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
  
export default App;