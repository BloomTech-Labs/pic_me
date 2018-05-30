import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { profile } from "../actions";
// import Bread from "./Bread";

class Profile extends Component {
	componentWillMount() {
		console.log('auth', this.props.authenticated);
	}

  profileFormHandler = ({ firstName, lastName, nickNames }) => {
    this.props.profile(firstName, lastName, nickNames);
  };

  render() {
    return (
      <div className="Profile">
        <form onSubmit={this.props.handleSubmit(this.profileFormHandler)}>
          <div className="form-group col-md-6">
            <label>First name</label>
            <Field
              className="form-control"
              name="firstName"
              component="input"
              type="text"
            />
          </div>

          <div className="form-group col-md-6">
            <label>Last name</label>
            <Field
              className="form-control"
              name="lastName"
              component="input"
              type="text"
            />
          </div>

          <div className="form-group col-md-6">
            <label>Nick names</label>
            <Field
              className="form-control"
              name="nickNames"
              component="input"
              type="text"
            />
          </div>

          <div className="form-group col-md-6">
            <button action="submit" className="btn btn-primary">
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  error: state.auth.error
});

Profile = connect(mapStateToProps, {
  profile,
})(Profile);

export default reduxForm({
  form: "profile",
  fields: ["firstName", "lastName", "nickNames"]
})(Profile);
