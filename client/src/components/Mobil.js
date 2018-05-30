import React, { Component } from 'react';

import { connect } from 'react-redux';

import { authenticateUser } from '../actions';

class Mobil extends Component {
	componentDidMount() {
		this.props.authenticateUser();
	}

	render() {
		return <div className="Mobil">put a cool loading thing here</div>;
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
	};
};

export default connect(mapStateToProps, { authenticateUser })(Mobil);
