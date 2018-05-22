import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigation extends Component {
    render() {
      return (
        <div>
            <ul>
              <li><Link to = {'/pictures'}>Pictures</Link></li>
                <ul>
                  <li><Link to = {'/pictures/upload'}>Upload</Link></li>
                  <li><Link to = {'/pictures/browse'}>Browse</Link></li>
                  <li><Link to = {'/pictures/my_uploads'}>My Uploads</Link></li>
                  <li><Link to = {'/pictures/my_collection'}>My Collection</Link></li>
                </ul>
              <li><Link to = {'/billing'}>Billing</Link></li>
              <li><Link to = {'/settings'}>Settings</Link></li>
            </ul>
        </div>
      );
    }
  }
  export default Navigation;