import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'reactstrap';

class Signin extends Component {

    submitFormHandler = ({ username, password }) => {
      this.props.login(username, password, this.props.history);
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
                ? 'Logging in..'
                : this.props.error === '' ? 'Log in' : this.props.error}
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
  
              <Button className="SignupForm__button" action="submit">
                Sign In
              </Button>
  
              <NavLink className="SignupForm__NavLink" to="/signup">
                <div>Sign Up for Free</div>
              </NavLink>
            </div>
          </form>
        </div>
      );
    }
  }

//   const mapStateToProps = state => {
//     return {
//       authenticating: state.auth.authenticating,
//       error: state.auth.error,
//     };
//   };

//   Signin = connect(mapStateToProps, { signin, resetErrors })(Signin);

  export default reduxForm({
    form: 'signin',
    fields: ['username', 'password'],
  })(Signin);