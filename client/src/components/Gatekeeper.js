import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticateUser } from '../actions';

export default ComposedComponent => {
	class CheckAuthentication extends Component {
		componentWillMount() {
			if (!this.props.authenticated) {
				this.props.history.push('/login');
			}
		}

		render() {
			return (
				<div className="CheckAuthentication">
					{this.props.user ? (
						<ComposedComponent history={this.props.history} />
					) : null}
				</div>
			);
		}
	}

	const mapStateToProps = state => {
		return {
			user: state.auth.user,
			authenticated: state.auth.authenticated,
		};
	};

	return connect(mapStateToProps, { authenticateUser })(CheckAuthentication);
};
