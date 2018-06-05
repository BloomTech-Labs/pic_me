import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { 
  GridList,
  GridListTile, 
  GridListTileBar,
  IconButton,
  Modal,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { browse, myuploads } from '../../actions';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  }
});

class Browse extends Component {
  constructor() {
    super();
    this.state = {
      uploads: [], 
      open: false,
    };
  }

  componentWillMount() {
    // console.log('auth', this.props.authenticated);
    this.props.myuploads();     // TODO: change to browse action creator this.props.browse();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ uploads: nextProps.uploads });
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2> Browse </h2>
        <GridList cellHeight={300} spacing={1} cols={3} className={classes.gridList}>
          {this.state.uploads.map(img => (
            <GridListTile key={img._id} cols={img.cols || 1}>
              <img src={img.url} alt="myuploads" />
              <GridListTileBar
                title={img.tags}
                titlePosition="bottom"
                actionIcon={
                  <IconButton
                  // onClick={
                  //   _ => {
                  //   this.props.deletemyuploads(img._id);} 
                  // }
                  // onClick={this.handleOpen}
                  >
                    <FavoriteIcon />
                  </IconButton>
                }
                actionPosition="right"
                className={classes.titleBar}
              />
              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
              >
              <div style={getModalStyle()} className="paper">
                <Typography variant="title" id="modal-title">
                  Is This You?
                </Typography>
                <Typography variant="subheading" id="simple-modal-description">
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                <BrowseWrapped />
              </div>
            </Modal>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

const mapStatetoProps = state => {
  return {
    authenticated: state.auth.authenticated,
    error: state.auth.error,
    uploads: state.photo.uploads,
  };
};

Browse.propsTypes = {
  classes: PropTypes.object.isRequired,
};

const BrowseWrapped = withStyles(styles)(Browse);

export default connect(mapStatetoProps, { browse, myuploads })(BrowseWrapped);