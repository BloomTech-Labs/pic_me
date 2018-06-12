import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { mobil, twitter, resetErrors } from '../../actions';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import withRoot from '../../withRoot';

const styles = theme => ({
	root: {
    flexGrow: 1,
  },
});

const renderTextField = ({ input, label }) => (
  <TextField
    id={label}
    placeholder={label}
    fullWidth
    {...input}
    margin="normal"
  />
);

class Mobil extends Component {
	componentWillMount() {
		this.props.resetErrors();
	}

	submitFormHandler = ({ email, password }) => {
		this.props.mobil(email, password, this.props.history);
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
		const { classes, handleSubmit, pristine, submitting } = this.props;		
		return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid key={0} item xs>
            <Grid container justify="center">
              {this.renderAlert()}
            </Grid>
            <Grid container justify="center">
              <Button
                variant="raised"
                color="secondary"
                href="https://labpicme.herokuapp.com/api/users/auth/twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
                Login with twitter
              </Button>
            </Grid>
            <Grid container justify="center">
              <form
                onSubmit={handleSubmit(this.submitFormHandler)}
                className={classes.container}
              >
                <div>
                  <Field
                    name="email"
                    label="email"
                    component={renderTextField}
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    label="password"
                    component={renderTextField}
                  />
                </div>
                <Grid container justify="center">
                  <Button
                    variant="raised"
                    size="large"
                    type="submit"
                    disabled={pristine || submitting}
                  >
                    Log in
                  </Button>
                </Grid>
              </form>
            </Grid>
          	<Grid container justify="center">
              <Link to="/signup">
                <Typography variant="body1" gutterBottom>
                  Don't have an account? Sign up
                </Typography>
              </Link>
            </Grid>
            <Grid container justify="center">
              <Link to="/forgotpassword">
                <Typography variant="body1" gutterBottom>
                  Forgot password?
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
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

Mobil.propTypes = {
  classes: PropTypes.object.isRequired
};

Mobil = connect(mapStateToProps, {
	mobil,
	twitter,
	resetErrors,
})(Mobil);

const MobilWrapped = withRoot(withStyles(styles)(Mobil));

export default reduxForm({
	form: 'login',
	fields: ['email', 'password'],
})(MobilWrapped);

// import React, { Component } from 'react';

// import { connect } from 'react-redux';

// import { authenticateUser } from '../actions';

// class Mobil extends Component {
// 	componentDidMount() {
// 		this.props.authenticateUser();
// 	}

// 	render() {
// 		return <div className="Mobil">put a cool loading thing here</div>;
// 	}
// }

// const mapStateToProps = state => {
// 	return {
// 		user: state.auth.user,
// 	};
// };

// export default connect(mapStateToProps, { authenticateUser })(Mobil);
