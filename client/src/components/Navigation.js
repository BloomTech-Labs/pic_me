import React, { Component } from 'react';
import {
  Badge,
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout, getInfo } from '../actions';
import logo from '../logo.png';

// import { NavLink } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      balance: null
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      balance: 0
    });
  }

  componentWillMount() {
    this.props.getInfo();
  }

  componentDidMount() {
    this.setState({ balance: this.props.user.balance });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.balance !== this.state.balance) {
      this.setState({ balance: nextProps.user.balance });
    }
  }

  dynamicLinks() {
    if (this.props.authenticated === true) {
      // show a link to log out
      return [
        <NavItem>
          <NavLink key={0} tag={Link} to="/billing">
            <Badge color="info" pill>
              {this.state.balance}
            </Badge>{" "}
            {this.state.balance !== 1 ? "credits" : "credit"}
          </NavLink>
        </NavItem>,
        <NavItem>
          <NavLink key={1} tag={Link} to="/settings">
            Settings
          </NavLink>
        </NavItem>,
        <NavItem>
          <NavLink
            key={2}
            tag={Link}
            to="#" // used for anything except to change cursor type
            onClick={_ => this.props.logout(this.props.history)}
          >
            Log Out
          </NavLink>
        </NavItem>
      ];
    } else {
      // show links to sign up or login
      return [
        <NavItem>
          <NavLink key={3} tag={Link} to="/login">
            Log In{" "}
          </NavLink>
        </NavItem>,
        <NavItem>
          <Button outline color="secondary" key={4} tag={Link} to="/signup">
            Sign Up
          </Button>
        </NavItem>
      ];
    }
  }

  render() {
    // if (this.state.balance === null) {
    // 	this.props.getInfo();
    // }

    return (
      <div className="bg-light">
        <div className="container">
          <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">
              <img src={logo} alt="PicMe" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav navbar>
                {/* <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Pictures
                  </DropdownToggle>
                  <DropdownMenu> */}
                <NavItem>
                  <NavLink key={5} tag={Link} to="/picture_upload">
                    Upload
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink key={6} tag={Link} to="/picture_browse">
                    Browse
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink key={7} tag={Link} to="/picture_my_uploads">
                    My Uploads
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink key={8} tag={Link} to="/picture_my_collection">
                    My Collection
                  </NavLink>
                </NavItem>
                {/* </DropdownMenu>
                </UncontrolledDropdown> */}

                {/* <NavItem>
                  <NavLink tag={Link} to="/billing">
                    Billing
                  </NavLink>
                </NavItem> */}
              </Nav>
              <Nav className="ml-auto" navbar>
                {this.dynamicLinks()}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    error: state.auth.error,
    user: state.user
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout, getInfo }
  )(Navigation)
);
