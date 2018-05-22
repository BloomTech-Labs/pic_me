import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Landing from './Landing';
import Navigation from './Navigation';

const App = () => (
    <Router>
        <div>
            <Navigation />
            <hr/>
            <Landing />
        </div>
    </Router>
);

export default App;