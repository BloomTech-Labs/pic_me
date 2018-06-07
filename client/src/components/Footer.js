import React, { Component } from 'react';
import { Navbar, Container } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <div>
        <Navbar className="bg-transparent">
				<Container>
          <p className="text-black-50">
            <small>Meet the team behind PicMe</small>
          </p>
				</Container>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
