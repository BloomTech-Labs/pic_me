import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../actions";

class Navigation extends Component {
  //reactstrap navbar toggle
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dynamicLinks() {
    if (this.props.authenticated === true || localStorage.token === undefined) {
      // show a link to log out
      return [
        <NavLink key={1} href="/logout" onClick={_ => this.props.logout()}>
          Log Out
        </NavLink>
      ];
    } else {
      // show links to sign up or login
      return [
        <NavLink key={1} href="/signup">
          Sign Up
        </NavLink>,
        <NavLink key={2} href="/login">
          Log In
        </NavLink>
      ];
    }
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">PicMe</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Pictures
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <NavLink href="/picture_upload">Upload</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/picture_browse">Browse</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/picture_my_uploads">My Uploads</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                    <NavLink href="/picture_my_collection">
                      My Collection
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <NavItem>
                <NavLink href="/billing">Billing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/settings">Settings</NavLink>
              </NavItem>
            </Nav>

            <Nav className="ml-auto" navbar>
              {this.dynamicLinks()}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    error: state.auth.error
  };
};

export default withRouter(connect(mapStateToProps, { logout })(Navigation));
