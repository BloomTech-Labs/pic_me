import React, { Component } from 'react';
import { Navbar, Container } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar>
				<Container>
          <span className="navbar-text text-black-50">
            <small>Meet the team behind PicMe</small>
          </span>
				</Container>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
