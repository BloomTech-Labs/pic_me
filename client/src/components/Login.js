import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { login, twitter } from '../actions';

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
			);
		}
	}
	render() {
		return (
			<div className="container col-md-4 mb-3">
				<a href="https://labpicme.herokuapp.com/api/users/auth/twitter">
					{/* <a onClick={_ => this.props.twitter(this.props.history)}> */}
					Login with twitter
				</a>
				<form
					className="Signup__form"
					onSubmit={this.props.handleSubmit(this.submitFormHandler)}
				>
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
							<Field
								className="form-control"
								name="password"
								component="input"
								type="password"
								placeholder="password"
							/>
						</fieldset>

						<button action="submit" className="btn btn-secondary btn-lg btn-block">
							Log in
						</button>

						<div>
							<Link className="SignupForm__Link" to="/signup">
								Don't have an account? Sign up
							</Link>
						</div>
						<div>
							<Link className="SignupForm__Link" to="/forgotpassword">
								Forgot password?
							</Link>
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
		error: state.auth.error,
	};
};

Login = connect(mapStateToProps, {
	login,
	twitter,
})(Login);

export default reduxForm({
	form: 'login',
	fields: ['email', 'password'],
})(Login);
