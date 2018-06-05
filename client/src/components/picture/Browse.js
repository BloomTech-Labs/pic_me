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
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { browse, myuploads, credit } from '../../actions';

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
  constructor(props) {
    super(props);
    this.state = {
        uploads: [], 
        modal: false
    };
    this.toggle = this.toggle.bind(this);
  };

  // toggle for modal window
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount() {
    console.log('auth', this.props.authenticated);
    this.props.myuploads(); //TODO: change to browse()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ uploads: nextProps.uploads });
  } 
  
  render() {
    return (
      <div >
        <h2> Browse </h2>
        <GridList cellHeight={300} spacing={1} cols={3}>
          {this.state.uploads.map(img => (
            <GridListTile key={img.id} cols={img.cols || 1}>
              <img src={img.url} alt="browse" />
              <GridListTileBar
                title={img.tags.map(i => i.text).join(', ')}
                titlePosition="bottom"
                actionIcon={
                  <IconButton
                    onClick={this.toggle}
                  >
                    <FavoriteIcon />
                  </IconButton>
                }
                actionPosition="right"
              />
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Is this you?</ModalHeader>
                <ModalBody>
                  Pay 1 credit and add this photo to your collection?
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggle}>Yes</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
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

const BrowseWrapped = withStyles(styles)(Browse);

export default connect(mapStatetoProps, { browse, myuploads })(BrowseWrapped);