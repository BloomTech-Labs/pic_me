import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Landing from './Landing';
import Navigation from './Navigation';
import Settings from './Settings';
import * as routes from '../constants/routes';

const App = () => (
    <Router>
        <div>
            <Navigation />
            <Route exact path={routes.LANDING} component={() => <Landing />} />
            <Route exact path={routes.SETTINGS} component={() => <Settings />} />
        </div>
    </Router>
);

export default App;