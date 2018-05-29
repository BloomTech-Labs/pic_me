import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticateUser } from '../../actions';

export default ComposedComponent => {
	class CheckAuthentication extends Component {
		componentWillMount() {
			if (!this.props.user) {
				/**
				 * if redux state user has not been set,
				 * reroute to limbo, I mean Mobil.
				 */
				this.props.history.push('/mobil');
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
		};
	};

	return connect(mapStateToProps, { authenticateUser })(CheckAuthentication);
};
