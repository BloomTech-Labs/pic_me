import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { register, resetErrors, logout } from '../../actions';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTwitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import withRoot from '../../withRoot';

const styles = theme => ({
  root: {
    flexGrow: 1
	},
	button: {
    margin: theme.spacing.unit,
  },
});

const renderTextField = ({ input, label }) => (
  <TextField
    id={label}
    placeholder={label}
    fullWidth
    {...input}
    margin="dense"
  />
);

class Signup extends Component {
  componentWillMount() {
    this.props.resetErrors();
  }

  submitFormHandler = ({
    email,
    password,
    confirmPassword,
    firstName,
    lastName
  }) => {
    this.props.register(
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      this.props.history
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
    const { classes, handleSubmit, pristine, submitting } = this.props;
    return (
      <div>
        <Grid className={classes.root} container spacing={16}>
          <Grid item xs>
            <Grid container justify="center">
              {this.renderAlert()}
            </Grid>
            <Grid container justify="center">
              <Button
								className={classes.button}
                variant="raised"
                color="secondary"
                href="https://labpicme.herokuapp.com/api/users/auth/twitter"
              >
                <FontAwesomeIcon icon={faTwitter} />
                Sign up with twitter
              </Button>
            </Grid>
            <Grid container justify="center">
              <form onSubmit={handleSubmit(this.submitFormHandler)}>
                <div>
                  <Field
                    name="email"
                    component={renderTextField}
                    label="email"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    component={renderTextField}
                    label="password"
                  />
                </div>
                <div>
                  <Field
                    name="confirmPassword"
                    component={renderTextField}
                    label="confirm password"
                  />
                </div>
                <div>
                  <Field
                    name="firstName"
                    component={renderTextField}
                    label="first name"
                  />
                </div>
                <div>
                  <Field
                    name="lastName"
                    component={renderTextField}
                    label="last name"
                  />
                </div>
                <Grid container justify="center">
                  <Button
										className={classes.button}
                    variant="raised"
                    size="large"
                    type="submit"
                    disabled={pristine || submitting}
                  >
                    Sign up
                  </Button>
                </Grid>
              </form>
            </Grid>
            <Grid container justify="center">
              <Link to="/login">
                <Typography variant="body1" gutterBottom>
                  Have an account? Log in
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
    error: state.auth.error
  };
};

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

Signup = connect(
  mapStateToProps,
  {
    // getInfo,
    logout,
    // getAllUsers,
    register,
    resetErrors
  }
)(Signup);

const SignupWrapped = withRoot(withStyles(styles)(Signup));

export default reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'confirmPassword', 'firstName', 'lastName']
})(SignupWrapped);
