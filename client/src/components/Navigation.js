import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
      return (
        <div>
            <ul>
              <li><Link to = {'/Landing'}>Landing</Link></li>
              <li><Link to = {'/Settings'}>Settings</Link></li>
            </ul>
        </div>
      );
    }
  }
  export default Navigation;