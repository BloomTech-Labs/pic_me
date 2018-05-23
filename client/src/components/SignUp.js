import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'reactstrap';

class Signup extends Component {

  submitFormHandler = ({ username, password, confirmPassword }) => {
    this.props.register(
      username,
      password,
      confirmPassword,
      this.props.history,
    );
  };

  render() {
    return (
      <div className="Signup">

        <form
          className="Signup__form"
          onSubmit={this.props.handleSubmit(this.submitFormHandler)}
        >
          {/* <div className="Signup__form"> */}
          <div className="SignupDescription">
            {this.props.authenticating
              ? 'Signing up..'
              : this.props.error === ''
                ? 'Sign up for an account'
                : this.props.error}
          </div>

          <div className="SignupForm">
            <fieldset>
                <Field
                    className="InputFields"
                    name="username"
                    component="input"
                    type="text"
                    placeholder="username"
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
            <div>
            By clicking Sign up, I agree to the Terms of Service and Privacy Policy.
            </div>
            <Button className="SignupForm__button" action="submit">
              Sign Up
            </Button>

            <NavLink className="SignupForm__NavLink" to="/signin">
              Have an account? Sign In
            </NavLink>
          </div>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     authenticating: state.auth.authenticating,
//     error: state.auth.error,
//   };
// };

// Signup = connect(mapStateToProps, { register, resetErrors })(Signup);

export default reduxForm({
  form: 'signup',
  fields: ['username', 'password', 'confirmPassword'],
})(Signup);