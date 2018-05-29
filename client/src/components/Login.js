import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { login, twitter } from "../actions";

class Login extends Component {
  submitFormHandler = ({ email, password }) => {
    this.props.login(email, password, this.props.history);
  };

  renderAlert() {
    if (this.props.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.error}
        </div>
      )
    }
  }
  render() {
    return (
      <div className="Signup">
        <a href="http://localhost:5555/api/users/auth/twitter">Login with twitter</a>
        <form
          className="Signup__form"
          onSubmit={this.props.handleSubmit(this.submitFormHandler)}
        >
          {/* <div className="SignupDescription">
            {this.props.authenticating
              ? "Logging in.."
              : this.props.error === ""
                ? "Log in"
                : this.props.error}
          </div> */}
          {this.renderAlert()}
          <div>
            <fieldset className="form-group">
              <Field
                className="form-control"
                name="email"
                component="input"
                type="text"
                placeholder="email"
              />
            </fieldset>

            <fieldset className="form-group">
              <Field
                className="form-control"
                name="password"
                component="input"
                type="password"
                placeholder="password"
              />
            </fieldset>

            <button action="submit" className="btn btn-primary">
              Log in
            </button>
            
            <div>
            <NavLink className="SignupForm__NavLink" to="/signup">
            Don't have an account? Sign up
            </NavLink>
            </div>
            <div>
            <NavLink className="SignupForm__NavLink" to="/forgotpassword">
            Forgot password?
            </NavLink>
            </div>
          </div>
        </form>
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

Login = connect(mapStateToProps, { 
  login, twitter })(Login);

export default reduxForm({
  form: "login",
  fields: ["email", "password"]
})(Login);
