import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './Landing';
import Navigation from './Navigation';
import Settings from './Settings';
import SignUp from './SignUp';
import SignIn from './SignIn';

const App = () => (
    <Router>
        <div>
            <Navigation />
            <hr/>
            <Route exact path="/landing" component={Landing} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
        </div>
    </Router>
);
  
export default App;