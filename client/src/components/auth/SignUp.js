import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { register, resetErrors, logout } from '../../actions';
// import { getInfo, getAllUsers, logout } from '../actions';

class Signup extends Component {
	componentWillMount() {
		this.props.resetErrors();
	}

	submitFormHandler = ({
		email,
		password,
		confirmPassword,
		firstName,
		lastName,
	}) => {
		this.props.register(
			email,
			password,
			confirmPassword,
			firstName,
			lastName,
			this.props.history,
		);
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
			<div className="container col col-lg-2">
				<form
					className="Signup__form"
					onSubmit={this.props.handleSubmit(this.submitFormHandler)}
				>
					<div className="SignupDescription">
						{this.props.authenticating
							? 'Signing up..'
							: this.props.error === ''
								? 'Sign up for an account'
								: this.renderAlert()}
					</div>

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

							<Field
								className="form-control"
								name="confirmPassword"
								component="input"
								type="password"
								placeholder="confirm password"
							/>

							<Field
								className="form-control"
								name="firstName"
								component="input"
								type="text"
								placeholder="first name"
							/>

							<Field
								className="form-control"
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
							{' '}
							Have an account? Log in
						</NavLink>
					</div>
				</form>

				{/* <div onClick={_ => this.props.getAllUsers()}>print all users</div> */}
				{/* <button onClick={_ => this.props.logout()}>logout</button> */}
				{/* <div onClick={_ => this.props.getInfo()}>info</div> */}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	authenticated: state.auth.authenticated,
	error: state.auth.error,
});

Signup = connect(mapStateToProps, {
	// getInfo,
	logout,
	// getAllUsers,
	register,
	resetErrors,
})(Signup);

export default reduxForm({
	form: 'signup',
	fields: ['email', 'password', 'confirmPassword', 'firstName', 'lastName'],
})(Signup);
