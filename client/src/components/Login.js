import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { login, resetErrors } from '../actions';

class Login extends Component {
  componentWillMount() {
    this.props.resetErrors();
  }

  submitFormHandler = ({ 
    email, 
    password, 
  }) => {
    this.props.login(email, password, this.props.history);
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
              ? 'Logging in..'
              : this.props.error === '' ? 'Log in' : this.props.error}
          </div>

          <div className="SignupForm">
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

            <button className="SignupForm__button" action="submit">
              Log in
            </button>

            <NavLink className="SignupForm__NavLink" to="/signup">
              Don't have an account? Sign up
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    authenticating: state.auth.authenticating,
    error: state.auth.error,
  };
};
Login = connect(mapStateToProps, { login, resetErrors })(Login);
export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
})(Login);
