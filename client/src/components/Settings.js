import React, { Component } from "react";
// import { connect } from "react-redux";
// import { reduxForm, Field } from "redux-form";
// import { settings } from "../actions";
// import Bread from "./Bread";
import Account from "./Account";
import Profile from "./Profile";
import Deleteaccount from "./Deleteaccount";

class Settings extends Component {
	componentWillMount() {
		console.log('auth', this.props.authenticated);
	}
  render() {
    return (
      <div>
        <h3>Update profile</h3>
        <hr />
        <Profile />
        <h3>Change email or password</h3>
        <hr />
        <Account />
        <h3>Delete account</h3>
        <hr />
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        <Deleteaccount />
      </div>
    );
  }
}

export default Settings;