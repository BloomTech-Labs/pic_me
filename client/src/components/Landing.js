import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <div className="container">
            <h1 className="display-4">Meet PicMe, better than selfie</h1>
            <p className="lead">
              Lorem ipsum dolor sit amet, a metus ac eros, sodales eget per eget
              amet eu, dapibus dolor commodo magnis. Porttitor eros arcu. Magna
              nunc, amet blandit lacinia orci eget eu quisque, massa egestas
              aliquam pulvinar dui, semper urna nostra facilisis a ultricies,
              libero amet turpis. Velit vel cras in. Porta quam senectus, duis
              quis ultrices felis magna ac, ac ridiculus est massa ligula sint
              donec. Etiam eget at neque. Mauris tristique penatibus placerat
              sed eu sit, turpis porta aut erat ac, sagittis asperiores
              vestibulum magna dolor enim lorem.{" "}
            </p>
            <hr className="my-2" />
            <p>
              <Button className="btn-secondary btn-lg" outline color="secondary" tag={Link} to="/SignUp">
                {" "}
                Sign Up{" "}
              </Button>{" "}
              <Button className="btn-secondary btn-lg" outline color="secondary" tag={Link} to="/Login">
                {" "}
                Log In{" "}
              </Button>
            </p>
          </div>
        </Jumbotron>
      </div>
    );
  }
}
export default Landing;
