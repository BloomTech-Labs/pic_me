import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { account, resetErrors } from "../actions";
// import Bread from "./Bread";

class Account extends Component {
  componentWillMount(){
    this.props.resetErrors();
  }

  accountFormHandler = ({
    email,
    oldPassword, 
    password, 
    confirmPassword
  }) => {
    this.props.account(
      email,
      oldPassword, 
      password, 
      confirmPassword
    );
  };

  render() {
    return (
      <div className="Account">

        <form onSubmit={this.props.handleSubmit(this.accountFormHandler)}>
        <div className="form-group col-md-6">
          <label>email</label>
          <Field
            className="form-control"
            name="email"
            component="input"
            type="text"
          />
        </div>
        
        <div className="form-group col-md-6">
          <label>Old password</label>
          <Field
            className="form-control"
            name="oldPassword"
            component="input"
            type="password"
          />
        </div>

        <div className="form-group col-md-6">
          <label>New password</label>
          <Field
            className="form-control"
            name="password"
            component="input"
            type="password"
          />
        </div>

        <div className="form-group col-md-6">
          <label>Confirm new password</label>
          <Field
            className="form-control"
            name="confirmPassword"
            component="input"
            type="password"
          />
        </div>

        <div className="form-group col-md-6">
          <button action="submit" className="btn btn-primary">Update password</button>  
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

Account = connect(mapStateToProps, {
  account, resetErrors
})(Account);

export default reduxForm({
  form: "account", 
  fields: [
    "email",
    "oldPassword",
    "password",
    "confirmPassword",
  ]
})(Account);
