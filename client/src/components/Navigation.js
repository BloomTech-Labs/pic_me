import React, { Component } from 'react';
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
	DropdownItem } from 'reactstrap';

class Navigation extends Component {
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
                                    <DropdownItem><NavLink href="/picture_upload">Upload</NavLink></DropdownItem>
                                    <DropdownItem><NavLink href="/picture_browse">Browse</NavLink></DropdownItem>
                                    <DropdownItem><NavLink href="/picture_my_uploads">My Uploads</NavLink></DropdownItem>
                                    <DropdownItem><NavLink href="/picture_my_collection">My Collection</NavLink></DropdownItem>
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
                            <NavItem>
                                <NavLink href="/signup">Sign Up</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/signin">Sign In</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
		}
	}
	export default Navigation;