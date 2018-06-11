import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import lambda from '../static/Lambda_Symbol.png';
import Elly from '../static/elly.jpeg';
import Julian from '../static/julian.jpeg';
import Sam from '../static/sam.jpeg';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    maxWidth: 345
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  }
});

class About extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root} spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center">
              <Typography variant="subheading">
                Pic Me started as a Capstone Project at{' '}
                <a href="https://lambdaschool.com/">
                  <img src={lambda} alt="lambda logo" width="27" height="29" />{' '}
                  Lambda School
                </a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              <Grid key={0} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Elly"
                        src={Elly}
                        className={classes.avartar}
                      />
                    }
                    title="Elly S. Han"
                  />
                  <CardContent>
                    Software engineer with a psychology background. With 8 years
                    of experience at Microsoft, startup, and mHealth.
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button
                      size="small"
                      component={Link}
                      to="https://www.linkedin.com/in/ellysalley/"
                      color="primary"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      size="small"
                      component={Link}
                      to="https://github.com/ellysalley"
                      color="primary"
                    >
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid key={1} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        alt="Julian"
                        src={Julian}
                        className={classes.avartar}
                      />
                    }
                    title="Julian J. Kohlman"
                  />
                  <CardContent>
                    A persistent learner who enjoys solving problems from the
                    backend, to the frontend.
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button
                      size="small"
                      component={Link}
                      to="https://www.linkedin.com/in/julian-j-kohlman-563a758b/"
                      color="primary"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      size="small"
                      component={Link}
                      to="https://github.com/juliankohlman"
                      color="primary"
                    >
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid key={2} item>
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar alt="Sam" src={Sam} className={classes.avartar} />
                    }
                    title="Samuel Cha"
                  />
                  <CardContent>
                    A software engineer that dreams of making “life” apps with
                    rich websites and clean backends.
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button
                      size="small"
                      component={Link}
                      to="https://www.linkedin.com/in/chasoonjin/"
                      color="primary"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      size="small"
                      component={Link}
                      to="https://github.com/samscha"
                      color="primary"
                    >
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
