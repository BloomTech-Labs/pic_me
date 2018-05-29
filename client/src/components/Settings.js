import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { settings } from "../actions";
import Bread from "./Bread";

class Settings extends Component {
  componentWillMount(){
    this.props.settings();
  }

  submitFormHandler = ({
    email,
    password,
    confirmPassword,
    firstName,
    lastName, 
    nickNames,
  }) => {
    this.props.settings(
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      nickNames,
      this.props.history,
    );
  };

  render() {
    return (
      <div className="Settings">
        <Bread />
        <form onSubmit={this.props.handleSubmit(this.submitFormHandler)}>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">email: </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                name="email"
                component="input"
                type="text"
                placeholder="email"
              />
            </div>

            <label className="col-sm-2 col-form-label">password: </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                name="password"
                component="input"
                type="password"
                placeholder="password"
              />
            </div>

            <label className="col-sm-2 col-form-label">confirm password: </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                name="confirmPassword"
                component="input"
                type="password"
                placeholder="confirm password"
              />
            </div>

            <label className="col-sm-2 col-form-label">first name: </label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                name="firstName"
                component="input"
                type="text"
                placeholder="first name"
              />
            </div>

            <label className="col-sm-2 col-form-label">last name</label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                name="lastName"
                component="input"
                type="text"
                placeholder="last name"
              />
            </div>

            <label className="col-sm-2 col-form-label">nick names</label>
            <div className="col-sm-10">
              <Field
                className="form-control"
                name="nickNames"
                component="input"
                type="text"
                placeholder="nick names"
              />
            </div>
              <button action="submit" className="btn btn-primary">Submit</button>
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

Settings = connect(mapStateToProps, {
  settings
})(Settings);

export default reduxForm({
  form: "settings",
  fields: [
    "email",
    "password",
    "confirmPassword",
    "firstName",
    "lastName",
    "nickNames",
  ]
})(Settings);
