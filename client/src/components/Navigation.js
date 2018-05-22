import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../constants/routes';

class Navigation extends Component {
    render() {
      return (
        <div>
            <ul>
              <li><Link to = {routes.LANDING}>Landing</Link></li>
              <li><Link to = {routes.SETTINGS}>Settings</Link></li>
            </ul>
        </div>
      );
    }
  }
  export default Navigation;