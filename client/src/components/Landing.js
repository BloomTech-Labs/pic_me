import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom"

class Landing extends Component {
    render() {
      return (
        <div>
          <Button><Link to="/SignUp"> SignUp </Link> </Button>
          <Button><Link to="/Login"> Login </Link> </Button>
        </div>
      );
    }
  }
  export default Landing;