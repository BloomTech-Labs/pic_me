import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"

class Landing extends Component {
    render() {
      return (
        <div>
          <h1>Meet PicMe, better than selfie
          </h1>
          <Button><Link to="/SignUp"> Sign Up </Link></Button>
          <Button><Link to="/SignIn"> Sign In </Link></Button>
        </div>
      );
    }
  }
  export default Landing;