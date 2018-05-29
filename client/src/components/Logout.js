import React, { Component } from "react";
import { connect } from 'react-redux';
import { Jumbotron } from "reactstrap";
import * as actions from '../actions'

class Logout extends Component {
  componentWillMount(){
    this.props.logout();
  }
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

export default connect(null, actions)(Logout);
