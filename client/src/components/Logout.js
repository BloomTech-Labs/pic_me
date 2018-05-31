import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';

class Logout extends Component {
	render() {
		return (
			<div>
				<Jumbotron>
					<h1 className="display-4">You have logged out of PicMe.</h1>
					<hr className="my-2" />
					<p className="lead">See you again</p>
				</Jumbotron>
			</div>
		);
	}
}

export default Logout;
