import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { 
  GridList,
  GridListTile, 
  GridListTileBar,
  IconButton,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { deletemyuploads, myuploads } from '../../actions';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(207,216,220,0.7) 0%, ' +
      'rgba(207,216,220,0.3) 70%, rgba(207,216,220,0) 100%)',
  },
  icon: {
    color: 'white',
  },
};

class Browse extends Component {
  state = {
    uploads: [],
  }

	renderAlert() {
		if (this.props.error) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.error}
				</div>
			);
		}
  }

  componentWillMount() {
    console.log('auth', this.props.authenticated);
    this.props.myuploads(); // TODO: change to browse action creator this.props.browse();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ uploads: nextProps.uploads });
  }

  render() {
    return (
      <div>
        <h2> Browse </h2>
        <GridList cellHeight={300} spacing={1} cols={3}>
          {this.state.uploads.map(img => (
            <GridListTile key={img._id} cols={img.cols || 1}>
              <img src={img.url} alt="myuploads" />
              <GridListTileBar
                title={img.tags}
                titlePosition="bottom"
                actionIcon={
                  <IconButton
                  onClick={_ => {
                    this.props.deletemyuploads(img._id);} 
                    // TODO: change function to add to collection, payment modal windowß 
                  }
                  >
                    <FavoriteIcon />
                  </IconButton>
                }
                actionPosition="right"
              />
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

export default connect(mapStatetoProps, { myuploads, deletemyuploads })(Browse);