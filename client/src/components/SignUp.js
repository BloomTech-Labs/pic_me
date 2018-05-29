import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { register, resetErrors, logout } from '../actions';
// import { getInfo, getAllUsers, logout } from '../actions';
// import { Button } from 'reactstrap';

class Signup extends Component {
  componentWillMount() {
    this.props.resetErrors();
  }

  submitFormHandler = ({
    email,
    password,
    confirmPassword,
    firstName,
    lastName
  }) => {
    this.props.register(
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      this.props.history
    );
  };

  render() {
    return (
      <div className="Signup">
        <form
          className="Signup__form"
          onSubmit={this.props.handleSubmit(this.submitFormHandler)}
        >
          <div className="SignupDescription">
            {this.props.authenticating
              ? "Signing up.."
              : this.props.error === ""
                ? "Sign up for an account"
                : this.props.error}
          </div>

          <div>
            <fieldset>
              <Field
                className="InputFields"
                name="email"
                component="input"
                type="text"
                placeholder="email"
              />
            </fieldset>

            <fieldset>
              <Field
                className="InputFields"
                name="password"
                component="input"
                type="password"
                placeholder="password"
              />
            </fieldset>

            <fieldset>
              <Field
                className="InputFields"
                name="confirmPassword"
                component="input"
                type="password"
                placeholder="confirm password"
              />
            </fieldset>

            <fieldset>
              <Field
                className="InputFields"
                name="firstName"
                component="input"
                type="text"
                placeholder="first name"
              />
            </fieldset>

            <fieldset>
              <Field
                className="InputFields"
                name="lastName"
                component="input"
                type="text"
                placeholder="last name"
              />
            </fieldset>

            <button className="btn btn-primary" action="submit">
              Sign up
            </button>

            <NavLink className="SignupForm__NavLink" to="/login">
            {' '}Have an account? Log in
            </NavLink>
          </div>
        </form>

        {/* <div onClick={_ => this.props.getAllUsers()}>print all users</div> */}
        <button onClick={_ => this.props.logout()}>logout</button>
        {/* <div onClick={_ => this.props.getInfo()}>info</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
  error: state.auth.error
});

Signup = connect(mapStateToProps, {
  // getInfo,
  logout,
  // getAllUsers,
  register,
  resetErrors
})(Signup);

export default reduxForm({
  form: "signup",
  fields: ["email", "password", "confirmPassword", "firstName", "lastName"]
})(Signup);
